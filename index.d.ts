declare namespace gulpTypedoc {
  type Logger = (message: string, level: number, newline: boolean) => void;

  /**
   * Typedoc options
   */
  interface Options {
    /**
     * Specifies the location the documentation should be written to.
     */
    out: string;

    /**
     * Specifies the output mode the project is used to be compiled with.
     */
    mode?: "file" | "modules";

    /**
     * Specifies the location and file name a json file describing the project is written to. When specified no
     * documentation will be generated.
     */
    json?: string;

    /**
     * Exclude files by the given pattern when a path is provided as source. Supports standard minimatch patterns
     * (see TypeStrong/typedoc#170)
     */
    exclude?: string;

    /**
     * Turn on parsing of .d.ts declaration files.
     */
    includeDeclarations?: boolean;

    /**
     * Define a pattern for files that should be considered being external.
     */
    externalPattern?: string;

    /**
     * Prevent externally resolved TypeScript files from being documented.
     */
    excludeExternals?: boolean;

    /**
     * Prevent private members from being included in the generated documentation.
     */
    excludePrivate?: boolean;

    /**
     * Prevent protected members from being included in the generated documentation.
     */
    excludeProtected?: boolean;

    /**
     * Specify module code generation: "commonjs", "amd", "system" or "umd".
     */
    module?: "commonjs" | "amd" | "system" | "umd"

    /**
     * Specify ECMAScript target version: "ES3" (default), "ES5" or "ES6"
     */
    target?: string;

    /**
     * Specify the path to the theme that should be used.
     */
    theme?: string;

    /**
     * Set the name of the project that will be used in the header of the template.
     */
    name?: string;

    /**
     * Path to the readme file that should be displayed on the index page. Pass `none` to disable the index page and
     * start the documentation on the globals page.
     */
    readme?: string;

    /**
     * Specify the npm plugins that should be loaded.
     */
    plugins?: string[];

    /**
     * Do not print the TypeDoc link at the end of the page.
     */
    hideGenerator?: boolean;

    /**
     * Set the Google Analytics tracking ID and activate tracking code.
     */
    gaID?: string;

    /**
     * Set the site name for Google Analytics. Defaults to `auto`
     */
    gaSite?: string;

    /**
     * Specifies the fully qualified name of the root symbol. Defaults to global namespace.
     */
    entryPoint?: string;

    /**
     * Use specified revision or branch instead of the last revision for linking to GitHub source files.
     */
    gitRevision?: string;

    /**
     * Specifies the location to look for included documents. One may use [[include:FILENAME]] in comments to include
     * documents from this location.
     */
    includes?: string;

    /**
     * Specifies the location with media files that should be copied to the output directory. In order to create a link
     * to media files use the pattern media://FILENAME in comments.
     */
    media?: string;

    verbose?: boolean;

    version?: boolean;

    logger?: Logger | "none";
  }
}

/**
 * The plugin takes an object, of which all properties are passed transparently to typedoc. Pipe in TypeScript files.
 * The documentation files are not piped out.
 *
 * @param options Typedoc options
 * @return Empty output stream (ends when the files are written)
 */
declare function gulpTypedoc(options: gulpTypedoc.Options): NodeJS.ReadWriteStream;

export = gulpTypedoc;
