Senior Automation Engineer Take-Home Assessment

Objective

Automate complex end-to-end workflows using [Playwright](https://playwright.dev/) against a real application. We want to assess your ability to:

- Handle multiple UI states and flows
- Use advanced Playwright techniques (parallel tests, fixtures, intercepts)
- Structure code with Page Object Model (POM)
- Assert on UI + network behavior

Time Estimate

2–4 hours. Please dont spend significantly more than that.

Instructions

1. Fork this repository to your GitHub account.
2. Complete the tasks below.
3. Push your code and create a pull request to your forked repo.
4. Notify us when done.

Tasks

Use this application: [todos](https://todomvc.com/examples/typescript-react/)

Scenarios to automate:

1. End-to-End Task Workflow
   - Add 2 tasks (e.g., "Learn Playwright", "Write tests")
   - Mark the first task as completed
   - Edit the second task to change its name
   - Delete one of the tasks

2. State Validation
   - Use filter tabs (All, Active, Completed) to verify task states
   - Ensure completed items show only under "Completed"
   - Ensure active items show only under "Active"

3. Advanced Techniques
   - Use Page Object Model to organize task interactions
   - Add network request assertions using `page.waitForResponse`
   - Simulate time manipulation to mock due-date-style behavior

4. Bonus
   - Use multiple browser contexts to simulate two users
   - Run tests in parallel with isolated fixtures
   - Add accessibility checks (e.g., `axe-core`)
   - Use GitHub Actions workflow to run the test

Tech Constraints

- Use Playwright with TypeScript
- Tests must run via `npx playwright test`

Evaluation Criteria

- Correctness of test cases and assertions
- Quality of structure and reuse (Page Object Model, fixtures)
- Effective use of Playwright's APIs (waits, context, intercepts)
- Git hygiene (branching, commits)
- Documentation and clarity
