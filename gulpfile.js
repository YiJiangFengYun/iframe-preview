const childProcess = require("child_process");
const path = require("path");
const gulp = require("gulp");
const fsExtra = require("fs-extra");

gulp.task("build-production", gulp.series(
    buildAdminWeb(true),
));

gulp.task("build-development", gulp.series(
    buildAdminWeb(),
));

gulp.task("build", gulp.parallel(
    gulp.series(
        buildAdminWeb(),
    ),
    gulp.series(
        buildAdminWeb(true),
    ),
));

function buildAdminWeb(isProduction) {
    return function buildAdminWeb() {
        return buildWebpack(
            path.join(process.cwd(), "."), 
            path.join(process.cwd(), "webpack.config.js"),
            isProduction,
        );
    }
}

function buildWebpack(pathProject, pathConfig, isProduction) {
    const cmd = process.platform === "win32" ? 'webpack-cli.cmd' : 'webpack-cli';
    const params = [
        "--config",
        pathConfig,
    ];
    if (isProduction) {
        return spawnCmd(
            cmd, 
            { cwd: pathProject },
            ...params,
        );
    } else {
        return spawnCmd(
            cmd, 
            { cwd: pathProject }, 
            ...params,
            "--env",
            "development",
        );
    }
}

/**
 * 
 * @typedef { Object } Options
 * @property { string } cwd
 * 
 * @param { string } command 
 * @param { Options } options 
 * @param  {...any} params 
 */
 function spawnCmd(command, options, ...params) {
    /**
     * @type { import("child_process").SpawnOptionsWithoutStdio }
     */
    const optionsObj = {
        stdio: "inherit",
        windowsHide: true,
    };

    if (options) {
        if (options.cwd) optionsObj.cwd = options.cwd;
    }

    return new Promise((resolve, reject) => {
        let childProc = childProcess.spawn(
            command,
            params,
            optionsObj,
        );
        childProc.once("exit", (code) => {
            if (code) {
                reject(`Failed to execute cmd, params: ${JSON.stringify(params)}`);
            } else {
                resolve();
            }
        });
        childProc.on("error", (err) => {
            console.error(`Spawned process error.`);
            console.error(err);
            reject(err);
        });
    });
}