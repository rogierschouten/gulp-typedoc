## Synopsis

Gulp plugin to execute the TypeDoc tool by Sebastian Lenz (https://sebastian-lenz.github.io/typedoc)

## Code Example

```javascript

var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function() {
	return gulp
		.src(["data/*.ts"])
		.pipe(typedoc({args: ["--module", "commonjs", "--out", "./doc", "--name", "gulp-typedoc-test", "--target", "es5"]}))
	;
});

```

## Contributors

Rogier Schouten <rogier.schouten@gmail.com>

## License

Apache-2.0


