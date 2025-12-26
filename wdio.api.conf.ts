import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: "local",

  specs: ["./test/apiTests/specs/**/*.ts"],

  maxInstances: 1,

  logLevel: "error",

  framework: "mocha",

  mochaOpts: {
    ui: "bdd",
    timeout: 30000
  },

  autoCompileOpts: {
    tsNodeOpts: {
      transpileOnly: true
    }
  },

  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--window-size=1280,800']
      }
    },
    {
      maxInstances: 1,
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      }
    }
  ],

  waitforTimeout: 5000
};
