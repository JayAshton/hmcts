# A test suite for https://www.saucedemo.com/

## Install and set up

NodeJS and npm are required. To install any dependencies required run: `npm install`

To install any browsers required by playwright run: `npx playwright install`

Install Allure for reporting:

macOS: `brew install allure`
Windows: `scoop install allure`

## Running the tests

`npx playwright test` - To run all tests, on all browsers, in parallel. The tests written are indepdenent and can run in parallel.

Or selectively e.g. `npx playwright test tests/login.spec.ts --reporter=list --project=chrome`

The following options are also helpful:

`--reporter` - Specify the test reporter, e.g. `list`, `allure-playwright` or `html`

`--project` - The browser, e.g. `chrome`, `webkit`, `edge` or `firefox`. Projects can also be set up for certain viewports e.g. chrome-tablet

`--headed` - Run in headed mode (browser visible when performing actions)

`--ui`- Whether to open the tests in the cypress-like UI mode (also allows you to replay the tests + view network traffic)

`--workers` - The number of workers being used to run the tests

For default values and other configuration, see the [Playwright Config](./playwright.config.ts)

## Test Tags

Tags have been added to their respective spec files, you can run a specific tag like so: `npx playwright test --grep @security`

The following tags have been added:

- `@regression`
- `@security`
- `@a11y`

## Test Reporting

The default HTML report provided by playwright can be opened by running `npx playwright show-report`.

Allure integration has also been added to this project. Run `allure serve` to show the report.

A full allure report has been provided as a [screenshot](./test_report.png). (x1 failure expected as accessibility checks fail due to validation errors markup)

Report artefacts can be cleared using a [script](./scripts/clean-reports.sh) or `npm run playwright:clean`.

## Page Objects, Fragments and Global Setup

For this suite, I have used basic [page objects](./page-objects/) which contain locators and a few methods where useful for re-use in the code.

I have also included space for [fragments](./page-objects/fragments/validation.ts) which typically to contain common components that can be present on more than one page. A fragment is instanciated using a root locator from the page object to give it it's scope.

[Global setup](./global.setup.ts) has been included purely for demonstration purposes of test data ingestion prior to the test execution.

## Users

In this case, the users for this demo app are publically available and thus are simply stored in a [JSON file](./data/users.json).

## Additional Improvements

- If the application were private or credentials were considered secret, it would be helpful to avoid storing that data as plain text. Environment variables could be used instead.
- Instead of directly importing users in each spec, they could be added as a fixture instead. These fixtures could also contain the log in steps instead of repeating in each test.
- The code and tests written has not been linted, only formatted. Nor has it been reviewed by anyone else.
- If these tests were to be extended, it may be beneficial to add a generic login fixture for tests to reuse. This could possibly be via an API (depending on availablility) or storing state/cookies from the browser.
- Given the time restriction no CI workflows have been added to this project. This would be helpful to add if these tests were going to be used in a regular test process.
