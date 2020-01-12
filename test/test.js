// Copyright (c) 2015 Rogier Schouten <github@workingcode.ninja>
// License: ISC

"use strict";

const chai = require("chai");
const expect = chai.expect;
const child_process = require("child_process");
const fse = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const util = require("util");

const primraf = util.promisify(rimraf);

const WIN_EXT = /^win/.test(process.platform)?".cmd" : "";
const GULP_PATH = path.resolve(path.join(__dirname, "..", "node_modules", ".bin", "gulp" + WIN_EXT));
const DATA_DIR = path.join(__dirname, "data");
const TEST_DIR = path.join(__dirname, "test");

/**
* Run gulp against TEST_DIR/gulpfile.js
* @returns {stderr, stdout}
*/
function run() {
	return new Promise((resolve, reject) => {
		const child = child_process.spawn(path.resolve(GULP_PATH), ["--gulpfile", "gulpfile.js"], {
			env: process.env,
			cwd: TEST_DIR
		});
		let stdout = "";
		let stderr = "";
		child.stdout.on("data", (data) => {
			// console.log(data.toString());
			stdout += data;
		});
		child.stderr.on("data", (data) => {
			// console.error(data.toString());
			stderr += data;
		});
		child.on("exit", (code) => {
			if (code !== 0) {
				reject(new Error(util.format("non-zero exit code %d; stdout: %s, stderr: %s", code, stdout, stderr)));
			} else {
				resolve({ stdout, stderr });
			}
		});
	});
}

function gulpfile(typedocOpts) {
	return `
const gulp = require("gulp");
const gulpTypeDoc = require("${path.relative(TEST_DIR, path.join(__dirname, "..", "index.js")).replace(/\\/g, "/")}");

// Workaround: directly calling process.exit() has corner cases where
// the console.log statements are not flushed (namely if stdout is piped
// instead of goes to a terminal).
const exitCode = 0;
process.on("exit", function() {
if (exitCode != 0) process.exit(exitCode);
});

// Generic error handling function
// This is needed because Gulp always returns exit code 0
// unless an exception is thrown which gives a useless stack trace.
function trapError(e) {
if (e.plugin && e.message) {
	// it is a gulp plugin error
	console.log("Error in plugin: " + e.plugin);
	console.log(e.message);
}
else {
	// some other error
	gutil.log(e);
}
exitCode++;
}

gulp.task("default", () => {
return gulp
	.src(["src/*.ts"])
	.pipe(gulpTypeDoc(${JSON.stringify(typedocOpts)}))
	.on("error", trapError) // make exit code non-zero
;
});
`;
}

describe("gulp-typedoc", function() {
	this.timeout(60E3);

	beforeEach(async () => {
		await primraf(TEST_DIR);
		await fse.mkdir(TEST_DIR);
		await fse.mkdir(path.join(TEST_DIR, "src"));
		await fse.copy(path.join(DATA_DIR, "myutil.ts"), path.join(TEST_DIR, "src", "myutil.ts"))
	});

	afterEach(async () => {
		await primraf(TEST_DIR);
	});

	it("should create a .html file", async () => {
		const g = gulpfile({
			version: true,
			module: "commonjs",
			out: "./out",
			json: "./out/test.json",
			name: "gulp-typedoc-test",
			target: "es5",
			includeDeclarations: true,
			excludeExternals: true,
			ignoreCompilerErrors: true
		});
		await fse.writeFile(path.join(TEST_DIR, "gulpfile.js"), g);
		await run();
		const exists = await fse.exists(path.join(TEST_DIR, "out", "index.html"));
		expect(exists).to.equal(true);
	});

	it("should enable typedoc logging when nothing specified", async () => {
		const g = gulpfile({
			version: true,
			module: "commonjs",
			out: "./out",
			json: "./out/test.json",
			name: "gulp-typedoc-test",
			target: "es5",
			includeDeclarations: true,
			excludeExternals: true,
			ignoreCompilerErrors: true
		});
		await fse.writeFile(path.join(TEST_DIR, "gulpfile.js"), g);
		const {stdout, stderr} = await run();
		expect(stdout).to.contain("Using TypeScript");
	});

	it("should disable typedoc logging when logger 'none' specified", async () => {
		const g = gulpfile({
			version: true,
			module: "commonjs",
			out: "./out",
			json: "./out/test.json",
			name: "gulp-typedoc-test",
			target: "es5",
			logger: "none",
			includeDeclarations: true,
			excludeExternals: true,
			ignoreCompilerErrors: true
		});
		await fse.writeFile(path.join(TEST_DIR, "gulpfile.js"), g);
		const {stdout, stderr} = await run();
		expect(stdout).to.not.contain("Using TypeScript");
	});
});

