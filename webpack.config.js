const path = require("path");
const fsExtra = require("fs-extra");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    env = env || {};
    const mode = env.development ? "development" : "production";
    const dirDest = env.development ? "build" : "dist";

    return Promise.resolve()
    .then(() => {
        return fsExtra.ensureDir(dirDest);
    })
    .then(() => {
        return fsExtra.emptyDir(`${dirDest}`);
    })
    .then(() => {
        return {
            entry: `./src/index.ts`,
            output: {
                filename: "[fullhash].js",
                path: path.join(process.cwd(), dirDest),
            },
            target: "web",
            // Enable sourcemaps for debugging webpack"s output.
            devtool: mode === "development" ? "source-map" : undefined,
            resolve: {
                // Add ".ts" and ".tsx" as resolvable extensions.
                extensions: [".ts", ".js", ".tsx"]
            },
            module: {
                rules: [
                    // All files with a ".ts" or ".tsx" extension will be handled.
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        // options: {
                        //     configFile: tsConfigName,
                        // }
                        // exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            MiniCssExtractPlugin.loader, // instead of style-loader
                            "css-loader"
                        ],
                    },
                ]
            },
            externals: [],
            plugins: [
                new HtmlWebpackPlugin({
                    title: "Preview",
                    template: "./src/index.html",
                    favicon: "./src/favicon.ico"
                }),
        
                new MiniCssExtractPlugin({
                    filename: '[fullhash].css',
                }),
            ],
            mode: mode,
            optimization: {},
        };
    });
}