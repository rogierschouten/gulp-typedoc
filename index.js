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
	const opts = { ...options };

	return es.through(function(file) {
		files.push(file.path);
	}, function() {
		// end of stream, start typedoc
		const stream = this;

		if (files.length === 0) {
			stream.emit("end");
			return;
		} else if (!opts.out && !opts.json) {
			stream.emit("error", new PluginError(PLUGIN_NAME, "You must either specify the 'out' or 'json' option."));
			stream.emit("end");
			return;
		} else {
			const out = opts.out;
			const json = opts.json;
			const version = opts.version;

			if (!opts.logger) {
				// reduce console logging
				opts.logger = function(message, level, newline) {
					if (level === 3) {
						log(colors.red(message));
					}
				};
			}

			// typedoc instance
			const app = new typedocModule.Application();
			if (semver.gte(typedocModule.Application.VERSION, '0.16.1')) {
				app.options.addReader(new typedocModule.TSConfigReader());
				app.options.addReader(new typedocModule.TypeDocReader());
			}

			if (version && opts.logger !== "none") {
				log(app.toString());
			}
			try {
				// Specify the entry points to be documented by TypeDoc.
				app.bootstrap({ ...opts, entryPoints: files });
				const project = app.convert();
				if (project) {
					if (out) app.generateDocs(project, out);  // TODO promisified!!
					if (json) app.generateJson(project, json); // TODO promisified!!
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
