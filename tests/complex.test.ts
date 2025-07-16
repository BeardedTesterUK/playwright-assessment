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

test('State validation', async ({page}) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTask('Active Task 1');
    await todo.addTask('Active Task 2');
    await todo.addTask('Completed Task');
    await expect(todo.taskLabels()).toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).toContainText(['Active Task 2']);
    await expect(todo.taskLabels()).toContainText(['Completed Task']);

    await todo.filterBy('Active');
    await todo.markTaskCompleted('Completed Task');
    await expect(todo.taskLabels()).toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).toContainText(['Active Task 2']);
    await expect(todo.taskLabels()).not.toContainText(['Completed Task']);

    await todo.filterBy('Completed');
    await expect(todo.taskLabels()).not.toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).not.toContainText(['Active Task 2']);
    await expect(todo.taskLabels()).toContainText(['Completed Task']);

    await todo.filterBy('Active');
    await todo.markAllTasks();
    await expect(todo.taskLabels()).not.toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).not.toContainText(['Active Task 2']);

    await todo.filterBy('Completed');
    await expect(todo.taskLabels()).toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).toContainText(['Active Task 2']);
    await expect(todo.taskLabels()).toContainText(['Completed Task']);

    await todo.clearCompletedTasks();
    await expect(todo.taskLabels()).not.toContainText(['Active Task 1']);
    await expect(todo.taskLabels()).not.toContainText(['Active Task 2']);
    await expect(todo.taskLabels()).not.toContainText(['Completed Task']);

    // Check Total Tasks Displayed
    //await todo.markTaskCompleted();
    // add waits when switching tabs
    // Check Total Tasks
    // Check Task disappears
    // Check tas appears in new area 
    // Will delete test work if two tasks with same name
    // Ste to Active - Click "Mark All" 

});
});