# class: TestStepInfo
* since: v1.51
* langs: js

`TestStepInfo` contains information about currently running test step. It is passed as an argument to the step function. `TestStepInfo` provides utilities to control test step execution.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page, browserName }) => {
  await test.step('check some behavior', async step => {
    step.skip(browserName === 'webkit', 'The feature is not available in WebKit');
    // ... rest of the step code
  });
});
```

## async method: TestStepInfo.attach
* since: v1.51

Attach a value or a file from disk to the current test step. Some reporters show test step attachments. Either [`option: path`] or [`option: body`] must be specified, but not both. Calling this method will attribute the attachment to the step, as opposed to [`method: TestInfo.attach`] which stores all attachments at the test level.

For example, you can attach a screenshot to the test step:

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await test.step('check page rendering', async step => {
    const screenshot = await page.screenshot();
    await step.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });
});
```

Or you can attach files returned by your APIs:

```js
import { test, expect } from '@playwright/test';
import { download } from './my-custom-helpers';

test('basic test', async ({}) => {
  await test.step('check download behavior', async step => {
    const tmpPath = await download('a');
    await step.attach('downloaded', { path: tmpPath });
  });
});
```

:::note
[`method: TestStepInfo.attach`] automatically takes care of copying attached files to a
location that is accessible to reporters. You can safely remove the attachment
after awaiting the attach call.
:::

### param: TestStepInfo.attach.name
* since: v1.51
- `name` <[string]>

Attachment name. The name will also be sanitized and used as the prefix of file name
when saving to disk.

### option: TestStepInfo.attach.body
* since: v1.51
- `body` <[string]|[Buffer]>

Attachment body. Mutually exclusive with [`option: path`].

### option: TestStepInfo.attach.contentType
* since: v1.51
- `contentType` <[string]>

Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`. If omitted, content type is inferred based on the [`option: path`], or defaults to `text/plain` for [string] attachments and `application/octet-stream` for [Buffer] attachments.

### option: TestStepInfo.attach.path
* since: v1.51
- `path` <[string]>

Path on the filesystem to the attached file. Mutually exclusive with [`option: body`].

## method: TestStepInfo.skip#1
* since: v1.51

Abort the currently running step and mark it as skipped. Useful for steps that are currently failing and planned for a near-term fix.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await test.step('check expectations', async step => {
    step.skip();
    // step body below will not run
    // ...
  });
});
```

## method: TestStepInfo.skip#2
* since: v1.51

Conditionally abort the currently running step and mark it as skipped with an optional description. Useful for steps that should not be executed in some cases.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('my test', async ({ page, isMobile }) => {
  await test.step('check desktop expectations', async step => {
    step.skip(isMobile, 'not present in the mobile layout');
    // step body below will not run
    // ...
  });
});
```

### param: TestStepInfo.skip#2.condition
* since: v1.51
- `condition` <[boolean]>

A skip condition. Test step is skipped when the condition is `true`.

### param: TestStepInfo.skip#2.description
* since: v1.51
- `description` ?<[string]>

Optional description that will be reflected in a test report.

## property: TestStepInfo.titlePath
* since: v1.55
- type: <[Array]<[string]>>

The full title path starting with the test file name, including the step titles. See also [`property: TestInfo.titlePath`].
# class: TestProject
* since: v1.10
* langs: js

Playwright Test supports running multiple test projects at the same time. This is useful for running tests in multiple configurations. For example, consider running tests against multiple browsers. This type describes format of a project in the configuration file, to access resolved configuration parameters at run time use [FullProject].

`TestProject` encapsulates configuration specific to a single project. Projects are configured in [`property: TestConfig.projects`] specified in the [configuration file](../test-configuration.md). Note that all properties of [TestProject] are available in the top-level [TestConfig], in which case they are shared between all projects.

Here is an example configuration that runs every test in Chromium, Firefox and WebKit, both Desktop and Mobile versions.

```js title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Options shared for all projects.
  timeout: 30000,
  use: {
    ignoreHTTPSErrors: true,
  },

  // Options specific to each project.
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
    },
    {
      name: 'Mobile Chrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
});
```

## property: TestProject.dependencies
* since: v1.31
- type: ?<[Array]<[string]>>

List of projects that need to run before any test in this project runs. Dependencies can
be useful for configuring the global setup actions in a way that every action is
in a form of a test. Passing `--no-deps` argument ignores the dependencies and
behaves as if they were not specified.

Using dependencies allows global setup to produce traces and other artifacts,
see the setup steps in the test report, etc.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
    },
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
      dependencies: ['setup'],
    },
  ],
});
```

## property: TestProject.expect
* since: v1.10
- type: ?<[Object]>
  - `timeout` ?<[int]> Default timeout for async expect matchers in milliseconds, defaults to 5000ms.
  - `toHaveScreenshot` ?<[Object]> Configuration for the [`method: PageAssertions.toHaveScreenshot#1`] method.
    - `threshold` ?<[float]> an acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
    - `maxDiffPixels` ?<[int]> an acceptable amount of pixels that could be different, unset by default.
    - `maxDiffPixelRatio` ?<[float]> an acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default.
    - `animations` ?<[ScreenshotAnimations]<"allow"|"disabled">> See [`option: Page.screenshot.animations`] in [`method: Page.screenshot`]. Defaults to `"disabled"`.
    - `caret` ?<[ScreenshotCaret]<"hide"|"initial">> See [`option: Page.screenshot.caret`] in [`method: Page.screenshot`]. Defaults to `"hide"`.
    - `scale` ?<[ScreenshotScale]<"css"|"device">> See [`option: Page.screenshot.scale`] in [`method: Page.screenshot`]. Defaults to `"css"`.
    - `stylePath` ?<[string]|[Array]<[string]>> See [`option: Page.screenshot.style`] in [`method: Page.screenshot`].
    - `pathTemplate` ?<[string]> A template controlling location of the screenshots. See [`property: TestProject.snapshotPathTemplate`] for details.
  - `toMatchAriaSnapshot` ?<[Object]> Configuration for the [`method: LocatorAssertions.toMatchAriaSnapshot#2`] method.
    - `pathTemplate` ?<[string]> A template controlling location of the aria snapshots. See [`property: TestProject.snapshotPathTemplate`] for details.
  - `toMatchSnapshot` ?<[Object]> Configuration for the [`method: SnapshotAssertions.toMatchSnapshot#1`] method.
    - `threshold` ?<[float]> an acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
    - `maxDiffPixels` ?<[int]> an acceptable amount of pixels that could be different, unset by default.
    - `maxDiffPixelRatio` ?<[float]> an acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default.
  - `toPass` ?<[Object]> Configuration for the [expect(value).toPass()](../test-assertions.md) method.
    - `timeout` ?<[int]> timeout for toPass method in milliseconds.
    - `intervals` ?<[Array]<[int]>> probe intervals for toPass method in milliseconds.

Configuration for the `expect` assertion library.

Use [`property: TestConfig.expect`] to change this option for all projects.

## property: TestProject.fullyParallel
* since: v1.10
- type: ?<[boolean]>

Playwright Test runs tests in parallel. In order to achieve that, it runs several worker processes that run at the same time.
By default, **test files** are run in parallel. Tests in a single file are run in order, in the same worker process.

You can configure entire test project to concurrently run all tests in all files using this option.

## property: TestProject.grep
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title matching one of the patterns. For example, passing `grep: /cart/` should only run tests with "cart" in the title. Also available globally and in the [command line](../test-cli.md) with the `-g` option. The regular expression will be tested against the string that consists of the project name, the test file name, the `test.describe` name (if any), the test name and the test tags divided by spaces, e.g. `chromium my-test.spec.ts my-suite my-test`.

`grep` option is also useful for [tagging tests](../test-annotations.md#tag-tests).

## property: TestProject.grepInvert
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title **not** matching any of the patterns. This is the opposite of [`property: TestProject.grep`]. Also available globally and in the [command line](../test-cli.md) with the `--grep-invert` option.

`grepInvert` option is also useful for [tagging tests](../test-annotations.md#tag-tests).

## property: TestProject.ignoreSnapshots
* since: v1.44
- type: ?<[boolean]>

Whether to skip snapshot expectations, such as `expect(value).toMatchSnapshot()` and `await expect(page).toHaveScreenshot()`.

**Usage**

The following example will only perform screenshot assertions on Chromium.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
      ignoreSnapshots: true,
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
      ignoreSnapshots: true,
    },
  ],
});
```

## property: TestProject.metadata
* since: v1.10
- type: ?<[Metadata]>

Metadata that will be put directly to the test report serialized as JSON.

## property: TestProject.name
* since: v1.10
- type: ?<[string]>

Project name is visible in the report and during test execution.

:::warning
Playwright executes the configuration file multiple times. Do not dynamically produce non-stable values in your configuration.
:::

## property: TestProject.snapshotDir
* since: v1.10
- type: ?<[string]>

The base directory, relative to the config file, for snapshot files created with `toMatchSnapshot`. Defaults to [`property: TestProject.testDir`].

The directory for each test can be accessed by [`property: TestInfo.snapshotDir`] and [`method: TestInfo.snapshotPath`].

This path will serve as the base directory for each test file snapshot directory. Setting `snapshotDir` to `'snapshots'`, the [`property: TestInfo.snapshotDir`] would resolve to `snapshots/a.spec.js-snapshots`.

## property: TestProject.snapshotPathTemplate = %%-test-config-snapshot-path-template-%%
* since: v1.28

## property: TestProject.outputDir
* since: v1.10
- type: ?<[string]>

The output directory for files created during test execution. Defaults to `<package.json-directory>/test-results`.

This directory is cleaned at the start. When running a test, a unique subdirectory inside the [`property: TestProject.outputDir`] is created, guaranteeing that test running in parallel do not conflict. This directory can be accessed by [`property: TestInfo.outputDir`] and [`method: TestInfo.outputPath`].

Here is an example that uses [`method: TestInfo.outputPath`] to create a temporary file.

```js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the file', 'utf8');
});
```

Use [`property: TestConfig.outputDir`] to change this option for all projects.

## property: TestProject.repeatEach
* since: v1.10
- type: ?<[int]>

The number of times to repeat each test, useful for debugging flaky tests.

Use [`property: TestConfig.repeatEach`] to change this option for all projects.

## property: TestProject.respectGitIgnore
* since: v1.45
- type: ?<[boolean]>

Whether to skip entries from `.gitignore` when searching for test files. By default, if neither [`property: TestConfig.testDir`] nor [`property: TestProject.testDir`] are explicitly specified, Playwright will ignore any test files matching `.gitignore` entries. This option allows to override that behavior.

## property: TestProject.retries
* since: v1.10
- type: ?<[int]>

The maximum number of retry attempts given to failed tests. Learn more about [test retries](../test-retries.md#retries).

Use [`method: Test.describe.configure`] to change the number of retries for a specific file or a group of tests.

Use [`property: TestConfig.retries`] to change this option for all projects.


## property: TestProject.teardown
* since: v1.34
- type: ?<[string]>

Name of a project that needs to run after this and all dependent projects have finished. Teardown is useful to cleanup any resources acquired by this project.

Passing `--no-deps` argument ignores [`property: TestProject.teardown`] and behaves as if it was not specified.

**Usage**

A common pattern is a "setup" dependency that has a corresponding "teardown":

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /global.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: devices['Desktop Safari'],
      dependencies: ['setup'],
    },
  ],
});
```

## property: TestProject.testDir
* since: v1.10
- type: ?<[string]>

Directory that will be recursively scanned for test files. Defaults to the directory of the configuration file.

Each project can use a different directory. Here is an example that runs smoke tests in three browsers and all other tests in stable Chrome browser.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Smoke Chromium',
      testDir: './smoke-tests',
      use: {
        browserName: 'chromium',
      }
    },
    {
      name: 'Smoke WebKit',
      testDir: './smoke-tests',
      use: {
        browserName: 'webkit',
      }
    },
    {
      name: 'Smoke Firefox',
      testDir: './smoke-tests',
      use: {
        browserName: 'firefox',
      }
    },
    {
      name: 'Chrome Stable',
      testDir: './',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      }
    },
  ],
});
```

Use [`property: TestConfig.testDir`] to change this option for all projects.

## property: TestProject.testIgnore
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Files matching one of these patterns are not executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

For example, `'**/test-assets/**'` will ignore any files in the `test-assets` directory.

Use [`property: TestConfig.testIgnore`] to change this option for all projects.

## property: TestProject.testMatch
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

By default, Playwright looks for files matching the following glob pattern: `**/*.@(spec|test).?(c|m)[jt]s?(x)`. This means JavaScript or TypeScript files with `".test"` or `".spec"` suffix, for example `login-screen.wrong-credentials.spec.ts`.

Use [`property: TestConfig.testMatch`] to change this option for all projects.

## property: TestProject.timeout
* since: v1.10
- type: ?<[int]>

Timeout for each test in milliseconds. Defaults to 30 seconds.

This is a base timeout for all tests. Each test can configure its own timeout with [`method: Test.setTimeout`]. Each file or a group of tests can configure the timeout with [`method: Test.describe.configure`].

Use [`property: TestConfig.timeout`] to change this option for all projects.

## property: TestProject.use
* since: v1.10
- type: ?<[TestOptions]>

Options for all tests in this project, for example [`property: TestOptions.browserName`]. Learn more about [configuration](../test-configuration.md) and see [available options][TestOptions].

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
```

Use [`property: TestConfig.use`] to change this option for all projects.

## property: TestProject.workers
* since: v1.52
- type: ?<[int]|[string]>

The maximum number of concurrent worker processes to use for parallelizing tests from this project. Can also be set as percentage of logical CPU cores, e.g. `'50%'.`

This could be useful, for example, when all tests from a project share a single resource like a test account, and therefore cannot be executed in parallel. Limiting workers to one for such a project will prevent simultaneous use of the shared resource.

Note that the global [`property: TestConfig.workers`] limit applies to the total number of worker processes. However, Playwright will limit the number of workers used for this project by the value of [`property: TestProject.workers`].

By default, there is no limit per project. See [`property: TestConfig.workers`] for the default of the total worker limit.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 10,  // total workers limit

  projects: [
    {
      name: 'runs in parallel',
    },
    {
      name: 'one at a time',
      workers: 1,  // workers limit for this project
    },
  ],
});
```
# class: Location
* since: v1.10
* langs: js

Represents a location in the source code where [TestCase] or [Suite] is defined.

## property: Location.file
* since: v1.10
- type: <[string]>

Path to the source file.

## property: Location.line
* since: v1.10
- type: <[int]>

Line number in the source file.

## property: Location.column
* since: v1.10
- type: <[int]>

Column number in the source file.
# class: FullConfig
* since: v1.10
* langs: js

Resolved configuration which is accessible via [`property: TestInfo.config`] and is passed to the test reporters. To see the format of Playwright configuration file, please see [TestConfig] instead.

## property: FullConfig.configFile
* since: v1.20
- type: ?<[string]>

Path to the configuration file used to run the tests. The value is an empty string if no config file was used.

## property: FullConfig.forbidOnly
* since: v1.10
- type: <[boolean]>

See [`property: TestConfig.forbidOnly`].

## property: FullConfig.fullyParallel
* since: v1.20
- type: <[boolean]>

See [`property: TestConfig.fullyParallel`].

## property: FullConfig.globalSetup
* since: v1.10
- type: <[null]|[string]>

See [`property: TestConfig.globalSetup`].

## property: FullConfig.globalTeardown
* since: v1.10
- type: <[null]|[string]>

See [`property: TestConfig.globalTeardown`].

## property: FullConfig.globalTimeout
* since: v1.10
- type: <[int]>

See [`property: TestConfig.globalTimeout`].

## property: FullConfig.grep
* since: v1.10
- type: <[RegExp]|[Array]<[RegExp]>>

See [`property: TestConfig.grep`].

## property: FullConfig.grepInvert
* since: v1.10
- type: <[null]|[RegExp]|[Array]<[RegExp]>>

See [`property: TestConfig.grepInvert`].

## property: FullConfig.maxFailures
* since: v1.10
- type: <[int]>

See [`property: TestConfig.maxFailures`].

## property: FullConfig.metadata
* since: v1.10
- type: <[Metadata]>

See [`property: TestConfig.metadata`].

## property: FullConfig.preserveOutput
* since: v1.10
- type: <[PreserveOutput]<"always"|"never"|"failures-only">>

See [`property: TestConfig.preserveOutput`].

## property: FullConfig.projects
* since: v1.10
- type: <[Array]<[FullProject]>>

List of resolved projects.

## property: FullConfig.quiet
* since: v1.10
- type: <[boolean]>

See [`property: TestConfig.quiet`].

## property: FullConfig.reporter
* since: v1.10
- type: <[string]|[Array]<[Object]>|[BuiltInReporter]<"list"|"dot"|"line"|"github"|"json"|"junit"|"null"|"html">>
  - `0` <[string]> Reporter name or module or file path
  - `1` <[Object]> An object with reporter options if any

See [`property: TestConfig.reporter`].

## property: FullConfig.reportSlowTests
* since: v1.10
- type: <[null]|[Object]>
  - `max` <[int]> The maximum number of slow test files to report.
  - `threshold` <[float]> Test file duration in milliseconds that is considered slow.

See [`property: TestConfig.reportSlowTests`].

## property: FullConfig.rootDir
* since: v1.20
- type: <[string]>

Base directory for all relative paths used in the reporters.

## property: FullConfig.runAgents
* since: v1.58
- type: <['RunAgentsMode]<"all"|"missing"|"none">>

Whether to run LLM agent for [PageAgent]:
* "all" disregards existing cache and performs all actions via LLM
* "missing" only performs actions that don't have generated cache actions
* "none" does not talk to LLM at all, relies on the cached actions (default)

## property: FullConfig.shard
* since: v1.10
- type: <[null]|[Object]>
  - `total` <[int]> The total number of shards.
  - `current` <[int]> The index of the shard to execute, one-based.

See [`property: TestConfig.shard`].

## property: FullConfig.tags
* since: v1.57
- type: <[Array]<[string]>>

Resolved global tags. See [`property: TestConfig.tag`].

## property: FullConfig.updateSnapshots
* since: v1.10
- type: <[UpdateSnapshots]<"all"|"changed"|"missing"|"none">>

See [`property: TestConfig.updateSnapshots`].

## property: FullConfig.updateSourceMethod
* since: v1.50
- type: <[UpdateSourceMethod]<"overwrite"|"3way"|"patch">>

See [`property: TestConfig.updateSourceMethod`].

## property: FullConfig.version
* since: v1.20
- type: <[string]>

Playwright version.

## property: FullConfig.webServer
* since: v1.10
- type: <[null]|[Object]>

See [`property: TestConfig.webServer`].

## property: FullConfig.workers
* since: v1.10
- type: <[int]>

See [`property: TestConfig.workers`].
# class: Fixtures
* since: v1.10
* langs: js

Playwright Test is based on the concept of the [test fixtures](../test-fixtures.md). Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else.

Playwright Test looks at each test declaration, analyses the set of fixtures the test needs and prepares those fixtures specifically for the test. Values prepared by the fixtures are merged into a single object that is available to the `test`, hooks, annotations and other fixtures as a first parameter.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  // ...
});
```

Given the test above, Playwright Test will set up the `page` fixture before running the test, and tear it down after the test has finished. `page` fixture provides a [Page] object that is available to the test.

Playwright Test comes with builtin fixtures listed below, and you can add your own fixtures as well. Playwright Test also [provides options][TestOptions] to  configure [`property: Fixtures.browser`], [`property: Fixtures.context`] and [`property: Fixtures.page`].

## property: Fixtures.agent
* since: v1.58
- type: <[PageAgent]>

## property: Fixtures.browser
* since: v1.10
- type: <[Browser]>

[Browser] instance is shared between all tests in the [same worker](../test-parallel.md) - this makes testing efficient. However, each test runs in an isolated [BrowserContext]  and gets a fresh environment.

Learn how to [configure browser](../test-configuration.md) and see [available options][TestOptions].

**Usage**

```js
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  // ...
});
```

## property: Fixtures.browserName
* since: v1.10
- type: <[BrowserName]<"chromium"|"firefox"|"webkit">>

Name of the browser that runs tests. Defaults to `'chromium'`. Useful to [annotate tests](../test-annotations.md) based on the browser.

**Usage**

```js
test('skip this test in Firefox', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
  // ...
});
```

## property: Fixtures.context
* since: v1.10
- type: <[BrowserContext]>

Isolated [BrowserContext] instance, created for each test. Since contexts are isolated between each other, every test gets a fresh environment, even when multiple tests run in a single [Browser] for maximum efficiency.

Learn how to [configure context](../test-configuration.md) and see [available options][TestOptions].

Default [`property: Fixtures.page`] belongs to this context.

**Usage**

```js
test('example test', async ({ page, context }) => {
  await context.route('*external.com/*', route => route.abort());
  // ...
});
```

## property: Fixtures.page
* since: v1.10
- type: <[Page]>

Isolated [Page] instance, created for each test. Pages are isolated between tests due to [`property: Fixtures.context`] isolation.

This is the most common fixture used in a test.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/signin');
  await page.getByLabel('User Name').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByText('Sign in').click();
  // ...
});
```

## property: Fixtures.request
* since: v1.10
- type: <[APIRequestContext]>

Isolated [APIRequestContext] instance for each test.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ request }) => {
  await request.post('/signin', {
    data: {
      username: 'user',
      password: 'password'
    }
  });
  // ...
});
```
# class: TestConfig
* since: v1.10
* langs: js

Playwright Test provides many options to configure how your tests are collected and executed, for example `timeout` or `testDir`. These options are described in the [TestConfig] object in the [configuration file](../test-configuration.md). This type describes format of the configuration file, to access resolved configuration parameters at run time use [FullConfig].

Playwright Test supports running multiple test projects at the same time. Project-specific options should be put to [`property: TestConfig.projects`], but top-level [TestConfig] can also define base options shared between all projects.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './tests',
});
```

## property: TestConfig.build
* since: v1.35
- type: ?<[Object]>
  - `external` ?<[Array]<[string]>> Paths to exclude from the transpilation expressed as a list of glob patterns. Typically heavy JS bundles that your test uses are listed here.

Playwright transpiler configuration.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  build: {
    external: ['**/*bundle.js'],
  },
});
```

## property: TestConfig.captureGitInfo
* since: v1.51
- type: ?<[Object]>
  - `commit` ?<boolean> Whether to capture commit and pull request information such as hash, author, timestamp.
  - `diff` ?<boolean> Whether to capture commit diff.

These settings control whether git information is captured and stored in the config [`property: TestConfig.metadata`].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  captureGitInfo: { commit: true, diff: true }
});
```

**Details**

* Capturing `commit` information is useful when you'd like to see it in your HTML (or a third party) report.
* Capturing `diff` information is useful to enrich the report with the actual source diff. This information can be used to provide intelligent advice on how to fix the test.

:::note
Default values for these settings depend on the environment. When tests run as a part of CI where it is safe to obtain git information, the default value is `true`, `false` otherwise.
:::

:::note
The structure of the git commit metadata is subject to change.
:::


## property: TestConfig.expect
* since: v1.10
- type: ?<[Object]>
  - `timeout` ?<[int]> Default timeout for async expect matchers in milliseconds, defaults to 5000ms.
  - `toHaveScreenshot` ?<[Object]> Configuration for the [`method: PageAssertions.toHaveScreenshot#1`] method.
    - `animations` ?<[ScreenshotAnimations]<"allow"|"disabled">> See [`option: Page.screenshot.animations`] in [`method: Page.screenshot`]. Defaults to `"disabled"`.
    - `caret` ?<[ScreenshotCaret]<"hide"|"initial">> See [`option: Page.screenshot.caret`] in [`method: Page.screenshot`]. Defaults to `"hide"`.
    - `maxDiffPixels` ?<[int]> An acceptable amount of pixels that could be different, unset by default.
    - `maxDiffPixelRatio` ?<[float]> An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default.
    - `scale` ?<[ScreenshotScale]<"css"|"device">> See [`option: Page.screenshot.scale`] in [`method: Page.screenshot`]. Defaults to `"css"`.
    - `stylePath` ?<[string]|[Array]<[string]>> See [`option: Page.screenshot.style`] in [`method: Page.screenshot`].
    - `threshold` ?<[float]> An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
    - `pathTemplate` ?<[string]> A template controlling location of the screenshots. See [`property: TestConfig.snapshotPathTemplate`] for details.
  - `toMatchAriaSnapshot` ?<[Object]> Configuration for the [`method: LocatorAssertions.toMatchAriaSnapshot#2`] method.
    - `pathTemplate` ?<[string]> A template controlling location of the aria snapshots. See [`property: TestConfig.snapshotPathTemplate`] for details.
  - `toMatchSnapshot` ?<[Object]> Configuration for the [`method: SnapshotAssertions.toMatchSnapshot#1`] method.
    - `maxDiffPixels` ?<[int]> An acceptable amount of pixels that could be different, unset by default.
    - `maxDiffPixelRatio` ?<[float]> An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default.
    - `threshold` ?<[float]> An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
  - `toPass` ?<[Object]> Configuration for the [expect(value).toPass()](../test-assertions.md#expecttopass) method.
    - `intervals` ?<[Array]<[int]>> Probe intervals for toPass method in milliseconds.
    - `timeout` ?<[int]> Timeout for toPass method in milliseconds.

Configuration for the `expect` assertion library. Learn more about [various timeouts](../test-timeouts.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      maxDiffPixels: 10,
    },
  },
});
```

## property: TestConfig.failOnFlakyTests
* since: v1.52
- type: ?<[boolean]>

Whether to exit with an error if any tests are marked as flaky. Useful on CI.

Also available in the [command line](../test-cli.md) with the `--fail-on-flaky-tests` option.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  failOnFlakyTests: !!process.env.CI,
});
```

## property: TestConfig.forbidOnly
* since: v1.10
- type: ?<[boolean]>

Whether to exit with an error if any tests or groups are marked as [`method: Test.only`] or [`method: Test.describe.only`]. Useful on CI.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
});
```

## property: TestConfig.fullyParallel
* since: v1.20
- type: ?<[boolean]>

Playwright Test runs tests in parallel. In order to achieve that, it runs several worker processes that run at the same time.
By default, **test files** are run in parallel. Tests in a single file are run in order, in the same worker process.

You can configure entire test run to concurrently execute all tests in all files using this option.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
});
```

## property: TestConfig.globalSetup
* since: v1.10
- type: ?<[string]|[Array]<[string]>>

Path to the global setup file. This file will be required and run before all the tests. It must export a single function that takes a [FullConfig] argument. Pass an array of paths to specify multiple global setup files.

Learn more about [global setup and teardown](../test-global-setup-teardown.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup',
});
```

## property: TestConfig.globalTeardown
* since: v1.10
- type: ?<[string]|[Array]<[string]>>

Path to the global teardown file. This file will be required and run after all the tests. It must export a single function. See also [`property: TestConfig.globalSetup`]. Pass an array of paths to specify multiple global teardown files.

Learn more about [global setup and teardown](../test-global-setup-teardown.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTeardown: './global-teardown',
});
```

## property: TestConfig.globalTimeout
* since: v1.10
- type: ?<[int]>

Maximum time in milliseconds the whole test suite can run. Zero timeout (default) disables this behavior. Useful on CI to prevent broken setup from running too long and wasting resources. Learn more about [various timeouts](../test-timeouts.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
});
```

## property: TestConfig.grep
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title matching one of the patterns. For example, passing `grep: /cart/` should only run tests with "cart" in the title. Also available in the [command line](../test-cli.md) with the `-g` option. The regular expression will be tested against the string that consists of the project name, the test file name, the `test.describe` name (if any), the test name and the test tags divided by spaces, e.g. `chromium my-test.spec.ts my-suite my-test`.

`grep` option is also useful for [tagging tests](../test-annotations.md#tag-tests).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  grep: /smoke/,
});
```

## property: TestConfig.grepInvert
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title **not** matching one of the patterns. This is the opposite of [`property: TestConfig.grep`]. Also available in the [command line](../test-cli.md) with the `--grep-invert` option.

`grepInvert` option is also useful for [tagging tests](../test-annotations.md#tag-tests).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  grepInvert: /manual/,
});
```

## property: TestConfig.ignoreSnapshots
* since: v1.26
- type: ?<[boolean]>

Whether to skip snapshot expectations, such as `expect(value).toMatchSnapshot()` and `await expect(page).toHaveScreenshot()`.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ignoreSnapshots: !process.env.CI,
});
```

## property: TestConfig.maxFailures
* since: v1.10
- type: ?<[int]>

The maximum number of test failures for the whole test suite run. After reaching this number, testing will stop and exit with an error. Setting to zero (default) disables this behavior.

Also available in the [command line](../test-cli.md) with the `--max-failures` and `-x` options.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  maxFailures: process.env.CI ? 1 : 0,
});
```

## property: TestConfig.metadata
* since: v1.10
- type: ?<[Metadata]>

Metadata contains key-value pairs to be included in the report. For example, the JSON report will include metadata serialized as JSON.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  metadata: { title: 'acceptance tests' },
});
```

## property: TestConfig.name
* since: v1.10
- type: ?<[string]>

Config name is visible in the report and during test execution, unless overridden by [`property: TestProject.name`].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  name: 'acceptance tests',
});
```

## property: TestConfig.outputDir
* since: v1.10
- type: ?<[string]>

The output directory for files created during test execution. Defaults to `<package.json-directory>/test-results`.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  outputDir: './test-results',
});
```

**Details**

This directory is cleaned at the start. When running a test, a unique subdirectory inside the [`property: TestConfig.outputDir`] is created, guaranteeing that test running in parallel do not conflict. This directory can be accessed by [`property: TestInfo.outputDir`] and [`method: TestInfo.outputPath`].

Here is an example that uses [`method: TestInfo.outputPath`] to create a temporary file.

```js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the file', 'utf8');
});
```


## property: TestConfig.snapshotDir
* since: v1.10
* discouraged: Use [`property: TestConfig.snapshotPathTemplate`] to configure snapshot paths.
- type: ?<[string]>

The base directory, relative to the config file, for snapshot files created with `toMatchSnapshot`. Defaults to [`property: TestConfig.testDir`].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotDir: './snapshots',
});
```

**Details**

The directory for each test can be accessed by [`property: TestInfo.snapshotDir`] and [`method: TestInfo.snapshotPath`].

This path will serve as the base directory for each test file snapshot directory. Setting `snapshotDir` to `'snapshots'`, the [`property: TestInfo.snapshotDir`] would resolve to `snapshots/a.spec.js-snapshots`.

## property: TestConfig.snapshotPathTemplate = %%-test-config-snapshot-path-template-%%
* since: v1.28

## property: TestConfig.preserveOutput
* since: v1.10
- type: ?<[PreserveOutput]<"always"|"never"|"failures-only">>

Whether to preserve test output in the [`property: TestConfig.outputDir`]. Defaults to `'always'`.
* `'always'` - preserve output for all tests;
* `'never'` - do not preserve output for any tests;
* `'failures-only'` - only preserve output for failed tests.


**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  preserveOutput: 'always',
});
```

## property: TestConfig.projects
* since: v1.10
- type: ?<[Array]<[TestProject]>>

Playwright Test supports running multiple test projects at the same time. See [TestProject] for more information.


**Usage**

```js title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] }
  ]
});
```

## property: TestConfig.quiet
* since: v1.10
- type: ?<[boolean]>

Whether to suppress stdio and stderr output from the tests.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  quiet: !!process.env.CI,
});
```

## property: TestConfig.repeatEach
* since: v1.10
- type: ?<[int]>

The number of times to repeat each test, useful for debugging flaky tests.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  repeatEach: 3,
});
```

## property: TestConfig.reporter
* since: v1.10
- type: ?<[string]|[Array]<[Object]>|[BuiltInReporter]<"list"|"dot"|"line"|"github"|"json"|"junit"|"null"|"html">>
  - `0` <[string]> Reporter name or module or file path
  - `1` <[Object]> An object with reporter options if any

The list of reporters to use. Each reporter can be:
* A builtin reporter name like `'list'` or `'json'`.
* A module name like `'my-awesome-reporter'`.
* A relative path to the reporter like `'./reporters/my-awesome-reporter.js'`.

You can pass options to the reporter in a tuple like `['json', { outputFile: './report.json' }]`. If the property is not specified, Playwright uses the `'dot'` reporter when the CI environment variable is set, and the `'list'` reporter otherwise.

Learn more in the [reporters guide](../test-reporters.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line',
});
```

## property: TestConfig.reportSlowTests
* since: v1.10
- type: ?<[null]|[Object]>
  - `max` <[int]> The maximum number of slow test files to report. Defaults to `5`.
  - `threshold` <[float]> Test file duration in milliseconds that is considered slow. Defaults to 5 minutes.

Whether to report slow test files. Pass `null` to disable this feature.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reportSlowTests: null,
});
```

**Details**

Test files that took more than `threshold` milliseconds are considered slow, and the slowest ones are reported, no more than `max` number of them. Passing zero as `max` reports all test files that exceed the threshold.

## property: TestConfig.respectGitIgnore
* since: v1.45
- type: ?<[boolean]>

Whether to skip entries from `.gitignore` when searching for test files. By default, if neither [`property: TestConfig.testDir`] nor [`property: TestProject.testDir`] are explicitly specified, Playwright will ignore any test files matching `.gitignore` entries.

## property: TestConfig.retries
* since: v1.10
- type: ?<[int]>

The maximum number of retry attempts given to failed tests. By default failing tests are not retried. Learn more about [test retries](../test-retries.md#retries).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
});
```

## property: TestConfig.runAgents
* since: v1.58
- type: ?<['RunAgentsMode]<"all"|"missing"|"none">>

Whether to run LLM agent for [PageAgent]:
* "all" disregards existing cache and performs all actions via LLM
* "missing" only performs actions that don't have generated cache actions
* "none" does not talk to LLM at all, relies on the cached actions (default)

## property: TestConfig.shard
* since: v1.10
- type: ?<[null]|[Object]>
  - `current` <[int]> The index of the shard to execute, one-based.
  - `total` <[int]> The total number of shards.

Shard tests and execute only the selected shard. Specify in the one-based form like `{ total: 5, current: 2 }`.

Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  shard: { total: 10, current: 3 },
});
```


## property: TestConfig.tag
* since: v1.57
- type: ?<[string]|[Array]<[string]>>

Tag or tags prepended to each test in the report. Useful for tagging your test run to differentiate between [CI environments](../test-sharding.md#merging-reports-from-multiple-environments).

Note that each tag must start with `@` symbol. Learn more about [tagging](../test-annotations.md#tag-tests).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tag: process.env.CI_ENVIRONMENT_NAME,  // for example "@APIv2"
});
```


## property: TestConfig.testDir
* since: v1.10
- type: ?<[string]>

Directory that will be recursively scanned for test files. Defaults to the directory of the configuration file.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
});
```

## property: TestConfig.testIgnore
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Files matching one of these patterns are not executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

For example, `'**/test-assets/**'` will ignore any files in the `test-assets` directory.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testIgnore: '**/test-assets/**',
});
```

## property: TestConfig.testMatch
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

By default, Playwright looks for files matching the following glob pattern: `**/*.@(spec|test).?(c|m)[jt]s?(x)`. This means JavaScript or TypeScript files with `".test"` or `".spec"` suffix, for example `login-screen.wrong-credentials.spec.ts`.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: /.*\.e2e\.js/,
});
```

## property: TestConfig.timeout
* since: v1.10
- type: ?<[int]>

Timeout for each test in milliseconds. Defaults to 30 seconds.

This is a base timeout for all tests. In addition, each test can configure its own timeout with [`method: Test.setTimeout`]. Learn more about [various timeouts](../test-timeouts.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 5 * 60 * 1000,
});
```

## property: TestConfig.tsconfig
* since: v1.49
- type: ?<[string]>

Path to a single `tsconfig` applicable to all imported files. By default, `tsconfig` for each imported file is looked up separately. Note that `tsconfig` property has no effect while the configuration file or any of its dependencies are loaded. Ignored when `--tsconfig` command line option is specified.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tsconfig: './tsconfig.test.json',
});
```

## property: TestConfig.updateSnapshots
* since: v1.10
- type: ?<[UpdateSnapshots]<"all"|"changed"|"missing"|"none">>

Whether to update expected snapshots with the actual results produced by the test run. Defaults to `'missing'`.
* `'all'` - All tests that are executed will update snapshots.
* `'changed'` - All tests that are executed will update snapshots that did not match. Matching snapshots will not be updated. Also creates missing snapshots.
* `'missing'` - Missing snapshots are created, for example when authoring a new test and running it for the first time. This is the default.
* `'none'` - No snapshots are updated.

Learn more about [snapshots](../test-snapshots.md).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  updateSnapshots: 'missing',
});
```

## property: TestConfig.updateSourceMethod
* since: v1.50
- type: ?<[UpdateSourceMethod]<"overwrite"|"3way"|"patch">>

Defines how to update snapshots in the source code.
* `'patch'` - Create a unified diff file that can be used to update the source code later. This is the default.
* `'3way'` - Generate merge conflict markers in source code. This allows user to manually pick relevant changes, as if they are resolving a merge conflict in the IDE.
* `'overwrite'` - Overwrite the source code with the new snapshot values.

## property: TestConfig.use
* since: v1.10
- type: ?<[TestOptions]>

Global options for all tests, for example [`property: TestOptions.browserName`]. Learn more about [configuration](../test-configuration.md) and see [available options][TestOptions].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
  },
});
```

## property: TestConfig.webServer
* since: v1.10
- type: ?<[Object]|[Array]<[Object]>>
  - `command` <[string]> Shell command to start. For example `npm run start`..
  - `cwd` ?<[string]> Current working directory of the spawned process, defaults to the directory of the configuration file.
  - `env` ?<[Object]<[string], [string]>> Environment variables to set for the command, `process.env` by default.
  - `gracefulShutdown` ?<[Object]> How to shut down the process. If unspecified, the process group is forcefully `SIGKILL`ed. If set to `{ signal: 'SIGTERM', timeout: 500 }`, the process group is sent a `SIGTERM` signal, followed by `SIGKILL` if it doesn't exit within 500ms. You can also use `SIGINT` as the signal instead. A `0` timeout means no `SIGKILL` will be sent. Windows doesn't support `SIGTERM` and `SIGINT` signals, so this option is ignored on Windows. Note that shutting down a Docker container requires `SIGTERM`.
    - `signal` <["SIGINT"|"SIGTERM"]>
    - `timeout` <[int]>
  - `ignoreHTTPSErrors` ?<[boolean]> Whether to ignore HTTPS errors when fetching the `url`. Defaults to `false`.
  - `name` ?<[string]> Specifies a custom name for the web server. This name will be prefixed to log messages. Defaults to `[WebServer]`.
  - `port` ?<[int]> The port that your http server is expected to appear on. It does wait until it accepts connections. Either `port` or `url` should be specified.
  - `reuseExistingServer` ?<[boolean]> If true, it will re-use an existing server on the `port` or `url` when available. If no server is running on that `port` or `url`, it will run the command to start a new server. If `false`, it will throw if an existing process is listening on the `port` or `url`. This should be commonly set to `!process.env.CI` to allow the local dev server when running tests locally.
  - `stderr` ?<["pipe"|"ignore"]> Whether to pipe the stderr of the command to the process stderr or ignore it. Defaults to `"pipe"`.
  - `stdout` ?<["pipe"|"ignore"]> If `"pipe"`, it will pipe the stdout of the command to the process stdout. If `"ignore"`, it will ignore the stdout of the command. Default to `"ignore"`.
  - `wait` ?<[Object]> Consider command started only when given output has been produced.
    - `stdout` ?<[RegExp]> Regular expression to wait for in the `stdout` of the command output. Named capture groups are stored in the environment, for example `/Listening on port (?<my_server_port>\d+)/` will store the port number in `process.env['MY_SERVER_PORT']`.
    - `stderr` ?<[RegExp]> Regular expression to wait for in the `stderr` of the command output. Named capture groups are stored in the environment, for example `/Listening on port (?<my_server_port>\d+)/` will store the port number in `process.env['MY_SERVER_PORT']`.
  - `timeout` ?<[int]> How long to wait for the process to start up and be available in milliseconds. Defaults to 60000.
  - `url` ?<[string]> The url on your http server that is expected to return a 2xx, 3xx, 400, 401, 402, or 403 status code when the server is ready to accept connections. Redirects (3xx status codes) are being followed and the new location is checked. Either `port` or `url` should be specified.

Launch a development web server (or multiple) during the tests.

**Details**

If the port is specified, Playwright Test will wait for it to be available on `127.0.0.1` or `::1`, before running the tests. If the url is specified, Playwright Test will wait for the URL to return a 2xx, 3xx, 400, 401, 402, or 403 status code before running the tests.

For continuous integration, you may want to use the `reuseExistingServer: !process.env.CI` option which does not use an existing server on the CI. To see the stdout, you can set the `DEBUG=pw:webserver` environment variable.

The `port` (but not the `url`) gets passed over to Playwright as a [`property: TestOptions.baseURL`]. For example port `8080` produces `baseURL` equal `http://localhost:8080`. If `webServer` is specified as an array, you must explicitly configure the `baseURL` (even if it only has one entry).

:::note
It is also recommended to specify [`property: TestOptions.baseURL`] in the config, so that tests could use relative urls.
:::

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000/',
  },
});
```

Now you can use a relative path when navigating the page:

```js title="test.spec.ts"
import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // This will result in http://localhost:3000/foo
  await page.goto('/foo');
});
```

Multiple web servers (or background processes) can be launched:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: [
    {
      command: 'npm run start',
      url: 'http://localhost:3000',
      name: 'Frontend',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run backend',
      url: 'http://localhost:3333',
      name: 'Backend',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    }
  ],
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

If your webserver runs on varying ports, use `wait` to capture the port:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    wait: {
      stdout: /Listening on port (?<my_server_port>\d+)/
    },
  },
});
```

```js
import { test, expect } from '@playwright/test';

test.use({ baseUrl: `http://localhost:${process.env.MY_SERVER_PORT ?? 3000}` });

test('homepage', async ({ page }) => {
  await page.goto('/');
});
```

## property: TestConfig.workers
* since: v1.10
- type: ?<[int]|[string]>

The maximum number of concurrent worker processes to use for parallelizing tests. Can also be set as percentage of logical CPU cores, e.g. `'50%'.`

Playwright Test uses worker processes to run tests. There is always at least one worker process, but more can be used to speed up test execution.

Defaults to half of the number of logical CPU cores. Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 3,
});
```
# class: FullProject
* since: v1.10
* langs: js

Runtime representation of the test project configuration. It is accessible in the tests via [`property: TestInfo.project`] and [`property: WorkerInfo.project`] and is passed to the test reporters. To see the format of the project in the Playwright configuration file please see [TestProject] instead.

## property: FullProject.dependencies
* since: v1.31
- type: <[Array]<[string]>>

See [`property: TestProject.dependencies`].

## property: FullProject.grep
* since: v1.10
- type: <[RegExp]|[Array]<[RegExp]>>

See [`property: TestProject.grep`].

## property: FullProject.grepInvert
* since: v1.10
- type: <[null]|[RegExp]|[Array]<[RegExp]>>

See [`property: TestProject.grepInvert`].

## property: FullProject.metadata
* since: v1.10
- type: <[Metadata]>

See [`property: TestProject.metadata`].

## property: FullProject.name
* since: v1.10
- type: <[string]>

See [`property: TestProject.name`].

## property: FullProject.snapshotDir
* since: v1.10
- type: <[string]>

See [`property: TestProject.snapshotDir`].

## property: FullProject.outputDir
* since: v1.10
- type: <[string]>

See [`property: TestProject.outputDir`].

## property: FullProject.repeatEach
* since: v1.10
- type: <[int]>

See [`property: TestProject.repeatEach`].

## property: FullProject.retries
* since: v1.10
- type: <[int]>

See [`property: TestProject.retries`].

## property: FullProject.teardown
* since: v1.34
- type: ?<[string]>

See [`property: TestProject.teardown`].

## property: FullProject.testDir
* since: v1.10
- type: <[string]>

See [`property: TestProject.testDir`].

## property: FullProject.testIgnore
* since: v1.10
- type: <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

See [`property: TestProject.testIgnore`].

## property: FullProject.testMatch
* since: v1.10
- type: <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

See [`property: TestProject.testMatch`].

## property: FullProject.timeout
* since: v1.10
- type: <[int]>

See [`property: TestProject.timeout`].

## property: FullProject.use
* since: v1.10
- type: <[Fixtures]>

See [`property: TestProject.use`].
# class: TestInfoError
* since: v1.10
* langs: js

Information about an error thrown during test execution.

## property: TestInfoError.cause
* since: v1.49
- type: ?<[TestInfoError]>

Error cause. Set when there is a [cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) for the error. Will be `undefined` if there is no cause or if the cause is not an instance of [Error].

## property: TestInfoError.message
* since: v1.10
- type: ?<[string]>

Error message. Set when [Error] (or its subclass) has been thrown.

## property: TestInfoError.stack
* since: v1.10
- type: ?<[string]>

Error stack. Set when [Error] (or its subclass) has been thrown.

## property: TestInfoError.value
* since: v1.10
- type: ?<[string]>

The value that was thrown. Set when anything except the [Error] (or its subclass) has been thrown.
# class: TestInfo
* since: v1.10
* langs: js

`TestInfo` contains information about currently running test. It is available to test functions, [`method: Test.beforeEach`], [`method: Test.afterEach`], [`method: Test.beforeAll`] and [`method: Test.afterAll`] hooks, and test-scoped fixtures. `TestInfo` provides utilities to control test execution: attach files, update test timeout, determine which test is currently running and whether it was retried, etc.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  expect(testInfo.title).toBe('basic test');
  await page.screenshot(testInfo.outputPath('screenshot.png'));
});
```


## property: TestInfo.annotations
* since: v1.10
- type: <[Array]<[Object]>>
  - `type` <[string]> Annotation type, for example `'skip'` or `'fail'`.
  - `description` ?<[string]> Optional description.
  - `location` ?<[Location]> Optional location in the source where the annotation is added.

The list of annotations applicable to the current test. Includes annotations from the test, annotations from all [`method: Test.describe`] groups the test belongs to and file-level annotations for the test file.

Learn more about [test annotations](../test-annotations.md).

## property: TestInfo.attachments
* since: v1.10
- type: <[Array]<[Object]>>
  - `name` <[string]> Attachment name.
  - `contentType` <[string]> Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
  - `path` ?<[string]> Optional path on the filesystem to the attached file.
  - `body` ?<[Buffer]> Optional attachment body used instead of a file.

The list of files or buffers attached to the current test. Some reporters show test attachments.

To add an attachment, use [`method: TestInfo.attach`] instead of directly pushing onto this array.

## async method: TestInfo.attach
* since: v1.10

Attach a value or a file from disk to the current test. Some reporters show test attachments. Either [`option: path`] or [`option: body`] must be specified, but not both.

For example, you can attach a screenshot to the test:

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev');
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});
```

Or you can attach files returned by your APIs:

```js
import { test, expect } from '@playwright/test';
import { download } from './my-custom-helpers';

test('basic test', async ({}, testInfo) => {
  const tmpPath = await download('a');
  await testInfo.attach('downloaded', { path: tmpPath });
});
```

:::note
[`method: TestInfo.attach`] automatically takes care of copying attached files to a
location that is accessible to reporters. You can safely remove the attachment
after awaiting the attach call.
:::

### param: TestInfo.attach.name
* since: v1.10
- `name` <[string]>

Attachment name. The name will also be sanitized and used as the prefix of file name
when saving to disk.

### option: TestInfo.attach.body
* since: v1.10
- `body` <[string]|[Buffer]>

Attachment body. Mutually exclusive with [`option: path`].

### option: TestInfo.attach.contentType
* since: v1.10
- `contentType` <[string]>

Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`. If omitted, content type is inferred based on the [`option: path`], or defaults to `text/plain` for [string] attachments and `application/octet-stream` for [Buffer] attachments.

### option: TestInfo.attach.path
* since: v1.10
- `path` <[string]>

Path on the filesystem to the attached file. Mutually exclusive with [`option: body`].


## property: TestInfo.column
* since: v1.10
- type: <[int]>

Column number where the currently running test is declared.


## property: TestInfo.config
* since: v1.10
- type: <[FullConfig]>

Processed configuration from the [configuration file](../test-configuration.md).


## property: TestInfo.duration
* since: v1.10
- type: <[int]>

The number of milliseconds the test took to finish. Always zero before the test finishes, either successfully or not. Can be used in [`method: Test.afterEach`] hook.


## property: TestInfo.error
* since: v1.10
- type: ?<[TestInfoError]>

First error thrown during test execution, if any. This is equal to the first
element in [`property: TestInfo.errors`].

## property: TestInfo.errors
* since: v1.10
- type: <[Array]<[TestInfoError]>>

Errors thrown during test execution, if any.


## property: TestInfo.expectedStatus
* since: v1.10
- type: <[TestStatus]<"passed"|"failed"|"timedOut"|"skipped"|"interrupted">>

Expected status for the currently running test. This is usually `'passed'`, except for a few cases:
* `'skipped'` for skipped tests, e.g. with [`method: Test.skip`];
* `'failed'` for tests marked as failed with [`method: Test.fail`].

Expected status is usually compared with the actual [`property: TestInfo.status`]:

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
```

## method: TestInfo.fail#1
* since: v1.10

Marks the currently running test as "should fail". Playwright Test runs this test and ensures that it is actually failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed. This is similar to [`method: Test.fail`].

## method: TestInfo.fail#2
* since: v1.10

Conditionally mark the currently running test as "should fail" with an optional description. This is similar to [`method: Test.fail`].

### param: TestInfo.fail#2.condition
* since: v1.10
- `condition` <[boolean]>

Test is marked as "should fail" when the condition is `true`.

### param: TestInfo.fail#2.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.


## property: TestInfo.file
* since: v1.10
- type: <[string]>

Absolute path to a file where the currently running test is declared.


## method: TestInfo.fixme#1
* since: v1.10

Mark a test as "fixme", with the intention to fix it. Test is immediately aborted. This is similar to [`method: Test.fixme`].

## method: TestInfo.fixme#2
* since: v1.10

Conditionally mark the currently running test as "fixme" with an optional description. This is similar to [`method: Test.fixme`].

### param: TestInfo.fixme#2.condition
* since: v1.10
- `condition` <[boolean]>

Test is marked as "fixme" when the condition is `true`.

### param: TestInfo.fixme#2.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.


## property: TestInfo.fn
* since: v1.10
- type: <[function]>

Test function as passed to `test(title, testFunction)`.

## property: TestInfo.tags
* since: v1.43
- type: <[Array]<[string]>>

Tags that apply to the test. Learn more about [tags](../test-annotations.md#tag-tests).

:::note
Any changes made to this list while the test is running will not be visible to test reporters.
:::

## property: TestInfo.testId
* since: v1.32
- type: <[string]>

Test id matching the test case id in the reporter API.

## property: TestInfo.line
* since: v1.10
- type: <[int]>

Line number where the currently running test is declared.

## property: TestInfo.snapshotDir
* since: v1.10
- type: <[string]>

Absolute path to the snapshot output directory for this specific test. Each test suite gets its own directory so they cannot conflict.

This property does not account for the [`property: TestProject.snapshotPathTemplate`] configuration.

## property: TestInfo.outputDir
* since: v1.10
- type: <[string]>

Absolute path to the output directory for this specific test run. Each test run gets its own directory so they cannot conflict.

## method: TestInfo.outputPath
* since: v1.10
- returns: <[string]>

Returns a path inside the [`property: TestInfo.outputDir`] where the test can safely put a temporary file. Guarantees that tests running in parallel will not interfere with each other.

```js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('dir', 'temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the dir/temporary-file.txt', 'utf8');
});
```

> Note that `pathSegments` accepts path segments to the test output directory such as `testInfo.outputPath('relative', 'path', 'to', 'output')`.
> However, this path must stay within the [`property: TestInfo.outputDir`] directory for each test (i.e. `test-results/a-test-title`), otherwise it will throw.

### param: TestInfo.outputPath.pathSegments
* since: v1.10
- `...pathSegments` <[Array]<[string]>>

Path segments to append at the end of the resulting path.

## property: TestInfo.parallelIndex
* since: v1.10
- type: <[int]>

The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has the same `parallelIndex`.

Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.

## property: TestInfo.project
* since: v1.10
- type: <[FullProject]>

Processed project configuration from the [configuration file](../test-configuration.md).


## property: TestInfo.repeatEachIndex
* since: v1.10
- type: <[int]>

Specifies a unique repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the [command line](../test-cli.md).

## property: TestInfo.retry
* since: v1.10
- type: <[int]>

Specifies the retry number when the test is retried after a failure. The first test run has [`property: TestInfo.retry`] equal to zero, the first retry has it equal to one, and so on. Learn more about [retries](../test-retries.md#retries).

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  // You can access testInfo.retry in any hook or fixture.
  if (testInfo.retry > 0)
    console.log(`Retrying!`);
});

test('my test', async ({ page }, testInfo) => {
  // Here we clear some server-side state when retrying.
  if (testInfo.retry)
    await cleanSomeCachesOnTheServer();
  // ...
});
```

## method: TestInfo.setTimeout
* since: v1.10

Changes the timeout for the currently running test. Zero means no timeout. Learn more about [various timeouts](../test-timeouts.md).

Timeout is usually specified in the [configuration file](../test-configuration.md), but it could be useful to change the timeout in certain scenarios:

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});
```

### param: TestInfo.setTimeout.timeout
* since: v1.10
- `timeout` <[int]>

Timeout in milliseconds.

## method: TestInfo.skip#1
* since: v1.10

Unconditionally skip the currently running test. Test is immediately aborted. This is similar to [`method: Test.skip`].

## method: TestInfo.skip#2
* since: v1.10

Conditionally skips the currently running test with an optional description. This is similar to [`method: Test.skip`].

### param: TestInfo.skip#2.condition
* since: v1.10
- `condition` <[boolean]>

A skip condition. Test is skipped when the condition is `true`.

### param: TestInfo.skip#2.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.


## method: TestInfo.slow#1
* since: v1.10

Marks the currently running test as "slow", giving it triple the default timeout. This is similar to [`method: Test.slow`].

## method: TestInfo.slow#2
* since: v1.10

Conditionally mark the currently running test as "slow" with an optional description, giving it triple the default timeout. This is similar to [`method: Test.slow`].

### param: TestInfo.slow#2.condition
* since: v1.10
- `condition` <[boolean]>

Test is marked as "slow" when the condition is `true`.

### param: TestInfo.slow#2.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.


## method: TestInfo.snapshotPath
* since: v1.10
- returns: <[string]>

Returns a path to a snapshot file with the given `name`. Pass [`option: kind`] to obtain a specific path:
* `kind: 'screenshot'` for [`method: PageAssertions.toHaveScreenshot#1`];
* `kind: 'aria'` for [`method: LocatorAssertions.toMatchAriaSnapshot`];
* `kind: 'snapshot'` for [`method: SnapshotAssertions.toMatchSnapshot#1`].

**Usage**

```js
await expect(page).toHaveScreenshot('header.png');
// Screenshot assertion above expects screenshot at this path:
const screenshotPath = test.info().snapshotPath('header.png', { kind: 'screenshot' });

await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'main.aria.yml' });
// Aria snapshot assertion above expects snapshot at this path:
const ariaSnapshotPath = test.info().snapshotPath('main.aria.yml', { kind: 'aria' });

expect('some text').toMatchSnapshot('snapshot.txt');
// Snapshot assertion above expects snapshot at this path:
const snapshotPath = test.info().snapshotPath('snapshot.txt');

expect('some text').toMatchSnapshot(['dir', 'subdir', 'snapshot.txt']);
// Snapshot assertion above expects snapshot at this path:
const nestedPath = test.info().snapshotPath('dir', 'subdir', 'snapshot.txt');
```

### param: TestInfo.snapshotPath.name
* since: v1.10
- `...name` <[Array]<[string]>>

The name of the snapshot or the path segments to define the snapshot file path. Snapshots with the same name in the same test file are expected to be the same.

When passing [`option: kind`], multiple name segments are not supported.

### option: TestInfo.snapshotPath.kind
* since: v1.53
- `kind` <[SnapshotKind]<"snapshot"|"screenshot"|"aria">>

The snapshot kind controls which snapshot path template is used. See [`property: TestConfig.snapshotPathTemplate`] for more details. Defaults to `'snapshot'`.

## property: TestInfo.snapshotSuffix
* since: v1.10
- type: <[string]>

:::note
Use of [`property: TestInfo.snapshotSuffix`] is discouraged. Please use [`property: TestConfig.snapshotPathTemplate`] to configure
snapshot paths.
:::

Suffix used to differentiate snapshots between multiple test configurations. For example, if snapshots depend on the platform, you can set `testInfo.snapshotSuffix` equal to `process.platform`. In this case `expect(value).toMatchSnapshot(snapshotName)` will use different snapshots depending on the platform. Learn more about [snapshots](../test-snapshots.md).

## property: TestInfo.status
* since: v1.10
- type: ?<[TestStatus]<"passed"|"failed"|"timedOut"|"skipped"|"interrupted">>

Actual status for the currently running test. Available after the test has finished in [`method: Test.afterEach`] hook and fixtures.

Status is usually compared with the [`property: TestInfo.expectedStatus`]:

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
```

## property: TestInfo.timeout
* since: v1.10
- type: <[int]>

Timeout in milliseconds for the currently running test. Zero means no timeout. Learn more about [various timeouts](../test-timeouts.md).

Timeout is usually specified in the [configuration file](../test-configuration.md)

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});
```

## property: TestInfo.title
* since: v1.10
- type: <[string]>

The title of the currently running test as passed to `test(title, testFunction)`.

## property: TestInfo.titlePath
* since: v1.10
- type: <[Array]<[string]>>

The full title path starting with the test file name.

## property: TestInfo.workerIndex
* since: v1.10
- type: <[int]>

The unique index of the worker process that is running the test. When a worker is restarted, for example after a failure, the new worker process gets a new unique `workerIndex`.

Also available as `process.env.TEST_WORKER_INDEX`. Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.
# class: WorkerInfo
* since: v1.10
* langs: js

`WorkerInfo` contains information about the worker that is running tests and is available to worker-scoped fixtures. `WorkerInfo` is a subset of [TestInfo] that is available in many other places.

## property: WorkerInfo.config
* since: v1.10
- type: <[FullConfig]>

Processed configuration from the [configuration file](../test-configuration.md).


## property: WorkerInfo.parallelIndex
* since: v1.10
- type: <[int]>

The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has the same `parallelIndex`.

Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.


## property: WorkerInfo.project
* since: v1.10
- type: <[FullProject]>

Processed project configuration from the [configuration file](../test-configuration.md).


## property: WorkerInfo.workerIndex
* since: v1.10
- type: <[int]>

The unique index of the worker process that is running the test. When a worker is restarted, for example after a failure, the new worker process gets a new unique `workerIndex`.

Also available as `process.env.TEST_WORKER_INDEX`. Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.
# class: Test
* since: v1.10
* langs: js

Playwright Test provides a `test` function to declare tests and `expect` function to write assertions.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

## method: Test.(call)
* since: v1.10

Declares a test.

* `test(title, body)`
* `test(title, details, body)`

**Usage**

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

**Tags**

You can tag tests by providing additional test details. Alternatively, you can include tags in the test title. Note that each tag must start with `@` symbol.

```js
import { test, expect } from '@playwright/test';

test('basic test', {
  tag: '@smoke',
}, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});

test('another test @smoke', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

Test tags are displayed in the test report, and are available to a custom reporter via `TestCase.tags` property.

You can also filter tests by their tags during test execution:
* in the [command line](../test-cli.md#all-options);
* in the config with [`property: TestConfig.grep`] and [`property: TestProject.grep`];

Learn more about [tagging](../test-annotations.md#tag-tests).

**Annotations**

You can annotate tests by providing additional test details.

```js
import { test, expect } from '@playwright/test';

test('basic test', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

Test annotations are displayed in the test report, and are available to a custom reporter via `TestCase.annotations` property.

You can also add annotations during runtime by manipulating [`property: TestInfo.annotations`].

Learn more about [test annotations](../test-annotations.md).

### param: Test.(call).title
* since: v1.10
- `title` <[string]>

Test title.

### param: Test.(call).details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]> Annotation type, for example `'issue'`.
    - `description` ?<[string]> Optional annotation description, for example an issue url.

Additional test details.

### param: Test.(call).body
* since: v1.10
- `body` <[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].



## method: Test.afterAll
* since: v1.10

Declares an `afterAll` hook that is executed once per worker after all tests.

When called in the scope of a test file, runs after all tests in the file. When called inside a [`method: Test.describe`] group, runs after all tests in the group.

**Details**

When multiple `afterAll` hooks are added, they will run in the order of their registration.

Note that worker process is restarted on test failures, and `afterAll` hook runs again in the new worker. Learn more about [workers and failures](../test-retries.md).

Playwright will continue running all applicable hooks even if some of them have failed.

* `test.afterAll(hookFunction)`
* `test.afterAll(title, hookFunction)`

**Usage**

```js
test.afterAll(async () => {
  console.log('Done with tests');
  // ...
});
```

Alternatively, you can declare a hook **with a title**.

```js
test.afterAll('Teardown', async () => {
  console.log('Done with tests');
  // ...
});
```

### param: Test.afterAll.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.afterAll.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with worker fixtures and optional [TestInfo].



## method: Test.afterEach
* since: v1.10

Declares an `afterEach` hook that is executed after each test.

When called in the scope of a test file, runs after each test in the file. When called inside a [`method: Test.describe`] group, runs after each test in the group.

You can access all the same [Fixtures] as the test body itself, and also the [TestInfo] object that gives a lot of useful information. For example, you can check whether the test succeeded or failed.

* `test.afterEach(hookFunction)`
* `test.afterEach(title, hookFunction)`

**Details**

When multiple `afterEach` hooks are added, they will run in the order of their registration.

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**


```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('my test', async ({ page }) => {
  // ...
});
```

Alternatively, you can declare a hook **with a title**.

```js title="example.spec.ts"
test.afterEach('Status check', async ({ page }) => {
  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
```

### param: Test.afterEach.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.afterEach.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with fixtures and optional [TestInfo].



## method: Test.beforeAll
* since: v1.10

Declares a `beforeAll` hook that is executed once per worker process before all tests.

When called in the scope of a test file, runs before all tests in the file. When called inside a [`method: Test.describe`] group, runs before all tests in the group.

You can use [`method: Test.afterAll`] to teardown any resources set up in `beforeAll`.

* `test.beforeAll(hookFunction)`
* `test.beforeAll(title, hookFunction)`

**Details**

When multiple `beforeAll` hooks are added, they will run in the order of their registration.

Note that worker process is restarted on test failures, and `beforeAll` hook runs again in the new worker. Learn more about [workers and failures](../test-retries.md).

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**


```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  console.log('Before tests');
});

test.afterAll(async () => {
  console.log('After tests');
});

test('my test', async ({ page }) => {
  // ...
});
```


Alternatively, you can declare a hook **with a title**.

```js title="example.spec.ts"
test.beforeAll('Setup', async () => {
  console.log('Before tests');
});
```

### param: Test.beforeAll.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.beforeAll.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with worker fixtures and optional [TestInfo].


## method: Test.beforeEach
* since: v1.10

Declares a `beforeEach` hook that is executed before each test.

When called in the scope of a test file, runs before each test in the file. When called inside a [`method: Test.describe`] group, runs before each test in the group.

You can access all the same [Fixtures] as the test body itself, and also the [TestInfo] object that gives a lot of useful information. For example, you can navigate the page before starting the test.

You can use [`method: Test.afterEach`] to teardown any resources set up in `beforeEach`.

* `test.beforeEach(hookFunction)`
* `test.beforeEach(title, hookFunction)`

**Details**

When multiple `beforeEach` hooks are added, they will run in the order of their registration.

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://my.start.url/');
});

test('my test', async ({ page }) => {
  expect(page.url()).toBe('https://my.start.url/');
});
```

Alternatively, you can declare a hook **with a title**.

```js title="example.spec.ts"
test.beforeEach('Open start URL', async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://my.start.url/');
});
```

### param: Test.beforeEach.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.beforeEach.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with fixtures and optional [TestInfo].



## method: Test.describe
* since: v1.10

Declares a group of tests.

* `test.describe(title, callback)`
* `test.describe(callback)`
* `test.describe(title, details, callback)`

**Usage**

You can declare a group of tests with a title. The title will be visible in the test report as a part of each test's title.

```js
test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

**Anonymous group**

You can also declare a test group without a title. This is convenient to give a group of tests a common option with [`method: Test.use`].

```js
test.describe(() => {
  test.use({ colorScheme: 'dark' });

  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

**Tags**

You can tag all tests in a group by providing additional details. Note that each tag must start with `@` symbol.

```js
import { test, expect } from '@playwright/test';

test.describe('two tagged tests', {
  tag: '@smoke',
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

Learn more about [tagging](../test-annotations.md#tag-tests).

**Annotations**

You can annotate all tests in a group by providing additional details.

```js
import { test, expect } from '@playwright/test';

test.describe('two annotated tests', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

Learn more about [test annotations](../test-annotations.md).

### param: Test.describe.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

Additional details for all tests in the group.

### param: Test.describe.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe`]. Any tests declared in this callback will belong to the group.



## method: Test.describe.configure
* since: v1.10

Configures the enclosing scope. Can be executed either on the top level or inside a describe. Configuration applies to the entire scope, regardless of whether it run before or after the test declaration.

Learn more about the execution modes [here](../test-parallel.md).

**Usage**

* Running tests in parallel.

  ```js
  // Run all the tests in the file concurrently using parallel workers.
  test.describe.configure({ mode: 'parallel' });
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
  ```

* Running tests in order, retrying each failed test independently.

  This is the default mode. It can be useful to set it explicitly to override project configuration that uses `fullyParallel`.

  ```js
  // Tests in this file run in order. Retries, if any, run independently.
  test.describe.configure({ mode: 'default' });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Running tests serially, retrying from the start. If one of the serial tests fails, all subsequent tests are skipped.

  :::note
  Running serially is not recommended. It is usually better to make your tests isolated, so they can be run independently.
  :::

  ```js
  // Annotate tests as inter-dependent.
  test.describe.configure({ mode: 'serial' });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Configuring retries and timeout for each test.

  ```js
  // Each test in the file will be retried twice and have a timeout of 20 seconds.
  test.describe.configure({ retries: 2, timeout: 20_000 });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Run multiple describes in parallel, but tests inside each describe in order.

  ```js
  test.describe.configure({ mode: 'parallel' });

  test.describe('A, runs in parallel with B', () => {
    test.describe.configure({ mode: 'default' });
    test('in order A1', async ({ page }) => {});
    test('in order A2', async ({ page }) => {});
  });

  test.describe('B, runs in parallel with A', () => {
    test.describe.configure({ mode: 'default' });
    test('in order B1', async ({ page }) => {});
    test('in order B2', async ({ page }) => {});
  });
  ```

### option: Test.describe.configure.mode
* since: v1.10
- `mode` <[TestMode]<"default"|"parallel"|"serial">>

Execution mode. Learn more about the execution modes [here](../test-parallel.md).

### option: Test.describe.configure.retries
* since: v1.28
- `retries` <[int]>

The number of retries for each test.

### option: Test.describe.configure.timeout
* since: v1.28
- `timeout` <[int]>

Timeout for each test in milliseconds. Overrides [`property: TestProject.timeout`] and [`property: TestConfig.timeout`].


## method: Test.describe.fixme
* since: v1.25

Declares a test group similarly to [`method: Test.describe`]. Tests in this group are marked as "fixme" and will not be executed.

* `test.describe.fixme(title, callback)`
* `test.describe.fixme(callback)`
* `test.describe.fixme(title, details, callback)`

**Usage**

```js
test.describe.fixme('broken tests that should be fixed', () => {
  test('example', async ({ page }) => {
    // This test will not run
  });
});
```

You can also omit the title.

```js
test.describe.fixme(() => {
  // ...
});
```

### param: Test.describe.fixme.title
* since: v1.25
- `title` ?<[string]>

Group title.

### param: Test.describe.fixme.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.fixme.callback
* since: v1.25
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.fixme`]. Any tests added in this callback will belong to the group, and will not be run.



## method: Test.describe.only
* since: v1.10

Declares a focused group of tests. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.describe.only(title, callback)`
* `test.describe.only(callback)`
* `test.describe.only(title, details, callback)`

**Usage**

```js
test.describe.only('focused group', () => {
  test('in the focused group', async ({ page }) => {
    // This test will run
  });
});
test('not in the focused group', async ({ page }) => {
  // This test will not run
});
```

You can also omit the title.

```js
test.describe.only(() => {
  // ...
});
```


### param: Test.describe.only.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.only`]. Any tests added in this callback will belong to the group.



## method: Test.describe.parallel
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a group of tests that could be run in parallel. By default, tests in a single test file run one after another, but using [`method: Test.describe.parallel`] allows them to run in parallel.

* `test.describe.parallel(title, callback)`
* `test.describe.parallel(callback)`
* `test.describe.parallel(title, details, callback)`

**Usage**

```js
test.describe.parallel('group', () => {
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
});
```

Note that parallel tests are executed in separate processes and cannot share any state or global variables. Each of the parallel tests executes all relevant hooks.

You can also omit the title.

```js
test.describe.parallel(() => {
  // ...
});
```

### param: Test.describe.parallel.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.parallel.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.parallel.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.parallel`]. Any tests added in this callback will belong to the group.



## method: Test.describe.parallel.only
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a focused group of tests that could be run in parallel. This is similar to [`method: Test.describe.parallel`], but focuses the group. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.describe.parallel.only(title, callback)`
* `test.describe.parallel.only(callback)`
* `test.describe.parallel.only(title, details, callback)`

**Usage**

```js
test.describe.parallel.only('group', () => {
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
});
```

You can also omit the title.

```js
test.describe.parallel.only(() => {
  // ...
});
```

### param: Test.describe.parallel.only.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.parallel.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.parallel.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.parallel.only`]. Any tests added in this callback will belong to the group.



## method: Test.describe.serial
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a group of tests that should always be run serially. If one of the tests fails, all subsequent tests are skipped. All tests in a group are retried together.

:::note
Using serial is not recommended. It is usually better to make your tests isolated, so they can be run independently.
:::

* `test.describe.serial(title, callback)`
* `test.describe.serial(title)`
* `test.describe.serial(title, details, callback)`

**Usage**

```js
test.describe.serial('group', () => {
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
});
```

You can also omit the title.

```js
test.describe.serial(() => {
  // ...
});
```

### param: Test.describe.serial.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.serial.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.serial.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.serial`]. Any tests added in this callback will belong to the group.



## method: Test.describe.serial.only
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a focused group of tests that should always be run serially. If one of the tests fails, all subsequent tests are skipped. All tests in a group are retried together. If there are some focused tests or suites, all of them will be run but nothing else.

:::note
Using serial is not recommended. It is usually better to make your tests isolated, so they can be run independently.
:::

* `test.describe.serial.only(title, callback)`
* `test.describe.serial.only(title)`
* `test.describe.serial.only(title, details, callback)`

**Usage**

```js
test.describe.serial.only('group', () => {
  test('runs first', async ({ page }) => {
  });
  test('runs second', async ({ page }) => {
  });
});
```

You can also omit the title.

```js
test.describe.serial.only(() => {
  // ...
});
```

### param: Test.describe.serial.only.title
* since: v1.10
- `title` <[string]>

Group title.

### param: Test.describe.serial.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.serial.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.serial.only`]. Any tests added in this callback will belong to the group.




## method: Test.describe.skip
* since: v1.10

Declares a skipped test group, similarly to [`method: Test.describe`]. Tests in the skipped group are never run.

* `test.describe.skip(title, callback)`
* `test.describe.skip(title)`
* `test.describe.skip(title, details, callback)`

**Usage**

```js
test.describe.skip('skipped group', () => {
  test('example', async ({ page }) => {
    // This test will not run
  });
});
```

You can also omit the title.

```js
test.describe.skip(() => {
  // ...
});
```

### param: Test.describe.skip.title
* since: v1.10
- `title` <[string]>

Group title.

### param: Test.describe.skip.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.skip.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.skip`]. Any tests added in this callback will belong to the group, and will not be run.



## property: Test.expect
* since: v1.10
- type: <[Object]>

`expect` function can be used to create test assertions. Read more about [test assertions](../test-assertions.md).

**Usage**

```js
test('example', async ({ page }) => {
  await test.expect(page).toHaveTitle('Title');
});
```



## method: Test.extend
* since: v1.10
- returns: <[Test]>

Extends the `test` object by defining fixtures and/or options that can be used in the tests.

**Usage**

First define a fixture and/or an option.

```js tab=js-js title="my-test.js"
const base = require('@playwright/test');
const { TodoPage } = require('./todo-page');

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
exports.test = base.test.extend({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultItem: ['Do stuff', { option: true }],

  // Define a fixture. Note that it can use built-in fixture "page"
  // and a new option "defaultItem".
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
    await todoPage.removeAll();
  },
});
```

```js tab=js-ts
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';

export type Options = { defaultItem: string };

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
export const test = base.extend<Options & { todoPage: TodoPage }>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultItem: ['Do stuff', { option: true }],

  // Define a fixture. Note that it can use built-in fixture "page"
  // and a new option "defaultItem".
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
    await todoPage.removeAll();
  },
});
```

Then use the fixture in the test.

```js title="example.spec.ts"
import { test } from './my-test';

test('test 1', async ({ todoPage }) => {
  await todoPage.addToDo('my todo');
  // ...
});
```

Configure the option in config file.

```js tab=js-js title="playwright.config.ts"
// @ts-check

module.exports = defineConfig({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

```js tab=js-ts title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
import type { Options } from './my-test';

export default defineConfig<Options>({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

Learn more about [fixtures](../test-fixtures.md) and [parametrizing tests](../test-parameterize.md).

### param: Test.extend.fixtures
* since: v1.10
- `fixtures` <[Object]>

An object containing fixtures and/or options. Learn more about [fixtures format](../test-fixtures.md).




## method: Test.fail
* since: v1.10

Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.

To declare a "failing" test:
* `test.fail(title, body)`
* `test.fail(title, details, body)`

To annotate test as "failing" at runtime:
* `test.fail(condition, description)`
* `test.fail(callback, description)`
* `test.fail()`

**Usage**

You can declare a test as failing, so that Playwright ensures it actually fails.

```js
import { test, expect } from '@playwright/test';

test.fail('not yet ready', async ({ page }) => {
  // ...
});
```

If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based on some condition. We recommend passing a `description` argument in this case.

```js
import { test, expect } from '@playwright/test';

test('fail in WebKit', async ({ page, browserName }) => {
  test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "should fail" based on some condition with a single `test.fail(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');

test('fail in WebKit 1', async ({ page }) => {
  // ...
});
test('fail in WebKit 2', async ({ page }) => {
  // ...
});
```

You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We recommend declaring a failing test with `test.fail(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.fail();
  // ...
});
```

### param: Test.fail.title
* since: v1.42
- `title` ?<[string]>

Test title.

### param: Test.fail.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.fail.body
* since: v1.42
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.fail.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "should fail" when the condition is `true`.

### param: Test.fail.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as "should fail" when the return value is `true`.

### param: Test.fail.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.



## method: Test.fail.only
* since: v1.49

You can use `test.fail.only` to focus on a specific test that is expected to fail. This is particularly useful when debugging a failing test or working on a specific issue.

To declare a focused "failing" test:
* `test.fail.only(title, body)`
* `test.fail.only(title, details, body)`

**Usage**

You can declare a focused failing test, so that Playwright runs only this test and ensures it actually fails.

```js
import { test, expect } from '@playwright/test';

test.fail.only('focused failing test', async ({ page }) => {
  // This test is expected to fail
});
test('not in the focused group', async ({ page }) => {
  // This test will not run
});
```

### param: Test.fail.only.title
* since: v1.49

- `title` ?<[string]>

Test title.

### param: Test.fail.only.details
* since: v1.49

- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for test details description.

### param: Test.fail.only.body
* since: v1.49

- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].



## method: Test.fixme
* since: v1.10

Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()` call.

To declare a "fixme" test:
* `test.fixme(title, body)`
* `test.fixme(title, details, body)`

To annotate test as "fixme" at runtime:
* `test.fixme(condition, description)`
* `test.fixme(callback, description)`
* `test.fixme()`

**Usage**

You can declare a test as to be fixed, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test.fixme('to be fixed', async ({ page }) => {
  // ...
});
```

If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the test, but abort it immediately after the `test.fixme` call.

```js
import { test, expect } from '@playwright/test';

test('to be fixed in Safari', async ({ page, browserName }) => {
  test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "fixme" based on some condition with a single `test.fixme(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');

test('to be fixed in Safari 1', async ({ page }) => {
  // ...
});
test('to be fixed in Safari 2', async ({ page }) => {
  // ...
});
```

You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We recommend using `test.fixme(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.fixme();
  // ...
});
```

### param: Test.fixme.title
* since: v1.10
- `title` ?<[string]>

Test title.

### param: Test.fixme.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.fixme.body
* since: v1.10
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.fixme.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "fixme" when the condition is `true`.

### param: Test.fixme.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "fixme", based on test fixtures. Test or tests are marked as "fixme" when the return value is `true`.

### param: Test.fixme.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.



## method: Test.info
* since: v1.10
- returns: <[TestInfo]>

Returns information about the currently running test. This method can only be called during the test execution, otherwise it throws.

**Usage**

```js
test('example test', async ({ page }) => {
  // ...
  await test.info().attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
```


## method: Test.only
* since: v1.10

Declares a focused test. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.only(title, body)`
* `test.only(title, details, body)`

**Usage**

```js
test.only('focus this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});
```

### param: Test.only.title
* since: v1.10
- `title` <[string]>

Test title.

### param: Test.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.only.body
* since: v1.10
- `body` <[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].


## method: Test.setTimeout
* since: v1.10

Changes the timeout for the test. Zero means no timeout. Learn more about [various timeouts](../test-timeouts.md).

Timeout for the currently running test is available through [`property: TestInfo.timeout`].

**Usage**

* Changing test timeout.

  ```js
  test('very slow test', async ({ page }) => {
    test.setTimeout(120000);
    // ...
  });
  ```

* Changing timeout from a slow `beforeEach` hook. Note that this affects the test timeout that is shared with `beforeEach` hooks.

  ```js
  test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    test.setTimeout(testInfo.timeout + 30000);
  });
  ```

* Changing timeout for a `beforeAll` or `afterAll` hook. Note this affects the hook's timeout, not the test timeout.

  ```js
  test.beforeAll(async () => {
    // Set timeout for this hook.
    test.setTimeout(60000);
  });
  ```

* Changing timeout for all tests in a [`method: Test.describe`] group.

  ```js
  test.describe('group', () => {
    // Applies to all tests in this group.
    test.describe.configure({ timeout: 60000 });

    test('test one', async () => { /* ... */ });
    test('test two', async () => { /* ... */ });
    test('test three', async () => { /* ... */ });
  });
  ```

### param: Test.setTimeout.timeout
* since: v1.10
- `timeout` <[int]>

Timeout in milliseconds.



## method: Test.skip
* since: v1.10

Skip a test. Playwright will not run the test past the `test.skip()` call.

Skipped tests are not supposed to be ever run. If you intend to fix the test, use [`method: Test.fixme`] instead.

To declare a skipped test:
* `test.skip(title, body)`
* `test.skip(title, details, body)`

To skip a test at runtime:
* `test.skip(condition, description)`
* `test.skip(callback, description)`
* `test.skip()`

**Usage**

You can declare a skipped test, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test.skip('never run', async ({ page }) => {
  // ...
});
```

If your test should be skipped in some configurations, but not all, you can skip the test inside the test body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the test, but abort it immediately after the `test.skip` call.

```js
import { test, expect } from '@playwright/test';

test('Safari-only test', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'This feature is Safari-only');
  // ...
});
```

You can skip all tests in a file or [`method: Test.describe`] group based on some condition with a single `test.skip(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.skip(({ browserName }) => browserName !== 'webkit', 'Safari-only');

test('Safari-only test 1', async ({ page }) => {
  // ...
});
test('Safari-only test 2', async ({ page }) => {
  // ...
});
```

You can also call `test.skip()` without arguments inside the test body to always skip the test. However, we recommend using `test.skip(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.skip();
  // ...
});
```

### param: Test.skip.title
* since: v1.10
- `title` ?<[string]>

Test title.

### param: Test.skip.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.skip.body
* since: v1.10
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.skip.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "skipped" when the condition is `true`.

### param: Test.skip.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "skipped", based on test fixtures. Test or tests are marked as "skipped" when the return value is `true`.

### param: Test.skip.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.





## method: Test.slow
* since: v1.10

Marks a test as "slow". Slow test will be given triple the default timeout.

Note that [`method: Test.slow`] cannot be used in a `beforeAll` or `afterAll` hook. Use [`method: Test.setTimeout`] instead.

* `test.slow()`
* `test.slow(condition, description)`
* `test.slow(callback, description)`

**Usage**

You can mark a test as slow by calling `test.slow()` inside the test body.

```js
import { test, expect } from '@playwright/test';

test('slow test', async ({ page }) => {
  test.slow();
  // ...
});
```

If your test is slow in some configurations, but not all, you can mark it as slow based on a condition. We recommend passing a `description` argument in this case.

```js
import { test, expect } from '@playwright/test';

test('slow in Safari', async ({ page, browserName }) => {
  test.slow(browserName === 'webkit', 'This feature is slow in Safari');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "slow" based on some condition by passing a callback.

```js
import { test, expect } from '@playwright/test';

test.slow(({ browserName }) => browserName === 'webkit', 'all tests are slow in Safari');

test('slow in Safari 1', async ({ page }) => {
  // ...
});
test('fail in Safari 2', async ({ page }) => {
  // ...
});
```

### param: Test.slow.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "slow" when the condition is `true`.

### param: Test.slow.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "slow", based on test fixtures. Test or tests are marked as "slow" when the return value is `true`.

### param: Test.slow.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.



## async method: Test.step
* since: v1.10
- returns: <[any]>

Declares a test step that is shown in the report.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Log in', async () => {
    // ...
  });

  await test.step('Outer step', async () => {
    // ...
    // You can nest steps inside each other.
    await test.step('Inner step', async () => {
      // ...
    });
  });
});
```

**Details**

The method returns the value returned by the step callback.

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const user = await test.step('Log in', async () => {
    // ...
    return 'john';
  });
  expect(user).toBe('john');
});
```

**Decorator**

You can use TypeScript method decorators to turn a method into a step.
Each call to the decorated method will show up as a step in the report.

```js
function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + '.' + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    }, { box: true });
  };
}

class LoginPage {
  constructor(readonly page: Page) {}

  @step
  async login() {
    const account = { username: 'Alice', password: 's3cr3t' };
    await this.page.getByLabel('Username or email address').fill(account.username);
    await this.page.getByLabel('Password').fill(account.password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  }
}

test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});
```

**Boxing**

When something inside a step fails, you would usually see the error pointing to the exact action that failed. For example, consider the following login step:

```js
async function login(page) {
  await test.step('login', async () => {
    const account = { username: 'Alice', password: 's3cr3t' };
    await page.getByLabel('Username or email address').fill(account.username);
    await page.getByLabel('Password').fill(account.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  });
}

test('example', async ({ page }) => {
  await page.goto('https://github.com/login');
  await login(page);
});
```

```txt
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  ... error details omitted ...

   8 |     await page.getByRole('button', { name: 'Sign in' }).click();
>  9 |     await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
     |                                                                               ^
  10 |   });
```

As we see above, the test may fail with an error pointing inside the step. If you would like the error to highlight the "login" step instead of its internals, use the `box` option. An error inside a boxed step points to the step call site.

```js
async function login(page) {
  await test.step('login', async () => {
    // ...
  }, { box: true });  // Note the "box" option here.
}
```

```txt
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  ... error details omitted ...

  14 |   await page.goto('https://github.com/login');
> 15 |   await login(page);
     |         ^
  16 | });
```

You can also create a TypeScript decorator for a boxed step, similar to a regular step decorator above:

```js
function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + '.' + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    }, { box: true });  // Note the "box" option here.
  };
}

class LoginPage {
  constructor(readonly page: Page) {}

  @boxedStep
  async login() {
    // ....
  }
}

test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();  // <-- Error will be reported on this line.
});
```

### param: Test.step.title
* since: v1.10
- `title` <[string]>

Step name.


### param: Test.step.body
* since: v1.10
- `body` <[function]\([TestStepInfo]\):[Promise]<[any]>>

Step body.

### option: Test.step.box
* since: v1.39
- `box` <boolean>

Whether to box the step in the report. Defaults to `false`. When the step is boxed, errors thrown from the step internals point to the step call site. See below for more details.

### option: Test.step.location
* since: v1.48
- `location` <[Location]>

Specifies a custom location for the step to be shown in test reports and trace viewer. By default, location of the [`method: Test.step`] call is shown.

## async method: Test.step.skip
* since: v1.50
- returns: <[void]>

Mark a test step as "skip" to temporarily disable its execution, useful for steps that are currently failing and planned for a near-term fix. Playwright will not run the step. See also [`method: TestStepInfo.skip#2`].

We recommend [`method: TestStepInfo.skip#1`] instead.

**Usage**

You can declare a skipped step, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  // ...
  await test.step.skip('not yet ready', async () => {
    // ...
  });
});
```

### param: Test.step.skip.title
* since: v1.50
- `title` <[string]>

Step name.

### param: Test.step.skip.body
* since: v1.50
- `body` <[function]\(\):[Promise]<[any]>>

Step body.

### option: Test.step.skip.box
* since: v1.50
- `box` <boolean>

Whether to box the step in the report. Defaults to `false`. When the step is boxed, errors thrown from the step internals point to the step call site. See below for more details.

### option: Test.step.skip.location
* since: v1.50
- `location` <[Location]>

Specifies a custom location for the step to be shown in test reports and trace viewer. By default, location of the [`method: Test.step`] call is shown.

### option: Test.step.skip.timeout
* since: v1.50
- `timeout` <[float]>

Maximum time in milliseconds for the step to finish. Defaults to `0` (no timeout).

### option: Test.step.timeout
* since: v1.50
- `timeout` <[float]>

The maximum time, in milliseconds, allowed for the step to complete. If the step does not complete within the specified timeout, the [`method: Test.step`] method will throw a [TimeoutError]. Defaults to `0` (no timeout).

## method: Test.use
* since: v1.10

Specifies options or fixtures to use in a single test file or a [`method: Test.describe`] group. Most useful to set an option, for example set `locale` to configure `context` fixture.

**Usage**

```js
import { test, expect } from '@playwright/test';

test.use({ locale: 'en-US' });

test('test with locale', async ({ page }) => {
  // Default context and page have locale as specified
});
```

**Details**

`test.use` can be called either in the global scope or inside `test.describe`. It is an error to call it within `beforeEach` or `beforeAll`.

It is also possible to override a fixture by providing a function.

```js
import { test, expect } from '@playwright/test';

test.use({
  locale: async ({}, use) => {
    // Read locale from some configuration file.
    const locale = await fs.promises.readFile('test-locale', 'utf-8');
    await use(locale);
  },
});

test('test with locale', async ({ page }) => {
  // Default context and page have locale as specified
});
```

### param: Test.use.fixtures
* since: v1.10
- `options` <[TestOptions]>

An object with local options.


# class: TestOptions
* since: v1.10
* langs: js

Playwright Test provides many options to configure test environment, [Browser], [BrowserContext] and more.

These options are usually provided in the [configuration file](../test-configuration.md) through [`property: TestConfig.use`] and [`property: TestProject.use`].

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
});
```

Alternatively, with [`method: Test.use`] you can override some options for a file.

```js title="example.spec.ts"
import { test, expect } from '@playwright/test';

// Run tests in this file with portrait-like viewport.
test.use({ viewport: { width: 600, height: 900 } });

test('my portrait test', async ({ page }) => {
  // ...
});
```

## property: TestOptions.acceptDownloads = %%-context-option-acceptdownloads-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    acceptDownloads: false,
  },
});
```

## property: TestOptions.agentOptions
* since: v1.58
- type: <[Object]>
  - `provider` <[Object]>
    - `api` <[PageAgentAPI]<"openai"|"openai-compatible"|"anthropic"|"google">> API to use.
    - `apiEndpoint` ?<[string]> Endpoint to use if different from default.
    - `apiKey` <[string]> API key for the LLM provider.
    - `apiTimeout` ?<[int]> Amount of time to wait for the provider to respond to each request.
    - `model` <[string]> Model identifier within the provider. Required in non-cache mode.
  - `cachePathTemplate` ?<[string]> Cache file template to use/generate code for performed actions into.
  - `limits` <[Object]>
    - `maxTokens` ?<[int]> Maximum number of tokens to consume. The agentic loop will stop after input + output tokens exceed this value. Defaults to unlimited.
    - `maxActions` ?<[int]> Maximum number of agentic actions to generate, defaults to 10.
    - `maxActionRetries` ?<[int]> Maximum number retries per action, defaults to 3.
  - `secrets` ?<[Object]<[string], [string]>> Secrets to hide from the LLM.
  - `systemPrompt` <[string]> System prompt for the agent's loop.

## property: TestOptions.baseURL = %%-context-option-baseURL-%%
* since: v1.10

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
  },
});
```

## property: TestOptions.browserName
* since: v1.10
- type: <[BrowserName]<"chromium"|"firefox"|"webkit">>

Name of the browser that runs tests. Defaults to `'chromium'`. Most of the time you should set `browserName` in your [TestConfig]:

**Usage**

```js title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'firefox',
  },
});
```

## property: TestOptions.actionTimeout
* since: v1.10
- type: <[int]>

Default timeout for each Playwright action in milliseconds, defaults to 0 (no timeout).

This is a default timeout for all Playwright actions, same as configured via [`method: Page.setDefaultTimeout`].

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
  },
});
```

Learn more about [various timeouts](../test-timeouts.md).

## property: TestOptions.bypassCSP = %%-context-option-bypasscsp-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    bypassCSP: true,
  }
});
```

## property: TestOptions.channel = %%-browser-option-channel-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
  ]
});
```

## property: TestOptions.clientCertificates = %%-context-option-clientCertificates-%%
* since: 1.46

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    clientCertificates: [{
      origin: 'https://example.com',
      certPath: './cert.pem',
      keyPath: './key.pem',
      passphrase: 'mysecretpassword',
    }],
  },
});
```

## property: TestOptions.colorScheme = %%-context-option-colorscheme-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    colorScheme: 'dark',
  },
});
```

## property: TestOptions.connectOptions
* since: v1.10
- type: <[void]|[Object]>
  - `wsEndpoint` <[string]> A browser websocket endpoint to connect to.
  - `headers` ?<[void]|[Object]<[string], [string]>> Additional HTTP headers to be sent with web socket connect request. Optional.
  - `timeout` ?<[int]> Timeout in milliseconds for the connection to be established. Optional, defaults to no timeout.
  - `exposeNetwork` ?<[string]> Option to expose network available on the connecting client to the browser being connected to. See [`method: BrowserType.connect`] for more details.


**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    connectOptions: {
      wsEndpoint: 'ws://localhost:5678',
    },
  },
});
```

When connect options are specified, default [`property: Fixtures.browser`], [`property: Fixtures.context`] and [`property: Fixtures.page`] use the remote browser instead of launching a browser locally, and any launch options like [`property: TestOptions.headless`] or [`property: TestOptions.channel`] are ignored.

## property: TestOptions.contextOptions
* since: v1.10
- type: <[Object]>

Options used to create the context, as passed to [`method: Browser.newContext`]. Specific options like [`property: TestOptions.viewport`] take priority over this.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
});
```

## property: TestOptions.deviceScaleFactor = %%-context-option-devicescalefactor-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 2,
  },
});
```

## property: TestOptions.extraHTTPHeaders = %%-context-option-extrahttpheaders-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    extraHTTPHeaders: {
      'X-My-Header': 'value',
    },
  },
});
```

## property: TestOptions.geolocation = %%-context-option-geolocation-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
  },
});
```
Learn more about [geolocation](../emulation.md#color-scheme-and-media).

## property: TestOptions.hasTouch = %%-context-option-hastouch-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    hasTouch: true
  },
});
```

## property: TestOptions.headless = %%-browser-option-headless-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false
  },
});
```

## property: TestOptions.httpCredentials = %%-context-option-httpcredentials-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    httpCredentials: {
      username: 'user',
      password: 'pass',
    },
  },
});
```

## property: TestOptions.ignoreHTTPSErrors = %%-context-option-ignorehttpserrors-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
  },
});
```

## property: TestOptions.isMobile = %%-context-option-ismobile-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    isMobile: false,
  },
});
```

## property: TestOptions.javaScriptEnabled = %%-context-option-javascriptenabled-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    javaScriptEnabled: false,
  },
});
```


## property: TestOptions.launchOptions
* since: v1.10
- type: <[Object]>

Options used to launch the browser, as passed to [`method: BrowserType.launch`]. Specific options [`property: TestOptions.headless`] and [`property: TestOptions.channel`] take priority over this.

:::warning
Use custom browser args at your own risk, as some of them may break Playwright functionality.
:::

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    }
  ]
});
```

## property: TestOptions.locale
* since: v1.10
- type: <[string]>

Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to `en-US`. Learn more about emulation in our [emulation guide](../emulation.md#locale--timezone).

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    locale: 'it-IT',
  },
});
```

## property: TestOptions.navigationTimeout
* since: v1.10
- type: <[int]>

Timeout for each navigation action in milliseconds. Defaults to 0 (no timeout).

This is a default navigation timeout, same as configured via [`method: Page.setDefaultNavigationTimeout`].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    navigationTimeout: 3000,
  },
});
```

Learn more about [various timeouts](../test-timeouts.md).

## property: TestOptions.offline = %%-context-option-offline-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    offline: true
  },
});
```

## property: TestOptions.permissions = %%-context-option-permissions-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    permissions: ['notifications'],
  },
});
```

## property: TestOptions.proxy = %%-browser-option-proxy-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    proxy: {
      server: 'http://myproxy.com:3128',
      bypass: 'localhost',
    },
  },
});
```

## property: TestOptions.screenshot
* since: v1.10
- type: <[Object]|[ScreenshotMode]<"off"|"on"|"only-on-failure"|"on-first-failure">>
  - `mode` <[ScreenshotMode]<"off"|"on"|"only-on-failure"|"on-first-failure">> Automatic screenshot mode.
  - `fullPage` ?<[boolean]> When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to `false`.
  - `omitBackground` ?<[boolean]> Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.

Whether to automatically capture a screenshot after each test. Defaults to `'off'`.
* `'off'`: Do not capture screenshots.
* `'on'`: Capture screenshot after each test.
* `'only-on-failure'`: Capture screenshot after each test failure.
* `'on-first-failure'`: Capture screenshot after each test's first failure.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
  },
});
```

Learn more about [automatic screenshots](../test-use-options.md#recording-options).

## property: TestOptions.storageState = %%-js-python-context-option-storage-state-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    storageState: 'storage-state.json',
  },
});
```

**Details**

When storage state is set up in the config, it is possible to reset storage state for a file:

```js title="not-signed-in.spec.ts"
import { test } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('not signed in test', async ({ page }) => {
  // ...
});
```

## property: TestOptions.testIdAttribute
* since: v1.27

Custom attribute to be used in [`method: Page.getByTestId`]. `data-testid` is used by default.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'pw-test-id',
  },
});
```

## property: TestOptions.timezoneId = %%-context-option-timezoneid-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    timezoneId: 'Europe/Rome',
  },
});
```

## property: TestOptions.trace
* since: v1.10
- type: <[Object]|[TraceMode]<"off"|"on"|"retain-on-failure"|"on-first-retry"|"retain-on-first-failure">>
  - `mode` <[TraceMode]<"off"|"on"|"retain-on-failure"|"on-first-retry"|"on-all-retries"|"retain-on-first-failure">> Trace recording mode.
  - `attachments` ?<[boolean]> Whether to include test attachments. Defaults to true. Optional.
  - `screenshots` ?<[boolean]> Whether to capture screenshots during tracing. Screenshots are used to build a timeline preview. Defaults to true. Optional.
  - `snapshots` ?<[boolean]> Whether to capture DOM snapshot on every action. Defaults to true. Optional.
  - `sources` ?<[boolean]> Whether to include source files for trace actions. Defaults to true. Optional.

Whether to record trace for each test. Defaults to `'off'`.
* `'off'`: Do not record trace.
* `'on'`: Record trace for each test.
* `'on-first-retry'`: Record trace only when retrying a test for the first time.
* `'on-all-retries'`: Record trace only when retrying a test.
* `'retain-on-failure'`: Record trace for each test. When test run passes, remove the recorded trace.
* `'retain-on-first-failure'`: Record trace for the first run of each test, but not for retries. When test run passes, remove the recorded trace.

For more control, pass an object that specifies `mode` and trace features to enable.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on-first-retry'
  },
});
```

Learn more about [recording trace](../test-use-options.md#recording-options).

## property: TestOptions.userAgent = %%-context-option-useragent-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    userAgent: 'some custom ua',
  },
});
```

## property: TestOptions.video
* since: v1.10
- type: <[Object]|[VideoMode]<"off"|"on"|"retain-on-failure"|"on-first-retry">>
  - `mode` <[VideoMode]<"off"|"on"|"retain-on-failure"|"on-first-retry">> Video recording mode.
  - `size` ?<[Object]> Size of the recorded video. Optional.
    - `width` <[int]>
    - `height` <[int]>

Whether to record video for each test. Defaults to `'off'`.
* `'off'`: Do not record video.
* `'on'`: Record video for each test.
* `'retain-on-failure'`: Record video for each test, but remove all videos from successful test runs.
* `'on-first-retry'`: Record video only when retrying a test for the first time.

To control video size, pass an object with `mode` and `size` properties. If video size is not specified, it will be equal to [`property: TestOptions.viewport`] scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: 'on-first-retry',
  },
});
```

Learn more about [recording video](../test-use-options.md#recording-options).

## property: TestOptions.viewport = %%-context-option-viewport-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    viewport: { width: 100, height: 100 },
  },
});
```

## property: TestOptions.serviceWorkers = %%-context-option-service-worker-policy-%%
* since: v1.10

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    serviceWorkers: 'allow'
  },
});
```
