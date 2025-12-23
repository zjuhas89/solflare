# Solflare WebdriverIO E2E Test Suite

This project contains end-to-end (E2E) automated tests for Solflare onboarding and wallet management, using WebdriverIO, TypeScript, and the Page Object pattern.

## Prerequisites
- **Node.js** v18 or newer
- **npm** (comes with Node.js)
- **Google Chrome** browser

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

### In Headless Mode (default)
- This runs all tests in the background (no browser window):
  ```sh
  npm run wdio
  ```
  Or use the VS Code task: **Run WebdriverIO Tests (Headless)**

### In Headed Mode (with browser window)
- This runs tests with the Chrome browser visible:
  ```sh
  npx wdio run wdio.conf.ts --headless=false
  ```
  Or use the VS Code task: **Run WebdriverIO Tests (Headed)**

## Project Structure
- `test/specs/` — E2E test cases (e.g., `createWallet.e2e.ts`)
- `test/pageobjects/` — Page Object classes for each app page (e.g., `walletManagement.page.ts`)
- `wdio.conf.ts` — WebdriverIO configuration
- `.vscode/tasks.json` — VS Code tasks for running tests

## Writing and Maintaining Tests
- Use the Page Object pattern: add new selectors and methods only as needed for your tests.
- Use `data-testid` attributes for selectors whenever possible for stability.

## Troubleshooting
- If selectors do not work, inspect the app in Chrome and update the `data-testid` or class selectors in the page objects.
- If you see errors about missing dependencies, run `npm install` again.
- For async/await errors, ensure you are awaiting all browser and element commands.

## Best Practices
- Keep page objects clean and only expose what is needed for tests.
- Use comments to document selectors and methods.
- Keep test data (like passwords) in variables at the top of your test files for easy changes.

