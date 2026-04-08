import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

type Env = 'main' | 'buggy';
const environment = (process.env.RUN_ENV as Env) || 'main';

const envConfig = {
  main: {
    uiBaseUrl: 'https://practicesoftwaretesting.com',
    apiBaseUrl: 'https://api.practicesoftwaretesting.com',
  },
  buggy: {
    uiBaseUrl: 'https://with-bugs.practicesoftwaretesting.com',
    apiBaseUrl: 'https://api-with-bugs.practicesoftwaretesting.com',
  },
} as const;

if (!(environment in envConfig)) {
  throw new Error(`Invalid RUN_ENV: ${environment}. Use "main" or "buggy".`);
}

const { uiBaseUrl, apiBaseUrl } = envConfig[environment];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: uiBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox-ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit-ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: apiBaseUrl,
      },
    },
  ],
});

