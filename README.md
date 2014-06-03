## Synopsis

Gulp plugin to execute the TypeDoc tool by Sebastian Lenz (https://sebastian-lenz.github.io/typedoc)

## Installation

You do not need to install typedoc separately, just install gulp-typedoc:

```shell
npm install --save-dev gulp-typedoc
```

## Usage

The plugin takes an object, of which all properties are passed transparently to the typedoc executable. Pipe in TypeScript files. The documentation files are not piped out, this is a future extension. 

## Code Example

```javascript

var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
	return gulp
		.src(["data/*.ts"])
		.pipe(typedoc({ 
			module: "commonjs", 
			out: "./out", 
			name: "my-project", 
			target: "es5"
		}))
	;
});

```

## Contributors

Rogier Schouten <rogier.schouten@gmail.com>

## License

Apache-2.0


