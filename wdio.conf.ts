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
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
        },
        {
            maxInstances: 1,
            browserName: 'firefox',
        }
    ],
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
    }
    // Hooks can be added below if needed
}
