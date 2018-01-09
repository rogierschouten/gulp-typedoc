import gulpTypedoc from "gulp-typedoc";

const options: gulpTypedoc.Options = {
  out: "./out",
  mode: "file",
  json: "./out/test.json",
  exclude: "**/*.exclude.ts",
  externalPattern: "**/*.external.ts",
  excludeExternals: false,
  excludePrivate: false,
  excludeProtected: false,
  module: "commonjs",
  target: "es5",
  theme: "default",
  name: "Test types",
  readme: "./README.md",
  plugins: ["foo", "bar"],
  hideGenerator: false,
  gaID: "123",
  gaSite: "auto",
  gitRevision: "6352ee5caf389192d8dc1baab2ccce9362857954",
  includes: "./includes",
  media: "./media",
  includeDeclarations: true,
  verbose: true,
  version: true,
  logger: "none",
};

const result: NodeJS.ReadWriteStream = gulpTypedoc(options);
