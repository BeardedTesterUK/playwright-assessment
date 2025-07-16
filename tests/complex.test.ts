import { test, expect } from '@playwright/test';
import { TodoPage } from '../src/pom/TodoPage';

test.describe('TodoMVC Advanced Workflow', () => {
  test('should handle complex todo scenario', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();

    await todo.addTask('Learn Playwright');
    await todo.addTask('Write tests');
    await todo.markTaskCompleted('Learn Playwright');
    await todo.editTask('Write tests', 'Write better tests');
    await todo.deleteTask('Learn Playwright');

    await todo.filterBy('Active');
    await expect(todo.taskLabels()).toContainText(['Write better tests']);

    await todo.filterBy('Completed');
    await expect(todo.taskLabels()).not.toContainText(['Learn Playwright']);
  });
});
