# class: TimeoutError
* since: v1.8
* extends: [Error]

TimeoutError is emitted whenever certain operations are terminated due to timeout, e.g. [`method: Locator.waitFor`] or [`method: BrowserType.launch`].

```js
const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.locator('text=Foo').click({
      timeout: 100,
    });
  } catch (error) {
    if (error instanceof playwright.errors.TimeoutError)
      console.log('Timeout!');
  }
  await browser.close();
})();
```

```python async
import asyncio
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError, Playwright

async def run(playwright: Playwright):
    browser = await playwright.chromium.launch()
    page = await browser.new_page()
    try:
      await page.locator("text=Example").click(timeout=100)
    except PlaywrightTimeoutError:
      print("Timeout!")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
      page.locator("text=Example").click(timeout=100)
    except PlaywrightTimeoutError:
      print("Timeout!")
    browser.close()
```

```java
package org.example;

import com.microsoft.playwright.*;

public class TimeoutErrorExample {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      Browser browser = playwright.firefox().launch();
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      try {
        page.locator("text=Example").click(new Locator.ClickOptions().setTimeout(100));
      } catch (TimeoutError e) {
        System.out.println("Timeout!");
      }
    }
  }
}
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
await using var browser = await playwright.Chromium.LaunchAsync();
var page = await browser.NewPageAsync();
try
{
    await page.ClickAsync("text=Example", new() { Timeout = 100 });
}
catch (TimeoutException)
{
    Console.WriteLine("Timeout!");
}
```
# class: Frame
* since: v1.8

At every point of time, page exposes its current frame tree via the [`method: Page.mainFrame`] and
[`method: Frame.childFrames`] methods.

[Frame] object's lifecycle is controlled by three events, dispatched on the page object:
* [`event: Page.frameAttached`] - fired when the frame gets attached to the page. A Frame can be attached to the page
  only once.
* [`event: Page.frameNavigated`] - fired when the frame commits navigation to a different URL.
* [`event: Page.frameDetached`] - fired when the frame gets detached from the page.  A Frame can be detached from the
  page only once.

An example of dumping frame tree:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/chrome/browser/canary.html');
  dumpFrameTree(page.mainFrame(), '');
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (const child of frame.childFrames())
      dumpFrameTree(child, indent + '  ');
  }
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType firefox = playwright.firefox();
      Browser browser = firefox.launch();
      Page page = browser.newPage();
      page.navigate("https://www.google.com/chrome/browser/canary.html");
      dumpFrameTree(page.mainFrame(), "");
      browser.close();
    }
  }
  static void dumpFrameTree(Frame frame, String indent) {
    System.out.println(indent + frame.url());
    for (Frame child : frame.childFrames()) {
      dumpFrameTree(child, indent + "  ");
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = await firefox.launch()
    page = await browser.new_page()
    await page.goto("https://www.theverge.com")
    dump_frame_tree(page.main_frame, "")
    await browser.close()

def dump_frame_tree(frame, indent):
    print(indent + frame.name + '@' + frame.url)
    for child in frame.child_frames:
        dump_frame_tree(child, indent + "    ")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = firefox.launch()
    page = browser.new_page()
    page.goto("https://www.theverge.com")
    dump_frame_tree(page.main_frame, "")
    browser.close()

def dump_frame_tree(frame, indent):
    print(indent + frame.name + '@' + frame.url)
    for child in frame.child_frames:
        dump_frame_tree(child, indent + "    ")

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Firefox.LaunchAsync();
        var page = await browser.NewPageAsync();

        await page.GotoAsync("https://www.bing.com");
        DumpFrameTree(page.MainFrame, string.Empty);
    }

    private static void DumpFrameTree(IFrame frame, string indent)
    {
        Console.WriteLine($"{indent}{frame.Url}");
        foreach (var child in frame.ChildFrames)
            DumpFrameTree(child, indent + " ");
    }
}
```

## async method: Frame.addScriptTag
* since: v1.8
- returns: <[ElementHandle]>

Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

### option: Frame.addScriptTag.url
* since: v1.8
- `url` <[string]>

URL of a script to be added.

### option: Frame.addScriptTag.path
* since: v1.8
- `path` <[path]>

Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Frame.addScriptTag.content
* since: v1.8
- `content` <[string]>

Raw JavaScript content to be injected into frame.

### option: Frame.addScriptTag.type
* since: v1.8
- `type` <[string]>

Script type. Use 'module' in order to load a JavaScript ES6 module. See
[script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.

## async method: Frame.addStyleTag
* since: v1.8
- returns: <[ElementHandle]>

Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the
content.

### option: Frame.addStyleTag.url
* since: v1.8
- `url` <[string]>

URL of the `<link>` tag.

### option: Frame.addStyleTag.path
* since: v1.8
- `path` <[path]>

Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Frame.addStyleTag.content
* since: v1.8
- `content` <[string]>

Raw CSS content to be injected into frame.

## async method: Frame.check
* since: v1.8
* discouraged: Use locator-based [`method: Locator.check`] instead. Read more about [locators](../locators.md).

This method checks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Frame.check.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.check.force = %%-input-force-%%
* since: v1.8

### option: Frame.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.check.position = %%-input-position-%%
* since: v1.11

### option: Frame.check.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.check.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.check.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.check.trial = %%-input-trial-%%
* since: v1.11

## method: Frame.childFrames
* since: v1.8
- returns: <[Array]<[Frame]>>

## async method: Frame.click
* since: v1.8
* discouraged: Use locator-based [`method: Locator.click`] instead. Read more about [locators](../locators.md).

This method clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Frame.click.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.click.button = %%-input-button-%%
* since: v1.8

### option: Frame.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: Frame.click.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Frame.click.force = %%-input-force-%%
* since: v1.8

### option: Frame.click.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Frame.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Frame.click.position = %%-input-position-%%
* since: v1.8

### option: Frame.click.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.click.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.click.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.click.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Frame.content
* since: v1.8
- returns: <[string]>

Gets the full HTML contents of the frame, including the doctype.

## async method: Frame.dblclick
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dblclick`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-csharp: DblClickAsync

This method double clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].
   if the first click of the `dblclick()` triggers a navigation event, this method will throw.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`frame.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### param: Frame.dblclick.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.dblclick.button = %%-input-button-%%
* since: v1.8

### option: Frame.dblclick.force = %%-input-force-%%
* since: v1.8

### option: Frame.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Frame.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Frame.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.dblclick.position = %%-input-position-%%
* since: v1.8

### option: Frame.dblclick.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.dblclick.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.dblclick.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Frame.dispatchEvent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dispatchEvent`] instead. Read more about [locators](../locators.md).

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
[element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```js
await frame.dispatchEvent('button#submit', 'click');
```

```java
frame.dispatchEvent("button#submit", "click");
```

```python async
await frame.dispatch_event("button#submit", "click")
```

```python sync
frame.dispatch_event("button#submit", "click")
```

```csharp
await frame.DispatchEventAsync("button#submit", "click");
```

Under the hood, it creates an instance of an event based on the given [`param: type`], initializes it with
[`param: eventInit`] properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by
default.

Since [`param: eventInit`] is event-specific, please refer to the events documentation for the lists of initial
properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```js
// Note you can only create DataTransfer in Chromium and Firefox
const dataTransfer = await frame.evaluateHandle(() => new DataTransfer());
await frame.dispatchEvent('#source', 'dragstart', { dataTransfer });
```

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = frame.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
frame.dispatchEvent("#source", "dragstart", arg);
```

```python async
# note you can only create data_transfer in chromium and firefox
data_transfer = await frame.evaluate_handle("new DataTransfer()")
await frame.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```python sync
# note you can only create data_transfer in chromium and firefox
data_transfer = frame.evaluate_handle("new DataTransfer()")
frame.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```csharp
// Note you can only create DataTransfer in Chromium and Firefox
var dataTransfer = await frame.EvaluateHandleAsync("() => new DataTransfer()");
await frame.DispatchEventAsync("#source", "dragstart", new { dataTransfer });
```

### param: Frame.dispatchEvent.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.dispatchEvent.type
* since: v1.8
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: Frame.dispatchEvent.eventInit
* since: v1.8
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

### option: Frame.dispatchEvent.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.dispatchEvent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.dispatchEvent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.dragAndDrop
* since: v1.13

### param: Frame.dragAndDrop.source = %%-input-source-%%
* since: v1.13

### param: Frame.dragAndDrop.target = %%-input-target-%%
* since: v1.13

### option: Frame.dragAndDrop.force = %%-input-force-%%
* since: v1.13

### option: Frame.dragAndDrop.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.13

### option: Frame.dragAndDrop.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.dragAndDrop.timeout = %%-input-timeout-%%
* since: v1.13

### option: Frame.dragAndDrop.timeout = %%-input-timeout-js-%%
* since: v1.13

### option: Frame.dragAndDrop.trial = %%-input-trial-%%
* since: v1.13

### option: Frame.dragAndDrop.sourcePosition = %%-input-source-position-%%
* since: v1.14

### option: Frame.dragAndDrop.targetPosition = %%-input-target-position-%%
* since: v1.14

### option: Frame.dragAndDrop.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Frame.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass the actionability
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`], other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds an element matching the specified selector within the frame and passes it as a first argument to
[`param: expression`]. If no
elements match the selector, the method throws an error.

If [`param: expression`] returns a [Promise], then [`method: Frame.evalOnSelector`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
```

```java
String searchValue = (String) frame.evalOnSelector("#search", "el => el.value");
String preloadHref = (String) frame.evalOnSelector("link[rel=preload]", "el => el.href");
String html = (String) frame.evalOnSelector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

```python async
search_value = await frame.eval_on_selector("#search", "el => el.value")
preload_href = await frame.eval_on_selector("link[rel=preload]", "el => el.href")
html = await frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

```python sync
search_value = frame.eval_on_selector("#search", "el => el.value")
preload_href = frame.eval_on_selector("link[rel=preload]", "el => el.href")
html = frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

```csharp
var searchValue = await frame.EvalOnSelectorAsync<string>("#search", "el => el.value");
var preloadHref = await frame.EvalOnSelectorAsync<string>("link[rel=preload]", "el => el.href");
var html = await frame.EvalOnSelectorAsync(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

### param: Frame.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: Frame.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Frame.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: Frame.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.evalOnSelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Frame.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds all elements matching the specified selector within the frame and passes an array of matched elements
as a first argument to [`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: Frame.evalOnSelectorAll`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const divsCounts = await frame.$$eval('div', (divs, min) => divs.length >= min, 10);
```

```java
boolean divsCounts = (boolean) page.evalOnSelectorAll("div", "(divs, min) => divs.length >= min", 10);
```

```python async
divs_counts = await frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```python sync
divs_counts = frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```csharp
var divsCount = await frame.EvalOnSelectorAllAsync<bool>("div", "(divs, min) => divs.length >= min", 10);
```

### param: Frame.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Frame.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

If the function passed to the [`method: Frame.evaluate`] returns a [Promise], then [`method: Frame.evaluate`] would wait for the promise to
resolve and return its value.

If the function passed to the [`method: Frame.evaluate`] returns a non-[Serializable] value, then
[`method: Frame.evaluate`] returns `undefined`. Playwright also supports transferring some
additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

```js
const result = await frame.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

```java
Object result = frame.evaluate("([x, y]) => {\n" +
  "  return Promise.resolve(x * y);\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "56"
```

```python async
result = await frame.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```python sync
result = frame.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```csharp
var result = await frame.EvaluateAsync<int>("([x, y]) => Promise.resolve(x * y)", new[] { 7, 8 });
Console.WriteLine(result);
```

A string can also be passed in instead of a function.

```js
console.log(await frame.evaluate('1 + 2')); // prints "3"
```

```java
System.out.println(frame.evaluate("1 + 2")); // prints "3"
```

```python async
print(await frame.evaluate("1 + 2")) # prints "3"
x = 10
print(await frame.evaluate(f"1 + {x}")) # prints "11"
```

```python sync
print(frame.evaluate("1 + 2")) # prints "3"
x = 10
print(frame.evaluate(f"1 + {x}")) # prints "11"
```

```csharp
Console.WriteLine(await frame.EvaluateAsync<int>("1 + 2")); // prints "3"
```

[ElementHandle] instances can be passed as an argument to the [`method: Frame.evaluate`]:

```js
const bodyHandle = await frame.evaluate('document.body');
const html = await frame.evaluate(([body, suffix]) =>
  body.innerHTML + suffix, [bodyHandle, 'hello'],
);
await bodyHandle.dispose();
```

```java
ElementHandle bodyHandle = frame.evaluate("document.body");
String html = (String) frame.evaluate("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(bodyHandle, "hello"));
bodyHandle.dispose();
```

```python async
body_handle = await frame.evaluate("document.body")
html = await frame.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
await body_handle.dispose()
```

```python sync
body_handle = frame.evaluate("document.body")
html = frame.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
body_handle.dispose()
```

```csharp
var bodyHandle = await frame.EvaluateAsync("document.body");
var html = await frame.EvaluateAsync<string>("([body, suffix]) => body.innerHTML + suffix", new object [] { bodyHandle, "hello" });
await bodyHandle.DisposeAsync();
```

### param: Frame.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Frame.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the return value of [`param: expression`] as a [JSHandle].

The only difference between [`method: Frame.evaluate`] and [`method: Frame.evaluateHandle`] is that
[`method: Frame.evaluateHandle`] returns [JSHandle].

If the function, passed to the [`method: Frame.evaluateHandle`], returns a [Promise], then
[`method: Frame.evaluateHandle`] would wait for the promise to resolve and return its value.

**Usage**

```js
// Handle for the window object
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
```

```java
// Handle for the window object.
JSHandle aWindowHandle = frame.evaluateHandle("() => Promise.resolve(window)");
```

```python async
a_window_handle = await frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```python sync
a_window_handle = frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```csharp
// Handle for the window object.
var aWindowHandle = await frame.EvaluateHandleAsync("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function.

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

```java
JSHandle aHandle = frame.evaluateHandle("document"); // Handle for the "document".
```

```python async
a_handle = await page.evaluate_handle("document") # handle for the "document"
```

```python sync
a_handle = page.evaluate_handle("document") # handle for the "document"
```

```csharp
var docHandle = await frame.EvaluateHandleAsync("document"); // Handle for the `document`
```

[JSHandle] instances can be passed as an argument to the [`method: Frame.evaluateHandle`]:

```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(([body, suffix]) =>
  body.innerHTML + suffix, [aHandle, 'hello'],
);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

```java
JSHandle aHandle = frame.evaluateHandle("() => document.body");
JSHandle resultHandle = frame.evaluateHandle("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(aHandle, "hello"));
System.out.println(resultHandle.jsonValue());
resultHandle.dispose();
```

```python async
a_handle = await page.evaluate_handle("document.body")
result_handle = await page.evaluate_handle("body => body.innerHTML", a_handle)
print(await result_handle.json_value())
await result_handle.dispose()
```

```python sync
a_handle = page.evaluate_handle("document.body")
result_handle = page.evaluate_handle("body => body.innerHTML", a_handle)
print(result_handle.json_value())
result_handle.dispose()
```

```csharp
var handle = await frame.EvaluateHandleAsync("() => document.body");
var resultHandle = await frame.EvaluateHandleAsync("([body, suffix]) => body.innerHTML + suffix", new object[] { handle, "hello" });
Console.WriteLine(await resultHandle.JsonValueAsync<string>());
await resultHandle.DisposeAsync();
```

### param: Frame.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Frame.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about [locators](../locators.md).

This method waits for an element matching [`param: selector`], waits for [actionability](../actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Frame.fill.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.fill.value
* since: v1.8
- `value` <[string]>

Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.

### option: Frame.fill.force = %%-input-force-%%
* since: v1.13

### option: Frame.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.fill.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about [locators](../locators.md).

This method fetches an element with [`param: selector`] and focuses it. If there's no element matching
[`param: selector`], the method waits until a matching element appears in the DOM.

### param: Frame.focus.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.focus.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.focus.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.focus.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.frameElement
* since: v1.8
- returns: <[ElementHandle]>

Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [`method: ElementHandle.contentFrame`]. Note that returned handle actually belongs to the parent
frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

**Usage**

```js
const frameElement = await frame.frameElement();
const contentFrame = await frameElement.contentFrame();
console.log(frame === contentFrame);  // -> true
```

```java
ElementHandle frameElement = frame.frameElement();
Frame contentFrame = frameElement.contentFrame();
System.out.println(frame == contentFrame);  // -> true
```

```python async
frame_element = await frame.frame_element()
content_frame = await frame_element.content_frame()
assert frame == content_frame
```

```python sync
frame_element = frame.frame_element()
content_frame = frame_element.content_frame()
assert frame == content_frame
```

```csharp
var frameElement = await frame.FrameElementAsync();
var contentFrame = await frameElement.ContentFrameAsync();
Console.WriteLine(frame == contentFrame); // -> True
```

## method: Frame.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements
in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe id="my-frame">`:

```js
const locator = frame.frameLocator('#my-iframe').getByText('Submit');
await locator.click();
```

```java
Locator locator = frame.frameLocator("#my-iframe").getByText("Submit");
locator.click();
```

```python async
locator = frame.frame_locator("#my-iframe").get_by_text("Submit")
await locator.click()
```

```python sync
locator = frame.frame_locator("#my-iframe").get_by_text("Submit")
locator.click()
```

```csharp
var locator = frame.FrameLocator("#my-iframe").GetByText("Submit");
await locator.ClickAsync();
```

### param: Frame.frameLocator.selector = %%-find-selector-%%
* since: v1.17

## async method: Frame.getAttribute
* since: v1.8
* discouraged: Use locator-based [`method: Locator.getAttribute`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns element attribute value.

### param: Frame.getAttribute.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.getAttribute.name
* since: v1.8
- `name` <[string]>

Attribute name to get the value for.

### option: Frame.getAttribute.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.getAttribute.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.getAttribute.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Frame.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

### param: Frame.getByAltText.text = %%-locator-get-by-text-text-%%

### option: Frame.getByAltText.exact = %%-locator-get-by-text-exact-%%

## method: Frame.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

### param: Frame.getByLabel.text = %%-locator-get-by-text-text-%%

### option: Frame.getByLabel.exact = %%-locator-get-by-text-exact-%%

## method: Frame.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

### param: Frame.getByPlaceholder.text = %%-locator-get-by-text-text-%%

### option: Frame.getByPlaceholder.exact = %%-locator-get-by-text-exact-%%

## method: Frame.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: Frame.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: Frame.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

### option: Frame.getByRole.exact = %%-locator-get-by-role-option-exact-%%

## method: Frame.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: Frame.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: Frame.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

### param: Frame.getByText.text = %%-locator-get-by-text-text-%%

### option: Frame.getByText.exact = %%-locator-get-by-text-exact-%%

## method: Frame.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

### param: Frame.getByTitle.text = %%-locator-get-by-text-text-%%

### option: Frame.getByTitle.exact = %%-locator-get-by-text-exact-%%

## async method: Frame.goto
* since: v1.8
* langs:
  - alias-java: navigate
- returns: <[null]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect.

The method will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the [`option: timeout`] is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404
"Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling
[`method: Response.status`].

:::note
The method either throws an error or returns a main resource response. The only exceptions are navigation to
`about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
:::

:::note
Headless mode doesn't support navigation to a PDF document. See the
[upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
:::

### param: Frame.goto.url
* since: v1.8
- `url` <[string]>

URL to navigate frame to. The url should include scheme, e.g. `https://`.

### option: Frame.goto.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Frame.goto.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.goto.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Frame.goto.referer
* since: v1.8
- `referer` <[string]>

Referer header value. If provided it will take preference over the referer header value set by
[`method: Page.setExtraHTTPHeaders`].

## async method: Frame.hover
* since: v1.8
* discouraged: Use locator-based [`method: Locator.hover`] instead. Read more about [locators](../locators.md).

This method hovers over an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Frame.hover.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.hover.position = %%-input-position-%%
* since: v1.8

### option: Frame.hover.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Frame.hover.force = %%-input-force-%%
* since: v1.8

### option: Frame.hover.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.hover.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.hover.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.hover.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

### option: Frame.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: Frame.innerHTML
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerHTML`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `element.innerHTML`.

### param: Frame.innerHTML.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.innerHTML.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.innerHTML.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.innerHTML.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.innerText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerText`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `element.innerText`.

### param: Frame.innerText.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.innerText.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.innerText.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.innerText.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.inputValue
* since: v1.13
* discouraged: Use locator-based [`method: Locator.inputValue`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

### param: Frame.inputValue.selector = %%-input-selector-%%
* since: v1.13

### option: Frame.inputValue.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.inputValue.timeout = %%-input-timeout-%%
* since: v1.13

### option: Frame.inputValue.timeout = %%-input-timeout-js-%%
* since: v1.13

## async method: Frame.isChecked
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isChecked`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

### param: Frame.isChecked.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isChecked.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isChecked.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.isChecked.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Frame.isDetached
* since: v1.8
- returns: <[boolean]>

Returns `true` if the frame has been detached, or `false` otherwise.

## async method: Frame.isDisabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isDisabled`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of [enabled](../actionability.md#enabled).

### param: Frame.isDisabled.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isDisabled.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isDisabled.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.isDisabled.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.isEditable
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEditable`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [editable](../actionability.md#editable).

### param: Frame.isEditable.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isEditable.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isEditable.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.isEditable.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.isEnabled
* since: v1.8
- returns: <[boolean]>

Returns whether the element is [enabled](../actionability.md#enabled).

### param: Frame.isEnabled.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isEnabled.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isEnabled.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.isEnabled.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.isHidden
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isHidden`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of [visible](../actionability.md#visible).  [`param: selector`] that does not match any elements is considered hidden.

### param: Frame.isHidden.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isHidden.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isHidden.timeout
* since: v1.8
* deprecated: This option is ignored. [`method: Frame.isHidden`] does not wait for the element to become hidden and returns immediately.
- `timeout` <[float]>

## async method: Frame.isVisible
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isVisible`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [visible](../actionability.md#visible). [`param: selector`] that does not match any elements is considered not visible.

### param: Frame.isVisible.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.isVisible.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.isVisible.timeout
* since: v1.8
* deprecated: This option is ignored. [`method: Frame.isVisible`] does not wait for the element to become visible and returns immediately.
- `timeout` <[float]>

## method: Frame.locator
* since: v1.14
- returns: <[Locator]>

%%-template-locator-root-locator-%%

[Learn more about locators](../locators.md).

### param: Frame.locator.selector = %%-find-selector-%%
* since: v1.14

### option: Frame.locator.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.14

### option: Frame.locator.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Frame.locator.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

## method: Frame.name
* since: v1.8
- returns: <[string]>

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

:::note
This value is calculated once when the frame is created, and will not update if the attribute is changed later.
:::

## method: Frame.page
* since: v1.8
- returns: <[Page]>

Returns the page containing this frame.

## method: Frame.parentFrame
* since: v1.8
- returns: <[null]|[Frame]>

Parent frame, if any. Detached frames and main frames return `null`.

## async method: Frame.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about [locators](../locators.md).

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

### param: Frame.press.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Frame.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Frame.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Frame.press.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Frame.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

Returns the ElementHandle pointing to the frame element.

:::caution
The use of [ElementHandle] is discouraged, use [Locator] objects and web-first assertions instead.
:::

The method finds an element matching the specified selector within the frame. If no elements match the selector,
returns `null`.

### param: Frame.querySelector.selector = %%-query-selector-%%
* since: v1.9

### option: Frame.querySelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Frame.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Frame.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

Returns the ElementHandles pointing to the frame elements.

:::caution
The use of [ElementHandle] is discouraged, use [Locator] objects instead.
:::

The method finds all elements matching the specified selector within the frame. If no elements match the selector,
returns empty array.

### param: Frame.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9

## async method: Frame.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about [locators](../locators.md).
- returns: <[Array]<[string]>>

This method waits for an element matching [`param: selector`], waits for [actionability](../actionability.md) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
frame.selectOption('select#colors', 'blue');

// single selection matching both the value and the label
frame.selectOption('select#colors', { label: 'Blue' });

// multiple selection
frame.selectOption('select#colors', 'red', 'green', 'blue');
```

```java
// Single selection matching the value or label
frame.selectOption("select#colors", "blue");
// single selection matching both the value and the label
frame.selectOption("select#colors", new SelectOption().setLabel("Blue"));
// multiple selection
frame.selectOption("select#colors", new String[] {"red", "green", "blue"});
```

```python async
# Single selection matching the value or label
await frame.select_option("select#colors", "blue")
# single selection matching the label
await frame.select_option("select#colors", label="blue")
# multiple selection
await frame.select_option("select#colors", value=["red", "green", "blue"])
```

```python sync
# Single selection matching the value or label
frame.select_option("select#colors", "blue")
# single selection matching both the label
frame.select_option("select#colors", label="blue")
# multiple selection
frame.select_option("select#colors", value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await frame.SelectOptionAsync("select#colors", new[] { "blue" });
// single selection matching both the value and the label
await frame.SelectOptionAsync("select#colors", new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await frame.SelectOptionAsync("select#colors", new[] { "red", "green", "blue" });
```

### param: Frame.selectOption.selector = %%-query-selector-%%
* since: v1.8

### param: Frame.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: Frame.selectOption.force = %%-input-force-%%
* since: v1.13

### option: Frame.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.selectOption.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### param: Frame.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### param: Frame.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: Frame.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### param: Frame.selectOption.label = %%-python-select-options-label-%%
* since: v1.8

## async method: Frame.setChecked
* since: v1.15
* discouraged: Use locator-based [`method: Locator.setChecked`] instead. Read more about [locators](../locators.md).

This method checks or unchecks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Frame.setChecked.selector = %%-input-selector-%%
* since: v1.15

### param: Frame.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Frame.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Frame.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Frame.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Frame.setChecked.strict = %%-input-strict-%%
* since: v1.15

### option: Frame.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Frame.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Frame.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: Frame.setContent
* since: v1.8

This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write), inheriting all its specific characteristics and behaviors.

### param: Frame.setContent.html
* since: v1.8
- `html` <[string]>

HTML markup to assign to the page.

### option: Frame.setContent.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.setContent.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Frame.setContent.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

## async method: Frame.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about [locators](../locators.md).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [`param: selector`] to point to an
[input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

### param: Frame.setInputFiles.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: Frame.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.setInputFiles.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.tap
* since: v1.8
* discouraged: Use locator-based [`method: Locator.tap`] instead. Read more about [locators](../locators.md).

This method taps an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### param: Frame.tap.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.tap.force = %%-input-force-%%
* since: v1.8

### option: Frame.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Frame.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.tap.position = %%-input-position-%%
* since: v1.8

### option: Frame.tap.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Frame.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns `element.textContent`.

### param: Frame.textContent.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.textContent.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.textContent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.textContent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.title
* since: v1.8
- returns: <[string]>

Returns the page title.

## async method: Frame.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to
send fine-grained keyboard events. To fill values in form fields, use [`method: Frame.fill`].

To press a special key, like `Control` or `ArrowDown`, use [`method: Keyboard.press`].

**Usage**

### param: Frame.type.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: Frame.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

### option: Frame.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.type.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about [locators](../locators.md).

This method checks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Frame.uncheck.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.uncheck.force = %%-input-force-%%
* since: v1.8

### option: Frame.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.uncheck.position = %%-input-position-%%
* since: v1.11

### option: Frame.uncheck.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.uncheck.trial = %%-input-trial-%%
* since: v1.11

## method: Frame.url
* since: v1.8
- returns: <[string]>

Returns frame's url.

## async method: Frame.waitForFunction
* since: v1.8
- returns: <[JSHandle]>

Returns when the [`param: expression`] returns a truthy value, returns that value.

**Usage**

The [`method: Frame.waitForFunction`] can be used to observe viewport size change:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
  await page.setViewportSize({ width: 50, height: 50 });
  await watchDog;
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType firefox = playwright.firefox();
      Browser browser = firefox.launch();
      Page page = browser.newPage();
      page.setViewportSize(50, 50);
      page.mainFrame().waitForFunction("window.innerWidth < 100");
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch()
    page = await browser.new_page()
    await page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    await page.main_frame.wait_for_function("() => window.x > 0")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()
    page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    page.main_frame.wait_for_function("() => window.x > 0")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Firefox.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.SetViewportSizeAsync(50, 50);
        await page.MainFrame.WaitForFunctionAsync("window.innerWidth < 100");
    }
}
```

To pass an argument to the predicate of `frame.waitForFunction` function:

```js
const selector = '.foo';
await frame.waitForFunction(selector => !!document.querySelector(selector), selector);
```

```java
String selector = ".foo";
frame.waitForFunction("selector => !!document.querySelector(selector)", selector);
```

```python async
selector = ".foo"
await frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```python sync
selector = ".foo"
frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```csharp
var selector = ".foo";
await page.MainFrame.WaitForFunctionAsync("selector => !!document.querySelector(selector)", selector);
```

### param: Frame.waitForFunction.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.waitForFunction.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.waitForFunction.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.waitForFunction.polling = %%-js-python-wait-for-function-polling-%%
* since: v1.8

### option: Frame.waitForFunction.polling = %%-csharp-java-wait-for-function-polling-%%
* since: v1.8

### option: Frame.waitForFunction.timeout = %%-wait-for-function-timeout-%%
* since: v1.8

### option: Frame.waitForFunction.timeout = %%-wait-for-function-timeout-js-%%
* since: v1.8

## async method: Frame.waitForLoadState
* since: v1.8

Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed
when this method is called. If current document has already reached the required state, resolves immediately.

:::note
Most of the time, this method is not needed because Playwright [auto-waits before every action](../actionability.md).
:::

**Usage**

```js
await frame.click('button'); // Click triggers navigation.
await frame.waitForLoadState(); // Waits for 'load' state by default.
```

```java
frame.click("button"); // Click triggers navigation.
frame.waitForLoadState(); // Waits for "load" state by default.
```

```python async
await frame.click("button") # click triggers navigation.
await frame.wait_for_load_state() # the promise resolves after "load" event.
```

```python sync
frame.click("button") # click triggers navigation.
frame.wait_for_load_state() # the promise resolves after "load" event.
```

```csharp
await frame.ClickAsync("button");
await frame.WaitForLoadStateAsync(); // Defaults to LoadState.Load
```

### param: Frame.waitForLoadState.state = %%-wait-for-load-state-state-%%
* since: v1.8

### option: Frame.waitForLoadState.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.waitForLoadState.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Frame.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Frame.waitForURL`] instead.
* langs:
  * alias-python: expect_navigation
  * alias-csharp: RunAndWaitForNavigation
- returns: <[null]|[Response]>

Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation
will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to
History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause
the frame to navigate. Consider this example:

```js
// Start waiting for navigation before clicking. Note no await.
const navigationPromise = page.waitForNavigation();
await page.getByText('Navigate after timeout').click();
await navigationPromise;
```

```java
// The method returns after navigation has finished
frame.waitForNavigation(() -> {
  // Clicking the link will indirectly cause a navigation
  frame.click("a.delayed-navigation");
});
```

```python async
async with frame.expect_navigation():
    await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

```python sync
with frame.expect_navigation():
    frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

```csharp
await frame.RunAndWaitForNavigationAsync(async () =>
{
    // Clicking the link will indirectly cause a navigation.
    await frame.ClickAsync("a.delayed-navigation");
});

// Resolves after navigation has finished
```

:::note
Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered
a navigation.
:::

## async method: Frame.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Frame.waitForURL`] instead.
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Frame.waitForNavigation.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Frame.waitForNavigation.url = %%-wait-for-navigation-url-%%
* since: v1.8

### option: Frame.waitForNavigation.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Frame.waitForNavigation.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.waitForNavigation.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### param: Frame.waitForNavigation.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Frame.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
  Read more about [locators](../locators.md).
- returns: <[null]|[ElementHandle]>

Returns when element specified by selector satisfies [`option: state`] option. Returns `null` if waiting for `hidden` or
`detached`.

:::note
Playwright automatically waits for element to be ready before performing an action. Using
[Locator] objects and web-first assertions make the code wait-for-selector-free.
:::

Wait for the [`param: selector`] to satisfy [`option: state`] option (either appear/disappear from dom, or become
visible/hidden). If at the moment of calling the method [`param: selector`] already satisfies the condition, the method
will return immediately. If the selector doesn't satisfy the condition for the [`option: timeout`] milliseconds, the
function will throw.

**Usage**

This method works across navigations:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const currentURL of ['https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
    const element = await page.mainFrame().waitForSelector('img');
    console.log('Loaded image: ' + await element.getAttribute('src'));
  }
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      for (String currentURL : Arrays.asList("https://google.com", "https://bbc.com")) {
        page.navigate(currentURL);
        ElementHandle element = page.mainFrame().waitForSelector("img");
        System.out.println("Loaded image: " + element.getAttribute("src"));
      }
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        await page.goto(current_url, wait_until="domcontentloaded")
        element = await page.main_frame.wait_for_selector("img")
        print("Loaded image: " + str(await element.get_attribute("src")))
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        page.goto(current_url, wait_until="domcontentloaded")
        element = page.main_frame.wait_for_selector("img")
        print("Loaded image: " + str(element.get_attribute("src")))
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync();
        var page = await browser.NewPageAsync();

        foreach (var currentUrl in new[] { "https://www.google.com", "https://bbc.com" })
        {
            await page.GotoAsync(currentUrl);
            element = await page.MainFrame.WaitForSelectorAsync("img");
            Console.WriteLine($"Loaded image: {await element.GetAttributeAsync("src")}");
        }
    }
}
```

### param: Frame.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: Frame.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: Frame.waitForSelector.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.waitForTimeout
* since: v1.8
* discouraged: Never wait for timeout in production. Tests that wait for time are
  inherently flaky. Use [Locator] actions and web assertions that wait automatically.

Waits for the given [`param: timeout`] in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to
be flaky. Use signals such as network events, selectors becoming visible and others instead.

### param: Frame.waitForTimeout.timeout
* since: v1.8
- `timeout` <[float]>

A timeout to wait for

## async method: Frame.waitForURL
* since: v1.11

Waits for the frame to navigate to the given URL.

**Usage**

```js
await frame.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation
await frame.waitForURL('**/target.html');
```

```java
frame.click("a.delayed-navigation"); // Clicking the link will indirectly cause a navigation
frame.waitForURL("**/target.html");
```

```python async
await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
await frame.wait_for_url("**/target.html")
```

```python sync
frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
frame.wait_for_url("**/target.html")
```

```csharp
await frame.ClickAsync("a.delayed-navigation"); // clicking the link will indirectly cause a navigation
await frame.WaitForURLAsync("**/target.html");
```

### param: Frame.waitForURL.url = %%-wait-for-navigation-url-%%
* since: v1.11

### option: Frame.waitForURL.timeout = %%-navigation-timeout-%%
* since: v1.11

### option: Frame.waitForURL.timeout = %%-navigation-timeout-js-%%
* since: v1.11

### option: Frame.waitForURL.waitUntil = %%-navigation-wait-until-%%
* since: v1.11
# class: Selectors
* since: v1.8

Selectors can be used to install custom selector engines. See [extensibility](../extensibility.md) for more
information.

## async method: Selectors.register
* since: v1.8

Selectors must be registered before creating the page.

**Usage**

An example of registering selector engine that queries elements based on a tag name:

```js
const { selectors, firefox } = require('@playwright/test');  // Or 'chromium' or 'webkit'.

(async () => {
  // Must be a function that evaluates to a selector engine instance.
  const createTagNameEngine = () => ({
    // Returns the first element matching given selector in the root's subtree.
    query(root, selector) {
      return root.querySelector(selector);
    },

    // Returns all elements matching given selector in the root's subtree.
    queryAll(root, selector) {
      return Array.from(root.querySelectorAll(selector));
    }
  });

  // Register the engine. Selectors will be prefixed with "tag=".
  await selectors.register('tag', createTagNameEngine);

  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.setContent(`<div><button>Click me</button></div>`);

  // Use the selector prefixed with its name.
  const button = page.locator('tag=button');
  // We can combine it with built-in locators.
  await page.locator('tag=div').getByText('Click me').click();
  // Can use it in any methods supporting selectors.
  const buttonCount = await page.locator('tag=button').count();

  await browser.close();
})();
```

```java
// Script that evaluates to a selector engine instance. The script is evaluated in the page context.
String createTagNameEngine = "{\n" +
  "  // Returns the first element matching given selector in the root's subtree.\n" +
  "  query(root, selector) {\n" +
  "    return root.querySelector(selector);\n" +
  "  },\n" +
  "  // Returns all elements matching given selector in the root's subtree.\n" +
  "  queryAll(root, selector) {\n" +
  "    return Array.from(root.querySelectorAll(selector));\n" +
  "  }\n" +
  "}";
// Register the engine. Selectors will be prefixed with "tag=".
playwright.selectors().register("tag", createTagNameEngine);
Browser browser = playwright.firefox().launch();
Page page = browser.newPage();
page.setContent("<div><button>Click me</button></div>");
// Use the selector prefixed with its name.
Locator button = page.locator("tag=button");
// Combine it with built-in locators.
page.locator("tag=div").getByText("Click me").click();
// Can use it in any methods supporting selectors.
int buttonCount = (int) page.locator("tag=button").count();
browser.close();
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    tag_selector = """
      {
          // Returns the first element matching given selector in the root's subtree.
          query(root, selector) {
              return root.querySelector(selector);
          },
          // Returns all elements matching given selector in the root's subtree.
          queryAll(root, selector) {
              return Array.from(root.querySelectorAll(selector));
          }
      }"""

    # Register the engine. Selectors will be prefixed with "tag=".
    await playwright.selectors.register("tag", tag_selector)
    browser = await playwright.chromium.launch()
    page = await browser.new_page()
    await page.set_content('<div><button>Click me</button></div>')

    # Use the selector prefixed with its name.
    button = await page.query_selector('tag=button')
    # Combine it with built-in locators.
    await page.locator('tag=div').get_by_text('Click me').click()
    # Can use it in any methods supporting selectors.
    button_count = await page.locator('tag=button').count()
    print(button_count)
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    tag_selector = """
      {
          // Returns the first element matching given selector in the root's subtree.
          query(root, selector) {
              return root.querySelector(selector);
          },
          // Returns all elements matching given selector in the root's subtree.
          queryAll(root, selector) {
              return Array.from(root.querySelectorAll(selector));
          }
      }"""

    # Register the engine. Selectors will be prefixed with "tag=".
    playwright.selectors.register("tag", tag_selector)
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_content('<div><button>Click me</button></div>')

    # Use the selector prefixed with its name.
    button = page.locator('tag=button')
    # Combine it with built-in locators.
    page.locator('tag=div').get_by_text('Click me').click()
    # Can use it in any methods supporting selectors.
    button_count = page.locator('tag=button').count()
    print(button_count)
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
// Script that evaluates to a selector engine instance. The script is evaluated in the page context.
await playwright.Selectors.RegisterAsync("tag", new()
{
    Script = @"{
    // Returns the first element matching given selector in the root's subtree.
    query(root, selector) {
        return root.querySelector(selector);
      },
      // Returns all elements matching given selector in the root's subtree.
      queryAll(root, selector) {
        return Array.from(root.querySelectorAll(selector));
      }
    }"
});

await using var browser = await playwright.Chromium.LaunchAsync();
var page = await browser.NewPageAsync();
await page.SetContentAsync("<div><button>Click me</button></div>");
// Use the selector prefixed with its name.
var button = page.Locator("tag=button");
// Combine it with built-in locators.
await page.Locator("tag=div").GetByText("Click me").ClickAsync();
// Can use it in any methods supporting selectors.
int buttonCount = await page.Locator("tag=button").CountAsync();
```

### param: Selectors.register.name
* since: v1.8
- `name` <[string]>

Name that is used in selectors as a prefix, e.g. `{name: 'foo'}` enables `foo=myselectorbody` selectors. May only
contain `[a-zA-Z0-9_]` characters.

### param: Selectors.register.script
* since: v1.8
* langs: js
- `script` <[function]|[string]|[Object]>
  - `path` ?<[path]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the
    current working directory. Optional.
  - `content` ?<[string]> Raw script content. Optional.

Script that evaluates to a selector engine instance. The script is evaluated in the page context.

### param: Selectors.register.script
* since: v1.8
* langs: java
- `script` <[string]|[path]>

Script that evaluates to a selector engine instance. The script is evaluated in the page context.

### param: Selectors.register.script
* since: v1.8
* langs: python
- `script` ?<[string]>

Raw script content.

### option: Selectors.register.script
* since: v1.8
* langs: csharp
- `script` <[string]>

Script that evaluates to a selector engine instance. The script is evaluated in the page context.

### option: Selectors.register.path
* since: v1.8
* langs: python
- `path` <[path]>

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory.

### option: Selectors.register.path
* since: v1.8
* langs: csharp
- `path` <[path]>

Script that evaluates to a selector engine instance. The script is evaluated in the page context.

### option: Selectors.register.contentScript
* since: v1.8
- `contentScript` <[boolean]>

Whether to run this selector engine in isolated JavaScript environment. This environment has access to the same DOM, but
not any JavaScript objects from the frame's scripts. Defaults to `false`. Note that running as a content script is not
guaranteed when this engine is used together with other registered engines.

## method: Selectors.setTestIdAttribute
* since: v1.27

Defines custom attribute name to be used in [`method: Page.getByTestId`]. `data-testid` is used by default.

### param: Selectors.setTestIdAttribute.attributeName
* since: v1.27
- `attributeName` <[string]>

Test id attribute name.
# class: Locator
* since: v1.14

Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent
a way to find element(s) on the page at any moment. A locator can be created with the [`method: Page.locator`] method.

[Learn more about locators](../locators.md).

## async method: Locator.all
* since: v1.29
- returns: <[Array]<[Locator]>>

When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.

:::note
[`method: Locator.all`] does not wait for elements to match the locator, and instead immediately returns whatever is present in the page.

When the list of elements changes dynamically, [`method: Locator.all`] will produce unpredictable and flaky results.

When the list of elements is stable, but loaded dynamically, wait for the full list to finish loading before calling [`method: Locator.all`].
:::

**Usage**

```js
for (const li of await page.getByRole('listitem').all())
  await li.click();
```

```python async
for li in await page.get_by_role('listitem').all():
  await li.click();
```

```python sync
for li in page.get_by_role('listitem').all():
  li.click();
```

```java
for (Locator li : page.getByRole("listitem").all())
  li.click();
```

```csharp
foreach (var li in await page.GetByRole("listitem").AllAsync())
  await li.ClickAsync();
```

## async method: Locator.allInnerTexts
* since: v1.14
- returns: <[Array]<[string]>>

Returns an array of `node.innerText` values for all matching nodes.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] with [`option: LocatorAssertions.toHaveText.useInnerText`] option to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const texts = await page.getByRole('link').allInnerTexts();
```

```python async
texts = await page.get_by_role("link").all_inner_texts()
```

```python sync
texts = page.get_by_role("link").all_inner_texts()
```

```java
String[] texts = page.getByRole(AriaRole.LINK).allInnerTexts();
```

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllInnerTextsAsync();
```

## async method: Locator.allTextContents
* since: v1.14
- returns: <[Array]<[string]>>

Returns an array of `node.textContent` values for all matching nodes.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const texts = await page.getByRole('link').allTextContents();
```

```python async
texts = await page.get_by_role("link").all_text_contents()
```

```python sync
texts = page.get_by_role("link").all_text_contents()
```

```java
String[] texts = page.getByRole(AriaRole.LINK).allTextContents();
```

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllTextContentsAsync();
```


## method: Locator.and
* since: v1.34
* langs:
  - alias-python: and_
- returns: <[Locator]>

Creates a locator that matches both this locator and the argument locator.

**Usage**

The following example finds a button with a specific title.

```js
const button = page.getByRole('button').and(page.getByTitle('Subscribe'));
```

```java
Locator button = page.getByRole(AriaRole.BUTTON).and(page.getByTitle("Subscribe"));
```

```python async
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

```python sync
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

```csharp
var button = page.GetByRole(AriaRole.Button).And(page.GetByTitle("Subscribe"));
```

### param: Locator.and.locator
* since: v1.34
- `locator` <[Locator]>

Additional locator to match.

## async method: Locator.ariaSnapshot
* since: v1.49
- returns: <[string]>

Captures the aria snapshot of the given element.
Read more about [aria snapshots](../aria-snapshots.md) and [`method: LocatorAssertions.toMatchAriaSnapshot`] for the corresponding assertion.

**Usage**

```js
await page.getByRole('link').ariaSnapshot();
```

```java
page.getByRole(AriaRole.LINK).ariaSnapshot();
```

```python async
await page.get_by_role("link").aria_snapshot()
```

```python sync
page.get_by_role("link").aria_snapshot()
```

```csharp
await page.GetByRole(AriaRole.Link).AriaSnapshotAsync();
```

**Details**

This method captures the aria snapshot of the given element. The snapshot is a string that represents the state of the element and its children.
The snapshot can be used to assert the state of the element in the test, or to compare it to state in the future.

The ARIA snapshot is represented using [YAML](https://yaml.org/spec/1.2.2/) markup language:
* The keys of the objects are the roles and optional accessible names of the elements.
* The values are either text content or an array of child elements.
* Generic static text can be represented with the `text` key.

Below is the HTML markup and the respective ARIA snapshot:

```html
<ul aria-label="Links">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
<ul>
```

```yml
- list "Links":
  - listitem:
    - link "Home"
  - listitem:
    - link "About"
```

### option: Locator.ariaSnapshot.timeout = %%-input-timeout-%%
* since: v1.49

### option: Locator.ariaSnapshot.timeout = %%-input-timeout-js-%%
* since: v1.49

## async method: Locator.blur
* since: v1.28

Calls [blur](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur) on the element.

### option: Locator.blur.timeout = %%-input-timeout-%%
* since: v1.28

### option: Locator.blur.timeout = %%-input-timeout-js-%%
* since: v1.28

## async method: Locator.boundingBox
* since: v1.14
- returns: <[null]|[Object]>
  - `x` <[float]> the x coordinate of the element in pixels.
  - `y` <[float]> the y coordinate of the element in pixels.
  - `width` <[float]> the width of the element in pixels.
  - `height` <[float]> the height of the element in pixels.

This method returns the bounding box of the element matching the locator, or `null` if the element is not visible. The bounding box is
calculated relative to the main frame viewport - which is usually the same as the browser window.

**Details**

Scrolling affects the returned bounding box, similarly to
[Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). That
means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the
[Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following
snippet should click the center of the element.

**Usage**

```js
const box = await page.getByRole('button').boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
```

```java
BoundingBox box = page.getByRole(AriaRole.BUTTON).boundingBox();
page.mouse().click(box.x + box.width / 2, box.y + box.height / 2);
```

```python async
box = await page.get_by_role("button").bounding_box()
await page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```python sync
box = page.get_by_role("button").bounding_box()
page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```csharp
var box = await page.GetByRole(AriaRole.Button).BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

### option: Locator.boundingBox.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.boundingBox.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.check
* since: v1.14

Ensure that checkbox or radio element is checked.

**Details**

Performs the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

**Usage**

```js
await page.getByRole('checkbox').check();
```

```java
page.getByRole(AriaRole.CHECKBOX).check();
```

```python async
await page.get_by_role("checkbox").check()
```

```python sync
page.get_by_role("checkbox").check()
```

```csharp
await page.GetByRole(AriaRole.Checkbox).CheckAsync();
```

### option: Locator.check.position = %%-input-position-%%
* since: v1.14

### option: Locator.check.force = %%-input-force-%%
* since: v1.14

### option: Locator.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.check.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.check.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.check.trial = %%-input-trial-%%
* since: v1.14

## async method: Locator.clear
* since: v1.28

Clear the input field.

**Details**

This method waits for [actionability](../actionability.md) checks, focuses the element, clears it and triggers an `input` event after clearing.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be cleared instead.


**Usage**

```js
await page.getByRole('textbox').clear();
```

```java
page.getByRole(AriaRole.TEXTBOX).clear();
```

```python async
await page.get_by_role("textbox").clear()
```

```python sync
page.get_by_role("textbox").clear()
```

```csharp
await page.GetByRole(AriaRole.Textbox).ClearAsync();
```


### option: Locator.clear.force = %%-input-force-%%
* since: v1.28

### option: Locator.clear.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

### option: Locator.clear.timeout = %%-input-timeout-%%
* since: v1.28

### option: Locator.clear.timeout = %%-input-timeout-js-%%
* since: v1.28

## async method: Locator.click
* since: v1.14

Click an element.

**Details**

This method clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.


**Usage**

Click a button:

```js
await page.getByRole('button').click();
```

```java
page.getByRole(AriaRole.BUTTON).click();
```

```python async
await page.get_by_role("button").click()
```

```python sync
page.get_by_role("button").click()
```

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync();
```

Shift-right-click at a specific position on a canvas:

```js
await page.locator('canvas').click({
  button: 'right',
  modifiers: ['Shift'],
  position: { x: 23, y: 32 },
});
```

```java
page.locator("canvas").click(new Locator.ClickOptions()
  .setButton(MouseButton.RIGHT)
  .setModifiers(Arrays.asList(KeyboardModifier.SHIFT))
  .setPosition(23, 32));
```

```python async
await page.locator("canvas").click(
    button="right", modifiers=["Shift"], position={"x": 23, "y": 32}
)
```

```python sync
page.locator("canvas").click(
    button="right", modifiers=["Shift"], position={"x": 23, "y": 32}
)
```

```csharp
await page.Locator("canvas").ClickAsync(new() {
  Button = MouseButton.Right,
  Modifiers = new[] { KeyboardModifier.Shift },
  Position = new Position { X = 0, Y = 0 }
});
```


### option: Locator.click.button = %%-input-button-%%
* since: v1.14

### option: Locator.click.clickCount = %%-input-click-count-%%
* since: v1.14

### option: Locator.click.delay = %%-input-down-up-delay-%%
* since: v1.14

### option: Locator.click.position = %%-input-position-%%
* since: v1.14

### option: Locator.click.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.click.force = %%-input-force-%%
* since: v1.14

### option: Locator.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.14

### option: Locator.click.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.click.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.click.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.click.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: Locator.count
* since: v1.14
- returns: <[int]>

Returns the number of elements matching the locator.

:::warning[Asserting count]
If you need to assert the number of elements on the page, prefer [`method: LocatorAssertions.toHaveCount`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const count = await page.getByRole('listitem').count();
```

```python async
count = await page.get_by_role("listitem").count()
```

```python sync
count = page.get_by_role("listitem").count()
```

```java
int count = page.getByRole(AriaRole.LISTITEM).count();
```

```csharp
int count = await page.GetByRole(AriaRole.Listitem).CountAsync();
```


## async method: Locator.dblclick
* since: v1.14
* langs:
  - alias-csharp: DblClickAsync

Double-click an element.

**Details**

This method double clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`element.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### option: Locator.dblclick.button = %%-input-button-%%
* since: v1.14

### option: Locator.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.14

### option: Locator.dblclick.position = %%-input-position-%%
* since: v1.14

### option: Locator.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.dblclick.force = %%-input-force-%%
* since: v1.14

### option: Locator.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.dblclick.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.dblclick.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.dblclick.steps = %%-input-mousemove-steps-%%
* since: v1.57

## method: Locator.describe
* since: v1.53
- returns: <[Locator]>

Describes the locator, description is used in the trace viewer and reports.
Returns the locator pointing to the same element.

**Usage**

```js
const button = page.getByTestId('btn-sub').describe('Subscribe button');
await button.click();
```

```java
Locator button = page.getByTestId("btn-sub").describe("Subscribe button");
button.click();
```

```python async
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
await button.click()
```

```python sync
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
button.click()
```

```csharp
var button = Page.GetByTestId("btn-sub").Describe("Subscribe button");
await button.ClickAsync();
```

### param: Locator.describe.description
* since: v1.53
- `description` <[string]>

Locator description.

## method: Locator.description
* since: v1.57
* langs: python, java, csharp
- returns: <[null]|[string]>

Returns locator description previously set with [`method: Locator.describe`]. Returns `null` if no custom description has been set.

**Usage**

```python async
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

```python sync
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

```java
Locator button = page.getByRole(AriaRole.BUTTON).describe("Subscribe button");
System.out.println(button.description()); // "Subscribe button"

Locator input = page.getByRole(AriaRole.TEXTBOX);
System.out.println(input.description()); // null
```

```csharp
var button = Page.GetByRole(AriaRole.Button).Describe("Subscribe button");
Console.WriteLine(button.Description()); // "Subscribe button"

var input = Page.GetByRole(AriaRole.Textbox);
Console.WriteLine(input.Description()); // null
```

## method: Locator.description
* since: v1.57
* langs: js
- returns: <[null]|[string]>

Returns locator description previously set with [`method: Locator.describe`]. Returns `null` if no custom description has been set. Prefer [`method: Locator.toString`] for a human-readable representation, as it uses the description when available.

**Usage**

```js
const button = page.getByRole('button').describe('Subscribe button');
console.log(button.description()); // "Subscribe button"

const input = page.getByRole('textbox');
console.log(input.description()); // null
```

## async method: Locator.dispatchEvent
* since: v1.14

Programmatically dispatch an event on the matching element.

**Usage**

```js
await locator.dispatchEvent('click');
```

```java
locator.dispatchEvent("click");
```

```python async
await locator.dispatch_event("click")
```

```python sync
locator.dispatch_event("click")
```

```csharp
await locator.DispatchEventAsync("click");
```

**Details**

The snippet above dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
[element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

Under the hood, it creates an instance of an event based on the given [`param: type`], initializes it with
[`param: eventInit`] properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by
default.

Since [`param: eventInit`] is event-specific, please refer to the events documentation for the lists of initial
properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify [JSHandle] as the property value if you want live objects to be passed into the event:

```js
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await locator.dispatchEvent('dragstart', { dataTransfer });
```

```java
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
locator.dispatchEvent("dragstart", arg);
```

```python async
data_transfer = await page.evaluate_handle("new DataTransfer()")
await locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```python sync
data_transfer = page.evaluate_handle("new DataTransfer()")
locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await locator.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

### param: Locator.dispatchEvent.type
* since: v1.14
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: Locator.dispatchEvent.eventInit
* since: v1.14
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

### option: Locator.dispatchEvent.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.dispatchEvent.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.dragTo
* since: v1.18

Drag the source element towards the target element and drop it.

**Details**

This method drags the locator to another target locator or target position. It will
first move to the source element, perform a `mousedown`, then move to the target
element or position and perform a `mouseup`.

**Usage**

```js
const source = page.locator('#source');
const target = page.locator('#target');

await source.dragTo(target);
// or specify exact positions relative to the top-left corners of the elements:
await source.dragTo(target, {
  sourcePosition: { x: 34, y: 7 },
  targetPosition: { x: 10, y: 20 },
});
```

```java
Locator source = page.locator("#source");
Locator target = page.locator("#target");

source.dragTo(target);
// or specify exact positions relative to the top-left corners of the elements:
source.dragTo(target, new Locator.DragToOptions()
  .setSourcePosition(34, 7).setTargetPosition(10, 20));
```

```python async
source = page.locator("#source")
target = page.locator("#target")

await source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
await source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```python sync
source = page.locator("#source")
target = page.locator("#target")

source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```csharp
var source = Page.Locator("#source");
var target = Page.Locator("#target");

await source.DragToAsync(target);
// or specify exact positions relative to the top-left corners of the elements:
await source.DragToAsync(target, new()
{
    SourcePosition = new() { X = 34, Y = 7 },
    TargetPosition = new() { X = 10, Y = 20 },
});
```

### param: Locator.dragTo.target
* since: v1.18
- `target` <[Locator]>

Locator of the element to drag to.

### option: Locator.dragTo.force = %%-input-force-%%
* since: v1.18

### option: Locator.dragTo.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.18

### option: Locator.dragTo.timeout = %%-input-timeout-%%
* since: v1.18

### option: Locator.dragTo.timeout = %%-input-timeout-js-%%
* since: v1.18

### option: Locator.dragTo.trial = %%-input-trial-%%
* since: v1.18

### option: Locator.dragTo.sourcePosition = %%-input-source-position-%%
* since: v1.18

### option: Locator.dragTo.targetPosition = %%-input-target-position-%%
* since: v1.18

### option: Locator.dragTo.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Locator.elementHandle
* since: v1.14
* discouraged: Always prefer using [Locator]s and web assertions over [ElementHandle]s because latter are inherently racy.
- returns: <[ElementHandle]>

Resolves given locator to the first matching DOM element. If there are no matching elements, waits for one. If multiple elements match the locator, throws.

### option: Locator.elementHandle.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.elementHandle.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.elementHandles
* since: v1.14
* discouraged: Always prefer using [Locator]s and web assertions over [ElementHandle]s because latter are inherently racy.
- returns: <[Array]<[ElementHandle]>>

Resolves given locator to all matching DOM elements. If there are no matching elements, returns an empty list.

## method: Locator.contentFrame
* since: v1.43
- returns: <[FrameLocator]>

Returns a [FrameLocator] object pointing to the same `iframe` as this locator.

Useful when you have a [Locator] object obtained somewhere, and later on would like to interact with the content inside the frame.

For a reverse operation, use [`method: FrameLocator.owner`].

**Usage**

```js
const locator = page.locator('iframe[name="embedded"]');
// ...
const frameLocator = locator.contentFrame();
await frameLocator.getByRole('button').click();
```

```java
Locator locator = page.locator("iframe[name=\"embedded\"]");
// ...
FrameLocator frameLocator = locator.contentFrame();
frameLocator.getByRole(AriaRole.BUTTON).click();
```

```python async
locator = page.locator("iframe[name=\"embedded\"]")
# ...
frame_locator = locator.content_frame
await frame_locator.get_by_role("button").click()
```

```python sync
locator = page.locator("iframe[name=\"embedded\"]")
# ...
frame_locator = locator.content_frame
frame_locator.get_by_role("button").click()
```

```csharp
var locator = Page.Locator("iframe[name=\"embedded\"]");
// ...
var frameLocator = locator.ContentFrame;
await frameLocator.GetByRole(AriaRole.Button).ClickAsync();
```

## async method: Locator.evaluate
* since: v1.14
- returns: <[Serializable]>

Execute JavaScript code in the page, taking the matching element as an argument.

**Details**

Returns the return value of [`param: expression`], called with the matching element as a first argument, and [`param: arg`] as a second argument.

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

**Usage**

Passing argument to [`param: expression`]:

```js
const result = await page.getByTestId('myId').evaluate((element, [x, y]) => {
  return element.textContent + ' ' + x * y;
}, [7, 8]);
console.log(result); // prints "myId text 56"
```

```java
Object result = page.getByTestId("myId").evaluate("(element, [x, y]) => {\n" +
  "  return element.textContent + ' ' + x * y;\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "myId text 56"
```

```python async
result = await page.get_by_testid("myId").evaluate("(element, [x, y]) => element.textContent + ' ' + x * y", [7, 8])
print(result) # prints "myId text 56"
```

```python sync
result = page.get_by_testid("myId").evaluate("(element, [x, y]) => element.textContent + ' ' + x * y", [7, 8])
print(result) # prints "myId text 56"
```

```csharp
var result = await page.GetByTestId("myId").EvaluateAsync<string>("(element, [x, y]) => element.textContent + ' ' + x * y)", new[] { 7, 8 });
Console.WriteLine(result); // prints "myId text 56"
```

### param: Locator.evaluate.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluate.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.evaluate.timeout
* since: v1.14
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Locator.evaluate.timeout
* since: v1.14
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `0` - no timeout.

## async method: Locator.evaluateAll
* since: v1.14
- returns: <[Serializable]>

Execute JavaScript code in the page, taking all matching elements as an argument.

**Details**

Returns the return value of [`param: expression`], called with an array of all matching elements as a first argument, and [`param: arg`] as a second argument.

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

**Usage**

```js
const locator = page.locator('div');
const moreThanTen = await locator.evaluateAll((divs, min) => divs.length > min, 10);
```

```java
Locator locator = page.locator("div");
boolean moreThanTen = (boolean) locator.evaluateAll("(divs, min) => divs.length > min", 10);
```

```python async
locator = page.locator("div")
more_than_ten = await locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

```python sync
locator = page.locator("div")
more_than_ten = locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

```csharp
var locator = page.Locator("div");
var moreThanTen = await locator.EvaluateAllAsync<bool>("(divs, min) => divs.length > min", 10);
```

### param: Locator.evaluateAll.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluateAll.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluateAll.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Locator.evaluateHandle
* since: v1.14
- returns: <[JSHandle]>

Execute JavaScript code in the page, taking the matching element as an argument, and return a [JSHandle] with the result.

**Details**

Returns the return value of [`param: expression`] as a[JSHandle], called with the matching element as a first argument, and [`param: arg`] as a second argument.

The only difference between [`method: Locator.evaluate`] and [`method: Locator.evaluateHandle`] is that [`method: Locator.evaluateHandle`] returns [JSHandle].

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

See [`method: Page.evaluateHandle`] for more details.

### param: Locator.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluateHandle.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.evaluateHandle.timeout
* since: v1.14
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Locator.evaluateHandle.timeout
* since: v1.14
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `0` - no timeout.

## async method: Locator.fill
* since: v1.14

Set a value to the input field.

**Usage**

```js
await page.getByRole('textbox').fill('example value');
```

```java
page.getByRole(AriaRole.TEXTBOX).fill("example value");
```

```python async
await page.get_by_role("textbox").fill("example value")
```

```python sync
page.get_by_role("textbox").fill("example value")
```

```csharp
await page.GetByRole(AriaRole.Textbox).FillAsync("example value");
```

**Details**

This method waits for [actionability](../actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Locator.fill.value
* since: v1.14
- `value` <[string]>

Value to set for the `<input>`, `<textarea>` or `[contenteditable]` element.

### option: Locator.fill.force = %%-input-force-%%
* since: v1.14

### option: Locator.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.fill.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.fill.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.filter
* since: v1.22
- returns: <[Locator]>

This method narrows existing locator according to the options, for example filters by text.
It can be chained to filter multiple times.

**Usage**

```js
const rowLocator = page.locator('tr');
// ...
await rowLocator
    .filter({ hasText: 'text in column 1' })
    .filter({ has: page.getByRole('button', { name: 'column 2 button' }) })
    .screenshot();
```

```java
Locator rowLocator = page.locator("tr");
// ...
rowLocator
    .filter(new Locator.FilterOptions().setHasText("text in column 1"))
    .filter(new Locator.FilterOptions().setHas(
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("column 2 button"))
    ))
    .screenshot();
```

```python async
row_locator = page.locator("tr")
# ...
await row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()

```

```python sync
row_locator = page.locator("tr")
# ...
row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()
```

```csharp
var rowLocator = page.Locator("tr");
// ...
await rowLocator
    .Filter(new() { HasText = "text in column 1" })
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Button, new() { Name = "column 2 button" } )
    })
    .ScreenshotAsync();
```

### option: Locator.filter.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.22

### option: Locator.filter.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Locator.filter.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

### option: Locator.filter.visible = %%-locator-option-visible-%%
* since: v1.51

## method: Locator.first
* since: v1.14
- returns: <[Locator]>

Returns locator to the first matching element.

## async method: Locator.focus
* since: v1.14

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the matching element.

### option: Locator.focus.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.focus.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow locating elements
in that iframe:

**Usage**

```js
const locator = page.frameLocator('iframe').getByText('Submit');
await locator.click();
```

```java
Locator locator = page.frameLocator("iframe").getByText("Submit");
locator.click();
```

```python async
locator = page.frame_locator("iframe").get_by_text("Submit")
await locator.click()
```

```python sync
locator = page.frame_locator("iframe").get_by_text("Submit")
locator.click()
```

```csharp
var locator = page.FrameLocator("iframe").GetByText("Submit");
await locator.ClickAsync();
```

### param: Locator.frameLocator.selector = %%-find-selector-%%
* since: v1.17

## async method: Locator.getAttribute
* since: v1.14
- returns: <[null]|[string]>

Returns the matching element's attribute value.

:::warning[Asserting attributes]
If you need to assert an element's attribute, prefer [`method: LocatorAssertions.toHaveAttribute`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

### param: Locator.getAttribute.name
* since: v1.14
- `name` <[string]>

Attribute name to get the value for.

### option: Locator.getAttribute.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.getAttribute.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

### param: Locator.getByAltText.text = %%-locator-get-by-text-text-%%

### option: Locator.getByAltText.exact = %%-locator-get-by-text-exact-%%

## method: Locator.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

### param: Locator.getByLabel.text = %%-locator-get-by-text-text-%%

### option: Locator.getByLabel.exact = %%-locator-get-by-text-exact-%%

## method: Locator.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

### param: Locator.getByPlaceholder.text = %%-locator-get-by-text-text-%%

### option: Locator.getByPlaceholder.exact = %%-locator-get-by-text-exact-%%

## method: Locator.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: Locator.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: Locator.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

### option: Locator.getByRole.exact = %%-locator-get-by-role-option-exact-%%

## method: Locator.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: Locator.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: Locator.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

### param: Locator.getByText.text = %%-locator-get-by-text-text-%%

### option: Locator.getByText.exact = %%-locator-get-by-text-exact-%%

## method: Locator.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

### param: Locator.getByTitle.text = %%-locator-get-by-text-text-%%

### option: Locator.getByTitle.exact = %%-locator-get-by-text-exact-%%

## async method: Locator.highlight
* since: v1.20

Highlight the corresponding element(s) on the screen. Useful for debugging, don't commit the code that uses [`method: Locator.highlight`].

## async method: Locator.hover
* since: v1.14

Hover over the matching element.

**Usage**

```js
await page.getByRole('link').hover();
```

```python async
await page.get_by_role("link").hover()
```

```python sync
page.get_by_role("link").hover()
```

```java
page.getByRole(AriaRole.LINK).hover();
```

```csharp
await page.GetByRole(AriaRole.Link).HoverAsync();
```

**Details**

This method hovers over the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: Locator.hover.position = %%-input-position-%%
* since: v1.14

### option: Locator.hover.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.hover.force = %%-input-force-%%
* since: v1.14

### option: Locator.hover.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.hover.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.hover.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: Locator.innerHTML
* since: v1.14
- returns: <[string]>

Returns the [`element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

### option: Locator.innerHTML.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.innerHTML.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.innerText
* since: v1.14
- returns: <[string]>

Returns the [`element.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText).

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] with [`option: LocatorAssertions.toHaveText.useInnerText`] option to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

### option: Locator.innerText.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.innerText.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.inputValue
* since: v1.14
- returns: <[string]>

Returns the value for the matching `<input>` or `<textarea>` or `<select>` element.

:::warning[Asserting value]
If you need to assert input value, prefer [`method: LocatorAssertions.toHaveValue`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const value = await page.getByRole('textbox').inputValue();
```

```python async
value = await page.get_by_role("textbox").input_value()
```

```python sync
value = page.get_by_role("textbox").input_value()
```

```java
String value = page.getByRole(AriaRole.TEXTBOX).inputValue();
```

```csharp
String value = await page.GetByRole(AriaRole.Textbox).InputValueAsync();
```

**Details**

Throws elements that are not an input, textarea or a select. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

### option: Locator.inputValue.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.inputValue.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isChecked
* since: v1.14
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

:::warning[Asserting checked state]
If you need to assert that checkbox is checked, prefer [`method: LocatorAssertions.toBeChecked`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const checked = await page.getByRole('checkbox').isChecked();
```

```java
boolean checked = page.getByRole(AriaRole.CHECKBOX).isChecked();
```

```python async
checked = await page.get_by_role("checkbox").is_checked()
```

```python sync
checked = page.get_by_role("checkbox").is_checked()
```

```csharp
var isChecked = await page.GetByRole(AriaRole.Checkbox).IsCheckedAsync();
```

### option: Locator.isChecked.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isChecked.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isDisabled
* since: v1.14
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of [enabled](../actionability.md#enabled).

:::warning[Asserting disabled state]
If you need to assert that an element is disabled, prefer [`method: LocatorAssertions.toBeDisabled`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const disabled = await page.getByRole('button').isDisabled();
```

```java
boolean disabled = page.getByRole(AriaRole.BUTTON).isDisabled();
```

```python async
disabled = await page.get_by_role("button").is_disabled()
```

```python sync
disabled = page.get_by_role("button").is_disabled()
```

```csharp
Boolean disabled = await page.GetByRole(AriaRole.Button).IsDisabledAsync();
```

### option: Locator.isDisabled.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isDisabled.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isEditable
* since: v1.14
- returns: <[boolean]>

Returns whether the element is [editable](../actionability.md#editable). If the target element is not an `<input>`, `<textarea>`, `<select>`, `[contenteditable]` and does not have a role allowing `[aria-readonly]`, this method throws an error.

:::warning[Asserting editable state]
If you need to assert that an element is editable, prefer [`method: LocatorAssertions.toBeEditable`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const editable = await page.getByRole('textbox').isEditable();
```

```java
boolean editable = page.getByRole(AriaRole.TEXTBOX).isEditable();
```

```python async
editable = await page.get_by_role("textbox").is_editable()
```

```python sync
editable = page.get_by_role("textbox").is_editable()
```

```csharp
Boolean editable = await page.GetByRole(AriaRole.Textbox).IsEditableAsync();
```

### option: Locator.isEditable.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isEditable.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isEnabled
* since: v1.14
- returns: <[boolean]>

Returns whether the element is [enabled](../actionability.md#enabled).

:::warning[Asserting enabled state]
If you need to assert that an element is enabled, prefer [`method: LocatorAssertions.toBeEnabled`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const enabled = await page.getByRole('button').isEnabled();
```

```java
boolean enabled = page.getByRole(AriaRole.BUTTON).isEnabled();
```

```python async
enabled = await page.get_by_role("button").is_enabled()
```

```python sync
enabled = page.get_by_role("button").is_enabled()
```

```csharp
Boolean enabled = await page.GetByRole(AriaRole.Button).IsEnabledAsync();
```

### option: Locator.isEnabled.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isEnabled.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isHidden
* since: v1.14
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of [visible](../actionability.md#visible).

:::warning[Asserting visibility]
If you need to assert that element is hidden, prefer [`method: LocatorAssertions.toBeHidden`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const hidden = await page.getByRole('button').isHidden();
```

```java
boolean hidden = page.getByRole(AriaRole.BUTTON).isHidden();
```

```python async
hidden = await page.get_by_role("button").is_hidden()
```

```python sync
hidden = page.get_by_role("button").is_hidden()
```

```csharp
Boolean hidden = await page.GetByRole(AriaRole.Button).IsHiddenAsync();
```

### option: Locator.isHidden.timeout
* since: v1.14
* deprecated: This option is ignored. [`method: Locator.isHidden`] does not wait for the element to become hidden and returns immediately.
- `timeout` <[float]>

## async method: Locator.isVisible
* since: v1.14
- returns: <[boolean]>

Returns whether the element is [visible](../actionability.md#visible).

:::warning[Asserting visibility]
If you need to assert that element is visible, prefer [`method: LocatorAssertions.toBeVisible`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

**Usage**

```js
const visible = await page.getByRole('button').isVisible();
```

```java
boolean visible = page.getByRole(AriaRole.BUTTON).isVisible();
```

```python async
visible = await page.get_by_role("button").is_visible()
```

```python sync
visible = page.get_by_role("button").is_visible()
```

```csharp
Boolean visible = await page.GetByRole(AriaRole.Button).IsVisibleAsync();
```

### option: Locator.isVisible.timeout
* since: v1.14
* deprecated: This option is ignored. [`method: Locator.isVisible`] does not wait for the element to become visible and returns immediately.
- `timeout` <[float]>

## method: Locator.last
* since: v1.14
- returns: <[Locator]>

Returns locator to the last matching element.

**Usage**

```js
const banana = await page.getByRole('listitem').last();
```

```python async
banana = await page.get_by_role("listitem").last
```

```python sync
banana = page.get_by_role("listitem").last
```

```java
Locator banana = page.getByRole(AriaRole.LISTITEM).last();
```

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Last(1);
```

## method: Locator.locator
* since: v1.14
- returns: <[Locator]>

%%-template-locator-locator-%%

### param: Locator.locator.selectorOrLocator = %%-find-selector-or-locator-%%
* since: v1.14

### option: Locator.locator.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.14

### option: Locator.locator.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Locator.locator.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33


## method: Locator.nth
* since: v1.14
- returns: <[Locator]>

Returns locator to the n-th matching element. It's zero based, `nth(0)` selects the first element.

**Usage**

```js
const banana = await page.getByRole('listitem').nth(2);
```

```python async
banana = await page.get_by_role("listitem").nth(2)
```

```python sync
banana = page.get_by_role("listitem").nth(2)
```

```java
Locator banana = page.getByRole(AriaRole.LISTITEM).nth(2);
```

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Nth(2);
```

### param: Locator.nth.index
* since: v1.14
- `index` <[int]>


## method: Locator.or
* since: v1.33
* langs:
  - alias-python: or_
- returns: <[Locator]>

Creates a locator matching all elements that match one or both of the two locators.

Note that when both locators match something, the resulting locator will have multiple matches, potentially causing a [locator strictness](../locators.md#strictness) violation.

**Usage**

Consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead. In this case, you can wait for either a "New email" button, or a dialog and act accordingly.

:::note
If both "New email" button and security dialog appear on screen, the "or" locator will match both of them,
possibly throwing the ["strict mode violation" error](../locators.md#strictness). In this case, you can use [`method: Locator.first`] to only match one of them.
:::

```js
const newEmail = page.getByRole('button', { name: 'New' });
const dialog = page.getByText('Confirm security settings');
await expect(newEmail.or(dialog).first()).toBeVisible();
if (await dialog.isVisible())
  await page.getByRole('button', { name: 'Dismiss' }).click();
await newEmail.click();
```

```java
Locator newEmail = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("New"));
Locator dialog = page.getByText("Confirm security settings");
assertThat(newEmail.or(dialog).first()).isVisible();
if (dialog.isVisible())
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Dismiss")).click();
newEmail.click();
```

```python async
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
await expect(new_email.or_(dialog).first).to_be_visible()
if (await dialog.is_visible()):
  await page.get_by_role("button", name="Dismiss").click()
await new_email.click()
```

```python sync
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
expect(new_email.or_(dialog).first).to_be_visible()
if (dialog.is_visible()):
  page.get_by_role("button", name="Dismiss").click()
new_email.click()
```

```csharp
var newEmail = page.GetByRole(AriaRole.Button, new() { Name = "New" });
var dialog = page.GetByText("Confirm security settings");
await Expect(newEmail.Or(dialog).First).ToBeVisibleAsync();
if (await dialog.IsVisibleAsync())
  await page.GetByRole(AriaRole.Button, new() { Name = "Dismiss" }).ClickAsync();
await newEmail.ClickAsync();
```

### param: Locator.or.locator
* since: v1.33
- `locator` <[Locator]>

Alternative locator to match.


## method: Locator.page
* since: v1.19
- returns: <[Page]>

A page this locator belongs to.

## async method: Locator.press
* since: v1.14

Focuses the matching element and presses a combination of the keys.

**Usage**

```js
await page.getByRole('textbox').press('Backspace');
```

```java
page.getByRole(AriaRole.TEXTBOX).press("Backspace");
```

```python async
await page.get_by_role("textbox").press("Backspace")
```

```python sync
page.get_by_role("textbox").press("Backspace")
```

```csharp
await page.GetByRole(AriaRole.Textbox).PressAsync("Backspace");
```

**Details**

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

### param: Locator.press.key
* since: v1.14
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Locator.press.delay
* since: v1.14
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Locator.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.14

### option: Locator.press.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.press.timeout = %%-input-timeout-js-%%
* since: v1.14


## async method: Locator.pressSequentially
* since: v1.38

:::tip
In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page.
:::

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: Locator.press`].

**Usage**

```js
await locator.pressSequentially('Hello'); // Types instantly
await locator.pressSequentially('World', { delay: 100 }); // Types slower, like a user
```

```java
locator.pressSequentially("Hello"); // Types instantly
locator.pressSequentially("World", new Locator.pressSequentiallyOptions().setDelay(100)); // Types slower, like a user
```

```python async
await locator.press_sequentially("hello") # types instantly
await locator.press_sequentially("world", delay=100) # types slower, like a user
```

```python sync
locator.press_sequentially("hello") # types instantly
locator.press_sequentially("world", delay=100) # types slower, like a user
```

```csharp
await locator.PressSequentiallyAsync("Hello"); // Types instantly
await locator.PressSequentiallyAsync("World", new() { Delay = 100 }); // Types slower, like a user
```

An example of typing into a text field and then submitting the form:

```js
const locator = page.getByLabel('Password');
await locator.pressSequentially('my password');
await locator.press('Enter');
```

```java
Locator locator = page.getByLabel("Password");
locator.pressSequentially("my password");
locator.press("Enter");
```

```python async
locator = page.get_by_label("Password")
await locator.press_sequentially("my password")
await locator.press("Enter")
```

```python sync
locator = page.get_by_label("Password")
locator.press_sequentially("my password")
locator.press("Enter")
```

```csharp
var locator = page.GetByLabel("Password");
await locator.PressSequentiallyAsync("my password");
await locator.PressAsync("Enter");
```

### param: Locator.pressSequentially.text
* since: v1.38
- `text` <[string]>

String of characters to sequentially press into a focused element.

### option: Locator.pressSequentially.delay
* since: v1.38
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

### option: Locator.pressSequentially.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.38

### option: Locator.pressSequentially.timeout = %%-input-timeout-%%
* since: v1.38

### option: Locator.pressSequentially.timeout = %%-input-timeout-js-%%
* since: v1.38


## async method: Locator.screenshot
* since: v1.14
- returns: <[Buffer]>

Take a screenshot of the element matching the locator.

**Usage**

```js
await page.getByRole('link').screenshot();
```

```java
page.getByRole(AriaRole.LINK).screenshot();
```

```python async
await page.get_by_role("link").screenshot()
```

```python sync
page.get_by_role("link").screenshot()
```

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync();
```

Disable animations and save screenshot to a file:

```js
await page.getByRole('link').screenshot({ animations: 'disabled', path: 'link.png' });
```

```java
page.getByRole(AriaRole.LINK).screenshot(new Locator.ScreenshotOptions()
    .setAnimations(ScreenshotAnimations.DISABLED)
    .setPath(Paths.get("example.png")));
```

```python async
await page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

```python sync
page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync(new() {
  Animations = ScreenshotAnimations.Disabled,
  Path = "link.png"
});
```

**Details**

This method captures a screenshot of the page, clipped to the size and position of a particular element matching the locator. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the [actionability](../actionability.md) checks, then scrolls element into view before taking a
screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

### option: Locator.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.14

### option: Locator.screenshot.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: Locator.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: Locator.scrollIntoViewIfNeeded
* since: v1.14

This method waits for [actionability](../actionability.md) checks, then tries to scroll element into view, unless it is
completely visible as defined by
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s `ratio`.

See [scrolling](../input.md#scrolling) for alternative ways to scroll.

### option: Locator.scrollIntoViewIfNeeded.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.scrollIntoViewIfNeeded.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.selectOption
* since: v1.14
- returns: <[Array]<[string]>>

Selects option or options in `<select>`.

**Details**

This method waits for [actionability](../actionability.md) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```html
<select multiple>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

```js
// single selection matching the value or label
element.selectOption('blue');

// single selection matching the label
element.selectOption({ label: 'Blue' });

// multiple selection for red, green and blue options
element.selectOption(['red', 'green', 'blue']);
```

```java
// single selection matching the value or label
element.selectOption("blue");
// single selection matching the label
element.selectOption(new SelectOption().setLabel("Blue"));
// multiple selection for blue, red and second option
element.selectOption(new String[] {"red", "green", "blue"});
```

```python async
# single selection matching the value or label
await element.select_option("blue")
# single selection matching the label
await element.select_option(label="blue")
# multiple selection for blue, red and second option
await element.select_option(value=["red", "green", "blue"])
```

```python sync
# single selection matching the value or label
element.select_option("blue")
# single selection matching the label
element.select_option(label="blue")
# multiple selection for blue, red and second option
element.select_option(value=["red", "green", "blue"])
```

```csharp
// single selection matching the value or label
await element.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await element.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection for blue, red and second option
await element.SelectOptionAsync(new[] { "red", "green", "blue" });
```

### param: Locator.selectOption.values = %%-select-options-values-%%
* since: v1.14

### option: Locator.selectOption.force = %%-input-force-%%
* since: v1.14

### option: Locator.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.selectOption.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.14

### param: Locator.selectOption.element = %%-python-select-options-element-%%
* since: v1.14

### param: Locator.selectOption.index = %%-python-select-options-index-%%
* since: v1.14

### param: Locator.selectOption.value = %%-python-select-options-value-%%
* since: v1.14

### param: Locator.selectOption.label = %%-python-select-options-label-%%
* since: v1.14

## async method: Locator.selectText
* since: v1.14

This method waits for [actionability](../actionability.md) checks, then focuses the element and selects all its text
content.

If the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), focuses and selects text in the control instead.

### option: Locator.selectText.force = %%-input-force-%%
* since: v1.14

### option: Locator.selectText.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.selectText.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.setChecked
* since: v1.15

Set the state of a checkbox or a radio element.

**Usage**

```js
await page.getByRole('checkbox').setChecked(true);
```

```java
page.getByRole(AriaRole.CHECKBOX).setChecked(true);
```

```python async
await page.get_by_role("checkbox").set_checked(True)
```

```python sync
page.get_by_role("checkbox").set_checked(True)
```

```csharp
await page.GetByRole(AriaRole.Checkbox).SetCheckedAsync(true);
```

**Details**

This method checks or unchecks an element by performing the following steps:
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Locator.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Locator.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Locator.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Locator.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Locator.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Locator.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Locator.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: Locator.setInputFiles
* since: v1.14

Upload file or multiple files into `<input type=file>`.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

**Usage**

```js
// Select one file
await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));

// Select multiple files
await page.getByLabel('Upload files').setInputFiles([
  path.join(__dirname, 'file1.txt'),
  path.join(__dirname, 'file2.txt'),
]);

// Select a directory
await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir'));

// Remove all the selected files
await page.getByLabel('Upload file').setInputFiles([]);

// Upload buffer from memory
await page.getByLabel('Upload file').setInputFiles({
  name: 'file.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('this is test')
});
```

```java
// Select one file
page.getByLabel("Upload file").setInputFiles(Paths.get("myfile.pdf"));

// Select multiple files
page.getByLabel("Upload files").setInputFiles(new Path[] {Paths.get("file1.txt"), Paths.get("file2.txt")});

// Select a directory
page.getByLabel("Upload directory").setInputFiles(Paths.get("mydir"));

// Remove all the selected files
page.getByLabel("Upload file").setInputFiles(new Path[0]);

// Upload buffer from memory
page.getByLabel("Upload file").setInputFiles(new FilePayload(
  "file.txt", "text/plain", "this is test".getBytes(StandardCharsets.UTF_8)));
```

```python async
# Select one file
await page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
await page.get_by_label("Upload files").set_input_files(['file1.txt', 'file2.txt'])

# Select a directory
await page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
await page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
await page.get_by_label("Upload file").set_input_files(
    files=[
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ],
)
```

```python sync
# Select one file
page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
page.get_by_label("Upload files").set_input_files(['file1.txt', 'file2.txt'])

# Select a directory
page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
page.get_by_label("Upload file").set_input_files(
    files=[
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ],
)
```

```csharp
// Select one file
await page.GetByLabel("Upload file").SetInputFilesAsync("myfile.pdf");

// Select multiple files
await page.GetByLabel("Upload files").SetInputFilesAsync(new[] { "file1.txt", "file12.txt" });

// Select a directory
await page.GetByLabel("Upload directory").SetInputFilesAsync("mydir");

// Remove all the selected files
await page.GetByLabel("Upload file").SetInputFilesAsync(new[] {});

// Upload buffer from memory
await page.GetByLabel("Upload file").SetInputFilesAsync(new FilePayload
{
    Name = "file.txt",
    MimeType = "text/plain",
    Buffer = System.Text.Encoding.UTF8.GetBytes("this is a test"),
});
```


**Details**

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [Locator] to point to an
[input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

### param: Locator.setInputFiles.files = %%-input-files-%%
* since: v1.14

### option: Locator.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.tap
* since: v1.14

Perform a tap gesture on the element matching the locator. For examples of emulating other gestures by manually dispatching touch events, see the [emulating legacy touch events](../touch-events.md) page.

**Details**

This method taps the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`element.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### option: Locator.tap.position = %%-input-position-%%
* since: v1.14

### option: Locator.tap.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.tap.force = %%-input-force-%%
* since: v1.14

### option: Locator.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.tap.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.tap.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

## async method: Locator.textContent
* since: v1.14
- returns: <[null]|[string]>

Returns the [`node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] to avoid flakiness. See [assertions guide](../test-assertions.md) for more details.
:::

### option: Locator.textContent.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.textContent.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.toString
* since: v1.57
* langs: js
- returns: <[string]>

Returns a human-readable representation of the locator, using the [`method: Locator.description`] if one exists; otherwise, it generates a string based on the locator's selector.

## async method: Locator.type
* since: v1.14
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: Locator.press`].

**Usage**

### param: Locator.type.text
* since: v1.14
- `text` <[string]>

A text to type into a focused element.

### option: Locator.type.delay
* since: v1.14
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

### option: Locator.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.type.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.type.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.uncheck
* since: v1.14

Ensure that checkbox or radio element is unchecked.

**Usage**

```js
await page.getByRole('checkbox').uncheck();
```

```java
page.getByRole(AriaRole.CHECKBOX).uncheck();
```

```python async
await page.get_by_role("checkbox").uncheck()
```

```python sync
page.get_by_role("checkbox").uncheck()
```

```csharp
await page.GetByRole(AriaRole.Checkbox).UncheckAsync();
```

**Details**

This method unchecks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: Locator.uncheck.position = %%-input-position-%%
* since: v1.14

### option: Locator.uncheck.force = %%-input-force-%%
* since: v1.14

### option: Locator.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.uncheck.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.uncheck.trial = %%-input-trial-%%
* since: v1.14

## async method: Locator.waitFor
* since: v1.16

Returns when element specified by locator satisfies the [`option: state`] option.

If target element already satisfies the condition, the method returns immediately. Otherwise, waits for up to
[`option: timeout`] milliseconds until the condition is met.

**Usage**

```js
const orderSent = page.locator('#order-sent');
await orderSent.waitFor();
```

```java
Locator orderSent = page.locator("#order-sent");
orderSent.waitFor();
```

```python async
order_sent = page.locator("#order-sent")
await order_sent.wait_for()
```

```python sync
order_sent = page.locator("#order-sent")
order_sent.wait_for()
```

```csharp
var orderSent = page.Locator("#order-sent");
orderSent.WaitForAsync();
```

### option: Locator.waitFor.state = %%-wait-for-selector-state-%%
* since: v1.16

### option: Locator.waitFor.timeout = %%-input-timeout-%%
* since: v1.16

### option: Locator.waitFor.timeout = %%-input-timeout-js-%%
* since: v1.16
# class: Request
* since: v1.8

Whenever the page sends a request for a network resource the following sequence of events are emitted by [Page]:
* [`event: Page.request`] emitted when the request is issued by the page.
* [`event: Page.response`] emitted when/if the response status and headers are received for the request.
* [`event: Page.requestFinished`] emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event),
the  [`event: Page.requestFailed`] event is emitted.

:::note
HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete
with `'requestfinished'` event.
:::

If request gets a 'redirect' response, the request is successfully finished with the `requestfinished` event, and a new
request is  issued to a redirected url.

## async method: Request.allHeaders
* since: v1.15
- returns: <[Object]<[string], [string]>>

An object with all the request HTTP headers associated with this request. The header names are lower-cased.

## method: Request.failure
* since: v1.8
- returns: <[null]|[string]>

The method returns `null` unless this request has failed, as reported by `requestfailed` event.

**Usage**

Example of logging of all the failed requests:

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

```java
page.onRequestFailed(request -> {
  System.out.println(request.url() + " " + request.failure());
});
```

```py
page.on("requestfailed", lambda request: print(request.url + " " + request.failure))
```

```csharp
page.RequestFailed += (_, request) =>
{
    Console.WriteLine(request.Failure);
};
```

## method: Request.failure
* since: v1.8
* langs: js
- returns: <[null]|[Object]>
  - `errorText` <[string]> Human-readable error message, e.g. `'net::ERR_FAILED'`.

## method: Request.frame
* since: v1.8
- returns: <[Frame]>

Returns the [Frame] that initiated this request.

**Usage**

```js
const frameUrl = request.frame().url();
```

```java
String frameUrl = request.frame().url();
```

```py
frame_url = request.frame.url
```

```csharp
var frameUrl = request.Frame.Url;
```

**Details**

Note that in some cases the frame is not available, and this method will throw.
* When request originates in the Service Worker. You can use `request.serviceWorker()` to check that.
* When navigation request is issued before the corresponding frame is created. You can use [`method: Request.isNavigationRequest`] to check that.

Here is an example that handles all the cases:

```js
if (request.serviceWorker())
  console.log(`request ${request.url()} from a service worker`);
else if (request.isNavigationRequest())
  console.log(`request ${request.url()} is a navigation request`);
else
  console.log(`request ${request.url()} from a frame ${request.frame().url()}`);
```

## method: Request.headers
* since: v1.8
- returns: <[Object]<[string], [string]>>

An object with the request HTTP headers. The header names are lower-cased.
Note that this method does not return security-related headers, including cookie-related ones.
You can use [`method: Request.allHeaders`] for complete list of headers that include `cookie` information.

## async method: Request.headersArray
* since: v1.15
- returns: <[Array]<[Object]>>
  - `name` <[string]> Name of the header.
  - `value` <[string]> Value of the header.

An array with all the request HTTP headers associated with this request. Unlike [`method: Request.allHeaders`], header names are NOT lower-cased.
Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

## async method: Request.headerValue
* since: v1.15
- returns: <[null]|[string]>

Returns the value of the header matching the name. The name is case-insensitive.

### param: Request.headerValue.name
* since: v1.15
- `name` <[string]>

Name of the header.

## method: Request.isNavigationRequest
* since: v1.8
- returns: <[boolean]>

Whether this request is driving frame's navigation.

Some navigation requests are issued before the corresponding frame is created, and therefore
do not have [`method: Request.frame`] available.

## method: Request.method
* since: v1.8
- returns: <[string]>

Request's method (GET, POST, etc.)

## method: Request.postData
* since: v1.8
- returns: <[null]|[string]>

Request's post body, if any.

## method: Request.postDataBuffer
* since: v1.8
- returns: <[null]|[Buffer]>

Request's post body in a binary form, if any.

## method: Request.postDataJSON
* since: v1.8
* langs: js, python
- returns: <[null]|[Serializable]>

Returns parsed request's body for `form-urlencoded` and JSON as a fallback if any.

When the response is `application/x-www-form-urlencoded` then a key/value object of the values will be returned.
Otherwise it will be parsed as JSON.

## method: Request.postDataJSON
* since: v1.12
* langs: csharp
- returns: <[null]|[JsonElement]>

Returns parsed request's body for `form-urlencoded` and JSON as a fallback if any.

When the response is `application/x-www-form-urlencoded` then a key/value object of the values will be returned.
Otherwise it will be parsed as JSON.

## method: Request.redirectedFrom
* since: v1.8
- returns: <[null]|[Request]>

Request that was redirected by the server to this one, if any.

When the server responds with a redirect, Playwright creates a new [Request] object. The two requests are connected by
`redirectedFrom()` and `redirectedTo()` methods. When multiple server redirects has happened, it is possible to
construct the whole redirect chain by repeatedly calling `redirectedFrom()`.

**Usage**

For example, if the website `http://example.com` redirects to `https://example.com`:

```js
const response = await page.goto('http://example.com');
console.log(response.request().redirectedFrom().url()); // 'http://example.com'
```

```java
Response response = page.navigate("http://example.com");
System.out.println(response.request().redirectedFrom().url()); // "http://example.com"
```

```python async
response = await page.goto("http://example.com")
print(response.request.redirected_from.url) # "http://example.com"
```

```python sync
response = page.goto("http://example.com")
print(response.request.redirected_from.url) # "http://example.com"
```

```csharp
var response = await page.GotoAsync("http://www.microsoft.com");
Console.WriteLine(response.Request.RedirectedFrom?.Url); // http://www.microsoft.com
```

If the website `https://google.com` has no redirects:

```js
const response = await page.goto('https://google.com');
console.log(response.request().redirectedFrom()); // null
```

```java
Response response = page.navigate("https://google.com");
System.out.println(response.request().redirectedFrom()); // null
```

```python async
response = await page.goto("https://google.com")
print(response.request.redirected_from) # None
```

```python sync
response = page.goto("https://google.com")
print(response.request.redirected_from) # None
```

```csharp
var response = await page.GotoAsync("https://www.google.com");
Console.WriteLine(response.Request.RedirectedFrom?.Url); // null
```

## method: Request.redirectedTo
* since: v1.8
- returns: <[null]|[Request]>

New request issued by the browser if the server responded with redirect.

**Usage**

This method is the opposite of [`method: Request.redirectedFrom`]:

```js
console.log(request.redirectedFrom().redirectedTo() === request); // true
```

```java
System.out.println(request.redirectedFrom().redirectedTo() == request); // true
```

```py
assert request.redirected_from.redirected_to == request
```

```csharp
Console.WriteLine(request.RedirectedFrom?.RedirectedTo == request); // True
```

## method: Request.resourceType
* since: v1.8
- returns: <[string]>

Contains the request's resource type as it was perceived by the rendering engine. ResourceType will be one of the
following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`,
`websocket`, `manifest`, `other`.

## async method: Request.response
* since: v1.8
- returns: <[null]|[Response]>

Returns the matching [Response] object, or `null` if the response was not received due to error.

## method: Request.serviceWorker
* since: v1.24
* langs: js, python
- returns: <[null]|[Worker]>

The Service [Worker] that is performing the request.

**Details**

This method is Chromium only. It's safe to call when using other browsers, but it will always be `null`.

Requests originated in a Service Worker do not have a [`method: Request.frame`] available.

## async method: Request.sizes
* since: v1.15
- returns: <[Object]>
  - `requestBodySize` <[int]> Size of the request body (POST data payload) in bytes. Set to 0 if there was no body.
  - `requestHeadersSize` <[int]> Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body.
  - `responseBodySize` <[int]> Size of the received response body (encoded) in bytes.
  - `responseHeadersSize` <[int]> Total number of bytes from the start of the HTTP response message until (and including) the double CRLF before the body.

Returns resource size information for given request.

## method: Request.timing
* since: v1.8
- returns: <[Object]>
  - `startTime` <[float]> Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC
  - `domainLookupStart` <[float]> Time immediately before the browser starts the domain name lookup for the
    resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `domainLookupEnd` <[float]> Time immediately after the browser starts the domain name lookup for the resource.
    The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectStart` <[float]> Time immediately before the user agent starts establishing the connection to the server
    to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `secureConnectionStart` <[float]> Time immediately before the browser starts the handshake process to secure the
    current connection. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `connectEnd` <[float]> Time immediately before the user agent starts establishing the connection to the server
    to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `requestStart` <[float]> Time immediately before the browser starts requesting the resource from the server,
    cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseStart` <[float]> Time immediately after the browser receives the first byte of the response from the server,
    cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.
  - `responseEnd` <[float]> Time immediately after the browser receives the last byte of the resource or immediately
    before the transport connection is closed, whichever comes first. The value is given in milliseconds relative to
    `startTime`, -1 if not available.

Returns resource timing information for given request. Most of the timing values become available upon the response,
`responseEnd` becomes available when request finishes. Find more information at
[Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

**Usage**

```js
const requestFinishedPromise = page.waitForEvent('requestfinished');
await page.goto('http://example.com');
const request = await requestFinishedPromise;
console.log(request.timing());
```

```java
page.onRequestFinished(request -> {
  Timing timing = request.timing();
  System.out.println(timing.responseEnd - timing.startTime);
});
page.navigate("http://example.com");
```

```python async
async with page.expect_event("requestfinished") as request_info:
    await page.goto("http://example.com")
request = await request_info.value
print(request.timing)
```

```python sync
with page.expect_event("requestfinished") as request_info:
    page.goto("http://example.com")
request = request_info.value
print(request.timing)
```

```csharp
var request = await page.RunAndWaitForRequestFinishedAsync(async () =>
{
    await page.GotoAsync("https://www.microsoft.com");
});
Console.WriteLine(request.Timing.ResponseEnd);
```

## method: Request.url
* since: v1.8
- returns: <[string]>

URL of the request.
# class: Mouse
* since: v1.8

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

:::tip
If you want to debug where the mouse moved, you can use the [Trace viewer](../trace-viewer-intro.md) or [Playwright Inspector](../running-tests.md). A red dot showing the location of the mouse will be shown for every mouse action.
:::

Every `page` object has its own Mouse, accessible with [`property: Page.mouse`].

```js
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

```java
// Using ‘page.mouse’ to trace a 100x100 square.
page.mouse().move(0, 0);
page.mouse().down();
page.mouse().move(0, 100);
page.mouse().move(100, 100);
page.mouse().move(100, 0);
page.mouse().move(0, 0);
page.mouse().up();
```

```python async
# using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0)
await page.mouse.down()
await page.mouse.move(0, 100)
await page.mouse.move(100, 100)
await page.mouse.move(100, 0)
await page.mouse.move(0, 0)
await page.mouse.up()
```

```python sync
# using ‘page.mouse’ to trace a 100x100 square.
page.mouse.move(0, 0)
page.mouse.down()
page.mouse.move(0, 100)
page.mouse.move(100, 100)
page.mouse.move(100, 0)
page.mouse.move(0, 0)
page.mouse.up()
```

```csharp
await Page.Mouse.MoveAsync(0, 0);
await Page.Mouse.DownAsync();
await Page.Mouse.MoveAsync(0, 100);
await Page.Mouse.MoveAsync(100, 100);
await Page.Mouse.MoveAsync(100, 0);
await Page.Mouse.MoveAsync(0, 0);
await Page.Mouse.UpAsync();
```

## async method: Mouse.click
* since: v1.8

Shortcut for [`method: Mouse.move`], [`method: Mouse.down`], [`method: Mouse.up`].

### param: Mouse.click.x
* since: v1.8
- `x` <[float]>

X coordinate relative to the main frame's viewport in CSS pixels.

### param: Mouse.click.y
* since: v1.8
- `y` <[float]>

Y coordinate relative to the main frame's viewport in CSS pixels.

### option: Mouse.click.button = %%-input-button-%%
* since: v1.8

### option: Mouse.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: Mouse.click.delay = %%-input-down-up-delay-%%
* since: v1.8

## async method: Mouse.dblclick
* since: v1.8
* langs:
  - alias-csharp: DblClickAsync

Shortcut for [`method: Mouse.move`], [`method: Mouse.down`], [`method: Mouse.up`], [`method: Mouse.down`] and
[`method: Mouse.up`].

### param: Mouse.dblclick.x
* since: v1.8
- `x` <[float]>

X coordinate relative to the main frame's viewport in CSS pixels.

### param: Mouse.dblclick.y
* since: v1.8
- `y` <[float]>

Y coordinate relative to the main frame's viewport in CSS pixels.

### option: Mouse.dblclick.button = %%-input-button-%%
* since: v1.8

### option: Mouse.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

## async method: Mouse.down
* since: v1.8

Dispatches a `mousedown` event.

### option: Mouse.down.button = %%-input-button-%%
* since: v1.8

### option: Mouse.down.clickCount = %%-input-click-count-%%
* since: v1.8

## async method: Mouse.move
* since: v1.8

Dispatches a `mousemove` event.

### param: Mouse.move.x
* since: v1.8
- `x` <[float]>

X coordinate relative to the main frame's viewport in CSS pixels.

### param: Mouse.move.y
* since: v1.8
- `y` <[float]>

Y coordinate relative to the main frame's viewport in CSS pixels.

### option: Mouse.move.steps = %%-input-mousemove-steps-%%
* since: v1.8

## async method: Mouse.up
* since: v1.8

Dispatches a `mouseup` event.

### option: Mouse.up.button = %%-input-button-%%
* since: v1.8

### option: Mouse.up.clickCount = %%-input-click-count-%%
* since: v1.8

## async method: Mouse.wheel
* since: v1.15

Dispatches a `wheel` event. This method is usually used to manually scroll the page. See [scrolling](../input.md#scrolling) for alternative ways to scroll.

:::note
Wheel events may cause scrolling if they are not handled, and this method does not
wait for the scrolling to finish before returning.
:::

### param: Mouse.wheel.deltaX
* since: v1.15
- `deltaX` <[float]>

Pixels to scroll horizontally.

### param: Mouse.wheel.deltaY
* since: v1.15
- `deltaY` <[float]>

Pixels to scroll vertically.
# class: LocatorAssertions
* since: v1.17

The [LocatorAssertions] class provides assertion methods that can be used to make assertions about the [Locator] state in the tests.

```js
import { test, expect } from '@playwright/test';

test('status becomes submitted', async ({ page }) => {
  // ...
  await page.getByRole('button').click();
  await expect(page.locator('.status')).toHaveText('Submitted');
});
```

```java
// ...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestLocator {
  // ...
  @Test
  void statusBecomesSubmitted() {
    // ...
    page.getByRole(AriaRole.BUTTON).click();
    assertThat(page.locator(".status")).hasText("Submitted");
  }
}
```

```python async
from playwright.async_api import Page, expect

async def test_status_becomes_submitted(page: Page) -> None:
    # ..
    await page.get_by_role("button").click()
    await expect(page.locator(".status")).to_have_text("Submitted")
```

```python sync
from playwright.sync_api import Page, expect

def test_status_becomes_submitted(page: Page) -> None:
    # ..
    page.get_by_role("button").click()
    expect(page.locator(".status")).to_have_text("Submitted")
```

```csharp
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

[TestClass]
public class ExampleTests : PageTest
{
    [TestMethod]
    public async Task StatusBecomesSubmitted()
    {
        // ...
        await Page.GetByRole(AriaRole.Button, new() { Name = "Sign In" }).ClickAsync();
        await Expect(Page.Locator(".status")).ToHaveTextAsync("Submitted");
    }
}
```

## property: LocatorAssertions.not
* since: v1.20
* langs: java, js, csharp
- returns: <[LocatorAssertions]>

Makes the assertion check for the opposite condition. For example, this code tests that the Locator doesn't contain text `"error"`:

```js
await expect(locator).not.toContainText('error');
```

```java
assertThat(locator).not().containsText("error");
```

```csharp
await Expect(locator).Not.ToContainTextAsync("error");
```

## async method: LocatorAssertions.NotToBeAttached
* since: v1.33
* langs: python

The opposite of [`method: LocatorAssertions.toBeAttached`].

### option: LocatorAssertions.NotToBeAttached.attached
* since: v1.33
- `attached` <[boolean]>

### option: LocatorAssertions.NotToBeAttached.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.33


## async method: LocatorAssertions.NotToBeChecked
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeChecked`].

### option: LocatorAssertions.NotToBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeDisabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeDisabled`].

### option: LocatorAssertions.NotToBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEditable
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEditable`].

### option: LocatorAssertions.NotToBeEditable.editable
* since: v1.26
- `editable` <[boolean]>

### option: LocatorAssertions.NotToBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEmpty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEmpty`].

### option: LocatorAssertions.NotToBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEnabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEnabled`].

### option: LocatorAssertions.NotToBeEnabled.enabled
* since: v1.26
- `enabled` <[boolean]>

### option: LocatorAssertions.NotToBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeFocused
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeFocused`].

### option: LocatorAssertions.NotToBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeHidden
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeHidden`].

### option: LocatorAssertions.NotToBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeInViewport
* since: v1.31
* langs: python

The opposite of [`method: LocatorAssertions.toBeInViewport`].

### option: LocatorAssertions.NotToBeInViewport.ratio
* since: v1.31
* langs: python
- `ratio` <[float]>

### option: LocatorAssertions.NotToBeInViewport.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.31
* langs: python

## async method: LocatorAssertions.NotToBeVisible
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeVisible`].

### option: LocatorAssertions.NotToBeVisible.visible
* since: v1.26
- `visible` <[boolean]>

### option: LocatorAssertions.NotToBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToContainClass
* since: v1.52
* langs: python

The opposite of [`method: LocatorAssertions.toContainClass`].

### param: LocatorAssertions.NotToContainClass.expected
* since: v1.52
- `expected` <[string]|[Array]<[string]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.NotToContainClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.52

## async method: LocatorAssertions.NotToContainText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toContainText`].

### param: LocatorAssertions.NotToContainText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.NotToContainText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.NotToContainText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToContainText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.NotToHaveAccessibleDescription
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleDescription`].

### param: LocatorAssertions.NotToHaveAccessibleDescription.name
* since: v1.44
- `description` <[string]|[RegExp]>

Expected accessible description.

### option: LocatorAssertions.NotToHaveAccessibleDescription.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveAccessibleDescription.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

## async method: LocatorAssertions.NotToHaveAccessibleErrorMessage
* since: v1.50
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleErrorMessage`].

### param: LocatorAssertions.NotToHaveAccessibleErrorMessage.errorMessage
* since: v1.50
- `errorMessage` <[string]|[RegExp]>

Expected accessible error message.

### option: LocatorAssertions.NotToHaveAccessibleErrorMessage.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.50

### option: LocatorAssertions.NotToHaveAccessibleErrorMessage.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.50


## async method: LocatorAssertions.NotToHaveAccessibleName
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleName`].

### param: LocatorAssertions.NotToHaveAccessibleName.name
* since: v1.44
- `name` <[string]|[RegExp]>

Expected accessible name.

### option: LocatorAssertions.NotToHaveAccessibleName.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveAccessibleName.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44


## async method: LocatorAssertions.NotToHaveAttribute
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAttribute`].

### param: LocatorAssertions.NotToHaveAttribute.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.NotToHaveAttribute.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### option: LocatorAssertions.NotToHaveAttribute.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.40

### option: LocatorAssertions.NotToHaveAttribute.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveClass
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveClass`].

### param: LocatorAssertions.NotToHaveClass.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCount
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCount`].

### param: LocatorAssertions.NotToHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.NotToHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCSS
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCSS`].

### param: LocatorAssertions.NotToHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.NotToHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.NotToHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveId
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveId`].

### param: LocatorAssertions.NotToHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.NotToHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveJSProperty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveJSProperty`].

### param: LocatorAssertions.NotToHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.NotToHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.NotToHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.NotToHaveRole
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveRole`].

### param: LocatorAssertions.NotToHaveRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveRole.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveRole.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44


## async method: LocatorAssertions.NotToHaveText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveText`].

### param: LocatorAssertions.NotToHaveText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected string or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.NotToHaveText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToHaveText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValue
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValue`].

### param: LocatorAssertions.NotToHaveValue.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected value.

### option: LocatorAssertions.NotToHaveValue.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValues
* since: v1.23
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValues`].

### param: LocatorAssertions.NotToHaveValues.values
* since: v1.23
- `values` <[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected options currently selected.

### option: LocatorAssertions.NotToHaveValues.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.23

## async method: LocatorAssertions.NotToMatchAriaSnapshot
* since: v1.49
* langs: python

The opposite of [`method: LocatorAssertions.toMatchAriaSnapshot`].

### param: LocatorAssertions.NotToMatchAriaSnapshot.expected
* since: v1.49
- `expected` <string>

### option: LocatorAssertions.NotToMatchAriaSnapshot.timeout = %%-js-assertions-timeout-%%
* since: v1.49

### option: LocatorAssertions.NotToMatchAriaSnapshot.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.49



## async method: LocatorAssertions.toBeAttached
* since: v1.33
* langs:
  - alias-java: isAttached

Ensures that [Locator] points to an element that is [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

**Usage**

```js
await expect(page.getByText('Hidden text')).toBeAttached();
```

```java
assertThat(page.getByText("Hidden text")).isAttached();
```

```python async
await expect(page.get_by_text("Hidden text")).to_be_attached()
```

```python sync
expect(page.get_by_text("Hidden text")).to_be_attached()
```

```csharp
await Expect(Page.GetByText("Hidden text")).ToBeAttachedAsync();
```

### option: LocatorAssertions.toBeAttached.attached
* since: v1.33
- `attached` <[boolean]>

### option: LocatorAssertions.toBeAttached.timeout = %%-js-assertions-timeout-%%
* since: v1.33

### option: LocatorAssertions.toBeAttached.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.33


## async method: LocatorAssertions.toBeChecked
* since: v1.20
* langs:
  - alias-java: isChecked

Ensures the [Locator] points to a checked input.

**Usage**

```js
const locator = page.getByLabel('Subscribe to newsletter');
await expect(locator).toBeChecked();
```

```java
assertThat(page.getByLabel("Subscribe to newsletter")).isChecked();
```

```python async
from playwright.async_api import expect

locator = page.get_by_label("Subscribe to newsletter")
await expect(locator).to_be_checked()
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_label("Subscribe to newsletter")
expect(locator).to_be_checked()
```

```csharp
var locator = Page.GetByLabel("Subscribe to newsletter");
await Expect(locator).ToBeCheckedAsync();
```

### option: LocatorAssertions.toBeChecked.checked
* since: v1.18
- `checked` <[boolean]>

Provides state to assert for. Asserts for input to be checked by default.
This option can't be used when [`option: LocatorAssertions.toBeChecked.indeterminate`] is set to true.

### option: LocatorAssertions.toBeChecked.indeterminate
* since: v1.50
- `indeterminate` <[boolean]>

Asserts that the element is in the indeterminate (mixed) state. Only supported for checkboxes and radio buttons.
This option can't be true when [`option: LocatorAssertions.toBeChecked.checked`] is provided.

### option: LocatorAssertions.toBeChecked.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeDisabled
* since: v1.20
* langs:
  - alias-java: isDisabled

Ensures the [Locator] points to a disabled element. Element is disabled if it has "disabled" attribute
or is disabled via ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled).
Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup`
can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored
by the browser.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeDisabled();
```

```java
assertThat(page.locator("button.submit")).isDisabled();
```

```python async
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_disabled()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_disabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeDisabledAsync();
```

### option: LocatorAssertions.toBeDisabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEditable
* since: v1.20
* langs:
  - alias-java: isEditable

Ensures the [Locator] points to an editable element.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeEditable();
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isEditable();
```

```python async
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_be_editable()
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_be_editable()
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeEditableAsync();
```

### option: LocatorAssertions.toBeEditable.editable
* since: v1.26
- `editable` <[boolean]>

### option: LocatorAssertions.toBeEditable.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEmpty
* since: v1.20
* langs:
  - alias-java: isEmpty

Ensures the [Locator] points to an empty editable element or to a DOM node that has no text.

**Usage**

```js
const locator = page.locator('div.warning');
await expect(locator).toBeEmpty();
```

```java
assertThat(page.locator("div.warning")).isEmpty();
```

```python async
from playwright.async_api import expect

locator = page.locator("div.warning")
await expect(locator).to_be_empty()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("div.warning")
expect(locator).to_be_empty()
```

```csharp
var locator = Page.Locator("div.warning");
await Expect(locator).ToBeEmptyAsync();
```

### option: LocatorAssertions.toBeEmpty.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEnabled
* since: v1.20
* langs:
  - alias-java: isEnabled

Ensures the [Locator] points to an enabled element.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeEnabled();
```

```java
assertThat(page.locator("button.submit")).isEnabled();
```

```python async
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_enabled()
```

```python sync
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_enabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeEnabledAsync();
```

### option: LocatorAssertions.toBeEnabled.enabled
* since: v1.26
- `enabled` <[boolean]>

### option: LocatorAssertions.toBeEnabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeFocused
* since: v1.20
* langs:
  - alias-java: isFocused

Ensures the [Locator] points to a focused DOM node.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeFocused();
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isFocused();
```

```python async
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_be_focused()
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_be_focused()
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeFocusedAsync();
```

### option: LocatorAssertions.toBeFocused.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeHidden
* since: v1.20
* langs:
  - alias-java: isHidden

Ensures that [Locator] either does not resolve to any DOM node, or resolves to a [non-visible](../actionability.md#visible) one.

**Usage**

```js
const locator = page.locator('.my-element');
await expect(locator).toBeHidden();
```

```java
assertThat(page.locator(".my-element")).isHidden();
```

```python async
from playwright.async_api import expect

locator = page.locator('.my-element')
await expect(locator).to_be_hidden()
```

```python sync
from playwright.sync_api import expect

locator = page.locator('.my-element')
expect(locator).to_be_hidden()
```

```csharp
var locator = Page.Locator(".my-element");
await Expect(locator).ToBeHiddenAsync();
```

### option: LocatorAssertions.toBeHidden.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeInViewport
* since: v1.31
* langs:
  - alias-java: isInViewport

Ensures the [Locator] points to an element that intersects viewport, according to the [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

**Usage**

```js
const locator = page.getByRole('button');
// Make sure at least some part of element intersects viewport.
await expect(locator).toBeInViewport();
// Make sure element is fully outside of viewport.
await expect(locator).not.toBeInViewport();
// Make sure that at least half of the element intersects viewport.
await expect(locator).toBeInViewport({ ratio: 0.5 });
```

```java
Locator locator = page.getByRole(AriaRole.BUTTON);
// Make sure at least some part of element intersects viewport.
assertThat(locator).isInViewport();
// Make sure element is fully outside of viewport.
assertThat(locator).not().isInViewport();
// Make sure that at least half of the element intersects viewport.
assertThat(locator).isInViewport(new LocatorAssertions.IsInViewportOptions().setRatio(0.5));
```

```csharp
var locator = Page.GetByRole(AriaRole.Button);
// Make sure at least some part of element intersects viewport.
await Expect(locator).ToBeInViewportAsync();
// Make sure element is fully outside of viewport.
await Expect(locator).Not.ToBeInViewportAsync();
// Make sure that at least half of the element intersects viewport.
await Expect(locator).ToBeInViewportAsync(new() { Ratio = 0.5 });
```

```python async
from playwright.async_api import expect

locator = page.get_by_role("button")
# Make sure at least some part of element intersects viewport.
await expect(locator).to_be_in_viewport()
# Make sure element is fully outside of viewport.
await expect(locator).not_to_be_in_viewport()
# Make sure that at least half of the element intersects viewport.
await expect(locator).to_be_in_viewport(ratio=0.5)
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_role("button")
# Make sure at least some part of element intersects viewport.
expect(locator).to_be_in_viewport()
# Make sure element is fully outside of viewport.
expect(locator).not_to_be_in_viewport()
# Make sure that at least half of the element intersects viewport.
expect(locator).to_be_in_viewport(ratio=0.5)
```


### option: LocatorAssertions.toBeInViewport.ratio
* since: v1.31
- `ratio` <[float]>

The minimal ratio of the element to intersect viewport. If equals to `0`, then
element should intersect viewport at any positive ratio. Defaults to `0`.

### option: LocatorAssertions.toBeInViewport.timeout = %%-js-assertions-timeout-%%
* since: v1.31

### option: LocatorAssertions.toBeInViewport.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.31

## async method: LocatorAssertions.toBeVisible
* since: v1.20
* langs:
  - alias-java: isVisible

Ensures that [Locator] points to an attached and [visible](../actionability.md#visible) DOM node.

To check that at least one element from the list is visible, use [`method: Locator.first`].

**Usage**

```js
// A specific element is visible.
await expect(page.getByText('Welcome')).toBeVisible();

// At least one item in the list is visible.
await expect(page.getByTestId('todo-item').first()).toBeVisible();

// At least one of the two elements is visible, possibly both.
await expect(
    page.getByRole('button', { name: 'Sign in' })
        .or(page.getByRole('button', { name: 'Sign up' }))
        .first()
).toBeVisible();
```

```java
// A specific element is visible.
assertThat(page.getByText("Welcome")).isVisible();

// At least one item in the list is visible.
assertThat(page.getByTestId("todo-item").first()).isVisible();

// At least one of the two elements is visible, possibly both.
assertThat(
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .or(page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign up")))
    .first()
).isVisible();
```

```python async
# A specific element is visible.
await expect(page.get_by_text("Welcome")).to_be_visible()

# At least one item in the list is visible.
await expect(page.get_by_test_id("todo-item").first).to_be_visible()

# At least one of the two elements is visible, possibly both.
await expect(
    page.get_by_role("button", name="Sign in")
    .or_(page.get_by_role("button", name="Sign up"))
    .first
).to_be_visible()
```

```python sync
# A specific element is visible.
expect(page.get_by_text("Welcome")).to_be_visible()

# At least one item in the list is visible.
expect(page.get_by_test_id("todo-item").first).to_be_visible()

# At least one of the two elements is visible, possibly both.
expect(
    page.get_by_role("button", name="Sign in")
    .or_(page.get_by_role("button", name="Sign up"))
    .first
).to_be_visible()
```

```csharp
// A specific element is visible.
await Expect(Page.GetByText("Welcome")).ToBeVisibleAsync();

// At least one item in the list is visible.
await Expect(Page.GetByTestId("todo-item").First).ToBeVisibleAsync();

// At least one of the two elements is visible, possibly both.
await Expect(
  Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
    .Or(Page.GetByRole(AriaRole.Button, new() { Name = "Sign up" }))
    .First
).ToBeVisibleAsync();
```

### option: LocatorAssertions.toBeVisible.visible
* since: v1.26
- `visible` <[boolean]>

### option: LocatorAssertions.toBeVisible.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toContainClass
* since: v1.52
* langs:
  - alias-java: containsClass

Ensures the [Locator] points to an element with given CSS classes. All classes from the asserted value, separated by spaces, must be present in the [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) in any order.

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toContainClass('middle selected row');
await expect(locator).toContainClass('selected');
await expect(locator).toContainClass('row middle');
```

```java
assertThat(page.locator("#component")).containsClass("middle selected row");
assertThat(page.locator("#component")).containsClass("selected");
assertThat(page.locator("#component")).containsClass("row middle");
```

```python async
from playwright.async_api import expect

locator = page.locator("#component")
await expect(locator).to_contain_class("middle selected row")
await expect(locator).to_contain_class("selected")
await expect(locator).to_contain_class("row middle")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("#component")
expect(locator).to_contain_class("middle selected row")
expect(locator).to_contain_class("selected")
expect(locator).to_contain_class("row middle")
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToContainClassAsync("middle selected row");
await Expect(locator).ToContainClassAsync("selected");
await Expect(locator).ToContainClassAsync("row middle");
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class lists. Each element's class attribute is matched against the corresponding class in the array:

```html
<div class='list'>
  <div class='component inactive'></div>
  <div class='component active'></div>
  <div class='component inactive'></div>
</div>
```

```js
const locator = page.locator('.list > .component');
await expect(locator).toContainClass(['inactive', 'active', 'inactive']);
```

```java
assertThat(page.locator(".list > .component")).containsClass(new String[] {"inactive", "active", "inactive"});
```

```python async
from playwright.async_api import expect

locator = page.locator(".list > .component")
await expect(locator).to_contain_class(["inactive", "active", "inactive"])
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".list > .component")
await expect(locator).to_contain_class(["inactive", "active", "inactive"])
```

```csharp
var locator = Page.Locator(".list > .component");
await Expect(locator).ToContainClassAsync(new string[]{"inactive", "active", "inactive"});
```

### param: LocatorAssertions.toContainClass.expected
* since: v1.52
- `expected` <[string]|[Array]<[string]>>

A string containing expected class names, separated by spaces, or a list of such strings to assert multiple elements.

### option: LocatorAssertions.toContainClass.timeout = %%-js-assertions-timeout-%%
* since: v1.52

### option: LocatorAssertions.toContainClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.52

## async method: LocatorAssertions.toContainText
* since: v1.20
* langs:
  - alias-java: containsText

Ensures the [Locator] points to an element that contains the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and
in the expected string before matching. When regular expression is used, the actual text is matched as is.

**Usage**

```js
const locator = page.locator('.title');
await expect(locator).toContainText('substring');
await expect(locator).toContainText(/\d messages/);
```

```java
assertThat(page.locator(".title")).containsText("substring");
```

```python async
import re
from playwright.async_api import expect

locator = page.locator('.title')
await expect(locator).to_contain_text("substring")
await expect(locator).to_contain_text(re.compile(r"\d messages"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator('.title')
expect(locator).to_contain_text("substring")
expect(locator).to_contain_text(re.compile(r"\d messages"))
```

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToContainTextAsync("substring");
await Expect(locator).ToContainTextAsync(new Regex("\\d messages"));
```

If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. Elements from a **subset** of this list contain text from the expected array, respectively.
1. The matching subset of elements has the same order as the expected array.
1. Each text value from the expected array is matched by some element from the list.

For example, consider the following list:

```html
<ul>
  <li>Item Text 1</li>
  <li>Item Text 2</li>
  <li>Item Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Contains the right items in the right order
await expect(page.locator('ul > li')).toContainText(['Text 1', 'Text 3']);

// ✖ Wrong order
await expect(page.locator('ul > li')).toContainText(['Text 3', 'Text 2']);

// ✖ No item contains this text
await expect(page.locator('ul > li')).toContainText(['Some 33']);

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toContainText(['Text 3']);
```

```java
// ✓ Contains the right items in the right order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 1", "Text 3"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).containsText(new String[] {"Text 3", "Text 2"});

// ✖ No item contains this text
assertThat(page.locator("ul > li")).containsText(new String[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).containsText(new String[] {"Text 3"});
```

```python async
from playwright.async_api import expect

# ✓ Contains the right items in the right order
await expect(page.locator("ul > li")).to_contain_text(["Text 1", "Text 3"])

# ✖ Wrong order
await expect(page.locator("ul > li")).to_contain_text(["Text 3", "Text 2"])

# ✖ No item contains this text
await expect(page.locator("ul > li")).to_contain_text(["Some 33"])

# ✖ Locator points to the outer list element, not to the list items
await expect(page.locator("ul")).to_contain_text(["Text 3"])
```

```python sync
from playwright.sync_api import expect

# ✓ Contains the right items in the right order
expect(page.locator("ul > li")).to_contain_text(["Text 1", "Text 3"])

# ✖ Wrong order
expect(page.locator("ul > li")).to_contain_text(["Text 3", "Text 2"])

# ✖ No item contains this text
expect(page.locator("ul > li")).to_contain_text(["Some 33"])

# ✖ Locator points to the outer list element, not to the list items
expect(page.locator("ul")).to_contain_text(["Text 3"])
```

```csharp
// ✓ Contains the right items in the right order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 1", "Text 3"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Text 3", "Text 2"});

// ✖ No item contains this text
await Expect(Page.Locator("ul > li")).ToContainTextAsync(new string[] {"Some 33"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToContainTextAsync(new string[] {"Text 3"});
```

### param: LocatorAssertions.toContainText.expected
* since: v1.18
* langs: js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### param: LocatorAssertions.toContainText.expected
* since: v1.18
* langs: python
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### param: LocatorAssertions.toContainText.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.toContainText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.toContainText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.toContainText.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toContainText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveAccessibleDescription
* since: v1.44
* langs:
  - alias-java: hasAccessibleDescription

Ensures the [Locator] points to an element with a given [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveAccessibleDescription('Save results to disk');
```

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasAccessibleDescription("Save results to disk");
```

```python async
locator = page.get_by_test_id("save-button")
await expect(locator).to_have_accessible_description("Save results to disk")
```

```python sync
locator = page.get_by_test_id("save-button")
expect(locator).to_have_accessible_description("Save results to disk")
```

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveAccessibleDescriptionAsync("Save results to disk");
```

### param: LocatorAssertions.toHaveAccessibleDescription.description
* since: v1.44
- `description` <[string]|[RegExp]>

Expected accessible description.

### option: LocatorAssertions.toHaveAccessibleDescription.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveAccessibleDescription.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveAccessibleDescription.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44


## async method: LocatorAssertions.toHaveAccessibleErrorMessage
* since: v1.50
* langs:
  - alias-java: hasAccessibleErrorMessage

Ensures the [Locator] points to an element with a given [aria errormessage](https://w3c.github.io/aria/#aria-errormessage).

**Usage**

```js
const locator = page.getByTestId('username-input');
await expect(locator).toHaveAccessibleErrorMessage('Username is required.');
```

```java
Locator locator = page.getByTestId("username-input");
assertThat(locator).hasAccessibleErrorMessage("Username is required.");
```

```python async
locator = page.get_by_test_id("username-input")
await expect(locator).to_have_accessible_error_message("Username is required.")
```

```python sync
locator = page.get_by_test_id("username-input")
expect(locator).to_have_accessible_error_message("Username is required.")
```

```csharp
var locator = Page.GetByTestId("username-input");
await Expect(locator).ToHaveAccessibleErrorMessageAsync("Username is required.");
```

### param: LocatorAssertions.toHaveAccessibleErrorMessage.errorMessage
* since: v1.50
- `errorMessage` <[string]|[RegExp]>

Expected accessible error message.

### option: LocatorAssertions.toHaveAccessibleErrorMessage.timeout = %%-js-assertions-timeout-%%
* since: v1.50

### option: LocatorAssertions.toHaveAccessibleErrorMessage.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.50

### option: LocatorAssertions.toHaveAccessibleErrorMessage.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.50


## async method: LocatorAssertions.toHaveAccessibleName
* since: v1.44
* langs:
  - alias-java: hasAccessibleName

Ensures the [Locator] points to an element with a given [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveAccessibleName('Save to disk');
```

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasAccessibleName("Save to disk");
```

```python async
locator = page.get_by_test_id("save-button")
await expect(locator).to_have_accessible_name("Save to disk")
```

```python sync
locator = page.get_by_test_id("save-button")
expect(locator).to_have_accessible_name("Save to disk")
```

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveAccessibleNameAsync("Save to disk");
```

### param: LocatorAssertions.toHaveAccessibleName.name
* since: v1.44
- `name` <[string]|[RegExp]>

Expected accessible name.

### option: LocatorAssertions.toHaveAccessibleName.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveAccessibleName.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveAccessibleName.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44


## async method: LocatorAssertions.toHaveAttribute
* since: v1.20
* langs:
  - alias-java: hasAttribute

Ensures the [Locator] points to an element with given attribute.

**Usage**

```js
const locator = page.locator('input');
await expect(locator).toHaveAttribute('type', 'text');
```

```java
assertThat(page.locator("input")).hasAttribute("type", "text");
```

```python async
from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_attribute("type", "text")
```

```python sync
from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_attribute("type", "text")
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveAttributeAsync("type", "text");
```

### param: LocatorAssertions.toHaveAttribute.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.toHaveAttribute.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### option: LocatorAssertions.toHaveAttribute.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveAttribute.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveAttribute.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.40

## async method: LocatorAssertions.toHaveAttribute#2
* since: v1.39
* langs: js

Ensures the [Locator] points to an element with given attribute. The method will assert attribute
presence.

```js
const locator = page.locator('input');
// Assert attribute existence.
await expect(locator).toHaveAttribute('disabled');
await expect(locator).not.toHaveAttribute('open');
```

### param: LocatorAssertions.toHaveAttribute#2.name
* since: v1.39
- `name` <[string]>

Attribute name.

### option: LocatorAssertions.toHaveAttribute#2.timeout = %%-js-assertions-timeout-%%
* since: v1.39

## async method: LocatorAssertions.toHaveClass
* since: v1.20
* langs:
  - alias-java: hasClass

Ensures the [Locator] points to an element with given CSS classes. When a string is provided, it must fully match the element's `class` attribute. To match individual classes use [`method: LocatorAssertions.toContainClass`].

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toHaveClass('middle selected row');
await expect(locator).toHaveClass(/(^|\s)selected(\s|$)/);
```

```java
assertThat(page.locator("#component")).hasClass("middle selected row");
assertThat(page.locator("#component")).hasClass(Pattern.compile("(^|\\s)selected(\\s|$)"));
```

```python async
from playwright.async_api import expect

locator = page.locator("#component")
await expect(locator).to_have_class("middle selected row")
await expect(locator).to_have_class(re.compile(r"(^|\\s)selected(\\s|$)"))
```

```python sync
from playwright.sync_api import expect

locator = page.locator("#component")
expect(locator).to_have_class("middle selected row")
expect(locator).to_have_class(re.compile(r"(^|\\s)selected(\\s|$)"))
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToHaveClassAsync("middle selected row");
await Expect(locator).ToHaveClassAsync(new Regex("(^|\\s)selected(\\s|$)"));
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class values. Each element's class attribute is matched against the corresponding string or regular expression in the array:

```js
const locator = page.locator('.list > .component');
await expect(locator).toHaveClass(['component', 'component selected', 'component']);
```

```java
assertThat(page.locator(".list > .component")).hasClass(new String[] {"component", "component selected", "component"});
```

```python async
from playwright.async_api import expect

locator = page.locator(".list > .component")
await expect(locator).to_have_class(["component", "component selected", "component"])
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".list > .component")
expect(locator).to_have_class(["component", "component selected", "component"])
```

```csharp
var locator = Page.Locator(".list > .component");
await Expect(locator).ToHaveClassAsync(new string[]{"component", "component selected", "component"});
```

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: python
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.toHaveClass.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveCount
* since: v1.20
* langs:
  - alias-java: hasCount

Ensures the [Locator] resolves to an exact number of DOM nodes.

**Usage**

```js
const list = page.locator('list > .component');
await expect(list).toHaveCount(3);
```

```java
assertThat(page.locator("list > .component")).hasCount(3);
```

```python async
from playwright.async_api import expect

locator = page.locator("list > .component")
await expect(locator).to_have_count(3)
```

```python sync
from playwright.sync_api import expect

locator = page.locator("list > .component")
expect(locator).to_have_count(3)
```

```csharp
var locator = Page.Locator("list > .component");
await Expect(locator).ToHaveCountAsync(3);
```

### param: LocatorAssertions.toHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.toHaveCount.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveCSS
* since: v1.20
* langs:
  - alias-java: hasCSS

Ensures the [Locator] resolves to an element with the given computed CSS style.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveCSS('display', 'flex');
```

```java
assertThat(page.getByRole(AriaRole.BUTTON)).hasCSS("display", "flex");
```

```python async
from playwright.async_api import expect

locator = page.get_by_role("button")
await expect(locator).to_have_css("display", "flex")
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_role("button")
expect(locator).to_have_css("display", "flex")
```

```csharp
var locator = Page.GetByRole(AriaRole.Button);
await Expect(locator).ToHaveCSSAsync("display", "flex");
```

### param: LocatorAssertions.toHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.toHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.toHaveCSS.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveId
* since: v1.20
* langs:
  - alias-java: hasId

Ensures the [Locator] points to an element with the given DOM Node ID.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toHaveId('lastname');
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).hasId("lastname");
```

```python async
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_have_id("lastname")
```

```python sync
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_have_id("lastname")
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToHaveIdAsync("lastname");
```

### param: LocatorAssertions.toHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.toHaveId.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveJSProperty
* since: v1.20
* langs:
  - alias-java: hasJSProperty

Ensures the [Locator] points to an element with given JavaScript property. Note that this property can be
of a primitive type as well as a plain serializable JavaScript object.

**Usage**

```js
const locator = page.locator('.component');
await expect(locator).toHaveJSProperty('loaded', true);
```

```java
assertThat(page.locator("input")).hasJSProperty("loaded", true);
```

```python async
from playwright.async_api import expect

locator = page.locator(".component")
await expect(locator).to_have_js_property("loaded", True)
```

```python sync
from playwright.sync_api import expect

locator = page.locator(".component")
expect(locator).to_have_js_property("loaded", True)
```

```csharp
var locator = Page.Locator(".component");
await Expect(locator).ToHaveJSPropertyAsync("loaded", true);
```

### param: LocatorAssertions.toHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.toHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.toHaveJSProperty.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18


## async method: LocatorAssertions.toHaveRole
* since: v1.44
* langs:
  - alias-java: hasRole

Ensures the [Locator] points to an element with a given [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles).

Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass role `"checkbox"` on an element with a subclass role `"switch"` will fail.

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveRole('button');
```

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasRole(AriaRole.BUTTON);
```

```python async
locator = page.get_by_test_id("save-button")
await expect(locator).to_have_role("button")
```

```python sync
locator = page.get_by_test_id("save-button")
expect(locator).to_have_role("button")
```

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveRoleAsync(AriaRole.Button);
```

### param: LocatorAssertions.toHaveRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.44

### option: LocatorAssertions.toHaveRole.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveRole.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44


## async method: LocatorAssertions.toHaveScreenshot#1
* since: v1.23
* langs: js

This function will wait until two consecutive locator screenshots
yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveScreenshot('image.png');
```

Note that screenshot assertions only work with Playwright test runner.

### param: LocatorAssertions.toHaveScreenshot#1.name
* since: v1.23
- `name` <[string]|[Array]<[string]>>

Snapshot name.

### option: LocatorAssertions.toHaveScreenshot#1.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.caret = %%-screenshot-option-caret-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.mask = %%-screenshot-option-mask-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.35

### option: LocatorAssertions.toHaveScreenshot#1.stylePath = %%-screenshot-option-style-path-%%
* since: v1.41

### option: LocatorAssertions.toHaveScreenshot#1.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.threshold = %%-assertions-threshold-%%
* since: v1.23

## async method: LocatorAssertions.toHaveScreenshot#2
* since: v1.23
* langs: js

This function will wait until two consecutive locator screenshots
yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveScreenshot();
```

Note that screenshot assertions only work with Playwright test runner.

### option: LocatorAssertions.toHaveScreenshot#2.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.caret = %%-screenshot-option-caret-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.mask = %%-screenshot-option-mask-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.35

### option: LocatorAssertions.toHaveScreenshot#2.stylePath = %%-screenshot-option-style-path-%%
* since: v1.41

### option: LocatorAssertions.toHaveScreenshot#2.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#2.threshold = %%-assertions-threshold-%%
* since: v1.23

## async method: LocatorAssertions.toHaveText
* since: v1.20
* langs:
  - alias-java: hasText

Ensures the [Locator] points to an element with the given text. All nested elements will be considered when computing the text content of the element. You can use regular expressions for the value as well.

**Details**

When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual text and
in the expected string before matching. When regular expression is used, the actual text is matched as is.

**Usage**

```js
const locator = page.locator('.title');
await expect(locator).toHaveText(/Welcome, Test User/);
await expect(locator).toHaveText(/Welcome, .*/);
```

```java
assertThat(page.locator(".title")).hasText("Welcome, Test User");
assertThat(page.locator(".title")).hasText(Pattern.compile("Welcome, .*"));
```

```python async
import re
from playwright.async_api import expect

locator = page.locator(".title")
await expect(locator).to_have_text(re.compile(r"Welcome, Test User"))
await expect(locator).to_have_text(re.compile(r"Welcome, .*"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator(".title")
expect(locator).to_have_text(re.compile(r"Welcome, Test User"))
expect(locator).to_have_text(re.compile(r"Welcome, .*"))
```

```csharp
var locator = Page.Locator(".title");
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, Test User"));
await Expect(locator).ToHaveTextAsync(new Regex("Welcome, .*"));
```

If you pass an array as an expected value, the expectations are:
1. Locator resolves to a list of elements.
1. The number of elements equals the number of expected values in the array.
1. Elements from the list have text matching expected array values, one by one, in order.

For example, consider the following list:

```html
<ul>
  <li>Text 1</li>
  <li>Text 2</li>
  <li>Text 3</li>
</ul>
```

Let's see how we can use the assertion:

```js
// ✓ Has the right items in the right order
await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text 3']);

// ✖ Wrong order
await expect(page.locator('ul > li')).toHaveText(['Text 3', 'Text 2', 'Text 1']);

// ✖ Last item does not match
await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text']);

// ✖ Locator points to the outer list element, not to the list items
await expect(page.locator('ul')).toHaveText(['Text 1', 'Text 2', 'Text 3']);
```

```java
// ✓ Has the right items in the right order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
assertThat(page.locator("ul > li")).hasText(new String[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
assertThat(page.locator("ul")).hasText(new String[] {"Text 1", "Text 2", "Text 3"});
```

```python async
from playwright.async_api import expect

# ✓ Has the right items in the right order
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text 3"])

# ✖ Wrong order
await expect(page.locator("ul > li")).to_have_text(["Text 3", "Text 2", "Text 1"])

# ✖ Last item does not match
await expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text"])

# ✖ Locator points to the outer list element, not to the list items
await expect(page.locator("ul")).to_have_text(["Text 1", "Text 2", "Text 3"])
```

```python sync
from playwright.sync_api import expect

# ✓ Has the right items in the right order
expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text 3"])

# ✖ Wrong order
expect(page.locator("ul > li")).to_have_text(["Text 3", "Text 2", "Text 1"])

# ✖ Last item does not match
expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text"])

# ✖ Locator points to the outer list element, not to the list items
expect(page.locator("ul")).to_have_text(["Text 1", "Text 2", "Text 3"])
```

```csharp
// ✓ Has the right items in the right order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});

// ✖ Wrong order
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 3", "Text 2", "Text 1"});

// ✖ Last item does not match
await Expect(Page.Locator("ul > li")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text"});

// ✖ Locator points to the outer list element, not to the list items
await Expect(Page.Locator("ul")).ToHaveTextAsync(new string[] {"Text 1", "Text 2", "Text 3"});
```

### param: LocatorAssertions.toHaveText.expected
* since: v1.18
* langs: js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected string or RegExp or a list of those.

### param: LocatorAssertions.toHaveText.expected
* since: v1.18
* langs: python
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected string or RegExp or a list of those.

### param: LocatorAssertions.toHaveText.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected string or RegExp or a list of those.

### option: LocatorAssertions.toHaveText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.toHaveText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.toHaveText.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveValue
* since: v1.20
* langs:
  - alias-java: hasValue

Ensures the [Locator] points to an element with the given input value. You can use regular expressions for the value as well.

**Usage**

```js
const locator = page.locator('input[type=number]');
await expect(locator).toHaveValue(/[0-9]/);
```

```java
assertThat(page.locator("input[type=number]")).hasValue(Pattern.compile("[0-9]"));
```

```python async
import re
from playwright.async_api import expect

locator = page.locator("input[type=number]")
await expect(locator).to_have_value(re.compile(r"[0-9]"))
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator("input[type=number]")
expect(locator).to_have_value(re.compile(r"[0-9]"))
```

```csharp
var locator = Page.Locator("input[type=number]");
await Expect(locator).ToHaveValueAsync(new Regex("[0-9]"));
```

### param: LocatorAssertions.toHaveValue.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected value.

### option: LocatorAssertions.toHaveValue.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveValue.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveValues
* since: v1.23
* langs:
  - alias-java: hasValues

Ensures the [Locator] points to multi-select/combobox (i.e. a `select` with the `multiple` attribute) and the specified values are selected.

**Usage**

For example, given the following element:

```html
<select id="favorite-colors" multiple>
  <option value="R">Red</option>
  <option value="G">Green</option>
  <option value="B">Blue</option>
</select>
```

```js
const locator = page.locator('id=favorite-colors');
await locator.selectOption(['R', 'G']);
await expect(locator).toHaveValues([/R/, /G/]);
```

```java
page.locator("id=favorite-colors").selectOption(new String[]{"R", "G"});
assertThat(page.locator("id=favorite-colors")).hasValues(new Pattern[] { Pattern.compile("R"), Pattern.compile("G") });
```

```python async
import re
from playwright.async_api import expect

locator = page.locator("id=favorite-colors")
await locator.select_option(["R", "G"])
await expect(locator).to_have_values([re.compile(r"R"), re.compile(r"G")])
```

```python sync
import re
from playwright.sync_api import expect

locator = page.locator("id=favorite-colors")
locator.select_option(["R", "G"])
expect(locator).to_have_values([re.compile(r"R"), re.compile(r"G")])
```

```csharp
var locator = Page.Locator("id=favorite-colors");
await locator.SelectOptionAsync(new string[] { "R", "G" });
await Expect(locator).ToHaveValuesAsync(new Regex[] { new Regex("R"), new Regex("G") });
```

### param: LocatorAssertions.toHaveValues.values
* since: v1.23
* langs: js
- `values` <[Array]<[string]|[RegExp]>>

Expected options currently selected.

### param: LocatorAssertions.toHaveValues.values
* since: v1.23
* langs: python
- `values` <[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected options currently selected.

### param: LocatorAssertions.toHaveValues.values
* since: v1.23
* langs: java, csharp
- `values` <[Array]<[string]>|[Array]<[RegExp]>>

Expected options currently selected.

### option: LocatorAssertions.toHaveValues.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: LocatorAssertions.toHaveValues.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.23


## async method: LocatorAssertions.toMatchAriaSnapshot
* since: v1.49
* langs:
  - alias-java: matchesAriaSnapshot

Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.md).

**Usage**

```js
await page.goto('https://demo.playwright.dev/todomvc/');
await expect(page.locator('body')).toMatchAriaSnapshot(`
  - heading "todos"
  - textbox "What needs to be done?"
`);
```

```python async
await page.goto("https://demo.playwright.dev/todomvc/")
await expect(page.locator('body')).to_match_aria_snapshot('''
  - heading "todos"
  - textbox "What needs to be done?"
''')
```

```python sync
page.goto("https://demo.playwright.dev/todomvc/")
expect(page.locator('body')).to_match_aria_snapshot('''
  - heading "todos"
  - textbox "What needs to be done?"
''')
```

```csharp
await page.GotoAsync("https://demo.playwright.dev/todomvc/");
await Expect(page.Locator("body")).ToMatchAriaSnapshotAsync(@"
  - heading ""todos""
  - textbox ""What needs to be done?""
");
```

```java
page.navigate("https://demo.playwright.dev/todomvc/");
assertThat(page.locator("body")).matchesAriaSnapshot("""
  - heading "todos"
  - textbox "What needs to be done?"
""");
```

### param: LocatorAssertions.toMatchAriaSnapshot.expected
* since: v1.49
- `expected` <string>

### option: LocatorAssertions.toMatchAriaSnapshot.timeout = %%-js-assertions-timeout-%%
* since: v1.49

### option: LocatorAssertions.toMatchAriaSnapshot.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.49

## async method: LocatorAssertions.toMatchAriaSnapshot#2
* since: v1.50
* langs: js

Asserts that the target element matches the given [accessibility snapshot](../aria-snapshots.md).

Snapshot is stored in a separate `.aria.yml` file in a location configured by `expect.toMatchAriaSnapshot.pathTemplate` and/or `snapshotPathTemplate` properties in the configuration file.

**Usage**

```js
await expect(page.locator('body')).toMatchAriaSnapshot();
await expect(page.locator('body')).toMatchAriaSnapshot({ name: 'body.aria.yml' });
```

### option: LocatorAssertions.toMatchAriaSnapshot#2.name
* since: v1.50
* langs: js
- `name` <[string]>

Name of the snapshot to store in the snapshot folder corresponding to this test.
Generates sequential names if not specified.

### option: LocatorAssertions.toMatchAriaSnapshot#2.timeout = %%-js-assertions-timeout-%%
* since: v1.50

### option: LocatorAssertions.toMatchAriaSnapshot#2.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.50
# class: APIRequestContext
* since: v1.16

This API is used for the Web API testing. You can use it to trigger API endpoints, configure micro-services, prepare
environment or the service to your e2e test.

Each Playwright browser context has associated with it [APIRequestContext] instance which shares cookie storage with
the browser context and can be accessed via [`property: BrowserContext.request`] or [`property: Page.request`].
It is also possible to create a new APIRequestContext instance manually by calling [`method: APIRequest.newContext`].

**Cookie management**

[APIRequestContext] returned by [`property: BrowserContext.request`] and [`property: Page.request`] shares cookie
storage with the corresponding [BrowserContext]. Each API request will have `Cookie` header populated with the
values from the browser context. If the API response contains `Set-Cookie` header it will automatically update
[BrowserContext] cookies and requests made from the page will pick them up. This means that if you log in using
this API, your e2e test will be logged in and vice versa.

If you want API requests to not interfere with the browser cookies you should create a new [APIRequestContext] by
calling [`method: APIRequest.newContext`]. Such `APIRequestContext` object will have its own isolated cookie
storage.

```python async
import os
import asyncio
from playwright.async_api import async_playwright, Playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

async def run(playwright: Playwright):
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = await playwright.chromium.launch()
    context = await browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = await context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = await playwright.request.new_context(base_url="https://api.github.com")

    # Create a repository.
    response = await api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()["name"] == REPO

    # Delete a repository.
    response = await api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```

```python sync
import os
from playwright.sync_api import sync_playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

with sync_playwright() as p:
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = p.chromium.launch()
    context = browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = p.request.new_context(base_url="https://api.github.com")


    # Create a repository.
    response = api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()["name"] == REPO

    # Delete a repository.
    response = api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"token {API_TOKEN}",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'
```

## method: APIRequestContext.createFormData
* since: v1.23
* langs: csharp
- returns: <[FormData]>

Creates a new [FormData] instance which is used for providing form and multipart data when making HTTP requests.

## async method: APIRequestContext.delete
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.delete.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.delete.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.delete.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.delete.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.delete.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.delete.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.delete.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.delete.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-js-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-python-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-csharp-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-js-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-python-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.delete.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.delete.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.delete.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.delete.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.dispose
* since: v1.16

All responses returned by [`method: APIRequestContext.get`] and similar methods are stored in the memory, so that you can later call [`method: APIResponse.body`].This method discards all its resources, calling any method on disposed [APIRequestContext] will throw an exception.

### option: APIRequestContext.dispose.reason
* since: v1.45
- `reason` <[string]>

The reason to be reported to the operations interrupted by the context disposal.

## async method: APIRequestContext.fetch
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) request and returns its response. The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.fetch('https://example.com/api/createBook', {
  method: 'post',
  data: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

```java
Map<String, Object> data = new HashMap();
data.put("title", "Book Title");
data.put("body", "John Doe");
request.fetch("https://example.com/api/createBook", RequestOptions.create().setMethod("post").setData(data));
```

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.fetch("https://example.com/api/createBook", method="post", data=data)
```

```csharp
var data = new Dictionary<string, object>() {
  { "title", "Book Title" },
  { "body", "John Doe" }
};
await Request.FetchAsync("https://example.com/api/createBook", new() { Method = "post", DataObject = data });
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding, by specifiying the `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File(['console.log(2024);'], 'f1.js', { type: 'text/javascript' }));
form.append('file', new File(['hello'], 'f2.txt', { type: 'text/plain' }));
await request.fetch('https://example.com/api/uploadForm', {
  multipart: form
});
```

```java
// Pass file path to the form data constructor:
Path file = Paths.get("team.csv");
APIResponse response = request.fetch("https://example.com/api/uploadTeamList",
  RequestOptions.create().setMethod("post").setMultipart(
    FormData.create().set("fileField", file)));

// Or you can pass the file content directly as FilePayload object:
FilePayload filePayload = new FilePayload("f.js", "text/javascript",
      "console.log(2022);".getBytes(StandardCharsets.UTF_8));
APIResponse response = request.fetch("https://example.com/api/uploadScript",
  RequestOptions.create().setMethod("post").setMultipart(
    FormData.create().set("fileField", filePayload)));
```

```python
api_request_context.fetch(
  "https://example.com/api/uploadScript",  method="post",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
```

```csharp
var file = new FilePayload()
{
    Name = "f.js",
    MimeType = "text/javascript",
    Buffer = System.Text.Encoding.UTF8.GetBytes("console.log(2022);")
};
var multipart = Context.APIRequest.CreateFormData();
multipart.Set("fileField", file);
await Request.FetchAsync("https://example.com/api/uploadScript", new() { Method = "post", Multipart = multipart });
```


### param: APIRequestContext.fetch.urlOrRequest
* since: v1.16
- `urlOrRequest` <[string]|[Request]>

Target URL or Request to get all parameters from.

### option: APIRequestContext.fetch.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.fetch.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.fetch.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.fetch.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.fetch.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.fetch.method
* since: v1.16
* langs: js, python, csharp
- `method` <[string]>

If set changes the fetch method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or
[POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)). If not specified, GET method is used.

### option: APIRequestContext.fetch.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.fetch.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.fetch.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.fetch.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.fetch.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.fetch.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.get
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

Request parameters can be configured with `params` option, they will be serialized into the URL search parameters:

```js
// Passing params as object
await request.get('https://example.com/api/getText', {
  params: {
    'isbn': '1234',
    'page': 23,
  }
});

// Passing params as URLSearchParams
const searchParams = new URLSearchParams();
searchParams.set('isbn', '1234');
searchParams.append('page', 23);
searchParams.append('page', 24);
await request.get('https://example.com/api/getText', { params: searchParams });

// Passing params as string
const queryString = 'isbn=1234&page=23&page=24';
await request.get('https://example.com/api/getText', { params: queryString });
```

```java
request.get("https://example.com/api/getText", RequestOptions.create()
  .setQueryParam("isbn", "1234")
  .setQueryParam("page", 23));
```

```python
query_params = {
  "isbn": "1234",
  "page": "23"
}
api_request_context.get("https://example.com/api/getText", params=query_params)
```

```csharp
var queryParams = new Dictionary<string, object>()
{
  { "isbn", "1234" },
  { "page", 23 },
};
await request.GetAsync("https://example.com/api/getText", new() { Params = queryParams });
```

### param: APIRequestContext.get.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.get.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.get.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.get.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.get.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.get.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.get.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.get.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-js-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-python-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-csharp-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-js-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-python-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.get.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.get.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.get.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.get.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.head
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.head.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.head.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.head.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.head.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.head.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.head.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.head.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.head.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-python-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-js-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-csharp-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-js-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-python-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.head.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.head.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.head.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.head.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.patch
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.patch.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.patch.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.patch.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.patch.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.patch.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.patch.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.patch.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.patch.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.patch.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.patch.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.patch.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.patch.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.post
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.post('https://example.com/api/createBook', {
  data: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

```java
Map<String, Object> data = new HashMap();
data.put("title", "Book Title");
data.put("body", "John Doe");
request.post("https://example.com/api/createBook", RequestOptions.create().setData(data));
```

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/createBook", data=data)
```

```csharp
var data = new Dictionary<string, object>() {
  { "firstName", "John" },
  { "lastName", "Doe" }
};
await request.PostAsync("https://example.com/api/createBook", new() { DataObject = data });
```

To send form data to the server use `form` option. Its value will be encoded into the request body with `application/x-www-form-urlencoded` encoding (see below how to use `multipart/form-data` form encoding to send files):

```js
await request.post('https://example.com/api/findBook', {
  form: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

```java
request.post("https://example.com/api/findBook", RequestOptions.create().setForm(
    FormData.create().set("title", "Book Title").set("body", "John Doe")
));
```

```python
formData = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/findBook", form=formData)
```

```csharp
var formData = Context.APIRequest.CreateFormData();
formData.Set("title", "Book Title");
formData.Set("body", "John Doe");
await request.PostAsync("https://example.com/api/findBook", new() { Form = formData });
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding. Use [FormData] to construct request body and pass it to the request as `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File(['console.log(2024);'], 'f1.js', { type: 'text/javascript' }));
form.append('file', new File(['hello'], 'f2.txt', { type: 'text/plain' }));
await request.post('https://example.com/api/uploadForm', {
  multipart: form
});
```

```java
// Pass file path to the form data constructor:
Path file = Paths.get("team.csv");
APIResponse response = request.post("https://example.com/api/uploadTeamList",
  RequestOptions.create().setMultipart(
    FormData.create().set("fileField", file)));

// Or you can pass the file content directly as FilePayload object:
FilePayload filePayload1 = new FilePayload("f1.js", "text/javascript",
      "console.log(2022);".getBytes(StandardCharsets.UTF_8));
APIResponse response = request.post("https://example.com/api/uploadScript",
  RequestOptions.create().setMultipart(
    FormData.create().set("fileField", filePayload)));
```

```python
api_request_context.post(
  "https://example.com/api/uploadScript'",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
```

```csharp
var file = new FilePayload()
{
    Name = "f.js",
    MimeType = "text/javascript",
    Buffer = System.Text.Encoding.UTF8.GetBytes("console.log(2022);")
};
var multipart = Context.APIRequest.CreateFormData();
multipart.Set("fileField", file);
await request.PostAsync("https://example.com/api/uploadScript", new() { Multipart = multipart });
```

### param: APIRequestContext.post.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.post.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.post.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.post.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.post.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.post.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.post.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.post.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.post.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.post.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.post.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.post.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.put
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.put.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.put.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.put.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.put.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.put.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.put.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.put.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.put.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.put.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.put.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.put.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.put.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.storageState
* since: v1.16
- returns: <[Object]>
  - `cookies` <[Array]<[Object]>>
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]>
    - `path` <[string]>
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` <[SameSiteAttribute]<"Strict"|"Lax"|"None">>
  - `origins` <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` <[Array]<[Object]>>
      - `name` <[string]>
      - `value` <[string]>

Returns storage state for this request context, contains current cookies and local storage snapshot if it was passed to the constructor.

## async method: APIRequestContext.storageState
* since: v1.16
* langs: java, csharp
- returns: <[string]>

### option: APIRequestContext.storageState.path = %%-storagestate-option-path-%%
* since: v1.16

### option: APIRequestContext.storageState.indexedDB
* since: v1.51
- `indexedDB` ?<boolean>

Set to `true` to include IndexedDB in the storage state snapshot.
# class: Logger
* since: v1.8
* langs: js
* deprecated: This class is deprecated. The logs pumped through this class are incomplete. Please use tracing instead.

Playwright generates a lot of logs and they are accessible via the pluggable logger sink.

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch({
    logger: {
      isEnabled: (name, severity) => name === 'api',
      log: (name, severity, message, args) => console.log(`${name} ${message}`)
    }
  });
  // ...
})();
```

## method: Logger.isEnabled
* since: v1.8
- returns: <[boolean]>

Determines whether sink is interested in the logger with the given name and severity.

### param: Logger.isEnabled.name
* since: v1.8
- `name` <[string]>

logger name

### param: Logger.isEnabled.severity
* since: v1.8
- `severity` <[LogSeverity]<"verbose"|"info"|"warning"|"error">>

## method: Logger.log
* since: v1.8

### param: Logger.log.name
* since: v1.8
- `name` <[string]>

logger name

### param: Logger.log.severity
* since: v1.8
- `severity` <[LogSeverity]<"verbose"|"info"|"warning"|"error">>

### param: Logger.log.message
* since: v1.8
- `message` <[string]|[Error]>

log message format

### param: Logger.log.args
* since: v1.8
- `args` <[Array]<[Object]>>

message arguments

### param: Logger.log.hints
* since: v1.8
- `hints` <[Object]>
  - `color` ?<[string]> Optional preferred logger color.

optional formatting hints
# class: FormData
* since: v1.18
* langs: java, csharp

The [FormData] is used create form data that is sent via [APIRequestContext].

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    .set("firstName", "John")
    .set("lastName", "Doe")
    .set("age", 30);
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```

## method: FormData.append
* since: v1.44
- returns: <[FormData]>

Appends a new value onto an existing key inside a FormData object, or adds the key if it
does not already exist. File values can be passed either as `Path` or as `FilePayload`.
Multiple fields with the same name can be added.

The difference between [`method: FormData.set`] and [`method: FormData.append`] is that if the specified key already exists,
[`method: FormData.set`] will overwrite all existing values with the new one, whereas [`method: FormData.append`] will append
the new value onto the end of the existing set of values.

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    // Only name and value are set.
    .append("firstName", "John")
    // Name and value are set, filename and Content-Type are inferred from the file path.
    .append("attachment", Paths.get("pic.jpg"))
    // Name, value, filename and Content-Type are set.
    .append("attachment", new FilePayload("table.csv", "text/csv", Files.readAllBytes(Paths.get("my-tble.csv"))));
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```

```csharp
var multipart = Context.APIRequest.CreateFormData();
// Only name and value are set.
multipart.Append("firstName", "John");
// Name, value, filename and Content-Type are set.
multipart.Append("attachment", new FilePayload()
{
    Name = "pic.jpg",
    MimeType = "image/jpeg",
    Buffer = File.ReadAllBytes("john.jpg")
});
// Name, value, filename and Content-Type are set.
multipart.Append("attachment", new FilePayload()
{
    Name = "table.csv",
    MimeType = "text/csv",
    Buffer = File.ReadAllBytes("my-tble.csv")
});
await Page.APIRequest.PostAsync("https://localhost/submit", new() { Multipart = multipart });
```

### param: FormData.append.name
* since: v1.44
- `name` <[string]>

Field name.

### param: FormData.append.value
* since: v1.44
- `value` <[string]|[boolean]|[int]|[Path]|[Object]>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Field value.

### param: FormData.append.value
* since: v1.44
* langs: csharp
- `value` <[string]|[boolean]|[int]|[Object]>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Field value.

## method: FormData.create
* since: v1.18
* langs: java
- returns: <[FormData]>

Creates new instance of [FormData].

## method: FormData.set
* since: v1.18
- returns: <[FormData]>

Sets a field on the form. File values can be passed either as `Path` or as `FilePayload`.

```java
import com.microsoft.playwright.options.FormData;
// ...
FormData form = FormData.create()
    // Only name and value are set.
    .set("firstName", "John")
    // Name and value are set, filename and Content-Type are inferred from the file path.
    .set("profilePicture1", Paths.get("john.jpg"))
    // Name, value, filename and Content-Type are set.
    .set("profilePicture2", new FilePayload("john.jpg", "image/jpeg", Files.readAllBytes(Paths.get("john.jpg"))))
    .set("age", 30);
page.request().post("http://localhost/submit", RequestOptions.create().setForm(form));
```

```csharp
var multipart = Context.APIRequest.CreateFormData();
// Only name and value are set.
multipart.Set("firstName", "John");
// Name, value, filename and Content-Type are set.
multipart.Set("profilePicture", new FilePayload()
{
    Name = "john.jpg",
    MimeType = "image/jpeg",
    Buffer = File.ReadAllBytes("john.jpg")
});
multipart.Set("age", 30);
await Page.APIRequest.PostAsync("https://localhost/submit", new() { Multipart = multipart });
```

### param: FormData.set.name
* since: v1.18
- `name` <[string]>

Field name.

### param: FormData.set.value
* since: v1.18
- `value` <[string]|[boolean]|[int]|[Path]|[Object]>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Field value.

### param: FormData.set.value
* since: v1.18
* langs: csharp
- `value` <[string]|[boolean]|[int]|[Object]>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Field value.
# class: AndroidDevice
* since: v1.9
* langs: js

[AndroidDevice] represents a connected device, either real hardware or emulated. Devices can be obtained using [`method: Android.devices`].

## event: AndroidDevice.close
* since: v1.28
- argument: <[AndroidDevice]>

Emitted when the device connection gets closed.

## event: AndroidDevice.webView
* since: v1.9
- argument: <[AndroidWebView]>

Emitted when a new WebView instance is detected.

## async method: AndroidDevice.close
* since: v1.9

Disconnects from the device.

## async method: AndroidDevice.drag
* since: v1.9

Drags the widget defined by [`param: selector`] towards [`param: dest`] point.

### param: AndroidDevice.drag.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to drag.

### param: AndroidDevice.drag.dest
* since: v1.9
- `dest` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

Point to drag to.

### option: AndroidDevice.drag.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the drag in pixels per second.

### option: AndroidDevice.drag.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.fill
* since: v1.9

Fills the specific [`param: selector`] input box with [`param: text`].

### param: AndroidDevice.fill.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to fill.

### param: AndroidDevice.fill.text
* since: v1.9
- `text` <[string]>

Text to be filled in the input box.

### option: AndroidDevice.fill.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.fling
* since: v1.9

Flings the widget defined by [`param: selector`] in  the specified [`param: direction`].

### param: AndroidDevice.fling.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to fling.

### param: AndroidDevice.fling.direction
* since: v1.9
- `direction` <[AndroidFlingDirection]<"down"|"up"|"left"|"right">>

Fling direction.

### option: AndroidDevice.fling.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the fling in pixels per second.

### option: AndroidDevice.fling.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.info
* since: v1.9
- returns: <[AndroidElementInfo]>

Returns information about a widget defined by [`param: selector`].

### param: AndroidDevice.info.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to return information about.

## property: AndroidDevice.input
* since: v1.9
- type: <[AndroidInput]>

## async method: AndroidDevice.installApk
* since: v1.9

Installs an apk on the device.

### param: AndroidDevice.installApk.file
* since: v1.9
- `file` <[string]|[Buffer]>

Either a path to the apk file, or apk file content.

### option: AndroidDevice.installApk.args
* since: v1.9
- `args` <[Array]<[string]>>

Optional arguments to pass to the `shell:cmd package install` call. Defaults to `-r -t -S`.

## async method: AndroidDevice.launchBrowser
* since: v1.9
- returns: <[BrowserContext]>

Launches Chrome browser on the device, and returns its persistent context.

### option: AndroidDevice.launchBrowser.pkg
* since: v1.9
- `pkg` <[string]>

Optional package name to launch instead of default Chrome for Android.

### option: AndroidDevice.launchBrowser.-inline- = %%-shared-context-params-list-v1.8-%%
* since: v1.9

### option: AndroidDevice.launchBrowser.proxy = %%-browser-option-proxy-%%
* since: v1.29

### option: AndroidDevice.launchBrowser.args = %%-browser-option-args-%%
* since: v1.29

## async method: AndroidDevice.longTap
* since: v1.9

Performs a long tap on the widget defined by [`param: selector`].

### param: AndroidDevice.longTap.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to tap on.

### option: AndroidDevice.longTap.timeout = %%-android-timeout-%%
* since: v1.9

## method: AndroidDevice.model
* since: v1.9
- returns: <[string]>

Device model.

## async method: AndroidDevice.open
* since: v1.9
- returns: <[AndroidSocket]>

Launches a process in the shell on the device and returns a socket to communicate with the launched process.

### param: AndroidDevice.open.command
* since: v1.9
- `command` <[string]>

Shell command to execute.

## async method: AndroidDevice.pinchClose
* since: v1.9

Pinches the widget defined by [`param: selector`] in the closing direction.

### param: AndroidDevice.pinchClose.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to pinch close.

### param: AndroidDevice.pinchClose.percent
* since: v1.9
- `percent` <[float]>

The size of the pinch as a percentage of the widget's size.

### option: AndroidDevice.pinchClose.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the pinch in pixels per second.

### option: AndroidDevice.pinchClose.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.pinchOpen
* since: v1.9

Pinches the widget defined by [`param: selector`] in the open direction.

### param: AndroidDevice.pinchOpen.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to pinch open.

### param: AndroidDevice.pinchOpen.percent
* since: v1.9
- `percent` <[float]>

The size of the pinch as a percentage of the widget's size.

### option: AndroidDevice.pinchOpen.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the pinch in pixels per second.

### option: AndroidDevice.pinchOpen.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.press
* since: v1.9

Presses the specific [`param: key`] in the widget defined by [`param: selector`].

### param: AndroidDevice.press.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to press the key in.

### param: AndroidDevice.press.key
* since: v1.9
- `key` <[AndroidKey]>

The key to press.

### option: AndroidDevice.press.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.push
* since: v1.9

Copies a file to the device.

### param: AndroidDevice.push.file
* since: v1.9
- `file` <[string]|[Buffer]>

Either a path to the file, or file content.

### param: AndroidDevice.push.path
* since: v1.9
- `path` <[string]>

Path to the file on the device.

### option: AndroidDevice.push.mode
* since: v1.9
- `mode` <[int]>

Optional file mode, defaults to `644` (`rw-r--r--`).

## async method: AndroidDevice.screenshot
* since: v1.9
- returns: <[Buffer]>

Returns the buffer with the captured screenshot of the device.

### option: AndroidDevice.screenshot.path
* since: v1.9
- `path` <[path]>

The file path to save the image to. If [`option: path`] is a
relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be
saved to the disk.

## async method: AndroidDevice.scroll
* since: v1.9

Scrolls the widget defined by [`param: selector`] in  the specified [`param: direction`].

### param: AndroidDevice.scroll.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to scroll.

### param: AndroidDevice.scroll.direction
* since: v1.9
- `direction` <[AndroidScrollDirection]<"down"|"up"|"left"|"right">>

Scroll direction.

### param: AndroidDevice.scroll.percent
* since: v1.9
- `percent` <[float]>

Distance to scroll as a percentage of the widget's size.

### option: AndroidDevice.scroll.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the scroll in pixels per second.

### option: AndroidDevice.scroll.timeout = %%-android-timeout-%%
* since: v1.9

## method: AndroidDevice.serial
* since: v1.9
- returns: <[string]>

Device serial number.

## method: AndroidDevice.setDefaultTimeout
* since: v1.9

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

### param: AndroidDevice.setDefaultTimeout.timeout
* since: v1.9
- `timeout` <[float]>

Maximum time in milliseconds

## async method: AndroidDevice.shell
* since: v1.9
- returns: <[Buffer]>

Executes a shell command on the device and returns its output.

### param: AndroidDevice.shell.command
* since: v1.9
- `command` <[string]>

Shell command to execute.

## async method: AndroidDevice.swipe
* since: v1.9

Swipes the widget defined by [`param: selector`] in  the specified [`param: direction`].

### param: AndroidDevice.swipe.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to swipe.

### param: AndroidDevice.swipe.direction
* since: v1.9
- `direction` <[AndroidSwipeDirection]<"down"|"up"|"left"|"right">>

Swipe direction.

### param: AndroidDevice.swipe.percent
* since: v1.9
- `percent` <[float]>

Distance to swipe as a percentage of the widget's size.

### option: AndroidDevice.swipe.speed
* since: v1.9
- `speed` <[float]>

Optional speed of the swipe in pixels per second.

### option: AndroidDevice.swipe.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.tap
* since: v1.9

Taps on the widget defined by [`param: selector`].

### param: AndroidDevice.tap.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to tap on.

### option: AndroidDevice.tap.duration
* since: v1.9
- `duration` <[float]>

Optional duration of the tap in milliseconds.

### option: AndroidDevice.tap.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.wait
* since: v1.9

Waits for the specific [`param: selector`] to either appear or disappear, depending on the [`option: state`].

### param: AndroidDevice.wait.selector
* since: v1.9
- `selector` <[AndroidSelector]>

Selector to wait for.

### option: AndroidDevice.wait.state
* since: v1.9
- `state` <[AndroidDeviceState]<"gone">>

Optional state. Can be either:
* default - wait for element to be present.
* `'gone'` - wait for element to not be present.

### option: AndroidDevice.wait.timeout = %%-android-timeout-%%
* since: v1.9

## async method: AndroidDevice.waitForEvent
* since: v1.9
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value.

### param: AndroidDevice.waitForEvent.event = %%-wait-for-event-event-%%
* since: v1.9

### param: AndroidDevice.waitForEvent.optionsOrPredicate
* since: v1.9
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to
    disable timeout. The default value can be changed by using the [`method: AndroidDevice.setDefaultTimeout`].

Either a predicate that receives an event or an options object. Optional.

## async method: AndroidDevice.webView
* since: v1.9
- returns: <[AndroidWebView]>

This method waits until [AndroidWebView] matching the [`param: selector`] is opened and returns it. If there is already an open [AndroidWebView] matching the [`param: selector`], returns immediately.

### param: AndroidDevice.webView.selector
* since: v1.9
- `selector` <[Object]>
  - `pkg` ?<[string]> Optional Package identifier.
  - `socketName` ?<[string]> Optional webview socket name.

### option: AndroidDevice.webView.timeout = %%-android-timeout-%%
* since: v1.9

## method: AndroidDevice.webViews
* since: v1.9
- returns: <[Array]<[AndroidWebView]>>

Currently open WebViews.
# class: Video
* since: v1.8

When browser context is created with the `recordVideo` option, each page has a video object associated with it.

```js
console.log(await page.video().path());
```

```java
System.out.println(page.video().path());
```

```python async
print(await page.video.path())
```

```python sync
print(page.video.path())
```

```csharp
Console.WriteLine(await page.Video.GetPathAsync());
```

## async method: Video.delete
* since: v1.11

Deletes the video file. Will wait for the video to finish if necessary.

## async method: Video.path
* since: v1.8
- returns: <[path]>

Returns the file system path this video will be recorded to. The video is guaranteed to be written to the filesystem
upon closing the browser context. This method throws when connected remotely.

## async method: Video.saveAs
* since: v1.11

Saves the video to a user-specified path. It is safe to call this method while the video
is still in progress, or after the page has closed. This method waits until the page is closed and the video is fully saved.

## method: Video.saveAs
* langs: java
* since: v1.11

Saves the video to a user-specified path. This must be called after [`method: Page.close`] (or [`method: BrowserContext.close`]), otherwise an error will be thrown. This method waits until the video is fully saved.

## async method: Video.saveAs
* langs: python
* since: v1.11

Saves the video to a user-specified path. If using the sync API, this must be called after [`method: Page.close`] (or [`method: BrowserContext.close`]), otherwise an error will be thrown. If using the async API, it is safe to call this method while the video is still in progress, or after the page has closed. This method waits until the page is closed and the video is fully saved.

### param: Video.saveAs.path
* since: v1.11
- `path` <[path]>

Path where the video should be saved.
# class: SnapshotAssertions
* since: v1.20
* langs: js

Playwright provides methods for comparing page and element screenshots with
expected values stored in files.

```js
expect(screenshot).toMatchSnapshot('landing-page.png');
```

## method: SnapshotAssertions.toMatchSnapshot#1
* since: v1.22

:::caution
To compare screenshots, use [`method: PageAssertions.toHaveScreenshot#1`] instead.
:::

Ensures that passed value, either a [string] or a [Buffer], matches the expected snapshot stored in the test snapshots directory.

**Usage**

```js
// Basic usage.
expect(await page.screenshot()).toMatchSnapshot('landing-page.png');

// Pass options to customize the snapshot comparison and have a generated name.
expect(await page.screenshot()).toMatchSnapshot('landing-page.png', {
  maxDiffPixels: 27, // allow no more than 27 different pixels.
});

// Configure image matching threshold.
expect(await page.screenshot()).toMatchSnapshot('landing-page.png', { threshold: 0.3 });

// Bring some structure to your snapshot files by passing file path segments.
expect(await page.screenshot()).toMatchSnapshot(['landing', 'step2.png']);
expect(await page.screenshot()).toMatchSnapshot(['landing', 'step3.png']);
```

Learn more about [visual comparisons](../test-snapshots.md).

Note that matching snapshots only work with Playwright test runner.

### param: SnapshotAssertions.toMatchSnapshot#1.name
* since: v1.22
- `name` <[string]|[Array]<[string]>>

Snapshot name.

### option: SnapshotAssertions.toMatchSnapshot#1.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.22

### option: SnapshotAssertions.toMatchSnapshot#1.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.22

### option: SnapshotAssertions.toMatchSnapshot#1.threshold = %%-assertions-threshold-%%
* since: v1.22

## method: SnapshotAssertions.toMatchSnapshot#2
* since: v1.22

:::caution
To compare screenshots, use [`method: PageAssertions.toHaveScreenshot#2`] instead.
:::

Ensures that passed value, either a [string] or a [Buffer], matches the expected snapshot stored in the test snapshots directory.

**Usage**

```js
// Basic usage and the file name is derived from the test name.
expect(await page.screenshot()).toMatchSnapshot();

// Pass options to customize the snapshot comparison and have a generated name.
expect(await page.screenshot()).toMatchSnapshot({
  maxDiffPixels: 27, // allow no more than 27 different pixels.
});

// Configure image matching threshold and snapshot name.
expect(await page.screenshot()).toMatchSnapshot({
  name: 'landing-page.png',
  threshold: 0.3,
});
```

Learn more about [visual comparisons](../test-snapshots.md).

Note that matching snapshots only work with Playwright test runner.

### option: SnapshotAssertions.toMatchSnapshot#2.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.22

### option: SnapshotAssertions.toMatchSnapshot#2.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.22

### option: SnapshotAssertions.toMatchSnapshot#2.name
* since: v1.22
- `name` <[string]|[Array]<[string]>>

Snapshot name. If not passed, the test name and ordinals are used when called multiple times.

### option: SnapshotAssertions.toMatchSnapshot#2.threshold = %%-assertions-threshold-%%
* since: v1.22
# class: Worker
* since: v1.8

The Worker class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). `worker`
event is emitted on the page object to signal a worker creation. `close` event is emitted on the worker object when the
worker is gone.

```js
page.on('worker', worker => {
  console.log('Worker created: ' + worker.url());
  worker.on('close', worker => console.log('Worker destroyed: ' + worker.url()));
});

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```

```java
page.onWorker(worker -> {
  System.out.println("Worker created: " + worker.url());
  worker.onClose(worker1 -> System.out.println("Worker destroyed: " + worker1.url()));
});
System.out.println("Current workers:");
for (Worker worker : page.workers())
  System.out.println("  " + worker.url());
```

```py
def handle_worker(worker):
    print("worker created: " + worker.url)
    worker.on("close", lambda: print("worker destroyed: " + worker.url))

page.on('worker', handle_worker)

print("current workers:")
for worker in page.workers:
    print("    " + worker.url)
```

```csharp
page.Worker += (_, worker) =>
{
    Console.WriteLine($"Worker created: {worker.Url}");
    worker.Close += (_, _) => Console.WriteLine($"Worker closed {worker.Url}");
};

Console.WriteLine("Current Workers:");
foreach(var pageWorker in page.Workers)
{
    Console.WriteLine($"\tWorker: {pageWorker.Url}");
}
```

## event: Worker.close
* since: v1.8
- argument: <[Worker]>

Emitted when this dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is terminated.

## event: Worker.console
* since: v1.57
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the worker calls one of console API methods, e.g. `console.log` or `console.dir`.

## async method: Worker.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

If the function passed to the [`method: Worker.evaluate`] returns a [Promise], then [`method: Worker.evaluate`] would wait for the promise
to resolve and return its value.

If the function passed to the [`method: Worker.evaluate`] returns a non-[Serializable] value, then [`method: Worker.evaluate`] returns `undefined`. Playwright also supports transferring some
additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

### param: Worker.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Worker.evaluate.expression = %%-js-worker-evaluate-workerfunction-%%
* since: v1.8

### param: Worker.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Worker.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the return value of [`param: expression`] as a [JSHandle].

The only difference between [`method: Worker.evaluate`] and
[`method: Worker.evaluateHandle`] is that [`method: Worker.evaluateHandle`]
returns [JSHandle].

If the function passed to the [`method: Worker.evaluateHandle`] returns a [Promise], then [`method: Worker.evaluateHandle`] would wait for
the promise to resolve and return its value.

### param: Worker.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Worker.evaluateHandle.expression = %%-js-worker-evaluate-workerfunction-%%
* since: v1.8

### param: Worker.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## method: Worker.url
* since: v1.8
- returns: <[string]>

## async method: Worker.waitForClose
* since: v1.10
* langs: java
- returns: <[Worker]>

Performs action and waits for the Worker to close.

### option: Worker.waitForClose.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Worker.waitForClose.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Worker.waitForConsoleMessage
* since: v1.57
* langs: java
- returns: <[ConsoleMessage]>

Performs action and waits for a console message.

### option: Worker.waitForConsoleMessage.predicate
* since: v1.57
- `predicate` <[function]\([ConsoleMessage]\):[boolean]>

Receives the [ConsoleMessage] object and resolves to true when the waiting should resolve.

### option: Worker.waitForConsoleMessage.timeout = %%-wait-for-event-timeout-%%
* since: v1.57

### param: Worker.waitForConsoleMessage.callback = %%-java-wait-for-event-callback-%%
* since: v1.57

## async method: Worker.waitForEvent
* since: v1.57
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function.
Returns when the predicate returns truthy value.
Will throw an error if the page is closed before the event is fired.
Returns the event data value.

**Usage**

```js
// Start waiting for download before clicking. Note no await.
const consolePromise = worker.waitForEvent('console');
await worker.evaluate('console.log(42)');
const consoleMessage = await consolePromise;
```

```python async
async with worker.expect_event("console") as event_info:
    await worker.evaluate("console.log(42)")
message = await event_info.value
```

```python sync
with worker.expect_event("console") as event_info:
    worker.evaluate("console.log(42)")
message = event_info.value
```

## async method: Worker.waitForEvent
* since: v1.57
* langs: python
- returns: <[EventContextManager]>

### param: Worker.waitForEvent.event = %%-wait-for-event-event-%%
* since: v1.57

### param: Worker.waitForEvent.optionsOrPredicate
* since: v1.57
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

Either a predicate that receives an event or an options object. Optional.

### option: Worker.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.57

### option: Worker.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.57
# class: PlaywrightException
* since: v1.10
* langs: java
* extends: [RuntimeException]

PlaywrightException is thrown whenever certain operations are terminated abnormally, e.g.
browser closes while [`method: Page.evaluate`] is running. All Playwright exceptions
inherit from this class.
# class: CDPSession
* since: v1.8

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol:
* protocol methods can be called with `session.send` method.
* protocol events can be subscribed to with `session.on` method.

Useful links:
* Documentation on DevTools Protocol can be found here:
  [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).
* Getting Started with DevTools Protocol:
  https://github.com/aslushnikov/getting-started-with-cdp/blob/master/README.md

```js
const client = await page.context().newCDPSession(page);
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

```python async
client = await page.context.new_cdp_session(page)
await client.send("Animation.enable")
client.on("Animation.animationCreated", lambda: print("animation created!"))
response = await client.send("Animation.getPlaybackRate")
print("playback rate is " + str(response["playbackRate"]))
await client.send("Animation.setPlaybackRate", {
    "playbackRate": response["playbackRate"] / 2
})
```

```python sync
client = page.context.new_cdp_session(page)
client.send("Animation.enable")
client.on("Animation.animationCreated", lambda: print("animation created!"))
response = client.send("Animation.getPlaybackRate")
print("playback rate is " + str(response["playbackRate"]))
client.send("Animation.setPlaybackRate", {
    "playbackRate": response["playbackRate"] / 2
})
```
```csharp
var client = await Page.Context.NewCDPSessionAsync(Page);
await client.SendAsync("Runtime.enable");
client.Event("Animation.animationCreated").OnEvent += (_, _) => Console.WriteLine("Animation created!");
var response = await client.SendAsync("Animation.getPlaybackRate");
var playbackRate = response.Value.GetProperty("playbackRate").GetDouble();
Console.WriteLine("playback rate is " + playbackRate);
await client.SendAsync("Animation.setPlaybackRate", new() { { "playbackRate", playbackRate / 2 } });
```
```java
CDPSession client = page.context().newCDPSession(page);
client.send("Runtime.enable");

client.on("Animation.animationCreated", (event) -> System.out.println("Animation created!"));

JsonObject response = client.send("Animation.getPlaybackRate");
double playbackRate = response.get("playbackRate").getAsDouble();
System.out.println("playback rate is " + playbackRate);

JsonObject params = new JsonObject();
params.addProperty("playbackRate", playbackRate / 2);
client.send("Animation.setPlaybackRate", params);
```

## async method: CDPSession.detach
* since: v1.8

Detaches the CDPSession from the target. Once detached, the CDPSession object won't emit any events and can't be used to
send messages.

## async method: CDPSession.send
* since: v1.8
- returns: <[Object]>

## async method: CDPSession.send
* since: v1.30
* langs: csharp
- returns: <[JsonElement?]>

## async method: CDPSession.send
* since: v1.37
* langs: java
- returns: <[JsonObject]>

### param: CDPSession.send.method
* since: v1.8
- `method` <[string]>

Protocol method name.

### param: CDPSession.send.params
* since: v1.8
* langs: js, python
- `params` ?<[Object]>

Optional method parameters.

### param: CDPSession.send.params
* since: v1.30
* langs: csharp
  - alias-csharp: args
- `params` ?<[Map<string, Object>]>

Optional method parameters.

### param: CDPSession.send.params
* since: v1.37
* langs: java
  - alias-java: args
- `params` ?<[JsonObject]>

Optional method parameters.

## method: CDPSession.event
* since: v.1.30
* langs: csharp
- returns: <[CDPSessionEvent]>

Returns an event emitter for the given CDP event name.

### param: CDPSession.event.eventName
* since: v1.30
* langs: csharp
- `eventName` <[string]>

CDP event name.

## method: CDPSession.on
* since: v1.37
* langs: java

Register an event handler for events with the specified event name.
The given handler will be called for every event with the given name.

### param: CDPSession.on.eventName
* since: v1.37
- `eventName` <[string]>

CDP event name.

### param: CDPSession.on.handler
* since: v1.37
- `handler` <[function]\([JsonObject]\)>

Event handler.

## method: CDPSession.off
* since: v1.37
* langs: java

Unregister an event handler for events with the specified event name.
The given handler will not be called anymore for events with the given name.

### param: CDPSession.off.eventName
* since: v1.37
- `eventName` <[string]>

CDP event name.

### param: CDPSession.off.handler
* since: v1.37
- `handler` <[function]\([JsonObject]\)>

Event handler.
# class: Electron
* since: v1.9
* langs: js

Playwright has **experimental** support for Electron automation. You can access electron namespace via:

```js
const { _electron } = require('playwright');
```

An example of the Electron automation script would be:

```js
const { _electron: electron } = require('playwright');

(async () => {
  // Launch Electron app.
  const electronApp = await electron.launch({ args: ['main.js'] });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
  // Capture a screenshot.
  await window.screenshot({ path: 'intro.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);
  // Click button.
  await window.click('text=Click me');
  // Exit app.
  await electronApp.close();
})();
```

**Supported Electron versions are:**
* v12.2.0+
* v13.4.0+
* v14+

**Known issues:**

If you are not able to launch Electron and it will end up in timeouts during launch, try the following:

* Ensure that `nodeCliInspect` ([FuseV1Options.EnableNodeCliInspectArguments](https://www.electronjs.org/docs/latest/tutorial/fuses#nodecliinspect)) fuse is **not** set to `false`.

## async method: Electron.launch
* since: v1.9
- returns: <[ElectronApplication]>

Launches electron application specified with the [`option: executablePath`].

### option: Electron.launch.executablePath
* since: v1.9
- `executablePath` <[string]>

Launches given Electron application. If not specified, launches the default Electron
executable installed in this package, located at `node_modules/.bin/electron`.

### option: Electron.launch.args
* since: v1.9
- `args` <[Array]<[string]>>

Additional arguments to pass to the application when launching. You typically pass the main
script name here.

### option: Electron.launch.cwd
* since: v1.9
- `cwd` <[string]>

Current working directory to launch application from.

### option: Electron.launch.env
* since: v1.9
- `env` <[Object]<[string], [string]>>

Specifies environment variables that will be visible to Electron. Defaults to `process.env`.

### option: Electron.launch.timeout
* since: v1.15
- `timeout` <[float]>

Maximum time in milliseconds to wait for the application to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Electron.launch.acceptdownloads = %%-context-option-acceptdownloads-%%
* since: v1.12

### option: Electron.launch.bypassCSP = %%-context-option-bypasscsp-%%
* since: v1.12

### option: Electron.launch.colorScheme = %%-context-option-colorscheme-%%
* since: v1.12

### option: Electron.launch.extraHTTPHeaders = %%-context-option-extrahttpheaders-%%
* since: v1.12

### option: Electron.launch.geolocation = %%-context-option-geolocation-%%
* since: v1.12

### option: Electron.launch.httpcredentials = %%-context-option-httpcredentials-%%
* since: v1.12

### option: Electron.launch.ignoreHTTPSErrors = %%-context-option-ignorehttpserrors-%%
* since: v1.12

### option: Electron.launch.locale = %%-context-option-locale-%%
* since: v1.12

### option: Electron.launch.offline = %%-context-option-offline-%%
* since: v1.12

### option: Electron.launch.recordhar = %%-context-option-recordhar-%%
* since: v1.12

### option: Electron.launch.recordharpath = %%-context-option-recordhar-path-%%
* since: v1.12

### option: Electron.launch.recordHarOmitContent = %%-context-option-recordhar-omit-content-%%
* since: v1.12

### option: Electron.launch.recordvideo = %%-context-option-recordvideo-%%
* since: v1.12

### option: Electron.launch.recordvideodir = %%-context-option-recordvideo-dir-%%
* since: v1.12

### option: Electron.launch.recordvideosize = %%-context-option-recordvideo-size-%%
* since: v1.12

### option: Electron.launch.timezoneId = %%-context-option-timezoneid-%%
* since: v1.12

### option: Electron.launch.tracesDir = %%-browser-option-tracesdir-%%
* since: v1.36
# class: WebSocketRoute
* since: v1.48

Whenever a [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) route is set up with [`method: Page.routeWebSocket`] or [`method: BrowserContext.routeWebSocket`], the `WebSocketRoute` object allows to handle the WebSocket, like an actual server would do.

**Mocking**

By default, the routed WebSocket will not connect to the server. This way, you can mock entire communication over the WebSocket. Here is an example that responds to a `"request"` with a `"response"`.

```js
await page.routeWebSocket('wss://example.com/ws', ws => {
  ws.onMessage(message => {
    if (message === 'request')
      ws.send('response');
  });
});
```

```java
page.routeWebSocket("wss://example.com/ws", ws -> {
  ws.onMessage(frame -> {
    if ("request".equals(frame.text()))
      ws.send("response");
  });
});
```

```python async
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

await page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

```python sync
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

```csharp
await page.RouteWebSocketAsync("wss://example.com/ws", ws => {
  ws.OnMessage(frame => {
    if (frame.Text == "request")
      ws.Send("response");
  });
});
```

Since we do not call [`method: WebSocketRoute.connectToServer`] inside the WebSocket route handler, Playwright assumes that WebSocket will be mocked, and opens the WebSocket inside the page automatically.

Here is another example that handles JSON messages:

```js
await page.routeWebSocket('wss://example.com/ws', ws => {
  ws.onMessage(message => {
    const json = JSON.parse(message);
    if (json.request === 'question')
      ws.send(JSON.stringify({ response: 'answer' }));
  });
});
```

```java
page.routeWebSocket("wss://example.com/ws", ws -> {
  ws.onMessage(frame -> {
    JsonObject json = new JsonParser().parse(frame.text()).getAsJsonObject();
    if ("question".equals(json.get("request").getAsString())) {
      Map<String, String> result = new HashMap();
      result.put("response", "answer");
      ws.send(gson.toJson(result));
    }
  });
});
```

```python async
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  json_message = json.loads(message)
  if json_message["request"] == "question":
    ws.send(json.dumps({ "response": "answer" }))

await page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

```python sync
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  json_message = json.loads(message)
  if json_message["request"] == "question":
    ws.send(json.dumps({ "response": "answer" }))

page.route_web_socket("wss://example.com/ws", lambda ws: ws.on_message(
    lambda message: message_handler(ws, message)
))
```

```csharp
await page.RouteWebSocketAsync("wss://example.com/ws", ws => {
  ws.OnMessage(frame => {
    using var jsonDoc = JsonDocument.Parse(frame.Text);
    JsonElement root = jsonDoc.RootElement;
    if (root.TryGetProperty("request", out JsonElement requestElement) && requestElement.GetString() == "question")
    {
      var response = new Dictionary<string, string> { ["response"] = "answer" };
      string jsonResponse = JsonSerializer.Serialize(response);
      ws.Send(jsonResponse);
    }
  });
});
```


**Intercepting**

Alternatively, you may want to connect to the actual server, but intercept messages in-between and modify or block them. Calling [`method: WebSocketRoute.connectToServer`] returns a server-side `WebSocketRoute` instance that you can send messages to, or handle incoming messages.

Below is an example that modifies some messages sent by the page to the server. Messages sent from the server to the page are left intact, relying on the default forwarding.

```js
await page.routeWebSocket('/ws', ws => {
  const server = ws.connectToServer();
  ws.onMessage(message => {
    if (message === 'request')
      server.send('request2');
    else
      server.send(message);
  });
});
```

```java
page.routeWebSocket("/ws", ws -> {
  WebSocketRoute server = ws.connectToServer();
  ws.onMessage(frame -> {
    if ("request".equals(frame.text()))
      server.send("request2");
    else
      server.send(frame.text());
  });
});
```

```python async
def message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    server.send("request2")
  else:
    server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

await page.route_web_socket("/ws", handler)
```

```python sync
def message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    server.send("request2")
  else:
    server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

page.route_web_socket("/ws", handler)
```

```csharp
await page.RouteWebSocketAsync("/ws", ws => {
  var server = ws.ConnectToServer();
  ws.OnMessage(frame => {
    if (frame.Text == "request")
      server.Send("request2");
    else
      server.Send(frame.Text);
  });
});
```

After connecting to the server, all **messages are forwarded** between the page and the server by default.

However, if you call [`method: WebSocketRoute.onMessage`] on the original route, messages from the page to the server **will not be forwarded** anymore, but should instead be handled by the [`param: WebSocketRoute.onMessage.handler`].

Similarly, calling [`method: WebSocketRoute.onMessage`] on the server-side WebSocket will **stop forwarding messages** from the server to the page, and [`param: WebSocketRoute.onMessage.handler`] should take care of them.


The following example blocks some messages in both directions. Since it calls [`method: WebSocketRoute.onMessage`] in both directions, there is no automatic forwarding at all.

```js
await page.routeWebSocket('/ws', ws => {
  const server = ws.connectToServer();
  ws.onMessage(message => {
    if (message !== 'blocked-from-the-page')
      server.send(message);
  });
  server.onMessage(message => {
    if (message !== 'blocked-from-the-server')
      ws.send(message);
  });
});
```

```java
page.routeWebSocket("/ws", ws -> {
  WebSocketRoute server = ws.connectToServer();
  ws.onMessage(frame -> {
    if (!"blocked-from-the-page".equals(frame.text()))
      server.send(frame.text());
  });
  server.onMessage(frame -> {
    if (!"blocked-from-the-server".equals(frame.text()))
      ws.send(frame.text());
  });
});
```

```python async
def ws_message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message != "blocked-from-the-page":
    server.send(message)

def server_message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message != "blocked-from-the-server":
    ws.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: ws_message_handler(server, message))
  server.on_message(lambda message: server_message_handler(ws, message))

await page.route_web_socket("/ws", handler)
```

```python sync
def ws_message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message != "blocked-from-the-page":
    server.send(message)

def server_message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message != "blocked-from-the-server":
    ws.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: ws_message_handler(server, message))
  server.on_message(lambda message: server_message_handler(ws, message))

page.route_web_socket("/ws", handler)
```

```csharp
await page.RouteWebSocketAsync("/ws", ws => {
  var server = ws.ConnectToServer();
  ws.OnMessage(frame => {
    if (frame.Text != "blocked-from-the-page")
      server.Send(frame.Text);
  });
  server.OnMessage(frame => {
    if (frame.Text != "blocked-from-the-server")
      ws.Send(frame.Text);
  });
});
```



## async method: WebSocketRoute.close
* since: v1.48

Closes one side of the WebSocket connection.

### option: WebSocketRoute.close.code
* since: v1.48
- `code` <[int]>

Optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code).

### option: WebSocketRoute.close.reason
* since: v1.48
- `reason` <[string]>

Optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).



## method: WebSocketRoute.connectToServer
* since: v1.48
- returns: <[WebSocketRoute]>

By default, routed WebSocket does not connect to the server, so you can mock entire WebSocket communication. This method connects to the actual WebSocket server, and returns the server-side [WebSocketRoute] instance, giving the ability to send and receive messages from the server.

Once connected to the server:
* Messages received from the server will be **automatically forwarded** to the WebSocket in the page, unless [`method: WebSocketRoute.onMessage`] is called on the server-side `WebSocketRoute`.
* Messages sent by the [`WebSocket.send()`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) call in the page will be **automatically forwarded** to the server, unless [`method: WebSocketRoute.onMessage`] is called on the original `WebSocketRoute`.

See examples at the top for more details.



## method: WebSocketRoute.onClose
* since: v1.48

Allows to handle [`WebSocket.close`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close).

By default, closing one side of the connection, either in the page or on the server, will close the other side. However, when [`method: WebSocketRoute.onClose`] handler is set up, the default forwarding of closure is disabled, and handler should take care of it.

### param: WebSocketRoute.onClose.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([int]|[undefined], [string]|[undefined]\): [Promise<any>|any]>

Function that will handle WebSocket closure. Received an optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code) and an optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).

### param: WebSocketRoute.onClose.handler
* since: v1.48
* langs: java
- `handler` <[function]\([null]|[int], [null]|[string]\)>

Function that will handle WebSocket closure. Received an optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code) and an optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).

### param: WebSocketRoute.onClose.handler
* since: v1.48
* langs: csharp
- `handler` <[function]\([int?], [string?]\)>

Function that will handle WebSocket closure. Received an optional [close code](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#code) and an optional [close reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close#reason).

## method: WebSocketRoute.onMessage
* since: v1.48

This method allows to handle messages that are sent by the WebSocket, either from the page or from the server.

When called on the original WebSocket route, this method handles messages sent from the page. You can handle this messages by responding to them with [`method: WebSocketRoute.send`], forwarding them to the server-side connection returned by [`method: WebSocketRoute.connectToServer`] or do something else.

Once this method is called, messages are not automatically forwarded to the server or to the page - you should do that manually by calling [`method: WebSocketRoute.send`]. See examples at the top for more details.

Calling this method again will override the handler with a new one.

### param: WebSocketRoute.onMessage.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([string]\): [Promise<any>|any]>

Function that will handle messages.

### param: WebSocketRoute.onMessage.handler
* since: v1.48
* langs: csharp, java
- `handler` <[function]\([WebSocketFrame]\)>

Function that will handle messages.



## method: WebSocketRoute.send
* since: v1.48

Sends a message to the WebSocket. When called on the original WebSocket, sends the message to the page. When called on the result of [`method: WebSocketRoute.connectToServer`], sends the message to the server. See examples at the top for more details.

### param: WebSocketRoute.send.message
* since: v1.48
- `message` <[string]|[Buffer]>

Message to send.



## method: WebSocketRoute.url
* since: v1.48
- returns: <[string]>

URL of the WebSocket created in the page.
# class: WebError
* since: v1.38

[WebError] class represents an unhandled exception thrown in the page. It is dispatched via the [`event: BrowserContext.webError`] event.

```js
// Log all uncaught errors to the terminal
context.on('weberror', webError => {
  console.log(`Uncaught exception: "${webError.error()}"`);
});

// Navigate to a page with an exception.
await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

```java
// Log all uncaught errors to the terminal
context.onWebError(webError -> {
  System.out.println("Uncaught exception: " + webError.error());
});

// Navigate to a page with an exception.
page.navigate("data:text/html,<script>throw new Error('Test')</script>");
```

```python async
# Log all uncaught errors to the terminal
context.on("weberror", lambda web_error: print(f"uncaught exception: {web_error.error}"))

# Navigate to a page with an exception.
await page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```python sync
# Log all uncaught errors to the terminal
context.on("weberror", lambda web_error: print(f"uncaught exception: {web_error.error}"))

# Navigate to a page with an exception.
page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```csharp
// Log all uncaught errors to the terminal
context.WebError += (_, webError) =>
{
  Console.WriteLine("Uncaught exception: " + webError.Error);
};
```

## method: WebError.page
* since: v1.38
- returns: <[null]|[Page]>

The page that produced this unhandled exception, if any.

## method: WebError.error
* since: v1.38
- returns: <[Error]>

Unhandled error that was thrown.

## method: WebError.error
* since: v1.38
* langs: java, csharp
- returns: <[string]>

Unhandled error that was thrown.
# class: ElementHandle
* since: v1.8
* extends: [JSHandle]

ElementHandle represents an in-page DOM element. ElementHandles can be created with the [`method: Page.querySelector`] method.

:::warning[Discouraged]
The use of ElementHandle is discouraged, use [Locator] objects and web-first assertions instead.
:::

```js
const hrefElement = await page.$('a');
await hrefElement.click();
```

```java
ElementHandle hrefElement = page.querySelector("a");
hrefElement.click();
```

```python async
href_element = await page.query_selector("a")
await href_element.click()
```

```python sync
href_element = page.query_selector("a")
href_element.click()
```

```csharp
var handle = await page.QuerySelectorAsync("a");
await handle.ClickAsync();
```

ElementHandle prevents DOM element from garbage collection unless the handle is disposed with
[`method: JSHandle.dispose`]. ElementHandles are auto-disposed when their origin frame gets navigated.

ElementHandle instances can be used as an argument in [`method: Page.evalOnSelector`] and [`method: Page.evaluate`] methods.

The difference between the [Locator] and ElementHandle is that the ElementHandle points to a particular element, while [Locator] captures the logic of how to retrieve an element.

In the example below, handle points to a particular DOM element on page. If that element changes text or is used by React to render an entirely different component, handle is still pointing to that very DOM element. This can lead to unexpected behaviors.

```js
const handle = await page.$('text=Submit');
// ...
await handle.hover();
await handle.click();
```

```java
ElementHandle handle = page.querySelector("text=Submit");
handle.hover();
handle.click();
```

```python async
handle = await page.query_selector("text=Submit")
await handle.hover()
await handle.click()
```

```python sync
handle = page.query_selector("text=Submit")
handle.hover()
handle.click()
```

```csharp
var handle = await page.QuerySelectorAsync("text=Submit");
await handle.HoverAsync();
await handle.ClickAsync();
```

With the locator, every time the `element` is used, up-to-date DOM element is located in the page using the selector. So in the snippet below, underlying DOM element is going to be located twice.

```js
const locator = page.getByText('Submit');
// ...
await locator.hover();
await locator.click();
```

```java
Locator locator = page.getByText("Submit");
locator.hover();
locator.click();
```

```python async
locator = page.get_by_text("Submit")
await locator.hover()
await locator.click()
```

```python sync
locator = page.get_by_text("Submit")
locator.hover()
locator.click()
```

```csharp
var locator = page.GetByText("Submit");
await locator.HoverAsync();
await locator.ClickAsync();
```

## async method: ElementHandle.boundingBox
* since: v1.8
- returns: <[null]|[Object]>
  - `x` <[float]> the x coordinate of the element in pixels.
  - `y` <[float]> the y coordinate of the element in pixels.
  - `width` <[float]> the width of the element in pixels.
  - `height` <[float]> the height of the element in pixels.

This method returns the bounding box of the element, or `null` if the element is not visible. The bounding box is
calculated relative to the main frame viewport - which is usually the same as the browser window.

Scrolling affects the returned bounding box, similarly to
[Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). That
means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the
[Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following
snippet should click the center of the element.

**Usage**

```js
const box = await elementHandle.boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
```

```java
BoundingBox box = elementHandle.boundingBox();
page.mouse().click(box.x + box.width / 2, box.y + box.height / 2);
```

```python async
box = await element_handle.bounding_box()
await page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```python sync
box = element_handle.bounding_box()
page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```csharp
var box = await elementHandle.BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

## async method: ElementHandle.check
* since: v1.8
* discouraged: Use locator-based [`method: Locator.check`] instead. Read more about [locators](../locators.md).

This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.check.position = %%-input-position-%%
* since: v1.11

### option: ElementHandle.check.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.check.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.check.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.check.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.click
* since: v1.8
* discouraged: Use locator-based [`method: Locator.click`] instead. Read more about [locators](../locators.md).

This method clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.click.button = %%-input-button-%%
* since: v1.8

### option: ElementHandle.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: ElementHandle.click.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: ElementHandle.click.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.click.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.click.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: ElementHandle.click.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.click.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.click.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.click.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: ElementHandle.contentFrame
* since: v1.8
- returns: <[null]|[Frame]>

Returns the content frame for element handles referencing iframe nodes, or `null` otherwise

## async method: ElementHandle.dblclick
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dblclick`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-csharp: DblClickAsync

This method double clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`elementHandle.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### option: ElementHandle.dblclick.button = %%-input-button-%%
* since: v1.8

### option: ElementHandle.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: ElementHandle.dblclick.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.dblclick.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.dblclick.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.dblclick.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.dblclick.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: ElementHandle.dispatchEvent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dispatchEvent`] instead. Read more about [locators](../locators.md).

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
[element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```js
await elementHandle.dispatchEvent('click');
```

```java
elementHandle.dispatchEvent("click");
```

```python async
await element_handle.dispatch_event("click")
```

```python sync
element_handle.dispatch_event("click")
```

```csharp
await elementHandle.DispatchEventAsync("click");
```

Under the hood, it creates an instance of an event based on the given [`param: type`], initializes it with
[`param: eventInit`] properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by
default.

Since [`param: eventInit`] is event-specific, please refer to the events documentation for the lists of initial
properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```js
// Note you can only create DataTransfer in Chromium and Firefox
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await elementHandle.dispatchEvent('dragstart', { dataTransfer });
```

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
elementHandle.dispatchEvent("dragstart", arg);
```

```python async
# note you can only create data_transfer in chromium and firefox
data_transfer = await page.evaluate_handle("new DataTransfer()")
await element_handle.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```python sync
# note you can only create data_transfer in chromium and firefox
data_transfer = page.evaluate_handle("new DataTransfer()")
element_handle.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await elementHandle.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

### param: ElementHandle.dispatchEvent.type
* since: v1.8
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: ElementHandle.dispatchEvent.eventInit
* since: v1.8
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

## async method: ElementHandle.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass actionability
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`],
  other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds an element matching the specified selector in the `ElementHandle`s subtree and passes it as a first
argument to [`param: expression`]. If no elements match the selector, the method throws an error.

If [`param: expression`] returns a [Promise], then [`method: ElementHandle.evalOnSelector`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
```

```java
ElementHandle tweetHandle = page.querySelector(".tweet");
assertEquals("100", tweetHandle.evalOnSelector(".like", "node => node.innerText"));
assertEquals("10", tweetHandle.evalOnSelector(".retweets", "node => node.innerText"));
```

```python async
tweet_handle = await page.query_selector(".tweet")
assert await tweet_handle.eval_on_selector(".like", "node => node.innerText") == "100"
assert await tweet_handle.eval_on_selector(".retweets", "node => node.innerText") == "10"
```

```python sync
tweet_handle = page.query_selector(".tweet")
assert tweet_handle.eval_on_selector(".like", "node => node.innerText") == "100"
assert tweet_handle.eval_on_selector(".retweets", "node => node.innerText") == "10"
```

```csharp
var tweetHandle = await page.QuerySelectorAsync(".tweet");
Assert.AreEqual("100", await tweetHandle.EvalOnSelectorAsync(".like", "node => node.innerText"));
Assert.AreEqual("10", await tweetHandle.EvalOnSelectorAsync(".retweets", "node => node.innerText"));
```

### param: ElementHandle.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: ElementHandle.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds all elements matching the specified selector in the `ElementHandle`'s subtree and passes an array of
matched elements as a first argument to [`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: ElementHandle.evalOnSelectorAll`] would wait for the promise to resolve and return its
value.

**Usage**

```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```

```js
const feedHandle = await page.$('.feed');
expect(await feedHandle.$$eval('.tweet', nodes =>
  nodes.map(n => n.innerText))).toEqual(['Hello!', 'Hi!'],
);
```

```java
ElementHandle feedHandle = page.querySelector(".feed");
assertEquals(Arrays.asList("Hello!", "Hi!"), feedHandle.evalOnSelectorAll(".tweet", "nodes => nodes.map(n => n.innerText)"));
```

```python async
feed_handle = await page.query_selector(".feed")
assert await feed_handle.eval_on_selector_all(".tweet", "nodes => nodes.map(n => n.innerText)") == ["hello!", "hi!"]
```

```python sync
feed_handle = page.query_selector(".feed")
assert feed_handle.eval_on_selector_all(".tweet", "nodes => nodes.map(n => n.innerText)") == ["hello!", "hi!"]
```

```csharp
var feedHandle = await page.QuerySelectorAsync(".feed");
Assert.AreEqual(new [] { "Hello!", "Hi!" }, await feedHandle.EvalOnSelectorAllAsync<string[]>(".tweet", "nodes => nodes.map(n => n.innerText)"));
```

### param: ElementHandle.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: ElementHandle.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about [locators](../locators.md).

This method waits for [actionability](../actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: ElementHandle.fill.value
* since: v1.8
- `value` <[string]>

Value to set for the `<input>`, `<textarea>` or `[contenteditable]` element.

### option: ElementHandle.fill.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about [locators](../locators.md).

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

## async method: ElementHandle.getAttribute
* since: v1.8
* discouraged: Use locator-based [`method: Locator.getAttribute`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns element attribute value.

### param: ElementHandle.getAttribute.name
* since: v1.8
- `name` <[string]>

Attribute name to get the value for.

## async method: ElementHandle.hover
* since: v1.8
* discouraged: Use locator-based [`method: Locator.hover`] instead. Read more about [locators](../locators.md).

This method hovers over the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.hover.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.hover.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.hover.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.hover.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.hover.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.hover.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: ElementHandle.innerHTML
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerHTML`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns the `element.innerHTML`.

## async method: ElementHandle.innerText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerText`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns the `element.innerText`.

## async method: ElementHandle.inputValue
* since: v1.13
* discouraged: Use locator-based [`method: Locator.inputValue`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

### option: ElementHandle.inputValue.timeout = %%-input-timeout-%%
* since: v1.13

### option: ElementHandle.inputValue.timeout = %%-input-timeout-js-%%
* since: v1.13

## async method: ElementHandle.isChecked
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isChecked`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

## async method: ElementHandle.isDisabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isDisabled`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of [enabled](../actionability.md#enabled).

## async method: ElementHandle.isEditable
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEditable`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [editable](../actionability.md#editable).

## async method: ElementHandle.isEnabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEnabled`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [enabled](../actionability.md#enabled).

## async method: ElementHandle.isHidden
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isHidden`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of [visible](../actionability.md#visible).

## async method: ElementHandle.isVisible
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isVisible`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [visible](../actionability.md#visible).

## async method: ElementHandle.ownerFrame
* since: v1.8
- returns: <[null]|[Frame]>

Returns the frame containing the given element.

## async method: ElementHandle.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about [locators](../locators.md).

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

### param: ElementHandle.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: ElementHandle.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: ElementHandle.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: ElementHandle.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

The method finds an element matching the specified selector in the `ElementHandle`'s subtree. If no elements match the selector,
returns `null`.

### param: ElementHandle.querySelector.selector = %%-query-selector-%%
* since: v1.9

## async method: ElementHandle.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

The method finds all elements matching the specified selector in the `ElementHandle`s subtree. If no elements match the selector,
returns empty array.

### param: ElementHandle.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9

## async method: ElementHandle.screenshot
* since: v1.8
* discouraged: Use locator-based [`method: Locator.screenshot`] instead. Read more about [locators](../locators.md).
- returns: <[Buffer]>

This method captures a screenshot of the page, clipped to the size and position of this particular element. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the [actionability](../actionability.md) checks, then scrolls element into view before taking a
screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

### option: ElementHandle.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.8

### option: ElementHandle.screenshot.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: ElementHandle.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: ElementHandle.scrollIntoViewIfNeeded
* discouraged: Use locator-based [`method: Locator.scrollIntoViewIfNeeded`] instead. Read more about [locators](../locators.md).
* since: v1.8

This method waits for [actionability](../actionability.md) checks, then tries to scroll element into view, unless it is
completely visible as defined by
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s `ratio`.

Throws when `elementHandle` does not point to an element
[connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

See [scrolling](../input.md#scrolling) for alternative ways to scroll.

### option: ElementHandle.scrollIntoViewIfNeeded.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.scrollIntoViewIfNeeded.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about [locators](../locators.md).
- returns: <[Array]<[string]>>

This method waits for [actionability](../actionability.md) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
handle.selectOption('blue');

// single selection matching the label
handle.selectOption({ label: 'Blue' });

// multiple selection
handle.selectOption(['red', 'green', 'blue']);
```

```java
// Single selection matching the value or label
handle.selectOption("blue");
// single selection matching the label
handle.selectOption(new SelectOption().setLabel("Blue"));
// multiple selection
handle.selectOption(new String[] {"red", "green", "blue"});
```

```python async
# Single selection matching the value or label
await handle.select_option("blue")
# single selection matching the label
await handle.select_option(label="blue")
# multiple selection
await handle.select_option(value=["red", "green", "blue"])
```

```python sync
# Single selection matching the value or label
handle.select_option("blue")
# single selection matching both the label
handle.select_option(label="blue")
# multiple selection
handle.select_option(value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await handle.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await handle.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await handle.SelectOptionAsync(new[] { "red", "green", "blue" });
// multiple selection for blue, red and second option
await handle.SelectOptionAsync(new[] {
    new SelectOptionValue() { Label = "blue" },
    new SelectOptionValue() { Index = 2 },
    new SelectOptionValue() { Value = "red" }});
```

### param: ElementHandle.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: ElementHandle.selectOption.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### param: ElementHandle.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### param: ElementHandle.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: ElementHandle.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### param: ElementHandle.selectOption.label = %%-python-select-options-label-%%
* since: v1.8

## async method: ElementHandle.selectText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectText`] instead. Read more about [locators](../locators.md).

This method waits for [actionability](../actionability.md) checks, then focuses the element and selects all its text
content.

If the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), focuses and selects text in the control instead.

### option: ElementHandle.selectText.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.selectText.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.selectText.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.setChecked
* discouraged: Use locator-based [`method: Locator.setChecked`] instead. Read more about [locators](../locators.md).
* since: v1.15

This method checks or unchecks an element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: ElementHandle.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: ElementHandle.setChecked.force = %%-input-force-%%
* since: v1.15

### option: ElementHandle.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: ElementHandle.setChecked.position = %%-input-position-%%
* since: v1.15

### option: ElementHandle.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: ElementHandle.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: ElementHandle.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: ElementHandle.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about [locators](../locators.md).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

This method expects [ElementHandle] to point to an
[input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

### param: ElementHandle.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: ElementHandle.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.tap
* since: v1.8
* discouraged: Use locator-based [`method: Locator.tap`] instead. Read more about [locators](../locators.md).

This method taps the element by performing the following steps:
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`elementHandle.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### option: ElementHandle.tap.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.tap.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.tap.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns the `node.textContent`.

## async method: ElementHandle.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: ElementHandle.press`].

**Usage**

### param: ElementHandle.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: ElementHandle.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

### option: ElementHandle.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about [locators](../locators.md).

This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.uncheck.position = %%-input-position-%%
* since: v1.11

### option: ElementHandle.uncheck.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.uncheck.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.waitForElementState
* since: v1.8

Returns when the element satisfies the [`param: state`].

Depending on the [`param: state`] parameter, this method waits for one of the [actionability](../actionability.md) checks
to pass. This method throws when the element is detached while waiting, unless waiting for the `"hidden"` state.
* `"visible"` Wait until the element is [visible](../actionability.md#visible).
* `"hidden"` Wait until the element is [not visible](../actionability.md#visible) or
  not attached. Note that waiting for hidden does not throw when the element detaches.
* `"stable"` Wait until the element is both [visible](../actionability.md#visible) and
  [stable](../actionability.md#stable).
* `"enabled"` Wait until the element is [enabled](../actionability.md#enabled).
* `"disabled"` Wait until the element is [not enabled](../actionability.md#enabled).
* `"editable"` Wait until the element is [editable](../actionability.md#editable).

If the element does not satisfy the condition for the [`option: timeout`] milliseconds, this method will throw.

### param: ElementHandle.waitForElementState.state
* since: v1.8
- `state` <[ElementState]<"visible"|"hidden"|"stable"|"enabled"|"disabled"|"editable">>

A state to wait for, see below for more details.

### option: ElementHandle.waitForElementState.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.waitForElementState.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
- returns: <[null]|[ElementHandle]>

Returns element specified by selector when it satisfies [`option: state`] option. Returns `null` if waiting for `hidden`
or `detached`.

Wait for the [`param: selector`] relative to the element handle to satisfy [`option: state`] option (either
appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [`param: selector`] already
satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the
[`option: timeout`] milliseconds, the function will throw.

**Usage**

```js
await page.setContent(`<div><span></span></div>`);
const div = await page.$('div');
// Waiting for the 'span' selector relative to the div.
const span = await div.waitForSelector('span', { state: 'attached' });
```

```java
page.setContent("<div><span></span></div>");
ElementHandle div = page.querySelector("div");
// Waiting for the "span" selector relative to the div.
ElementHandle span = div.waitForSelector("span", new ElementHandle.WaitForSelectorOptions()
  .setState(WaitForSelectorState.ATTACHED));
```

```python async
await page.set_content("<div><span></span></div>")
div = await page.query_selector("div")
# waiting for the "span" selector relative to the div.
span = await div.wait_for_selector("span", state="attached")
```

```python sync
page.set_content("<div><span></span></div>")
div = page.query_selector("div")
# waiting for the "span" selector relative to the div.
span = div.wait_for_selector("span", state="attached")
```

```csharp
await page.SetContentAsync("<div><span></span></div>");
var div = await page.QuerySelectorAsync("div");
// Waiting for the "span" selector relative to the div.
var span = await page.WaitForSelectorAsync("span", WaitForSelectorState.Attached);
```

:::note
This method does not work across navigations, use [`method: Page.waitForSelector`] instead.
:::

### param: ElementHandle.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: ElementHandle.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: ElementHandle.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.waitForSelector.strict = %%-input-strict-%%
* since: v1.15
# class: Keyboard
* since: v1.8

Keyboard provides an api for managing a virtual keyboard. The high level api is [`method: Keyboard.type`], which takes
raw characters and generates proper `keydown`, `keypress`/`input`, and `keyup` events on your page.

For finer control, you can use [`method: Keyboard.down`], [`method: Keyboard.up`], and [`method: Keyboard.insertText`]
to manually fire events as if they were generated from a real keyboard.

An example of holding down `Shift` in order to select and delete some text:

```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

```java
page.keyboard().type("Hello World!");
page.keyboard().press("ArrowLeft");
page.keyboard().down("Shift");
for (int i = 0; i < " World".length(); i++)
  page.keyboard().press("ArrowLeft");
page.keyboard().up("Shift");
page.keyboard().press("Backspace");
// Result text will end up saying "Hello!"
```

```python async
await page.keyboard.type("Hello World!")
await page.keyboard.press("ArrowLeft")
await page.keyboard.down("Shift")
for i in range(6):
    await page.keyboard.press("ArrowLeft")
await page.keyboard.up("Shift")
await page.keyboard.press("Backspace")
# result text will end up saying "Hello!"
```

```python sync
page.keyboard.type("Hello World!")
page.keyboard.press("ArrowLeft")
page.keyboard.down("Shift")
for i in range(6):
    page.keyboard.press("ArrowLeft")
page.keyboard.up("Shift")
page.keyboard.press("Backspace")
# result text will end up saying "Hello!"
```

```csharp
await page.Keyboard.TypeAsync("Hello World!");
await page.Keyboard.PressAsync("ArrowLeft");

await page.Keyboard.DownAsync("Shift");
for (int i = 0; i < " World".Length; i++)
    await page.Keyboard.PressAsync("ArrowLeft");

await page.Keyboard.UpAsync("Shift");

await page.Keyboard.PressAsync("Backspace");
// Result text will end up saying "Hello!"
```

An example of pressing uppercase `A`

```js
await page.keyboard.press('Shift+KeyA');
// or
await page.keyboard.press('Shift+A');
```

```java
page.keyboard().press("Shift+KeyA");
// or
page.keyboard().press("Shift+A");
```

```python async
await page.keyboard.press("Shift+KeyA")
# or
await page.keyboard.press("Shift+A")
```

```python sync
page.keyboard.press("Shift+KeyA")
# or
page.keyboard.press("Shift+A")
```

```csharp
await page.Keyboard.PressAsync("Shift+KeyA");
// or
await page.Keyboard.PressAsync("Shift+A");
```

An example to trigger select-all with the keyboard

```js
await page.keyboard.press('ControlOrMeta+A');
```

```java
page.keyboard().press("ControlOrMeta+A");
```

```python async
await page.keyboard.press("ControlOrMeta+A")
```

```python sync
page.keyboard.press("ControlOrMeta+A")
```

```csharp
await page.Keyboard.PressAsync("ControlOrMeta+A");
```

## async method: Keyboard.down
* since: v1.8

Dispatches a `keydown` event.

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

If [`param: key`] is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that
modifier active. To release the modifier key, use [`method: Keyboard.up`].

After the key is pressed once, subsequent calls to [`method: Keyboard.down`] will have
[repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use
[`method: Keyboard.up`].

:::note
Modifier keys DO influence `keyboard.down`. Holding down `Shift` will type the text in upper case.
:::

### param: Keyboard.down.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

## async method: Keyboard.insertText
* since: v1.8

Dispatches only `input` event, does not emit the `keydown`, `keyup` or `keypress` events.

**Usage**

```js
page.keyboard.insertText('嗨');
```

```java
page.keyboard().insertText("嗨");
```

```python async
await page.keyboard.insert_text("嗨")
```

```python sync
page.keyboard.insert_text("嗨")
```

```csharp
await page.Keyboard.PressAsync("嗨");
```

:::note
Modifier keys DO NOT effect `keyboard.insertText`. Holding down `Shift` will not type the text in upper case.
:::

### param: Keyboard.insertText.text
* since: v1.8
- `text` <[string]>

Sets input to the specified text value.

## async method: Keyboard.press
* since: v1.8

:::tip
In most cases, you should use [`method: Locator.press`] instead.
:::

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```js
const page = await browser.newPage();
await page.goto('https://keycode.info');
await page.keyboard.press('A');
await page.screenshot({ path: 'A.png' });
await page.keyboard.press('ArrowLeft');
await page.screenshot({ path: 'ArrowLeft.png' });
await page.keyboard.press('Shift+O');
await page.screenshot({ path: 'O.png' });
await browser.close();
```

```java
Page page = browser.newPage();
page.navigate("https://keycode.info");
page.keyboard().press("A");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("A.png")));
page.keyboard().press("ArrowLeft");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("ArrowLeft.png")));
page.keyboard().press("Shift+O");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("O.png")));
browser.close();
```

```python async
page = await browser.new_page()
await page.goto("https://keycode.info")
await page.keyboard.press("a")
await page.screenshot(path="a.png")
await page.keyboard.press("ArrowLeft")
await page.screenshot(path="arrow_left.png")
await page.keyboard.press("Shift+O")
await page.screenshot(path="o.png")
await browser.close()
```

```python sync
page = browser.new_page()
page.goto("https://keycode.info")
page.keyboard.press("a")
page.screenshot(path="a.png")
page.keyboard.press("ArrowLeft")
page.screenshot(path="arrow_left.png")
page.keyboard.press("Shift+O")
page.screenshot(path="o.png")
browser.close()
```

```csharp
await page.GotoAsync("https://keycode.info");
await page.Keyboard.PressAsync("A");
await page.ScreenshotAsync(new() { Path = "A.png" });
await page.Keyboard.PressAsync("ArrowLeft");
await page.ScreenshotAsync(new() { Path = "ArrowLeft.png" });
await page.Keyboard.PressAsync("Shift+O");
await page.ScreenshotAsync(new() { Path = "O.png" });
await browser.CloseAsync();
```

Shortcut for [`method: Keyboard.down`] and [`method: Keyboard.up`].

### param: Keyboard.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Keyboard.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

## async method: Keyboard.type
* since: v1.8

:::caution
In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].
:::

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: Keyboard.press`].

**Usage**

```js
await page.keyboard.type('Hello'); // Types instantly
await page.keyboard.type('World', { delay: 100 }); // Types slower, like a user
```

```java
// Types instantly
page.keyboard().type("Hello");
// Types slower, like a user
page.keyboard().type("World", new Keyboard.TypeOptions().setDelay(100));
```

```python async
await page.keyboard.type("Hello") # types instantly
await page.keyboard.type("World", delay=100) # types slower, like a user
```

```python sync
page.keyboard.type("Hello") # types instantly
page.keyboard.type("World", delay=100) # types slower, like a user
```

```csharp
await page.Keyboard.TypeAsync("Hello"); // types instantly
await page.Keyboard.TypeAsync("World", new() { Delay = 100 }); // types slower, like a user
```

:::note
Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.
:::

:::note
For characters that are not on a US keyboard, only an `input` event will be sent.
:::

### param: Keyboard.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: Keyboard.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

## async method: Keyboard.up
* since: v1.8

Dispatches a `keyup` event.

### param: Keyboard.up.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
# class: Tracing
* since: v1.12

API for collecting and saving Playwright traces. Playwright traces can be opened in [Trace Viewer](../trace-viewer.md) after Playwright script runs.

:::note
You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `context.tracing`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

Start recording a trace before performing actions. At the end, stop tracing and save it to a file.

```js
const browser = await chromium.launch();
const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');
expect(page.url()).toBe('https://playwright.dev');
await context.tracing.stop({ path: 'trace.zip' });
```

```java
Browser browser = chromium.launch();
BrowserContext context = browser.newContext();
context.tracing().start(new Tracing.StartOptions()
  .setScreenshots(true)
  .setSnapshots(true));
Page page = context.newPage();
page.navigate("https://playwright.dev");
context.tracing().stop(new Tracing.StopOptions()
  .setPath(Paths.get("trace.zip")));
```

```python async
browser = await chromium.launch()
context = await browser.new_context()
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")
await context.tracing.stop(path = "trace.zip")
```

```python sync
browser = chromium.launch()
context = browser.new_context()
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")
context.tracing.stop(path = "trace.zip")
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");
await context.Tracing.StopAsync(new()
{
  Path = "trace.zip"
});
```

## async method: Tracing.start
* since: v1.12

Start tracing.

:::note
You probably want to [enable tracing in your config file](https://playwright.dev/docs/api/class-testoptions#test-options-trace) instead of using `Tracing.start`.

The `context.tracing` API captures browser operations and network activity, but it doesn't record test assertions (like `expect` calls). We recommend [enabling tracing through Playwright Test configuration](https://playwright.dev/docs/api/class-testoptions#test-options-trace), which includes those assertions and provides a more complete trace for debugging test failures.
:::

**Usage**

```js
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');
expect(page.url()).toBe('https://playwright.dev');
await context.tracing.stop({ path: 'trace.zip' });
```

```java
context.tracing().start(new Tracing.StartOptions()
  .setScreenshots(true)
  .setSnapshots(true));
Page page = context.newPage();
page.navigate("https://playwright.dev");
context.tracing().stop(new Tracing.StopOptions()
  .setPath(Paths.get("trace.zip")));
```

```python async
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")
await context.tracing.stop(path = "trace.zip")
```

```python sync
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")
context.tracing.stop(path = "trace.zip")
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");
await context.Tracing.StopAsync(new()
{
  Path = "trace.zip"
});
```

### option: Tracing.start.name
* since: v1.12
- `name` <[string]>

If specified, intermediate trace files are going to be saved into the files with the
given name prefix inside the [`option: BrowserType.launch.tracesDir`] directory specified in [`method: BrowserType.launch`].
To specify the final trace zip file name, you need to pass `path` option to
[`method: Tracing.stop`] instead.

### option: Tracing.start.screenshots
* since: v1.12
- `screenshots` <[boolean]>

Whether to capture screenshots during tracing. Screenshots are used to build
a timeline preview.

### option: Tracing.start.snapshots
* since: v1.12
- `snapshots` <[boolean]>

If this option is true tracing will
* capture DOM snapshot on every action
* record network activity

### option: Tracing.start.sources
* since: v1.17
* langs: js, csharp, python
- `sources` <[boolean]>

Whether to include source files for trace actions.

### option: Tracing.start.sources
* since: v1.17
* langs: java
- `sources` <[boolean]>

Whether to include source files for trace actions. List of the directories with source code for the application
must be provided via `PLAYWRIGHT_JAVA_SRC` environment variable (the paths should be separated by ';' on Windows
and by ':' on other platforms).

### option: Tracing.start.title
* since: v1.17
- `title` <[string]>

Trace name to be shown in the Trace Viewer.

## async method: Tracing.startChunk
* since: v1.15

Start a new trace chunk. If you'd like to record multiple traces on the same [BrowserContext], use [`method: Tracing.start`] once, and then create multiple trace chunks with [`method: Tracing.startChunk`] and [`method: Tracing.stopChunk`].

**Usage**

```js
await context.tracing.start({ screenshots: true, snapshots: true });
const page = await context.newPage();
await page.goto('https://playwright.dev');

await context.tracing.startChunk();
await page.getByText('Get Started').click();
// Everything between startChunk and stopChunk will be recorded in the trace.
await context.tracing.stopChunk({ path: 'trace1.zip' });

await context.tracing.startChunk();
await page.goto('http://example.com');
// Save a second trace file with different actions.
await context.tracing.stopChunk({ path: 'trace2.zip' });
```

```java
context.tracing().start(new Tracing.StartOptions()
  .setScreenshots(true)
  .setSnapshots(true));
Page page = context.newPage();
page.navigate("https://playwright.dev");

context.tracing().startChunk();
page.getByText("Get Started").click();
// Everything between startChunk and stopChunk will be recorded in the trace.
context.tracing().stopChunk(new Tracing.StopChunkOptions()
  .setPath(Paths.get("trace1.zip")));

context.tracing().startChunk();
page.navigate("http://example.com");
// Save a second trace file with different actions.
context.tracing().stopChunk(new Tracing.StopChunkOptions()
  .setPath(Paths.get("trace2.zip")));
```

```python async
await context.tracing.start(screenshots=True, snapshots=True)
page = await context.new_page()
await page.goto("https://playwright.dev")

await context.tracing.start_chunk()
await page.get_by_text("Get Started").click()
# Everything between start_chunk and stop_chunk will be recorded in the trace.
await context.tracing.stop_chunk(path = "trace1.zip")

await context.tracing.start_chunk()
await page.goto("http://example.com")
# Save a second trace file with different actions.
await context.tracing.stop_chunk(path = "trace2.zip")
```

```python sync
context.tracing.start(screenshots=True, snapshots=True)
page = context.new_page()
page.goto("https://playwright.dev")

context.tracing.start_chunk()
page.get_by_text("Get Started").click()
# Everything between start_chunk and stop_chunk will be recorded in the trace.
context.tracing.stop_chunk(path = "trace1.zip")

context.tracing.start_chunk()
page.goto("http://example.com")
# Save a second trace file with different actions.
context.tracing.stop_chunk(path = "trace2.zip")
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Chromium.LaunchAsync();
await using var context = await browser.NewContextAsync();
await context.Tracing.StartAsync(new()
{
  Screenshots = true,
  Snapshots = true
});
var page = await context.NewPageAsync();
await page.GotoAsync("https://playwright.dev");

await context.Tracing.StartChunkAsync();
await page.GetByText("Get Started").ClickAsync();
// Everything between StartChunkAsync and StopChunkAsync will be recorded in the trace.
await context.Tracing.StopChunkAsync(new()
{
  Path = "trace1.zip"
});

await context.Tracing.StartChunkAsync();
await page.GotoAsync("http://example.com");
// Save a second trace file with different actions.
await context.Tracing.StopChunkAsync(new()
{
  Path = "trace2.zip"
});
```

### option: Tracing.startChunk.title
* since: v1.17
- `title` <[string]>

Trace name to be shown in the Trace Viewer.

### option: Tracing.startChunk.name
* since: v1.32
- `name` <[string]>

If specified, intermediate trace files are going to be saved into the files with the
given name prefix inside the [`option: BrowserType.launch.tracesDir`] directory specified in [`method: BrowserType.launch`].
To specify the final trace zip file name, you need to pass `path` option to
[`method: Tracing.stopChunk`] instead.

## async method: Tracing.group
* since: v1.49

:::caution
Use `test.step` instead when available.
:::

Creates a new group within the trace, assigning any subsequent API calls to this group, until [`method: Tracing.groupEnd`] is called. Groups can be nested and will be visible in the trace viewer.

**Usage**

```js
// use test.step instead
await test.step('Log in', async () => {
  // ...
});
```

```java
// All actions between group and groupEnd
// will be shown in the trace viewer as a group.
page.context().tracing().group("Open Playwright.dev > API");
page.navigate("https://playwright.dev/");
page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("API")).click();
page.context().tracing().groupEnd();
```

```python sync
# All actions between group and group_end
# will be shown in the trace viewer as a group.
page.context.tracing.group("Open Playwright.dev > API")
page.goto("https://playwright.dev/")
page.get_by_role("link", name="API").click()
page.context.tracing.group_end()
```

```python async
# All actions between group and group_end
# will be shown in the trace viewer as a group.
await page.context.tracing.group("Open Playwright.dev > API")
await page.goto("https://playwright.dev/")
await page.get_by_role("link", name="API").click()
await page.context.tracing.group_end()
```

```csharp
// All actions between GroupAsync and GroupEndAsync
// will be shown in the trace viewer as a group.
await Page.Context.Tracing.GroupAsync("Open Playwright.dev > API");
await Page.GotoAsync("https://playwright.dev/");
await Page.GetByRole(AriaRole.Link, new() { Name = "API" }).ClickAsync();
await Page.Context.Tracing.GroupEndAsync();
```

### param: Tracing.group.name
* since: v1.49
- `name` <[string]>

Group name shown in the trace viewer.

### option: Tracing.group.location
* since: v1.49
- `location` ?<[Object]>
  - `file` <[string]>
  - `line` ?<[int]>
  - `column` ?<[int]>

Specifies a custom location for the group to be shown in the trace viewer. Defaults to the location of the [`method: Tracing.group`] call.

## async method: Tracing.groupEnd
* since: v1.49

Closes the last group created by [`method: Tracing.group`].

## async method: Tracing.stop
* since: v1.12

Stop tracing.

### option: Tracing.stop.path
* since: v1.12
- `path` <[path]>

Export trace into the file with the given path.

## async method: Tracing.stopChunk
* since: v1.15

Stop the trace chunk. See [`method: Tracing.startChunk`] for more details about multiple trace chunks.

### option: Tracing.stopChunk.path
* since: v1.15
- `path` <[path]>

Export trace collected since the last [`method: Tracing.startChunk`] call into the file with the given path.
# class: RequestOptions
* since: v1.18
* langs: java

The [RequestOptions] allows to create form data to be sent via [APIRequestContext]. Playwright will automatically
determine content type of the request.

```java
context.request().post(
  "https://example.com/submit",
  RequestOptions.create()
    .setQueryParam("page", 1)
    .setData("My data"));
```

**Uploading html form data**

[FormData] class can be used to send a form to the server, by default the request will use `application/x-www-form-urlencoded` encoding:

```java
context.request().post("https://example.com/signup", RequestOptions.create().setForm(
  FormData.create()
    .set("firstName", "John")
    .set("lastName", "Doe")));
```

You can also send files as fields of an html form. The data will be encoded using [`multipart/form-data`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST):

```java
Path path = Paths.get("members.csv");
APIResponse response = context.request().post("https://example.com/upload_members",
  RequestOptions.create().setMultipart(FormData.create().set("membersList", path)));
```

Alternatively, you can build the file payload manually:

```java
FilePayload filePayload = new FilePayload("members.csv", "text/csv",
  "Alice, 33\nJohn, 35\n".getBytes(StandardCharsets.UTF_8));
APIResponse response = context.request().post("https://example.com/upload_members",
  RequestOptions.create().setMultipart(FormData.create().set("membersList", filePayload)));
```

## method: RequestOptions.create
* since: v1.18
- returns: <[RequestOptions]>

Creates new instance of [RequestOptions].

## method: RequestOptions.setData
* since: v1.18
- returns: <[RequestOptions]>

Sets the request's post data.

### param: RequestOptions.setData.data
* since: v1.18
- `data` <[string]|[Buffer]|[Serializable]>

Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be
set to `application/octet-stream` if not explicitly set.

## method: RequestOptions.setFailOnStatusCode
* since: v1.18
- returns: <[RequestOptions]>

### param: RequestOptions.setFailOnStatusCode.failOnStatusCode
* since: v1.18
- `failOnStatusCode` <[boolean]>

Whether to throw on response codes other than 2xx and 3xx. By default response object is returned
for all status codes.

## method: RequestOptions.setForm
* since: v1.18
- returns: <[RequestOptions]>

Provides [FormData] object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

### param: RequestOptions.setForm.form
* since: v1.18
- `form` <[FormData]>

Form data to be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body.

## method: RequestOptions.setHeader
* since: v1.18
- returns: <[RequestOptions]>

Sets an HTTP header to the request. This header will apply to the fetched request as well as any redirects initiated by it.

### param: RequestOptions.setHeader.name
* since: v1.18
- `name` <[string]>

Header name.

### param: RequestOptions.setHeader.value
* since: v1.18
- `value` <[string]>

Header value.

## method: RequestOptions.setIgnoreHTTPSErrors
* since: v1.18
- returns: <[RequestOptions]>

### param: RequestOptions.setIgnoreHTTPSErrors.ignoreHTTPSErrors
* since: v1.18
- `ignoreHTTPSErrors` <[boolean]>

Whether to ignore HTTPS errors when sending network requests.

## method: RequestOptions.setMaxRedirects
* since: v1.26
- returns: <[RequestOptions]>

### param: RequestOptions.setMaxRedirects.maxRedirects
* since: v1.26
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects.

## method: RequestOptions.setMaxRetries
* since: v1.46
- returns: <[RequestOptions]>

### param: RequestOptions.setMaxRetries.maxRetries
* since: v1.46
- `maxRetries` <[int]>

Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.

## method: RequestOptions.setMethod
* since: v1.18
- returns: <[RequestOptions]>

Changes the request method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or
[POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)).

### param: RequestOptions.setMethod.method
* since: v1.18
- `method` <[string]>

Request method, e.g. [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

## method: RequestOptions.setMultipart
* since: v1.18
- returns: <[RequestOptions]>

Provides [FormData] object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided.

### param: RequestOptions.setMultipart.form
* since: v1.18
- `form` <[FormData]>

Form data to be serialized as html form using `multipart/form-data` encoding and sent as
this request body.

## method: RequestOptions.setQueryParam
* since: v1.18
- returns: <[RequestOptions]>

Adds a query parameter to the request URL.

### param: RequestOptions.setQueryParam.name
* since: v1.18
- `name` <[string]>

Parameter name.

### param: RequestOptions.setQueryParam.value
* since: v1.18
- `value` <[string]|[boolean]|[int]>

Parameter value.

## method: RequestOptions.setTimeout
* since: v1.18
- returns: <[RequestOptions]>

Sets request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### param: RequestOptions.setTimeout.timeout
* since: v1.18
- `timeout` <[float]>

Request timeout in milliseconds.
# class: AndroidInput
* since: v1.9
* langs: js

## async method: AndroidInput.drag
* since: v1.9

Performs a drag between [`param: from`] and [`param: to`] points.

### param: AndroidInput.drag.from
* since: v1.9
- `from` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

The start point of the drag.

### param: AndroidInput.drag.to
* since: v1.9
- `to` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

The end point of the drag.

### param: AndroidInput.drag.steps
* since: v1.9
- `steps` <[int]>

The number of steps in the drag. Each step takes 5 milliseconds to complete.

## async method: AndroidInput.press
* since: v1.9

Presses the [`param: key`].

### param: AndroidInput.press.key
* since: v1.9
- `key` <[AndroidKey]>

Key to press.

## async method: AndroidInput.swipe
* since: v1.9

Swipes following the path defined by [`param: segments`].

### param: AndroidInput.swipe.from
* since: v1.9
- `from` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

The point to start swiping from.

### param: AndroidInput.swipe.segments
* since: v1.9
- `segments` <[Array]<[Object]>>
  - `x` <[float]>
  - `y` <[float]>

Points following the [`param: from`] point in the swipe gesture.

### param: AndroidInput.swipe.steps
* since: v1.9
- `steps` <[int]>

The number of steps for each segment. Each step takes 5 milliseconds to complete, so 100 steps means half a second per each segment.

## async method: AndroidInput.tap
* since: v1.9

Taps at the specified [`param: point`].

### param: AndroidInput.tap.point
* since: v1.9
- `point` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

The point to tap at.

## async method: AndroidInput.type
* since: v1.9

Types [`param: text`] into currently focused widget.

### param: AndroidInput.type.text
* since: v1.9
- `text` <[string]>

Text to type.
# class: Dialog
* since: v1.8

[Dialog] objects are dispatched by page via the [`event: Page.dialog`] event.

An example of using `Dialog` class:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });
  await page.evaluate(() => alert('1'));
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      page.onDialog(dialog -> {
        System.out.println(dialog.message());
        dialog.dismiss();
      });
      page.evaluate("alert('1')");
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def handle_dialog(dialog):
    print(dialog.message)
    await dialog.dismiss()

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    page.on("dialog", handle_dialog)
    page.evaluate("alert('1')")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def handle_dialog(dialog):
    print(dialog.message)
    dialog.dismiss()

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    page.on("dialog", handle_dialog)
    page.evaluate("alert('1')")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class DialogExample
{
    public static async Task Run()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync();
        var page = await browser.NewPageAsync();

        page.Dialog += async (_, dialog) =>
        {
            System.Console.WriteLine(dialog.Message);
            await dialog.DismissAsync();
        };

        await page.EvaluateAsync("alert('1');");
    }
}
```

:::note
Dialogs are dismissed automatically, unless there is a [`event: Page.dialog`] listener.
When listener is present, it **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.
:::

## async method: Dialog.accept
* since: v1.8

Returns when the dialog has been accepted.

### param: Dialog.accept.promptText
* since: v1.8
- `promptText` ?<[string]>

A text to enter in prompt. Does not cause any effects if the dialog's `type` is not prompt. Optional.

## method: Dialog.defaultValue
* since: v1.8
- returns: <[string]>

If dialog is prompt, returns default prompt value. Otherwise, returns empty string.

## async method: Dialog.dismiss
* since: v1.8

Returns when the dialog has been dismissed.

## method: Dialog.message
* since: v1.8
- returns: <[string]>

A message displayed in the dialog.

## method: Dialog.page
* since: v1.34
- returns: <[null]|[Page]>

The page that initiated this dialog, if available.

## method: Dialog.type
* since: v1.8
- returns: <[string]>

Returns dialog's type, can be one of `alert`, `beforeunload`, `confirm` or `prompt`.
# class: GenericAssertions
* since: v1.9
* langs: js

The [GenericAssertions] class provides assertion methods that can be used to make assertions about any values in the tests. A new instance of [GenericAssertions] is created by calling [`method: PlaywrightAssertions.expectGeneric`]:

```js
import { test, expect } from '@playwright/test';

test('assert a value', async ({ page }) => {
  const value = 1;
  expect(value).toBe(2);
});
```

## property: GenericAssertions.not
* since: v1.9
- returns: <[GenericAssertions]>

Makes the assertion check for the opposite condition. For example, the following code passes:

```js
const value = 1;
expect(value).not.toBe(2);
```


## method: GenericAssertions.toBe
* since: v1.9

Compares value with [`param: expected`] by calling `Object.is`. This method compares objects by reference instead of their contents, similarly to the strict equality operator `===`.

**Usage**

```js
const value = { prop: 1 };
expect(value).toBe(value);
expect(value).not.toBe({});
expect(value.prop).toBe(1);
```

### param: GenericAssertions.toBe.expected
* since: v1.9
- `expected` <[any]>

Expected value.



## method: GenericAssertions.toBeCloseTo
* since: v1.9

Compares floating point numbers for approximate equality. Use this method instead of [`method: GenericAssertions.toBe`] when comparing floating point numbers.

**Usage**

```js
expect(0.1 + 0.2).not.toBe(0.3);
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
```

### param: GenericAssertions.toBeCloseTo.expected
* since: v1.9
- `expected` <[float]>

Expected value.

### param: GenericAssertions.toBeCloseTo.numDigits
* since: v1.9
- `numDigits` ?<[int]>

The number of decimal digits after the decimal point that must be equal.



## method: GenericAssertions.toBeDefined
* since: v1.9

Ensures that value is not `undefined`.

**Usage**

```js
const value = null;
expect(value).toBeDefined();
```


## method: GenericAssertions.toBeFalsy
* since: v1.9

Ensures that value is false in a boolean context, one of `false`, `0`, `''`, `null`, `undefined` or `NaN`. Use this method when you don't care about the specific value.

**Usage**

```js
const value = null;
expect(value).toBeFalsy();
```


## method: GenericAssertions.toBeGreaterThan
* since: v1.9

Ensures that `value > expected` for number or big integer values.

**Usage**

```js
const value = 42;
expect(value).toBeGreaterThan(1);
```

### param: GenericAssertions.toBeGreaterThan.expected
* since: v1.9
- `expected` <[float]|[bigint]>

The value to compare to.



## method: GenericAssertions.toBeGreaterThanOrEqual
* since: v1.9

Ensures that `value >= expected` for number or big integer values.

**Usage**

```js
const value = 42;
expect(value).toBeGreaterThanOrEqual(42);
```

### param: GenericAssertions.toBeGreaterThanOrEqual.expected
* since: v1.9
- `expected` <[float]|[bigint]>

The value to compare to.



## method: GenericAssertions.toBeInstanceOf
* since: v1.9

Ensures that value is an instance of a class. Uses `instanceof` operator.

**Usage**

```js
expect(page).toBeInstanceOf(Page);

class Example {}
expect(new Example()).toBeInstanceOf(Example);
```

### param: GenericAssertions.toBeInstanceOf.expected
* since: v1.9
- `expected` <[Function]>

The class or constructor function.



## method: GenericAssertions.toBeLessThan
* since: v1.9

Ensures that `value < expected` for number or big integer values.

**Usage**

```js
const value = 42;
expect(value).toBeLessThan(100);
```

### param: GenericAssertions.toBeLessThan.expected
* since: v1.9
- `expected` <[float]|[bigint]>

The value to compare to.



## method: GenericAssertions.toBeLessThanOrEqual
* since: v1.9

Ensures that `value <= expected` for number or big integer values.

**Usage**

```js
const value = 42;
expect(value).toBeLessThanOrEqual(42);
```

### param: GenericAssertions.toBeLessThanOrEqual.expected
* since: v1.9
- `expected` <[float]|[bigint]>

The value to compare to.



## method: GenericAssertions.toBeNaN
* since: v1.9

Ensures that value is `NaN`.

**Usage**

```js
const value = NaN;
expect(value).toBeNaN();
```


## method: GenericAssertions.toBeNull
* since: v1.9

Ensures that value is `null`.

**Usage**

```js
const value = null;
expect(value).toBeNull();
```



## method: GenericAssertions.toBeTruthy
* since: v1.9

Ensures that value is true in a boolean context, **anything but** `false`, `0`, `''`, `null`, `undefined` or `NaN`. Use this method when you don't care about the specific value.

**Usage**

```js
const value = { example: 'value' };
expect(value).toBeTruthy();
```


## method: GenericAssertions.toBeUndefined
* since: v1.9

Ensures that value is `undefined`.

**Usage**

```js
const value = undefined;
expect(value).toBeUndefined();
```


## method: GenericAssertions.toContain#1
* since: v1.9

Ensures that string value contains an expected substring. Comparison is case-sensitive.

**Usage**

```js
const value = 'Hello, World';
expect(value).toContain('World');
expect(value).toContain(',');
```

### param: GenericAssertions.toContain#1.expected
* since: v1.9
- `expected` <[string]>

Expected substring.



## method: GenericAssertions.toContain#2
* since: v1.9

Ensures that value is an `Array` or `Set` and contains an expected item.

**Usage**

```js
const value = [1, 2, 3];
expect(value).toContain(2);
expect(new Set(value)).toContain(2);
```

### param: GenericAssertions.toContain#2.expected
* since: v1.9
- `expected` <[any]>

Expected value in the collection.



## method: GenericAssertions.toContainEqual
* since: v1.9

Ensures that value is an `Array` or `Set` and contains an item equal to the expected.

For objects, this method recursively checks equality of all fields, rather than comparing objects by reference as performed by [`method: GenericAssertions.toContain#2`].

For primitive values, this method is equivalent to [`method: GenericAssertions.toContain#2`].

**Usage**

```js
const value = [
  { example: 1 },
  { another: 2 },
  { more: 3 },
];
expect(value).toContainEqual({ another: 2 });
expect(new Set(value)).toContainEqual({ another: 2 });
```

### param: GenericAssertions.toContainEqual.expected
* since: v1.9
- `expected` <[any]>

Expected value in the collection.



## method: GenericAssertions.toEqual
* since: v1.9

Compares contents of the value with contents of [`param: expected`], performing "deep equality" check.

For objects, this method recursively checks equality of all fields, rather than comparing objects by reference as performed by [`method: GenericAssertions.toBe`].

For primitive values, this method is equivalent to [`method: GenericAssertions.toBe`].

**Usage**

```js
const value = { prop: 1 };
expect(value).toEqual({ prop: 1 });
```

**Non-strict equality**

[`method: GenericAssertions.toEqual`] performs deep equality check that compares contents of the received and expected values. To ensure two objects reference the same instance, use [`method: GenericAssertions.toBe`] instead.

[`method: GenericAssertions.toEqual`] ignores `undefined` properties and array items, and does not insist on object types being equal. For stricter matching, use [`method: GenericAssertions.toStrictEqual`].

**Pattern matching**

[`method: GenericAssertions.toEqual`] can be also used to perform pattern matching on objects, arrays and primitive types, with the help of the following matchers:

* [`method: GenericAssertions.any`]
* [`method: GenericAssertions.anything`]
* [`method: GenericAssertions.arrayContaining`]
* [`method: GenericAssertions.arrayOf`]
* [`method: GenericAssertions.closeTo`]
* [`method: GenericAssertions.objectContaining`]
* [`method: GenericAssertions.stringContaining`]
* [`method: GenericAssertions.stringMatching`]

Here is an example that asserts some of the values inside a complex object:
```js
expect({
  list: [1, 2, 3],
  obj: { prop: 'Hello world!', another: 'some other value' },
  extra: 'extra',
}).toEqual(expect.objectContaining({
  list: expect.arrayContaining([2, 3]),
  obj: expect.objectContaining({ prop: expect.stringContaining('Hello') }),
}));
```

### param: GenericAssertions.toEqual.expected
* since: v1.9
- `expected` <[any]>

Expected value.



## method: GenericAssertions.toHaveLength
* since: v1.9

Ensures that value has a `.length` property equal to [`param: expected`]. Useful for arrays and strings.

**Usage**

```js
expect('Hello, World').toHaveLength(12);
expect([1, 2, 3]).toHaveLength(3);
```

### param: GenericAssertions.toHaveLength.expected
* since: v1.9
- `expected` <[int]>

Expected length.



## method: GenericAssertions.toHaveProperty
* since: v1.9

Ensures that property at provided `keyPath` exists on the object and optionally checks that property is equal to the [`param: expected`]. Equality is checked recursively, similarly to [`method: GenericAssertions.toEqual`].

**Usage**

```js
const value = {
  a: {
    b: [42],
  },
  c: true,
};
expect(value).toHaveProperty('a.b');
expect(value).toHaveProperty('a.b', [42]);
expect(value).toHaveProperty('a.b[0]', 42);
expect(value).toHaveProperty('c');
expect(value).toHaveProperty('c', true);
```

### param: GenericAssertions.toHaveProperty.keyPath
* since: v1.9
- `keyPath` <[string]>

Path to the property. Use dot notation `a.b` to check nested properties and indexed `a[2]` notation to check nested array items.

### param: GenericAssertions.toHaveProperty.expected
* since: v1.9
- `expected` ?<[any]>

Optional expected value to compare the property to.



## method: GenericAssertions.toMatch
* since: v1.9

Ensures that string value matches a regular expression.

**Usage**

```js
const value = 'Is 42 enough?';
expect(value).toMatch(/Is \d+ enough/);
```

### param: GenericAssertions.toMatch.expected
* since: v1.9
- `expected` <[RegExp]|[string]>

Regular expression to match against.



## method: GenericAssertions.toMatchObject
* since: v1.9

Compares contents of the value with contents of [`param: expected`], performing "deep equality" check. Allows extra properties to be present in the value, unlike [`method: GenericAssertions.toEqual`], so you can check just a subset of object properties.

When comparing arrays, the number of items must match, and each item is checked recursively.

**Usage**

```js
const value = {
  a: 1,
  b: 2,
  c: true,
};
expect(value).toMatchObject({ a: 1, c: true });
expect(value).toMatchObject({ b: 2, c: true });

expect([{ a: 1, b: 2 }]).toMatchObject([{ a: 1 }]);
```

### param: GenericAssertions.toMatchObject.expected
* since: v1.9
- `expected` <[Object]|[Array]>

The expected object value to match against.



## method: GenericAssertions.toStrictEqual
* since: v1.9

Compares contents of the value with contents of [`param: expected`] **and** their types.

Differences from [`method: GenericAssertions.toEqual`]:

* Keys with undefined properties are checked. For example, `{ a: undefined, b: 2 }` does not match `{ b: 2 }`.
* Array sparseness is checked. For example, `[, 1]` does not match `[undefined, 1]`.
* Object types are checked to be equal. For example, a class instance with fields `a` and `b` will not equal a literal object with fields `a` and `b`.

**Usage**

```js
const value = { prop: 1 };
expect(value).toStrictEqual({ prop: 1 });
```

### param: GenericAssertions.toStrictEqual.expected
* since: v1.9
- `expected` <[any]>

Expected value.



## method: GenericAssertions.toThrow
* since: v1.9

Calls the function and ensures it throws an error.

Optionally compares the error with [`param: expected`]. Allowed expected values:
* Regular expression - error message should **match** the pattern.
* String - error message should **include** the substring.
* Error object - error message should be **equal to** the message property of the object.
* Error class - error object should be an **instance of** the class.

**Usage**

```js
expect(() => {
  throw new Error('Something bad');
}).toThrow();

expect(() => {
  throw new Error('Something bad');
}).toThrow(/something/);

expect(() => {
  throw new Error('Something bad');
}).toThrow(Error);
```

### param: GenericAssertions.toThrow.expected
* since: v1.9
- `expected` ?<[any]>

Expected error message or error object.



## method: GenericAssertions.toThrowError
* since: v1.9

An alias for [`method: GenericAssertions.toThrow`].

**Usage**

```js
expect(() => {
  throw new Error('Something bad');
}).toThrowError();
```

### param: GenericAssertions.toThrowError.expected
* since: v1.9
- `expected` ?<[any]>

Expected error message or error object.


## method: GenericAssertions.any
* since: v1.9

`expect.any()` matches any object instance created from the [`param: constructor`] or a corresponding primitive type. Use it inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
// Match instance of a class.
class Example {}
expect(new Example()).toEqual(expect.any(Example));

// Match any number.
expect({ prop: 1 }).toEqual({ prop: expect.any(Number) });

// Match any string.
expect('abc').toEqual(expect.any(String));
```

### param: GenericAssertions.any.constructor
* since: v1.9
- `constructor` <[Function]>

Constructor of the expected object like `ExampleClass`, or a primitive boxed type like `Number`.


## method: GenericAssertions.anything
* since: v1.9

`expect.anything()` matches everything except `null` and `undefined`. Use it inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
const value = { prop: 1 };
expect(value).toEqual({ prop: expect.anything() });
expect(value).not.toEqual({ otherProp: expect.anything() });
```


## method: GenericAssertions.arrayContaining
* since: v1.9

`expect.arrayContaining()` matches an array that contains all of the elements in the expected array, in any order. Note that received array may be a superset of the expected array and contain some extra elements.

Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect([1, 2, 3]).toEqual(expect.arrayContaining([3, 1]));
expect([1, 2, 3]).not.toEqual(expect.arrayContaining([1, 4]));
```

### param: GenericAssertions.arrayContaining.expected
* since: v1.9
- `expected` <[Array]<[any]>>

Expected array that is a subset of the received value.


## method: GenericAssertions.arrayOf
* since: v1.57

`expect.arrayOf()` matches array of objects created from the [`param: constructor`] or a corresponding primitive type. Use it inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
// Match instance of a class.
class Example {}
expect([new Example(), new Example()]).toEqual(expect.arrayOf(Example));

// Match any string.
expect(['a', 'b', 'c']).toEqual(expect.arrayOf(String));
```

### param: GenericAssertions.arrayOf.constructor
* since: v1.57
- `constructor` <[Function]>

Constructor of the expected object like `ExampleClass`, or a primitive boxed type like `Number`.


## method: GenericAssertions.closeTo
* since: v1.9

Compares floating point numbers for approximate equality. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching. When just comparing two numbers, prefer [`method: GenericAssertions.toBeCloseTo`].

**Usage**

```js
expect({ prop: 0.1 + 0.2 }).not.toEqual({ prop: 0.3 });
expect({ prop: 0.1 + 0.2 }).toEqual({ prop: expect.closeTo(0.3, 5) });
```

### param: GenericAssertions.closeTo.expected
* since: v1.9
- `expected` <[float]>

Expected value.

### param: GenericAssertions.closeTo.numDigits
* since: v1.9
- `numDigits` ?<[int]>

The number of decimal digits after the decimal point that must be equal.


## method: GenericAssertions.objectContaining
* since: v1.9

`expect.objectContaining()` matches an object that contains and matches all of the properties in the expected object. Note that received object may be a superset of the expected object and contain some extra properties.

Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching. Object properties can be matchers to further relax the expectation. See examples.

**Usage**

```js
// Assert some of the properties.
expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ foo: 1 }));

// Matchers can be used on the properties as well.
expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ bar: expect.any(Number) }));

// Complex matching of sub-properties.
expect({
  list: [1, 2, 3],
  obj: { prop: 'Hello world!', another: 'some other value' },
  extra: 'extra',
}).toEqual(expect.objectContaining({
  list: expect.arrayContaining([2, 3]),
  obj: expect.objectContaining({ prop: expect.stringContaining('Hello') }),
}));
```

### param: GenericAssertions.objectContaining.expected
* since: v1.9
- `expected` <[Object]>

Expected object pattern that contains a subset of the properties.


## method: GenericAssertions.stringContaining
* since: v1.9

`expect.stringContaining()` matches a string that contains the expected substring. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect('Hello world!').toEqual(expect.stringContaining('Hello'));
```

### param: GenericAssertions.stringContaining.expected
* since: v1.9
- `expected` <[string]>

Expected substring.


## method: GenericAssertions.stringMatching
* since: v1.9

`expect.stringMatching()` matches a received string that in turn matches the expected pattern. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect('123ms').toEqual(expect.stringMatching(/\d+m?s/));

// Inside another matcher.
expect({
  status: 'passed',
  time: '123ms',
}).toEqual({
  status: expect.stringMatching(/passed|failed/),
  time: expect.stringMatching(/\d+m?s/),
});
```

### param: GenericAssertions.stringMatching.expected
* since: v1.9
- `expected` <[string]|[RegExp]>

Pattern that expected string should match.
# class: Error
* since: v1.11
* langs: python
* extends: [Exception]

Error is raised whenever certain operations are terminated abnormally, e.g.
browser closes while [`method: Page.evaluate`] is running. All Playwright exceptions
inherit from this class.

## property: Error.message
* since: v1.11
- returns: <[str]>

Message of the error.

## property: Error.name
* since: v1.11
- returns: ?<[str]>

Name of the error which got thrown inside the browser. Optional.

## property: Error.stack
* since: v1.11
- returns: ?<[str]>

Stack of the error which got thrown inside the browser. Optional.
# class: APIResponseAssertions
* since: v1.18

The [APIResponseAssertions] class provides assertion methods that can be used to make assertions about the [APIResponse] in the tests.

```js
import { test, expect } from '@playwright/test';

test('navigates to login', async ({ page }) => {
  // ...
  const response = await page.request.get('https://playwright.dev');
  await expect(response).toBeOK();
});
```

```java
// ...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestPage {
  // ...
  @Test
  void navigatesToLoginPage() {
    // ...
    APIResponse response = page.request().get("https://playwright.dev");
    assertThat(response).isOK();
  }
}
```

```python async
from playwright.async_api import Page, expect

async def test_navigates_to_login_page(page: Page) -> None:
    # ..
    response = await page.request.get('https://playwright.dev')
    await expect(response).to_be_ok()
```

```python sync
from playwright.sync_api import Page, expect

def test_navigates_to_login_page(page: Page) -> None:
    # ..
    response = page.request.get('https://playwright.dev')
    expect(response).to_be_ok()
```

## property: APIResponseAssertions.not
* since: v1.20
* langs: java, js, csharp
- returns: <[APIResponseAssertions]>

Makes the assertion check for the opposite condition. For example, this code tests that the response status is not successful:

```js
await expect(response).not.toBeOK();
```

```java
assertThat(response).not().isOK();
```

## async method: APIResponseAssertions.NotToBeOK
* since: v1.19
* langs: python

The opposite of [`method: APIResponseAssertions.toBeOK`].

## async method: APIResponseAssertions.toBeOK
* since: v1.18
* langs:
  - alias-java: isOK

Ensures the response status code is within `200..299` range.

**Usage**

```js
await expect(response).toBeOK();
```

```java
assertThat(response).isOK();
```

```python async
from playwright.async_api import expect

# ...
await expect(response).to_be_ok()
```

```python sync
import re
from playwright.sync_api import expect

# ...
expect(response).to_be_ok()
```
# class: BrowserServer
* since: v1.8
* langs: js

## event: BrowserServer.close
* since: v1.8

Emitted when the browser server closes.

## async method: BrowserServer.close
* since: v1.8

Closes the browser gracefully and makes sure the process is terminated.

## async method: BrowserServer.kill
* since: v1.8

Kills the browser process and waits for the process to exit.

## method: BrowserServer.process
* since: v1.8
- returns: <[ChildProcess]>

Spawned browser application process.

## method: BrowserServer.wsEndpoint
* since: v1.8
- returns: <[string]>

Browser websocket url.

Browser websocket endpoint which can be used as an argument to [`method: BrowserType.connect`] to establish connection
to the browser.

Note that if the listen `host` option in `launchServer` options is not specified, localhost will be output anyway, even if the actual listening address is an unspecified address.
# class: FrameLocator
* since: v1.17

FrameLocator represents a view to the `iframe` on the page. It captures the logic sufficient to retrieve the `iframe` and locate elements in that iframe. FrameLocator can be created with either [`method: Locator.contentFrame`], [`method: Page.frameLocator`] or [`method: Locator.frameLocator`] method.

```js
const locator = page.locator('#my-frame').contentFrame().getByText('Submit');
await locator.click();
```

```java
Locator locator = page.locator("#my-frame").contentFrame().getByText("Submit");
locator.click();
```

```python async
locator = page.locator("#my-frame").content_frame.get_by_text("Submit")
await locator.click()
```

```python sync
locator = page.locator("my-frame").content_frame.get_by_text("Submit")
locator.click()
```

```csharp
var locator = page.Locator("#my-frame").ContentFrame.GetByText("Submit");
await locator.ClickAsync();
```

**Strictness**

Frame locators are strict. This means that all operations on frame locators will throw if more than one element matches a given selector.

```js
// Throws if there are several frames in DOM:
await page.locator('.result-frame').contentFrame().getByRole('button').click();

// Works because we explicitly tell locator to pick the first frame:
await page.locator('.result-frame').contentFrame().first().getByRole('button').click();
```

```python async
# Throws if there are several frames in DOM:
await page.locator('.result-frame').content_frame.get_by_role('button').click()

# Works because we explicitly tell locator to pick the first frame:
await page.locator('.result-frame').first.content_frame.get_by_role('button').click()
```

```python sync
# Throws if there are several frames in DOM:
page.locator('.result-frame').content_frame.get_by_role('button').click()

# Works because we explicitly tell locator to pick the first frame:
page.locator('.result-frame').first.content_frame.get_by_role('button').click()
```

```java
// Throws if there are several frames in DOM:
page.locator(".result-frame").contentFrame().getByRole(AriaRole.BUTTON).click();

// Works because we explicitly tell locator to pick the first frame:
page.locator(".result-frame").first().contentFrame().getByRole(AriaRole.BUTTON).click();
```

```csharp
// Throws if there are several frames in DOM:
await page.Locator(".result-frame").ContentFrame.GetByRole(AriaRole.Button).ClickAsync();

// Works because we explicitly tell locator to pick the first frame:
await page.Locator(".result-frame").First.ContentFrame.getByRole(AriaRole.Button).ClickAsync();
```

**Converting Locator to FrameLocator**

If you have a [Locator] object pointing to an `iframe` it can be converted to [FrameLocator] using [`method: Locator.contentFrame`].

**Converting FrameLocator to Locator**

If you have a [FrameLocator] object it can be converted to [Locator] pointing to the same `iframe` using [`method: FrameLocator.owner`].


## method: FrameLocator.first
* deprecated: Use [`method: Locator.first`] followed by [`method: Locator.contentFrame`] instead.
* since: v1.17
- returns: <[FrameLocator]>

Returns locator to the first matching frame.

## method: FrameLocator.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements
in that iframe.

### param: FrameLocator.frameLocator.selector = %%-find-selector-%%
* since: v1.17

## method: FrameLocator.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

### param: FrameLocator.getByAltText.text = %%-locator-get-by-text-text-%%

### option: FrameLocator.getByAltText.exact = %%-locator-get-by-text-exact-%%

## method: FrameLocator.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

### param: FrameLocator.getByLabel.text = %%-locator-get-by-text-text-%%

### option: FrameLocator.getByLabel.exact = %%-locator-get-by-text-exact-%%

## method: FrameLocator.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

### param: FrameLocator.getByPlaceholder.text = %%-locator-get-by-text-text-%%

### option: FrameLocator.getByPlaceholder.exact = %%-locator-get-by-text-exact-%%

## method: FrameLocator.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: FrameLocator.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: FrameLocator.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

### option: FrameLocator.getByRole.exact = %%-locator-get-by-role-option-exact-%%

## method: FrameLocator.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: FrameLocator.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: FrameLocator.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

### param: FrameLocator.getByText.text = %%-locator-get-by-text-text-%%

### option: FrameLocator.getByText.exact = %%-locator-get-by-text-exact-%%

## method: FrameLocator.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

### param: FrameLocator.getByTitle.text = %%-locator-get-by-text-text-%%

### option: FrameLocator.getByTitle.exact = %%-locator-get-by-text-exact-%%

## method: FrameLocator.last
* deprecated: Use [`method: Locator.last`] followed by [`method: Locator.contentFrame`] instead.
* since: v1.17
- returns: <[FrameLocator]>

Returns locator to the last matching frame.

## method: FrameLocator.locator
* since: v1.17
- returns: <[Locator]>

%%-template-locator-locator-%%

### param: FrameLocator.locator.selectorOrLocator = %%-find-selector-or-locator-%%
* since: v1.17

### option: FrameLocator.locator.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.17

### option: FrameLocator.locator.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: FrameLocator.locator.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

## method: FrameLocator.nth
* deprecated: Use [`method: Locator.nth`] followed by [`method: Locator.contentFrame`] instead.
* since: v1.17
- returns: <[FrameLocator]>

Returns locator to the n-th matching frame. It's zero based, `nth(0)` selects the first frame.

### param: FrameLocator.nth.index
* since: v1.17
- `index` <[int]>

## method: FrameLocator.owner
* since: v1.43
- returns: <[Locator]>

Returns a [Locator] object pointing to the same `iframe` as this frame locator.

Useful when you have a [FrameLocator] object obtained somewhere, and later on would like to interact with the `iframe` element.

For a reverse operation, use [`method: Locator.contentFrame`].

**Usage**

```js
const frameLocator = page.locator('iframe[name="embedded"]').contentFrame();
// ...
const locator = frameLocator.owner();
await expect(locator).toBeVisible();
```

```java
FrameLocator frameLocator = page.locator("iframe[name=\"embedded\"]").contentFrame();
// ...
Locator locator = frameLocator.owner();
assertThat(locator).isVisible();
```

```python async
frame_locator = page.locator("iframe[name=\"embedded\"]").content_frame
# ...
locator = frame_locator.owner
await expect(locator).to_be_visible()
```

```python sync
frame_locator = page.locator("iframe[name=\"embedded\"]").content_frame
# ...
locator = frame_locator.owner
expect(locator).to_be_visible()
```

```csharp
var frameLocator = Page.Locator("iframe[name=\"embedded\"]").ContentFrame;
// ...
var locator = frameLocator.Owner;
await Expect(locator).ToBeVisibleAsync();
```
# class: WebSocketFrame
* since: v1.9
* langs: csharp, java

The [WebSocketFrame] class represents frames sent over [WebSocket] connections in the page. Frame payload is returned by either [`method: WebSocketFrame.text`] or [`method: WebSocketFrame.binary`] method depending on the its type.

## method: WebSocketFrame.binary
* since: v1.9
- returns: <[null]|[Buffer]>

Returns binary payload.

## method: WebSocketFrame.text
* since: v1.9
- returns: <[null]|[string]>

Returns text payload.
# class: Playwright
* since: v1.8

Playwright module provides a method to launch a browser instance. The following is a typical example of using Playwright
to drive automation:

```js
const { chromium, firefox, webkit } = require('playwright');

(async () => {
  const browser = await chromium.launch();  // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      page.navigate("http://example.com");
      // other actions...
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium # or "firefox" or "webkit".
    browser = await chromium.launch()
    page = await browser.new_page()
    await page.goto("http://example.com")
    # other actions...
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium # or "firefox" or "webkit".
    browser = chromium.launch()
    page = browser.new_page()
    page.goto("http://example.com")
    # other actions...
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PlaywrightExample
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync();
        var page = await browser.NewPageAsync();

        await page.GotoAsync("https://www.microsoft.com");
        // other actions...
    }
}
```

## property: Playwright.chromium
* since: v1.8
- type: <[BrowserType]>

This object can be used to launch or connect to Chromium, returning instances of [Browser].

## property: Playwright.devices
* since: v1.8
* langs: js, python
- type: <[Object]>

Returns a dictionary of devices to be used with [`method: Browser.newContext`] or [`method: Browser.newPage`].

```js
const { webkit, devices } = require('playwright');
const iPhone = devices['iPhone 6'];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...iPhone
  });
  const page = await context.newPage();
  await page.goto('http://example.com');
  // other actions...
  await browser.close();
})();
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    iphone = playwright.devices["iPhone 6"]
    browser = await webkit.launch()
    context = await browser.new_context(**iphone)
    page = await context.new_page()
    await page.goto("http://example.com")
    # other actions...
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    iphone = playwright.devices["iPhone 6"]
    browser = webkit.launch()
    context = browser.new_context(**iphone)
    page = context.new_page()
    page.goto("http://example.com")
    # other actions...
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

## property: Playwright.devices
* since: v1.8
* langs: csharp
- type: <[IReadOnlyDictionary<string, BrowserNewContextOptions>]>

Returns a dictionary of devices to be used with [`method: Browser.newContext`] or [`method: Browser.newPage`].

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PlaywrightExample
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync();
        await using var context = await browser.NewContextAsync(playwright.Devices["iPhone 6"]);

        var page = await context.NewPageAsync();
        await page.GotoAsync("https://www.theverge.com");
        // other actions...
    }
}
```

## property: Playwright.errors
* since: v1.8
* langs: js
- type: <[Object]>
  - `TimeoutError` <[function]> A class of [TimeoutError].

Playwright methods might throw errors if they are unable to fulfill a request. For example,
[`method: Locator.waitFor`] might fail if the selector doesn't match any nodes during the given timeframe.

For certain types of errors Playwright uses specific error classes. These classes are available via
[`playwright.errors`](#playwright-errors).

An example of handling a timeout error:

```js
try {
  await page.locator('.foo').waitFor();
} catch (e) {
  if (e instanceof playwright.errors.TimeoutError) {
    // Do something if this is a timeout.
  }
}
```

```python async
try:
  await page.wait_for_selector(".foo")
except TimeoutError as e:
  pass
  # do something if this is a timeout.
```

```python sync
try:
  page.wait_for_selector(".foo")
except TimeoutError as e:
  pass
  # do something if this is a timeout.
```

## property: Playwright.firefox
* since: v1.8
- type: <[BrowserType]>

This object can be used to launch or connect to Firefox, returning instances of [Browser].

## property: Playwright.request
* since: v1.16
* langs:
  - alias-csharp: APIRequest
- type: <[APIRequest]>

Exposes API that can be used for the Web API testing.

## property: Playwright.selectors
* since: v1.8
- type: <[Selectors]>

Selectors can be used to install custom selector engines. See
[extensibility](../extensibility.md) for more information.

## property: Playwright.webkit
* since: v1.8
- type: <[BrowserType]>

This object can be used to launch or connect to WebKit, returning instances of [Browser].

## method: Playwright.close
* since: v1.9
* langs: java

Terminates this instance of Playwright, will also close all created browsers if they are still running.

## method: Playwright.create
* since: v1.10
* langs: java
- returns: <[Playwright]>

Launches new Playwright driver process and connects to it. [`method: Playwright.close`] should be called when the instance is no longer needed.

```java
Playwright playwright = Playwright.create();
Browser browser = playwright.webkit().launch();
Page page = browser.newPage();
page.navigate("https://www.w3.org/");
playwright.close();
```

### option: Playwright.create.env
* since: v1.13
* langs: java
- `env` <[Object]<[string], [string]>>

Additional environment variables that will be passed to the driver process. By default driver
process inherits environment variables of the Playwright process.

## async method: Playwright.stop
* since: v1.8
* langs: python

Terminates this instance of Playwright in case it was created bypassing the Python context manager. This is useful in REPL applications.

```py
from playwright.sync_api import sync_playwright

playwright = sync_playwright().start()

browser = playwright.chromium.launch()
page = browser.new_page()
page.goto("https://playwright.dev/")
page.screenshot(path="example.png")
browser.close()

playwright.stop()
```
# class: WebSocket
* since: v1.8

The [WebSocket] class represents WebSocket connections within a page. It provides the ability to inspect and manipulate the data being transmitted and received.

If you want to intercept or modify WebSocket frames, consider using [WebSocketRoute].

## event: WebSocket.close
* since: v1.8
- argument: <[WebSocket]>

Fired when the websocket closes.

## event: WebSocket.frameReceived
* since: v1.9
- argument: <[Object]>
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket receives a frame.

## event: WebSocket.frameReceived
* since: v1.9
* langs: python
- argument: <[string]|[Buffer]> frame payload

## event: WebSocket.frameReceived
* since: v1.9
* langs: csharp, java
- argument: <[WebSocketFrame]>

## event: WebSocket.frameSent
* since: v1.9
- argument: <[Object]>
  - `payload` <[string]|[Buffer]> frame payload

Fired when the websocket sends a frame.

## event: WebSocket.frameSent
* since: v1.9
* langs: python
- argument: <[string]|[Buffer]> frame payload

## event: WebSocket.frameSent
* since: v1.9
* langs: csharp, java
- argument: <[WebSocketFrame]>

## event: WebSocket.socketError
* since: v1.9
- argument: <[string]>

Fired when the websocket has an error.

## method: WebSocket.isClosed
* since: v1.8
- returns: <[boolean]>

Indicates that the web socket has been closed.

## method: WebSocket.url
* since: v1.8
- returns: <[string]>

Contains the URL of the WebSocket.

## async method: WebSocket.waitForEvent
* since: v1.8
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy
value. Will throw an error if the webSocket is closed before the event is fired. Returns the event data value.

## async method: WebSocket.waitForEvent
* since: v1.8
* langs: python
- returns: <[EventContextManager]>

### param: WebSocket.waitForEvent.event
* since: v1.8
- `event` <[string]>

Event name, same one would pass into `webSocket.on(event)`.

### param: WebSocket.waitForEvent.optionsOrPredicate
* since: v1.8
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

Either a predicate that receives an event or an options object. Optional.

### option: WebSocket.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: WebSocket.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.8

## async method: WebSocket.waitForFrameReceived
* since: v1.10
* langs: java
- returns: <[WebSocketFrame]>

Performs action and waits for a frame to be sent. If predicate is provided, it passes
[WebSocketFrame] value into the `predicate` function and waits for `predicate(webSocketFrame)` to return a truthy value.
Will throw an error if the WebSocket or Page is closed before the frame is received.

### option: WebSocket.waitForFrameReceived.predicate
* since: v1.9
- `predicate` <[function]\([WebSocketFrame]\):[boolean]>

Receives the [WebSocketFrame] object and resolves to truthy value when the waiting should resolve.

### option: WebSocket.waitForFrameReceived.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: WebSocket.waitForFrameReceived.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: WebSocket.waitForFrameSent
* since: v1.10
* langs: java
- returns: <[WebSocketFrame]>

Performs action and waits for a frame to be sent. If predicate is provided, it passes
[WebSocketFrame] value into the `predicate` function and waits for `predicate(webSocketFrame)` to return a truthy value.
Will throw an error if the WebSocket or Page is closed before the frame is sent.

### option: WebSocket.waitForFrameSent.predicate
* since: v1.9
- `predicate` <[function]\([WebSocketFrame]\):[boolean]>

Receives the [WebSocketFrame] object and resolves to truthy value when the waiting should resolve.

### option: WebSocket.waitForFrameSent.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: WebSocket.waitForFrameSent.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: WebSocket.waitForEvent2
* since: v1.8
* langs: python
  - alias-python: wait_for_event
- returns: <[any]>

:::note
In most cases, you should use [`method: WebSocket.waitForEvent`].
:::

Waits for given `event` to fire. If predicate is provided, it passes
event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the socket is closed before the `event` is fired.

### param: WebSocket.waitForEvent2.event = %%-wait-for-event-event-%%
* since: v1.8

### option: WebSocket.waitForEvent2.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: WebSocket.waitForEvent2.timeout = %%-wait-for-event-timeout-%%
* since: v1.8
# class: APIRequest
* since: v1.16

Exposes API that can be used for the Web API testing. This class is used for creating
[APIRequestContext] instance which in turn can be used for sending web requests. An instance
of this class can be obtained via [`property: Playwright.request`]. For more information
see [APIRequestContext].

## async method: APIRequest.newContext
* since: v1.16
- returns: <[APIRequestContext]>

Creates new instances of [APIRequestContext].

### option: APIRequest.newContext.clientCertificates = %%-context-option-clientCertificates-%%
* since: 1.46

### option: APIRequest.newContext.useragent = %%-context-option-useragent-%%
* since: v1.16

### option: APIRequest.newContext.extraHTTPHeaders = %%-context-option-extrahttpheaders-%%
* since: v1.16

### option: APIRequest.newContext.failOnStatusCode
* since: v1.51
- `failOnStatusCode` <[boolean]>

Whether to throw on response codes other than 2xx and 3xx. By default response object is returned
for all status codes.

### option: APIRequest.newContext.httpCredentials = %%-context-option-httpcredentials-%%
* since: v1.16

### option: APIRequest.newContext.proxy = %%-browser-option-proxy-%%
* since: v1.16

### option: APIRequest.newContext.ignoreHTTPSErrors = %%-context-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequest.newContext.maxRedirects
* since: v1.52
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects. This can be overwritten for each request individually.

### option: APIRequest.newContext.timeout
* since: v1.16
- `timeout` <[float]>

Maximum time in milliseconds to wait for the response. Defaults to
`30000` (30 seconds). Pass `0` to disable timeout.

### option: APIRequest.newContext.baseURL
* since: v1.16
- `baseURL` <[string]>

Methods like [`method: APIRequestContext.get`] take the base URL into consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Examples:
* baseURL: `http://localhost:3000` and sending request to `/bar.html` results in `http://localhost:3000/bar.html`
* baseURL: `http://localhost:3000/foo/` and sending request to `./bar.html` results in `http://localhost:3000/foo/bar.html`
* baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`

### option: APIRequest.newContext.storageState
* since: v1.16
* langs: js, python
- `storageState` <[path]|[Object]>
  - `cookies` <[Array]<[Object]>>
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]>
    - `path` <[string]>
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` <[SameSiteAttribute]<"Strict"|"Lax"|"None">>
  - `origins` <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` <[Array]<[Object]>>
      - `name` <[string]>
      - `value` <[string]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`] or [`method: APIRequestContext.storageState`]. Either a path to the
file with saved storage, or the value returned by one of [`method: BrowserContext.storageState`] or
[`method: APIRequestContext.storageState`] methods.

### option: APIRequest.newContext.storageState
* since: v1.16
* langs: java, csharp
- `storageState` <[string]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`] or [`method: APIRequestContext.storageState`]. Either a path to the
file with saved storage, or the value returned by one of [`method: BrowserContext.storageState`] or
[`method: APIRequestContext.storageState`] methods.

### option: APIRequest.newContext.storageStatePath = %%-csharp-java-context-option-storage-state-path-%%
* since: v1.18
# class: AndroidWebView
* since: v1.9
* langs: js

[AndroidWebView] represents a WebView open on the [AndroidDevice]. WebView is usually obtained using [`method: AndroidDevice.webView`].

## event: AndroidWebView.close
* since: v1.9

Emitted when the WebView is closed.

## async method: AndroidWebView.page
* since: v1.9
- returns: <[Page]>

Connects to the WebView and returns a regular Playwright [Page] to interact with.

## method: AndroidWebView.pid
* since: v1.9
- returns: <[int]>

WebView process PID.

## method: AndroidWebView.pkg
* since: v1.9
- returns: <[string]>

WebView package identifier.
# class: AndroidSocket
* since: v1.9
* langs: js

[AndroidSocket] is a way to communicate with a process launched on the [AndroidDevice]. Use [`method: AndroidDevice.open`] to open a socket.

## event: AndroidSocket.close
* since: v1.9

Emitted when the socket is closed.

## event: AndroidSocket.data
* since: v1.9
- argument: <[Buffer]>

Emitted when data is available to read from the socket.

## async method: AndroidSocket.close
* since: v1.9

Closes the socket.

## async method: AndroidSocket.write
* since: v1.9

Writes some [`param: data`] to the socket.

### param: AndroidSocket.write.data
* since: v1.9
- `data` <[Buffer]>

Data to write.
## navigation-wait-until
- `waitUntil` <[WaitUntilState]<"load"|"domcontentloaded"|"networkidle"|"commit">>

When to consider operation succeeded, defaults to `load`. Events can be either:
* `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
* `'load'` - consider operation to be finished when the `load` event is fired.
* `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
* `'commit'` - consider operation to be finished when network response is received and the document started loading.

## navigation-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout.
The default value can be changed by using the
[`method: BrowserContext.setDefaultNavigationTimeout`],
[`method: BrowserContext.setDefaultTimeout`],
[`method: Page.setDefaultNavigationTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## navigation-timeout-js
* langs: js
- `timeout` <[float]>

Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultNavigationTimeout`],
[`method: BrowserContext.setDefaultTimeout`],
[`method: Page.setDefaultNavigationTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## wait-for-function-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
value can be changed by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

## wait-for-function-timeout-js
* langs: js
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

## input-strict
- `strict` <[boolean]>

When true, the call requires selector to resolve to a single element. If given selector resolves to more
than one element, the call throws an exception.

## input-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by
using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## input-timeout-js
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## input-no-wait-after
* deprecated: This option will default to `true` in the future.
- `noWaitAfter` <[boolean]>

Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can
opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating
to inaccessible pages. Defaults to `false`.

## input-no-wait-after-removed
* deprecated: This option has no effect.
- `noWaitAfter` <[boolean]>

This option has no effect.

## input-force
- `force` <[boolean]>

Whether to bypass the [actionability](../actionability.md) checks. Defaults to `false`.

## input-selector
- `selector` <[string]>

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

## input-source
- `source` <[string]>

A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.

## input-target
- `target` <[string]>

A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.

## input-position
- `position` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the
element.

## input-mousemove-steps
- `steps` <[int]>

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.

## input-drag-steps
- `steps` <[int]>

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.

## input-modifiers
- `modifiers` <[Array]<[KeyboardModifier]<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">>>

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current
modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows
and Linux and to "Meta" on macOS.

## input-button
- `button` <[MouseButton]<"left"|"right"|"middle">>

Defaults to `left`.

## input-files
- `files` <[path]|[Array]<[path]>|[Object]|[Array]<[Object]>>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

## input-down-up-delay
- `delay` <[float]>

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

## input-click-count
- `clickCount` <[int]>

defaults to 1. See [UIEvent.detail].

## input-trial
- `trial` <[boolean]>

When set, this method only performs the [actionability](../actionability.md) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

## input-trial-with-modifiers
- `trial` <[boolean]>

When set, this method only performs the [actionability](../actionability.md) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

## input-source-position
- `sourcePosition` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

## input-target-position
- `targetPosition` <[Object]>
  - `x` <[float]>
  - `y` <[float]>

Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

## input-checked
* langs:
  - alias-csharp: checkedState
- `checked` <[boolean]>

Whether to check or uncheck the checkbox.

## query-selector
- `selector` <[string]>

A selector to query for.

## find-selector
- `selector` <[string]>

A selector to use when resolving DOM element.

## find-selector-or-locator
- `selectorOrLocator` <[string]|[Locator]>

A selector or locator to use when resolving DOM element.

## wait-for-selector-state
- `state` <[WaitForSelectorState]<"attached"|"detached"|"visible"|"hidden">>

Defaults to `'visible'`. Can be either:
* `'attached'` - wait for element to be present in DOM.
* `'detached'` - wait for element to not be present in DOM.
* `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without
  any content or with `display:none` has an empty bounding box and is not considered visible.
* `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`.
  This is opposite to the `'visible'` option.

## js-python-wait-for-function-polling
* langs: js, python
- `polling` <[float]|"raf">

If [`option: polling`] is `'raf'`, then [`param: expression`] is constantly executed in `requestAnimationFrame`
callback. If [`option: polling`] is a number, then it is treated as an interval in milliseconds at which the function
would be executed. Defaults to `raf`.

## csharp-java-wait-for-function-polling
* langs: csharp, java
- `pollingInterval` <[float]>

If specified, then it is treated as an interval in milliseconds at which the function would be executed. By default if the option is not specified [`param: expression`] is executed in `requestAnimationFrame` callback.

## browser-option-ignoredefaultargs
* langs: js, python
- `ignoreDefaultArgs` <[boolean]|[Array]<[string]>>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`]. If an
array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.

## csharp-java-browser-option-ignoredefaultargs
* langs: csharp, java
- `ignoreDefaultArgs` <[Array]<[string]>>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`].
Dangerous option; use with care.

## csharp-java-browser-option-ignorealldefaultargs
* langs: csharp, java
- `ignoreAllDefaultArgs` <[boolean]>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`].
Dangerous option; use with care. Defaults to `false`.

## browser-option-proxy
- `proxy` <[Object]>
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example
    `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP
    proxy.
  - `bypass` ?<[string]> Optional comma-separated domains to bypass proxy, for example `".com, chromium.org,
    .domain.com"`.
  - `username` ?<[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` ?<[string]> Optional password to use if HTTP proxy requires authentication.

Network proxy settings.

## js-browser-option-env
* langs: js
- `env` <[Object]<[string], [string]|[undefined]>>

## csharp-java-browser-option-env
* langs: csharp, java
- `env` <[Object]<[string], [string]>>

Specify environment variables that will be visible to the browser. Defaults to `process.env`.

## python-browser-option-env
* langs: python
- `env` <[Object]<[string], [string]|[float]|[boolean]>>

Specify environment variables that will be visible to the browser. Defaults to `process.env`.

## js-python-context-option-storage-state
* langs: js, python
- `storageState` <[path]|[Object]>
  - `cookies` <[Array]<[Object]>> Cookies to set for context
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]> Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"
    - `path` <[string]> Domain and path are required
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` <[SameSiteAttribute]<"Strict"|"Lax"|"None">> sameSite flag
  - `origins` <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` <[Array]<[Object]>> localStorage to set for context
      - `name` <[string]>
      - `value` <[string]>

Learn more about [storage state and auth](../auth.md).

Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [`method: BrowserContext.storageState`].

## csharp-java-context-option-storage-state
* langs: csharp, java
- `storageState` <[string]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`].

## csharp-java-context-option-storage-state-path
* langs: csharp, java
- `storageStatePath` <[path]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`]. Path to the file with saved storage state.

## storagestate-option-path
- `path` <[path]>

The file path to save the storage state to. If [`option: path`] is a relative path, then it is resolved relative to
current working directory. If no path is provided, storage
state is still returned, but won't be saved to the disk.

## context-option-acceptdownloads
- `acceptDownloads` <[boolean]>

Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.

## context-option-ignorehttpserrors
- `ignoreHTTPSErrors` <[boolean]>

Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.

## context-option-bypasscsp
- `bypassCSP` <[boolean]>

Toggles bypassing page's Content-Security-Policy. Defaults to `false`.

## context-option-baseURL
- `baseURL` <[string]>

When using [`method: Page.goto`], [`method: Page.route`], [`method: Page.waitForURL`], [`method: Page.waitForRequest`], or [`method: Page.waitForResponse`] it takes the base URL in consideration by using the [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL. Unset by default. Examples:
* baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
* baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
* baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`

## context-option-viewport
* langs: js, java
  - alias-java: viewportSize
- `viewport` <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent viewport for each page. Defaults to an 1280x720 viewport.
Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation#viewport).

:::note
The `null` value opts out from the default presets, makes viewport depend on the
host window size defined by the operating system. It makes the execution of the
tests non-deterministic.
:::

## csharp-context-option-viewport
* langs: csharp
  - alias-csharp: viewportSize
- `viewport` <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent viewport for each page. Defaults to an 1280x720 viewport.
Use `ViewportSize.NoViewport` to disable the consistent viewport emulation. Learn more about [viewport emulation](../emulation.md#viewport).

:::note
The `ViewportSize.NoViewport` value opts out from the default presets,
makes viewport depend on the host window size defined by the operating system.
It makes the execution of the tests non-deterministic.
:::

## context-option-screen
* langs:
  - alias-java: screenSize
  - alias-csharp: screenSize
- `screen` <[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the
[`option: viewport`] is set.

## page-agent-cache-key
* since: v1.58
- `cacheKey` <[string]>

All the agentic actions are converted to the Playwright calls and are cached.
By default, they are cached globally with the `task` as a key. This option allows controlling the cache key explicitly.

## page-agent-max-tokens
* since: v1.58
- `maxTokens` <[int]>

Maximum number of tokens to consume. The agentic loop will stop after input + output tokens exceed this value.
Defaults to context-wide value specified in `agent` property.

## page-agent-max-actions
* since: v1.58
- `maxActions` <[int]>

Maximum number of agentic actions to generate, defaults to context-wide value specified in `agent` property.

## page-agent-max-action-retries
* since: v1.58
- `maxActionRetries` <[int]>

Maximum number of retries when generating each action, defaults to context-wide value specified in `agent` property.

## page-agent-call-options-v1.58
- %%-page-agent-cache-key-%%
- %%-page-agent-max-tokens-%%
- %%-page-agent-max-actions-%%
- %%-page-agent-max-action-retries-%%

## fetch-param-url
- `url` <[string]>

Target URL.

## js-fetch-option-params
* langs: js
- `params` <[Object]<[string], [string]|[float]|[boolean]>|[URLSearchParams]|[string]>

Query parameters to be sent with the URL.

## python-fetch-option-params
* langs: python
- `params` <[Object]<[string], [string]|[float]|[boolean]>|[string]>

Query parameters to be sent with the URL.

## csharp-fetch-option-params
* langs: csharp
- `params` <[Object]<[string], [Serializable]>>

Query parameters to be sent with the URL.

## csharp-fetch-option-paramsString
* langs: csharp
- `paramsString` <[string]>

Query parameters to be sent with the URL.

## java-fetch-params
* langs: java
- `options` ?<[RequestOptions]>

Optional request parameters.

## js-python-csharp-fetch-option-headers
* langs: js, python, csharp
- `headers` <[Object]<[string], [string]>>

Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.

## js-python-csharp-fetch-option-timeout
* langs: js, python, csharp
- `timeout` <[float]>

Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

## js-python-csharp-fetch-option-failonstatuscode
* langs: js, python, csharp
- `failOnStatusCode` <[boolean]>

Whether to throw on response codes other than 2xx and 3xx. By default response object is returned
for all status codes.

## js-fetch-option-form
* langs: js
- `form` <[Object]<[string], [string]|[float]|[boolean]>|[FormData]>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

## python-fetch-option-form
* langs: python
- `form` <[Object]<[string], [string]|[float]|[boolean]>>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

## csharp-fetch-option-form
* langs: csharp
- `form` <[FormData]>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

An instance of [FormData] can be created via [`method: APIRequestContext.createFormData`].

## js-fetch-option-multipart
* langs: js
- `multipart` <[FormData]|[Object]<[string], [string]|[float]|[boolean]|[ReadStream]|[Object]>>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed either as [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream)
or as file-like object containing file name, mime-type and its content.

## python-fetch-option-multipart
* langs: python
- `multipart` <[Object]<[string], [string]|[float]|[boolean]|[ReadStream]|[Object]>>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content.

## csharp-fetch-option-multipart
* langs: csharp
- `multipart` <[FormData]>

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content.

An instance of [FormData] can be created via [`method: APIRequestContext.createFormData`].

## js-python-csharp-fetch-option-data
* langs: js, python, csharp
- `data` <[string]|[Buffer]|[Serializable]>

Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be
set to `application/octet-stream` if not explicitly set.

## js-python-csharp-fetch-option-ignorehttpserrors
* langs: js, python, csharp
- `ignoreHTTPSErrors` <[boolean]>

Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.

## js-python-csharp-fetch-option-maxredirects
* langs: js, python, csharp
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects.

## js-python-csharp-fetch-option-maxretries
* langs: js, python, csharp
- `maxRetries` <[int]>

Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.

## evaluate-expression
- `expression` <[string]>

JavaScript expression to be evaluated in the browser context. If the expression evaluates
to a function, the function is automatically invoked.

## js-evaluate-pagefunction
* langs: js
- `pageFunction` <[function]|[string]>

Function to be evaluated in the page context.

## js-evalonselector-pagefunction
* langs: js
- `pageFunction` <[function]\([Element]\)|[string]>

Function to be evaluated in the page context.

## js-evalonselectorall-pagefunction
* langs: js
- `pageFunction` <[function]\([Array]<[Element]>\)|[string]>

Function to be evaluated in the page context.

## js-worker-evaluate-workerfunction
* langs: js
- `pageFunction` <[function]|[string]>

Function to be evaluated in the worker context.

## js-electron-evaluate-workerfunction
* langs: js
- `pageFunction` <[function]|[Electron]>

Function to be evaluated in the main Electron process.

## python-context-option-viewport
* langs: python
- `viewport` <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport. Learn more about [viewport emulation](../emulation.md#viewport).

## python-context-option-no-viewport
* langs: python
- `noViewport` <[boolean]>

Does not enforce fixed viewport, allows resizing window in the headed mode.

## context-option-clientCertificates
- `clientCertificates` <[Array]<[Object]>>
  - `origin` <[string]> Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
  - `certPath` ?<[path]> Path to the file with the certificate in PEM format.
  - `cert` ?<[Buffer]> Direct value of the certificate in PEM format.
  - `keyPath` ?<[path]> Path to the file with the private key in PEM format.
  - `key` ?<[Buffer]> Direct value of the private key in PEM format.
  - `pfxPath` ?<[path]> Path to the PFX or PKCS12 encoded private key and certificate chain.
  - `pfx` ?<[Buffer]> Direct value of the PFX or PKCS12 encoded private key and certificate chain.
  - `passphrase` ?<[string]> Passphrase for the private key (PEM or PFX).

TLS Client Authentication allows the server to request a client certificate and verify it.

**Details**

An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.

Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.

:::note
When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
:::

## context-option-useragent
- `userAgent` <[string]>

Specific user agent to use in this context.

## context-option-devicescalefactor
- `deviceScaleFactor` <[float]>

Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](../emulation.md#devices).

## context-option-ismobile
- `isMobile` <[boolean]>

Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](../emulation.md#ismobile).

## context-option-hastouch
- `hasTouch` <[boolean]>

Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](../emulation.md#devices).

## context-option-javascriptenabled
- `javaScriptEnabled` <[boolean]>

Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](../emulation.md#javascript-enabled).

## context-option-timezoneid
- `timezoneId` <[string]>

Changes the timezone of the context. See [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1)
for a list of supported timezone IDs. Defaults to the system timezone.

## context-option-geolocation
- `geolocation` <[Object]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` ?<[float]> Non-negative accuracy value. Defaults to `0`.

## context-option-locale
- `locale` <[string]>

Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](../emulation.md#locale--timezone).

## context-option-permissions
- `permissions` <[Array]<[string]>>

A list of permissions to grant to all pages in this context. See
[`method: BrowserContext.grantPermissions`] for more details. Defaults to none.

## context-option-extrahttpheaders
- `extraHTTPHeaders` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. Defaults to none.

## context-option-offline
- `offline` <[boolean]>

Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](../emulation.md#offline).

## context-option-httpcredentials
- `httpCredentials` <[Object]>
  - `username` <[string]>
  - `password` <[string]>
  - `origin` ?<[string]> Restrain sending http credentials on specific origin (scheme://host:port).
  - `send` ?<[HttpCredentialsSend]<"unauthorized"|"always">> This option only applies to the requests sent from corresponding [APIRequestContext] and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.

Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
If no origin is specified, the username and password are sent to any servers upon unauthorized responses.

## context-option-colorscheme
* langs: js, java
- `colorScheme` <null|[ColorScheme]<"light"|"dark"|"no-preference">>

Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See
[`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.

## context-option-colorscheme-csharp-python
* langs: csharp, python
- `colorScheme` <[ColorScheme]<"light"|"dark"|"no-preference"|"null">>

Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. See
[`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.

## context-option-reducedMotion
* langs: js, java
- `reducedMotion` <null|[ReducedMotion]<"reduce"|"no-preference">>

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-reducedMotion-csharp-python
* langs: csharp, python
- `reducedMotion` <[ReducedMotion]<"reduce"|"no-preference"|"null">>

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-forcedColors
* langs: js, java
- `forcedColors` <null|[ForcedColors]<"active"|"none">>

Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.

## context-option-forcedColors-csharp-python
* langs: csharp, python
- `forcedColors` <[ForcedColors]<"active"|"none"|"null">>

Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.

## context-option-contrast
* langs: js, java
- `contrast` <null|[Contrast]<"no-preference"|"more">>

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-contrast-csharp-python
* langs: csharp, python
- `contrast` <[Contrast]<"no-preference"|"more"|"null">>

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-logger
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging.

## context-option-videospath
* langs: js
* deprecated: Use [`option: recordVideo`] instead.
- `videosPath` <[path]>

## context-option-videosize
* langs: js
* deprecated: Use [`option: recordVideo`] instead.
- `videoSize` <[Object]>
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.

## context-option-recordhar
* langs: js
- `recordHar` <[Object]>
  - `omitContent` ?<[boolean]> Optional setting to control whether to omit request content from the HAR. Defaults to
    `false`. Deprecated, use `content` policy instead.
  - `content` ?<[HarContentPolicy]<"omit"|"embed"|"attach">> Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
  - `path` <[path]> Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, `content: 'attach'` is used by default.
  - `mode` ?<[HarMode]<"full"|"minimal">> When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `urlFilter` ?<[string]|[RegExp]> A glob or regex pattern to filter requests that are stored in the HAR. When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path, it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor. Defaults to none.

Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into `recordHar.path` file. If not
specified, the HAR is not recorded. Make sure to await [`method: BrowserContext.close`] for the HAR to be
saved.

## context-option-recordhar-path
* langs: csharp, java, python
  - alias-python: record_har_path
- `recordHarPath` <[path]>

Enables [HAR](http://www.softwareishard.com/blog/har-12-spec) recording for all pages into the
specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to
call [`method: BrowserContext.close`] for the HAR to be saved.

## context-option-recordhar-omit-content
* langs: csharp, java, python
  - alias-python: record_har_omit_content
- `recordHarOmitContent` ?<[boolean]>

Optional setting to control whether to omit request content from the HAR. Defaults to `false`.

## context-option-recordhar-content
* langs: csharp, java, python
  - alias-python: record_har_content
- `recordHarContent` ?<[HarContentPolicy]<"omit"|"embed"|"attach">>

Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.

## context-option-recordhar-mode
* langs: csharp, java, python
  - alias-python: record_har_mode
- `recordHarMode` ?<[HarMode]<"full"|"minimal">>

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.

## context-option-recordhar-url-filter
* langs: csharp, java, python
  - alias-python: record_har_url_filter
- `recordHarUrlFilter` ?<[string]|[RegExp]>

## context-option-recordvideo
* langs: js
- `recordVideo` <[Object]>
  - `dir` <[path]> Path to the directory to put videos into.
  - `size` ?<[Object]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`
    scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450.
    Actual picture of each page will be scaled down if necessary to fit the specified size.
    - `width` <[int]> Video frame width.
    - `height` <[int]> Video frame height.

Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make
sure to await [`method: BrowserContext.close`] for videos to be saved.

## context-option-recordvideo-dir
* langs: csharp, java, python
  - alias-python: record_video_dir
- `recordVideoDir` <[path]>

Enables video recording for all pages into the specified directory. If not specified videos are
not recorded. Make sure to call [`method: BrowserContext.close`] for videos to be saved.

## context-option-recordvideo-size
* langs: csharp, java, python
  - alias-python: record_video_size
- `recordVideoSize` <[Object]>
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.

Dimensions of the recorded videos. If not specified the size will be equal to `viewport`
scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450.
Actual picture of each page will be scaled down if necessary to fit the specified size.

## context-option-proxy
- `proxy` <[Object]>
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example
    `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` ?<[string]> Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` ?<[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` ?<[string]> Optional password to use if HTTP proxy requires authentication.

Network proxy settings to use with this context. Defaults to none.

## context-option-strict
- `strictSelectors` <[boolean]>

If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations
on selectors that imply single target DOM element will throw when more than one element matches the selector.
This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`.
See [Locator] to learn more about the strict mode.

## context-option-service-worker-policy
- `serviceWorkers` <[ServiceWorkerPolicy]<"allow"|"block">>

Whether to allow sites to register Service workers. Defaults to `'allow'`.
* `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be registered.
* `'block'`: Playwright will block all registration of Service Workers.

## remove-all-listeners-options-behavior
* langs: js
* since: v1.47
- `behavior` <[RemoveAllListenersBehavior]<"wait"|"ignoreErrors"|"default">>

Specifies whether to wait for already running listeners and what to do if they throw errors:
* `'default'` - do not wait for current listener calls (if any) to finish, if the listener throws, it may result in unhandled error
* `'wait'` - wait for current listener calls (if any) to finish
* `'ignoreErrors'` - do not wait for current listener calls (if any) to finish, all errors thrown by the listeners after removal are silently caught

## unroute-all-options-behavior
* langs: js, csharp, python
* since: v1.41
- `behavior` <[UnrouteBehavior]<"wait"|"ignoreErrors"|"default">>

Specifies whether to wait for already running handlers and what to do if they throw errors:
* `'default'` - do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may result in unhandled error
* `'wait'` - wait for current handler calls (if any) to finish
* `'ignoreErrors'` - do not wait for current handler calls (if any) to finish, all errors thrown by the handlers after unrouting are silently caught


## select-options-values
* langs: java, js, csharp
- `values` <[null]|[string]|[ElementHandle]|[Array]<[string]>|[Object]|[Array]<[ElementHandle]>|[Array]<[Object]>>
  - `value` ?<[string]> Matches by `option.value`. Optional.
  - `label` ?<[string]> Matches by `option.label`. Optional.
  - `index` ?<[int]> Matches by the index. Optional.

Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the
first option matching one of the passed options is selected. String values are matching both values and labels. Option
is considered matching if all specified properties match.

## wait-for-navigation-url
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving [URL] to match while waiting for the navigation. Note that if
the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly
equal to the string.

## wait-for-event-event
* langs: js, python, java
- `event` <[string]>

Event name, same one typically passed into `*.on(event)`.

## wait-for-load-state-state
- `state` ?<[LoadState]<"load"|"domcontentloaded"|"networkidle">>

Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the
method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.

## java-wait-for-event-callback
* langs: java
- `callback` <[Runnable]>

Callback that performs the action triggering the event.

## csharp-wait-for-event-action
* langs: csharp
- `action` <[Func<Task>]>

Action that triggers the event.

## python-select-options-element
* langs: python
- `element` ?<[ElementHandle]|[Array]<[ElementHandle]>>

Option elements to select. Optional.

## python-select-options-index
* langs: python
- `index` ?<[int]|[Array]<[int]>>

Options to select by index. Optional.

## python-select-options-value
* langs: python
- `value` ?<[string]|[Array]<[string]>>

Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise
only the first option matching one of the passed options is selected. Optional.

## python-select-options-label
* langs: python
- `label` ?<[string]|[Array]<[string]>>

Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise
only the first option matching one of the passed options is selected. Optional.

## wait-for-event-predicate
- `predicate` <[function]>

Receives the event data and resolves to truthy value when the waiting should resolve.

## wait-for-event-timeout
* langs: csharp, java, python
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
The default value can be changed by using the [`method: BrowserContext.setDefaultTimeout`].

## android-timeout
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by
using the [`method: AndroidDevice.setDefaultTimeout`] method.

## js-assertions-timeout
* langs: js
- `timeout` <[float]>

Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

## csharp-java-python-assertions-timeout
* langs: java, python, csharp
- `timeout` <[float]>

Time to retry the assertion for in milliseconds. Defaults to `5000`.

## assertions-ignore-case
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

## assertions-max-diff-pixels
* langs: js
- `maxDiffPixels` <[int]>

An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by default.

## assertions-max-diff-pixel-ratio
* langs: js
- `maxDiffPixelRatio` <[float]>

An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is configurable with `TestConfig.expect`. Unset by default.

## assertions-threshold
* langs: js
- `threshold` <[float]>

An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ)
between the same pixel in compared images, between zero (strict) and one (lax), default is configurable with
`TestConfig.expect`. Defaults to `0.2`.

## shared-context-params-list-v1.8
- %%-context-option-acceptdownloads-%%
- %%-context-option-ignorehttpserrors-%%
- %%-context-option-bypasscsp-%%
- %%-context-option-baseURL-%%
- %%-context-option-viewport-%%
- %%-csharp-context-option-viewport-%%
- %%-python-context-option-viewport-%%
- %%-context-option-screen-%%
- %%-python-context-option-no-viewport-%%
- %%-context-option-useragent-%%
- %%-context-option-devicescalefactor-%%
- %%-context-option-ismobile-%%
- %%-context-option-hastouch-%%
- %%-context-option-javascriptenabled-%%
- %%-context-option-timezoneid-%%
- %%-context-option-geolocation-%%
- %%-context-option-locale-%%
- %%-context-option-permissions-%%
- %%-context-option-extrahttpheaders-%%
- %%-context-option-offline-%%
- %%-context-option-httpcredentials-%%
- %%-context-option-colorscheme-%%
- %%-context-option-colorscheme-csharp-python-%%
- %%-context-option-reducedMotion-%%
- %%-context-option-reducedMotion-csharp-python-%%
- %%-context-option-forcedColors-%%
- %%-context-option-forcedColors-csharp-python-%%
- %%-context-option-contrast-%%
- %%-context-option-contrast-csharp-python-%%
- %%-context-option-logger-%%
- %%-context-option-videospath-%%
- %%-context-option-videosize-%%
- %%-context-option-recordhar-%%
- %%-context-option-recordhar-path-%%
- %%-context-option-recordhar-omit-content-%%
- %%-context-option-recordhar-content-%%
- %%-context-option-recordhar-mode-%%
- %%-context-option-recordhar-url-filter-%%
- %%-context-option-recordvideo-%%
- %%-context-option-recordvideo-dir-%%
- %%-context-option-recordvideo-size-%%
- %%-context-option-strict-%%
- %%-context-option-service-worker-policy-%%

## browser-option-args
- `args` <[Array]<[string]>>

:::warning
Use custom browser args at your own risk, as some of them may break Playwright functionality.
:::

Additional arguments to pass to the browser instance. The list of Chromium flags can be found
[here](https://peter.sh/experiments/chromium-command-line-switches/).

## browser-option-channel
- `channel` <[string]>

Browser distribution channel.

Use "chromium" to [opt in to new headless mode](../browsers.md#chromium-new-headless-mode).

Use "chrome", "chrome-beta", "chrome-dev", "chrome-canary", "msedge", "msedge-beta", "msedge-dev", or "msedge-canary" to use branded [Google Chrome and Microsoft Edge](../browsers.md#google-chrome--microsoft-edge).

## browser-option-chromiumsandbox
- `chromiumSandbox` <[boolean]>

Enable Chromium sandboxing. Defaults to `false`.


## browser-option-downloadspath
- `downloadsPath` <[path]>

If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is
deleted when browser is closed. In either case, the downloads are deleted when the browser context they were created in
is closed.

## browser-option-executablepath
- `executablePath` <[path]>

Path to a browser executable to run instead of the bundled one. If [`option: executablePath`] is a relative path, then
it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium,
Firefox or WebKit, use at your own risk.

## browser-option-handlesigint
- `handleSIGINT` <[boolean]>

Close the browser process on Ctrl-C. Defaults to `true`.

## browser-option-handlesigterm
- `handleSIGTERM` <[boolean]>

Close the browser process on SIGTERM. Defaults to `true`.

## browser-option-handlesighup
- `handleSIGHUP` <[boolean]>

Close the browser process on SIGHUP. Defaults to `true`.

## browser-option-headless
- `headless` <[boolean]>

Whether to run browser in headless mode. More details for
[Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and
[Firefox](https://hacks.mozilla.org/2017/12/using-headless-mode-in-firefox/). Defaults to `true`.

## js-python-browser-option-firefoxuserprefs
* langs: js, python
- `firefoxUserPrefs` <[Object]<[string], [string]|[float]|[boolean]>>

Firefox user preferences. Learn more about the Firefox user preferences at
[`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).

You can also provide a path to a custom [`policies.json` file](https://mozilla.github.io/policy-templates/) via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.

## csharp-java-browser-option-firefoxuserprefs
* langs: csharp, java
- `firefoxUserPrefs` <[Object]<[string], [any]>>

Firefox user preferences. Learn more about the Firefox user preferences at
[`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).

You can also provide a path to a custom [`policies.json` file](https://mozilla.github.io/policy-templates/) via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.

## browser-option-logger
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging.

## browser-option-timeout
- `timeout` <[float]>

Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to
disable timeout.

## browser-option-tracesdir
- `tracesDir` <[path]>

If specified, traces are saved into this directory.

## browser-option-slowmo
- `slowMo` <[float]>

Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.

## shared-browser-options-list-v1.8
- %%-browser-option-args-%%
- %%-browser-option-channel-%%
- %%-browser-option-chromiumsandbox-%%
- %%-browser-option-downloadspath-%%
- %%-csharp-java-browser-option-env-%%
- %%-js-browser-option-env-%%
- %%-python-browser-option-env-%%
- %%-browser-option-executablepath-%%
- %%-browser-option-handlesigint-%%
- %%-browser-option-handlesigterm-%%
- %%-browser-option-handlesighup-%%
- %%-browser-option-headless-%%
- %%-browser-option-ignoredefaultargs-%%
- %%-browser-option-proxy-%%
- %%-browser-option-timeout-%%
- %%-browser-option-tracesdir-%%

## locator-option-has-text
- `hasText` <[string]|[RegExp]>

Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a [string], matching is case-insensitive and searches for a substring.
For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

## locator-option-has
- `has` <[Locator]>

Narrows down the results of the method to those which contain elements matching this relative locator.
For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.

Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator]s.

## locator-option-has-not
- `hasNot` <[Locator]>

Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one.
For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator]s.

## locator-option-has-not-text
- `hasNotText` <[string]|[RegExp]>

Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a [string], matching is case-insensitive and searches for a substring.

## locator-option-visible
- `visible` <[boolean]>

Only matches visible or invisible elements.

## locator-options-list-v1.14
- %%-locator-option-has-text-%%
- %%-locator-option-has-%%

## screenshot-option-animations
- `animations` <[ScreenshotAnimations]<"disabled"|"allow">>

When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
* finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
* infinite animations are canceled to initial state, and then played over after the screenshot.

Defaults to `"allow"` that leaves animations untouched.

## screenshot-option-animations-default-disabled
- `animations` <[ScreenshotAnimations]<"disabled"|"allow">>

When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
* finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
* infinite animations are canceled to initial state, and then played over after the screenshot.

Defaults to `"disabled"` that disables animations.

## screenshot-option-omit-background
- `omitBackground` <[boolean]>

Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
Defaults to `false`.

## screenshot-option-quality
- `quality` <[int]>

The quality of the image, between 0-100. Not applicable to `png` images.

## screenshot-option-path
- `path` <[path]>

The file path to save the image to. The screenshot type will be inferred from file extension. If [`option: path`] is a
relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be
saved to the disk.

## screenshot-option-type
- `type` <[ScreenshotType]<"png"|"jpeg">>

Specify screenshot type, defaults to `png`.

## screenshot-option-mask
- `mask` <[Array]<[Locator]>>

Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with
a pink box `#FF00FF` (customized by [`option: maskColor`]) that completely covers its bounding box.
The mask is also applied to invisible elements, see [Matching only visible elements](../locators.md#matching-only-visible-elements) to disable that.

## screenshot-option-mask-color
* since: v1.35
- `maskColor` <[string]>

Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.

## screenshot-option-full-page
- `fullPage` <[boolean]>

When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to
`false`.

## screenshot-option-clip
- `clip` <[Object]>
  - `x` <[float]> x-coordinate of top-left corner of clip area
  - `y` <[float]> y-coordinate of top-left corner of clip area
  - `width` <[float]> width of clipping area
  - `height` <[float]> height of clipping area

An object which specifies clipping of the resulting image.

## screenshot-option-scale
- `scale` <[ScreenshotScale]<"css"|"device">>

When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.

Defaults to `"device"`.

## screenshot-option-scale-default-css
- `scale` <[ScreenshotScale]<"css"|"device">>

When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.

Defaults to `"css"`.

## screenshot-option-caret
- `caret` <[ScreenshotCaret]<"hide"|"initial">>

When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.

## screenshot-option-style
- `style` <string>

Text of the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible
or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies
to the inner frames.

## screenshot-option-style-path
- `stylePath` <[string]|[Array]<[string]>>

File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.

## screenshot-options-common-list-v1.8
- %%-screenshot-option-animations-%%
- %%-screenshot-option-omit-background-%%
- %%-screenshot-option-quality-%%
- %%-screenshot-option-path-%%
- %%-screenshot-option-scale-%%
- %%-screenshot-option-caret-%%
- %%-screenshot-option-type-%%
- %%-screenshot-option-mask-%%

## locator-get-by-test-id-test-id
* since: v1.27
- `testId` <[string]|[RegExp]>

Id to locate the element by.

## locator-get-by-text-text
* since: v1.27
- `text` <[string]|[RegExp]>

Text to locate the element for.

## locator-get-by-text-exact
* since: v1.27
- `exact` <[boolean]>

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

## get-by-role-to-have-role-role
- `role` <[AriaRole]<"alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem">>

Required aria role.

## locator-get-by-role-option-checked
* since: v1.27
- `checked` <[boolean]>

An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.

Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).

## locator-get-by-role-option-disabled
* since: v1.27
- `disabled` <[boolean]>

An attribute that is usually set by `aria-disabled` or `disabled`.

:::note
Unlike most other attributes, `disabled` is inherited through the DOM hierarchy.
Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
:::

## locator-get-by-role-option-expanded
* since: v1.27
- `expanded` <[boolean]>

An attribute that is usually set by `aria-expanded`.

Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).

## locator-get-by-role-option-includeHidden
* since: v1.27
- `includeHidden` <[boolean]>

Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.

Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).

## locator-get-by-role-option-level
* since: v1.27
- `level` <[int]>

A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.

Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).

## locator-get-by-role-option-name
* since: v1.27
- `name` <[string]|[RegExp]>

Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [`option: exact`] to control this behavior.

Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

## locator-get-by-role-option-exact
* since: v1.28
- `exact` <[boolean]>

Whether [`option: name`] is matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when [`option: name`] is a regular expression. Note that exact match still trims whitespace.

## locator-get-by-role-option-pressed
* since: v1.27
- `pressed` <[boolean]>

An attribute that is usually set by `aria-pressed`.

Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).

## locator-get-by-role-option-selected
* since: v1.27
- `selected` <boolean>

An attribute that is usually set by `aria-selected`.

Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

## locator-get-by-role-option-list-v1.27
- %%-locator-get-by-role-option-checked-%%
- %%-locator-get-by-role-option-disabled-%%
- %%-locator-get-by-role-option-expanded-%%
- %%-locator-get-by-role-option-includeHidden-%%
- %%-locator-get-by-role-option-level-%%
- %%-locator-get-by-role-option-name-%%
- %%-locator-get-by-role-option-pressed-%%
- %%-locator-get-by-role-option-selected-%%

## template-locator-locator

The method finds an element matching the specified selector in the locator's subtree. It also accepts filter options, similar to [`method: Locator.filter`] method.

[Learn more about locators](../locators.md).

## template-locator-root-locator

The method returns an element locator that can be used to perform actions on this page / frame.
Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

[Learn more about locators](../locators.md).

## template-locator-get-by-test-id

Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by it's test id:

```js
await page.getByTestId('directions').click();
```

```java
page.getByTestId("directions").click();
```

```python async
await page.get_by_test_id("directions").click()
```

```python sync
page.get_by_test_id("directions").click()
```

```csharp
await page.GetByTestId("directions").ClickAsync();
```

**Details**

By default, the `data-testid` attribute is used as a test id. Use [`method: Selectors.setTestIdAttribute`] to configure a different test id attribute if necessary.

```js
// Set custom test id attribute from @playwright/test config:
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw'
  },
});
```

## template-locator-get-by-text

Allows locating elements that contain given text.

See also [`method: Locator.filter`] that allows to match by another criteria, like an accessible role, and then filter by the text content.


**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

```js
// Matches <span>
page.getByText('world');

// Matches first <div>
page.getByText('Hello world');

// Matches second <div>
page.getByText('Hello', { exact: true });

// Matches both <div>s
page.getByText(/Hello/);

// Matches second <div>
page.getByText(/^hello$/i);
```

```python async
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

```python sync
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

```java
// Matches <span>
page.getByText("world");

// Matches first <div>
page.getByText("Hello world");

// Matches second <div>
page.getByText("Hello", new Page.GetByTextOptions().setExact(true));

// Matches both <div>s
page.getByText(Pattern.compile("Hello"));

// Matches second <div>
page.getByText(Pattern.compile("^hello$", Pattern.CASE_INSENSITIVE));
```

```csharp
// Matches <span>
page.GetByText("world");

// Matches first <div>
page.GetByText("Hello world");

// Matches second <div>
page.GetByText("Hello", new() { Exact = true });

// Matches both <div>s
page.GetByText(new Regex("Hello"));

// Matches second <div>
page.GetByText(new Regex("^hello$", RegexOptions.IgnoreCase));
```

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

## template-locator-get-by-alt-text

Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

```js
await page.getByAltText('Playwright logo').click();
```

```java
page.getByAltText("Playwright logo").click();
```

```python async
await page.get_by_alt_text("Playwright logo").click()
```

```python sync
page.get_by_alt_text("Playwright logo").click()
```

```csharp
await page.GetByAltText("Playwright logo").ClickAsync();
```

## template-locator-get-by-label-text

Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

```js
await page.getByLabel('Username').fill('john');
await page.getByLabel('Password').fill('secret');
```

```java
page.getByLabel("Username").fill("john");
page.getByLabel("Password").fill("secret");
```

```python async
await page.get_by_label("Username").fill("john")
await page.get_by_label("Password").fill("secret")
```

```python sync
page.get_by_label("Username").fill("john")
page.get_by_label("Password").fill("secret")
```

```csharp
await page.GetByLabel("Username").FillAsync("john");
await page.GetByLabel("Password").FillAsync("secret");
```

## template-locator-get-by-placeholder-text

Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

```js
await page
    .getByPlaceholder('name@example.com')
    .fill('playwright@microsoft.com');
```

```java
page.getByPlaceholder("name@example.com").fill("playwright@microsoft.com");
```

```python async
await page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

```python sync
page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

```csharp
await page
    .GetByPlaceholder("name@example.com")
    .FillAsync("playwright@microsoft.com");
```

## template-locator-get-by-role

Allows locating elements by their [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles), [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes) and [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

Consider the following DOM structure.

```html
<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>
```

You can locate each element by it's implicit role:

```js
await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

await page.getByRole('checkbox', { name: 'Subscribe' }).check();

await page.getByRole('button', { name: /submit/i }).click();
```

```python async
await expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

await page.get_by_role("checkbox", name="Subscribe").check()

await page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

```python sync
expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

page.get_by_role("checkbox", name="Subscribe").check()

page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

```java
assertThat(page
    .getByRole(AriaRole.HEADING,
               new Page.GetByRoleOptions().setName("Sign up")))
    .isVisible();

page.getByRole(AriaRole.CHECKBOX,
               new Page.GetByRoleOptions().setName("Subscribe"))
    .check();

page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(
                   Pattern.compile("submit", Pattern.CASE_INSENSITIVE)))
    .click();
```

```csharp
await Expect(Page
    .GetByRole(AriaRole.Heading, new() { Name = "Sign up" }))
    .ToBeVisibleAsync();

await page
    .GetByRole(AriaRole.Checkbox, new() { Name = "Subscribe" })
    .CheckAsync();

await page
    .GetByRole(AriaRole.Button, new() {
        NameRegex = new Regex("submit", RegexOptions.IgnoreCase)
    })
    .ClickAsync();
```

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

## template-locator-get-by-title

Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

```js
await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
```

```java
assertThat(page.getByTitle("Issues count")).hasText("25 issues");
```

```python async
await expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

```python sync
expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

```csharp
await Expect(Page.GetByTitle("Issues count")).toHaveText("25 issues");
```

## test-config-snapshot-path-template
- `type` ?<[string]>
* langs: js

This option configures a template controlling location of snapshots generated by [`method: PageAssertions.toHaveScreenshot#1`], [`method: LocatorAssertions.toMatchAriaSnapshot#2`] and [`method: SnapshotAssertions.toMatchSnapshot#1`].

You can configure templates for each assertion separately in [`property: TestConfig.expect`].

**Usage**

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Single template for all assertions
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',

  // Assertion-specific templates
  expect: {
    toHaveScreenshot: {
      pathTemplate: '{testDir}/__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
    },
    toMatchAriaSnapshot: {
      pathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
    },
  },
});
```

**Details**

The value might include some "tokens" that will be replaced with actual values during test execution.

Consider the following file structure:

```txt
playwright.config.ts
tests/
└── page/
    └── page-click.spec.ts
```

And the following `page-click.spec.ts` that uses `toHaveScreenshot()` call:

```js title="page-click.spec.ts"
import { test, expect } from '@playwright/test';

test.describe('suite', () => {
  test('test should work', async ({ page }) => {
    await expect(page).toHaveScreenshot(['foo', 'bar', 'baz.png']);
  });
});
```

The list of supported tokens:

* `{arg}` - Relative snapshot path **without extension**. This comes from the arguments passed to `toHaveScreenshot()`, `toMatchAriaSnapshot()` or `toMatchSnapshot()`; if called without arguments, this will be an auto-generated snapshot name.
  * Value: `foo/bar/baz`
* `{ext}` - Snapshot extension (with the leading dot).
  * Value: `.png`
* `{platform}` - The value of `process.platform`.
* `{projectName}` - Project's file-system-sanitized name, if any.
  * Value: `''` (empty string).
* `{snapshotDir}` - Project's [`property: TestProject.snapshotDir`].
  * Value: `/home/playwright/tests` (since `snapshotDir` is not provided in config, it defaults to `testDir`)
* `{testDir}` - Project's [`property: TestProject.testDir`].
  * Value: `/home/playwright/tests` (absolute path since `testDir` is resolved relative to directory with config)
* `{testFileDir}` - Directories in relative path from `testDir` to **test file**.
  * Value: `page`
* `{testFileName}` - Test file name with extension.
  * Value: `page-click.spec.ts`
* `{testFilePath}` - Relative path from `testDir` to **test file**.
  * Value: `page/page-click.spec.ts`
* `{testName}` - File-system-sanitized test title, including parent describes but excluding file name.
  * Value: `suite-test-should-work`

Each token can be preceded with a single character that will be used **only if** this token has non-empty value.

Consider the following config:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate: '__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
  testMatch: 'example.spec.ts',
  projects: [
    { use: { browserName: 'firefox' } },
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
```

In this config:
1. First project **does not** have a name, so its snapshots will be stored in `<configDir>/__screenshots__/example.spec.ts/...`.
1. Second project **does** have a name, so its snapshots will be stored in `<configDir>/__screenshots__/chromium/example.spec.ts/..`.
1. Since `snapshotPathTemplate` resolves to relative path, it will be resolved relative to `configDir`.
1. Forward slashes `"/"` can be used as path separators on any platform.

# class: PageAgent
* since: v1.58
* langs: js

## event: PageAgent.turn
* since: v1.58
- argument: <[Object]>
  - `role` <[string]>
  - `message` <[string]>
  - `usage` ?<[Object]>
    - `inputTokens` <[int]>
    - `outputTokens` <[int]>

Emitted when the agent makes a turn.

## async method: PageAgent.dispose
* since: v1.58

Dispose this agent.

## async method: PageAgent.expect
* since: v1.58

Expect certain condition to be met.

**Usage**

```js
await agent.expect('"0 items" to be reported');
```

### param: PageAgent.expect.expectation
* since: v1.58
- `expectation` <[string]>

Expectation to assert.

### option: PageAgent.expect.timeout
* since: v1.58
- `timeout` <[float]>

Expect timeout in milliseconds. Defaults to `5000`. The default value can be changed via `expect.timeout` option in the config, or by specifying the `expect` property of the [`option: Page.agent.expect`] option. Pass `0` to disable timeout.

### option: PageAgent.expect.-inline- = %%-page-agent-call-options-v1.58-%%
* since: v1.58

## async method: PageAgent.extract
* since: v1.58
- returns: <[Object]>
  - `result` <[any]>
  - `usage` <[Object]>
    - `turns` <[int]>
    - `inputTokens` <[int]>
    - `outputTokens` <[int]>

Extract information from the page using the agentic loop, return it in a given Zod format.

**Usage**

```js
await agent.extract('List of items in the cart', z.object({
  title: z.string().describe('Item title to extract'),
  price: z.string().describe('Item price to extract'),
}).array());
```

### param: PageAgent.extract.query
* since: v1.58
- `query` <[string]>

Task to perform using agentic loop.

### param: PageAgent.extract.schema
* since: v1.58
- `schema` <[z.ZodSchema]>

### option: PageAgent.extract.timeout
* since: v1.58
- `timeout` <[float]>

Extract timeout in milliseconds. Defaults to `5000`. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods. Pass `0` to disable timeout.

### option: PageAgent.extract.-inline- = %%-page-agent-call-options-v1.58-%%
* since: v1.58


## async method: PageAgent.perform
* since: v1.58
- returns: <[Object]>
  - `usage` <[Object]>
    - `turns` <[int]>
    - `inputTokens` <[int]>
    - `outputTokens` <[int]>

Perform action using agentic loop.

**Usage**

```js
await agent.perform('Click submit button');
```

### param: PageAgent.perform.task
* since: v1.58
- `task` <[string]>

Task to perform using agentic loop.

### option: PageAgent.perform.timeout
* since: v1.58
- `timeout` <[float]>

Perform timeout in milliseconds. Defaults to `5000`. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods. Pass `0` to disable timeout.

### option: PageAgent.perform.-inline- = %%-page-agent-call-options-v1.58-%%
* since: v1.58

## async method: PageAgent.usage
* since: v1.58
- returns: <[Object]>
  - `turns` <[int]>
  - `inputTokens` <[int]>
  - `outputTokens` <[int]>

Returns the current token usage for this agent.

**Usage**

```js
const usage = await agent.usage();
console.log(`Tokens used: ${usage.inputTokens} in, ${usage.outputTokens} out`);
```
# class: Download
* since: v1.8

[Download] objects are dispatched by page via the [`event: Page.download`] event.

All the downloaded files belonging to the browser context are deleted when the
browser context is closed.

Download event is emitted once the download starts. Download path becomes available once download completes.

```js
// Start waiting for download before clicking. Note no await.
const downloadPromise = page.waitForEvent('download');
await page.getByText('Download file').click();
const download = await downloadPromise;

// Wait for the download process to complete and save the downloaded file somewhere.
await download.saveAs('/path/to/save/at/' + download.suggestedFilename());
```

```java
// Wait for the download to start
Download download = page.waitForDownload(() -> {
    // Perform the action that initiates download
    page.getByText("Download file").click();
});

// Wait for the download process to complete and save the downloaded file somewhere
download.saveAs(Paths.get("/path/to/save/at/", download.suggestedFilename()));
```

```python async
# Start waiting for the download
async with page.expect_download() as download_info:
    # Perform the action that initiates download
    await page.get_by_text("Download file").click()
download = await download_info.value

# Wait for the download process to complete and save the downloaded file somewhere
await download.save_as("/path/to/save/at/" + download.suggested_filename)
```

```python sync
# Start waiting for the download
with page.expect_download() as download_info:
    # Perform the action that initiates download
    page.get_by_text("Download file").click()
download = download_info.value

# Wait for the download process to complete and save the downloaded file somewhere
download.save_as("/path/to/save/at/" + download.suggested_filename)
```

```csharp
// Start the task of waiting for the download before clicking
var waitForDownloadTask = page.WaitForDownloadAsync();
await page.GetByText("Download file").ClickAsync();
var download = await waitForDownloadTask;

// Wait for the download process to complete and save the downloaded file somewhere
await download.SaveAsAsync("/path/to/save/at/" + download.SuggestedFilename);
```

## async method: Download.cancel
* since: v1.13

Cancels a download. Will not fail if the download is already finished or canceled.
Upon successful cancellations, `download.failure()` would resolve to `'canceled'`.

## async method: Download.createReadStream
* since: v1.8
* langs: java, js, csharp
- returns: <[Readable]>

Returns a readable stream for a successful download, or throws for a failed/canceled download.

:::note
If you don't need a readable stream, it's usually simpler to read the file from disk after the download completed. See [`method: Download.path`].
:::

## async method: Download.delete
* since: v1.8

Deletes the downloaded file. Will wait for the download to finish if necessary.

## async method: Download.failure
* since: v1.8
- returns: <[null]|[string]>

Returns download error if any. Will wait for the download to finish if necessary.

## method: Download.page
* since: v1.12
- returns: <[Page]>

Get the page that the download belongs to.

## async method: Download.path
* since: v1.8
- returns: <[path]>

Returns path to the downloaded file for a successful download, or throws for a failed/canceled download. The method will wait for the download to finish if necessary. The method throws when connected remotely.

Note that the download's file name is a random GUID, use [`method: Download.suggestedFilename`]
to get suggested file name.

## async method: Download.saveAs
* since: v1.8

Copy the download to a user-specified path. It is safe to call this method while the download
is still in progress. Will wait for the download to finish if necessary.

**Usage**

```js
await download.saveAs('/path/to/save/at/' + download.suggestedFilename());
```

```java
download.saveAs(Paths.get("/path/to/save/at/", download.suggestedFilename()));
```

```python async
await download.save_as("/path/to/save/at/" + download.suggested_filename)
```

```python sync
download.save_as("/path/to/save/at/" + download.suggested_filename)
```

```csharp
await download.SaveAsAsync("/path/to/save/at/" + download.SuggestedFilename);
```

### param: Download.saveAs.path
* since: v1.8
- `path` <[path]>

Path where the download should be copied.

## method: Download.suggestedFilename
* since: v1.8
- returns: <[string]>

Returns suggested filename for this download. It is typically computed by the browser from the
[`Content-Disposition`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) response header
or the `download` attribute. See the spec on [whatwg](https://html.spec.whatwg.org/#downloading-resources). Different
browsers can use different logic for computing it.

## method: Download.url
* since: v1.8
- returns: <[string]>

Returns downloaded url.
# class: PageAssertions
* since: v1.17

The [PageAssertions] class provides assertion methods that can be used to make assertions about the [Page] state in the tests.

```js
import { test, expect } from '@playwright/test';

test('navigates to login', async ({ page }) => {
  // ...
  await page.getByText('Sign in').click();
  await expect(page).toHaveURL(/.*\/login/);
});
```

```java
// ...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestPage {
  // ...
  @Test
  void navigatesToLoginPage() {
    // ...
    page.getByText("Sign in").click();
    assertThat(page).hasURL(Pattern.compile(".*/login"));
  }
}
```

```python async
import re
from playwright.async_api import Page, expect

async def test_navigates_to_login_page(page: Page) -> None:
    # ..
    await page.get_by_text("Sign in").click()
    await expect(page).to_have_url(re.compile(r".*/login"))
```

```python sync
import re
from playwright.sync_api import Page, expect

def test_navigates_to_login_page(page: Page) -> None:
    # ..
    page.get_by_text("Sign in").click()
    expect(page).to_have_url(re.compile(r".*/login"))
```

```csharp
using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

[TestClass]
public class ExampleTests : PageTest
{
    [TestMethod]
    public async Task NavigateToLoginPage()
    {
        await Page.GetByRole(AriaRole.Button, new() { Name = "Sign In" }).ClickAsync();
        await Expect(Page).ToHaveURLAsync(new Regex(".*/login"));
    }
}
```

## property: PageAssertions.not
* since: v1.20
* langs: java, js, csharp
- returns: <[PageAssertions]>

Makes the assertion check for the opposite condition. For example, this code tests that the page URL doesn't contain `"error"`:

```js
await expect(page).not.toHaveURL('error');
```

```java
assertThat(page).not().hasURL("error");
```

```csharp
await Expect(Page).Not.ToHaveURLAsync("error");
```

## async method: PageAssertions.NotToHaveTitle
* since: v1.20
* langs: python

The opposite of [`method: PageAssertions.toHaveTitle`].

### param: PageAssertions.NotToHaveTitle.titleOrRegExp
* since: v1.18
- `titleOrRegExp` <[string]|[RegExp]>

Expected title or RegExp.

### option: PageAssertions.NotToHaveTitle.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: PageAssertions.NotToHaveURL
* since: v1.20
* langs: python
  - alias-java: hasURL

The opposite of [`method: PageAssertions.toHaveURL`].

### param: PageAssertions.NotToHaveURL.urlOrRegExp
* since: v1.18
- `urlOrRegExp` <[string]|[RegExp]>

Expected URL string or RegExp.

### option: PageAssertions.NotToHaveURL.ignoreCase
* since: v1.44
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

### option: PageAssertions.NotToHaveURL.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: PageAssertions.toHaveScreenshot#1
* since: v1.23
* langs: js

This function will wait until two consecutive page screenshots
yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
await expect(page).toHaveScreenshot('image.png');
```

Note that screenshot assertions only work with Playwright test runner.

### param: PageAssertions.toHaveScreenshot#1.name
* since: v1.23
- `name` <[string]|[Array]<[string]>>

Snapshot name.

### option: PageAssertions.toHaveScreenshot#1.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.caret = %%-screenshot-option-caret-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.clip = %%-screenshot-option-clip-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.fullPage = %%-screenshot-option-full-page-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.mask = %%-screenshot-option-mask-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.35

### option: PageAssertions.toHaveScreenshot#1.stylePath = %%-screenshot-option-style-path-%%
* since: v1.41

### option: PageAssertions.toHaveScreenshot#1.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#1.threshold = %%-assertions-threshold-%%
* since: v1.23

## async method: PageAssertions.toHaveScreenshot#2
* since: v1.23
* langs: js

This function will wait until two consecutive page screenshots
yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
await expect(page).toHaveScreenshot();
```

Note that screenshot assertions only work with Playwright test runner.

### option: PageAssertions.toHaveScreenshot#2.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.caret = %%-screenshot-option-caret-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.clip = %%-screenshot-option-clip-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.fullPage = %%-screenshot-option-full-page-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.mask = %%-screenshot-option-mask-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.35

### option: PageAssertions.toHaveScreenshot#2.stylePath = %%-screenshot-option-style-path-%%
* since: v1.41

### option: PageAssertions.toHaveScreenshot#2.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23

### option: PageAssertions.toHaveScreenshot#2.threshold = %%-assertions-threshold-%%
* since: v1.23

## async method: PageAssertions.toHaveTitle
* since: v1.20
* langs:
  - alias-java: hasTitle

Ensures the page has the given title.

**Usage**

```js
await expect(page).toHaveTitle(/.*checkout/);
```

```java
assertThat(page).hasTitle("Playwright");
```

```python async
import re
from playwright.async_api import expect

# ...
await expect(page).to_have_title(re.compile(r".*checkout"))
```

```python sync
import re
from playwright.sync_api import expect

# ...
expect(page).to_have_title(re.compile(r".*checkout"))
```

```csharp
await Expect(Page).ToHaveTitleAsync("Playwright");
```

### param: PageAssertions.toHaveTitle.titleOrRegExp
* since: v1.18
- `titleOrRegExp` <[string]|[RegExp]>

Expected title or RegExp.

### option: PageAssertions.toHaveTitle.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: PageAssertions.toHaveTitle.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: PageAssertions.toHaveURL
* since: v1.20
* langs:
  - alias-java: hasURL

Ensures the page is navigated to the given URL.

**Usage**

```js
// Check for the page URL to be 'https://playwright.dev/docs/intro' (including query string)
await expect(page).toHaveURL('https://playwright.dev/docs/intro');

// Check for the page URL to contain 'doc', followed by an optional 's', followed by '/'
await expect(page).toHaveURL(/docs?\//);

// Check for the predicate to be satisfied
// For example: verify query strings
await expect(page).toHaveURL(url => {
  const params = url.searchParams;
  return params.has('search') && params.has('options') && params.get('id') === '5';
});
```

```java
assertThat(page).hasURL(".com");
```

```python async
import re
from playwright.async_api import expect

# ...
await expect(page).to_have_url(re.compile(".*checkout"))
```

```python sync
import re
from playwright.sync_api import expect

# ...
expect(page).to_have_url(re.compile(".*checkout"))
```

```csharp
await Expect(Page).ToHaveURLAsync(new Regex(".*checkout"));
```

### param: PageAssertions.toHaveURL.url
* since: v1.18
* langs: js
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

Expected URL string, RegExp, or predicate receiving [URL] to match.
When [`option: Browser.newContext.baseURL`] is provided via the context options and the `url` argument is a string, the two values are merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor and used for the comparison against the current browser URL.

### param: PageAssertions.toHaveURL.urlOrRegExp
* since: v1.18
* langs: csharp, python, java
- `urlOrRegExp` <[string]|[RegExp]>

Expected URL string or RegExp.

### option: PageAssertions.toHaveURL.ignoreCase
* since: v1.44
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression parameter if specified. A provided predicate ignores this flag.

### option: PageAssertions.toHaveURL.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: PageAssertions.toHaveURL.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18
# class: CDPSessionEvent
* since: v1.30
* langs: csharp

[CDPSessionEvent] objects are returned by page via the [`method: CDPSession.event`] method.

Each object represents a named event and allows handling of the event when it is raised.

## event: CDPSessionEvent.onEvent
* since: v1.30
* langs: csharp
- argument: <[JsonElement?]>

## property: CDPSessionEvent.eventName
* since: 1.30
* langs: csharp
- returns: <[string]># class: ConsoleMessage
* since: v1.8

[ConsoleMessage] objects are dispatched by page via the [`event: Page.console`] event.
For each console message logged in the page there will be corresponding event in the Playwright
context.

```js
// Listen for all console logs
page.on('console', msg => console.log(msg.text()));

// Listen for all console events and handle errors
page.on('console', msg => {
  if (msg.type() === 'error')
    console.log(`Error text: "${msg.text()}"`);
});

// Get the next console log
const msgPromise = page.waitForEvent('console');
await page.evaluate(() => {
  console.log('hello', 42, { foo: 'bar' });  // Issue console.log inside the page
});
const msg = await msgPromise;

// Deconstruct console log arguments
await msg.args()[0].jsonValue(); // hello
await msg.args()[1].jsonValue(); // 42
```

```java
// Listen for all console messages and print them to the standard output.
page.onConsoleMessage(msg -> System.out.println(msg.text()));

// Listen for all console messages and print errors to the standard output.
page.onConsoleMessage(msg -> {
  if ("error".equals(msg.type()))
    System.out.println("Error text: " + msg.text());
});

// Get the next console message
ConsoleMessage msg = page.waitForConsoleMessage(() -> {
  // Issue console.log inside the page
  page.evaluate("console.log('hello', 42, { foo: 'bar' });");
});

// Deconstruct console.log arguments
msg.args().get(0).jsonValue(); // hello
msg.args().get(1).jsonValue(); // 42
```

```python async
# Listen for all console logs
page.on("console", lambda msg: print(msg.text))

# Listen for all console events and handle errors
page.on("console", lambda msg: print(f"error: {msg.text}") if msg.type == "error" else None)

# Get the next console log
async with page.expect_console_message() as msg_info:
    # Issue console.log inside the page
    await page.evaluate("console.log('hello', 42, { foo: 'bar' })")
msg = await msg_info.value

# Deconstruct print arguments
await msg.args[0].json_value() # hello
await msg.args[1].json_value() # 42
```

```python sync
# Listen for all console logs
page.on("console", lambda msg: print(msg.text))

# Listen for all console events and handle errors
page.on("console", lambda msg: print(f"error: {msg.text}") if msg.type == "error" else None)

# Get the next console log
with page.expect_console_message() as msg_info:
    # Issue console.log inside the page
    page.evaluate("console.log('hello', 42, { foo: 'bar' })")
msg = msg_info.value

# Deconstruct print arguments
msg.args[0].json_value() # hello
msg.args[1].json_value() # 42
```

```csharp
// Listen for all console messages and print them to the standard output.
page.Console += (_, msg) => Console.WriteLine(msg.Text);

// Listen for all console messages and print errors to the standard output.
page.Console += (_, msg) =>
{
    if ("error".Equals(msg.Type))
        Console.WriteLine("Error text: " + msg.Text);
};

// Get the next console message
var waitForMessageTask = page.WaitForConsoleMessageAsync();
await page.EvaluateAsync("console.log('hello', 42, { foo: 'bar' });");
var message = await waitForMessageTask;
// Deconstruct console.log arguments
await message.Args.ElementAt(0).JsonValueAsync<string>(); // hello
await message.Args.ElementAt(1).JsonValueAsync<int>(); // 42
```

## method: ConsoleMessage.args
* since: v1.8
- returns: <[Array]<[JSHandle]>>

List of arguments passed to a `console` function call. See also [`event: Page.console`].

## method: ConsoleMessage.location
* since: v1.8
* langs: js, python
- returns: <[Object]>
  - `url` <[string]> URL of the resource.
  - `lineNumber` <[int]> 0-based line number in the resource.
  - `columnNumber` <[int]> 0-based column number in the resource.

## method: ConsoleMessage.location
* since: v1.8
* langs: csharp, java
- returns: <[string]>

URL of the resource followed by 0-based line and column numbers in the resource formatted as `URL:line:column`.

## method: ConsoleMessage.page
* since: v1.34
- returns: <[null]|[Page]>

The page that produced this console message, if any.

## method: ConsoleMessage.text
* since: v1.8
- returns: <[string]>

The text of the console message.

## method: ConsoleMessage.type
* since: v1.8
* langs: js, python
- returns: <[ConsoleMessageType]<"log"|"debug"|"info"|"error"|"warning"|"dir"|"dirxml"|"table"|"trace"|"clear"|"startGroup"|"startGroupCollapsed"|"endGroup"|"assert"|"profile"|"profileEnd"|"count"|"time"|"timeEnd">>

## method: ConsoleMessage.type
* since: v1.8
* langs: csharp, java
- returns: <[string]>

One of the following values: `'log'`, `'debug'`, `'info'`, `'error'`, `'warning'`, `'dir'`, `'dirxml'`, `'table'`,
`'trace'`, `'clear'`, `'startGroup'`, `'startGroupCollapsed'`, `'endGroup'`, `'assert'`, `'profile'`, `'profileEnd'`,
`'count'`, `'timeEnd'`.

## method: ConsoleMessage.worker
* since: v1.57
- returns: <[null]|[Worker]>

The web worker or service worker that produced this console message, if any. Note that console messages from web workers also have non-null [`method: ConsoleMessage.page`].
# class: PlaywrightAssertions
* langs: js, java, csharp
* since: v1.17

Playwright gives you Web-First Assertions with convenience methods for creating assertions that will wait and retry until the expected condition is met.

Consider the following example:

```js
import { test, expect } from '@playwright/test';

test('status becomes submitted', async ({ page }) => {
  // ...
  await page.locator('#submit-button').click();
  await expect(page.locator('.status')).toHaveText('Submitted');
});
```

```python async
from playwright.async_api import Page, expect

async def test_status_becomes_submitted(page: Page) -> None:
    # ..
    await page.locator("#submit-button").click()
    await expect(page.locator(".status")).to_have_text("Submitted")
```

```python sync
from playwright.sync_api import Page, expect

def test_status_becomes_submitted(page: Page) -> None:
    # ..
    page.locator("#submit-button").click()
    expect(page.locator(".status")).to_have_text("Submitted")
```

```java
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestExample {
  // ...
  @Test
  void statusBecomesSubmitted() {
    // ...
    page.locator("#submit-button").click();
    assertThat(page.locator(".status")).hasText("Submitted");
  }
}
```

```csharp
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

[TestClass]
public class ExampleTests : PageTest
{
    [TestMethod]
    public async Task StatusBecomesSubmitted()
    {
        await Page.GetByRole(AriaRole.Button, new() { Name = "Submit" }).ClickAsync();
        await Expect(Page.Locator(".status")).ToHaveTextAsync("Submitted");
    }
}
```

Playwright will be re-testing the node with the selector `.status` until fetched Node has the `"Submitted"`
text. It will be re-fetching the node and checking it over and over, until the condition is met or until the timeout is
reached. You can pass this timeout as an option.

By default, the timeout for assertions is set to 5 seconds.

## method: PlaywrightAssertions.expectAPIResponse
* since: v1.18
* langs:
  - alias-java: assertThat
  - alias-python: expect
  - alias-js: expect
  - alias-csharp: Expect
- returns: <[APIResponseAssertions]>

Creates a [APIResponseAssertions] object for the given [APIResponse].

**Usage**

```java
PlaywrightAssertions.assertThat(response).isOK();
```

### param: PlaywrightAssertions.expectAPIResponse.response
* since: v1.18
- `response` <[APIResponse]>

[APIResponse] object to use for assertions.

## method: PlaywrightAssertions.expectGeneric
* since: v1.9
* langs: js
  - alias-js: expect
- returns: <[GenericAssertions]>

Creates a [GenericAssertions] object for the given value.

### param: PlaywrightAssertions.expectGeneric.value
* since: v1.9
* langs: js
- `value` <[any]>

Value that will be asserted.

## method: PlaywrightAssertions.expectLocator
* since: v1.18
* langs:
  - alias-java: assertThat
  - alias-python: expect
  - alias-js: expect
  - alias-csharp: Expect
- returns: <[LocatorAssertions]>

Creates a [LocatorAssertions] object for the given [Locator].

**Usage**

```java
PlaywrightAssertions.assertThat(locator).isVisible();
```

```csharp
await Expect(locator).ToBeVisibleAsync();
```

### param: PlaywrightAssertions.expectLocator.locator
* since: v1.18
- `locator` <[Locator]>

[Locator] object to use for assertions.

## method: PlaywrightAssertions.expectPage
* since: v1.18
* langs:
  - alias-java: assertThat
  - alias-python: expect
  - alias-js: expect
  - alias-csharp: Expect
- returns: <[PageAssertions]>

Creates a [PageAssertions] object for the given [Page].

**Usage**

```java
PlaywrightAssertions.assertThat(page).hasTitle("News");
```

```csharp
await Expect(Page).ToHaveTitleAsync("News");
```

### param: PlaywrightAssertions.expectPage.page
* since: v1.18
- `page` <[Page]>

[Page] object to use for assertions.

## method: PlaywrightAssertions.setDefaultAssertionTimeout
* since: v1.25
* langs: java

Changes default timeout for Playwright assertions from 5 seconds to the specified value.

**Usage**

```java
PlaywrightAssertions.setDefaultAssertionTimeout(30_000);
```

### param: PlaywrightAssertions.setDefaultAssertionTimeout.timeout
* since: v1.25
- `timeout` <[float]>

Timeout in milliseconds.
# class: BrowserContext
* since: v1.8

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser
context.

Playwright allows creating isolated non-persistent browser contexts with [`method: Browser.newContext`] method. Non-persistent browser
contexts don't write any browsing data to disk.

```js
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

```java
// Create a new incognito browser context
BrowserContext context = browser.newContext();
// Create a new page inside context.
Page page = context.newPage();
page.navigate("https://example.com");
// Dispose context once it is no longer needed.
context.close();
```

```python async
# create a new incognito browser context
context = await browser.new_context()
# create a new page inside context.
page = await context.new_page()
await page.goto("https://example.com")
# dispose context once it is no longer needed.
await context.close()
```

```python sync
# create a new incognito browser context
context = browser.new_context()
# create a new page inside context.
page = context.new_page()
page.goto("https://example.com")
# dispose context once it is no longer needed.
context.close()
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Firefox.LaunchAsync(new() { Headless = false });
// Create a new incognito browser context
var context = await browser.NewContextAsync();
// Create a new page inside context.
var page = await context.NewPageAsync();
await page.GotoAsync("https://bing.com");
// Dispose context once it is no longer needed.
await context.CloseAsync();
```

## event: BrowserContext.backgroundPage
* since: v1.11
* deprecated: Background pages have been removed from Chromium together with Manifest V2 extensions.
- argument: <[Page]>

This event is not emitted.

## property: BrowserContext.clock
* since: v1.45
- type: <[Clock]>

Playwright has ability to mock clock and passage of time.

## event: BrowserContext.close
* since: v1.8
- argument: <[BrowserContext]>

Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [`method: Browser.close`] method was called.

### option: BrowserContext.close.reason
* since: v1.40
- `reason` <[string]>

The reason to be reported to the operations interrupted by the context closure.

## event: BrowserContext.console
* since: v1.34
* langs:
  - alias-java: consoleMessage
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the [ConsoleMessage] event handler argument.

**Usage**

```js
context.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

```java
context.onConsoleMessage(msg -> {
  for (int i = 0; i < msg.args().size(); ++i)
    System.out.println(i + ": " + msg.args().get(i).jsonValue());
});
page.evaluate("() => console.log('hello', 5, { foo: 'bar' })");
```

```python async
async def print_args(msg):
    values = []
    for arg in msg.args:
        values.append(await arg.json_value())
    print(values)

context.on("console", print_args)
await page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```python sync
def print_args(msg):
    for arg in msg.args:
        print(arg.json_value())

context.on("console", print_args)
page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```csharp
context.Console += async (_, msg) =>
{
    foreach (var arg in msg.Args)
        Console.WriteLine(await arg.JsonValueAsync<object>());
};

await page.EvaluateAsync("console.log('hello', 5, { foo: 'bar' })");
```


## event: BrowserContext.dialog
* since: v1.34
- argument: <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.

**Usage**

```js
context.on('dialog', dialog => {
  dialog.accept();
});
```

```java
context.onDialog(dialog -> {
  dialog.accept();
});
```

```python
context.on("dialog", lambda dialog: dialog.accept())
```

```csharp
Context.Dialog += async (_, dialog) =>
{
    await dialog.AcceptAsync();
};
```

:::note
When no [`event: Page.dialog`] or [`event: BrowserContext.dialog`] listeners are present, all dialogs are automatically dismissed.
:::

## event: BrowserContext.page
* since: v1.8
- argument: <[Page]>

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will
also fire for popup pages. See also [`event: Page.popup`] to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is
done and its response has started loading in the popup. If you would like to route/listen to this network request, use [`method: BrowserContext.route`] and [`event: BrowserContext.request`] respectively instead of similar methods on the [Page].

```js
const newPagePromise = context.waitForEvent('page');
await page.getByText('open new page').click();
const newPage = await newPagePromise;
console.log(await newPage.evaluate('location.href'));
```

```java
Page newPage = context.waitForPage(() -> {
  page.getByText("open new page").click();
});
System.out.println(newPage.evaluate("location.href"));
```

```python async
async with context.expect_page() as page_info:
    await page.get_by_text("open new page").click(),
page = await page_info.value
print(await page.evaluate("location.href"))
```

```python sync
with context.expect_page() as page_info:
    page.get_by_text("open new page").click(),
page = page_info.value
print(page.evaluate("location.href"))
```

```csharp
var popup = await context.RunAndWaitForPageAsync(async =>
{
    await page.GetByText("open new page").ClickAsync();
});
Console.WriteLine(await popup.EvaluateAsync<string>("location.href"));
```

:::note
Use [`method: Page.waitForLoadState`] to wait until the page gets to a particular state (you should not need it in most
cases).
:::

## event: BrowserContext.webError
* since: v1.38
- argument: <[WebError]>

Emitted when exception is unhandled in any of the pages in this
context. To listen for errors from a particular page, use [`event: Page.pageError`] instead.

## event: BrowserContext.request
* since: v1.12
- argument: <[Request]>

Emitted when a request is issued from any pages created through this context.
The [request] object is read-only. To only listen for requests from a particular
page, use [`event: Page.request`].

In order to intercept and mutate requests, see [`method: BrowserContext.route`]
or [`method: Page.route`].

## event: BrowserContext.requestFailed
* since: v1.12
- argument: <[Request]>

Emitted when a request fails, for example by timing out. To only listen for
failed requests from a particular page, use [`event: Page.requestFailed`].

:::note
HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete
with [`event: BrowserContext.requestFinished`] event and not with [`event: BrowserContext.requestFailed`].
:::

## event: BrowserContext.requestFinished
* since: v1.12
- argument: <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the
sequence of events is `request`, `response` and `requestfinished`. To listen for
successful requests from a particular page, use [`event: Page.requestFinished`].

## event: BrowserContext.response
* since: v1.12
- argument: <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events
is `request`, `response` and `requestfinished`. To listen for response events
from a particular page, use [`event: Page.response`].

## event: BrowserContext.serviceWorker
* since: v1.11
* langs: js, python
- argument: <[Worker]>

:::note
Service workers are only supported on Chromium-based browsers.
:::

Emitted when new service worker is created in the context.

## async method: BrowserContext.addCookies
* since: v1.8

Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be
obtained via [`method: BrowserContext.cookies`].

**Usage**

```js
await browserContext.addCookies([cookieObject1, cookieObject2]);
```

```java
browserContext.addCookies(Arrays.asList(cookieObject1, cookieObject2));
```

```python async
await browser_context.add_cookies([cookie_object1, cookie_object2])
```

```python sync
browser_context.add_cookies([cookie_object1, cookie_object2])
```

```csharp
await context.AddCookiesAsync(new[] { cookie1, cookie2 });
```

### param: BrowserContext.addCookies.cookies
* since: v1.8
- `cookies` <[Array]<[Object]>>
  - `name` <[string]>
  - `value` <[string]>
  - `url` ?<[string]> Either `url` or both `domain` and `path` are required. Optional.
  - `domain` ?<[string]> For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.
  - `path` ?<[string]> Either `url` or both `domain` and `path` are required. Optional.
  - `expires` ?<[float]> Unix time in seconds. Optional.
  - `httpOnly` ?<[boolean]> Optional.
  - `secure` ?<[boolean]> Optional.
  - `sameSite` ?<[SameSiteAttribute]<"Strict"|"Lax"|"None">> Optional.
  - `partitionKey` ?<[string]> For partitioned third-party cookies (aka [CHIPS](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies)), the partition key. Optional.

## async method: BrowserContext.addInitScript
* since: v1.8

Adds a script which would be evaluated in one of the following scenarios:
* Whenever a page is created in the browser context or is navigated.
* Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is
  evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend
the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:

```js browser
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same directory.
await browserContext.addInitScript({
  path: 'preload.js'
});
```

```java
// In your playwright script, assuming the preload.js file is in same directory.
browserContext.addInitScript(Paths.get("preload.js"));
```

```python async
# in your playwright script, assuming the preload.js file is in same directory.
await browser_context.add_init_script(path="preload.js")
```

```python sync
# in your playwright script, assuming the preload.js file is in same directory.
browser_context.add_init_script(path="preload.js")
```

```csharp
await Context.AddInitScriptAsync(scriptPath: "preload.js");
```

:::note
The order of evaluation of multiple scripts installed via [`method: BrowserContext.addInitScript`] and
[`method: Page.addInitScript`] is not defined.
:::

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: js
- `script` <[function]|[string]|[Object]>
  - `path` ?<[path]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the
    current working directory. Optional.
  - `content` ?<[string]> Raw script content. Optional.

Script to be evaluated in all pages in the browser context.

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: csharp, java
- `script` <[string]|[path]>

Script to be evaluated in all pages in the browser context.

### param: BrowserContext.addInitScript.arg
* since: v1.8
* langs: js
- `arg` ?<[Serializable]>

Optional argument to pass to [`param: script`] (only supported when passing a function).

### param: BrowserContext.addInitScript.path
* since: v1.8
* langs: python
- `path` ?<[path]>

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: python
- `script` ?<[string]>

Script to be evaluated in all pages in the browser context. Optional.

## method: BrowserContext.backgroundPages
* since: v1.11
* deprecated: Background pages have been removed from Chromium together with Manifest V2 extensions.
- returns: <[Array]<[Page]>>

Returns an empty list.

## method: BrowserContext.browser
* since: v1.8
- returns: <[null]|[Browser]>

Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.

## async method: BrowserContext.clearCookies
* since: v1.8

Removes cookies from context. Accepts optional filter.

**Usage**

```js
await context.clearCookies();
await context.clearCookies({ name: 'session-id' });
await context.clearCookies({ domain: 'my-origin.com' });
await context.clearCookies({ domain: /.*my-origin\.com/ });
await context.clearCookies({ path: '/api/v1' });
await context.clearCookies({ name: 'session-id', domain: 'my-origin.com' });
```


```java
context.clearCookies();
context.clearCookies(new BrowserContext.ClearCookiesOptions().setName("session-id"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setDomain("my-origin.com"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setPath("/api/v1"));
context.clearCookies(new BrowserContext.ClearCookiesOptions()
                         .setName("session-id")
                         .setDomain("my-origin.com"));
```

```python async
await context.clear_cookies()
await context.clear_cookies(name="session-id")
await context.clear_cookies(domain="my-origin.com")
await context.clear_cookies(path="/api/v1")
await context.clear_cookies(name="session-id", domain="my-origin.com")
```

```python sync
context.clear_cookies()
context.clear_cookies(name="session-id")
context.clear_cookies(domain="my-origin.com")
context.clear_cookies(path="/api/v1")
context.clear_cookies(name="session-id", domain="my-origin.com")
```

```csharp
await context.ClearCookiesAsync();
await context.ClearCookiesAsync(new() { Name = "session-id" });
await context.ClearCookiesAsync(new() { Domain = "my-origin.com" });
await context.ClearCookiesAsync(new() { Path = "/api/v1" });
await context.ClearCookiesAsync(new() { Name = "session-id", Domain = "my-origin.com" });
```

### option: BrowserContext.clearCookies.name
* since: v1.43
- `name` <[string]|[RegExp]>

Only removes cookies with the given name.

### option: BrowserContext.clearCookies.domain
* since: v1.43
- `domain` <[string]|[RegExp]>

Only removes cookies with the given domain.

### option: BrowserContext.clearCookies.path
* since: v1.43
- `path` <[string]|[RegExp]>

Only removes cookies with the given path.

## async method: BrowserContext.clearPermissions
* since: v1.8

Clears all permission overrides for the browser context.

**Usage**

```js
const context = await browser.newContext();
await context.grantPermissions(['clipboard-read']);
// do stuff ..
context.clearPermissions();
```

```java
BrowserContext context = browser.newContext();
context.grantPermissions(Arrays.asList("clipboard-read"));
// do stuff ..
context.clearPermissions();
```

```python async
context = await browser.new_context()
await context.grant_permissions(["clipboard-read"])
# do stuff ..
context.clear_permissions()
```

```python sync
context = browser.new_context()
context.grant_permissions(["clipboard-read"])
# do stuff ..
context.clear_permissions()
```

```csharp
var context = await browser.NewContextAsync();
await context.GrantPermissionsAsync(new[] { "clipboard-read" });
// Alternatively, you can use the helper class ContextPermissions
//  to specify the permissions...
// do stuff ...
await context.ClearPermissionsAsync();
```

## async method: BrowserContext.close
* since: v1.8

Closes the browser context. All the pages that belong to the browser context will be closed.

:::note
The default browser context cannot be closed.
:::

## async method: BrowserContext.cookies
* since: v1.8
- returns: <[Array]<[Object]>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[float]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <[SameSiteAttribute]<"Strict"|"Lax"|"None">>
  - `partitionKey` ?<[string]>

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs
are returned.

### param: BrowserContext.cookies.urls
* since: v1.8
- `urls` ?<[string]|[Array]<[string]>>

Optional list of URLs.

## async method: BrowserContext.exposeBinding
* since: v1.8

The method adds a function called [`param: name`] on the `window` object of every frame in every page in the context.
When called, the function executes [`param: callback`] and returns a [Promise] which resolves to the return value of
[`param: callback`]. If the [`param: callback`] returns a [Promise], it will be awaited.

The first argument of the [`param: callback`] function contains information about the caller: `{ browserContext:
BrowserContext, page: Page, frame: Frame }`.

See [`method: Page.exposeBinding`] for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeBinding('pageURL', ({ page }) => page.url());
  const page = await context.newPage();
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.getByRole('button').click();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      context.exposeBinding("pageURL", (source, args) -> source.page().url());
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");
      page.getByRole(AriaRole.BUTTON).click();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    await context.expose_binding("pageURL", lambda source: source["page"].url)
    page = await context.new_page()
    await page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    await page.get_by_role("button").click()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    context.expose_binding("pageURL", lambda source: source["page"].url)
    page = context.new_page()
    page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
var context = await browser.NewContextAsync();

await context.ExposeBindingAsync("pageURL", source => source.Page.Url);
var page = await context.NewPageAsync();
await page.SetContentAsync("<script>\n" +
"  async function onClick() {\n" +
"    document.querySelector('div').textContent = await window.pageURL();\n" +
"  }\n" +
"</script>\n" +
"<button onclick=\"onClick()\">Click me</button>\n" +
"<div></div>");
await page.GetByRole(AriaRole.Button).ClickAsync();
```

### param: BrowserContext.exposeBinding.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: BrowserContext.exposeBinding.callback
* since: v1.8
- `callback` <[function]>

Callback function that will be called in the Playwright's context.

### option: BrowserContext.exposeBinding.handle
* since: v1.8
* deprecated: This option will be removed in the future.
- `handle` <[boolean]>

Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is
supported. When passing by value, multiple arguments are supported.

## async method: BrowserContext.exposeFunction
* since: v1.8

The method adds a function called [`param: name`] on the `window` object of every frame in every page in the context.
When called, the function executes [`param: callback`] and returns a [Promise] which resolves to the return value of
[`param: callback`].

If the [`param: callback`] returns a [Promise], it will be awaited.

See [`method: Page.exposeFunction`] for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeFunction('sha256', text =>
    crypto.createHash('sha256').update(text).digest('hex'),
  );
  const page = await context.newPage();
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.getByRole('button').click();
})();
```

```java
import com.microsoft.playwright.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      context.exposeFunction("sha256", args -> {
        String text = (String) args[0];
        MessageDigest crypto;
        try {
          crypto = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
          return null;
        }
        byte[] token = crypto.digest(text.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(token);
      });
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>\n");
      page.getByRole(AriaRole.BUTTON).click();
    }
  }
}
```

```python async
import asyncio
import hashlib
from playwright.async_api import async_playwright, Playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    await context.expose_function("sha256", sha256)
    page = await context.new_page()
    await page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    await page.get_by_role("button").click()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
import hashlib
from playwright.sync_api import sync_playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    context.expose_function("sha256", sha256)
    page = context.new_page()
    page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

class BrowserContextExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
        var context = await browser.NewContextAsync();

        await context.ExposeFunctionAsync("sha256", (string input) =>
        {
            return Convert.ToBase64String(
                SHA256.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(input)));
        });

        var page = await context.NewPageAsync();
        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.GetByRole(AriaRole.Button).ClickAsync();
        Console.WriteLine(await page.TextContentAsync("div"));
    }
}
```

### param: BrowserContext.exposeFunction.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: BrowserContext.exposeFunction.callback
* since: v1.8
- `callback` <[function]>

Callback function that will be called in the Playwright's context.

## async method: BrowserContext.grantPermissions
* since: v1.8

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if
specified.

### param: BrowserContext.grantPermissions.permissions
* since: v1.8
- `permissions` <[Array]<[string]>>

A list of permissions to grant.

:::danger
Supported permissions differ between browsers, and even between different versions of the same browser. Any permission may stop working after an update.
:::

Here are some permissions that may be supported by some browsers:
* `'accelerometer'`
* `'ambient-light-sensor'`
* `'background-sync'`
* `'camera'`
* `'clipboard-read'`
* `'clipboard-write'`
* `'geolocation'`
* `'gyroscope'`
* `'local-fonts'`
* `'local-network-access'`
* `'magnetometer'`
* `'microphone'`
* `'midi-sysex'` (system-exclusive midi)
* `'midi'`
* `'notifications'`
* `'payment-handler'`
* `'storage-access'`

### option: BrowserContext.grantPermissions.origin
* since: v1.8
- `origin` <[string]>

The [origin] to grant permissions to, e.g. "https://example.com".

## async method: BrowserContext.newCDPSession
* since: v1.11
- returns: <[CDPSession]>

:::note
CDP sessions are only supported on Chromium-based browsers.
:::

Returns the newly created session.

### param: BrowserContext.newCDPSession.page
* since: v1.11
- `page` <[Page]|[Frame]>

Target to create new session for. For backwards-compatibility, this parameter is
named `page`, but it can be a `Page` or `Frame` type.

## async method: BrowserContext.newPage
* since: v1.8
- returns: <[Page]>

Creates a new page in the browser context.

## method: BrowserContext.pages
* since: v1.8
- returns: <[Array]<[Page]>>

Returns all open pages in the context.

## async method: BrowserContext.removeAllListeners
* since: v1.47
* langs: js

Removes all the listeners of the given type (or all registered listeners if no type given).
Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

### param: BrowserContext.removeAllListeners.type
* since: v1.47
- `type` ?<[string]>

### option: BrowserContext.removeAllListeners.behavior = %%-remove-all-listeners-options-behavior-%%
* since: v1.47

## property: BrowserContext.request
* since: v1.16
* langs:
  - alias-csharp: APIRequest
- type: <[APIRequestContext]>

API testing helper associated with this context. Requests made with this API will use context cookies.

## async method: BrowserContext.route
* since: v1.8

Routing provides the capability to modify network requests that are made by any page in the browser context. Once route
is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note
[`method: BrowserContext.route`] will not intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```js
const context = await browser.newContext();
await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

```java
BrowserContext context = browser.newContext();
context.route("**/*.{png,jpg,jpeg}", route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

```python async
context = await browser.new_context()
page = await context.new_page()
await context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python sync
context = browser.new_context()
page = context.new_page()
context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync("**/*.{png,jpg,jpeg}", r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

or the same snippet using a regex pattern instead:

```js
const context = await browser.newContext();
await context.route(/(\.png$)|(\.jpg$)/, route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

```java
BrowserContext context = browser.newContext();
context.route(Pattern.compile("(\\.png$)|(\\.jpg$)"), route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

```python async
context = await browser.new_context()
page = await context.new_page()
await context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
await page.goto("https://example.com")
await browser.close()
```

```python sync
context = browser.new_context()
page = context.new_page()
context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
page = context.new_page()
page.goto("https://example.com")
browser.close()
```

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync(new Regex("(\\.png$)|(\\.jpg$)"), r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```js
await context.route('/api/**', async route => {
  if (route.request().postData().includes('my-string'))
    await route.fulfill({ body: 'mocked-data' });
  else
    await route.continue();
});
```

```java
context.route("/api/**", route -> {
  if (route.request().postData().contains("my-string"))
    route.fulfill(new Route.FulfillOptions().setBody("mocked-data"));
  else
    route.resume();
});
```

```python async
async def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    await route.fulfill(body="mocked-data")
  else:
    await route.continue_()
await context.route("/api/**", handle_route)
```

```python sync
def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
context.route("/api/**", handle_route)
```

```csharp
await page.RouteAsync("/api/**", async r =>
{
    if (r.Request.PostData.Contains("my-string"))
        await r.FulfillAsync(new() { Body = "mocked-data" });
    else
        await r.ContinueAsync();
});
```

Page routes (set up with [`method: Page.route`]) take precedence over browser context routes when request matches both
handlers.

To remove a route with its handler you can use [`method: BrowserContext.unroute`].

:::note
Enabling routing disables http cache.
:::

### param: BrowserContext.route.url
* since: v1.8
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### param: BrowserContext.route.handler
* since: v1.8
* langs: js, python
- `handler` <[function]\([Route], [Request]\): [Promise<any>|any]>

handler function to route the request.

### param: BrowserContext.route.handler
* since: v1.8
* langs: csharp, java
- `handler` <[function]\([Route]\)>

handler function to route the request.

### option: BrowserContext.route.times
* since: v1.15
- `times` <[int]>

How often a route should be used. By default it will be used every time.

## async method: BrowserContext.routeFromHAR
* since: v1.23

If specified the network requests that are made in the context will be served from the HAR file. Read more about [Replaying from HAR](../mock.md#replaying-from-har).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.

### param: BrowserContext.routeFromHAR.har
* since: v1.23
- `har` <[path]>

Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.

### option: BrowserContext.routeFromHAR.notFound
* since: v1.23
- `notFound` ?<[HarNotFound]<"abort"|"fallback">>
* If set to 'abort' any request not found in the HAR file will be aborted.
* If set to 'fallback' falls through to the next route handler in the handler chain.

Defaults to abort.

### option: BrowserContext.routeFromHAR.update
* since: v1.23
- `update` ?<boolean>

If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [`method: BrowserContext.close`] is called.

### option: BrowserContext.routeFromHAR.url
* since: v1.23
- `url` <[string]|[RegExp]>

A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

### option: BrowserContext.routeFromHAR.updateMode
* since: v1.32
- `updateMode` <[HarMode]<"full"|"minimal">>

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.

### option: BrowserContext.routeFromHAR.updateContent
* since: v1.32
- `updateContent` <[RouteFromHarUpdateContentPolicy]<"embed"|"attach">>

Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.


## async method: BrowserContext.routeWebSocket
* since: v1.48

This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages.
See [WebSocketRoute] for more details and examples.

```js
await context.routeWebSocket('/ws', async ws => {
  ws.routeSend(message => {
    if (message === 'to-be-blocked')
      return;
    ws.send(message);
  });
  await ws.connect();
});
```

```java
context.routeWebSocket("/ws", ws -> {
  ws.routeSend(message -> {
    if ("to-be-blocked".equals(message))
      return;
    ws.send(message);
  });
  ws.connect();
});
```

```python async
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "to-be-blocked":
    return
  ws.send(message)

async def handler(ws: WebSocketRoute):
  ws.route_send(lambda message: message_handler(ws, message))
  await ws.connect()

await context.route_web_socket("/ws", handler)
```

```python sync
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "to-be-blocked":
    return
  ws.send(message)

def handler(ws: WebSocketRoute):
  ws.route_send(lambda message: message_handler(ws, message))
  ws.connect()

context.route_web_socket("/ws", handler)
```

```csharp
await context.RouteWebSocketAsync("/ws", async ws => {
  ws.RouteSend(message => {
    if (message == "to-be-blocked")
      return;
    ws.Send(message);
  });
  await ws.ConnectAsync();
});
```

### param: BrowserContext.routeWebSocket.url
* since: v1.48
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [`option: Browser.newContext.baseURL`] context option.

### param: BrowserContext.routeWebSocket.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([WebSocketRoute]\): [Promise<any>|any]>

Handler function to route the WebSocket.

### param: BrowserContext.routeWebSocket.handler
* since: v1.48
* langs: csharp, java
- `handler` <[function]\([WebSocketRoute]\)>

Handler function to route the WebSocket.


## method: BrowserContext.serviceWorkers
* since: v1.11
* langs: js, python
- returns: <[Array]<[Worker]>>

:::note
Service workers are only supported on Chromium-based browsers.
:::

All existing service workers in the context.

## method: BrowserContext.setDefaultNavigationTimeout
* since: v1.8

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [`method: Page.goBack`]
* [`method: Page.goForward`]
* [`method: Page.goto`]
* [`method: Page.reload`]
* [`method: Page.setContent`]
* [`method: Page.waitForNavigation`]

:::note
[`method: Page.setDefaultNavigationTimeout`] and [`method: Page.setDefaultTimeout`] take priority over
[`method: BrowserContext.setDefaultNavigationTimeout`].
:::

### param: BrowserContext.setDefaultNavigationTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum navigation time in milliseconds

## method: BrowserContext.setDefaultTimeout
* since: v1.8

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

:::note
[`method: Page.setDefaultNavigationTimeout`], [`method: Page.setDefaultTimeout`] and
[`method: BrowserContext.setDefaultNavigationTimeout`] take priority over [`method: BrowserContext.setDefaultTimeout`].
:::

### param: BrowserContext.setDefaultTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum time in milliseconds. Pass `0` to disable timeout.

## async method: BrowserContext.setExtraHTTPHeaders
* since: v1.8

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged
with page-specific extra HTTP headers set with [`method: Page.setExtraHTTPHeaders`]. If page overrides a particular
header, page-specific header value will be used instead of the browser context header value.

:::note
[`method: BrowserContext.setExtraHTTPHeaders`] does not guarantee the order of headers in the outgoing requests.
:::

### param: BrowserContext.setExtraHTTPHeaders.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. All header values must be strings.

## async method: BrowserContext.setGeolocation
* since: v1.8

Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**

```js
await browserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
```

```java
browserContext.setGeolocation(new Geolocation(59.95, 30.31667));
```

```python async
await browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

```python sync
browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

```csharp
await context.SetGeolocationAsync(new Geolocation()
{
    Latitude = 59.95f,
    Longitude = 30.31667f
});
```

:::note
Consider using [`method: BrowserContext.grantPermissions`] to grant permissions for the browser context pages to read
its geolocation.
:::

### param: BrowserContext.setGeolocation.geolocation
* since: v1.8
- `geolocation` <[null]|[Object]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` ?<[float]> Non-negative accuracy value. Defaults to `0`.

## async method: BrowserContext.setHTTPCredentials
* since: v1.8
* langs: js
* deprecated: Browsers may cache credentials after successful authentication. Create a new browser context instead.

### param: BrowserContext.setHTTPCredentials.httpCredentials
* since: v1.8
- `httpCredentials` <[null]|[Object]>
  - `username` <[string]>
  - `password` <[string]>

## async method: BrowserContext.setOffline
* since: v1.8

### param: BrowserContext.setOffline.offline
* since: v1.8
- `offline` <[boolean]>

Whether to emulate network being offline for the browser context.


## async method: BrowserContext.storageState
* since: v1.8
- returns: <[Object]>
  - `cookies` <[Array]<[Object]>>
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]>
    - `path` <[string]>
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` <[SameSiteAttribute]<"Strict"|"Lax"|"None">>
  - `origins` <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` <[Array]<[Object]>>
      - `name` <[string]>
      - `value` <[string]>

Returns storage state for this browser context, contains current cookies, local storage snapshot and IndexedDB snapshot.

## async method: BrowserContext.storageState
* since: v1.8
* langs: csharp, java
- returns: <[string]>

### option: BrowserContext.storageState.path = %%-storagestate-option-path-%%
* since: v1.8

### option: BrowserContext.storageState.indexedDB
* since: v1.51
- `indexedDB` ?<boolean>

Set to `true` to include [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) in the storage state snapshot.
If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.

## property: BrowserContext.tracing
* since: v1.12
- type: <[Tracing]>

## async method: BrowserContext.unrouteAll
* since: v1.41

Removes all routes created with [`method: BrowserContext.route`] and [`method: BrowserContext.routeFromHAR`].

### option: BrowserContext.unrouteAll.behavior = %%-unroute-all-options-behavior-%%
* since: v1.41

## async method: BrowserContext.unroute
* since: v1.8

Removes a route created with [`method: BrowserContext.route`]. When [`param: handler`] is not specified, removes all
routes for the [`param: url`].

### param: BrowserContext.unroute.url
* since: v1.8
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving [URL] used to register a routing with
[`method: BrowserContext.route`].

### param: BrowserContext.unroute.handler
* since: v1.8
* langs: js, python
- `handler` ?<[function]\([Route], [Request]\): [Promise<any>|any]>

Optional handler function used to register a routing with [`method: BrowserContext.route`].

### param: BrowserContext.unroute.handler
* since: v1.8
* langs: csharp, java
- `handler` ?<[function]\([Route]\)>

Optional handler function used to register a routing with [`method: BrowserContext.route`].

## async method: BrowserContext.waitForCondition
* since: v1.32
* langs: java

The method will block until the condition returns true. All Playwright events will
be dispatched while the method is waiting for the condition.

**Usage**

Use the method to wait for a condition that depends on page events:

```java
List<String> failedUrls = new ArrayList<>();
context.onResponse(response -> {
  if (!response.ok()) {
    failedUrls.add(response.url());
  }
});
page1.getByText("Create user").click();
page2.getByText("Submit button").click();
context.waitForCondition(() -> failedUrls.size() > 3);
```

### param: BrowserContext.waitForCondition.condition
* since: v1.32
- `condition` <[BooleanSupplier]>

Condition to wait for.

### option: BrowserContext.waitForCondition.timeout = %%-wait-for-function-timeout-%%
* since: v1.32

## async method: BrowserContext.waitForConsoleMessage
* since: v1.34
* langs: java, python, csharp
  - alias-python: expect_console_message
  - alias-csharp: RunAndWaitForConsoleMessage
- returns: <[ConsoleMessage]>

Performs action and waits for a [ConsoleMessage] to be logged by in the pages in the context. If predicate is provided, it passes
[ConsoleMessage] value into the `predicate` function and waits for `predicate(message)` to return a truthy value.
Will throw an error if the page is closed before the [`event: BrowserContext.console`] event is fired.

## async method: BrowserContext.waitForConsoleMessage
* since: v1.34
* langs: python
- returns: <[EventContextManager]<[ConsoleMessage]>>

### param: BrowserContext.waitForConsoleMessage.action = %%-csharp-wait-for-event-action-%%
* since: v1.34

### option: BrowserContext.waitForConsoleMessage.predicate
* since: v1.34
- `predicate` <[function]\([ConsoleMessage]\):[boolean]>

Receives the [ConsoleMessage] object and resolves to truthy value when the waiting should resolve.

### option: BrowserContext.waitForConsoleMessage.timeout = %%-wait-for-event-timeout-%%
* since: v1.34

### param: BrowserContext.waitForConsoleMessage.callback = %%-java-wait-for-event-callback-%%
* since: v1.34

## async method: BrowserContext.waitForEvent
* since: v1.8
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy
value. Will throw an error if the context closes before the event is fired. Returns the event data value.

**Usage**

```js
const pagePromise = context.waitForEvent('page');
await page.getByRole('button').click();
const page = await pagePromise;
```

```java
Page newPage = context.waitForPage(() -> page.getByRole(AriaRole.BUTTON).click());
```

```python async
async with context.expect_event("page") as event_info:
    await page.get_by_role("button").click()
page = await event_info.value
```

```python sync
with context.expect_event("page") as event_info:
    page.get_by_role("button").click()
page = event_info.value
```

```csharp
var page = await context.RunAndWaitForPageAsync(async () =>
{
    await page.GetByRole(AriaRole.Button).ClickAsync();
});
```

## async method: BrowserContext.waitForEvent
* since: v1.8
* langs: python
- returns: <[EventContextManager]>

### param: BrowserContext.waitForEvent.event
* since: v1.8
- `event` <[string]>

Event name, same one would pass into `browserContext.on(event)`.

### param: BrowserContext.waitForEvent.optionsOrPredicate
* since: v1.8
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] method.

Either a predicate that receives an event or an options object. Optional.

### option: BrowserContext.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: BrowserContext.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.8

## async method: BrowserContext.waitForPage
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_page
  - alias-csharp: RunAndWaitForPage
- returns: <[Page]>

Performs action and waits for a new [Page] to be created in the context. If predicate is provided, it passes
[Page] value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the context closes before new [Page] is created.

## async method: BrowserContext.waitForPage
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Page]>>

### param: BrowserContext.waitForPage.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: BrowserContext.waitForPage.predicate
* since: v1.9
* langs: csharp, java, python
- `predicate` <[function]\([Page]\):[boolean]>

Receives the [Page] object and resolves to truthy value when the waiting should resolve.

### option: BrowserContext.waitForPage.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: BrowserContext.waitForPage.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: BrowserContext.waitForEvent2
* since: v1.8
* langs: python
  - alias-python: wait_for_event
- returns: <[any]>

:::note
In most cases, you should use [`method: BrowserContext.waitForEvent`].
:::

Waits for given `event` to fire. If predicate is provided, it passes
event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the browser context is closed before the `event` is fired.

### param: BrowserContext.waitForEvent2.event = %%-wait-for-event-event-%%
* since: v1.8

### option: BrowserContext.waitForEvent2.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: BrowserContext.waitForEvent2.timeout = %%-wait-for-event-timeout-%%
* since: v1.8
# class: JSHandle
* since: v1.8

JSHandle represents an in-page JavaScript object. JSHandles can be created with the [`method: Page.evaluateHandle`]
method.

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

```java
JSHandle windowHandle = page.evaluateHandle("() => window");
// ...
```

```python async
window_handle = await page.evaluate_handle("window")
# ...
```

```python sync
window_handle = page.evaluate_handle("window")
# ...
```

```csharp
var windowHandle = await page.EvaluateHandleAsync("() => window");
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is exposed with
[`method: JSHandle.dispose`]. JSHandles are auto-disposed when their origin frame gets navigated or the parent context
gets destroyed.

JSHandle instances can be used as an argument in [`method: Page.evalOnSelector`], [`method: Page.evaluate`] and
[`method: Page.evaluateHandle`] methods.

## method: JSHandle.asElement
* since: v1.8
- returns: <[null]|[ElementHandle]>

Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle].

## async method: JSHandle.dispose
* since: v1.8

The `jsHandle.dispose` method stops referencing the element handle.

## async method: JSHandle.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

This method passes this handle as the first argument to [`param: expression`].

If [`param: expression`] returns a [Promise], then `handle.evaluate` would wait for the promise to resolve and return
its value.

**Usage**

```js
const tweetHandle = await page.$('.tweet .retweets');
expect(await tweetHandle.evaluate(node => node.innerText)).toBe('10 retweets');
```

```java
ElementHandle tweetHandle = page.querySelector(".tweet .retweets");
assertEquals("10 retweets", tweetHandle.evaluate("node => node.innerText"));
```

```python async
tweet_handle = await page.query_selector(".tweet .retweets")
assert await tweet_handle.evaluate("node => node.innerText") == "10 retweets"
```

```python sync
tweet_handle = page.query_selector(".tweet .retweets")
assert tweet_handle.evaluate("node => node.innerText") == "10 retweets"
```

```csharp
var tweetHandle = await page.QuerySelectorAsync(".tweet .retweets");
Assert.AreEqual("10 retweets", await tweetHandle.EvaluateAsync("node => node.innerText"));
```

### param: JSHandle.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: JSHandle.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: JSHandle.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: JSHandle.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the return value of [`param: expression`] as a [JSHandle].

This method passes this handle as the first argument to [`param: expression`].

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `jsHandle.evaluateHandle` returns [JSHandle].

If the function passed to the `jsHandle.evaluateHandle` returns a [Promise], then `jsHandle.evaluateHandle` would wait
for the promise to resolve and return its value.

See [`method: Page.evaluateHandle`] for more details.

### param: JSHandle.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: JSHandle.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: JSHandle.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: JSHandle.getProperties
* since: v1.8
- returns: <[Map]<[string], [JSHandle]>>

The method returns a map with **own property names** as keys and JSHandle instances for the property values.

**Usage**

```js
const handle = await page.evaluateHandle(() => ({ window, document }));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

```java
JSHandle handle = page.evaluateHandle("() => ({ window, document })");
Map<String, JSHandle> properties = handle.getProperties();
JSHandle windowHandle = properties.get("window");
JSHandle documentHandle = properties.get("document");
handle.dispose();
```

```python async
handle = await page.evaluate_handle("({ window, document })")
properties = await handle.get_properties()
window_handle = properties.get("window")
document_handle = properties.get("document")
await handle.dispose()
```

```python sync
handle = page.evaluate_handle("({ window, document })")
properties = handle.get_properties()
window_handle = properties.get("window")
document_handle = properties.get("document")
handle.dispose()
```

```csharp
var handle = await page.EvaluateHandleAsync("() => ({ window, document }");
var properties = await handle.GetPropertiesAsync();
var windowHandle = properties["window"];
var documentHandle = properties["document"];
await handle.DisposeAsync();
```

## async method: JSHandle.getProperty
* since: v1.8
- returns: <[JSHandle]>

Fetches a single property from the referenced object.

### param: JSHandle.getProperty.propertyName
* since: v1.8
- `propertyName` <[string]>

property to get

## async method: JSHandle.jsonValue
* since: v1.8
- returns: <[Serializable]>

Returns a JSON representation of the object. If the object has a `toJSON` function, it **will not be called**.

:::note
The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the
object has circular references.
:::
# class: FileChooser
* since: v1.8

[FileChooser] objects are dispatched by the page in the [`event: Page.fileChooser`] event.

```js
// Start waiting for file chooser before clicking. Note no await.
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByText('Upload file').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, 'myfile.pdf'));
```

```java
FileChooser fileChooser = page.waitForFileChooser(() -> page.getByText("Upload file").click());
fileChooser.setFiles(Paths.get("myfile.pdf"));
```

```python async
async with page.expect_file_chooser() as fc_info:
    await page.get_by_text("Upload file").click()
file_chooser = await fc_info.value
await file_chooser.set_files("myfile.pdf")
```

```python sync
with page.expect_file_chooser() as fc_info:
    page.get_by_text("Upload file").click()
file_chooser = fc_info.value
file_chooser.set_files("myfile.pdf")
```

```csharp
var fileChooser = await page.RunAndWaitForFileChooserAsync(async () =>
{
    await page.GetByText("Upload file").ClickAsync();
});
await fileChooser.SetFilesAsync("temp.txt");
```

## method: FileChooser.element
* since: v1.8
- returns: <[ElementHandle]>

Returns input element associated with this file chooser.

## method: FileChooser.isMultiple
* since: v1.8
- returns: <[boolean]>

Returns whether this file chooser accepts multiple files.

## method: FileChooser.page
* since: v1.8
- returns: <[Page]>

Returns page this file chooser belongs to.

## async method: FileChooser.setFiles
* since: v1.8

Sets the value of the file input this chooser is associated with. If some of the `filePaths` are relative paths, then
they are resolved relative to the current working directory. For empty array, clears the selected files.

### param: FileChooser.setFiles.files = %%-input-files-%%
* since: v1.8

### option: FileChooser.setFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: FileChooser.setFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: FileChooser.setFiles.timeout = %%-input-timeout-js-%%
* since: v1.8
# class: Android
* since: v1.9
* langs: js

Playwright has **experimental** support for Android automation. This includes Chrome for Android and Android WebView.

*Requirements*
* Android device or AVD Emulator.
* [ADB daemon](https://developer.android.com/studio/command-line/adb) running and authenticated with your device. Typically running `adb devices` is all you need to do.
* [`Chrome 87`](https://play.google.com/store/apps/details?id=com.android.chrome) or newer installed on the device
* "Enable command line on non-rooted devices" enabled in `chrome://flags`.

*Known limitations*
* Raw USB operation is not yet supported, so you need ADB.
* Device needs to be awake to produce screenshots. Enabling "Stay awake" developer mode will help.
* We didn't run all the tests against the device, so not everything works.

*How to run*

An example of the Android automation script would be:

```js
const { _android: android } = require('playwright');

(async () => {
  // Connect to the device.
  const [device] = await android.devices();
  console.log(`Model: ${device.model()}`);
  console.log(`Serial: ${device.serial()}`);
  // Take screenshot of the whole device.
  await device.screenshot({ path: 'device.png' });

  {
    // --------------------- WebView -----------------------

    // Launch an application with WebView.
    await device.shell('am force-stop org.chromium.webview_shell');
    await device.shell('am start org.chromium.webview_shell/.WebViewBrowserActivity');
    // Get the WebView.
    const webview = await device.webView({ pkg: 'org.chromium.webview_shell' });

    // Fill the input box.
    await device.fill({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'github.com/microsoft/playwright');
    await device.press({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'Enter');

    // Work with WebView's page as usual.
    const page = await webview.page();
    await page.waitForNavigation({ url: /.*microsoft\/playwright.*/ });
    console.log(await page.title());
  }

  {
    // --------------------- Browser -----------------------

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    await page.goto('https://webkit.org/');
    console.log(await page.evaluate(() => window.location.href));
    await page.screenshot({ path: 'page.png' });

    await context.close();
  }

  // Close the device.
  await device.close();
})();
```

## async method: Android.connect
* since: v1.28
- returns: <[AndroidDevice]>

This methods attaches Playwright to an existing Android device.
Use [`method: Android.launchServer`] to launch a new Android server instance.

### param: Android.connect.wsEndpoint
* since: v1.28
- `wsEndpoint` <[string]>

A browser websocket endpoint to connect to.

### option: Android.connect.headers
* since: v1.28
- `headers` <[Object]<[string], [string]>>

Additional HTTP headers to be sent with web socket connect request. Optional.

### option: Android.connect.slowMo
* since: v1.28
- `slowMo` <[float]>

Slows down Playwright operations by the specified amount of milliseconds. Useful so that you
can see what is going on. Defaults to `0`.

### option: Android.connect.timeout
* since: v1.28
- `timeout` <[float]>

Maximum time in milliseconds to wait for the connection to be established. Defaults to
`30000` (30 seconds). Pass `0` to disable timeout.

## async method: Android.devices
* since: v1.9
- returns: <[Array]<[AndroidDevice]>>

Returns the list of detected Android devices.

### option: Android.devices.host
* since: v1.22
- `host` <[string]>

Optional host to establish ADB server connection. Default to `127.0.0.1`.

### option: Android.devices.port
* since: v1.20
- `port` <[int]>

Optional port to establish ADB server connection. Default to `5037`.

### option: Android.devices.omitDriverInstall
* since: v1.21
- `omitDriverInstall` <[boolean]>

Prevents automatic playwright driver installation on attach. Assumes that the drivers have been installed already.

## async method: Android.launchServer
* since: v1.28
* langs: js
- returns: <[BrowserServer]>

Launches Playwright Android server that clients can connect to. See the following example:

**Usage**

Server Side:

```js
const { _android } = require('playwright');

(async () => {
  const browserServer = await _android.launchServer({
    // If you have multiple devices connected and want to use a specific one.
    // deviceSerialNumber: '<deviceSerialNumber>',
  });
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);
})();
```

Client Side:

```js
const { _android } = require('playwright');

(async () => {
  const device = await _android.connect('<wsEndpoint>');

  console.log(device.model());
  console.log(device.serial());
  await device.shell('am force-stop com.android.chrome');
  const context = await device.launchBrowser();

  const page = await context.newPage();
  await page.goto('https://webkit.org/');
  console.log(await page.evaluate(() => window.location.href));
  await page.screenshot({ path: 'page-chrome-1.png' });

  await context.close();
})();
```

### option: Android.launchServer.adbHost
* since: v1.28
- `adbHost` <[string]>

Optional host to establish ADB server connection. Default to `127.0.0.1`.

### option: Android.launchServer.adbPort
* since: v1.28
- `adbPort` <[int]>

Optional port to establish ADB server connection. Default to `5037`.

### option: Android.launchServer.omitDriverInstall
* since: v1.28
- `omitDriverInstall` <[boolean]>

Prevents automatic playwright driver installation on attach. Assumes that the drivers have been installed already.

### option: Android.launchServer.deviceSerialNumber
* since: v1.28
- `deviceSerialNumber` <[string]>

Optional device serial number to launch the browser on. If not specified, it will
throw if multiple devices are connected.

### option: Android.launchServer.host
* since: v1.45
- `host` <[string]>

Host to use for the web socket. It is optional and if it is omitted, the server will accept connections on the unspecified IPv6 address (::) when IPv6 is available, or the unspecified IPv4 address (0.0.0.0) otherwise. Consider hardening it with picking a specific interface.

### option: Android.launchServer.port
* since: v1.28
- `port` <[int]>

Port to use for the web socket. Defaults to 0 that picks any available port.

### option: Android.launchServer.wsPath
* since: v1.28
- `wsPath` <[string]>

Path at which to serve the Android Server. For security, this defaults to an
unguessable string.

:::warning
Any process or web page (including those running in Playwright) with knowledge
of the `wsPath` can take control of the OS user. For this reason, you should
use an unguessable token when using this option.
:::

## method: Android.setDefaultTimeout
* since: v1.9

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

### param: Android.setDefaultTimeout.timeout
* since: v1.9
- `timeout` <[float]>

Maximum time in milliseconds
# class: APIResponse
* since: v1.16

[APIResponse] class represents responses returned by [`method: APIRequestContext.get`] and similar methods.

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    context = await playwright.request.new_context()
    response = await context.get("https://example.com/user/repos")
    assert response.ok
    assert response.status == 200
    assert response.headers["content-type"] == "application/json; charset=utf-8"
    json_data = await response.json()
    assert json_data["name"] == "foobar"
    assert await response.body() == '{"status": "ok"}'


async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    context = playwright.request.new_context()
    response = context.get("https://example.com/user/repos")
    assert response.ok
    assert response.status == 200
    assert response.headers["content-type"] == "application/json; charset=utf-8"
    assert response.json()["name"] == "foobar"
    assert response.body() == '{"status": "ok"}'
```

## async method: APIResponse.body
* since: v1.16
- returns: <[Buffer]>

Returns the buffer with response body.

## async method: APIResponse.dispose
* since: v1.16

Disposes the body of this response. If not called then the body will stay in memory until the context closes.

## method: APIResponse.headers
* since: v1.16
- returns: <[Object]<[string], [string]>>

An object with all the response HTTP headers associated with this response.

## method: APIResponse.headersArray
* since: v1.16
- returns: <[Array]<[Object]>>
  - `name` <[string]> Name of the header.
  - `value` <[string]> Value of the header.

An array with all the response HTTP headers associated with this response. Header names are not lower-cased.
Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

## async method: APIResponse.json
* since: v1.16
* langs: js, python
- returns: <[Serializable]>

Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

## async method: APIResponse.json
* since: v1.16
* langs: csharp
- returns: <[null]|[JsonElement]>

Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

## method: APIResponse.ok
* since: v1.16
- returns: <[boolean]>

Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

## method: APIResponse.status
* since: v1.16
- returns: <[int]>

Contains the status code of the response (e.g., 200 for a success).

## method: APIResponse.statusText
* since: v1.16
- returns: <[string]>

Contains the status text of the response (e.g. usually an "OK" for a success).

## async method: APIResponse.text
* since: v1.16
- returns: <[string]>

Returns the text representation of response body.

## method: APIResponse.url
* since: v1.16
- returns: <[string]>

Contains the URL of the response.
# class: ElectronApplication
* since: v1.9
* langs: js

Electron application representation. You can use [`method: Electron.launch`] to
obtain the application instance. This instance you can control main electron process
as well as work with Electron windows:

```js
const { _electron: electron } = require('playwright');

(async () => {
  // Launch Electron app.
  const electronApp = await electron.launch({ args: ['main.js'] });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
  // Capture a screenshot.
  await window.screenshot({ path: 'intro.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);
  // Click button.
  await window.click('text=Click me');
  // Exit app.
  await electronApp.close();
})();
```

## event: ElectronApplication.close
* since: v1.9

This event is issued when the application process has been terminated.

## event: ElectronApplication.console
* since: v1.42
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the Electron main process calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` are available on the [ConsoleMessage] event handler argument.

**Usage**

```js
electronApp.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await electronApp.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

## event: ElectronApplication.window
* since: v1.9
- argument: <[Page]>

This event is issued for every window that is created **and loaded** in Electron. It contains a [Page] that can
be used for Playwright automation.

## async method: ElectronApplication.browserWindow
* since: v1.11
- returns: <[JSHandle]>

Returns the BrowserWindow object that corresponds to the given Playwright page.

### param: ElectronApplication.browserWindow.page
* since: v1.11
- `page` <[Page]>

Page to retrieve the window for.

## async method: ElectronApplication.close
* since: v1.9

Closes Electron application.

## method: ElectronApplication.context
* since: v1.9
- returns: <[BrowserContext]>

This method returns browser context that can be used for setting up context-wide routing, etc.

## async method: ElectronApplication.evaluate
* since: v1.9
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

If the function passed to the [`method: ElectronApplication.evaluate`] returns a [Promise], then
[`method: ElectronApplication.evaluate`] would wait for the promise to resolve and return its value.

If the function passed to the [`method: ElectronApplication.evaluate`] returns a non-[Serializable] value, then
[`method: ElectronApplication.evaluate`] returns `undefined`. Playwright also supports transferring
some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

### param: ElectronApplication.evaluate.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElectronApplication.evaluate.expression = %%-js-electron-evaluate-workerfunction-%%
* since: v1.9

### param: ElectronApplication.evaluate.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: ElectronApplication.evaluateHandle
* since: v1.9
- returns: <[JSHandle]>

Returns the return value of [`param: expression`] as a [JSHandle].

The only difference between [`method: ElectronApplication.evaluate`] and [`method: ElectronApplication.evaluateHandle`] is that [`method: ElectronApplication.evaluateHandle`] returns [JSHandle].

If the function passed to the [`method: ElectronApplication.evaluateHandle`] returns a [Promise], then
[`method: ElectronApplication.evaluateHandle`] would wait for the promise to resolve and return its value.

### param: ElectronApplication.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElectronApplication.evaluateHandle.expression = %%-js-electron-evaluate-workerfunction-%%
* since: v1.9

### param: ElectronApplication.evaluateHandle.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: ElectronApplication.firstWindow
* since: v1.9
- returns: <[Page]>

Convenience method that waits for the first application window to be opened.

**Usage**

```js
const electronApp = await electron.launch({
  args: ['main.js']
});
const window = await electronApp.firstWindow();
// ...
```

### option: ElectronApplication.firstWindow.timeout
* since: v1.33
- `timeout` ?<[float]>

Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds).
Pass `0` to disable timeout. The default value can be changed by using the
[`method: BrowserContext.setDefaultTimeout`].

## method: ElectronApplication.process
* since: v1.21
- returns: <[ChildProcess]>

Returns the main process for this Electron Application.

## async method: ElectronApplication.waitForEvent
* since: v1.9
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the application is closed before the event is fired. Returns the event data value.

**Usage**

```js
const windowPromise = electronApp.waitForEvent('window');
await mainWindow.click('button');
const window = await windowPromise;
```

### param: ElectronApplication.waitForEvent.event = %%-wait-for-event-event-%%
* since: v1.9

### param: ElectronApplication.waitForEvent.optionsOrPredicate
* since: v1.9
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to
    disable timeout. The default value can be changed by using the [`method: BrowserContext.setDefaultTimeout`].

Either a predicate that receives an event or an options object. Optional.

## method: ElectronApplication.windows
* since: v1.9
- returns: <[Array]<[Page]>>

Convenience method that returns all the opened windows.
# class: Clock
* since: v1.45

Accurately simulating time-dependent behavior is essential for verifying the correctness of applications. Learn more about [clock emulation](../clock.md).

Note that clock is installed for the entire [BrowserContext], so the time
in all the pages and iframes is controlled by the same clock.

## async method: Clock.fastForward
* since: v1.45

Advance the clock by jumping forward in time. Only fires due timers at most once. This is equivalent to user closing the laptop lid for a while and
reopening it later, after given time.

**Usage**

```js
await page.clock.fastForward(1000);
await page.clock.fastForward('30:00');
```

```python async
await page.clock.fast_forward(1000)
await page.clock.fast_forward("30:00")
```

```python sync
page.clock.fast_forward(1000)
page.clock.fast_forward("30:00")
```

```java
page.clock().fastForward(1000);
page.clock().fastForward("30:00");
```

```csharp
await page.Clock.FastForwardAsync(1000);
await page.Clock.FastForwardAsync("30:00");
```

### param: Clock.fastForward.ticks
* since: v1.45
- `ticks` <[long]|[string]>

Time may be the number of milliseconds to advance the clock by or a human-readable string. Valid string formats are "08" for eight seconds, "01:00" for one minute and "02:34:10" for two hours, 34 minutes and ten seconds.

## async method: Clock.install
* since: v1.45

Install fake implementations for the following time-related functions:

* `Date`
* `setTimeout`
* `clearTimeout`
* `setInterval`
* `clearInterval`
* `requestAnimationFrame`
* `cancelAnimationFrame`
* `requestIdleCallback`
* `cancelIdleCallback`
* `performance`

Fake timers are used to manually control the flow of time in tests. They allow you to advance time, fire timers, and control the behavior of time-dependent functions. See [`method: Clock.runFor`] and [`method: Clock.fastForward`] for more information.

### option: Clock.install.time
* langs: js, java
* since: v1.45
- `time` <[long]|[string]|[Date]>

Time to initialize with, current system time by default.

### option: Clock.install.time
* langs: python
* since: v1.45
- `time` <[float]|[string]|[Date]>

Time to initialize with, current system time by default.

### option: Clock.install.time
* langs: csharp
* since: v1.45
- `time` <[string]|[Date]>

Time to initialize with, current system time by default.

## async method: Clock.runFor
* since: v1.45

Advance the clock, firing all the time-related callbacks.

**Usage**

```js
await page.clock.runFor(1000);
await page.clock.runFor('30:00');
```

```python async
await page.clock.run_for(1000);
await page.clock.run_for("30:00")
```

```python sync
page.clock.run_for(1000);
page.clock.run_for("30:00")
```

```java
page.clock().runFor(1000);
page.clock().runFor("30:00");
```

```csharp
await page.Clock.RunForAsync(1000);
await page.Clock.RunForAsync("30:00");
```

### param: Clock.runFor.ticks
* since: v1.45
- `ticks` <[long]|[string]>

Time may be the number of milliseconds to advance the clock by or a human-readable string. Valid string formats are "08" for eight seconds, "01:00" for one minute and "02:34:10" for two hours, 34 minutes and ten seconds.


## async method: Clock.pauseAt
* since: v1.45

Advance the clock by jumping forward in time and pause the time. Once this method is called, no timers
are fired unless [`method: Clock.runFor`], [`method: Clock.fastForward`], [`method: Clock.pauseAt`] or [`method: Clock.resume`] is called.

Only fires due timers at most once.
This is equivalent to user closing the laptop lid for a while and reopening it at the specified time and
pausing.

**Usage**

```js
await page.clock.pauseAt(new Date('2020-02-02'));
await page.clock.pauseAt('2020-02-02');
```

```python async
await page.clock.pause_at(datetime.datetime(2020, 2, 2))
await page.clock.pause_at("2020-02-02")
```

```python sync
page.clock.pause_at(datetime.datetime(2020, 2, 2))
page.clock.pause_at("2020-02-02")
```

```java
SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd");
page.clock().pauseAt(format.parse("2020-02-02"));
page.clock().pauseAt("2020-02-02");
```

```csharp
await page.Clock.PauseAtAsync(DateTime.Parse("2020-02-02"));
await page.Clock.PauseAtAsync("2020-02-02");
```

For best results, install the clock before navigating the page and set it to a time slightly before the intended test time. This ensures that all timers run normally during page loading, preventing the page from getting stuck. Once the page has fully loaded, you can safely use [`method: Clock.pauseAt`] to pause the clock.

```js
// Initialize clock with some time before the test time and let the page load
// naturally. `Date.now` will progress as the timers fire.
await page.clock.install({ time: new Date('2024-12-10T08:00:00') });
await page.goto('http://localhost:3333');
await page.clock.pauseAt(new Date('2024-12-10T10:00:00'));
```

```python async
# Initialize clock with some time before the test time and let the page load
# naturally. `Date.now` will progress as the timers fire.
await page.clock.install(time=datetime.datetime(2024, 12, 10, 8, 0, 0))
await page.goto("http://localhost:3333")
await page.clock.pause_at(datetime.datetime(2024, 12, 10, 10, 0, 0))
```

```python sync
# Initialize clock with some time before the test time and let the page load
# naturally. `Date.now` will progress as the timers fire.
page.clock.install(time=datetime.datetime(2024, 12, 10, 8, 0, 0))
page.goto("http://localhost:3333")
page.clock.pause_at(datetime.datetime(2024, 12, 10, 10, 0, 0))
```

```java
// Initialize clock with some time before the test time and let the page load
// naturally. `Date.now` will progress as the timers fire.
SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd'T'HH:mm:ss");
page.clock().install(new Clock.InstallOptions().setTime(format.parse("2024-12-10T08:00:00")));
page.navigate("http://localhost:3333");
page.clock().pauseAt(format.parse("2024-12-10T10:00:00"));
```

### param: Clock.pauseAt.time
* langs: js, java
* since: v1.45
- `time` <[long]|[string]|[Date]>

Time to pause at.

### param: Clock.pauseAt.time
* langs: python
* since: v1.45
- `time` <[float]|[string]|[Date]>

Time to pause at.

### param: Clock.pauseAt.time
* langs: csharp
* since: v1.45
- `time` <[Date]|[string]>

Time to pause at.

## async method: Clock.resume
* since: v1.45

Resumes timers. Once this method is called, time resumes flowing, timers are fired as usual.

## async method: Clock.setFixedTime
* since: v1.45

Makes `Date.now` and `new Date()` return fixed fake time at all times,
keeps all the timers running.

Use this method for simple scenarios where you only need to test with a predefined time. For more advanced scenarios, use [`method: Clock.install`] instead. Read docs on [clock emulation](../clock.md) to learn more.

**Usage**

```js
await page.clock.setFixedTime(Date.now());
await page.clock.setFixedTime(new Date('2020-02-02'));
await page.clock.setFixedTime('2020-02-02');
```

```python async
await page.clock.set_fixed_time(datetime.datetime.now())
await page.clock.set_fixed_time(datetime.datetime(2020, 2, 2))
await page.clock.set_fixed_time("2020-02-02")
```

```python sync
page.clock.set_fixed_time(datetime.datetime.now())
page.clock.set_fixed_time(datetime.datetime(2020, 2, 2))
page.clock.set_fixed_time("2020-02-02")
```

```java
page.clock().setFixedTime(new Date());
page.clock().setFixedTime(new SimpleDateFormat("yyy-MM-dd").parse("2020-02-02"));
page.clock().setFixedTime("2020-02-02");
```

```csharp
await page.Clock.SetFixedTimeAsync(DateTime.Now);
await page.Clock.SetFixedTimeAsync(new DateTime(2020, 2, 2));
await page.Clock.SetFixedTimeAsync("2020-02-02");
```

### param: Clock.setFixedTime.time
* langs: js, java
* since: v1.45
- `time` <[long]|[string]|[Date]>

Time to be set in milliseconds.

### param: Clock.setFixedTime.time
* langs: python
* since: v1.45
- `time` <[float]|[string]|[Date]>

Time to be set.

### param: Clock.setFixedTime.time
* langs: csharp
* since: v1.45
- `time` <[string]|[Date]>

Time to be set.

## async method: Clock.setSystemTime
* since: v1.45

Sets system time, but does not trigger any timers. Use this to test how the web page reacts to a time shift, for example switching from summer to winter time, or changing time zones.

**Usage**

```js
await page.clock.setSystemTime(Date.now());
await page.clock.setSystemTime(new Date('2020-02-02'));
await page.clock.setSystemTime('2020-02-02');
```

```python async
await page.clock.set_system_time(datetime.datetime.now())
await page.clock.set_system_time(datetime.datetime(2020, 2, 2))
await page.clock.set_system_time("2020-02-02")
```

```python sync
page.clock.set_system_time(datetime.datetime.now())
page.clock.set_system_time(datetime.datetime(2020, 2, 2))
page.clock.set_system_time("2020-02-02")
```

```java
page.clock().setSystemTime(new Date());
page.clock().setSystemTime(new SimpleDateFormat("yyy-MM-dd").parse("2020-02-02"));
page.clock().setSystemTime("2020-02-02");
```

```csharp
await page.Clock.SetSystemTimeAsync(DateTime.Now);
await page.Clock.SetSystemTimeAsync(new DateTime(2020, 2, 2));
await page.Clock.SetSystemTimeAsync("2020-02-02");
```

### param: Clock.setSystemTime.time
* langs: js, java
* since: v1.45
- `time` <[long]|[string]|[Date]>

Time to be set in milliseconds.

### param: Clock.setSystemTime.time
* langs: python
* since: v1.45
- `time` <[float]|[string]|[Date]>

Time to be set.

### param: Clock.setSystemTime.time
* langs: csharp
* since: v1.45
- `time` <[string]|[Date]>

Time to be set.
# class: BrowserType
* since: v1.8

BrowserType provides methods to launch a specific browser instance or connect to an existing one. The following is a
typical example of using Playwright to drive automation:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // other actions...
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      page.navigate("https://example.com");
      // other actions...
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    await page.goto("https://example.com")
    # other actions...
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    # other actions...
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class BrowserTypeExamples
{
    public static async Task Run()
    {
        using var playwright = await Playwright.CreateAsync();
        var chromium = playwright.Chromium;
        var browser = await chromium.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.GotoAsync("https://www.bing.com");
        // other actions
        await browser.CloseAsync();
    }
}
```

## async method: BrowserType.connect
* since: v1.8
- returns: <[Browser]>

This method attaches Playwright to an existing browser instance created via `BrowserType.launchServer` in Node.js.

:::note
The major and minor version of the Playwright instance that connects needs to match the version of Playwright that launches the browser (1.2.3 → is compatible with 1.2.x).
:::

### param: BrowserType.connect.wsEndpoint
* since: v1.10
- `wsEndpoint` <[string]>

A Playwright browser websocket endpoint to connect to. You obtain this endpoint via `BrowserServer.wsEndpoint`.

### option: BrowserType.connect.headers
* since: v1.11
- `headers` <[Object]<[string], [string]>>

Additional HTTP headers to be sent with web socket connect request. Optional.

### option: BrowserType.connect.slowMo
* since: v1.10
- `slowMo` <[float]>

Slows down Playwright operations by the specified amount of milliseconds. Useful so that you
can see what is going on. Defaults to 0.

### option: BrowserType.connect.logger
* since: v1.14
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging. Optional.

### option: BrowserType.connect.timeout
* since: v1.10
- `timeout` <[float]>

Maximum time in milliseconds to wait for the connection to be established. Defaults to
`0` (no timeout).

### option: BrowserType.connect.exposeNetwork
* since: v1.37
- `exposeNetwork` <[string]>

This option exposes network available on the connecting client to the browser being connected to. Consists of a list of rules separated by comma.

Available rules:
1. Hostname pattern, for example: `example.com`, `*.org:99`, `x.*.y.com`, `*foo.org`.
1. IP literal, for example: `127.0.0.1`, `0.0.0.0:99`, `[::1]`, `[0:0::1]:99`.
1. `<loopback>` that matches local loopback interfaces: `localhost`, `*.localhost`, `127.0.0.1`, `[::1]`.

Some common examples:
1. `"*"` to expose all network.
1. `"<loopback>"` to expose localhost network.
1. `"*.test.internal-domain,*.staging.internal-domain,<loopback>"` to expose test/staging deployments and localhost.

## async method: BrowserType.connectOverCDP
* since: v1.9
- returns: <[Browser]>

This method attaches Playwright to an existing browser instance using the Chrome DevTools Protocol.

The default browser context is accessible via [`method: Browser.contexts`].

:::note
Connecting over the Chrome DevTools Protocol is only supported for Chromium-based browsers.
:::

:::note
This connection is significantly lower fidelity than the Playwright protocol connection via [`method: BrowserType.connect`]. If you are experiencing issues or attempting to use advanced functionality, you probably want to use [`method: BrowserType.connect`].
:::

**Usage**

```js
const browser = await playwright.chromium.connectOverCDP('http://localhost:9222');
const defaultContext = browser.contexts()[0];
const page = defaultContext.pages()[0];
```

```java
Browser browser = playwright.chromium().connectOverCDP("http://localhost:9222");
BrowserContext defaultContext = browser.contexts().get(0);
Page page = defaultContext.pages().get(0);
```

```python async
browser = await playwright.chromium.connect_over_cdp("http://localhost:9222")
default_context = browser.contexts[0]
page = default_context.pages[0]
```

```python sync
browser = playwright.chromium.connect_over_cdp("http://localhost:9222")
default_context = browser.contexts[0]
page = default_context.pages[0]
```

```csharp
var browser = await playwright.Chromium.ConnectOverCDPAsync("http://localhost:9222");
var defaultContext = browser.Contexts[0];
var page = defaultContext.Pages[0];
```

### param: BrowserType.connectOverCDP.endpointURL
* since: v1.11
- `endpointURL` <[string]>

A CDP websocket endpoint or http url to connect to. For example `http://localhost:9222/` or `ws://127.0.0.1:9222/devtools/browser/387adf4c-243f-4051-a181-46798f4a46f4`.

### option: BrowserType.connectOverCDP.endpointURL
* since: v1.14
* langs: js
* deprecated: Use the first argument instead.
- `endpointURL` <[string]>

### option: BrowserType.connectOverCDP.headers
* since: v1.11
- `headers` <[Object]<[string], [string]>>

Additional HTTP headers to be sent with connect request. Optional.

### option: BrowserType.connectOverCDP.isLocal
* since: v1.58
- `isLocal` <[boolean]>

Tells Playwright that it runs on the same host as the CDP server. It will enable certain optimizations that rely upon
the file system being the same between Playwright and the Browser.

### option: BrowserType.connectOverCDP.logger
* since: v1.14
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging. Optional.

### option: BrowserType.connectOverCDP.slowMo
* since: v1.11
- `slowMo` <[float]>

Slows down Playwright operations by the specified amount of milliseconds. Useful so that you
can see what is going on. Defaults to 0.

### option: BrowserType.connectOverCDP.timeout
* since: v1.11
- `timeout` <[float]>

Maximum time in milliseconds to wait for the connection to be established. Defaults to
`30000` (30 seconds). Pass `0` to disable timeout.

## method: BrowserType.executablePath
* since: v1.8
- returns: <[string]>

A path where Playwright expects to find a bundled browser executable.

## async method: BrowserType.launch
* since: v1.8
- returns: <[Browser]>

Returns the browser instance.

**Usage**

You can use [`option: ignoreDefaultArgs`] to filter out `--mute-audio` from default arguments:

```js
const browser = await chromium.launch({  // Or 'firefox' or 'webkit'.
  ignoreDefaultArgs: ['--mute-audio']
});
```

```java
// Or "firefox" or "webkit".
Browser browser = chromium.launch(new BrowserType.LaunchOptions()
  .setIgnoreDefaultArgs(Arrays.asList("--mute-audio")));
```

```python async
browser = await playwright.chromium.launch( # or "firefox" or "webkit".
    ignore_default_args=["--mute-audio"]
)
```

```python sync
browser = playwright.chromium.launch( # or "firefox" or "webkit".
    ignore_default_args=["--mute-audio"]
)
```

```csharp
var browser = await playwright.Chromium.LaunchAsync(new() {
    IgnoreDefaultArgs = new[] { "--mute-audio" }
});
```

> **Chromium-only** Playwright can also be used to control the Google Chrome or Microsoft Edge browsers, but it works best with the version of
Chromium it is bundled with. There is no guarantee it will work with any other version. Use [`option: executablePath`]
option with extreme caution.
>
> If Google Chrome (rather than Chromium) is preferred, a
[Chrome Canary](https://www.google.com/chrome/browser/canary.html) or
[Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested.
>
> Stock browsers like Google Chrome and Microsoft Edge are suitable for tests that require proprietary media codecs for video playback. See [this article](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for other differences between Chromium and Chrome.
[This article](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md)
describes some differences for Linux users.

### option: BrowserType.launch.-inline- = %%-shared-browser-options-list-v1.8-%%
* since: v1.8

### option: BrowserType.launch.firefoxUserPrefs = %%-js-python-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launch.firefoxUserPrefs2 = %%-csharp-java-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launch.logger = %%-browser-option-logger-%%
* since: v1.8

### option: BrowserType.launch.slowMo = %%-browser-option-slowmo-%%
* since: v1.8

### option: BrowserType.launch.ignoreDefaultArgs = %%-csharp-java-browser-option-ignoredefaultargs-%%
* since: v1.8

### option: BrowserType.launch.ignoreAllDefaultArgs = %%-csharp-java-browser-option-ignorealldefaultargs-%%
* since: v1.9

## async method: BrowserType.launchPersistentContext
* since: v1.8
- returns: <[BrowserContext]>

Returns the persistent browser context instance.

Launches browser that uses persistent storage located at [`param: userDataDir`] and returns the only context. Closing
this context will automatically close the browser.

### param: BrowserType.launchPersistentContext.userDataDir
* since: v1.8
- `userDataDir` <[path]>

Path to a User Data Directory, which stores browser session data like cookies and local storage. Pass an empty string to create a temporary directory.

More details for
[Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md#introduction) and
[Firefox](https://wiki.mozilla.org/Firefox/CommandLineOptions#User_profile). Chromium's user data directory is the **parent** directory of the "Profile Path" seen at `chrome://version`.

Note that browsers do not allow launching multiple instances with the same User Data Directory.

:::warning
Chromium/Chrome: Due to recent Chrome policy changes, automating the default Chrome user profile is not supported. Pointing `userDataDir` to Chrome's main "User Data" directory (the profile used for your regular browsing) may result in pages not loading or the browser exiting. Create and use a separate directory (for example, an empty folder) as your automation profile instead. See https://developer.chrome.com/blog/remote-debugging-port for details.
:::

### option: BrowserType.launchPersistentContext.-inline- = %%-shared-browser-options-list-v1.8-%%
* since: v1.8

### option: BrowserType.launchPersistentContext.slowMo = %%-browser-option-slowmo-%%
* since: v1.8

### option: BrowserType.launchPersistentContext.ignoreDefaultArgs = %%-csharp-java-browser-option-ignoredefaultargs-%%
* since: v1.8

### option: BrowserType.launchPersistentContext.ignoreAllDefaultArgs = %%-csharp-java-browser-option-ignorealldefaultargs-%%
* since: v1.9

### option: BrowserType.launchPersistentContext.-inline- = %%-shared-context-params-list-v1.8-%%
* since: v1.8

### option: BrowserType.launchPersistentContext.firefoxUserPrefs = %%-js-python-browser-option-firefoxuserprefs-%%
* since: v1.40

### option: BrowserType.launchPersistentContext.firefoxUserPrefs2 = %%-csharp-java-browser-option-firefoxuserprefs-%%
* since: v1.40

### option: BrowserType.launchPersistentContext.clientCertificates = %%-context-option-clientCertificates-%%
* since: 1.46

## async method: BrowserType.launchServer
* since: v1.8
* langs: js
- returns: <[BrowserServer]>

Returns the browser app instance. You can connect to it via [`method: BrowserType.connect`], which requires the major/minor client/server version to match (1.2.3 → is compatible with 1.2.x).

**Usage**

Launches browser server that client can connect to. An example of launching a browser executable and connecting to it
later:

```js
const { chromium } = require('playwright');  // Or 'webkit' or 'firefox'.

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  // Use web socket endpoint later to establish a connection.
  const browser = await chromium.connect(wsEndpoint);
  // Close browser instance.
  await browserServer.close();
})();
```

### option: BrowserType.launchServer.-inline- = %%-shared-browser-options-list-v1.8-%%
* since: v1.8

### option: BrowserType.launchServer.firefoxUserPrefs = %%-js-python-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launchServer.firefoxUserPrefs2 = %%-csharp-java-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launchServer.logger = %%-browser-option-logger-%%
* since: v1.8

### option: BrowserType.launchServer.host
* since: v1.45
- `host` <[string]>

Host to use for the web socket. It is optional and if it is omitted, the server will accept connections on the unspecified IPv6 address (::) when IPv6 is available, or the unspecified IPv4 address (0.0.0.0) otherwise. Consider hardening it with picking a specific interface.

### option: BrowserType.launchServer.port
* since: v1.8
- `port` <[int]>

Port to use for the web socket. Defaults to 0 that picks any available port.

### option: BrowserType.launchServer.wsPath
* since: v1.15
- `wsPath` <[string]>

Path at which to serve the Browser Server. For security, this defaults to an
unguessable string.

:::warning
Any process or web page (including those running in Playwright) with knowledge
of the `wsPath` can take control of the OS user. For this reason, you should
use an unguessable token when using this option.
:::

## method: BrowserType.name
* since: v1.8
- returns: <[string]>

Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.
# class: Coverage
* since: v1.11
* langs: js

Coverage gathers information about parts of JavaScript and CSS that were used by the page.

An example of using JavaScript coverage to produce Istanbul report for page load:

:::note
Coverage APIs are only supported on Chromium-based browsers.
:::

```js
const { chromium } = require('playwright');
const v8toIstanbul = require('v8-to-istanbul');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.coverage.startJSCoverage();
  await page.goto('https://chromium.org');
  const coverage = await page.coverage.stopJSCoverage();
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source });
    await converter.load();
    converter.applyCoverage(entry.functions);
    console.log(JSON.stringify(converter.toIstanbul()));
  }
  await browser.close();
})();
```

## async method: Coverage.startCSSCoverage
* since: v1.11

Returns coverage is started

### option: Coverage.startCSSCoverage.resetOnNavigation
* since: v1.11
- `resetOnNavigation` <[boolean]>

Whether to reset coverage on every navigation. Defaults to `true`.

## async method: Coverage.startJSCoverage
* since: v1.11

Returns coverage is started

:::note
Anonymous scripts are ones that don't have an associated url. These are scripts that are dynamically created
on the page using `eval` or `new Function`. If [`option: reportAnonymousScripts`] is set to `true`, anonymous scripts
will have `__playwright_evaluation_script__` as their URL.
:::

### option: Coverage.startJSCoverage.resetOnNavigation
* since: v1.11
- `resetOnNavigation` <[boolean]>

Whether to reset coverage on every navigation. Defaults to `true`.

### option: Coverage.startJSCoverage.reportAnonymousScripts
* since: v1.11
- `reportAnonymousScripts` <[boolean]>

Whether anonymous scripts generated by the page should be reported. Defaults to `false`.

## async method: Coverage.stopCSSCoverage
* since: v1.11
- returns: <[Array]<[Object]>>
  - `url` <[string]> StyleSheet URL
  - `text` ?<[string]> StyleSheet content, if available.
  - `ranges` <[Array]<[Object]>> StyleSheet ranges that were used. Ranges are sorted and non-overlapping.
    - `start` <[int]> A start offset in text, inclusive
    - `end` <[int]> An end offset in text, exclusive

Returns the array of coverage reports for all stylesheets

:::note
CSS Coverage doesn't include dynamically injected style tags without sourceURLs.
:::

## async method: Coverage.stopJSCoverage
* since: v1.11
- returns: <[Array]<[Object]>>
  - `url` <[string]> Script URL
  - `scriptId` <[string]> Script ID
  - `source` ?<[string]> Script content, if applicable.
  - `functions` <[Array]<[Object]>> V8-specific coverage format.
    - `functionName` <[string]>
    - `isBlockCoverage` <[boolean]>
    - `ranges` <[Array]<[Object]>>
      - `count` <[int]>
      - `startOffset` <[int]>
      - `endOffset` <[int]>

Returns the array of coverage reports for all scripts

:::note
JavaScript Coverage doesn't include anonymous scripts by default. However, scripts with sourceURLs are
reported.
:::
# class: Response
* since: v1.8

[Response] class represents responses which are received by page.

## async method: Response.allHeaders
* since: v1.15
- returns: <[Object]<[string], [string]>>

An object with all the response HTTP headers associated with this response.

## async method: Response.body
* since: v1.8
- returns: <[Buffer]>

Returns the buffer with response body.

## async method: Response.finished
* since: v1.8
- returns: <[null]|[string]>

Waits for this response to finish, returns always `null`.

## async method: Response.finished
* since: v1.8
* langs: js
- returns: <[null]|[Error]>

## method: Response.frame
* since: v1.8
- returns: <[Frame]>

Returns the [Frame] that initiated this response.

## method: Response.fromServiceWorker
* since: v1.23
- returns: <[boolean]>

Indicates whether this Response was fulfilled by a Service Worker's Fetch Handler (i.e. via [FetchEvent.respondWith](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)).

## method: Response.headers
* since: v1.8
- returns: <[Object]<[string], [string]>>

An object with the response HTTP headers. The header names are lower-cased.
Note that this method does not return security-related headers, including cookie-related ones.
You can use [`method: Response.allHeaders`] for complete list of headers that include `cookie` information.

## async method: Response.headersArray
* since: v1.15
- returns: <[Array]<[Object]>>
  - `name` <[string]> Name of the header.
  - `value` <[string]> Value of the header.

An array with all the request HTTP headers associated with this response. Unlike [`method: Response.allHeaders`], header names are NOT lower-cased.
Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

## async method: Response.headerValue
* since: v1.15
- returns: <[null]|[string]>

Returns the value of the header matching the name. The name is case-insensitive. If multiple headers have
the same name (except `set-cookie`), they are returned as a list separated by `, `. For `set-cookie`, the `\n` separator is used. If no headers are found, `null` is returned.

### param: Response.headerValue.name
* since: v1.15
- `name` <[string]>

Name of the header.

## async method: Response.headerValues
* since: v1.15
- returns: <[Array]<[string]>>

Returns all values of the headers matching the name, for example `set-cookie`. The name is case-insensitive.

### param: Response.headerValues.name
* since: v1.15
- `name` <[string]>

Name of the header.

## async method: Response.json
* since: v1.8
* langs: js, python
- returns: <[Serializable]>

Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

## async method: Response.json
* since: v1.8
* langs: csharp
- returns: <[null]|[JsonElement]>

Returns the JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

## method: Response.ok
* since: v1.8
- returns: <[boolean]>

Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

## method: Response.request
* since: v1.8
- returns: <[Request]>

Returns the matching [Request] object.

## async method: Response.securityDetails
* since: v1.13
- returns: <[null]|[Object]>
  - `issuer` ?<[string]> Common Name component of the Issuer field.
    from the certificate. This should only be used for informational purposes. Optional.
  - `protocol` ?<[string]> The specific TLS protocol used. (e.g. `TLS 1.3`). Optional.
  - `subjectName` ?<[string]> Common Name component of the Subject
    field from the certificate. This should only be used for informational purposes. Optional.
  - `validFrom` ?<[float]> Unix timestamp (in seconds) specifying
    when this cert becomes valid. Optional.
  - `validTo` ?<[float]> Unix timestamp (in seconds) specifying
    when this cert becomes invalid. Optional.

Returns SSL and other security information.

## async method: Response.serverAddr
* since: v1.13
- returns: <[null]|[Object]>
  - `ipAddress` <[string]> IPv4 or IPV6 address of the server.
  - `port` <[int]>

Returns the IP address and port of the server.

## method: Response.status
* since: v1.8
- returns: <[int]>

Contains the status code of the response (e.g., 200 for a success).

## method: Response.statusText
* since: v1.8
- returns: <[string]>

Contains the status text of the response (e.g. usually an "OK" for a success).

## async method: Response.text
* since: v1.8
- returns: <[string]>

Returns the text representation of response body.

## method: Response.url
* since: v1.8
- returns: <[string]>

Contains the URL of the response.
# class: Browser
* since: v1.8

A Browser is created via [`method: BrowserType.launch`]. An example of using a [Browser] to create a [Page]:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
 public static void main(String[] args) {
   try (Playwright playwright = Playwright.create()) {
     BrowserType firefox = playwright.firefox();
     Browser browser = firefox.launch();
     Page page = browser.newPage();
     page.navigate("https://example.com");
     browser.close();
   }
 }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = await firefox.launch()
    page = await browser.new_page()
    await page.goto("https://example.com")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    firefox = playwright.firefox
    browser = firefox.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var firefox = playwright.Firefox;
var browser = await firefox.LaunchAsync(new() { Headless = false });
var page = await browser.NewPageAsync();
await page.GotoAsync("https://www.bing.com");
await browser.CloseAsync();
```

## event: Browser.disconnected
* since: v1.8
- argument: <[Browser]>

Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [`method: Browser.close`] method was called.

## method: Browser.browserType
* since: v1.23
- returns: <[BrowserType]>

Get the browser type (chromium, firefox or webkit) that the browser belongs to.

## async method: Browser.close
* since: v1.8

In case this browser is obtained using [`method: BrowserType.launch`], closes the browser and all of its pages (if any
were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the
browser server.

:::note
This is similar to force-quitting the browser. To close pages gracefully and ensure you receive page close events, call [`method: BrowserContext.close`] on any [BrowserContext] instances you explicitly created earlier using [`method: Browser.newContext`] **before** calling [`method: Browser.close`].
:::

The [Browser] object itself is considered to be disposed and cannot be used anymore.

### option: Browser.close.reason
* since: v1.40
- `reason` <[string]>

The reason to be reported to the operations interrupted by the browser closure.

## method: Browser.contexts
* since: v1.8
- returns: <[Array]<[BrowserContext]>>

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

**Usage**

```js
const browser = await pw.webkit.launch();
console.log(browser.contexts().length); // prints `0`

const context = await browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

```java
Browser browser = pw.webkit().launch();
System.out.println(browser.contexts().size()); // prints "0"
BrowserContext context = browser.newContext();
System.out.println(browser.contexts().size()); // prints "1"
```

```python async
browser = await pw.webkit.launch()
print(len(browser.contexts)) # prints `0`
context = await browser.new_context()
print(len(browser.contexts)) # prints `1`
```

```python sync
browser = pw.webkit.launch()
print(len(browser.contexts)) # prints `0`
context = browser.new_context()
print(len(browser.contexts)) # prints `1`
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Webkit.LaunchAsync();
System.Console.WriteLine(browser.Contexts.Count); // prints "0"
var context = await browser.NewContextAsync();
System.Console.WriteLine(browser.Contexts.Count); // prints "1"
```

## method: Browser.isConnected
* since: v1.8
- returns: <[boolean]>

Indicates that the browser is connected.

## async method: Browser.newBrowserCDPSession
* since: v1.11
- returns: <[CDPSession]>

:::note
CDP Sessions are only supported on Chromium-based browsers.
:::

Returns the newly created browser session.

## async method: Browser.newContext
* since: v1.8
- returns: <[BrowserContext]>

Creates a new browser context. It won't share cookies/cache with other browser contexts.

:::note
If directly using this method to create [BrowserContext]s, it is best practice to explicitly close the returned context via [`method: BrowserContext.close`] when your code is done with the [BrowserContext],
and before calling [`method: Browser.close`]. This will ensure the `context` is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved.
:::

**Usage**

```js
(async () => {
  const browser = await playwright.firefox.launch();  // Or 'chromium' or 'webkit'.
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  await page.goto('https://example.com');

  // Gracefully close up everything
  await context.close();
  await browser.close();
})();
```

```java
Browser browser = playwright.firefox().launch();  // Or 'chromium' or 'webkit'.
// Create a new incognito browser context.
BrowserContext context = browser.newContext();
// Create a new page in a pristine context.
Page page = context.newPage();
page.navigate("https://example.com");

// Graceful close up everything
context.close();
browser.close();
```

```python async
browser = await playwright.firefox.launch() # or "chromium" or "webkit".
# create a new incognito browser context.
context = await browser.new_context()
# create a new page in a pristine context.
page = await context.new_page()
await page.goto("https://example.com")

# gracefully close up everything
await context.close()
await browser.close()
```

```python sync
browser = playwright.firefox.launch() # or "chromium" or "webkit".
# create a new incognito browser context.
context = browser.new_context()
# create a new page in a pristine context.
page = context.new_page()
page.goto("https://example.com")

# gracefully close up everything
context.close()
browser.close()
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Firefox.LaunchAsync();
// Create a new incognito browser context.
var context = await browser.NewContextAsync();
// Create a new page in a pristine context.
var page = await context.NewPageAsync(); ;
await page.GotoAsync("https://www.bing.com");

// Gracefully close up everything
await context.CloseAsync();
await browser.CloseAsync();
```

### option: Browser.newContext.-inline- = %%-shared-context-params-list-v1.8-%%
* since: v1.8

### option: Browser.newContext.proxy = %%-context-option-proxy-%%
* since: v1.8

### option: Browser.newContext.clientCertificates = %%-context-option-clientCertificates-%%
* since: 1.46

### option: Browser.newContext.storageState = %%-js-python-context-option-storage-state-%%
* since: v1.8

### option: Browser.newContext.storageState = %%-csharp-java-context-option-storage-state-%%
* since: v1.8

### option: Browser.newContext.storageStatePath = %%-csharp-java-context-option-storage-state-path-%%
* since: v1.9

## async method: Browser.newPage
* since: v1.8
- returns: <[Page]>

Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and
testing frameworks should explicitly create [`method: Browser.newContext`] followed by the
[`method: BrowserContext.newPage`] to control their exact life times.

### option: Browser.newPage.-inline- = %%-shared-context-params-list-v1.8-%%
* since: v1.8

### option: Browser.newPage.proxy = %%-context-option-proxy-%%
* since: v1.8

### option: Browser.newPage.clientCertificates = %%-context-option-clientCertificates-%%
* since: 1.46

### option: Browser.newPage.storageState = %%-js-python-context-option-storage-state-%%
* since: v1.8

### option: Browser.newPage.storageState = %%-csharp-java-context-option-storage-state-%%
* since: v1.8

### option: Browser.newPage.storageStatePath = %%-csharp-java-context-option-storage-state-path-%%
* since: v1.9

## async method: Browser.removeAllListeners
* since: v1.47
* langs: js

Removes all the listeners of the given type (or all registered listeners if no type given).
Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

### param: Browser.removeAllListeners.type
* since: v1.47
- `type` ?<[string]>

### option: Browser.removeAllListeners.behavior = %%-remove-all-listeners-options-behavior-%%
* since: v1.47

## async method: Browser.startTracing
* since: v1.11
* langs: java, js, python

:::note
This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

You can use [`method: Browser.startTracing`] and [`method: Browser.stopTracing`] to create a trace file that can
be opened in Chrome DevTools performance panel.

**Usage**

```js
await browser.startTracing(page, { path: 'trace.json' });
await page.goto('https://www.google.com');
await browser.stopTracing();
```

```java
browser.startTracing(page, new Browser.StartTracingOptions()
  .setPath(Paths.get("trace.json")));
page.navigate("https://www.google.com");
browser.stopTracing();
```

```python async
await browser.start_tracing(page, path="trace.json")
await page.goto("https://www.google.com")
await browser.stop_tracing()
```

```python sync
browser.start_tracing(page, path="trace.json")
page.goto("https://www.google.com")
browser.stop_tracing()
```

### param: Browser.startTracing.page
* since: v1.11
- `page` ?<[Page]>

Optional, if specified, tracing includes screenshots of the given page.

### option: Browser.startTracing.path
* since: v1.11
- `path` <[path]>

A path to write the trace file to.

### option: Browser.startTracing.screenshots
* since: v1.11
- `screenshots` <[boolean]>

captures screenshots in the trace.

### option: Browser.startTracing.categories
* since: v1.11
- `categories` <[Array]<[string]>>

specify custom categories to use instead of default.

## async method: Browser.stopTracing
* since: v1.11
* langs: java, js, python
- returns: <[Buffer]>

:::note
This API controls [Chromium Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) which is a low-level chromium-specific debugging tool. API to control [Playwright Tracing](../trace-viewer) could be found [here](./class-tracing).
:::

Returns the buffer with trace data.

## method: Browser.version
* since: v1.8
- returns: <[string]>

Returns the browser version.
# class: Page
* since: v1.8

Page provides methods to interact with a single tab in a [Browser], or an
[extension background page](https://developer.chrome.com/extensions/background_pages) in Chromium. One [Browser]
instance might have multiple [Page] instances.

This example creates a page, navigates it to a URL, and then saves a screenshot:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch();
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      page.navigate("https://example.com");
      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("screenshot.png")));
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch()
    context = await browser.new_context()
    page = await context.new_page()
    await page.goto("https://example.com")
    await page.screenshot(path="screenshot.png")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://example.com")
    page.screenshot(path="screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Run()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.GotoAsync("https://www.theverge.com");
        await page.ScreenshotAsync(new() { Path = "theverge.png" });
    }
}
```

The Page class emits various events (described below) which can be handled using any of Node's native
[`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) methods, such as `on`, `once` or
`removeListener`.

This example logs a message for a single page `load` event:

```js
page.once('load', () => console.log('Page loaded!'));
```

```java
page.onLoad(p -> System.out.println("Page loaded!"));
```

```py
page.once("load", lambda: print("page loaded!"))
```

```csharp
page.Load += (_, _) => Console.WriteLine("Page loaded!");
```

To unsubscribe from events use the `removeListener` method:

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.removeListener('request', logRequest);
```

```java
Consumer<Request> logRequest = interceptedRequest -> {
  System.out.println("A request was made: " + interceptedRequest.url());
};
page.onRequest(logRequest);
// Sometime later...
page.offRequest(logRequest);
```

```py
def log_request(intercepted_request):
    print("a request was made:", intercepted_request.url)
page.on("request", log_request)
# sometime later...
page.remove_listener("request", log_request)
```

```csharp
void PageLoadHandler(object _, IPage p) {
    Console.WriteLine("Page loaded!");
};

page.Load += PageLoadHandler;
// Do some work...
page.Load -= PageLoadHandler;
```

## property: Page.clock
* since: v1.45
- type: <[Clock]>

Playwright has ability to mock clock and passage of time.

## event: Page.close
* since: v1.8
- argument: <[Page]>

Emitted when the page closes.

## event: Page.console
* since: v1.8
* langs:
  - alias-java: consoleMessage
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` are available on the [ConsoleMessage] event handler argument.

**Usage**

```js
page.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

```java
page.onConsoleMessage(msg -> {
  for (int i = 0; i < msg.args().size(); ++i)
    System.out.println(i + ": " + msg.args().get(i).jsonValue());
});
page.evaluate("() => console.log('hello', 5, { foo: 'bar' })");
```

```python async
async def print_args(msg):
    values = []
    for arg in msg.args:
        values.append(await arg.json_value())
    print(values)

page.on("console", print_args)
await page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```python sync
def print_args(msg):
    for arg in msg.args:
        print(arg.json_value())

page.on("console", print_args)
page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```csharp
page.Console += async (_, msg) =>
{
    foreach (var arg in msg.Args)
        Console.WriteLine(await arg.JsonValueAsync<object>());
};

await page.EvaluateAsync("console.log('hello', 5, { foo: 'bar' })");
```

## event: Page.crash
* since: v1.8
- argument: <[Page]>

Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page crashes,
ongoing and subsequent operations will throw.

The most common way to deal with crashes is to catch an exception:

```js
try {
  // Crash might happen during a click.
  await page.click('button');
  // Or while waiting for an event.
  await page.waitForEvent('popup');
} catch (e) {
  // When the page crashes, exception message contains 'crash'.
}
```

```java
try {
  // Crash might happen during a click.
  page.click("button");
  // Or while waiting for an event.
  page.waitForPopup(() -> {});
} catch (PlaywrightException e) {
  // When the page crashes, exception message contains "crash".
}
```

```python async
try:
    # crash might happen during a click.
    await page.click("button")
    # or while waiting for an event.
    await page.wait_for_event("popup")
except Error as e:
    pass
    # when the page crashes, exception message contains "crash".
```

```python sync
try:
    # crash might happen during a click.
    page.click("button")
    # or while waiting for an event.
    page.wait_for_event("popup")
except Error as e:
    pass
    # when the page crashes, exception message contains "crash".
```

```csharp
try {
  // Crash might happen during a click.
  await page.ClickAsync("button");
  // Or while waiting for an event.
  await page.WaitForPopup();
} catch (PlaywrightException e) {
  // When the page crashes, exception message contains "crash".
}
```

## event: Page.dialog
* since: v1.8
- argument: <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog, and actions like click will never finish.

**Usage**

```js
page.on('dialog', dialog => dialog.accept());
```

```java
page.onDialog(dialog -> {
  dialog.accept();
});
```

```python
page.on("dialog", lambda dialog: dialog.accept())
```

```csharp
page.RequestFailed += (_, request) =>
{
    Console.WriteLine(request.Url + " " + request.Failure);
};
```

:::note
When no [`event: Page.dialog`] or [`event: BrowserContext.dialog`] listeners are present, all dialogs are automatically dismissed.
:::

## event: Page.DOMContentLoaded
* since: v1.9
- argument: <[Page]>

Emitted when the JavaScript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
event is dispatched.

## event: Page.download
* since: v1.8
- argument: <[Download]>

Emitted when attachment download started. User can access basic file operations on downloaded content via the passed
[Download] instance.

## event: Page.fileChooser
* since: v1.9
- argument: <[FileChooser]>

Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can
respond to it via setting the input files using [`method: FileChooser.setFiles`] that can be uploaded after that.

```js
page.on('filechooser', async fileChooser => {
  await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
});
```

```java
page.onFileChooser(fileChooser -> {
  fileChooser.setFiles(Paths.get("/tmp/myfile.pdf"));
});
```

```py
page.on("filechooser", lambda file_chooser: file_chooser.set_files("/tmp/myfile.pdf"))
```

```csharp
page.FileChooser += (_, fileChooser) =>
{
    fileChooser.SetFilesAsync(@"C:\temp\myfile.pdf");
};
```

## event: Page.frameAttached
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is attached.

## event: Page.frameDetached
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is detached.

## event: Page.frameNavigated
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is navigated to a new url.

## event: Page.load
* since: v1.8
- argument: <[Page]>

Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.

## event: Page.pageError
* since: v1.9
- argument: <[Error]>

Emitted when an uncaught exception happens within the page.

```js
// Log all uncaught errors to the terminal
page.on('pageerror', exception => {
  console.log(`Uncaught exception: "${exception}"`);
});

// Navigate to a page with an exception.
await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

```java
// Log all uncaught errors to the terminal
page.onPageError(exception -> {
  System.out.println("Uncaught exception: " + exception);
});

// Navigate to a page with an exception.
page.navigate("data:text/html,<script>throw new Error('Test')</script>");
```

```python async
# Log all uncaught errors to the terminal
page.on("pageerror", lambda exc: print(f"uncaught exception: {exc}"))

# Navigate to a page with an exception.
await page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```python sync
# Log all uncaught errors to the terminal
page.on("pageerror", lambda exc: print(f"uncaught exception: {exc}"))

# Navigate to a page with an exception.
page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```csharp
// Log all uncaught errors to the terminal
page.PageError += (_, exception) =>
{
  Console.WriteLine("Uncaught exception: " + exception);
};
```

## event: Page.pageError
* since: v1.9
* langs: csharp, java
- argument: <[string]>

## event: Page.popup
* since: v1.8
- argument: <[Page]>

Emitted when the page opens a new tab or window. This event is emitted in addition to the
[`event: BrowserContext.page`], but only for popups relevant to this page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is
done and its response has started loading in the popup. If you would like to route/listen to this network request, use [`method: BrowserContext.route`] and [`event: BrowserContext.request`] respectively instead of similar methods on the [Page].

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
console.log(await popup.evaluate('location.href'));
```

```java
Page popup = page.waitForPopup(() -> {
  page.getByText("open the popup").click();
});
System.out.println(popup.evaluate("location.href"));
```

```python async
async with page.expect_event("popup") as page_info:
    await page.get_by_text("open the popup").click()
popup = await page_info.value
print(await popup.evaluate("location.href"))
```

```python sync
with page.expect_event("popup") as page_info:
    page.get_by_text("open the popup").click()
popup = page_info.value
print(popup.evaluate("location.href"))
```

```csharp
var popup = await page.RunAndWaitForPopupAsync(async () =>
{
    await page.GetByText("open the popup").ClickAsync();
});
Console.WriteLine(await popup.EvaluateAsync<string>("location.href"));
```

:::note
Use [`method: Page.waitForLoadState`] to wait until the page gets to a particular state (you should not need it in most
cases).
:::

## event: Page.request
* since: v1.8
- argument: <[Request]>

Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests, see
[`method: Page.route`] or [`method: BrowserContext.route`].

## event: Page.requestFailed
* since: v1.9
- argument: <[Request]>

Emitted when a request fails, for example by timing out.

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

```java
page.onRequestFailed(request -> {
  System.out.println(request.url() + " " + request.failure());
});
```

```python
page.on("requestfailed", lambda request: print(request.url + " " + request.failure.error_text))
```

:::note
HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete
with [`event: Page.requestFinished`] event and not with [`event: Page.requestFailed`]. A request will only be considered
failed when the client cannot get an HTTP response from the server, e.g. due to network error net::ERR_FAILED.
:::

## event: Page.requestFinished
* since: v1.9
- argument: <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the
sequence of events is `request`, `response` and `requestfinished`.

## event: Page.response
* since: v1.8
- argument: <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events
is `request`, `response` and `requestfinished`.

## event: Page.webSocket
* since: v1.9
- argument: <[WebSocket]>

Emitted when [WebSocket] request is sent.

## event: Page.worker
* since: v1.8
- argument: <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the
page.

## async method: Page.addInitScript
* since: v1.8

Adds a script which would be evaluated in one of the following scenarios:
* Whenever the page is navigated.
* Whenever the child frame is attached or navigated. In this case, the script is evaluated in the context of the newly
  attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend
the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:

```js browser
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same directory
await page.addInitScript({ path: './preload.js' });
```

```js
await page.addInitScript(mock => {
  window.mock = mock;
}, mock);
```

```java
// In your playwright script, assuming the preload.js file is in same directory
page.addInitScript(Paths.get("./preload.js"));
```

```python async
# in your playwright script, assuming the preload.js file is in same directory
await page.add_init_script(path="./preload.js")
```

```python sync
# in your playwright script, assuming the preload.js file is in same directory
page.add_init_script(path="./preload.js")
```

```csharp
await Page.AddInitScriptAsync(scriptPath: "./preload.js");
```

:::note
The order of evaluation of multiple scripts installed via [`method: BrowserContext.addInitScript`] and
[`method: Page.addInitScript`] is not defined.
:::

### param: Page.addInitScript.script
* since: v1.8
* langs: js
- `script` <[function]|[string]|[Object]>
  - `path` ?<[path]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the
    current working directory. Optional.
  - `content` ?<[string]> Raw script content. Optional.

Script to be evaluated in the page.

### param: Page.addInitScript.script
* since: v1.8
* langs: csharp, java
- `script` <[string]|[path]>

Script to be evaluated in all pages in the browser context.

### param: Page.addInitScript.arg
* since: v1.8
* langs: js
- `arg` ?<[Serializable]>

Optional argument to pass to [`param: script`] (only supported when passing a function).

### param: Page.addInitScript.path
* since: v1.8
* langs: python
- `path` ?<[path]>

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.

### param: Page.addInitScript.script
* since: v1.8
* langs: python
- `script` ?<[string]>

Script to be evaluated in all pages in the browser context. Optional.

## async method: Page.addScriptTag
* since: v1.8
- returns: <[ElementHandle]>

Adds a `<script>` tag into the page with the desired url or content. Returns the added tag when the script's onload
fires or when the script content was injected into frame.

### option: Page.addScriptTag.url
* since: v1.8
- `url` <[string]>

URL of a script to be added.

### option: Page.addScriptTag.path
* since: v1.8
- `path` <[path]>

Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Page.addScriptTag.content
* since: v1.8
- `content` <[string]>

Raw JavaScript content to be injected into frame.

### option: Page.addScriptTag.type
* since: v1.8
- `type` <[string]>

Script type. Use 'module' in order to load a JavaScript ES6 module. See
[script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.

## async method: Page.addStyleTag
* since: v1.8
- returns: <[ElementHandle]>

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the
content. Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

### option: Page.addStyleTag.url
* since: v1.8
- `url` <[string]>

URL of the `<link>` tag.

### option: Page.addStyleTag.path
* since: v1.8
- `path` <[path]>

Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Page.addStyleTag.content
* since: v1.8
- `content` <[string]>

Raw CSS content to be injected into frame.

## async method: Page.agent
* since: v1.58
* langs: js
- returns: <[PageAgent]>

Initialize page agent with the llm provider and cache.

### option: Page.agent.cache
* since: v1.58
- `cache` <[Object]>
  - `cacheFile` ?<[string]> Cache file to use/generate code for performed actions into. Cache is not used if not specified (default).
  - `cacheOutFile` ?<[string]> When specified, generated entries are written into the `cacheOutFile` instead of updating the `cacheFile`.

### option: Page.agent.expect
* since: v1.58
- `expect` <[Object]>
  - `timeout` ?<[int]> Default timeout for expect calls in milliseconds, defaults to 5000ms.

### option: Page.agent.limits
* since: v1.58
- `limits` <[Object]>
  - `maxTokens` ?<[int]> Maximum number of tokens to consume. The agentic loop will stop after input + output tokens exceed this value. Defaults to unlimited.
  - `maxActions` ?<[int]> Maximum number of agentic actions to generate, defaults to 10.
  - `maxActionRetries` ?<[int]> Maximum number retries per action, defaults to 3.

Limits to use for the agentic loop.

### option: Page.agent.provider
* since: v1.58
- `provider` <[Object]>
  - `api` <[PageAgentAPI]<"openai"|"openai-compatible"|"anthropic"|"google">> API to use.
  - `apiEndpoint` ?<[string]> Endpoint to use if different from default.
  - `apiKey` <[string]> API key for the LLM provider.
  - `apiTimeout` ?<[int]> Amount of time to wait for the provider to respond to each request.
  - `model` <[string]> Model identifier within the provider. Required in non-cache mode.

### option: Page.agent.secrets
* since: v1.58
- `secrets` ?<[Object]<[string], [string]>>

Secrets to hide from the LLM.

### option: Page.agent.systemPrompt
* since: v1.58
- `systemPrompt` <[string]>

System prompt for the agent's loop.

## async method: Page.bringToFront
* since: v1.8

Brings page to front (activates tab).

## async method: Page.check
* since: v1.8
* discouraged: Use locator-based [`method: Locator.check`] instead. Read more about [locators](../locators.md).

This method checks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.check.selector = %%-input-selector-%%
* since: v1.8

### option: Page.check.force = %%-input-force-%%
* since: v1.8

### option: Page.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.check.position = %%-input-position-%%
* since: v1.11

### option: Page.check.strict = %%-input-strict-%%
* since: v1.14

### option: Page.check.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.check.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.check.trial = %%-input-trial-%%
* since: v1.11

## async method: Page.click
* since: v1.8
* discouraged: Use locator-based [`method: Locator.click`] instead. Read more about [locators](../locators.md).

This method clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.click.selector = %%-input-selector-%%
* since: v1.8

### option: Page.click.button = %%-input-button-%%
* since: v1.8

### option: Page.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: Page.click.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Page.click.force = %%-input-force-%%
* since: v1.8

### option: Page.click.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Page.click.position = %%-input-position-%%
* since: v1.8

### option: Page.click.strict = %%-input-strict-%%
* since: v1.14

### option: Page.click.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.click.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.click.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.close
* since: v1.8

If [`option: runBeforeUnload`] is `false`, does not run any unload handlers and waits for the page to be closed. If
[`option: runBeforeUnload`] is `true` the method will run unload handlers, but will **not** wait for the page to close.

By default, `page.close()` **does not** run `beforeunload` handlers.

:::note
if [`option: runBeforeUnload`] is passed as true, a `beforeunload` dialog might be summoned and should be handled
manually via [`event: Page.dialog`] event.
:::

### option: Page.close.reason
* since: v1.40
- `reason` <[string]>

The reason to be reported to the operations interrupted by the page closure.

### option: Page.close.runBeforeUnload
* since: v1.8
- `runBeforeUnload` <[boolean]>

Defaults to `false`. Whether to run the
[before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) page handlers.

## async method: Page.content
* since: v1.8
- returns: <[string]>

Gets the full HTML contents of the page, including the doctype.

## method: Page.context
* since: v1.8
- returns: <[BrowserContext]>

Get the browser context that the page belongs to.

## property: Page.coverage
* since: v1.8
* langs: js
- type: <[Coverage]>

:::note
Only available for Chromium atm.
:::

Browser-specific Coverage implementation. See [Coverage](./class-coverage) for more details.

## async method: Page.dblclick
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dblclick`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-csharp: DblClickAsync

This method double clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`page.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### param: Page.dblclick.selector = %%-input-selector-%%
* since: v1.8

### option: Page.dblclick.button = %%-input-button-%%
* since: v1.8

### option: Page.dblclick.force = %%-input-force-%%
* since: v1.8

### option: Page.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Page.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.dblclick.position = %%-input-position-%%
* since: v1.8

### option: Page.dblclick.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dblclick.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.dblclick.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.dispatchEvent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dispatchEvent`] instead. Read more about [locators](../locators.md).

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
[element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```js
await page.dispatchEvent('button#submit', 'click');
```

```java
page.dispatchEvent("button#submit", "click");
```

```python async
await page.dispatch_event("button#submit", "click")
```

```python sync
page.dispatch_event("button#submit", "click")
```

```csharp
await page.DispatchEventAsync("button#submit", "click");
```

Under the hood, it creates an instance of an event based on the given [`param: type`], initializes it with
[`param: eventInit`] properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by
default.

Since [`param: eventInit`] is event-specific, please refer to the events documentation for the lists of initial
properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```js
// Note you can only create DataTransfer in Chromium and Firefox
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await page.dispatchEvent('#source', 'dragstart', { dataTransfer });
```

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
page.dispatchEvent("#source", "dragstart", arg);
```

```python async
# note you can only create data_transfer in chromium and firefox
data_transfer = await page.evaluate_handle("new DataTransfer()")
await page.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```python sync
# note you can only create data_transfer in chromium and firefox
data_transfer = page.evaluate_handle("new DataTransfer()")
page.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await page.DispatchEventAsync("#source", "dragstart", new { dataTransfer });
```

### param: Page.dispatchEvent.selector = %%-input-selector-%%
* since: v1.8

### param: Page.dispatchEvent.type
* since: v1.8
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: Page.dispatchEvent.eventInit
* since: v1.8
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

### option: Page.dispatchEvent.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dispatchEvent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.dispatchEvent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.dragAndDrop
* since: v1.13

This method drags the source element to the target element.
It will first move to the source element, perform a `mousedown`,
then move to the target element and perform a `mouseup`.

**Usage**

```js
await page.dragAndDrop('#source', '#target');
// or specify exact positions relative to the top-left corners of the elements:
await page.dragAndDrop('#source', '#target', {
  sourcePosition: { x: 34, y: 7 },
  targetPosition: { x: 10, y: 20 },
});
```

```java
page.dragAndDrop("#source", "#target");
// or specify exact positions relative to the top-left corners of the elements:
page.dragAndDrop("#source", "#target", new Page.DragAndDropOptions()
  .setSourcePosition(34, 7).setTargetPosition(10, 20));
```

```python async
await page.drag_and_drop("#source", "#target")
# or specify exact positions relative to the top-left corners of the elements:
await page.drag_and_drop(
  "#source",
  "#target",
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```python sync
page.drag_and_drop("#source", "#target")
# or specify exact positions relative to the top-left corners of the elements:
page.drag_and_drop(
  "#source",
  "#target",
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```csharp
await Page.DragAndDropAsync("#source", "#target");
// or specify exact positions relative to the top-left corners of the elements:
await Page.DragAndDropAsync("#source", "#target", new()
{
    SourcePosition = new() { X = 34, Y = 7 },
    TargetPosition = new() { X = 10, Y = 20 },
});
```

### param: Page.dragAndDrop.source = %%-input-source-%%
* since: v1.13

### param: Page.dragAndDrop.target = %%-input-target-%%
* since: v1.13

### option: Page.dragAndDrop.force = %%-input-force-%%
* since: v1.13

### option: Page.dragAndDrop.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.13

### option: Page.dragAndDrop.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dragAndDrop.timeout = %%-input-timeout-%%
* since: v1.13

### option: Page.dragAndDrop.timeout = %%-input-timeout-js-%%
* since: v1.13

### option: Page.dragAndDrop.trial = %%-input-trial-%%
* since: v1.13

### option: Page.dragAndDrop.sourcePosition = %%-input-source-position-%%
* since: v1.14

### option: Page.dragAndDrop.targetPosition = %%-input-target-position-%%
* since: v1.14

### option: Page.dragAndDrop.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Page.emulateMedia
* since: v1.8

This method changes the `CSS media type` through the `media` argument, and/or the `'prefers-colors-scheme'` media feature, using the `colorScheme` argument.

**Usage**

```js
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false

await page.emulateMedia({ media: 'print' });
await page.evaluate(() => matchMedia('screen').matches);
// → false
await page.evaluate(() => matchMedia('print').matches);
// → true

await page.emulateMedia({});
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false
```

```java
page.evaluate("() => matchMedia('screen').matches");
// → true
page.evaluate("() => matchMedia('print').matches");
// → false

page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.PRINT));
page.evaluate("() => matchMedia('screen').matches");
// → false
page.evaluate("() => matchMedia('print').matches");
// → true

page.emulateMedia(new Page.EmulateMediaOptions());
page.evaluate("() => matchMedia('screen').matches");
// → true
page.evaluate("() => matchMedia('print').matches");
// → false
```

```python async
await page.evaluate("matchMedia('screen').matches")
# → True
await page.evaluate("matchMedia('print').matches")
# → False

await page.emulate_media(media="print")
await page.evaluate("matchMedia('screen').matches")
# → False
await page.evaluate("matchMedia('print').matches")
# → True

await page.emulate_media()
await page.evaluate("matchMedia('screen').matches")
# → True
await page.evaluate("matchMedia('print').matches")
# → False
```

```python sync
page.evaluate("matchMedia('screen').matches")
# → True
page.evaluate("matchMedia('print').matches")
# → False

page.emulate_media(media="print")
page.evaluate("matchMedia('screen').matches")
# → False
page.evaluate("matchMedia('print').matches")
# → True

page.emulate_media()
page.evaluate("matchMedia('screen').matches")
# → True
page.evaluate("matchMedia('print').matches")
# → False
```

```csharp
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → true
await page.EvaluateAsync("() => matchMedia('print').matches");
// → false

await page.EmulateMediaAsync(new() { Media = Media.Print });
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → false
await page.EvaluateAsync("() => matchMedia('print').matches");
// → true

await page.EmulateMediaAsync(new() { Media = Media.Screen });
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → true
await page.EvaluateAsync("() => matchMedia('print').matches");
// → false
```

```js
await page.emulateMedia({ colorScheme: 'dark' });
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
// → false
```

```java
page.emulateMedia(new Page.EmulateMediaOptions().setColorScheme(ColorScheme.DARK));
page.evaluate("() => matchMedia('(prefers-color-scheme: dark)').matches");
// → true
page.evaluate("() => matchMedia('(prefers-color-scheme: light)').matches");
// → false
```

```python async
await page.emulate_media(color_scheme="dark")
await page.evaluate("matchMedia('(prefers-color-scheme: dark)').matches")
# → True
await page.evaluate("matchMedia('(prefers-color-scheme: light)').matches")
# → False
```

```python sync
page.emulate_media(color_scheme="dark")
page.evaluate("matchMedia('(prefers-color-scheme: dark)').matches")
# → True
page.evaluate("matchMedia('(prefers-color-scheme: light)').matches")
# → False
```

```csharp
await page.EmulateMediaAsync(new() { ColorScheme = ColorScheme.Dark });
await page.EvaluateAsync("matchMedia('(prefers-color-scheme: dark)').matches");
// → true
await page.EvaluateAsync("matchMedia('(prefers-color-scheme: light)').matches");
// → false
```

### option: Page.emulateMedia.media
* since: v1.9
* langs: js, java
- `media` <null|[Media]<"screen"|"print">>

Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`.
Passing `null` disables CSS media emulation.

### option: Page.emulateMedia.media
* since: v1.9
* langs: csharp, python
- `media` <[Media]<"screen"|"print"|"null">>

Changes the CSS media type of the page. The only allowed values are `'Screen'`, `'Print'` and `'Null'`.
Passing `'Null'` disables CSS media emulation.

### option: Page.emulateMedia.colorScheme
* since: v1.9
* langs: js, java
- `colorScheme` <null|[ColorScheme]<"light"|"dark"|"no-preference">>

Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. Passing
`null` disables color scheme emulation. `'no-preference'` is deprecated.

### option: Page.emulateMedia.colorScheme
* since: v1.9
* langs: csharp, python
- `colorScheme` <[ColorScheme]<"light"|"dark"|"no-preference"|"null">>

Emulates [prefers-colors-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature, supported values are `'light'` and `'dark'`. Passing
`'Null'` disables color scheme emulation. `'no-preference'` is deprecated.

### option: Page.emulateMedia.reducedMotion
* since: v1.12
* langs: js, java
- `reducedMotion` <null|[ReducedMotion]<"reduce"|"no-preference">>

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. Passing `null` disables reduced motion emulation.

### option: Page.emulateMedia.reducedMotion
* since: v1.12
* langs: csharp, python
- `reducedMotion` <[ReducedMotion]<"reduce"|"no-preference"|"null">>

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. Passing `null` disables reduced motion emulation.

### option: Page.emulateMedia.forcedColors
* since: v1.15
* langs: js, java
- `forcedColors` <null|[ForcedColors]<"active"|"none">>

Emulates `'forced-colors'` media feature, supported values are `'active'` and `'none'`. Passing `null` disables forced colors emulation.

### option: Page.emulateMedia.forcedColors
* since: v1.15
* langs: csharp, python
- `forcedColors` <[ForcedColors]<"active"|"none"|"null">>

### option: Page.emulateMedia.contrast
* since: v1.51
* langs: js, java
- `contrast` <null|[Contrast]<"no-preference"|"more">>

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. Passing `null` disables contrast emulation.

### option: Page.emulateMedia.contrast
* since: v1.51
* langs: csharp, python
- `contrast` <[Contrast]<"no-preference"|"more"|"null">>

## async method: Page.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass actionability
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`],
  other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

The method finds an element matching the specified selector within the page and passes it as a first argument to
[`param: expression`]. If no elements match the selector, the method throws an error. Returns the value of
[`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: Page.evalOnSelector`] would wait for the promise to resolve and
return its value.

**Usage**

```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
// In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
```

```java
String searchValue = (String) page.evalOnSelector("#search", "el => el.value");
String preloadHref = (String) page.evalOnSelector("link[rel=preload]", "el => el.href");
String html = (String) page.evalOnSelector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

```python async
search_value = await page.eval_on_selector("#search", "el => el.value")
preload_href = await page.eval_on_selector("link[rel=preload]", "el => el.href")
html = await page.eval_on_selector(".main-container", "(e, suffix) => e.outer_html + suffix", "hello")
```

```python sync
search_value = page.eval_on_selector("#search", "el => el.value")
preload_href = page.eval_on_selector("link[rel=preload]", "el => el.href")
html = page.eval_on_selector(".main-container", "(e, suffix) => e.outer_html + suffix", "hello")
```

```csharp
var searchValue = await page.EvalOnSelectorAsync<string>("#search", "el => el.value");
var preloadHref = await page.EvalOnSelectorAsync<string>("link[rel=preload]", "el => el.href");
var html = await page.EvalOnSelectorAsync(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

### param: Page.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: Page.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Page.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: Page.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.evalOnSelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Page.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

The method finds all elements matching the specified selector within the page and passes an array of matched elements as
a first argument to [`param: expression`]. Returns the result of [`param: expression`] invocation.

If [`param: expression`] returns a [Promise], then [`method: Page.evalOnSelectorAll`] would wait for the promise to resolve and
return its value.

**Usage**

```js
const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
```

```java
boolean divCounts = (boolean) page.evalOnSelectorAll("div", "(divs, min) => divs.length >= min", 10);
```

```python async
div_counts = await page.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```python sync
div_counts = page.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```csharp
var divsCount = await page.EvalOnSelectorAllAsync<bool>("div", "(divs, min) => divs.length >= min", 10);
```

### param: Page.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: Page.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Page.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: Page.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Page.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the value of the [`param: expression`] invocation.

If the function passed to the [`method: Page.evaluate`] returns a [Promise], then [`method: Page.evaluate`] would wait
for the promise to resolve and return its value.

If the function passed to the [`method: Page.evaluate`] returns a non-[Serializable] value, then
[`method: Page.evaluate`] resolves to `undefined`. Playwright also supports transferring some
additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

Passing argument to [`param: expression`]:

```js
const result = await page.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

```java
Object result = page.evaluate("([x, y]) => {\n" +
  "  return Promise.resolve(x * y);\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "56"
```

```python async
result = await page.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```python sync
result = page.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```csharp
var result = await page.EvaluateAsync<int>("([x, y]) => Promise.resolve(x * y)", new[] { 7, 8 });
Console.WriteLine(result);
```

A string can also be passed in instead of a function:

```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

```java
System.out.println(page.evaluate("1 + 2")); // prints "3"
```

```python async
print(await page.evaluate("1 + 2")) # prints "3"
x = 10
print(await page.evaluate(f"1 + {x}")) # prints "11"
```

```python sync
print(page.evaluate("1 + 2")) # prints "3"
x = 10
print(page.evaluate(f"1 + {x}")) # prints "11"
```

```csharp
Console.WriteLine(await page.EvaluateAsync<int>("1 + 2")); // prints "3"
```

[ElementHandle] instances can be passed as an argument to the [`method: Page.evaluate`]:

```js
const bodyHandle = await page.evaluate('document.body');
const html = await page.evaluate<string, HTMLElement>(([body, suffix]) =>
  body.innerHTML + suffix, [bodyHandle, 'hello']
);
await bodyHandle.dispose();
```

```java
ElementHandle bodyHandle = page.evaluate("document.body");
String html = (String) page.evaluate("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(bodyHandle, "hello"));
bodyHandle.dispose();
```

```python async
body_handle = await page.evaluate("document.body")
html = await page.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
await body_handle.dispose()
```

```python sync
body_handle = page.evaluate("document.body")
html = page.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
body_handle.dispose()
```

```csharp
var bodyHandle = await page.EvaluateAsync("document.body");
var html = await page.EvaluateAsync<string>("([body, suffix]) => body.innerHTML + suffix", new object [] { bodyHandle, "hello" });
await bodyHandle.DisposeAsync();
```

### param: Page.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Page.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the value of the [`param: expression`] invocation as a [JSHandle].

The only difference between [`method: Page.evaluate`] and [`method: Page.evaluateHandle`] is that [`method: Page.evaluateHandle`] returns [JSHandle].

If the function passed to the [`method: Page.evaluateHandle`] returns a [Promise], then [`method: Page.evaluateHandle`] would wait for the
promise to resolve and return its value.

**Usage**

```js
// Handle for the window object.
const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
```

```java
// Handle for the window object.
JSHandle aWindowHandle = page.evaluateHandle("() => Promise.resolve(window)");
```

```python async
a_window_handle = await page.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```python sync
a_window_handle = page.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```csharp
// Handle for the window object.
var aWindowHandle = await page.EvaluateHandleAsync("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function:

```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

```java
JSHandle aHandle = page.evaluateHandle("document"); // Handle for the "document".
```

```python async
a_handle = await page.evaluate_handle("document") # handle for the "document"
```

```python sync
a_handle = page.evaluate_handle("document") # handle for the "document"
```

```csharp
var docHandle = await page.EvaluateHandleAsync("document"); // Handle for the `document`
```

[JSHandle] instances can be passed as an argument to the [`method: Page.evaluateHandle`]:

```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

```java
JSHandle aHandle = page.evaluateHandle("() => document.body");
JSHandle resultHandle = page.evaluateHandle("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(aHandle, "hello"));
System.out.println(resultHandle.jsonValue());
resultHandle.dispose();
```

```python async
a_handle = await page.evaluate_handle("document.body")
result_handle = await page.evaluate_handle("body => body.innerHTML", a_handle)
print(await result_handle.json_value())
await result_handle.dispose()
```

```python sync
a_handle = page.evaluate_handle("document.body")
result_handle = page.evaluate_handle("body => body.innerHTML", a_handle)
print(result_handle.json_value())
result_handle.dispose()
```

```csharp
var handle = await page.EvaluateHandleAsync("() => document.body");
var resultHandle = await page.EvaluateHandleAsync("([body, suffix]) => body.innerHTML + suffix", new object[] { handle, "hello" });
Console.WriteLine(await resultHandle.JsonValueAsync<string>());
await resultHandle.DisposeAsync();
```

### param: Page.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Page.exposeBinding
* since: v1.8

The method adds a function called [`param: name`] on the `window` object of every frame in this page. When called, the
function executes [`param: callback`] and returns a [Promise] which resolves to the return value of [`param: callback`].
If the [`param: callback`] returns a [Promise], it will be awaited.

The first argument of the [`param: callback`] function contains information about the caller: `{ browserContext:
BrowserContext, page: Page, frame: Frame }`.

See [`method: BrowserContext.exposeBinding`] for the context-wide version.

:::note
Functions installed via [`method: Page.exposeBinding`] survive navigations.
:::

**Usage**

An example of exposing page URL to all frames in a page:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.exposeBinding('pageURL', ({ page }) => page.url());
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.click('button');
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      page.exposeBinding("pageURL", (source, args) -> source.page().url());
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");
      page.click("button");
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    page = await context.new_page()
    await page.expose_binding("pageURL", lambda source: source["page"].url)
    await page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    await page.click("button")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.expose_binding("pageURL", lambda source: source["page"].url)
    page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    page.click("button")

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync(new()
        {
            Headless = false,
        });
        var page = await browser.NewPageAsync();

        await page.ExposeBindingAsync("pageUrl", (source) => source.Page.Url);
        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.ClickAsync("button");
    }
}
```

### param: Page.exposeBinding.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: Page.exposeBinding.callback
* since: v1.8
- `callback` <[function]>

Callback function that will be called in the Playwright's context.

### option: Page.exposeBinding.handle
* since: v1.8
* deprecated: This option will be removed in the future.
- `handle` <[boolean]>

Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is
supported. When passing by value, multiple arguments are supported.

## async method: Page.exposeFunction
* since: v1.8

The method adds a function called [`param: name`] on the `window` object of every frame in the page. When called, the
function executes [`param: callback`] and returns a [Promise] which resolves to the return value of [`param: callback`].

If the [`param: callback`] returns a [Promise], it will be awaited.

See [`method: BrowserContext.exposeFunction`] for context-wide exposed function.

:::note
Functions installed via [`method: Page.exposeFunction`] survive navigations.
:::

**Usage**

An example of adding a `sha256` function to the page:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const page = await browser.newPage();
  await page.exposeFunction('sha256', text =>
    crypto.createHash('sha256').update(text).digest('hex'),
  );
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.click('button');
})();
```

```java
import com.microsoft.playwright.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      Page page = browser.newPage();
      page.exposeFunction("sha256", args -> {
        try {
          String text = (String) args[0];
          MessageDigest crypto = MessageDigest.getInstance("SHA-256");
          byte[] token = crypto.digest(text.getBytes(StandardCharsets.UTF_8));
          return Base64.getEncoder().encodeToString(token);
        } catch (NoSuchAlgorithmException e) {
          return null;
        }
      });
      page.setContent(
        "<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>"
      );
      page.click("button");
    }
  }
}
```

```python async
import asyncio
import hashlib
from playwright.async_api import async_playwright, Playwright

def sha256(text):
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    page = await browser.new_page()
    await page.expose_function("sha256", sha256)
    await page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    await page.click("button")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
import hashlib
from playwright.sync_api import sync_playwright, Playwright

def sha256(text):
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()


def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    page = browser.new_page()
    page.expose_function("sha256", sha256)
    page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    page.click("button")

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync(new()
        {
            Headless = false
        });
        var page = await browser.NewPageAsync();

        await page.ExposeFunctionAsync("sha256", (string input) =>
        {
            return Convert.ToBase64String(
                SHA256.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(input)));
        });

        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.ClickAsync("button");
        Console.WriteLine(await page.TextContentAsync("div"));
    }
}
```

### param: Page.exposeFunction.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object

### param: Page.exposeFunction.callback
* since: v1.8
- `callback` <[function]>

Callback function which will be called in Playwright's context.

## async method: Page.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about [locators](../locators.md).

This method waits for an element matching [`param: selector`], waits for [actionability](../actionability.md) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Page.fill.selector = %%-input-selector-%%
* since: v1.8

### param: Page.fill.value
* since: v1.8
- `value` <[string]>

Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.

### option: Page.fill.force = %%-input-force-%%
* since: v1.13

### option: Page.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.fill.strict = %%-input-strict-%%
* since: v1.14

### option: Page.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about [locators](../locators.md).

This method fetches an element with [`param: selector`] and focuses it. If there's no element matching
[`param: selector`], the method waits until a matching element appears in the DOM.

### param: Page.focus.selector = %%-input-selector-%%
* since: v1.8

### option: Page.focus.strict = %%-input-strict-%%
* since: v1.14

### option: Page.focus.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.focus.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Page.frame
* since: v1.8
- returns: <[null]|[Frame]>

Returns frame matching the specified criteria. Either `name` or `url` must be specified.

**Usage**

```js
const frame = page.frame('frame-name');
```

```java
Frame frame = page.frame("frame-name");
```

```py
frame = page.frame(name="frame-name")
```

```csharp
var frame = page.Frame("frame-name");
```

```js
const frame = page.frame({ url: /.*domain.*/ });
```

```java
Frame frame = page.frameByUrl(Pattern.compile(".*domain.*"));
```

```py
frame = page.frame(url=r".*domain.*")
```

```csharp
var frame = page.FrameByUrl(".*domain.*");
```

### param: Page.frame.frameSelector
* since: v1.8
* langs: js
- `frameSelector` <[string]|[Object]>
  - `name` ?<[string]> Frame name specified in the `iframe`'s `name` attribute. Optional.
  - `url` ?<[string]|[RegExp]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern or predicate receiving
    frame's `url` as a [URL] object. Optional.

Frame name or other frame lookup options.

### param: Page.frame.name
* since: v1.9
* langs: csharp, java
- `name` <[string]>

Frame name specified in the `iframe`'s `name` attribute.

### option: Page.frame.name
* since: v1.8
* langs: python
- `name` ?<[string]>

Frame name specified in the `iframe`'s `name` attribute. Optional.

### option: Page.frame.url
* since: v1.8
* langs: python
- `url` ?<[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object. Optional.

## method: Page.frameByUrl
* since: v1.9
* langs: csharp, java
- returns: <[null]|[Frame]>

Returns frame with matching URL.

### param: Page.frameByUrl.url
* since: v1.9
* langs: csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object.

## method: Page.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements
in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`,
like `<iframe id="my-frame">`:

```js
const locator = page.frameLocator('#my-iframe').getByText('Submit');
await locator.click();
```

```java
Locator locator = page.frameLocator("#my-iframe").getByText("Submit");
locator.click();
```

```python async
locator = page.frame_locator("#my-iframe").get_by_text("Submit")
await locator.click()
```

```python sync
locator = page.frame_locator("#my-iframe").get_by_text("Submit")
locator.click()
```

```csharp
var locator = page.FrameLocator("#my-iframe").GetByText("Submit");
await locator.ClickAsync();
```

### param: Page.frameLocator.selector = %%-find-selector-%%
* since: v1.17

## method: Page.frames
* since: v1.8
- returns: <[Array]<[Frame]>>

An array of all frames attached to the page.

## async method: Page.getAttribute
* since: v1.8
* discouraged: Use locator-based [`method: Locator.getAttribute`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns element attribute value.

### param: Page.getAttribute.selector = %%-input-selector-%%
* since: v1.8

### param: Page.getAttribute.name
* since: v1.8
- `name` <[string]>

Attribute name to get the value for.

### option: Page.getAttribute.strict = %%-input-strict-%%
* since: v1.14

### option: Page.getAttribute.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.getAttribute.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Page.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

### param: Page.getByAltText.text = %%-locator-get-by-text-text-%%

### option: Page.getByAltText.exact = %%-locator-get-by-text-exact-%%

## method: Page.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

### param: Page.getByLabel.text = %%-locator-get-by-text-text-%%

### option: Page.getByLabel.exact = %%-locator-get-by-text-exact-%%

## method: Page.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

### param: Page.getByPlaceholder.text = %%-locator-get-by-text-text-%%

### option: Page.getByPlaceholder.exact = %%-locator-get-by-text-exact-%%

## method: Page.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: Page.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: Page.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

### option: Page.getByRole.exact = %%-locator-get-by-role-option-exact-%%

## method: Page.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: Page.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: Page.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

### param: Page.getByText.text = %%-locator-get-by-text-text-%%

### option: Page.getByText.exact = %%-locator-get-by-text-exact-%%

## method: Page.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

### param: Page.getByTitle.text = %%-locator-get-by-text-text-%%

### option: Page.getByTitle.exact = %%-locator-get-by-text-exact-%%

## async method: Page.goBack
* since: v1.8
- returns: <[null]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect. If cannot go back, returns `null`.

Navigate to the previous page in history.

### option: Page.goBack.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.goBack.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.goBack.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Page.goForward
* since: v1.8
- returns: <[null]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect. If cannot go forward, returns `null`.

Navigate to the next page in history.

## async method: Page.requestGC
* since: v1.48

Request the page to perform garbage collection. Note that there is no guarantee that all unreachable objects will be collected.

This is useful to help detect memory leaks. For example, if your page has a large object `'suspect'` that might be leaked, you can check that it does not leak by using a [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef).

```js
// 1. In your page, save a WeakRef for the "suspect".
await page.evaluate(() => globalThis.suspectWeakRef = new WeakRef(suspect));
// 2. Request garbage collection.
await page.requestGC();
// 3. Check that weak ref does not deref to the original object.
expect(await page.evaluate(() => !globalThis.suspectWeakRef.deref())).toBe(true);
```

```java
// 1. In your page, save a WeakRef for the "suspect".
page.evaluate("globalThis.suspectWeakRef = new WeakRef(suspect)");
// 2. Request garbage collection.
page.requestGC();
// 3. Check that weak ref does not deref to the original object.
assertTrue(page.evaluate("!globalThis.suspectWeakRef.deref()"));
```

```python async
# 1. In your page, save a WeakRef for the "suspect".
await page.evaluate("globalThis.suspectWeakRef = new WeakRef(suspect)")
# 2. Request garbage collection.
await page.request_gc()
# 3. Check that weak ref does not deref to the original object.
assert await page.evaluate("!globalThis.suspectWeakRef.deref()")
```

```python sync
# 1. In your page, save a WeakRef for the "suspect".
page.evaluate("globalThis.suspectWeakRef = new WeakRef(suspect)")
# 2. Request garbage collection.
page.request_gc()
# 3. Check that weak ref does not deref to the original object.
assert page.evaluate("!globalThis.suspectWeakRef.deref()")
```

```csharp
// 1. In your page, save a WeakRef for the "suspect".
await Page.EvaluateAsync("globalThis.suspectWeakRef = new WeakRef(suspect)");
// 2. Request garbage collection.
await Page.RequestGCAsync();
// 3. Check that weak ref does not deref to the original object.
Assert.True(await Page.EvaluateAsync("!globalThis.suspectWeakRef.deref()"));
```

### option: Page.goForward.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.goForward.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.goForward.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Page.goto
* since: v1.8
* langs:
  - alias-java: navigate
- returns: <[null]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the first
non-redirect response.

The method will throw an error if:
* there's an SSL error (e.g. in case of self-signed certificates).
* target URL is invalid.
* the [`option: timeout`] is exceeded during navigation.
* the remote server does not respond or is unreachable.
* the main resource failed to load.

The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not
Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling
[`method: Response.status`].

:::note
The method either throws an error or returns a main resource response. The only exceptions are navigation to
`about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
:::

:::note
Headless mode doesn't support navigation to a PDF document. See the
[upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
:::

### param: Page.goto.url
* since: v1.8
- `url` <[string]>

URL to navigate page to. The url should include scheme, e.g. `https://`.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### option: Page.goto.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.goto.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.goto.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Page.goto.referer
* since: v1.8
- `referer` <[string]>

Referer header value. If provided it will take preference over the referer header value set by
[`method: Page.setExtraHTTPHeaders`].

## async method: Page.hover
* since: v1.8
* discouraged: Use locator-based [`method: Locator.hover`] instead. Read more about [locators](../locators.md).

This method hovers over an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.hover.selector = %%-input-selector-%%
* since: v1.8

### option: Page.hover.force = %%-input-force-%%
* since: v1.8

### option: Page.hover.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.hover.position = %%-input-position-%%
* since: v1.8

### option: Page.hover.strict = %%-input-strict-%%
* since: v1.14

### option: Page.hover.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.hover.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.hover.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

### option: Page.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: Page.innerHTML
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerHTML`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `element.innerHTML`.

### param: Page.innerHTML.selector = %%-input-selector-%%
* since: v1.8

### option: Page.innerHTML.strict = %%-input-strict-%%
* since: v1.14

### option: Page.innerHTML.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.innerHTML.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.innerText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerText`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `element.innerText`.

### param: Page.innerText.selector = %%-input-selector-%%
* since: v1.8

### option: Page.innerText.strict = %%-input-strict-%%
* since: v1.14

### option: Page.innerText.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.innerText.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.inputValue
* since: v1.13
* discouraged: Use locator-based [`method: Locator.inputValue`] instead. Read more about [locators](../locators.md).
- returns: <[string]>

Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

### param: Page.inputValue.selector = %%-input-selector-%%
* since: v1.13

### option: Page.inputValue.strict = %%-input-strict-%%
* since: v1.14

### option: Page.inputValue.timeout = %%-input-timeout-%%
* since: v1.13

### option: Page.inputValue.timeout = %%-input-timeout-js-%%
* since: v1.13

## async method: Page.isChecked
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isChecked`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

### param: Page.isChecked.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isChecked.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isChecked.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.isChecked.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Page.isClosed
* since: v1.8
- returns: <[boolean]>

Indicates that the page has been closed.

## async method: Page.isDisabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isDisabled`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of [enabled](../actionability.md#enabled).

### param: Page.isDisabled.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isDisabled.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isDisabled.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.isDisabled.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.isEditable
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEditable`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [editable](../actionability.md#editable).

### param: Page.isEditable.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isEditable.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isEditable.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.isEditable.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.isEnabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEnabled`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [enabled](../actionability.md#enabled).

### param: Page.isEnabled.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isEnabled.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isEnabled.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.isEnabled.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.isHidden
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isHidden`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of [visible](../actionability.md#visible).  [`param: selector`] that does not match any elements is considered hidden.

### param: Page.isHidden.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isHidden.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isHidden.timeout
* since: v1.8
* deprecated: This option is ignored. [`method: Page.isHidden`] does not wait for the
  element to become hidden and returns immediately.
- `timeout` <[float]>

## async method: Page.isVisible
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isVisible`] instead. Read more about [locators](../locators.md).
- returns: <[boolean]>

Returns whether the element is [visible](../actionability.md#visible). [`param: selector`] that does not match any elements is considered not visible.

### param: Page.isVisible.selector = %%-input-selector-%%
* since: v1.8

### option: Page.isVisible.strict = %%-input-strict-%%
* since: v1.14

### option: Page.isVisible.timeout
* since: v1.8
* deprecated: This option is ignored. [`method: Page.isVisible`] does not wait
  for the element to become visible and returns immediately.
- `timeout` <[float]>

## property: Page.keyboard
* since: v1.8
- type: <[Keyboard]>


## async method: Page.consoleMessages
* since: v1.56
- returns: <[Array]<[ConsoleMessage]>>

Returns up to (currently) 200 last console messages from this page. See [`event: Page.console`] for more details.


## async method: Page.pageErrors
* since: v1.56
* langs: js, python
- returns: <[Array]<[Error]>>

Returns up to (currently) 200 last page errors from this page. See [`event: Page.pageError`] for more details.

## async method: Page.pageErrors
* since: v1.56
* langs: csharp, java
- returns: <[Array]<[string]>>

Returns up to (currently) 200 last page errors from this page. See [`event: Page.pageError`] for more details.


## method: Page.locator
* since: v1.14
- returns: <[Locator]>

%%-template-locator-root-locator-%%

### param: Page.locator.selector = %%-find-selector-%%
* since: v1.14

### option: Page.locator.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.14

### option: Page.locator.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Page.locator.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

## method: Page.mainFrame
* since: v1.8
- returns: <[Frame]>

The page's main frame. Page is guaranteed to have a main frame which persists during navigations.

## property: Page.mouse
* since: v1.8
- type: <[Mouse]>

## method: Page.onceDialog
* since: v1.10
* langs: java

Adds one-off [Dialog] handler. The handler will be removed immediately after next [Dialog] is created.
```java
page.onceDialog(dialog -> {
  dialog.accept("foo");
});

// prints 'foo'
System.out.println(page.evaluate("prompt('Enter string:')"));

// prints 'null' as the dialog will be auto-dismissed because there are no handlers.
System.out.println(page.evaluate("prompt('Enter string:')"));
```

This code above is equivalent to:
```java
Consumer<Dialog> handler = new Consumer<Dialog>() {
  @Override
  public void accept(Dialog dialog) {
    dialog.accept("foo");
    page.offDialog(this);
  }
};
page.onDialog(handler);

// prints 'foo'
System.out.println(page.evaluate("prompt('Enter string:')"));

// prints 'null' as the dialog will be auto-dismissed because there are no handlers.
System.out.println(page.evaluate("prompt('Enter string:')"));
```

### param: Page.onceDialog.handler
* since: v1.10
- `handler` <[function]\([Dialog]\)>

Receives the [Dialog] object, it **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise
the page will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the dialog,
and actions like click will never finish.


## async method: Page.opener
* since: v1.8
- returns: <[null]|[Page]>

Returns the opener for popup pages and `null` for others. If the opener has been closed already the returns `null`.

## async method: Page.pause
* since: v1.9

Pauses script execution. Playwright will stop executing the script and wait for the user to either press the 'Resume'
button in the page overlay or to call `playwright.resume()` in the DevTools console.

User can inspect selectors or perform manual steps while paused. Resume will continue running the original script from
the place it was paused.

:::note
This method requires Playwright to be started in a headed mode, with a falsy [`option: BrowserType.launch.headless`] option.
:::

## async method: Page.pdf
* since: v1.8
- returns: <[Buffer]>

Returns the PDF buffer.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call
[`method: Page.emulateMedia`] before calling `page.pdf()`:

:::note
By default, `page.pdf()` generates a pdf with modified colors for printing. Use the
[`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to
force rendering of exact colors.
:::

**Usage**

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia({ media: 'screen' });
await page.pdf({ path: 'page.pdf' });
```

```java
// Generates a PDF with "screen" media type.
page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.SCREEN));
page.pdf(new Page.PdfOptions().setPath(Paths.get("page.pdf")));
```

```python async
# generates a pdf with "screen" media type.
await page.emulate_media(media="screen")
await page.pdf(path="page.pdf")
```

```python sync
# generates a pdf with "screen" media type.
page.emulate_media(media="screen")
page.pdf(path="page.pdf")
```

```csharp
// Generates a PDF with 'screen' media type
await page.EmulateMediaAsync(new() { Media = Media.Screen });
await page.PdfAsync(new() { Path = "page.pdf" });
```

The [`option: width`], [`option: height`], and [`option: margin`] options accept values labeled with units. Unlabeled
values are treated as pixels.

A few examples:
* `page.pdf({width: 100})` - prints with width set to 100 pixels
* `page.pdf({width: '100px'})` - prints with width set to 100 pixels
* `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
* `px` - pixel
* `in` - inch
* `cm` - centimeter
* `mm` - millimeter

The [`option: format`] options are:
* `Letter`: 8.5in x 11in
* `Legal`: 8.5in x 14in
* `Tabloid`: 11in x 17in
* `Ledger`: 17in x 11in
* `A0`: 33.1in x 46.8in
* `A1`: 23.4in x 33.1in
* `A2`: 16.54in x 23.4in
* `A3`: 11.7in x 16.54in
* `A4`: 8.27in x 11.7in
* `A5`: 5.83in x 8.27in
* `A6`: 4.13in x 5.83in

:::note
[`option: headerTemplate`] and [`option: footerTemplate`] markup have the following limitations: > 1. Script tags inside
templates are not evaluated. > 2. Page styles are not visible inside templates.
:::

### option: Page.pdf.path
* since: v1.8
- `path` <[path]>

The file path to save the PDF to. If [`option: path`] is a relative path, then it is resolved relative to the current
working directory. If no path is provided, the PDF won't be saved to the disk.

### option: Page.pdf.scale
* since: v1.8
- `scale` <[float]>

Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.

### option: Page.pdf.displayHeaderFooter
* since: v1.8
- `displayHeaderFooter` <[boolean]>

Display header and footer. Defaults to `false`.

### option: Page.pdf.headerTemplate
* since: v1.8
- `headerTemplate` <[string]>

HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values
into them:
* `'date'` formatted print date
* `'title'` document title
* `'url'` document location
* `'pageNumber'` current page number
* `'totalPages'` total pages in the document

### option: Page.pdf.footerTemplate
* since: v1.8
- `footerTemplate` <[string]>

HTML template for the print footer. Should use the same format as the [`option: headerTemplate`].

### option: Page.pdf.printBackground
* since: v1.8
- `printBackground` <[boolean]>

Print background graphics. Defaults to `false`.

### option: Page.pdf.landscape
* since: v1.8
- `landscape` <[boolean]>

Paper orientation. Defaults to `false`.

### option: Page.pdf.pageRanges
* since: v1.8
- `pageRanges` <[string]>

Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.

### option: Page.pdf.format
* since: v1.8
- `format` <[string]>

Paper format. If set, takes priority over [`option: width`] or [`option: height`] options. Defaults to 'Letter'.

### option: Page.pdf.width
* since: v1.8
* langs: js, python
- `width` <[string]|[float]>

Paper width, accepts values labeled with units.

### option: Page.pdf.width
* since: v1.8
* langs: csharp, java
- `width` <[string]>

Paper width, accepts values labeled with units.

### option: Page.pdf.height
* since: v1.8
* langs: js, python
- `height` <[string]|[float]>

Paper height, accepts values labeled with units.

### option: Page.pdf.height
* since: v1.8
* langs: csharp, java
- `height` <[string]>

Paper height, accepts values labeled with units.

### option: Page.pdf.margin
* since: v1.8
* langs: js, python
- `margin` <[Object]>
  - `top` ?<[string]|[float]> Top margin, accepts values labeled with units. Defaults to `0`.
  - `right` ?<[string]|[float]> Right margin, accepts values labeled with units. Defaults to `0`.
  - `bottom` ?<[string]|[float]> Bottom margin, accepts values labeled with units. Defaults to `0`.
  - `left` ?<[string]|[float]> Left margin, accepts values labeled with units. Defaults to `0`.

Paper margins, defaults to none.

### option: Page.pdf.margin
* since: v1.8
* langs: csharp, java
- `margin` <[Object]>
  - `top` ?<[string]> Top margin, accepts values labeled with units. Defaults to `0`.
  - `right` ?<[string]> Right margin, accepts values labeled with units. Defaults to `0`.
  - `bottom` ?<[string]> Bottom margin, accepts values labeled with units. Defaults to `0`.
  - `left` ?<[string]> Left margin, accepts values labeled with units. Defaults to `0`.

Paper margins, defaults to none.

### option: Page.pdf.preferCSSPageSize
* since: v1.8
- `preferCSSPageSize` <[boolean]>

Give any CSS `@page` size declared in the page priority over what is declared in [`option: width`] and
[`option: height`] or [`option: format`] options. Defaults to `false`, which will scale the content to fit the paper
size.

### option: Page.pdf.tagged
* since: v1.42
- `tagged` <[boolean]>

Whether or not to generate tagged (accessible) PDF. Defaults to `false`.

### option: Page.pdf.outline
* since: v1.42
- `outline` <[boolean]>

Whether or not to embed the document outline into the PDF. Defaults to `false`.


## async method: Page.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about [locators](../locators.md).

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

[`param: key`] can specify the intended
[keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
[here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```js
const page = await browser.newPage();
await page.goto('https://keycode.info');
await page.press('body', 'A');
await page.screenshot({ path: 'A.png' });
await page.press('body', 'ArrowLeft');
await page.screenshot({ path: 'ArrowLeft.png' });
await page.press('body', 'Shift+O');
await page.screenshot({ path: 'O.png' });
await browser.close();
```

```java
Page page = browser.newPage();
page.navigate("https://keycode.info");
page.press("body", "A");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("A.png")));
page.press("body", "ArrowLeft");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("ArrowLeft.png" )));
page.press("body", "Shift+O");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("O.png" )));
```

```python async
page = await browser.new_page()
await page.goto("https://keycode.info")
await page.press("body", "A")
await page.screenshot(path="a.png")
await page.press("body", "ArrowLeft")
await page.screenshot(path="arrow_left.png")
await page.press("body", "Shift+O")
await page.screenshot(path="o.png")
await browser.close()
```

```python sync
page = browser.new_page()
page.goto("https://keycode.info")
page.press("body", "A")
page.screenshot(path="a.png")
page.press("body", "ArrowLeft")
page.screenshot(path="arrow_left.png")
page.press("body", "Shift+O")
page.screenshot(path="o.png")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.GotoAsync("https://keycode.info");
await page.PressAsync("body", "A");
await page.ScreenshotAsync(new() { Path = "A.png" });
await page.PressAsync("body", "ArrowLeft");
await page.ScreenshotAsync(new() { Path = "ArrowLeft.png" });
await page.PressAsync("body", "Shift+O");
await page.ScreenshotAsync(new() { Path = "O.png" });
```

### param: Page.press.selector = %%-input-selector-%%
* since: v1.8

### param: Page.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Page.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Page.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Page.press.strict = %%-input-strict-%%
* since: v1.14

### option: Page.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

The method finds an element matching the specified selector within the page. If no elements match the selector, the
return value resolves to `null`. To wait for an element on the page, use [`method: Locator.waitFor`].

### param: Page.querySelector.selector = %%-query-selector-%%
* since: v1.9

### option: Page.querySelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Page.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about [locators](../locators.md).
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

The method finds all elements matching the specified selector within the page. If no elements match the selector, the
return value resolves to `[]`.

### param: Page.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9


## async method: Page.requests
* since: v1.56
- returns: <[Array]<[Request]>>

Returns up to (currently) 100 last network request from this page. See [`event: Page.request`] for more details.

Returned requests should be accessed immediately, otherwise they might be collected to prevent unbounded memory growth as new requests come in. Once collected, retrieving most information about the request is impossible.

Note that requests reported through the [`event: Page.request`] request are not collected, so there is a trade off between efficient memory usage with [`method: Page.requests`] and the amount of available information reported through [`event: Page.request`].


## async method: Page.addLocatorHandler
* since: v1.42

When testing a web page, sometimes unexpected overlays like a "Sign up" dialog appear and block actions you want to automate, e.g. clicking a button. These overlays don't always show up in the same way or at the same time, making them tricky to handle in automated tests.

This method lets you set up a special function, called a handler, that activates when it detects that overlay is visible. The handler's job is to remove the overlay, allowing your test to continue as if the overlay wasn't there.

Things to keep in mind:
* When an overlay is shown predictably, we recommend explicitly waiting for it in your test and dismissing it as a part of your normal test flow, instead of using [`method: Page.addLocatorHandler`].
* Playwright checks for the overlay every time before executing or retrying an action that requires an [actionability check](../actionability.md), or before performing an auto-waiting assertion check. When overlay is visible, Playwright calls the handler first, and then proceeds with the action/assertion. Note that the handler is only called when you perform an action/assertion - if the overlay becomes visible but you don't perform any actions, the handler will not be triggered.
* After executing the handler, Playwright will ensure that overlay that triggered the handler is not visible anymore. You can opt-out of this behavior with [`option: noWaitAfter`].
* The execution time of the handler counts towards the timeout of the action/assertion that executed the handler. If your handler takes too long, it might cause timeouts.
* You can register multiple handlers. However, only a single handler will be running at a time. Make sure the actions within a handler don't depend on another handler.

:::warning
Running the handler will alter your page state mid-test. For example it will change the currently focused element and move the mouse. Make sure that actions that run after the handler are self-contained and do not rely on the focus and mouse state being unchanged.

For example, consider a test that calls [`method: Locator.focus`] followed by [`method: Keyboard.press`]. If your handler clicks a button between these two actions, the focused element most likely will be wrong, and key press will happen on the unexpected element. Use [`method: Locator.press`] instead to avoid this problem.

Another example is a series of mouse actions, where [`method: Mouse.move`] is followed by [`method: Mouse.down`]. Again, when the handler runs between these two actions, the mouse position will be wrong during the mouse down. Prefer self-contained actions like [`method: Locator.click`] that do not rely on the state being unchanged by a handler.
:::

**Usage**

An example that closes a "Sign up to the newsletter" dialog when it appears:

```js
// Setup the handler.
await page.addLocatorHandler(page.getByText('Sign up to the newsletter'), async () => {
  await page.getByRole('button', { name: 'No thanks' }).click();
});

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.getByText("Sign up to the newsletter"), () -> {
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("No thanks")).click();
});

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python sync
# Setup the handler.
def handler():
  page.get_by_role("button", name="No thanks").click()
page.add_locator_handler(page.get_by_text("Sign up to the newsletter"), handler)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python async
# Setup the handler.
async def handler():
  await page.get_by_role("button", name="No thanks").click()
await page.add_locator_handler(page.get_by_text("Sign up to the newsletter"), handler)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.GetByText("Sign up to the newsletter"), async () => {
  await page.GetByRole(AriaRole.Button, new() { Name = "No thanks" }).ClickAsync();
});

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

An example that skips the "Confirm your security details" page when it is shown:

```js
// Setup the handler.
await page.addLocatorHandler(page.getByText('Confirm your security details'), async () => {
  await page.getByRole('button', { name: 'Remind me later' }).click();
});

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.getByText("Confirm your security details"), () -> {
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Remind me later")).click();
});

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python sync
# Setup the handler.
def handler():
  page.get_by_role("button", name="Remind me later").click()
page.add_locator_handler(page.get_by_text("Confirm your security details"), handler)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python async
# Setup the handler.
async def handler():
  await page.get_by_role("button", name="Remind me later").click()
await page.add_locator_handler(page.get_by_text("Confirm your security details"), handler)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.GetByText("Confirm your security details"), async () => {
  await page.GetByRole(AriaRole.Button, new() { Name = "Remind me later" }).ClickAsync();
});

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

An example with a custom callback on every actionability check. It uses a `<body>` locator that is always visible, so the handler is called before every actionability check. It is important to specify [`option: noWaitAfter`], because the handler does not hide the `<body>` element.

```js
// Setup the handler.
await page.addLocatorHandler(page.locator('body'), async () => {
  await page.evaluate(() => window.removeObstructionsForTestIfNeeded());
}, { noWaitAfter: true });

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.locator("body"), () -> {
  page.evaluate("window.removeObstructionsForTestIfNeeded()");
}, new Page.AddLocatorHandlerOptions().setNoWaitAfter(true));

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python sync
# Setup the handler.
def handler():
  page.evaluate("window.removeObstructionsForTestIfNeeded()")
page.add_locator_handler(page.locator("body"), handler, no_wait_after=True)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python async
# Setup the handler.
async def handler():
  await page.evaluate("window.removeObstructionsForTestIfNeeded()")
await page.add_locator_handler(page.locator("body"), handler, no_wait_after=True)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.Locator("body"), async () => {
  await page.EvaluateAsync("window.removeObstructionsForTestIfNeeded()");
}, new() { NoWaitAfter = true });

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

Handler takes the original locator as an argument. You can also automatically remove the handler after a number of invocations by setting [`option: times`]:

```js
await page.addLocatorHandler(page.getByLabel('Close'), async locator => {
  await locator.click();
}, { times: 1 });
```

```java
page.addLocatorHandler(page.getByLabel("Close"), locator -> {
  locator.click();
}, new Page.AddLocatorHandlerOptions().setTimes(1));
```

```python sync
def handler(locator):
  locator.click()
page.add_locator_handler(page.get_by_label("Close"), handler, times=1)
```

```python async
async def handler(locator):
  await locator.click()
await page.add_locator_handler(page.get_by_label("Close"), handler, times=1)
```

```csharp
await page.AddLocatorHandlerAsync(page.GetByText("Sign up to the newsletter"), async locator => {
  await locator.ClickAsync();
}, new() { Times = 1 });
```

### param: Page.addLocatorHandler.locator
* since: v1.42
- `locator` <[Locator]>

Locator that triggers the handler.

### param: Page.addLocatorHandler.handler
* langs: js, python
* since: v1.42
- `handler` <[function]\([Locator]\): [Promise<any>]>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### param: Page.addLocatorHandler.handler
* langs: csharp
* since: v1.42
- `handler` <[function]\([Locator]\): [Promise<any>]>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### param: Page.addLocatorHandler.handler
* langs: java
* since: v1.42
- `handler` <[function]\([Locator]\)>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### option: Page.addLocatorHandler.times
* since: v1.44
- `times` <[int]>

Specifies the maximum number of times this handler should be called. Unlimited by default.

### option: Page.addLocatorHandler.noWaitAfter
* since: v1.44
- `noWaitAfter` <[boolean]>

By default, after calling the handler Playwright will wait until the overlay becomes hidden, and only then Playwright will continue with the action/assertion that triggered the handler. This option allows to opt-out of this behavior, so that overlay can stay visible after the handler has run.

## async method: Page.removeAllListeners
* since: v1.47
* langs: js

Removes all the listeners of the given type (or all registered listeners if no type given).
Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

**Usage**

```js
page.on('request', async request => {
  const response = await request.response();
  const body = await response.body();
  console.log(body.byteLength);
});
await page.goto('https://playwright.dev', { waitUntil: 'domcontentloaded' });
// Waits for all the reported 'request' events to resolve.
await page.removeAllListeners('request', { behavior: 'wait' });
```

### param: Page.removeAllListeners.type
* since: v1.47
- `type` ?<[string]>

### option: Page.removeAllListeners.behavior = %%-remove-all-listeners-options-behavior-%%
* since: v1.47

## async method: Page.removeLocatorHandler
* since: v1.44

Removes all locator handlers added by [`method: Page.addLocatorHandler`] for a specific locator.

### param: Page.removeLocatorHandler.locator
* since: v1.44
- `locator` <[Locator]>

Locator passed to [`method: Page.addLocatorHandler`].


## async method: Page.reload
* since: v1.8
- returns: <[null]|[Response]>

This method reloads the current page, in the same way as if the user had triggered a browser refresh.
Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect.

### option: Page.reload.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.reload.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.reload.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## property: Page.request
* since: v1.16
* langs:
  - alias-csharp: APIRequest
- type: <[APIRequestContext]>

API testing helper associated with this page. This method returns the same instance as
[`property: BrowserContext.request`] on the page's context. See [`property: BrowserContext.request`] for more details.

## async method: Page.route
* since: v1.8

Routing provides the capability to modify network requests that are made by a page.

Once routing is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note
The handler will only be called for the first url if the response is a redirect.
:::

:::note
[`method: Page.route`] will not intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.
:::

:::note
[`method: Page.route`] will not intercept the first request of a popup page. Use [`method: BrowserContext.route`] instead.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```js
const page = await browser.newPage();
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

```java
Page page = browser.newPage();
page.route("**/*.{png,jpg,jpeg}", route -> route.abort());
page.navigate("https://example.com");
browser.close();
```

```python async
page = await browser.new_page()
await page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python sync
page = browser.new_page()
page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.RouteAsync("**/*.{png,jpg,jpeg}", async r => await r.AbortAsync());
await page.GotoAsync("https://www.microsoft.com");
```

or the same snippet using a regex pattern instead:

```js
const page = await browser.newPage();
await page.route(/(\.png$)|(\.jpg$)/, route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

```java
Page page = browser.newPage();
page.route(Pattern.compile("(\\.png$)|(\\.jpg$)"),route -> route.abort());
page.navigate("https://example.com");
browser.close();
```

```python async
page = await browser.new_page()
await page.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python sync
page = browser.new_page()
page.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.RouteAsync(new Regex("(\\.png$)|(\\.jpg$)"), async r => await r.AbortAsync());
await page.GotoAsync("https://www.microsoft.com");
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```js
await page.route('/api/**', async route => {
  if (route.request().postData().includes('my-string'))
    await route.fulfill({ body: 'mocked-data' });
  else
    await route.continue();
});
```

```java
page.route("/api/**", route -> {
  if (route.request().postData().contains("my-string"))
    route.fulfill(new Route.FulfillOptions().setBody("mocked-data"));
  else
    route.resume();
});
```

```python async
async def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    await route.fulfill(body="mocked-data")
  else:
    await route.continue_()
await page.route("/api/**", handle_route)
```

```python sync
def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
page.route("/api/**", handle_route)
```

```csharp
await page.RouteAsync("/api/**", async r =>
{
  if (r.Request.PostData.Contains("my-string"))
      await r.FulfillAsync(new() { Body = "mocked-data" });
  else
      await r.ContinueAsync();
});
```

Page routes take precedence over browser context routes (set up with [`method: BrowserContext.route`]) when request
matches both handlers.

To remove a route with its handler you can use [`method: Page.unroute`].

:::note
Enabling routing disables http cache.
:::

### param: Page.route.url
* since: v1.8
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### param: Page.route.handler
* since: v1.8
* langs: js, python
- `handler` <[function]\([Route], [Request]\): [Promise<any>|any]>

handler function to route the request.

### param: Page.route.handler
* since: v1.8
* langs: csharp, java
- `handler` <[function]\([Route]\)>

handler function to route the request.

### option: Page.route.times
* since: v1.15
- `times` <[int]>

How often a route should be used. By default it will be used every time.

## async method: Page.routeFromHAR
* since: v1.23

If specified the network requests that are made in the page will be served from the HAR file. Read more about [Replaying from HAR](../mock.md#replaying-from-har).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.

### param: Page.routeFromHAR.har
* since: v1.23
- `har` <[path]>

Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.

### option: Page.routeFromHAR.notFound
* since: v1.23
- `notFound` ?<[HarNotFound]<"abort"|"fallback">>
* If set to 'abort' any request not found in the HAR file will be aborted.
* If set to 'fallback' missing requests will be sent to the network.

Defaults to abort.

### option: Page.routeFromHAR.update
* since: v1.23
- `update` ?<boolean>

If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [`method: BrowserContext.close`] is called.

### option: Page.routeFromHAR.url
* since: v1.23
- `url` <[string]|[RegExp]>

A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

### option: Page.routeFromHAR.updateMode
* since: v1.32
- `updateMode` <[HarMode]<"full"|"minimal">>

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.

### option: Page.routeFromHAR.updateContent
* since: v1.32
- `updateContent` <[RouteFromHarUpdateContentPolicy]<"embed"|"attach">>

Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.


## async method: Page.routeWebSocket
* since: v1.48

This method allows to modify websocket connections that are made by the page.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before navigating the page.

**Usage**

Below is an example of a simple mock that responds to a single message. See [WebSocketRoute] for more details and examples.

```js
await page.routeWebSocket('/ws', ws => {
  ws.onMessage(message => {
    if (message === 'request')
      ws.send('response');
  });
});
```

```java
page.routeWebSocket("/ws", ws -> {
  ws.onMessage(frame -> {
    if ("request".equals(frame.text()))
      ws.send("response");
  });
});
```

```python async
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

def handler(ws: WebSocketRoute):
  ws.on_message(lambda message: message_handler(ws, message))

await page.route_web_socket("/ws", handler)
```

```python sync
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

def handler(ws: WebSocketRoute):
  ws.on_message(lambda message: message_handler(ws, message))

page.route_web_socket("/ws", handler)
```

```csharp
await page.RouteWebSocketAsync("/ws", ws => {
  ws.OnMessage(frame => {
    if (frame.Text == "request")
      ws.Send("response");
  });
});
```

### param: Page.routeWebSocket.url
* since: v1.48
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [`option: Browser.newContext.baseURL`] context option.

### param: Page.routeWebSocket.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([WebSocketRoute]\): [Promise<any>|any]>

Handler function to route the WebSocket.

### param: Page.routeWebSocket.handler
* since: v1.48
* langs: csharp, java
- `handler` <[function]\([WebSocketRoute]\)>

Handler function to route the WebSocket.


## async method: Page.screenshot
* since: v1.8
- returns: <[Buffer]>

Returns the buffer with the captured screenshot.

### option: Page.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.8

### option: Page.screenshot.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.screenshot.fullPage = %%-screenshot-option-full-page-%%
* since: v1.8

### option: Page.screenshot.clip = %%-screenshot-option-clip-%%
* since: v1.8

### option: Page.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: Page.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: Page.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about [locators](../locators.md).
- returns: <[Array]<[string]>>

This method waits for an element matching [`param: selector`], waits for [actionability](../actionability.md) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
page.selectOption('select#colors', 'blue');

// single selection matching the label
page.selectOption('select#colors', { label: 'Blue' });

// multiple selection
page.selectOption('select#colors', ['red', 'green', 'blue']);

```

```java
// Single selection matching the value or label
page.selectOption("select#colors", "blue");
// single selection matching both the value and the label
page.selectOption("select#colors", new SelectOption().setLabel("Blue"));
// multiple selection
page.selectOption("select#colors", new String[] {"red", "green", "blue"});
```

```python async
# Single selection matching the value or label
await page.select_option("select#colors", "blue")
# single selection matching the label
await page.select_option("select#colors", label="blue")
# multiple selection
await page.select_option("select#colors", value=["red", "green", "blue"])
```

```python sync
# Single selection matching the value or label
page.select_option("select#colors", "blue")
# single selection matching both the label
page.select_option("select#colors", label="blue")
# multiple selection
page.select_option("select#colors", value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await page.SelectOptionAsync("select#colors", new[] { "blue" });
// single selection matching both the value and the label
await page.SelectOptionAsync("select#colors", new[] { new SelectOptionValue() { Label = "blue" } });
// multiple
await page.SelectOptionAsync("select#colors", new[] { "red", "green", "blue" });
```

### param: Page.selectOption.selector = %%-input-selector-%%
* since: v1.8

### param: Page.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: Page.selectOption.force = %%-input-force-%%
* since: v1.13

### option: Page.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.selectOption.strict = %%-input-strict-%%
* since: v1.14

### option: Page.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### param: Page.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### param: Page.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: Page.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### param: Page.selectOption.label = %%-python-select-options-label-%%
* since: v1.8

## async method: Page.setChecked
* since: v1.15
* discouraged: Use locator-based [`method: Locator.setChecked`] instead. Read more about [locators](../locators.md).

This method checks or unchecks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.setChecked.selector = %%-input-selector-%%
* since: v1.15

### param: Page.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Page.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Page.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Page.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Page.setChecked.strict = %%-input-strict-%%
* since: v1.15

### option: Page.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Page.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Page.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: Page.setContent
* since: v1.8

This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write), inheriting all its specific characteristics and behaviors.

### param: Page.setContent.html
* since: v1.8
- `html` <[string]>

HTML markup to assign to the page.

### option: Page.setContent.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.setContent.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Page.setContent.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

## method: Page.setDefaultNavigationTimeout
* since: v1.8

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [`method: Page.goBack`]
* [`method: Page.goForward`]
* [`method: Page.goto`]
* [`method: Page.reload`]
* [`method: Page.setContent`]
* [`method: Page.waitForNavigation`]
* [`method: Page.waitForURL`]

:::note
[`method: Page.setDefaultNavigationTimeout`] takes priority over [`method: Page.setDefaultTimeout`],
[`method: BrowserContext.setDefaultTimeout`] and [`method: BrowserContext.setDefaultNavigationTimeout`].
:::

### param: Page.setDefaultNavigationTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum navigation time in milliseconds

## method: Page.setDefaultTimeout
* since: v1.8

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

:::note
[`method: Page.setDefaultNavigationTimeout`] takes priority over [`method: Page.setDefaultTimeout`].
:::

### param: Page.setDefaultTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum time in milliseconds. Pass `0` to disable timeout.

## async method: Page.setExtraHTTPHeaders
* since: v1.8

The extra HTTP headers will be sent with every request the page initiates.

:::note
[`method: Page.setExtraHTTPHeaders`] does not guarantee the order of headers in the outgoing requests.
:::

### param: Page.setExtraHTTPHeaders.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. All header values must be strings.

## async method: Page.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about [locators](../locators.md).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

This method expects [`param: selector`] to point to an
[input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

### param: Page.setInputFiles.selector = %%-input-selector-%%
* since: v1.8

### param: Page.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: Page.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.setInputFiles.strict = %%-input-strict-%%
* since: v1.14

### option: Page.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.setViewportSize
* since: v1.8

In the case of multiple pages in a single browser, each page can have its own viewport size. However,
[`method: Browser.newContext`] allows to set viewport size (and more) for all pages in the context at once.

[`method: Page.setViewportSize`] will resize the page. A lot of websites don't expect phones to change size, so you should set the
viewport size before navigating to the page. [`method: Page.setViewportSize`] will also reset `screen` size, use [`method: Browser.newContext`] with `screen` and `viewport` parameters if you need better control of these properties.

**Usage**

```js
const page = await browser.newPage();
await page.setViewportSize({
  width: 640,
  height: 480,
});
await page.goto('https://example.com');
```

```java
Page page = browser.newPage();
page.setViewportSize(640, 480);
page.navigate("https://example.com");
```

```python async
page = await browser.new_page()
await page.set_viewport_size({"width": 640, "height": 480})
await page.goto("https://example.com")
```

```python sync
page = browser.new_page()
page.set_viewport_size({"width": 640, "height": 480})
page.goto("https://example.com")
```

```csharp
var page = await browser.NewPageAsync();
await page.SetViewportSizeAsync(640, 480);
await page.GotoAsync("https://www.microsoft.com");
```

### param: Page.setViewportSize.viewportSize
* since: v1.8
* langs: js, python
- `viewportSize` <[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

### param: Page.setViewportSize.width
* since: v1.10
* langs: csharp, java
- `width` <[int]>

Page width in pixels.

### param: Page.setViewportSize.height
* since: v1.10
* langs: csharp, java
- `height` <[int]>

Page height in pixels.

## async method: Page.tap
* since: v1.8
* discouraged: Use locator-based [`method: Locator.tap`] instead. Read more about [locators](../locators.md).

This method taps an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
[`method: Page.tap`] the method will throw if [`option: Browser.newContext.hasTouch`] option of the browser context is false.
:::

### param: Page.tap.selector = %%-input-selector-%%
* since: v1.8

### option: Page.tap.force = %%-input-force-%%
* since: v1.8

### option: Page.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.tap.position = %%-input-position-%%
* since: v1.8

### option: Page.tap.strict = %%-input-strict-%%
* since: v1.14

### option: Page.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about [locators](../locators.md).
- returns: <[null]|[string]>

Returns `element.textContent`.

### param: Page.textContent.selector = %%-input-selector-%%
* since: v1.8

### option: Page.textContent.strict = %%-input-strict-%%
* since: v1.14

### option: Page.textContent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.textContent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.title
* since: v1.8
- returns: <[string]>

Returns the page's title.

## property: Page.touchscreen
* since: v1.8
- type: <[Touchscreen]>

## async method: Page.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `page.type` can be used to send
fine-grained keyboard events. To fill values in form fields, use [`method: Page.fill`].

To press a special key, like `Control` or `ArrowDown`, use [`method: Keyboard.press`].

**Usage**

### param: Page.type.selector = %%-input-selector-%%
* since: v1.8

### param: Page.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: Page.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key presses in milliseconds. Defaults to 0.

### option: Page.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.type.strict = %%-input-strict-%%
* since: v1.14

### option: Page.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about [locators](../locators.md).

This method unchecks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.md) checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.uncheck.selector = %%-input-selector-%%
* since: v1.8

### option: Page.uncheck.force = %%-input-force-%%
* since: v1.8

### option: Page.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.uncheck.position = %%-input-position-%%
* since: v1.11

### option: Page.uncheck.strict = %%-input-strict-%%
* since: v1.14

### option: Page.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.uncheck.trial = %%-input-trial-%%
* since: v1.11

## async method: Page.unrouteAll
* since: v1.41

Removes all routes created with [`method: Page.route`] and [`method: Page.routeFromHAR`].

### option: Page.unrouteAll.behavior = %%-unroute-all-options-behavior-%%
* since: v1.41

## async method: Page.unroute
* since: v1.8

Removes a route created with [`method: Page.route`]. When [`param: handler`] is not specified, removes all routes for
the [`param: url`].

### param: Page.unroute.url
* since: v1.8
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving [URL] to match while routing.

### param: Page.unroute.handler
* since: v1.8
* langs: js, python
- `handler` ?<[function]\([Route], [Request]\): [Promise<any>|any]>

Optional handler function to route the request.

### param: Page.unroute.handler
* since: v1.8
* langs: csharp, java
- `handler` ?<[function]\([Route]\)>

Optional handler function to route the request.

## method: Page.url
* since: v1.8
- returns: <[string]>

## method: Page.video
* since: v1.8
- returns: <[null]|[Video]>

Video object associated with this page.

## method: Page.viewportSize
* since: v1.8
- returns: <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

## async method: Page.waitForClose
* since: v1.11
* langs: java
- returns: <[Page]>

Performs action and waits for the Page to close.

### option: Page.waitForClose.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForClose.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForConsoleMessage
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_console_message
  - alias-csharp: RunAndWaitForConsoleMessage
- returns: <[ConsoleMessage]>

Performs action and waits for a [ConsoleMessage] to be logged by in the page. If predicate is provided, it passes
[ConsoleMessage] value into the `predicate` function and waits for `predicate(message)` to return a truthy value.
Will throw an error if the page is closed before the [`event: Page.console`] event is fired.

## async method: Page.waitForConsoleMessage
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[ConsoleMessage]>>

### param: Page.waitForConsoleMessage.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForConsoleMessage.predicate
* since: v1.9
- `predicate` <[function]\([ConsoleMessage]\):[boolean]>

Receives the [ConsoleMessage] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForConsoleMessage.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForConsoleMessage.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForDownload
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_download
  - alias-csharp: RunAndWaitForDownload
- returns: <[Download]>

Performs action and waits for a new [Download]. If predicate is provided, it passes
[Download] value into the `predicate` function and waits for `predicate(download)` to return a truthy value.
Will throw an error if the page is closed before the download event is fired.

## async method: Page.waitForDownload
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Download]>>

### param: Page.waitForDownload.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForDownload.predicate
* since: v1.9
- `predicate` <[function]\([Download]\):[boolean]>

Receives the [Download] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForDownload.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForDownload.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForEvent
* since: v1.8
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy
value. Will throw an error if the page is closed before the event is fired. Returns the event data value.

**Usage**

```js
// Start waiting for download before clicking. Note no await.
const downloadPromise = page.waitForEvent('download');
await page.getByText('Download file').click();
const download = await downloadPromise;
```

```python async
async with page.expect_event("framenavigated") as event_info:
    await page.get_by_role("button")
frame = await event_info.value
```

```python sync
with page.expect_event("framenavigated") as event_info:
    page.get_by_role("button")
frame = event_info.value
```

## async method: Page.waitForEvent
* since: v1.8
* langs: python
- returns: <[EventContextManager]>

### param: Page.waitForEvent.event = %%-wait-for-event-event-%%
* since: v1.8

### param: Page.waitForEvent.optionsOrPredicate
* since: v1.8
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

Either a predicate that receives an event or an options object. Optional.

### option: Page.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: Page.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.8

## async method: Page.waitForFileChooser
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_file_chooser
  - alias-csharp: RunAndWaitForFileChooser
- returns: <[FileChooser]>

Performs action and waits for a new [FileChooser] to be created. If predicate is provided, it passes
[FileChooser] value into the `predicate` function and waits for `predicate(fileChooser)` to return a truthy value.
Will throw an error if the page is closed before the file chooser is opened.

## async method: Page.waitForFileChooser
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[FileChooser]>>

### param: Page.waitForFileChooser.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForFileChooser.predicate
* since: v1.9
- `predicate` <[function]\([FileChooser]\):[boolean]>

Receives the [FileChooser] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForFileChooser.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForFileChooser.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForFunction
* since: v1.8
- returns: <[JSHandle]>

Returns when the [`param: expression`] returns a truthy value. It resolves to a JSHandle of the truthy value.

**Usage**

The [`method: Page.waitForFunction`] can be used to observe viewport size change:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  const watchDog = page.waitForFunction(() => window.innerWidth < 100);
  await page.setViewportSize({ width: 50, height: 50 });
  await watchDog;
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch();
      Page page = browser.newPage();
      page.setViewportSize(50,  50);
      page.waitForFunction("() => window.innerWidth < 100");
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch()
    page = await browser.new_page()
    await page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    await page.wait_for_function("() => window.x > 0")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()
    page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    page.wait_for_function("() => window.x > 0")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class FrameExamples
{
  public static async Task WaitForFunction()
  {
    using var playwright = await Playwright.CreateAsync();
    await using var browser = await playwright.Webkit.LaunchAsync();
    var page = await browser.NewPageAsync();
    await page.SetViewportSizeAsync(50, 50);
    await page.MainFrame.WaitForFunctionAsync("window.innerWidth < 100");
  }
}
```

To pass an argument to the predicate of [`method: Page.waitForFunction`] function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), selector);
```

```java
String selector = ".foo";
page.waitForFunction("selector => !!document.querySelector(selector)", selector);
```

```python async
selector = ".foo"
await page.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```python sync
selector = ".foo"
page.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```csharp
var selector = ".foo";
await page.WaitForFunctionAsync("selector => !!document.querySelector(selector)", selector);
```

### param: Page.waitForFunction.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.waitForFunction.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.waitForFunction.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.waitForFunction.polling = %%-js-python-wait-for-function-polling-%%
* since: v1.8

### option: Page.waitForFunction.polling = %%-csharp-java-wait-for-function-polling-%%
* since: v1.8

### option: Page.waitForFunction.timeout = %%-wait-for-function-timeout-%%
* since: v1.8

### option: Page.waitForFunction.timeout = %%-wait-for-function-timeout-js-%%
* since: v1.8

## async method: Page.waitForLoadState
* since: v1.8

Returns when the required load state has been reached.

This resolves when the page reaches a required load state, `load` by default. The navigation must have been committed
when this method is called. If current document has already reached the required state, resolves immediately.

:::note
Most of the time, this method is not needed because Playwright [auto-waits before every action](../actionability.md).
:::

**Usage**

```js
await page.getByRole('button').click(); // Click triggers navigation.
await page.waitForLoadState(); // The promise resolves after 'load' event.
```

```java
page.getByRole(AriaRole.BUTTON).click(); // Click triggers navigation.
page.waitForLoadState(); // The promise resolves after "load" event.
```

```python async
await page.get_by_role("button").click() # click triggers navigation.
await page.wait_for_load_state() # the promise resolves after "load" event.
```

```python sync
page.get_by_role("button").click() # click triggers navigation.
page.wait_for_load_state() # the promise resolves after "load" event.
```

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync(); // Click triggers navigation.
await page.WaitForLoadStateAsync(); // The promise resolves after 'load' event.
```

```js
const popupPromise = page.waitForEvent('popup');
await page.getByRole('button').click(); // Click triggers a popup.
const popup = await popupPromise;
await popup.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
console.log(await popup.title()); // Popup is ready to use.
```

```java
Page popup = page.waitForPopup(() -> {
  page.getByRole(AriaRole.BUTTON).click(); // Click triggers a popup.
});
// Wait for the "DOMContentLoaded" event
popup.waitForLoadState(LoadState.DOMCONTENTLOADED);
System.out.println(popup.title()); // Popup is ready to use.
```

```python async
async with page.expect_popup() as page_info:
    await page.get_by_role("button").click() # click triggers a popup.
popup = await page_info.value
# Wait for the "DOMContentLoaded" event.
await popup.wait_for_load_state("domcontentloaded")
print(await popup.title()) # popup is ready to use.
```

```python sync
with page.expect_popup() as page_info:
    page.get_by_role("button").click() # click triggers a popup.
popup = page_info.value
# Wait for the "DOMContentLoaded" event.
popup.wait_for_load_state("domcontentloaded")
print(popup.title()) # popup is ready to use.
```

```csharp
var popup = await page.RunAndWaitForPopupAsync(async () =>
{
    await page.GetByRole(AriaRole.Button).ClickAsync(); // click triggers the popup
});
// Wait for the "DOMContentLoaded" event.
await popup.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
Console.WriteLine(await popup.TitleAsync()); // popup is ready to use.
```

### param: Page.waitForLoadState.state = %%-wait-for-load-state-state-%%
* since: v1.8

### option: Page.waitForLoadState.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.waitForLoadState.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Page.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Page.waitForURL`] instead.
* langs:
  * alias-python: expect_navigation
  * alias-csharp: RunAndWaitForNavigation
- returns: <[null]|[Response]>

Waits for the main frame navigation and returns the main resource response. In case of multiple redirects, the navigation
will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to
History API usage, the navigation will resolve with `null`.

**Usage**

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code which will indirectly
cause the page to navigate. e.g. The click target has an `onclick` handler that triggers navigation from a `setTimeout`.
Consider this example:

```js
// Start waiting for navigation before clicking. Note no await.
const navigationPromise = page.waitForNavigation();
await page.getByText('Navigate after timeout').click();
await navigationPromise;
```

```java
// The method returns after navigation has finished
Response response = page.waitForNavigation(() -> {
  // This action triggers the navigation after a timeout.
  page.getByText("Navigate after timeout").click();
});
```

```python async
async with page.expect_navigation():
    # This action triggers the navigation after a timeout.
    await page.get_by_text("Navigate after timeout").click()
# Resolves after navigation has finished
```

```python sync
with page.expect_navigation():
    # This action triggers the navigation after a timeout.
    page.get_by_text("Navigate after timeout").click()
# Resolves after navigation has finished
```

```csharp
await page.RunAndWaitForNavigationAsync(async () =>
{
    // This action triggers the navigation after a timeout.
    await page.GetByText("Navigate after timeout").ClickAsync();
});

// The method continues after navigation has finished
```

:::note
Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered
a navigation.
:::

## async method: Page.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Page.waitForURL`] instead.
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Page.waitForNavigation.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForNavigation.url = %%-wait-for-navigation-url-%%
* since: v1.8

### option: Page.waitForNavigation.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.waitForNavigation.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.waitForNavigation.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### param: Page.waitForNavigation.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForPopup
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_popup
  - alias-csharp: RunAndWaitForPopup
- returns: <[Page]>

Performs action and waits for a popup [Page]. If predicate is provided, it passes
[Popup] value into the `predicate` function and waits for `predicate(page)` to return a truthy value.
Will throw an error if the page is closed before the popup event is fired.

## async method: Page.waitForPopup
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Page]>>

### param: Page.waitForPopup.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForPopup.predicate
* since: v1.9
- `predicate` <[function]\([Page]\):[boolean]>

Receives the [Page] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForPopup.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForPopup.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForRequest
* since: v1.8
* langs:
  * alias-python: expect_request
  * alias-csharp: RunAndWaitForRequest
- returns: <[Request]>

Waits for the matching request and returns it. See [waiting for event](../events.md#waiting-for-event) for more details about events.

**Usage**

```js
// Start waiting for request before clicking. Note no await.
const requestPromise = page.waitForRequest('https://example.com/resource');
await page.getByText('trigger request').click();
const request = await requestPromise;

// Alternative way with a predicate. Note no await.
const requestPromise = page.waitForRequest(request =>
  request.url() === 'https://example.com' && request.method() === 'GET',
);
await page.getByText('trigger request').click();
const request = await requestPromise;
```

```java
// Waits for the next request with the specified url
Request request = page.waitForRequest("https://example.com/resource", () -> {
  // Triggers the request
  page.getByText("trigger request").click();
});

// Waits for the next request matching some conditions
Request request = page.waitForRequest(request -> "https://example.com".equals(request.url()) && "GET".equals(request.method()), () -> {
  // Triggers the request
  page.getByText("trigger request").click();
});
```

```python async
async with page.expect_request("http://example.com/resource") as first:
    await page.get_by_text("trigger request").click()
first_request = await first.value

# or with a lambda
async with page.expect_request(lambda request: request.url == "http://example.com" and request.method == "get") as second:
    await page.get_by_text("trigger request").click()
second_request = await second.value
```

```python sync
with page.expect_request("http://example.com/resource") as first:
    page.get_by_text("trigger request").click()
first_request = first.value

# or with a lambda
with page.expect_request(lambda request: request.url == "http://example.com" and request.method == "get") as second:
    page.get_by_text("trigger request").click()
second_request = second.value
```

```csharp
// Waits for the next request with the specified url.
await page.RunAndWaitForRequestAsync(async () =>
{
    await page.GetByText("trigger request").ClickAsync();
}, "http://example.com/resource");

// Alternative way with a predicate.
await page.RunAndWaitForRequestAsync(async () =>
{
    await page.GetByText("trigger request").ClickAsync();
}, request => request.Url == "https://example.com" && request.Method == "GET");
```

## async method: Page.waitForRequest
* since: v1.8
* langs: python
- returns: <[EventContextManager]<[Request]>>

### param: Page.waitForRequest.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### param: Page.waitForRequest.urlOrPredicate
* since: v1.8
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Request]\):[boolean]>

Request URL string, regex or predicate receiving [Request] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### param: Page.waitForRequest.urlOrPredicate
* since: v1.8
* langs: js
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Request]\):[boolean]|[Promise]<[boolean]>>

Request URL string, regex or predicate receiving [Request] object.

### option: Page.waitForRequest.timeout
* since: v1.8
- `timeout` <[float]>

Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be
changed by using the [`method: Page.setDefaultTimeout`] method.

### param: Page.waitForRequest.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForRequestFinished
* since: v1.12
* langs: java, python, csharp
  - alias-python: expect_request_finished
  - alias-csharp: RunAndWaitForRequestFinished
- returns: <[Request]>

Performs action and waits for a [Request] to finish loading. If predicate is provided, it passes
[Request] value into the `predicate` function and waits for `predicate(request)` to return a truthy value.
Will throw an error if the page is closed before the [`event: Page.requestFinished`] event is fired.

## async method: Page.waitForRequestFinished
* since: v1.12
* langs: python
- returns: <[EventContextManager]<[Request]>>

### param: Page.waitForRequestFinished.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForRequestFinished.predicate
* since: v1.12
- `predicate` <[function]\([Request]\):[boolean]>

Receives the [Request] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForRequestFinished.timeout = %%-wait-for-event-timeout-%%
* since: v1.12

### param: Page.waitForRequestFinished.callback = %%-java-wait-for-event-callback-%%
* since: v1.12

## async method: Page.waitForResponse
* since: v1.8
* langs:
  * alias-python: expect_response
  * alias-csharp: RunAndWaitForResponse
- returns: <[Response]>

Returns the matched response. See [waiting for event](../events.md#waiting-for-event) for more details about events.

**Usage**

```js
// Start waiting for response before clicking. Note no await.
const responsePromise = page.waitForResponse('https://example.com/resource');
await page.getByText('trigger response').click();
const response = await responsePromise;

// Alternative way with a predicate. Note no await.
const responsePromise = page.waitForResponse(response =>
  response.url() === 'https://example.com' && response.status() === 200
      && response.request().method() === 'GET'
);
await page.getByText('trigger response').click();
const response = await responsePromise;
```

```java
// Waits for the next response with the specified url
Response response = page.waitForResponse("https://example.com/resource", () -> {
  // Triggers the response
  page.getByText("trigger response").click();
});

// Waits for the next response matching some conditions
Response response = page.waitForResponse(response -> "https://example.com".equals(response.url()) && response.status() == 200 && "GET".equals(response.request().method()), () -> {
  // Triggers the response
  page.getByText("trigger response").click();
});
```

```python async
async with page.expect_response("https://example.com/resource") as response_info:
    await page.get_by_text("trigger response").click()
response = await response_info.value
return response.ok

# or with a lambda
async with page.expect_response(lambda response: response.url == "https://example.com" and response.status == 200 and response.request.method == "get") as response_info:
    await page.get_by_text("trigger response").click()
response = await response_info.value
return response.ok
```

```python sync
with page.expect_response("https://example.com/resource") as response_info:
    page.get_by_text("trigger response").click()
response = response_info.value
return response.ok

# or with a lambda
with page.expect_response(lambda response: response.url == "https://example.com" and response.status == 200 and response.request.method == "get") as response_info:
    page.get_by_text("trigger response").click()
response = response_info.value
return response.ok
```

```csharp
// Waits for the next response with the specified url.
await page.RunAndWaitForResponseAsync(async () =>
{
    await page.GetByText("trigger response").ClickAsync();
}, "http://example.com/resource");

// Alternative way with a predicate.
await page.RunAndWaitForResponseAsync(async () =>
{
    await page.GetByText("trigger response").ClickAsync();
}, response => response.Url == "https://example.com" && response.Status == 200 && response.Request.Method == "GET");
```

## async method: Page.waitForResponse
* since: v1.8
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Page.waitForResponse.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### param: Page.waitForResponse.urlOrPredicate
* since: v1.8
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Response]\):[boolean]>

Request URL string, regex or predicate receiving [Response] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### param: Page.waitForResponse.urlOrPredicate
* since: v1.8
* langs: js
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Response]\):[boolean]|[Promise]<[boolean]>>

Request URL string, regex or predicate receiving [Response] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.

### option: Page.waitForResponse.timeout
* since: v1.8
- `timeout` <[float]>

Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be
changed by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

### param: Page.waitForResponse.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
  Read more about [locators](../locators.md).
- returns: <[null]|[ElementHandle]>

Returns when element specified by selector satisfies [`option: state`] option. Returns `null` if waiting for `hidden` or
`detached`.

:::note
Playwright automatically waits for element to be ready before performing an action. Using
[Locator] objects and web-first assertions makes the code wait-for-selector-free.
:::

Wait for the [`param: selector`] to satisfy [`option: state`] option (either appear/disappear from dom, or become
visible/hidden). If at the moment of calling the method [`param: selector`] already satisfies the condition, the method
will return immediately. If the selector doesn't satisfy the condition for the [`option: timeout`] milliseconds, the
function will throw.

**Usage**

This method works across navigations:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const currentURL of ['https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
    const element = await page.waitForSelector('img');
    console.log('Loaded image: ' + await element.getAttribute('src'));
  }
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      for (String currentURL : Arrays.asList("https://google.com", "https://bbc.com")) {
        page.navigate(currentURL);
        ElementHandle element = page.waitForSelector("img");
        System.out.println("Loaded image: " + element.getAttribute("src"));
      }
      browser.close();
    }
  }
}
```

```python async
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        await page.goto(current_url, wait_until="domcontentloaded")
        element = await page.wait_for_selector("img")
        print("Loaded image: " + str(await element.get_attribute("src")))
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python sync
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        page.goto(current_url, wait_until="domcontentloaded")
        element = page.wait_for_selector("img")
        print("Loaded image: " + str(element.get_attribute("src")))
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
  public static async Task Images()
  {
      using var playwright = await Playwright.CreateAsync();
      await using var browser = await playwright.Chromium.LaunchAsync();
      var page = await browser.NewPageAsync();

      foreach (var currentUrl in new[] { "https://www.google.com", "https://bbc.com" })
      {
          await page.GotoAsync(currentUrl);
          var element = await page.WaitForSelectorAsync("img");
          Console.WriteLine($"Loaded image: {await element.GetAttributeAsync("src")}");
      }

      await browser.CloseAsync();
  }
}
```

### param: Page.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: Page.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: Page.waitForSelector.strict = %%-input-strict-%%
* since: v1.14

### option: Page.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.waitForCondition
* since: v1.32
* langs: java

The method will block until the condition returns true. All Playwright events will
be dispatched while the method is waiting for the condition.

**Usage**

Use the method to wait for a condition that depends on page events:

```java
List<String> messages = new ArrayList<>();
page.onConsoleMessage(m -> messages.add(m.text()));
page.getByText("Submit button").click();
page.waitForCondition(() -> messages.size() > 3);
```

### param: Page.waitForCondition.condition
* since: v1.32
- `condition` <[BooleanSupplier]>

Condition to wait for.

### option: Page.waitForCondition.timeout = %%-wait-for-function-timeout-%%
* since: v1.32

## async method: Page.waitForTimeout
* since: v1.8
* discouraged: Never wait for timeout in production. Tests that wait for time are
  inherently flaky. Use [Locator] actions and web assertions that wait automatically.

Waits for the given [`param: timeout`] in milliseconds.

Note that `page.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be
flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**

```js
// wait for 1 second
await page.waitForTimeout(1000);
```

```java
// wait for 1 second
page.waitForTimeout(1000);
```

```python async
# wait for 1 second
await page.wait_for_timeout(1000)
```

```python sync
# wait for 1 second
page.wait_for_timeout(1000)
```

```csharp
// Wait for 1 second
await page.WaitForTimeoutAsync(1000);
```

### param: Page.waitForTimeout.timeout
* since: v1.8
- `timeout` <[float]>

A timeout to wait for

## async method: Page.waitForURL
* since: v1.11

Waits for the main frame to navigate to the given URL.

**Usage**

```js
await page.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation
await page.waitForURL('**/target.html');
```

```java
page.click("a.delayed-navigation"); // Clicking the link will indirectly cause a navigation
page.waitForURL("**/target.html");
```

```python async
await page.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
await page.wait_for_url("**/target.html")
```

```python sync
page.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
page.wait_for_url("**/target.html")
```

```csharp
await page.ClickAsync("a.delayed-navigation"); // clicking the link will indirectly cause a navigation
await page.WaitForURLAsync("**/target.html");
```

### param: Page.waitForURL.url = %%-wait-for-navigation-url-%%
* since: v1.11

### option: Page.waitForURL.timeout = %%-navigation-timeout-%%
* since: v1.11

### option: Page.waitForURL.timeout = %%-navigation-timeout-js-%%
* since: v1.11

### option: Page.waitForURL.waitUntil = %%-navigation-wait-until-%%
* since: v1.11

## async method: Page.waitForWebSocket
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_websocket
  - alias-csharp: RunAndWaitForWebSocket
- returns: <[WebSocket]>

Performs action and waits for a new [WebSocket]. If predicate is provided, it passes
[WebSocket] value into the `predicate` function and waits for `predicate(webSocket)` to return a truthy value.
Will throw an error if the page is closed before the WebSocket event is fired.

## async method: Page.waitForWebSocket
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[WebSocket]>>

### param: Page.waitForWebSocket.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForWebSocket.predicate
* since: v1.9
- `predicate` <[function]\([WebSocket]\):[boolean]>

Receives the [WebSocket] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForWebSocket.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForWebSocket.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForWorker
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_worker
  - alias-csharp: RunAndWaitForWorker
- returns: <[Worker]>

Performs action and waits for a new [Worker]. If predicate is provided, it passes
[Worker] value into the `predicate` function and waits for `predicate(worker)` to return a truthy value.
Will throw an error if the page is closed before the worker event is fired.

## async method: Page.waitForWorker
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Worker]>>

### param: Page.waitForWorker.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForWorker.predicate
* since: v1.9
- `predicate` <[function]\([Worker]\):[boolean]>

Receives the [Worker] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForWorker.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForWorker.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## method: Page.workers
* since: v1.8
- returns: <[Array]<[Worker]>>

This method returns all of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
associated with the page.

:::note
This does not contain ServiceWorkers
:::

## async method: Page.waitForEvent2
* since: v1.8
* langs: python
  - alias-python: wait_for_event
- returns: <[any]>

:::note
In most cases, you should use [`method: Page.waitForEvent`].
:::

Waits for given `event` to fire. If predicate is provided, it passes
event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the page is closed before the `event` is fired.

### param: Page.waitForEvent2.event = %%-wait-for-event-event-%%
* since: v1.8

### option: Page.waitForEvent2.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: Page.waitForEvent2.timeout = %%-wait-for-event-timeout-%%
* since: v1.8
# class: Touchscreen
* since: v1.8

The Touchscreen class operates in main-frame CSS pixels relative to the top-left corner of the viewport. Methods on the
touchscreen can only be used in browser contexts that have been initialized with `hasTouch` set to true.

This class is limited to emulating tap gestures. For examples of other gestures simulated by manually dispatching touch events, see the [emulating legacy touch events](../touch-events.md) page.

## async method: Touchscreen.tap
* since: v1.8

Dispatches a `touchstart` and `touchend` event with a single touch at the position ([`param: x`],[`param: y`]).

:::note
[`method: Page.tap`] the method will throw if [`option: Browser.newContext.hasTouch`] option of the browser context is false.
:::

### param: Touchscreen.tap.x
* since: v1.8
- `x` <[float]>

X coordinate relative to the main frame's viewport in CSS pixels.

### param: Touchscreen.tap.y
* since: v1.8
- `y` <[float]>

Y coordinate relative to the main frame's viewport in CSS pixels.
# class: Route
* since: v1.8

Whenever a network route is set up with [`method: Page.route`] or [`method: BrowserContext.route`], the `Route` object
allows to handle the route.

Learn more about [networking](../network.md).

## async method: Route.abort
* since: v1.8

Aborts the route's request.

### param: Route.abort.errorCode
* since: v1.8
- `errorCode` ?<[string]>

Optional error code. Defaults to `failed`, could be one of the following:
* `'aborted'` - An operation was aborted (due to user action)
* `'accessdenied'` - Permission to access a resource, other than the network, was denied
* `'addressunreachable'` - The IP address is unreachable. This usually means that there is no route to the specified
  host or network.
* `'blockedbyclient'` - The client chose to block the request.
* `'blockedbyresponse'` - The request failed because the response was delivered along with requirements which are not
  met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
* `'connectionaborted'` - A connection timed out as a result of not receiving an ACK for data sent.
* `'connectionclosed'` - A connection was closed (corresponding to a TCP FIN).
* `'connectionfailed'` - A connection attempt failed.
* `'connectionrefused'` - A connection attempt was refused.
* `'connectionreset'` - A connection was reset (corresponding to a TCP RST).
* `'internetdisconnected'` - The Internet connection has been lost.
* `'namenotresolved'` - The host name could not be resolved.
* `'timedout'` - An operation timed out.
* `'failed'` - A generic failure occurred.

## async method: Route.continue
* since: v1.8
* langs:
  - alias-java: resume
  - alias-python: continue_

Sends route's request to the network with optional overrides.

**Usage**

```js
await page.route('**/*', async (route, request) => {
  // Override headers
  const headers = {
    ...request.headers(),
    foo: 'foo-value', // set "foo" header
    bar: undefined, // remove "bar" header
  };
  await route.continue({ headers });
});
```

```java
page.route("**/*", route -> {
  // Override headers
  Map<String, String> headers = new HashMap<>(route.request().headers());
  headers.put("foo", "foo-value"); // set "foo" header
  headers.remove("bar"); // remove "bar" header
  route.resume(new Route.ResumeOptions().setHeaders(headers));
});
```

```python async
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.continue_(headers=headers)

await page.route("**/*", handle)
```

```python sync
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.continue_(headers=headers)

page.route("**/*", handle)
```

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "bar" } };
    headers.Remove("origin");
    await route.ContinueAsync(new() { Headers = headers });
});
```

**Details**

The [`option: headers`] option applies to both the routed request and any redirects it initiates. However, [`option: url`], [`option: method`], and [`option: postData`] only apply to the original request and are not carried over to redirected requests.

[`method: Route.continue`] will immediately send the request to the network, other matching handlers won't be invoked. Use [`method: Route.fallback`] If you want next matching handler in the chain to be invoked.

:::warning
Some request headers are **forbidden** and cannot be overridden (for example, `Cookie`, `Host`, `Content-Length` and others, see [this MDN page](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header) for full list).
If an override is provided for a forbidden header, it will be ignored and the original request header will be used.

To set custom cookies, use [`method: BrowserContext.addCookies`].
:::

### option: Route.continue.url
* since: v1.8
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one.

### option: Route.continue.method
* since: v1.8
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.continue.postData
* since: v1.8
* langs: js, python
- `postData` <[string]|[Buffer]|[Serializable]>

If set changes the post data of request.

### option: Route.continue.postData
* since: v1.8
* langs: java
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.continue.postData
* since: v1.8
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.continue.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.

## async method: Route.fallback
* since: v1.23

Continues route's request with optional overrides. The method is similar to [`method: Route.continue`] with the difference that other matching handlers will be invoked before sending the request.

**Usage**

When several routes match the given pattern, they run in the order opposite to their registration.
That way the last registered route can always override all the previous ones. In the example below,
request will be handled by the bottom-most handler first, then it'll fall back to the previous one and
in the end will be aborted by the first registered route.

```js
await page.route('**/*', async route => {
  // Runs last.
  await route.abort();
});
await page.route('**/*', async route => {
  // Runs second.
  await route.fallback();
});
await page.route('**/*', async route => {
  // Runs first.
  await route.fallback();
});
```

```java
page.route("**/*", route -> {
  // Runs last.
  route.abort();
});

page.route("**/*", route -> {
  // Runs second.
  route.fallback();
});

page.route("**/*", route -> {
  // Runs first.
  route.fallback();
});
```

```python async
await page.route("**/*", lambda route: route.abort())  # Runs last.
await page.route("**/*", lambda route: route.fallback())  # Runs second.
await page.route("**/*", lambda route: route.fallback())  # Runs first.
```

```python sync
page.route("**/*", lambda route: route.abort())  # Runs last.
page.route("**/*", lambda route: route.fallback())  # Runs second.
page.route("**/*", lambda route: route.fallback())  # Runs first.
```

```csharp
await page.RouteAsync("**/*", route => {
    // Runs last.
    await route.AbortAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs second.
    await route.FallbackAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs first.
    await route.FallbackAsync();
});
```

Registering multiple routes is useful when you want separate handlers to
handle different kinds of requests, for example API calls vs page resources or
GET requests vs POST requests as in the example below.

```js
// Handle GET requests.
await page.route('**/*', async route => {
  if (route.request().method() !== 'GET') {
    await route.fallback();
    return;
  }
  // Handling GET only.
  // ...
});

// Handle POST requests.
await page.route('**/*', async route => {
  if (route.request().method() !== 'POST') {
    await route.fallback();
    return;
  }
  // Handling POST only.
  // ...
});
```

```java
// Handle GET requests.
page.route("**/*", route -> {
  if (!route.request().method().equals("GET")) {
    route.fallback();
    return;
  }
  // Handling GET only.
  // ...
});

// Handle POST requests.
page.route("**/*", route -> {
  if (!route.request().method().equals("POST")) {
    route.fallback();
    return;
  }
  // Handling POST only.
  // ...
});
```

```python async
# Handle GET requests.
async def handle_get(route):
    if route.request.method != "GET":
        await route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
async def handle_post(route):
    if route.request.method != "POST":
        await route.fallback()
        return
  # Handling POST only.
  # ...

await page.route("**/*", handle_get)
await page.route("**/*", handle_post)
```

```python sync
# Handle GET requests.
def handle_get(route):
    if route.request.method != "GET":
        route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
def handle_post(route):
    if route.request.method != "POST":
        route.fallback()
        return
  # Handling POST only.
  # ...

page.route("**/*", handle_get)
page.route("**/*", handle_post)
```

```csharp
// Handle GET requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "GET") {
        await route.FallbackAsync();
        return;
    }
    // Handling GET only.
    // ...
});

// Handle POST requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "POST") {
        await route.FallbackAsync();
        return;
    }
    // Handling POST only.
    // ...
});
```

One can also modify request while falling back to the subsequent handler, that way intermediate
route handler can modify url, method, headers and postData of the request.

```js
await page.route('**/*', async (route, request) => {
  // Override headers
  const headers = {
    ...request.headers(),
    foo: 'foo-value', // set "foo" header
    bar: undefined, // remove "bar" header
  };
  await route.fallback({ headers });
});
```

```java
page.route("**/*", route -> {
  // Override headers
  Map<String, String> headers = new HashMap<>(route.request().headers());
  headers.put("foo", "foo-value"); // set "foo" header
  headers.remove("bar"); // remove "bar" header
  route.fallback(new Route.ResumeOptions().setHeaders(headers));
});
```

```python async
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.fallback(headers=headers)

await page.route("**/*", handle)
```

```python sync
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.fallback(headers=headers)

page.route("**/*", handle)
```

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "foo-value" } };
    headers.Remove("bar");
    await route.FallbackAsync(new() { Headers = headers });
});
```

Use [`method: Route.continue`] to immediately send the request to the network, other matching handlers won't be invoked in that case.

### option: Route.fallback.url
* since: v1.23
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one. Changing the URL won't
affect the route matching, all the routes are matched using the original request URL.

### option: Route.fallback.method
* since: v1.23
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.fallback.postData
* since: v1.23
* langs: js, python
- `postData` <[string]|[Buffer]|[Serializable]>

If set changes the post data of request.

### option: Route.fallback.postData
* since: v1.23
* langs: java
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.fallback.postData
* since: v1.23
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.fallback.headers
* since: v1.23
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.

## async method: Route.fetch
* since: v1.29
- returns: <[APIResponse]>

Performs the request and fetches result without fulfilling it, so that the response
could be modified and then fulfilled.

**Usage**

```js
await page.route('https://dog.ceo/api/breeds/list/all', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.message['big_red_dog'] = [];
  await route.fulfill({ response, json });
});
```

```java
page.route("https://dog.ceo/api/breeds/list/all", route -> {
  APIResponse response = route.fetch();
  JsonObject json = new Gson().fromJson(response.text(), JsonObject.class);
  JsonObject message = itemObj.get("json").getAsJsonObject();
  message.set("big_red_dog", new JsonArray());
  route.fulfill(new Route.FulfillOptions()
    .setResponse(response)
    .setBody(json.toString()));
});
```

```python async
async def handle(route):
    response = await route.fetch()
    json = await response.json()
    json["message"]["big_red_dog"] = []
    await route.fulfill(response=response, json=json)

await page.route("https://dog.ceo/api/breeds/list/all", handle)
```

```python sync
def handle(route):
    response = route.fetch()
    json = response.json()
    json["message"]["big_red_dog"] = []
    route.fulfill(response=response, json=json)

page.route("https://dog.ceo/api/breeds/list/all", handle)
```

```csharp
await page.RouteAsync("https://dog.ceo/api/breeds/list/all", async route =>
{
    var response = await route.FetchAsync();
    dynamic json = await response.JsonAsync();
    json.message.big_red_dog = new string[] {};
    await route.FulfillAsync(new() { Response = response, Json = json });
});
```

**Details**

Note that [`option: headers`] option will apply to the fetched request as well as any redirects initiated by it. If you want to only apply [`option: headers`] to the original request, but not to redirects, look into [`method: Route.continue`] instead.

### option: Route.fetch.url
* since: v1.29
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one.

### option: Route.fetch.maxRedirects
* since: v1.31
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects.

### option: Route.fetch.maxRetries
* since: v1.46
- `maxRetries` <[int]>

Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.

### option: Route.fetch.timeout
* since: v1.33
- `timeout` <[float]>

Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Route.fetch.method
* since: v1.29
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.fetch.postData
* langs: js, python
* since: v1.29
- `postData` <[string]|[Buffer]|[Serializable]>

Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be
set to `application/octet-stream` if not explicitly set.

### option: Route.fetch.postData
* langs: java
* since: v1.29
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.fetch.postData
* since: v1.29
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.fetch.headers
* since: v1.29
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.

## async method: Route.fulfill
* since: v1.8

Fulfills route's request with given response.

**Usage**

An example of fulfilling all requests with 404 responses:

```js
await page.route('**/*', async route => {
  await route.fulfill({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

```java
page.route("**/*", route -> {
  route.fulfill(new Route.FulfillOptions()
    .setStatus(404)
    .setContentType("text/plain")
    .setBody("Not Found!"));
});
```

```python async
await page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

```python sync
page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

```csharp
await page.RouteAsync("**/*", route => route.FulfillAsync(new ()
{
    Status = 404,
    ContentType = "text/plain",
    Body = "Not Found!"
}));
```

An example of serving static file:

```js
await page.route('**/xhr_endpoint', route => route.fulfill({ path: 'mock_data.json' }));
```

```java
page.route("**/xhr_endpoint", route -> route.fulfill(
  new Route.FulfillOptions().setPath(Paths.get("mock_data.json"))));
```

```python async
await page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

```python sync
page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

```csharp
await page.RouteAsync("**/xhr_endpoint", route => route.FulfillAsync(new() { Path = "mock_data.json" }));
```

### option: Route.fulfill.status
* since: v1.8
- `status` <[int]>

Response status code, defaults to `200`.

### option: Route.fulfill.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

Response headers. Header values will be converted to a string.

### option: Route.fulfill.contentType
* since: v1.8
- `contentType` <[string]>

If set, equals to setting `Content-Type` response header.

### option: Route.fulfill.body
* since: v1.8
* langs: js, python
- `body` <[string]|[Buffer]>

Response body.

### option: Route.fulfill.body
* since: v1.8
* langs: csharp, java
- `body` <[string]>

Optional response body as text.

### option: Route.fulfill.bodyBytes
* since: v1.9
* langs: csharp, java
- `bodyBytes` <[Buffer]>

Optional response body as raw bytes.

### option: Route.fulfill.json
* since: v1.29
* langs: js, python, csharp
- `json` <[Serializable]>

JSON response. This method will set the content type to `application/json` if not set.

### option: Route.fulfill.path
* since: v1.8
- `path` <[path]>

File path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it
is resolved relative to the current working directory.

### option: Route.fulfill.response
* since: v1.15
- `response` <[APIResponse]>

[APIResponse] to fulfill route's request with. Individual fields of the response (such as headers) can be overridden using fulfill options.

## method: Route.request
* since: v1.8
- returns: <[Request]>

A request to be routed.
