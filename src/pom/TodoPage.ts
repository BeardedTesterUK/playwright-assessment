<<<<<<< HEAD
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly todoItems: Locator;
  readonly deleteTodo: Locator;
  readonly allTasks: Locator;
  readonly clearCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.locator('.new-todo');
    this.todoItems = page.locator('.todo-list li');
    this.allTasks = page.locator('.toggle-all');
    this.clearCompleted = page.locator('.clear-completed')
  }

  async goto() {
    await this.page.goto('https://todomvc.com/examples/typescript-react/');
  }

  async addTask(task: string) {
    await this.newTodo.fill(task);
    await this.newTodo.press('Enter');
  }

  async markTaskCompleted(label: string) {
    const task = this.page.locator(`.todo-list li:has-text("${label}")`);
    await task.locator('.toggle').click();
  }

  async markAllTasks() {
    await this.allTasks.click();
  }

  async editTask(oldLabel: string, newLabel: string) {
    const task = this.page.locator(`.todo-list li:has-text("${oldLabel}")`);
    await task.dblclick();
    const editInput = task.locator('.edit');
    await editInput.fill(newLabel);
    await editInput.press('Enter');
  }

  async deleteTask(label: string) {
    const task = this.page.locator(`.todo-list li:has-text("${label}")`);
    await task.hover();
    await task.locator('.destroy').click({ force: true });
  }

  async clearCompletedTasks(){
    if (await this.clearCompleted.isVisible() && await this.clearCompleted.isEnabled()) {
      await this.clearCompleted.click();
    };
  }

  async filterBy(filter: 'All' | 'Active' | 'Completed') {
    await this.page.locator('footer a', { hasText: filter}).click();
  }

  taskLabels() {
    return this.todoItems.locator('label');
  }
}
=======
import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly todoItems: Locator;
  readonly deleteTodo: Locator;
  readonly allTasks: Locator;
  readonly clearCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.locator('.new-todo');
    this.todoItems = page.locator('.todo-list li');
    this.allTasks = page.locator('.toggle-all');
    this.clearCompleted = page.locator('.clear-completed')
  }

  async goto() {
    await this.page.goto('https://todomvc.com/examples/typescript-react/');
  }

  async addTask(task: string) {
    await this.newTodo.fill(task);
    await this.newTodo.press('Enter');
  }

  async markTaskCompleted(label: string) {
    const task = this.page.locator(`.todo-list li:has-text("${label}")`);
    await task.locator('.toggle').click();
  }

  async markAllTasks() {
    await this.allTasks.click();
  }

  async editTask(oldLabel: string, newLabel: string) {
    const task = this.page.locator(`.todo-list li:has-text("${oldLabel}")`);
    await task.dblclick();
    const editInput = task.locator('.edit');
    await editInput.fill(newLabel);
    await editInput.press('Enter');
  }

  async deleteTask(label: string) {
    const task = this.page.locator(`.todo-list li:has-text("${label}")`);
    await task.hover();
    await task.locator('.destroy').click({ force: true });
  }

  async clearCompletedTasks(){
    if (await this.clearCompleted.isVisible() && await this.clearCompleted.isEnabled()) {
      await this.clearCompleted.click();
    };
  }

  async filterBy(filter: 'All' | 'Active' | 'Completed') {
    await this.page.locator('footer a', { hasText: filter}).click();
  }

  taskLabels() {
    return this.todoItems.locator('label');
  }
}
>>>>>>> a98aece (New Test Caseses Added:)
