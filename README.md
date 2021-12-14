# Gulp-TypeDoc

## Synopsis

Gulp plugin to execute the TypeDoc tool by Sebastian Lenz
http://typedoc.org
https://github.com/TypeStrong/typedoc

## Installation

Install both gulp-typedoc and typedoc:

```
npm install --save-dev gulp-typedoc typedoc
```

The reason for installing typedoc separately is that it allows you to choose the version of typedoc, independent from the version of gulp-typedoc.

## Usage

The plugin takes an object, of which all properties are passed transparently to typedoc. Pipe in TypeScript files. The documentation files are not piped out.

By default, the plugin will output log messages from TypeDoc. Specify `logger: 'none'` to suppress TypeDoc logging altogether.

## Code Example

```javascript
var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
	return gulp
		.src(["data/*.ts"])
		.pipe(typedoc({
			// Output options (see TypeDoc docs http://typedoc.org/api/interfaces/typedocoptionmap.html)
			// NOTE: the out option and the json option cannot share the same directory
			out: "./out/html/",
			json: "/out/file.json",

			// TypeDoc options (see TypeDoc docs http://typedoc.org/api/interfaces/typedocoptionmap.html)
			name: "my-project",
			theme: "/path/to/my/theme",
			plugin: ["my", "plugins"],
			version: true,
		}))
	;
});
```

## Changelog

### 3.0.2

* Fix #44 Work with clean copy of user options. Thanks @tristan00b!

### 3.0.1

* Fix #40 entrypoints not specified to TypeDoc by @robinprashanth

### 3.0.0

* BREAKING: Requires Typedoc version `>=0.20.34` now (and supports it)
* BREAKING: since the options follow the TypeDoc options, these are different now.
* Upgrade dependencies to fix security vulnerabilities

### 2.2.9

* Upgrade dependencies to fix security vulnerabilities

### 2.2.8

* Upgrade dependencies to fix security vulnerabilities

### 2.2.7

* Remove superfluous files from published package

### 2.2.6

* Upgrade dependencies to fix security vulnerabilities

### 2.2.5

* Upgrade dependencies to fix security vulnerabilities

### 2.2.4

* Support typedoc 0.16.1+

### 2.2.3

* Fix security vulnerabilities in dependencies

### 2.2.2

* Fix security vulnerabilities in dependencies

### 2.2.1

* Fix event-stream dependency to 3.3.4 because 3.3.5-3.3.6 have issues.

### 2.2.0

* Fixed security issue in dependency
* Add TypeScript type definitions

### 2.1.2

* Removed deprecated gulp-util dependency

### 2.1.1

* Don't depend on typedoc in package.json dependencies (bugfix by @MattiasBuelens)

### 2.1.0

* Add support for `logger` option.

### 2.0.3

* Don't error when there are no files

### 2.0.2

* Catch any synchronous exceptions from typedoc

### 2.0.1

* Update typedoc URL in README.md (thanks @pascalberger)

### 2.0.0

* Have typedoc as peer dependency (thanks @mizunashi-mana)
* Ensure it works with https://github.com/TypeStrong/typedoc
* Upgrade all packages, replace "del" by "rimraf"
* Fix bugs in README.md

### 1.2.0

* Don't start a child process anymore.
* FIX: having many .ts files no longer causes "command line too long" error.

### 1.1.0

* Allow specifying boolean arguments for typedoc;
* Replace module "gulp-clean" by "del"

### 1.0.6

* Moved to typedoc version 0.2.x

### 1.0.5

* Moved to typedoc version 0.1.x

### 1.0.3

* Use require.resolve() to find typedoc more reliably

### 1.0.2

* Allow any typedoc version 0.0.x

## Contributors

* Rogier Schouten
* Daan Wissing
* Mizunashi Mana
* Pascal Berger
* Pedro Batista
* Matthias Beulens
* Charles Samborski
* Gerrit Birkeland
* @robinprashanth

## License

ISC
