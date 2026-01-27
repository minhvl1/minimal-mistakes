# class: Suite
* since: v1.10
* langs: js

`Suite` is a group of tests. All tests in Playwright Test form the following hierarchy:

* Root suite has a child suite for each [FullProject].
  * Project suite #1. Has a child suite for each test file in the project.
    * File suite #1
      * [TestCase] #1
      * [TestCase] #2
      * Suite corresponding to a [`method: Test.describe`] group
        * [TestCase] #1 in a group
        * [TestCase] #2 in a group
      * < more test cases ... >
    * File suite #2
    * < more file suites ... >
  * Project suite #2
  * < more project suites ... >

Reporter is given a root suite in the [`method: Reporter.onBegin`] method.

## method: Suite.allTests
* since: v1.10
- returns: <[Array]<[TestCase]>>

Returns the list of all test cases in this suite and its descendants, as opposite to [`property: Suite.tests`].

## method: Suite.entries
* since: v1.44
- type: <[Array]<[TestCase]|[Suite]>>

Test cases and suites defined directly in this suite. The elements are returned in their declaration order. You can differentiate between various entry types by using [`property: TestCase.type`] and [`property: Suite.type`].

## property: Suite.location
* since: v1.10
- type: ?<[Location]>

Location in the source where the suite is defined. Missing for root and project suites.

## property: Suite.parent
* since: v1.10
- type: ?<[Suite]>

Parent suite, missing for the root suite.

## method: Suite.project
* since: v1.10
- returns: <[FullProject]|[undefined]>

Configuration of the project this suite belongs to, or [void] for the root suite.

## property: Suite.suites
* since: v1.10
- type: <[Array]<[Suite]>>

Child suites. See [Suite] for the hierarchy of suites.

## property: Suite.tests
* since: v1.10
- type: <[Array]<[TestCase]>>

Test cases in the suite. Note that only test cases defined directly in this suite are in the list. Any test cases defined in nested [`method: Test.describe`] groups are listed
in the child [`property: Suite.suites`].

## property: Suite.title
* since: v1.10
- type: <[string]>

Suite title.
* Empty for root suite.
* Project name for project suite.
* File path for file suite.
* Title passed to [`method: Test.describe`] for a group suite.

## method: Suite.titlePath
* since: v1.10
- returns: <[Array]<[string]>>

Returns a list of titles from the root down to this suite.

## property: Suite.type
* since: v1.44
- returns: <[SuiteType]<"root"|"project"|"file"|"describe">>

Returns the type of the suite. The Suites form the following hierarchy:
`root` -> `project` -> `file` -> `describe` -> ...`describe` -> `test`.
# class: TestError
* since: v1.10
* langs: js

Information about an error thrown during test execution.

## property: TestError.cause
* since: v1.49
- type: ?<[TestError]>

Error cause. Set when there is a [cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) for the error. Will be `undefined` if there is no cause or if the cause is not an instance of [Error].

## property: TestError.message
* since: v1.10
- type: ?<[string]>

Error message. Set when [Error] (or its subclass) has been thrown.

## property: TestError.stack
* since: v1.10
- type: ?<[string]>

Error stack. Set when [Error] (or its subclass) has been thrown.

## property: TestError.value
* since: v1.10
- type: ?<[string]>

The value that was thrown. Set when anything except the [Error] (or its subclass) has been thrown.

## property: TestError.location
* since: v1.30
- type: ?<[Location]>

Error location in the source code.

## property: TestError.snippet
* since: v1.33
- type: ?<[string]>

Source code snippet with highlighted error.
# class: TestStep
* since: v1.10
* langs: js

Represents a step in the [TestRun].

## property: TestStep.category
* since: v1.10
- type: <[string]>

Step category to differentiate steps with different origin and verbosity. Built-in categories are:
* `expect` for expect calls
* `fixture` for fixtures setup and teardown
* `hook` for hooks initialization and teardown
* `pw:api` for Playwright API calls.
* `test.step` for test.step API calls.
* `test.attach` for testInfo.attach API calls.


## property: TestStep.duration
* since: v1.10
- type: <[float]>

Running time in milliseconds.

## property: TestStep.location
* since: v1.10
- type: ?<[Location]>

Optional location in the source where the step is defined.

## property: TestStep.error
* since: v1.10
- type: ?<[TestError]>

Error thrown during the step execution, if any.

## property: TestStep.parent
* since: v1.10
- type: ?<[TestStep]>

Parent step, if any.

## property: TestStep.startTime
* since: v1.10
- type: <[Date]>

Start time of this particular test step.

## property: TestStep.steps
* since: v1.10
- type: <[Array]<[TestStep]>>

List of steps inside this step.

## property: TestStep.annotations
* since: v1.51
- type: <[Array]<[Object]>>
  - `type` <[string]> Annotation type, for example `'skip'`.
  - `description` ?<[string]> Optional description.
  - `location` ?<[Location]> Optional location in the source where the annotation is added.

The list of annotations applicable to the current test step.

## property: TestStep.attachments
* since: v1.50
- type: <[Array]<[Object]>>
  - `name` <[string]> Attachment name.
  - `contentType` <[string]> Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
  - `path` ?<[string]> Optional path on the filesystem to the attached file.
  - `body` ?<[Buffer]> Optional attachment body used instead of a file.

The list of files or buffers attached in the step execution through [`method: TestInfo.attach`].

## property: TestStep.title
* since: v1.10
- type: <[string]>

User-friendly test step title.

## method: TestStep.titlePath
* since: v1.10
- returns: <[Array]<[string]>>

Returns a list of step titles from the root step down to this step.
# class: TestCase
* since: v1.10
* langs: js

`TestCase` corresponds to every [`method: Test.(call)`] call in a test file. When a single [`method: Test.(call)`] is running in multiple projects or repeated multiple times, it will have multiple `TestCase` objects in corresponding projects' suites.

## property: TestCase.annotations
* since: v1.10
- type: <[Array]<[Object]>>
  - `type` <[string]> Annotation type, for example `'skip'` or `'fail'`.
  - `description` ?<[string]> Optional description.
  - `location` ?<[Location]> Optional location in the source where the annotation is added.

[`property: TestResult.annotations`] of the last test run.

## property: TestCase.expectedStatus
* since: v1.10
- type: <[TestStatus]<"passed"|"failed"|"timedOut"|"skipped"|"interrupted">>

Expected test status.
* Tests marked as [`method: Test.skip`] or [`method: Test.fixme`] are expected to be `'skipped'`.
* Tests marked as [`method: Test.fail`] are expected to be `'failed'`.
* Other tests are expected to be `'passed'`.

See also [`property: TestResult.status`] for the actual status.

## property: TestCase.id
* since: v1.25
- type: <[string]>

A test ID that is computed based on the test file name, test title and project name. The ID is unique within Playwright session.

## property: TestCase.location
* since: v1.10
- type: <[Location]>

Location in the source where the test is defined.

## method: TestCase.ok
* since: v1.10
- returns: <[boolean]>

Whether the test is considered running fine. Non-ok tests fail the test run with non-zero exit code.

## method: TestCase.outcome
* since: v1.10
- returns: <[TestOutcome]<"skipped"|"expected"|"unexpected"|"flaky">>

Testing outcome for this test. Note that outcome is not the same as [`property: TestResult.status`]:
* Test that is expected to fail and actually fails is `'expected'`.
* Test that passes on a second retry is `'flaky'`.

## property: TestCase.parent
* since: v1.10
- type: <[Suite]>

Suite this test case belongs to.

## property: TestCase.repeatEachIndex
* since: v1.10
- type: <[int]>

Contains the repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each` to the [command line](../test-cli.md).

## property: TestCase.results
* since: v1.10
- type: <[Array]<[TestResult]>>

Results for each run of this test.

## property: TestCase.retries
* since: v1.10
- type: <[int]>

The maximum number of retries given to this test in the configuration.

Learn more about [test retries](../test-retries.md#retries).

## property: TestCase.tags
* since: v1.42
- type: <[Array]<[string]>>

The list of tags defined on the test or suite via [`method: Test.(call)`] or [`method: Test.describe`], as well as `@`-tokens extracted from test and suite titles.

Learn more about [test tags](../test-annotations.md#tag-tests).

## property: TestCase.timeout
* since: v1.10
- type: <[float]>

The timeout given to the test. Affected by [`property: TestConfig.timeout`], [`property: TestProject.timeout`], [`method: Test.setTimeout`], [`method: Test.slow`] and [`method: TestInfo.setTimeout`].

## property: TestCase.title
* since: v1.10
- type: <[string]>

Test title as passed to the [`method: Test.(call)`] call.

## method: TestCase.titlePath
* since: v1.10
- returns: <[Array]<[string]>>

Returns a list of titles from the root down to this test.

## property: TestCase.type
* since: v1.44
- returns: <[TestCaseType]<"test">>

Returns "test". Useful for detecting test cases in [`method: Suite.entries`].
# class: Reporter
* since: v1.10
* langs: js

Test runner notifies the reporter about various events during test execution. All methods of the reporter are optional.

You can create a custom reporter by implementing a class with some of the reporter methods. Make sure to export this class as default.

```js tab=js-js title="my-awesome-reporter.js"
// @ts-check

/** @implements {import('@playwright/test/reporter').Reporter} */
class MyReporter {
  constructor(options) {
    console.log(`my-awesome-reporter setup with customOption set to ${options.customOption}`);
  }

  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
  }
}

module.exports = MyReporter;
```

```js tab=js-ts title="my-awesome-reporter.ts"
import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  constructor(options: { customOption?: string } = {}) {
    console.log(`my-awesome-reporter setup with customOption set to ${options.customOption}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}
export default MyReporter;
```

Now use this reporter with [`property: TestConfig.reporter`]. Learn more about [using reporters](../test-reporters.md).

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['./my-awesome-reporter.ts', { customOption: 'some value' }]],
});
```

Here is a typical order of reporter calls:
* [`method: Reporter.onBegin`] is called once with a root suite that contains all other suites and tests. Learn more about [suites hierarchy][Suite].
* [`method: Reporter.onTestBegin`] is called for each test run. It is given a [TestCase] that is executed, and a [TestResult] that is almost empty. Test result will be populated while the test runs (for example, with steps and stdio) and will get final `status` once the test finishes.
* [`method: Reporter.onStepBegin`] and [`method: Reporter.onStepEnd`] are called for each executed step inside the test. When steps are executed, test run has not finished yet.
* [`method: Reporter.onTestEnd`] is called when test run has finished. By this time, [TestResult] is complete and you can use [`property: TestResult.status`], [`property: TestResult.error`] and more.
* [`method: Reporter.onEnd`] is called once after all tests that should run had finished.
* [`method: Reporter.onExit`] is called immediately before the test runner exits.

Additionally, [`method: Reporter.onStdOut`] and [`method: Reporter.onStdErr`] are called when standard output is produced in the worker process, possibly during a test execution,
and [`method: Reporter.onError`] is called when something went wrong outside of the test execution.

If your custom reporter does not print anything to the terminal, implement [`method: Reporter.printsToStdio`] and return `false`. This way, Playwright will use one of the standard terminal reporters in addition to your custom reporter to enhance user experience.

**Reporter errors**

Playwright will swallow any errors thrown in your custom reporter methods. If you need to detect or fail on reporter
errors, you must wrap and handle them yourself.

**Merged report API notes**

When merging multiple [`blob`](../test-reporters#blob-reporter) reports via [`merge-reports`](../test-sharding#merge-reports-cli) CLI
command, the same [Reporter] API is called to produce final reports and all existing reporters
should work without any changes. There some subtle differences though which might affect some custom
reporters.

* Projects from different shards are always kept as separate [TestProject] objects. E.g. if project 'Desktop Chrome' was sharded across 5 machines then there will be 5 instances of projects with the same name in the config passed to [`method: Reporter.onBegin`].

## optional method: Reporter.onBegin
* since: v1.10

Called once before running tests. All tests have been already discovered and put into a hierarchy of [Suite]s.

### param: Reporter.onBegin.config
* since: v1.10
- `config` <[FullConfig]>

Resolved configuration.

### param: Reporter.onBegin.suite
* since: v1.10
- `suite` <[Suite]>

The root suite that contains all projects, files and test cases.

## optional async method: Reporter.onEnd
* since: v1.10
- `result` ?<[Object]>
  - `status` ?<[FullStatus]<"passed"|"failed"|"timedout"|"interrupted">>

Called after all tests have been run, or testing has been interrupted. Note that this method may return a [Promise] and Playwright Test will await it.
Reporter is allowed to override the status and hence affect the exit code of the test runner.

### param: Reporter.onEnd.result
* since: v1.10
- `result` <[Object]>
  - `status` <[FullStatus]<"passed"|"failed"|"timedout"|"interrupted">> Test run status.
  - `startTime` <[Date]> Test run start wall time.
  - `duration` <[int]> Test run duration in milliseconds.

Result of the full test run, `status` can be one of:
* `'passed'` - Everything went as expected.
* `'failed'` - Any test has failed.
* `'timedout'` - The [`property: TestConfig.globalTimeout`] has been reached.
* `'interrupted'` - Interrupted by the user.

## optional method: Reporter.onError
* since: v1.10

Called on some global error, for example unhandled exception in the worker process.

### param: Reporter.onError.error
* since: v1.10
- `error` <[TestError]>

The error.

## optional async method: Reporter.onExit
* since: v1.33

Called immediately before test runner exists. At this point all the reporters
have received the [`method: Reporter.onEnd`] signal, so all the reports should
be build. You can run the code that uploads the reports in this hook.

## optional method: Reporter.onStdErr
* since: v1.10

Called when something has been written to the standard error in the worker process.

### param: Reporter.onStdErr.chunk
* since: v1.10
- `chunk` <[string]|[Buffer]>

Output chunk.

### param: Reporter.onStdErr.test
* since: v1.10
- `test` <[void]|[TestCase]>

Test that was running. Note that output may happen when no test is running, in which case this will be [void].

### param: Reporter.onStdErr.result
* since: v1.10
- `result` <[void]|[TestResult]>

Result of the test run, this object gets populated while the test runs.


## optional method: Reporter.onStdOut
* since: v1.10

Called when something has been written to the standard output in the worker process.

### param: Reporter.onStdOut.chunk
* since: v1.10
- `chunk` <[string]|[Buffer]>

Output chunk.

### param: Reporter.onStdOut.test
* since: v1.10
- `test` <[void]|[TestCase]>

Test that was running. Note that output may happen when no test is running, in which case this will be [void].

### param: Reporter.onStdOut.result
* since: v1.10
- `result` <[void]|[TestResult]>

Result of the test run, this object gets populated while the test runs.

## optional method: Reporter.onStepBegin
* since: v1.10

Called when a test step started in the worker process.

### param: Reporter.onStepBegin.test
* since: v1.10
- `test` <[TestCase]>

Test that the step belongs to.

### param: Reporter.onStepBegin.result
* since: v1.10
- `result` <[TestResult]>

Result of the test run, this object gets populated while the test runs.

### param: Reporter.onStepBegin.step
* since: v1.10
- `step` <[TestStep]>

Test step instance that has started.

## optional method: Reporter.onStepEnd
* since: v1.10

Called when a test step finished in the worker process.

### param: Reporter.onStepEnd.test
* since: v1.10
- `test` <[TestCase]>

Test that the step belongs to.

### param: Reporter.onStepEnd.result
* since: v1.10
- `result` <[TestResult]>

Result of the test run.

### param: Reporter.onStepEnd.step
* since: v1.10
- `step` <[TestStep]>

Test step instance that has finished.

## optional method: Reporter.onTestBegin
* since: v1.10

Called after a test has been started in the worker process.

### param: Reporter.onTestBegin.test
* since: v1.10
- `test` <[TestCase]>

Test that has been started.

### param: Reporter.onTestBegin.result
* since: v1.10
- `result` <[TestResult]>

Result of the test run, this object gets populated while the test runs.


## optional method: Reporter.onTestEnd
* since: v1.10

Called after a test has been finished in the worker process.

### param: Reporter.onTestEnd.test
* since: v1.10
- `test` <[TestCase]>

Test that has been finished.

### param: Reporter.onTestEnd.result
* since: v1.10
- `result` <[TestResult]>

Result of the test run.


## optional method: Reporter.printsToStdio
* since: v1.10
- returns: <[boolean]>

Whether this reporter uses stdio for reporting. When it does not, Playwright Test could add some output to enhance user experience. If your reporter does not print to the terminal, it is strongly recommended to return `false`.
# class: TestResult
* since: v1.10
* langs: js

A result of a single [TestCase] run.

## property: TestResult.attachments
* since: v1.10
- type: <[Array]<[Object]>>
  - `name` <[string]> Attachment name.
  - `contentType` <[string]> Content type of this attachment to properly present in the report, for example `'application/json'` or `'image/png'`.
  - `path` ?<[string]> Optional path on the filesystem to the attached file.
  - `body` ?<[Buffer]> Optional attachment body used instead of a file.

The list of files or buffers attached during the test execution through [`property: TestInfo.attachments`].

## property: TestResult.annotations
* since: v1.52
- type: <[Array]<[Object]>>
  - `type` <[string]> Annotation type, for example `'skip'` or `'fail'`.
  - `description` ?<[string]> Optional description.
  - `location` ?<[Location]> Optional location in the source where the annotation is added.

The list of annotations applicable to the current test. Includes:
* annotations defined on the test or suite via [`method: Test.(call)`] and [`method: Test.describe`];
* annotations implicitly added by methods [`method: Test.skip`], [`method: Test.fixme`] and [`method: Test.fail`];
* annotations appended to [`property: TestInfo.annotations`] during the test execution.

Annotations are available during test execution through [`property: TestInfo.annotations`].

Learn more about [test annotations](../test-annotations.md).

## property: TestResult.duration
* since: v1.10
- type: <[float]>

Running time in milliseconds.

## property: TestResult.error
* since: v1.10
- type: ?<[TestError]>

First error thrown during test execution, if any. This is equal to the first
element in [`property: TestResult.errors`].

## property: TestResult.errors
* since: v1.10
- type: <[Array]<[TestError]>>

Errors thrown during the test execution.

## property: TestResult.retry
* since: v1.10
- type: <[int]>

When test is retried multiple times, each retry attempt is given a sequential number.

Learn more about [test retries](../test-retries.md#retries).

## property: TestResult.startTime
* since: v1.10
- type: <[Date]>

Start time of this particular test run.

## property: TestResult.status
* since: v1.10
- type: <[TestStatus]<"passed"|"failed"|"timedOut"|"skipped"|"interrupted">>

The status of this test result. See also [`property: TestCase.expectedStatus`].

## property: TestResult.stderr
* since: v1.10
- type: <[Array]<[string]|[Buffer]>>

Anything written to the standard error during the test run.

## property: TestResult.stdout
* since: v1.10
- type: <[Array]<[string]|[Buffer]>>

Anything written to the standard output during the test run.

## property: TestResult.steps
* since: v1.10
- type: <[Array]<[TestStep]>>

List of steps inside this test run.

## property: TestResult.workerIndex
* since: v1.10
- type: <[int]>

Index of the worker where the test was run. If the test was not run a single time, for example when the user interrupted testing, the only result will have a `workerIndex` equal to `-1`.

Learn more about [parallelism and sharding](../test-parallel.md) with Playwright Test.

## property: TestResult.parallelIndex
* since: v1.30
- type: <[int]>

The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have a different `parallelIndex`.
