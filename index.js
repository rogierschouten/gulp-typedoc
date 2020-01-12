// Copyright (c) 2015 Rogier Schouten <github@workingcode.ninja>
// License: ISC

"use strict";

const colors = require("ansi-colors");
const es = require("event-stream");
const log = require("fancy-log");
const PluginError = require("plugin-error");
const typedocModule = require("typedoc");
const semver = require("semver");

const PLUGIN_NAME = "gulp-typedoc";

function typedoc(options) {
	const files = [];
	options = options || {};

	return es.through(function(file) {
		files.push(file.path);
	}, function() {
		// end of stream, start typedoc
		const stream = this;

		if (files.length === 0) {
			stream.emit("end");
			return;
		} else if (!options.out && !options.json) {
			stream.emit("error", new PluginError(PLUGIN_NAME, "You must either specify the 'out' or 'json' option."));
			stream.emit("end");
			return;
		} else {
			// leaving the 'out' or 'version' option in causes typedoc error for some reason
			const out = options.out;
			delete options.out;
			const json = options.json;
			delete options.json;
			const version = options.version;
			delete options.version;

			if (!options.logger) {
				// reduce console logging
				options.logger = function(message, level, newline) {
					if (level === 3) {
						log(colors.red(message));
					}
				};
			}

			// typedoc instance
			const app = new typedocModule.Application(options);
			if (semver.gte(typedocModule.Application.VERSION, '0.16.1')) {
				app.options.addReader(new typedocModule.TSConfigReader());
				app.options.addReader(new typedocModule.TypeDocReader());
				app.bootstrap(options);
			}

			if (version && options.logger !== "none") {
				log(app.toString());
			}
			try {
				const src = app.expandInputFiles(files);
				const project = app.convert(src);
				if (project) {
					if (out) app.generateDocs(project, out);
					if (json) app.generateJson(project, json);
					if (app.logger.hasErrors()) {
						stream.emit("error", new PluginError(PLUGIN_NAME, "There were errors generating TypeDoc output, see above."));
						stream.emit("end");
						return;
					}
				} else {
					stream.emit("error", new PluginError(PLUGIN_NAME, "Failed to generate load TypeDoc project."));
					stream.emit("end");
					return;
				}
				stream.emit("end");
				return;
			} catch (e) {
				stream.emit("error", e);
				stream.emit("end");
				return;
			}
		}
	});
}

module.exports = typedoc;



