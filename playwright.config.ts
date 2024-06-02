import { defineConfig, devices } from '@playwright/test';

const TEST_DIRECTORY = __dirname + '/tests';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 8 : 0,
  workers: process.env.CI ? 2 : undefined, // As we are running against a public app we should avoid running too many parallel tests.
  reporter: [['list'], ['allure-playwright'], ['html']],
  grep: process.env.TEST_TAG ? RegExp(process.env.TEST_TAG) : undefined,

  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], video: 'retain-on-failure' },
      dependencies: ['setup'],
      testDir: TEST_DIRECTORY,
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], video: 'retain-on-failure' },
      dependencies: ['setup'],
      testDir: TEST_DIRECTORY,
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], video: 'retain-on-failure' },
      dependencies: ['setup'],
      testDir: TEST_DIRECTORY,
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        video: 'retain-on-failure',
        channel: 'msedge',
      },
      dependencies: ['setup'],
      testDir: TEST_DIRECTORY,
    },
  ],
});
