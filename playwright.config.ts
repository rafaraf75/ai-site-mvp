import type { PlaywrightTestConfig } from '@playwright/test';

const PORT = 3000;

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  timeout: 30_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: process.platform === 'win32'
      ? `cmd /c "npm run build && npm start"`
      : `npm run build && npm start`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
};

export default config;
