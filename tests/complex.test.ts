import { test, expect } from '@playwright/test';
import { TodoPage } from '../src/pom/TodoPage';
import { advanceTime, mockTime } from '../src/pom/utils/utils';
import AxeBuilder from '@axe-core/playwright';


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
  });

  test('Complete ToDo List for Two Users', async ({ browser }) => {
    const user1Context = await browser.newContext();
    const user2Context = await browser.newContext();

    const user1Page = await user1Context.newPage();
    const user2Page = await user2Context.newPage();

    const todoUser1 = new TodoPage(user1Page);
    const todoUser2 = new TodoPage(user2Page);

    await todoUser1.goto()
    await todoUser2.goto()

    await todoUser1.addTask('User 1 Task 1');
    await todoUser1.addTask('User 1 Task 2');
    await todoUser2.addTask('User 2 Task 1');
    await todoUser2.addTask('User 2 Task 2');
    await todoUser2.addTask('User 2 Task 3');
  });

  // I could not get this to work at this time but wanted to keep it to show direction was going
  // test('Inject Date Time', async ({ page }) => {
  //   const todo = new TodoPage(page);
  //   const morningTime = new Date('2025-08-07T08:00:00Z');
  //   await mockTime(todo.page, morningTime.toISOString())
  //   await todo.goto();

  //   const initialTime = await page.evaluate(() => new Date().toISOString());
  //   expect(initialTime).toBe(morningTime.toISOString());

  //   await todo.addTask("Morning Task Added");
  //   await advanceTime(todo.page, 5)
  //   await todo.addTask("Afternoon Task Added");

  //   await expect(todo.taskLabels()).toContainText([`Morning Task Added`]);
  //   await expect(todo.taskLabels()).toContainText([`Afternoon Task Added`]);
  // });

  test('Network assertions', async ({page}) => {
    const todo = new TodoPage(page);
    const responsePromise = todo.page.waitForResponse('https://todomvc.com/examples/typescript-react/');
    await todo.goto();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
  });

  test('Accessibility checks', async ({page}) => {
    const todo = new TodoPage(page);
    await todo.goto();
    const scanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a']) // Include wcag2aa to see all violations 
    .analyze();

    expect(scanResults.violations).toEqual([]);
  });

});