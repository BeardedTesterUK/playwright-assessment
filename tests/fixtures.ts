import { test as base } from '@playwright/test';
import { TodoPage } from '../src/pom/TodoPage';

type MyFixtures = {
  todo: TodoPage;
};

export const test = base.extend<MyFixtures>({
  todo: async ({ page }, use) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await use(todo);
  },
});