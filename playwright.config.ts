import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 3,
  fullyParallel: true,
  use: {
    baseURL: 'https://todomvc.com/examples/typescript-react/',
    headless: false,
  },
});
