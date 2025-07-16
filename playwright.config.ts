import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://todomvc.com/examples/typescript-react/',
    headless: false,
  },
});
