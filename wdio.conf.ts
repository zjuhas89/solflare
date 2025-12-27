import type { Options } from '@wdio/types'

// WebdriverIO configuration for E2E and component tests
export const config: Options.Testrunner = {
    // Runner and compilation settings
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './test/tsconfig.json',
            transpileOnly: true
        }
    },
    // Test spec files
    specs: [
        './test/e2eTests/specs/**/*.ts'
    ],
    exclude: [],
    // Parallelization and browser capabilities
    maxInstances: 1,
    // Allow browser selection via BROWSER env variable (chrome or firefox)
    capabilities: (() => {
        const browser = process.env.BROWSER || 'all';
        if (browser === 'chrome') {
            return [{
                maxInstances: 1,
                browserName: 'chrome',
            }];
        } else if (browser === 'firefox') {
            return [{
                maxInstances: 1,
                browserName: 'firefox',
            }];
        } else {
            // Default: run both Chrome and Firefox
            return [
                {
                    maxInstances: 1,
                    browserName: 'chrome',
                },
                {
                    maxInstances: 1,
                    browserName: 'firefox',
                }
            ];
        }
    })(),
    // Logging and timeouts
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    // Test framework and reporters
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: function () {
        const fs = require('fs');
        const path = require('path');
        // Remove logs/combined.log and logs/error.log
        const logsDir = path.join(process.cwd(), 'logs');
        const logFiles = ['combined.log', 'error.log'];
        for (const logFile of logFiles) {
            const logPath = path.join(logsDir, logFile);
            if (fs.existsSync(logPath)) {
                fs.unlinkSync(logPath);
            }
        }
    },
    before: async function () {
        // Remove all screenshots from errorShots folder
        const fs = await import('fs');
        const path = await import('path');
        const errorShotsDir = path.join(process.cwd(), 'errorShots');
        if (fs.existsSync(errorShotsDir)) {
            for (const file of fs.readdirSync(errorShotsDir)) {
                const filePath = path.join(errorShotsDir, file);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        }
    },
    beforeTest: async function(test) {
        const logger = (await import('./test/utils/logger')).default;
        logger.info(`Test started: ${test.title}`);
    },
    afterTest: async function(test, _context, { error }) {
        if (error && browser) {
            const ScreenshotTp = (await import('./test/utils/screenshot.tp')).default;
            const logger = (await import('./test/utils/logger')).default;
            const screenshotHelper = new ScreenshotTp(browser, 'errorShots');
            await screenshotHelper.take(test.title);
            logger.error(`Test failed: ${test.title}\nError: ${error.message || error}`);
        }
    },
}
