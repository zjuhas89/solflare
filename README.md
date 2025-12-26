# Solflare WebdriverIO E2E & API Test Suite

This project contains end-to-end (E2E) and API automated tests for Solflare onboarding and wallet management, using WebdriverIO, TypeScript, and the Page Object pattern.

## Prerequisites
- **Node.js** v18 or newer
- **npm** (comes with Node.js)
- **Google Chrome** browser
- **Mozilla Firefox** browser

> **Note:** Both Chrome and Firefox must be installed locally to run all tests. You can run tests in a specific browser (see below).

## Project Setup
1. **Clone the repository** (if not already):
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running Tests

### E2E Tests (UI)

#### In Headless Mode (default, both browsers)
- This runs all tests in the background (no browser window):
  ```sh
  npm run wdio
  ```
  Or use the VS Code task: **Run WebdriverIO Tests (Headless)**

#### In Headed Mode (with browser window)
- This runs tests with the browser visible:
  ```sh
  npx wdio run wdio.conf.ts --headless=false
  ```
  Or use the VS Code task: **Run WebdriverIO Tests (Headed)**

#### Run in a Specific Browser Only
- By default, tests run in both Chrome and Firefox. To run only in Chrome or Firefox, edit the `capabilities` array in `wdio.conf.ts` or use environment variables if configured.

### API Tests
- To run API tests only:
  ```sh
  npm run wdio:api
  ```
  Or use the VS Code task: **Run API Tests**

- To run API tests with the alternate WDIO config (if needed):
  ```sh
  npm run wdio:api
  ```

## Project Structure
- `test/e2eTests/specs/` — E2E test cases (e.g., `createWallet.e2e.ts`)
- `test/e2eTests/pageobjects/` — Page Object classes for each app page (e.g., `walletManagement.page.ts`)
- `test/api/` and `test/apiTests/` — API test cases and helpers
- `wdio.conf.ts` — WebdriverIO configuration
- `wdio.api.conf.ts` — WebdriverIO configuration for the API tests
- `.vscode/tasks.json` — VS Code tasks for running tests
- `test/tsconfig.json` — TypeScript config for tests (must be present)

## Writing and Maintaining Tests
- Use the Page Object pattern: add new selectors and methods only as needed for your tests.
- Use `data-testid` attributes for selectors whenever possible for stability.

## Troubleshooting
- If selectors do not work, inspect the app in Chrome or Firefox and update the `data-testid` or class selectors in the page objects.
- If you see errors about missing dependencies, run `npm install` again.
- For async/await errors, ensure you are awaiting all browser and element commands.
- Make sure both Chrome and Firefox are installed if running all tests.

## Best Practices
- Keep page objects clean and only expose what is needed for tests.
- Use comments to document selectors and methods.
- Keep test data (like passwords) in variables at the top of your test files for easy changes.

---

For advanced configuration (cloud/grid, environment variables, or browser selection), see the comments in `wdio.conf.ts` or contact the maintainer.

