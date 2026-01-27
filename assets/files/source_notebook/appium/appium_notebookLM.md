

--- SOURCE: en/index.md ---

---
hide:
  - navigation
  - toc

title: Welcome
---
<style>
  .md-typeset h1,
  .appium-sponsor-thanks {
    display: none;
  }
</style>

<div style="text-align: center">
  <img src="assets/images/appium-logo-horiz.png" style="max-width: 400px;" />
</div>

Welcome to the Appium documentation! Appium is an open-source project and ecosystem of related
software, designed to facilitate UI automation of many app platforms, including mobile (iOS,
Android, Tizen), browser (Chrome, Firefox, Safari), desktop (macOS, Windows), TV (Roku, tvOS,
Android TV, Samsung), and more!


<div style="text-align: center; margin-top: 2rem; font-style: italic;">
  Appium is extremely grateful for the support of its key partners! (Learn more about our
  sponsorship program and contributor compensation scheme <a
  href="https://github.com/appium/appium/blob/master/GOVERNANCE.md#sponsorship">here</a>)
  <div class="homepageSponsors">
    <div class="homepageSponsor">
      <a href="https://www.browserstack.com/browserstack-appium?utm_campaigncode=701OW00000AoUTQYA3&utm_medium=partnered&utm_source=appium">
        <img src="assets/images/sponsor-logo-browserstack-dark.png#only-dark" style="width: 220px;" />
        <img src="assets/images/sponsor-logo-browserstack-light.png#only-light" style="width: 220px;" />
      </a>
    </div>
    <div class="homepageSponsor">
      <a href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">
        <img src="assets/images/sponsor-logo-lambdatest-dark.png#only-dark" style="width: 220px;" />
        <img src="assets/images/sponsor-logo-lambdatest-light.png#only-light" style="width: 220px;" />
      </a>
    </div>
  </div>
</div>

## Explore the Documentation

<div class="grid cards" markdown>

-   Check out the [__Introduction__](./intro/index.md) to make sure you understand the key concepts
-   Go through the [__Quickstart__](./quickstart/index.md) to get set up and run a basic Android test
-   Visit the [__Ecosystem__](./ecosystem/index.md) page for a list of drivers, clients and plugins you may want to use
-   Consult the [__Reference__](./reference/index.md) page for information on the Appium CLI and supported endpoints
-   Read the different [__Guides__](./guides/migrating-2-to-3.md) for a variety of instructions, tips and tricks
-   Check out various third-party [__Resources__](./resources/index.md) to explore Appium around the web
-   For creating your own Appium extensions, see the [__Developer__](./developing/index.md) documentation
-   For contributions to Appium itself, refer to the [__Contributing__](./contributing/index.md) page
-   Have a look at the [__Appium Blog__](./blog/index.md) to learn what's new in the project

</div>


--- SOURCE: en/ecosystem/clients.md ---

---
title: Appium Clients
---

You need a client to write and run Appium scripts. You'll want to become very
familiar with your client documentation (as well as the documentation of any Selenium client that
the Appium client depends on) since that will be your primary interface to Appium.

To learn more about clients, check out the [Client Intro](../intro/clients.md).

!!! note

    If you maintain an Appium client that you would like to be listed here, feel free to create a PR!

## Official Clients

These clients are currently maintained by the Appium team:

### [Java Client](https://github.com/appium/java-client)

Language: :fontawesome-brands-java: Java

=== "Setup With Maven"

    ```xml
    <dependency>
      <groupId>io.appium</groupId>
      <artifactId>java-client</artifactId>
      <version>${version.you.require}</version>
      <scope>test</scope>
    </dependency>
    ```
=== "Setup With Gradle"

    ```groovy
    dependencies {
      testImplementation 'io.appium:java-client:${version.you.require}'
    }
    ```

### [Python Client](https://github.com/appium/python-client)

Language: :fontawesome-brands-python: Python

```sh title="Install From PyPi"
pip install Appium-Python-Client
```

### [Ruby Core Client](https://github.com/appium/ruby_lib_core)

Language: :material-language-ruby: Ruby

```sh title="Install From RubyGems"
gem install appium_lib_core
```

### [Ruby Client](https://github.com/appium/ruby_lib)

Language: :material-language-ruby: Ruby

This client is a wrapper for the Ruby Core Client with several helper methods, though this may
add additional complexity, therefore the Ruby Core Client is recommended instead.

```sh title="Install From RubyGems"
gem install appium_lib
```

### [.NET Client](https://github.com/appium/dotnet-client)

Language: :simple-dotnet: C#

```sh title="Install Using .NET CLI"
dotnet add package Appium.WebDriver
```

## Other Clients

These clients are not maintained by the Appium team and can be used with other languages.

In general, any W3C WebDriver spec-compatible client will also integrate well with Appium, though
some Appium-specific commands may not be implemented in other clients.

### [WebdriverIO](https://webdriver.io/docs/appium)

Language: :material-language-javascript: :material-language-typescript: JavaScript/TypeScript

```sh title="Setup Using npm"
npm init wdio@latest .
```

### [Nightwatch.js](https://nightwatchjs.org/guide/mobile-app-testing/introduction.html)

Language: :material-language-javascript: :material-language-typescript: JavaScript/TypeScript

=== "Setup For Android"

    ```sh
    npx @nightwatch/mobile-helper android --appium
    ```

=== "Setup For iOS"

    ```sh
    npx @nightwatch/mobile-helper ios --appium
    ```

### [RobotFramework AppiumLibrary](https://github.com/serhatbolsu/robotframework-appiumlibrary)

Language: :simple-robotframework: Robot Framework

```sh title="Install From PyPi"
pip install robotframework-appiumlibrary
```

### [multicatch's appium-client](https://github.com/multicatch/appium-client)

Language: :simple-rust: Rust

```sh title="Install Using Cargo"
cargo add appium-client
```

### [SwiftAppium](https://github.com/milcgroup/swiftappium)

Language: :material-language-swift: Swift

```sh title="Install and Setup"
git clone https://github.com/milcgroup/SwiftAppium.git
cd SwiftAppium
swift build
swift run swiftappium
```


--- SOURCE: en/ecosystem/drivers.md ---

---
title: Appium Drivers
---

You can't use Appium without a driver! Here you can find a list of all known Appium drivers,
along with their installation commands and links to their documentation.

To learn more about drivers, check out the [Driver Intro](../intro/drivers.md).

!!! note

    If you maintain an Appium driver that you would like to be listed here, feel free to create a PR!

## Official Drivers

These drivers are currently maintained by the Appium team:

### [Chromium](https://github.com/appium/appium-chromium-driver)

* Target: Desktop and mobile Chromium browsers (Chrome, Microsoft Edge, etc.)
* Mode: Web

```sh title="Install This Driver"
appium driver install chromium
```

### [Espresso](https://github.com/appium/appium-espresso-driver)

* Target: Android applications
* Mode: Native

```sh title="Install This Driver"
appium driver install espresso
```

### [Gecko](https://github.com/appium/appium-geckodriver)

* Target: Desktop and mobile Gecko browsers (Firefox)
* Mode: Web

```sh title="Install This Driver"
appium driver install gecko
```

### [Mac2](https://github.com/appium/appium-mac2-driver)

* Target: macOS applications
* Mode: Native

```sh title="Install This Driver"
appium driver install mac2
```

### [Safari](https://github.com/appium/appium-safari-driver)

* Target: Desktop and mobile Safari browsers
* Mode: Web

```sh title="Install This Driver"
appium driver install safari
```

### [UiAutomator2](https://github.com/appium/appium-uiautomator2-driver)

* Target: Android, Android TV, Android Wear applications
* Modes: Native, Hybrid, Web

```sh title="Install This Driver"
appium driver install uiautomator2
```

### [Windows](https://github.com/appium/appium-windows-driver)

!!! warning

    Only the Node.js-based driver part is maintained by the Appium team. The server part
    (WinAppDriver executable) is provided by Microsoft, but has not been maintained since 2022.

* Target: Windows applications
* Mode: Native

```sh title="Install This Driver"
appium driver install windows
```

### [XCUITest](https://appium.github.io/appium-xcuitest-driver/)

* Target: iOS, iPadOS, tvOS applications
* Modes: Native, Hybrid, Web

```sh title="Install This Driver"
appium driver install xcuitest
```

## Other Drivers

These drivers are not maintained by the Appium team and can be used to target other platforms:

### [Flutter](https://github.com/appium/appium-flutter-driver)

* Target: iOS and Android applications built with Flutter
* Mode: Native
* Supported by: Appium Team / Community

```sh title="Install This Driver"
appium driver install --source=npm appium-flutter-driver
```

### [Flutter Integration](https://github.com/AppiumTestDistribution/appium-flutter-integration-driver)

* Target: iOS and Android applications built with Flutter
* Mode: Native
* Supported by: Community / `@AppiumTestDistribution`

```sh title="Install This Driver"
appium driver install --source=npm appium-flutter-integration-driver
```

### [LG WebOS](https://github.com/headspinio/appium-lg-webos-driver)

* Target: LG TV web applications
* Mode: Web
* Supported by: HeadSpin

```sh title="Install This Driver"
appium driver install --source=npm appium-lg-webos-driver
```

### [Linux](https://github.com/fantonglang/appium-linux-driver)

!!! warning

    This driver has not been maintained since 2022 and requires a custom Appium installation

* Target: Linux applications
* Mode: Native
* Supported by: `@fantonglang`

```sh title="Install This Driver"
git clone https://github.com/fantonglang/appium
cd appium
yarn install
node ./
```

### [NovaWindows](https://github.com/AutomateThePlanet/appium-novawindows-driver)

!!! info

    This driver is recommended as a drop-in replacement for the partially unmaintained
    [Windows driver](#windows)

* Target: Windows applications
* Mode: Native
* Supported by: Community / Automate The Planet

```sh title="Install This Driver"
appium driver install --source=npm appium-novawindows-driver
```

### [Roku](https://github.com/headspinio/appium-roku-driver)

* Target: Roku channels (applications)
* Mode: Native
* Supported by: HeadSpin

```sh title="Install This Driver"
appium driver install --source=npm @headspinio/appium-roku-driver
```

### [Tizen](https://github.com/Samsung/appium-tizen-driver)

!!! warning

    This driver has not been maintained since 2020 and is only compatible with Appium 1

* Target: Tizen applications
* Mode: Native
* Supported by: Community / Samsung

```sh title="Install This Driver"
npm install appium-tizen-driver
```

### [TizenTV](https://github.com/headspinio/appium-tizen-tv-driver)

* Target: Tizen TV web applications
* Mode: Web
* Supported by: HeadSpin

```sh title="Install This Driver"
appium driver install --source=npm appium-tizen-tv-driver
```

### [You.i Engine](https://github.com/YOU-i-Labs/appium-youiengine-driver)

!!! warning

    This driver has not been maintained since 2022 and is only compatible with Appium 1

* Target: iOS, Android, macOS, Linux, tvOS applications built with You.i Engine
* Mode: Native
* Supported by: Community / You.i

```sh title="Install This Driver"
npm install appium-youiengine-driver
```


--- SOURCE: en/ecosystem/index.md ---

---
hide:
  - toc

title: The Appium Ecosystem
---

Appium has a wide ecosystem of related software and tools. This section of the Appium documentation
aims to compile a listing of various officially-supported and community-supported Appium projects:

<div class="grid cards" markdown>

-   :material-car: __Drivers__

    ---

    Link Appium to your test device

    [:octicons-arrow-right-24: View all drivers](./drivers.md)

-   :octicons-code-16: __Clients__

    ---

    Link Appium to your automation code

    [:octicons-arrow-right-24: View all clients](./clients.md)

-   :fontawesome-solid-plug: __Plugins__

    ---

    Modify and extend Appium functionality

    [:octicons-arrow-right-24: View all plugins](./plugins.md)

-   :material-wrench: __Tools__

    ---

    Interact with Appium in other ways

    [:octicons-arrow-right-24: View all tools](./tools.md)

</div>

--- SOURCE: en/ecosystem/plugins.md ---

---
title: Appium Plugins
---

Plugins offer various ways to extend or modify Appium's behaviour. They are _completely optional_
and are not needed for standard automation functionality, but you may find them to be useful
for more specialised automation workflows.

!!! note

    If you maintain an Appium plugin that you would like to be listed here, feel free to create a PR!

## Official Plugins

These plugins are are currently maintained by the Appium team:

### [Execute Driver](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)

Run entire batches of commands in a single call to the Appium server

```sh title="Install This Plugin"
appium plugin install execute-driver
```

### [Images](https://github.com/appium/appium/tree/master/packages/images-plugin)

Add support for image matching and comparison features

```sh title="Install This Plugin"
appium plugin install images
```

### [Inspector](https://github.com/appium/appium-inspector/tree/main/plugins)

Integrate the [Appium Inspector](https://appium.github.io/appium-inspector/) directly into your
Appium server installation

```sh title="Install This Plugin"
appium plugin install inspector
```

### [Relaxed Caps](https://github.com/appium/appium/tree/master/packages/relaxed-caps-plugin)

Relax Appium's requirement for vendor prefixes on capabilities

```sh title="Install This Plugin"
appium plugin install relaxed-caps
```

### [Storage](https://github.com/appium/appium/tree/master/packages/storage-plugin)

Add server-side storage with client-side management

```sh title="Install This Plugin"
appium plugin install storage
```

### [Universal XML](https://github.com/appium/appium/tree/master/packages/universal-xml-plugin)

Translate the default iOS and Android XML formats into a common format

```sh title="Install This Plugin"
appium plugin install universal-xml
```

## Other Plugins

These plugins are not maintained by the Appium team and can provide additional functionality:

### [AltUnity](https://github.com/headspinio/appium-altunity-plugin)

Target Unity games and apps for automation via the AltUnityTester framework

Supported by: HeadSpin

```sh title="Install This Plugin"
appium plugin install --source=npm appium-altunity-plugin
```

### [Device Farm](https://github.com/AppiumTestDistribution/appium-device-farm)

Manage and create driver sessions on connected Android devices and iOS simulators

Supported by: `@AppiumTestDistribution`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-device-farm
```

### [Gestures](https://github.com/AppiumTestDistribution/appium-gestures-plugin)

Perform basic gestures using W3C Actions

Supported by: `@AppiumTestDistribution`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-gestures-plugin
```

### [Interceptor](https://github.com/AppiumTestDistribution/appium-interceptor-plugin)

Intercept and mock API requests and responses

Supported by: `@AppiumTestDistribution`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-interceptor
```

### [OCR](https://github.com/jlipps/appium-ocr-plugin)

Find elements via OCR text

Supported by: `@jlipps`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-ocr-plugin
```

### [Reporter](https://github.com/AppiumTestDistribution/appium-reporter-plugin)

Generate standalone consolidated HTML reports with screenshots

Supported by: `@AppiumTestDistribution`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-reporter-plugin
```

### [Wait](https://github.com/AppiumTestDistribution/appium-wait-plugin)

Manage global element wait timeouts

Supported by: `@AppiumTestDistribution`

```sh title="Install This Plugin"
appium plugin install --source=npm appium-wait-plugin
```


--- SOURCE: en/ecosystem/tools.md ---

---
title: Appium-Related Tools
---

The Appium ecosystem also includes several tools that have been created to assist with things not
directly related to running tests, such as Appium installation, test development, and more.

!!! note

    If you maintain an Appium tool that you would like to be listed here, feel free to create a PR!

## Official Tools

These tools are currently maintained by the Appium team:

### [Appium Inspector](https://appium.github.io/appium-inspector/)

Appium has a graphical client which can be used to inspect application screenshots, view the
application hierarchy, search for elements, run Appium commands, record app interactions, and more.
It can be very useful for Appium test development.

=== "Install as an Appium Plugin"

    ```bash
    appium plugin install inspector
    ```
=== "Install Standalone"

    Download the app from the Appium Inspector repo's [GitHub Releases section](https://github.com/appium/appium-inspector/releases).

### [Appium MCP](https://github.com/appium/appium-mcp)

Appium MCP is a Model Context Protocol (MCP) server that provides mobile test development and
automation capabilities using Appium.

```json title="Install This Tool"
// Add the following to your MCP client configuration
{
  "appium-mcp": {
    "disabled": false,
    "timeout": 100,
    "type": "stdio",
    "command": "npx",
    "args": ["appium-mcp@latest"],
    "env": {
      "ANDROID_HOME": "/path/to/android/sdk"
    }
  }
}
```

## Extension Tools

Appium driver or plugin developers can choose to include these tools in their driver/plugin:

### Appium Doctor

The Appium Doctor tool can be used to validate whether all prerequisites and other environment
details needed for the driver/plugin have been set up correctly. The tool can be accessed via the
[`doctor` command in the Appium CLI](../reference/cli/extensions.md#doctor):

```sh
appium {driver|plugin} doctor <extension-name>
```

It shows no results if the driver/plugin does not have such validation checks.

!!! note

    If you maintain an Appium extension and would like to add Appium Doctor support for it, check
    out the documentation on [Building Doctor Checks](../developing/build-doctor-checks.md).

## Other Tools

These tools are not maintained by the Appium team:

### [Appium Installer](https://github.com/AppiumTestDistribution/appium-installer)

Appium Installer is a command-line tool for simplifying setups of new Appium test environments.
It includes commands for installing Appium, its drivers and plugins, as well as validating
prerequisites for iOS or Android emulators or real devices.

Supported by: `@AppiumTestDistribution`

```sh title="Install This Tool"
npm install -g appium-installer
```


--- SOURCE: en/intro/clients.md ---

---
hide:
  - toc

title: Intro to Appium Clients
---

For all the reasons discussed in the [main Overview](./appium.md), Appium is based on the [W3C
WebDriver specification](https://w3c.github.io/webdriver/). This means that
Appium implements a client-server architecture. The server (consisting of Appium itself along with
any drivers or plugins you are using for automation) is connected to the devices under test, and
is actually responsible for making automation happen on those devices. The client (driven by *you*,
the Appium test author) is responsible for sending commands to the server over the network, and
receiving responses from the server as a result. These responses can be used to tell whether
automation commands are successful, or might contain information that you queried about the state
of the application. This document is a conceptual introduction to the client side of this equation.

!!! info

    For more about the server side of the equation (i.e., how does Appium actually control
    devices?), check out our [Intro to Appium Drivers](./drivers.md). To skip to a list of links to
    Appium client libraries, check out the [list of clients](../ecosystem/clients.md).

What sorts of automation commands are available? That is up to the particular driver and plugins
that you are using in any given session. A standard set of commands would include, for example, the
following:

- Find Element
- Click Element
- Get Page Source
- Take Screenshot

If you look at these commands in the WebDriver specification, you'll notice that they are not
defined in terms of any particular programming language. They are not Java commands, or JavaScript
commands, or Python commands. Instead, they form part of an HTTP API which can be accessed from
within *any* programming language (or none! you could just use cURL if you want).

So, for example, the `Find Element` command corresponds to an HTTP `POST` request sent to the HTTP
endpoint `/session/:sessionid/element` (where in this case, `:sessionid` is a placeholder for the
unique session ID generated by the server in a previous call to `Create Session`).

This information is primarily useful for people developing technology that works with the WebDriver
spec. It's not particularly useful for people trying to write Appium or Selenium tests. When you
write an Appium test, you want to use a programming language you're familiar with. Luckily, there
exist a set of [Appium client libraries](../ecosystem/clients.md)[^1] that take care of the
responsibility of speaking HTTP to the Appium server. Instead, they expose a set of "native"
commands for a particular programming language, so that, to the test author, it just feels like
you're writing Python, or JavaScript, or Java.

As an example, here's the same simple set of Appium commands in five different programming
languages, using the recommended Appium client binding for each language (note that this is not
working sample code including all appropriate imports; see each client library's instructions for
setup and command reference):

=== "JavaScript (Webdriver.io)"

    ```js
    const element = await driver.$('//*[@text="Foo"]');
    await element.click();
    console.log(await element.getText())
    console.log(await driver.getPageSource())
    ```

=== "Java"

    ```java
    WebElement element = driver.findElement(By.Xpath("//*[@text='Foo']"))
    element.click()
    System.out.println(element.getText())
    System.out.println(driver.getPageSource())
    ```

=== "Python"

    ```py
    element = driver.find_element(by=By.XPATH, value='//*[@text="Foo"]')
    element.click()
    print(element.text)
    print(driver.page_source)
    ```

=== "Ruby"

    ```rb
    element = driver.find_element :xpath, '//*[@text="Foo"]'
    element.click
    puts element.text
    puts driver.page_source
    ```
    
=== "C#"

    ```dotnet
    AppiumElement element = driver.FindElement(MobileBy.AccessibilityId("Views"));   
    element.click();
    System.Console.WriteLine(element.Text);
    System.Console.WriteLine(driver.PageSource);
    ```
    
Each of these scripts, despite being in different languages, does the same thing under the hood:

1. Call `Find Element` with a `using` parameter of `xpath` and a `value` parameter expressing the
   XPath query used to find an element. (If you're confused about these terms, you might find an
   introduction to Appium or Selenium useful)
2. Call `Click Element` with the ID of the element found in the previous call.
3. Call `Get Element Text` with the ID of the same element, and print it to the console.
4. Call `Get Page Source` to retrieve the page/app source and print it to the console.

The only other thing to keep in mind before choosing or using a client is that each client is
independently maintained. Just because a feature is available in one client, it doesn't mean it's
available in another client (though all clients support at least the standard W3C protocol plus any
common appium extensions). Just because one client has a nice set of helper functions, doesn't mean
another will. Some clients are kept very frequently up to date, and others are not! So when
thinking about choosing a library, the first consideration is the language you want to use, and the
second consideration is how full-featured and well-maintained the library is!

To learn how to use an Appium client, visit that client's homepage to learn more. In many cases,
the Appium client for a given language is built *on top of* the *Selenium* client for that
language, and so certain Appium clients may only document the features which the Appium client
added on top of the Selenium client. All that to say, for a full reference, you may need to visit
both the Appium client documentation as well as the Selenium client documentation.

That's all you need to know about Appium clients! Head over to the
[Clients](../ecosystem/clients.md) page to check out the current list of clients.

[^1]: These libraries are alternately called "clients", "client libraries", or "client bindings".
  They all mean the same thing!


--- SOURCE: en/intro/appium.md ---

---
title: How Does Appium Work?
---

As mentioned on the main page, Appium is an open-source project and ecosystem of related software,
designed to facilitate UI automation of many app platforms. With the release of Appium 2, Appium
has the following primary goals:[^1]

- Make platform-specific automation capabilities available under a cross-platform, standard API
- Allow easy access to this API from any programming language
- Provide tools to enable convenient community development of Appium extensions

[^1]:
    To meet these primary goals, we also work with a set of secondary goals or methodology
    principles, which we also encourage for Appium extension developers:

    - As far as possible, rely on (and contribute to) open source technology
    - As far as possible, rely on vendor-provided tools for a given platform
    - As far as possible, rely on automation tools that allow automation of unmodified apps (prefer
      not to require the user to build in additional SDKs or software that introduce discrepancies
      between the test version of the app and the production version)
    - As far as possible, rely on existing standards instead of creating new ones

So, take any app platform you know about, like iOS or Android. Appium wants for there to be a way
for developers and testers to write UI automation code for that platform, according to a single,
unified API. Based on Appium's goals, we have a lot of questions to answer to make it all work:

- Which API should that "single, unified" API be?
- How do we map that API to automation behaviour for a specific platform?
- How do we make that API accessible via multiple popular programming languages?

There's another, larger, question lurking in the background here too, given that there are more app
platforms out there than just iOS and Android:

- How do we enable automation for *all* the platforms?

Exploring Appium's answers to these questions may not be the quickest way to learn what Appium is,
but it is certainly a good one! So let's dive in.

## Appium's choice of API

Appium is very fortunate to have been preceded by a technology which has been a long-standing
pioneer in the field of UI automation, namely [Selenium](https://selenium.dev). The goal of the
Selenium project has been to support UI automation of web browsers, and in this way we can think of
it as occupying a subset of Appium's goals. Along the way, Selenium (and, after they merged,
another project called WebDriver) developed a relatively stable API for browser automation.

Over the years, Selenium worked with various web browser vendors and the [W3C](https://w3.org)
standards group to turn its API into an official web browser standard, called the [WebDriver
specification](https://w3c.github.io/webdriver/). All the main browsers now
implement automation capabilities inline with the WebDriver spec, without the Selenium team having
to maintain any software that performs actual automation; standards for the win!

Appium's initial goals were to develop an automation standard for mobile apps (iOS and Android). We
could have made up something new, but in the spirit of joining forces and keeping standards, well,
standard, we decided to adopt the WebDriver spec as Appium's API.[^2] While user interaction on
websites and in mobile native apps are not entirely identical (with even greater differences once
we start to consider, for example, TV platforms controlled by simple remotes), the fact is that
most software UIs are pretty much the same. This means that the WebDriver spec provides automation
API primitives (finding elements, interacting with elements, loading pages or screens, etc...) that
more or less map to any platform.

[^2]: Technically, when Appium was first written, we were dealing with something older than the
  WebDriver spec, called the JSON Wire Protocol. Since then, Appium continued to evolve along with
  the W3C spec and is fully W3C-compliant.

Of course, Appium wants to support the cases where user interaction *does* differ from web to
mobile or web to TV, and so Appium also makes use of the built-in *extensibility* of the WebDriver
spec. The result is that, no matter what platform you want to automate, when you use Appium, you
will do so using the standard WebDriver spec, with two caveats:

- We might not have any way to support a particular WebDriver API command on a given platform, and
  so some commands might be unsupported (for example, getting or setting cookies is not possible in
  the world of native mobile app automation).
- We might support automation behaviours that go *beyond* what's available in the WebDriver API
  command list, though any such commands will be valid and spec-compliant extensions to the
  WebDriver API.

How do you actually *use* the WebDriver API, particularly in the context of Appium? We'll cover
that in the [section below](#universal-programming-language-access) on how Appium provides
universal programming language access. All you need to know for now is that the way Appium
introduces a universal UI automation interface is by implementing the WebDriver protocol.

## Platform automation behaviour

The next question is, how does Appium map this protocol to automation behaviour on a wide range of
platforms? The trick is that, strictly speaking, Appium doesn't! It leaves this responsibility up
to a kind of software module called an Appium *driver*. There's a whole [Driver
Introduction](./drivers.md) which you can read next, so we won't go into huge detail on how they
work for now.

What's important to understand at the moment is that a driver is kind of like a pluggable module
for Appium that gives Appium the power to automate a particular platform (or set of platforms,
depending on the goal of the driver). At the end of the day, a driver's responsibility is to simply
implement an Appium-internal interface representing the WebDriver protocol. How it implements this
interface is totally up to the driver, based on its strategy for making automation happen on
a specific platform. Typically, and with a lot more complexity and difficulty in the details,
a driver does this by relying on platform-specific automation technologies. For example, Apple
maintains an iOS automation technology called
[XCUITest](https://developer.apple.com/documentation/xctest/user_interface_tests). The Appium
driver that supports iOS app automation is called the [XCUITest
Driver](https://github.com/appium/appium-xcuitest-driver) because ultimately what it does is
convert the WebDriver protocol to XCUITest library calls.

One of the reasons that drivers are independent, pluggable modules is that they work completely
differently from one another. The tools and requirements for building and using drivers for
different platforms are completely different. And so Appium lets you use just the drivers that you
need for your automation tasks. Choosing drivers and installing them so that you can use them with
your Appium instance is so important that Appium has its very own [CLI for managing
drivers](../reference/cli/extensions.md).

So, to answer our original question, the way that Appium provides access to automation capabilities
for a given platform is that the Appium team (or anyone else[^3]) writes a *driver* for that
platform, implementing as much or little of the WebDriver protocol as desired. The driver can then
be installed by anyone using Appium.

[^3]: You can build and share your own drivers! Check out [Building
  Drivers](../developing/build-drivers.md) to learn more about how to develop drivers in Node.js
  that can be used with Appium.

## Universal programming language access

But what does it mean, or look like, to *use* Appium, anyway? Since Appium is ultimately a Node.js
program, it *could* have looked like importing Appium and its drivers as libraries into your own
Node.js programs. But that wouldn't meet Appium's goal of providing automation capabilities to
people using any popular programming language.

Luckily, the fact that Appium rode in on Selenium's coattails meant that we had a solution to this
problem from day one. You see, the WebDriver specification is actually an HTTP-based protocol,
meaning it is designed to be used over a network rather than within the memory of a single program.

One of the main benefits of this "client-server" architecture is that it allows the automation
implementer (the thing doing the automation, in this case the 'server') to be completely distinct
from the automation runner (the thing defining what automation should be done, in what steps,
etc..., in this case the 'client'). Basically, all the "hard stuff" (actually figuring out how to
make automation happen on a given platform) can be handled in one place by the server, and "thin"
client libraries can be written in any programming language which simply encode HTTP requests to
the server in language-appropriate way. It's possible, in other words, to bring basic Appium
/ WebDriver capabilities to a new programming language relatively easily, assuming high-level HTTP
libraries exist, simply by coding up a basic HTTP client in that language.

There are a couple important takeaways here for you, the Appium user:

- Appium is an *HTTP server*. It must run as a process on some computer for as long as you want to
  be able to use it for automation. It must be accessible on the network to whichever computer you
  want to use to run the automation from (whether that is the same machine or one across the
  world).
- Unless you want to write raw HTTP calls or use cURL, using Appium for automation involves the use
  of an [Appium Client](clients.md) in the language of your choice. The goal of each of these
  clients is to encapsulate the WebDriver protocol so that rather than worrying about the protocol
  itself, you can work with objects and methods that feel idiomatic for your language.
- The Appium server and the Appium client do *not* need to be running on the same computer. You
  simply need to be able to send HTTP requests from the client to the server over some network.
  This greatly facilitates the use of cloud providers for Appium, since they can host the Appium
  server and any related drivers and devices, and all you need to do is point your client script to
  their secure endpoints.

And of course, none of this is about "testing" per se, purely about the use of Appium and its
client libraries for automation purposes. If you want to do automation for the purpose of
"testing", you'll likely want to enlist the help of test runners, test frameworks, and the like,
none of which need be related to Appium; one of the benefits of Appium's "universal accessibility"
is that it plays well with whatever set of tools you find most beneficial for your situation.

## Appium's huge scope

Appium's vision (automation of everything under a single API) is huge! Certainly, much bigger than
the team of core maintainers for the open source project. So how does Appium hope to achieve this
goal? Basically, by empowering the community to develop functionality on top of Appium as
a *platform*. This is what we call the Appium "ecosystem".

The Appium team does officially maintain a few drivers itself (for example, the XCUITest driver
that we spoke about earlier). But it cannot hope to have the platform-specific expertise or the
capacity to maintain drivers for many different platforms. But what we have done, particularly
beginning with Appium 2, is to provide tools to empower the community to join in our vision:

- Anyone can create a driver simply by creating a Node.js module that conforms to the appropriate
  conventions and implements any (sub|super)set of the WebDriver protocol. Creating a driver often
  involves a minimal amount of code because the WebDriver protocol details are abstracted away, and
  many helper libraries are available---the same libraries that power the Appium team's own
  drivers.
- Sharing drivers with others is easy using the Appium driver CLI. There is no central authority.
  Anyone can share drivers publicly or privately, for free or for sale. Drivers can be open or
  closed source (though obviously we appreciate open source!).

Appium's vision of being a platform for development extends beyond the support of automation for
all app platforms. As a popular automation tool, there are many opportunities for integrating
Appium with all kinds of other tools and services. In addition, there are many feature ideas for
Appium, either as a core server or in its incarnation across various drivers, which the core team
will never have time to build. And so, with Appium 2, Appium has released a plugin system that
enables anyone to build and share modules that change how Appium works!

In the same way that drivers are easily shareable and consumable via the Appium driver CLI, plugins
can be published and consumed via a parallel [Plugin CLI](../reference/cli/extensions.md). Plugins
can do all sorts of things, for example adding the ability for Appium to find and interact with
screen regions based on a template image (as in the [`images`
plugin](https://github.com/appium/appium/tree/master/packages/images-plugin)). There are very few
limitations on what you can do with plugins, so you might also be interested in learning how to
[Build Plugins](../developing/build-plugins.md) in Node.js that can be used with Appium.

So that's Appium: an extensible, universal interface for the UI automation of potentially
everything! Read on into some of the specific intro docs for more details, or check out the various
guides to dive into some more general concepts and features of Appium.


--- SOURCE: en/intro/history.md ---

---
title: Appium Project History
---

Appium has been around in one form or another since 2012. It's been under the
direction of various individuals and organizations, and it's even been
implemented in 3 different programming languages! Welcome to more than you ever
wanted to know about how Appium got to be what is it today...

## Early Inspiration

[Dan Cuellar](https://twitter.com/thedancuellar) was the Test Manager at Zoosk
in 2011, when he encountered a problem. The length of the test passes on the
iOS product was getting out of hand. Less testing was an option, but would come
with additional risk, especially with it taking several days to get patches
through the iOS App Store Review process. He thought back to his days working
on websites and realized automation was the answer.

Dan surveyed the existing landscape of tools, only to find that all of them
hand major drawbacks. The tool supplied by Apple, UIAutomation, required tests
to be written in JavaScript, and did not allow for real-time debugging or
interpretation. It also had to be executed inside the Xcode profiling tool,
Instruments. Other 3rd-party tools used private APIs and required SDKs and HTTP
Servers to be embedded into the application. This seemed highly undesirable.

Unsatisfied with the existing options, Dan asked his manager for some
additional time to see if he could find a better way. He spent 2 weeks poking
and prodding around to see if there was a way to use approved Apple
technologies to automate an iOS application. The first implementation he tried
used AppleScript to send messages to Mac UI elements using the OS
X accessibility APIs. This worked to some degree, but would never work on real
devices, not to mention other drawbacks.

So he thought, what if I could get the UIAutomation framework to run in real
time like an interpreter? He looked into it and he determined that all he would
need to do is find a way to receive, execute, and reply to commands from within
a UIAutomation javascript program. Using the utility Apple provided for
executing shell commands he was able to `cat` sequentially ordered text files
to receive commands, `eval()` the output to execute them, and write them back
to disk with `python`. He then prepared code in C# that implemented the
Selenium-style syntax to write the sequentially ordered javascript commands.
iOSAuto is born.

## Selenium Conference 2012

Dan was selected to speak at Selenium Conference 2012 in London about an
entirely different topic. As part of his presentation, he showed off iOS
Automation using Selenium syntax to demonstrate writing platform-agnostic tests
that use separate platform-specific page objects with a common interface. To
his surprise, the cool test architecture would take a backseat to the spectacle
of iOS tests running like WebDriver tests. Several people suggested that he
give a lightning talk later in the conference to explain exactly how it worked.

On the second day of the conference, Dan stepped up on stage to give the
lightning talk.  Jason Huggins, co-creator of Selenium, moderated the lightning
talks.  Dan experienced technical difficulties getting his presentation to
load, and Jason nearly had to move on to the next lightning talk.  At the last
moment, the screen turned on and Dan jumped into his presentation. He explained
the details of his implementation and how it worked, begged for contributors,
and in five minutes it was over. The crowd applauded politely, and he left the
stage.

## The Phone Rings

Four months after the Selenium Conference, Jason called Dan. Jason had been
working on iOS testing support for a client at Sauce Labs.  Jason remembered
Dan's lightning talk and thought the project might be useful to Jason's work,
but Dan's source code was not public. Jason asked Dan to meet up.  Later that
week, Dan met Jason in a bar in San Francisco and showed him the source code
for iOS Auto.

A long-time open source advocate, Jason encouraged Dan to release his code
under an open source license.  In August, Dan [released the source
code](https://github.com/penguinho/appium-old/commit/3ab56d3a5601897b2790b5256351f9b5af3f9e90)
on GitHub in C#. Jason encouraged Dan to change the language to make the
project more appealing to potential contributors. Dan [uploaded a new version
in
Python](https://github.com/penguinho/appium-old/commit/9b891207be0957bf209a77242750da17d3eb8eda).
In September, Jason added a web server and [began to implement the WebDriver
wire
protocol](https://github.com/hugs/appium-old/commit/ae8fe4578640d9af9137d0546190fa29317d1499)
over HTTP, making iOS Auto scriptable from any Selenium WebDriver client
library in any language.

## The Mobile Testing Summit

Jason decided that the project should be presented at the [Mobile Testing
Summit](https://twitter.com/mobtestsummit) in November, but suggested that the
project get a new name first. Many ideas were thrown out and they settled on
AppleCart. A day later, while he was perusing some of Apple's guidance on
copyright and trademarks, Jason noticed that under the section of examples for
names Apple would defend its trademarks against, the first example was
"AppleCart". He called Dan and informed him of the situation, and they
brainstormed for a bit before Jason hit the jackpot. Appium... Selenium for
Apps.

## Sauce Labs and Node.js

In January 2013, not long after the Mobile Testing Summit, Sauce Labs decided
to fully back Appium and provide more developer power. A task force was created
to evaluate the current state and how best to move forward with the project.
The team, which included Jonathan Lipps (the current project lead), decided
that Appium needed a rebirth, and ultimately settled on Node.js as the
framework to use. Node is well-known as a fast and efficient web server
backend, and at the end of the day, Appium is just a highly-specialized web
server. It was also decided that JavaScript as a language was accessible enough
that Appium would be able to grow into a larger community of open-source
developers with JavaScript than the other options on the table.

In just a few days, the team leveraged the existing work on Appium and had
a new version of Appium with as much functionality as the previous Python
version. The foundation had been laid for Appium's basic architecture, and we
have been successfully building on it since. A few weeks into this sprint,
Jonathan Lipps was formally designated project lead and he began to strategize
how to get more people from the community involved with Appium's development.

## Appium Around the World

Ultimately, Jonathan decided that getting Appium in front of as many developers
at conferences and meetups was the best way to attract users and contributions.
Appium in its new incarnation was debuted at the [Google Test Automation
Conference 2013](https://www.youtube.com/watch?v=1J0aXDbjiUE). Later in 2013,
Appium was presented at conferences and meetups all around the US, as well as
in England, Poland, Portugal, and Australia. Notably, Jonathan had Appium
[perform as instruments in a band](https://www.youtube.com/watch?v=zsbNVkayYRQ)
and Dan Cuellar put together a fun [Appium video
montage](https://www.youtube.com/watch?v=xkzrEn0v0II) for Selenium Conference.

But during all these presentations and conferences, the project continued to
develop. Early in 2013 we released Android and Selendroid support, making
Appium the first truly cross-platform automation framework. The project also
continued to attract users and contributors, and by the end of 2013, we'd
already had well over 1,000 commits.

## The Road to Appium 1.0

Appium began to grow and mature significantly. In May 2014,
we released Appium 1.0, which stood as a milestone in Appium's development.
Appium was given
[various](https://www.prnewswire.com/news-releases/black-duck-announces-black-duck-open-source-rookies-of-the-year-winners-242383341.html)
[awards](https://www.infoworld.com/article/2241247/164642-bossie-awards-2014-the-best-open-source-application-development-tools.html)
and became the most popular open-source cross-platform mobile automation
framework. Stability improved, bugs were prioritized and fixed, and features
added. Sauce Labs increased the number of developers it donated to working
on Appium, but the entire community stayed involved in guiding the project and
contributing to it, and project governance continued to happen in the open, on
public mailing lists and GitHub's issue tracker.

## The Appium Umbrella Broadens

Eventually, it became clear that the Appium codebase was not optimized for
a large team of distributed, sometime contributors. We took the opportunity as
a committer team to rewrite Appium from the ground up, using a more modern
version of the JavaScript language, and redoing Appium's architecture so that
it was easy for users or third-party developers to build their own Appium
"drivers". We wanted for it to be easier for new contributors to get ramped up
on the Appium codebase, and to see support for new platforms added to Appium by
groups other than the core team. That vision has begun to be fulfilled, with
groups like Microsoft and Youi.tv adding drivers to Appium for Windows desktop
app automation and Youi.tv app automation, respectively.

## Appium To The People

In late 2016, Sauce Labs donated Appium as a project to the [JS
Foundation](https://js.foundation), in order to cement for the world Sauce's
commitment that Appium remains open source. The JS Foundation is a non-profit
open source stewardship organization which takes responsibility for holding the
copyright for open source projects, as well as ensuring they have a long and
successful tenure in the community. As a result of our move to a non-profit
foundation, we hope that the door will open even more widely for new
contributors, either as individuals or representing one of the many companies
which now have an interest in seeing Appium move forward.

Eventually, the JS Foundation merged into the [OpenJS Foundation](https://openjsf.org),
and Appium became an Impact Project in the foundation.

## Appium 2.0

Appium 2 was released in 2023 and introduced an entirely revamped architecture, shifting focus to Appium
as an ecosystem rather than an all-in-one project. This unlocked the ability for anyone to develop
and share their own Appium extensions (drivers and plugins), opening up a world of possibilities
for automation-related development for platforms far beyond iOS and Android! As a result,
many third-party extensions were created, such as new drivers for Flutter and Windows, plugins for
mocking APIs and managing device farms, new Appium clients based on Rust and Swift, and much more.

Around this time was also when we started a sponsorship program for Appium, which attracted various
major and minor sponsors alike. This allowed us to give back to the Appium community, by compensating
contributors for their voluntary work on the project.

## Appium 3.0

2025 saw the release of Appium 3. This update was a lot smaller than Appium 2 and included only a
few behavioral changes, instead focusing on removing deprecated code and updating compatibility for
more modern ecosystems. Still, this reduced scope was also to be expected: since Appium 2, the
main feature development efforts had shifted to individual drivers and plugins, many of which had
gone through multiple major updates during the Appium 2 era.


--- SOURCE: en/intro/drivers.md ---

---
title: Intro to Appium Drivers
---

As the [main Overview](./appium.md) makes clear, "drivers" are basically Appium's answer to the
question, "how do we support automation of multiple, unrelated platforms?" In this doc we'll get
into a little more detail about how drivers work. The specific details of how drivers work probably
don't matter too much for you, unless you're planning on writing your own driver or contributing to
an existing driver (things we hope you do!).

The main benefit in understanding a bit more of how drivers work is that being aware of the typical
complexity or the typical driver architecture will inform your debugging process when you
inevitably run into an issue in one of your tests.

## Interface Implementations

At the most basic level, drivers are simply Node.js classes that extend a special class included in
Appium, called `BaseDriver`. You could have something very close to a "working" driver, with these
very simple lines of code:

```js
import BaseDriver from '@appium/base-driver'

class MyNewDriver extends BaseDriver {
}
```

This empty driver doesn't *do* anything, but you could wrap it up in a Node.js module, add a few
Appium-related fields to the module's manifest (`package.json`), and then install it using `appium
driver install`.

So, from a technical perspective, an Appium driver is just a bit of code that inherits from some
other Appium code. That's it! Now, inheriting from `BaseDriver` actually gives us a lot, because
`BaseDriver` is essentially an encapsulation of the entire WebDriver protocol. So all a driver
needs to do something useful is to *implement* Node.js methods with names corresponding to
their WebDriver protocol equivalents.

So let's say I wanted to do something with this empty driver; first I have to decide which
WebDriver command I want to implement. For our example, let's take the [Navigate
To](https://w3c.github.io/webdriver/#navigate-to) WebDriver command. Leave aside for the moment
what I want to have the driver *do* when this command is executed. To tell Appium the driver can
handle the command, all we have to do is define a method like this in our driver class:[^1]

```js
async setUrl(url) {
    // do whatever we want here
}
```

[^1]: You might notice that `setUrl` doesn't look anything like `Navigate To`, so how did we know
  to use it rather than some other random string? Well, Appium's WebDriver-protocol-to-method-name
  mapping is defined in a special file within the `@appium/base-driver` package called
  [routes.js](https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/routes.js).
  So if you're writing a driver, this is where you would go to figure out what method names to use
  and what parameters to expect. Or you could look at the source for any of the main Appium
  drivers!

That's it! How we actually implement the command is totally up to us, and depends on the
platform(s) we want to support. Here are some different example implementations of this command for
different platforms:

- Browsers: execute some JavaScript to set `window.location.href`
- iOS apps: launch an app using a deep link
- Android apps: launch an app using a deep link
- React apps: load a specific route
- Unity: go to a named scene

So you can see there can be a lot of differences between how drivers implement the same WebDriver
command across platforms.[^2] What is the *same*, though, is how they express that they can handle
a protocol command.

[^2]: Of course, we want to keep the semantics as similar as possible, but in the world of iOS, for
  example, launching an app via a deep link (a URL with a special app-specific scheme) is about as
  close as we are going to get to navigating to a web URL.

We're going into this great amount of detail (which you don't need to remember, by the way),
because it's important to stress the point that an Appium driver is not inherently anything in
particular, other than a bit of JS code that can handle WebDriver protocol commands. Where you go
from there is up to you, the driver author!

## Automation mapping

But *typically* what driver authors want to do is to provide automation behaviours for a given
platform(s) that are semantically very similar to the the WebDriver spec implementations for
browsers. When you want to find an element, you should get a reference to a UI element. When you
want to click or tap that element, the resulting behaviour should be the same as if a person were
to click or tap on the element. And so on.

So the real challenge for driver authors is not how to work with the WebDriver protocol (because
`BaseDriver` encapsulates all that for you), but how to make the actual automation happen on the
target platform. Every driver relies on its own set of underlying technologies here. As mentioned
in the [Overview](index.md), the iOS driver uses an Apple technology called
[XCUITest](https://developer.apple.com/documentation/xctest/xcuielement). These underlying
automation technologies usually have proprietary or idiosyncratic APIs of their own. Writing
a driver becomes the task of mapping the WebDriver protocol to this underlying API (or sometimes
a set of different underlying APIs--for example, the UiAutomator2 driver relies not only on the
[UiAutomator2](https://developer.android.com/training/testing/other-components/ui-automator)
technology from Google, but also functions only available through
[ADB](https://developer.android.com/tools/adb), as well as functions only available
via the Android SDK inside a helper app). Tying it all together into a single, usable, WebDriver
interface is the incredibly useful (but incredibly challenging) art of driver development!

## Multi-level architecture

In practice, this often results in a pretty complex architecture. Let's take iOS for example again.
The XCUITest framework (the one used by the Appium driver) expects code that calls it to be written
in Objective-C or Swift. Furthermore, XCUITest code can only be run in a special mode triggered by
Xcode (and directly or indirectly, the Xcode command line tools). In other words, there's no
straightforward way to go from a Node.js function implementation (like `setUrl()` above) to
XCUITest API calls.

What the XCUITest driver authors have done is instead to split the driver into two parts: one part
written in Node.js (the part which is incorporated into Appium and which initially handles the
WebDriver commands), and the other part written in Objective-C (the part which actually gets run on
an iOS device and makes XCUITest API calls). This makes interfacing with XCUITest possible, but
introduces the new problem of coordination between the two parts.

The driver authors could have chosen any of a number of very different strategies to model the
communication between the Node.js side and the Objective-C side, but at the end of the day decided
to use ... the WebDriver protocol! That's right, the Objective-C side of the XCUITest driver is
itself a WebDriver implementation, called
[WebDriverAgent](https://github.com/appium/webdriveragent).[^3]

[^3]: You could in theory, therefore, point your WebDriver client straight to WebDriverAgent and
  bypass Appium entirely. This is usually not convenient, however, for a few reasons:

  - The Appium XCUITest driver builds and manages WebDriverAgent for you, which can be a pain and
    involves the use of Xcode.
  - The XCUITest driver does lots more than what can be done by WebDriverAgent, for example working
    with simulators or devices, installing apps, and the like.

The moral of the story is that driver architectures can become quite complicated and multilayered,
due to the nature of the problem we're trying to solve. It also means it can be difficult sometimes
to tell where in this chain of technologies something has gone wrong, if you run into a problem
with a particular test. With the XCUITest world again, we have something like the following set of
technologies all in play at the same time:

- Your test code (in its programming language) - owned by you
- The Appium client library - owned by Appium
- The Selenium client library - owned by Selenium
- The network (local or Internet)
- The Appium server - owned by Appium
- The Appium XCUITest driver - owned by Appium
- WebDriverAgent - owned by Appium
- Xcode - owned by Apple
- XCUITest - owned by Apple
- iOS itself - owned by Apple
- macOS (where Xcode and iOS simulators run) - owned by Apple

It's a pretty deep stack!

## Proxy mode

There's one other important architectural aspect of drivers to understand. It can be exemplified
again by the XCUITest driver. Recall that we just discussed how the two "halves" of the XCUITest
driver both speak the WebDriver protocol---the Node.js half clicks right into Appium's WebDriver
server, and the Objective-c half (WebDriverAgent) is its own WebDriver implementation.

This opens up the possibility of Appium taking a shortcut in certain cases. Let's imagine that the
XCUITest driver needs to implement the `Click Element` command. The internal code of this
implementation would look something like taking the appropriate parameters and constructing an HTTP
request to the WebDriverAgent server. In this case, we're basically just reconstructing the
client's original call to the Appium server![^4] So there's really no need to even write a function
implementing the `Click Element` command. Instead, the XCUITest driver can just let Appium know
that this command should be proxied directly to some other WebDriver server.

[^4]: It's not *exactly* the same call, because the Appium server and the WebDriverAgent server
  will generate different session IDs, but these differences will be handled transparently.

If you're not familiar with the concept of "proxying," in this case it just means that the XCUITest
driver will not be involved at all in handling the command. Instead it will merely be repackaged
and forwarded to WebDriverAgent at the protocol level, and WebDriverAgent's response will likewise
be passed back directly to the client, without any XCUITest driver code seeing it or modifying it.

This architectural pattern provides a nice bonus for driver authors who choose to deal with the
WebDriver protocol everywhere, rather than constructing bespoke protocols. It also means that
Appium can create wrapper drivers for any other existing WebDriver implementation very easily. If
you look at the [Appium Safari driver](https://github.com/appium/appium-safari-driver) code, for
example, you'll see that it implements basically no standard commands, because all of these are
proxied directly to an underlying SafariDriver process.

It's important to understand that this proxying business is sometimes happening under the hood,
because if you're ever diving into some open source driver code trying to figure out where
a command is implemented, you might be surprised to find no implementation at all in the Node.js
driver code itself! In that case, you'll need to figure out where commands are being proxied to so
you can look there for the appropriate implementation.

OK, that's enough for this very detailed introduction to drivers!


--- SOURCE: en/intro/index.md ---

---
hide:
  - toc

title: Appium in a Nutshell
---

As mentioned on the main page, Appium aims to support UI automation of many _different platforms_
(mobile, web, desktop, etc.). Not only that, but it also aims to support automation code written in
_different languages_ (JS, Java, Python, etc.). Combining all of this functionality in a single
program is a very daunting, if not impossible task!

In order to achieve this, Appium is effectively split into four parts:

<div class="grid cards" markdown>

-   :material-image-filter-center-focus-strong: __Appium Core__ - defines the core APIs
-   :material-car: __Drivers__ - implement connectivity to specific platforms
-   :octicons-code-16: __Clients__ - implement Appium's API in specific languages
-   :fontawesome-solid-plug: __Plugins__ - change or extend Appium's core functionality

</div>

Therefore, in order to start automating something with Appium, you need to:

- Install Appium itself
- Install a driver for your target platform
- Install a client library for your target programming language
- (Optional) install one or more plugins

These are the basics! If you are ready to jump in, proceed with the [Quickstart](../quickstart/index.md)!

If you wish to learn more details about how it all works, see these pages for background material:

- [Appium Core](./appium.md)
- [Appium Drivers](./drivers.md)
- [Appium Clients](./clients.md)

Finally, to learn about the origins of Appium, check out the [Appium Project History](./history.md).


--- SOURCE: en/developing/build-doctor-checks.md ---

---
title: Building Doctor Checks
---

The idea of Appium Doctor is to assist users with driver or plugin preconditions setup. Sometimes such
preconditions might be quite complicated and require non-trivial technical knowledge. Doctor checks,
which are vanilla Node.js class instances written by extension authors, simplify
the setup process by automating diagnostics and possible fixes for the found issues. These checks
might also be interactive to ensure better usage experience.

This tutorial is supposed to be used by plugin or driver authors that would like to help their users
to deal with complicated setup or configuration steps.

## Adding Doctor Checks

### Typing Requirements

The term `Doctor Check` literally describes a single javascript class instance that implements the
[IDoctorCheck interface](https://github.com/appium/appium/blob/master/packages/types/lib/doctor.ts).
The interface defines the following methods and properties:

- `diagnose(): Promise<DoctorCheckResult>`: Contains the code to diagnose a possible issue
- `fix(): Promise<string|null>`: Either fixes the actual problem if `hasAutofix()` returns true or
  returns a string description for possible manual fixes. If this method throws an exception named
  `FixSkippedError` and `hasAutofix()` returns true then the result of the method invocation
  is going to be ignored.
- `hasAutofix(): boolean`: Whether calling `fix()` would resolve the found issue
- `isOptional(): boolean`: Whether the found issue can be ignored and is not a showstopper
- `log: AppiumLogger`: May be used for logging. This property may be assigned
  by the instance itself or by the Appium server if it is left unassigned.

The `DoctorCheckResult` object returned by the `diagnose()` method must contain the following properties:

- `ok: boolean`: Whether the diagnosis found no issues
- `optional: boolean`: Whether the diagnosed issue is safe to ignore
- `message: string`: The text message describing the diagnostic result

### Manifest Requirements

A single extension may export multiple Doctor checks to Appium. In order for these checks to be properly
picked up by the server CLI after the corresponding extension is installed they might be listed in the
package .json manifest under the `appium.doctor.checks` section similar to the definition below:

```json
  // ...
  "appium": {
    "driverName": "fake",
    "automationName": "Fake",
    "platformNames": [
      "Fake"
    ],
    "mainClass": "FakeDriver",
    "schema": "./build/lib/fake-driver-schema.js",
    "scripts": {
      "fake-error": "./build/lib/scripts/fake-error.js",
      "fake-success": "./build/lib/scripts/fake-success.js",
      "fake-stdin": "./build/lib/scripts/fake-stdin.js"
    },
    "doctor": {
      "checks": [
        "./doctor/fake1.js",
        "./doctor/fake2.js"
        // ...
      ]
    }
  },
  // ...
```

Also, it makes sense to include the [@appium/types](https://www.npmjs.com/package/@appium/types) import
to the package dev dependencies.

### Implementation Example

The below example is a "raw" Node.JS implementation that does not use any transpilation:

```js
const {fs, doctor} = require('@appium/support');

/** @satisfies {import('@appium/types').IDoctorCheck} */
class EnvVarAndPathCheck {
  /**
   * @param {string} varName
   */
  constructor(varName) {
    this.varName = varName;
  }

  async diagnose() {
    const varValue = process.env[this.varName];
    if (typeof varValue === 'undefined') {
      return doctor.nok(`${this.varName} environment variable is NOT set!`);
    }

    if (await fs.exists(varValue)) {
      return doctor.ok(`${this.varName} is set to: ${varValue}`);
    }

    return doctor.nok(`${this.varName} is set to '${varValue}' but this is NOT a valid path!`);
  }

  async fix() {
    return (
      `Make sure the environment variable ${this.varName} is properly configured for the Appium server process`
    );
  }

  hasAutofix() {
    return false;
  }

  isOptional() {
    return false;
  }
}

const androidHomeCheck = new EnvVarAndPathCheck('ANDROID_HOME');

module.exports = {androidHomeCheck};

/**
 * @typedef {import('@appium/types').DoctorCheckResult} CheckResult
 */
```

This file could be saved as `doctor/android-home-check.js` and then added to the package.json manifest
as

```json
  // ...
  "appium": {
    // ...
    "doctor": {
      "checks": [
        "./doctor/android-home-check.js",
      ]
    }
    // ...
  },
  // ...
```


--- SOURCE: en/developing/config-system.md ---

---
title: Appium's Config System
---

Appium includes support for [configuration files](../guides/config.md). A configuration file is
intended to have (nearly) 1:1 parity with command-line arguments. An end user can supply Appium with
a configuration file, CLI args, or both (the args have precedence over the config file).

This document will be a technical overview of how the configuration system works. It is intended
for Appium contributors, but will also explain the system's fundamental features.

## Reading a Config File

A config file is a JSON, JavaScript, or YAML file which can be validated against a schema. By
default, this file will be named `.appiumrc.{json,js,yaml,yml}` and should be in the root of the
project which depends upon `appium`. Other filenames and locations are supported via the `--config
<file>` flag. For obvious reasons, the `config` argument is disallowed within config files.

In lieu of a separate file, configuration can be embedded in a project's `package.json` using the
`appiumConfig` property, e.g.,:

```json
{
  "appiumConfig": {
    "server": {
      "port": 12345
    }
  }
}
```

When an Appium server is started via the `appium` executable, the `init` function in `lib/main.js`
will call into `lib/config-file.js` to load and/or search for a configuration file and in
`package.json`.

!!! note

    It is not an error if configuration isn't found!

The [`lilconfig`](https://npm.im/lilconfig) package provides the search & load functionality; refer
to its documentation for more information about the search paths. Additionally, Appium provides
support for config files written in YAML via the package [`yaml`](https://npm.im/yaml).

If a config file is found and successfully [validated](#validation), the result will be merged with
a set of defaults and any additional CLI arguments. CLI arguments have precedence over config
files, and config files have precedence over defaults.

## Validation

The same system is used for _both_ validation of config files _and_ command-line arguments.

The package [`ajv`](https://npm.im/ajv) provides validation. Of course, to make `ajv` validate
anything, it must be provided a _schema_.

The _base_ schema is a [JSON Schema
Draft-7](https://json-schema.org/draft/2020-12/json-schema-core.html)-compliant object exported by
`lib/schema/appium-config-schema.js`. This schema defines configuration _native to Appium_, and
only concerns its behavior as a _server_; it does not define configuration for any other
functionality (e.g., the `plugin` or `driver` subcommands).

!!! warning

    Note that this file is the _base_ schema; this will become painfully relevant.

This file is is _not_ a JSON file, because a) JSON is painful to work with for humans, b) is
especially reviled by @jlipps, and c) `ajv` accepts objects, not JSON files.

It is more straightforward to explain how config files are validated, so we'll start there.

### Validating Config Files

When a config file is found (`lib/config-file.js`), it will call the `validate` function exported
from `lib/schema/schema.js` with the contents of the config file. In turn, this asks `ajv` to
validate the data against the schema that Appium has provided it.

If the config file is invalid, errors will be generated to be displayed to the user. Finally, the
`init` function will detect these errors, display them, and the process will exit.

I hope that made sense, because this is the easy part.

### Validating CLI Arguments

As mentioned earlier, the same system is used for validating both config files and CLI arguments.

Totally not judging, but Appium uses [`argparse`](https://npm.im/argparse) for its CLI argument
parsing. This package, and others like it, provides an API to define the arguments a command-line
Node.js script accepts, and will ultimately return an object representation of the user-supplied
arguments.

Just as the schema defines what's allowed in a config file, it also defines what's allowed on the
command-line.

#### Defining CLI Arguments via Schema

CLI arguments must be _defined_ before their values can be validated.

A JSON schema isn't a natural fit for defining CLI args--it needs some grease to make it work--but
it's close enough that we can do so with an adapter and some custom metadata.

In `lib/cli/parser.js`, there's a wrapper around `argparse`'s `ArgumentParser`; it's called (wait
for it)... `ArgParser`. The wrapper exists because we're doing some custom things with `argparse`,
but is has nothing to do with the schema directly.

An `ArgParser` instance is created and its `parseArgs()` method is called with the raw CLI
arguments. The definition of the accepted arguments comes from `lib/cli/args.js` in part--here, all
of the arguments _not_ intended for use with the `server` subcommand are hard-coded (e.g., the
`driver` subcommand and _its_ subcommands). `args.js` also contains a function `getServerArgs()`,
which in turn calls into `toParserArgs` in `lib/schema/cli-args.js`. `lib/schema/cli-args.js` can
be considered the "adapter" layer between `argparse` and the schema.

`toParserArgs` uses the `flattenSchema` function exported by `lib/schema/schema.js`, which
"squashes" the schema into a key/value representation. Then, `toParserArgs` iterates over each
key/value pair and "converts" it into a suitable `ArgumentOption` object for final handoff to
`ArgParser`.

This adapter (`cli-args.js`) is where most of the mess is hidden; let's explore this rat's nest
a bit further.

##### CLI & Schema Incongruities

The conversion algorithm (see function `subSchemaToArgDef` in `lib/schema/cli-args.js`) is mostly
just hacks and special cases neatly packed into a function. Things that don't cleanly map from
`argparse` to a JSON schema include, but are not limited to:

- A schema cannot natively express "store the value of `--foo=<value>` in a property called `bar`" in a schema (this corresponds to the `ArgumentOption['dest']` prop).
- A schema cannot natively express aliases; e.g., `--verbose` can also be `-v`
- A schema `enum` is not restricted to multiple types, but `argparse`'s equivalent `ArgumentOption['choices']` prop _is_
- A schema does not know about `argparse`'s concept of "actions" (note that Appium is not currently using custom actions--though it did, and it could again).
- `argparse` has no native type for `email`, `hostname`, `ipv4`, `uri` etc., and the schema does
- Schema validation only _validates_, it does not perform translation, transformation, or coercion (mostly). `argparse` allows this.
- Schemas allow the `null` type, for whatever reason. Ever pass `null` on the CLI?
- `argparse` does not understand anything other than primitives; no objects, arrays, etc., and certainly not arrays of a particular type.

All of the above cases and others are handled by the adapter.

!!! warning

    Some decisions made in the adapter were arrived at via coin toss. If you are curious about why
    something is the way it is, it's likely that it had to do _something_.

Let's look more closely at handling types.

#### Argument Types via `ajv`

While `argparse` allows consumers, via its API, to define the _type_ of various arguments (e.g.,
a string, number, boolean flag, etc.), Appium mostly avoids these built-in types. _Why is that?_
Well:

1. We already know the type of an argument, because we've defined it in a schema.
2. `ajv` provides validation against a schema.
3. A schema allows for greater expression of types, allowed values, etc., than `argparse` can provide natively.
4. The expressiveness of a schema allows for better error messaging.

To that end, the adapter eschews `argparse`'s built-in types (see allowed string values of
`ArgumentOption['type']`) and instead abuses the ability to provide a _function_ as a `type`. The
exception is _boolean_ flags, which do not have a `type`, but rather `action: 'store_true'`. The
world may never know why.

##### Types as Functions

When a `type` is a function, the function performs both validation _and_ coercion (if necessary).
So what are these functions?

> Note: `type` is _omitted_ (and thus _not_ a function) from the `ArgumentOption` if the property
> type is `boolean`, and is instead provided an `action` property of `store_true`. Yes, this is
> weird. No, I don't know why.

Well... it depends upon the schema. But generally speaking, we create a _pipeline_ of functions,
each corresponding to a keyword in the schema. Let's take the example of the `port` argument. In
lieu of asking the OS which ports the `appium`-running user can bind to, this argument is expected
to be an integer between 1 and 65535. This turns out to be two functions which we combine into
a pipeline:

1. Convert the value to an integer, if possible. Because _every value in `process.argv` is a string_, we must coerce if we want a number.
2. Use `ajv` to validate the integer against the schema for `port`. A schema lets us define a range via the `minimum` and `maximum` keywords. Read more about how this works in

Much like the config file validation, if errors are detected, Appium nicely tells the end-user and
the process exits w/ some help text.

For other arguments which are naturally of non-primitive types, things are not so straightforward.

##### Transformers

Remember how `argparse` doesn't understand arrays? What if the most ergonomic way to express
a value is, in fact, an array?

Well, Appium can't accept an array on the CLI, even though it can accept one in the config file.
But Appium _can_ accept a comma-delimited string (a CSV "line"). Or a string filepath referring to
a file which _contains_ a delimited list. Either way: by the time the value gets out of the
argument parser, it should be an array.

And as mentioned above, the native facilities of a JSON schema cannot express this. However, it's
possible to define a _custom keyword_ which Appium can then detect and handle accordingly. So
that's what Appium does.

In this case, a custom keyword `appiumCliTransformer` is registered with `ajv`. The value of
`appiumCliTransformer` (at the time of this writing) can be `csv` or `json`. In the base schema
file, `appium-config-schema.js`, Appium uses `appiumCliTransformer: 'csv'` if this behavior is
desired.

!!! note

    Any property defined in the schema having type `array` will _automatically_ uses the `csv`
    transformer. Likewise, a property having type `object` will use the `json` transformer. It's
    conceivable that `array` may want to use the `json` transformer, but otherwise, the presence of
    the `appiumCliTransformer` keyword on an `array`-or-`object`-typed property is not strictly
    necessary.

The adapter (remember the adapter?) creates a pipeline function including a special "CSV
transformer" (transformers are defined in `lib/schema/cli-transformers.js`), and uses this function
as the `type` property of the `ArgumentOption` passed into `argparse`. In this case, the `type:
'array'` in the schema is ignored.

!!! note

    The config file doesn't _need_ to perform any complex transformation of values, because it
    naturally allows Appium to define exactly what it expects. So Appium does no post-processing of
    config file values.

Properties that do not need this special treatment use `ajv` directly for validation. How this
works requires some explanation, so that's next.

#### Validation of Individual Arguments via `ajv`

When we think of a JSON schema, we tend to think, "I have this JSON file and I want to validate it
against the schema". That's valid, and in fact Appium does just that with config files! However,
Appium does not do this when validating arguments.

!!! note

    During implementation, I was tempted to mash all of the arguments together into
    a config-file-like data structure and then validate it all at once. I think that would have
    been _possible_, but since an object full of CLI arguments is a flat key/value structure and
    the schema is not, this seemed like trouble.

Instead, Appium validates a value against a specific property _within_ the schema. To do this, it
maintains a mapping between a CLI argument definition and its corresponding property. The mapping
itself is a `Map` with a unique identifier for the argument as the key, and an `ArgSpec`
(`lib/schema/arg-spec.js`) object as the value.

An `ArgSpec` object stores the following metadata:

| Property Name   | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `name`          | Canonical name of the argument, corresponding to the property name in the schema.     |
| `extType?`      | `driver` or `plugin`, if appropriate                                                  |
| `extName?`      | Extension name, if appropriate                                                        |
| `ref`           | Computed `$id` of the property in the schema                                          |
| `arg`           | Argument as accepted on CLI, without leading dashes                                   |
| `dest`          | Property name in parsed arguments object (as returned by `argparse`'s `parse_args()`) |
| `defaultValue?` | Value of the `default` keyword in schema, if appropriate                              |

When a schema is [finalized](#schema-loading), the `Map` is populated with `ArgSpec` objects
for all known arguments.

So when the adapter is creating the pipeline of functions for the argument's `type`, it already has
an `ArgSpec` for the argument. It creates a function which calls `validate(value, ref)` (in
`lib/schema/schema.js`) where `value` is whatever the user provided, and `ref` is the `ref`
property of the `ArgSpec`. The concept is that `ajv` can validate using _any_ `ref` it knows about;
each property in a schema can be referenced by this `ref` whether it's defined or not. To help
visualize, if a schema is:

```json
{
  "$id": "my-schema.json",
  "type": "object",
  "properties": {
    "foo": {
      "type": "number"
    }
  }
}
```

The `ref` of `foo` would be `my-schema.json#/properties/foo`. Assuming our `Ajv` instance knows
about this `my-schema.json`, then we can call its `getSchema(ref)` method (which has a `schema`
property, but is a misnomer nonetheless) to get a validation function; `validate(value, ref)` in
`schema.js` calls this validation function.

!!! note

    The schema spec says a schema author can supply an explicit `$id` keyword to override this;
    it's unsupported by Appium at this time. If needed, extension authors must carefully use `$ref`
    without custom `$id`s. It's highly unlikely an extension would have a schema so complicated as
    to need this, however; Appium itself doesn't even use `$ref` to define its own properties!

Next, let's take a look at how Appium loads schemas. This actually happens _before_ any argument
validation.

## Schema Loading

Let's ignore extensions for a moment, and start with the base schema.

When something first imports the `lib/schema/schema.js` module, an instance of an `AppiumSchema` is
created. This is a singleton, and its methods are exported from the module (all of which are bound
to the instance).

The constructor does very little; it instantiates an `Ajv` instance and configures it with Appium's
[custom keywords](#custom-keyword-reference) and adds support for the `format` keyword via the
[ajv-formats](https://npm.im/ajv-formats) module.

Otherwise, the `AppiumSchema` instance does not interact with the `Ajv` instance until its
`finalize()` method (exported as `finalizeSchema()`) is called. When this method is called, we're
saying "we are not going to add any more schemas; go ahead and create `ArgSpec` objects and
register schemas with `ajv`".

When does finalization happen? Well:

1. When the `appium` executable begins, it _checks for and configures extensions_ (hand-wave) in `APPIUM_HOME`.
2. Only then does it start to think about arguments--it instantiates an `ArgParser`, which (as you'll recall) runs the adapter to convert the schema to arguments.
3. _Finalization happens here_--when creating the parser. Appium need the schema(s) to be registered with `ajv` in order to create validation functions for arguments.
4. Thereafter, Appium parses the arguments with the `ArgParser`.
5. Finally, decides what to do with the returned object.

Without extensions, `finalize()` still knows about the Appium base schema
(`appium-config-schema.js`), and just registers that. However, step 1. above is doing a _lot of
work_, so let's look at how extensions come into play.

## Extension Support

One of the design goals of this system is the following:

_An extension should be able to register custom CLI arguments with the Appium, and a user should be
able to use them like any other argument_.

Previously, Appium accepted arguments in this manner (via `--driverArgs`), but validation was
hand-rolled and required extension implementors to use a custom API. It also required the user to
awkwardly pass a JSON string as the configuration on the command-line. Further, no contextual help
(via `--help`) existed for these arguments.

Now, by providing a schema for its options, a driver or plugin can register CLI arguments and
config file schemas with Appium.

To register a schema, an extension must provide the `appium.schema` property in its `package.json`.
The value may be a schema or a path to a schema. If the latter, the schema should be JSON or
a CommonJS module (ESM not supported at this time, nor is YAML).

For any property in this schema, the property will appear as a CLI argument of the form
`--<extension-type>-<extension-name>-<property-name>`. For example, if the `fake` driver provides
a property `foo`, the argument will be `--driver-fake-foo`, and will show in `appium server --help`
like any other CLI argument.

The corresponding property in a config file would be
`server.<extension-type>.<extension-name>.<property-name>`, e.g.:

```json
{
  "server": {
    "driver": {
      "fake": {
        "foo": "bar"
      }
    }
  }
}
```

The naming convention described above avoids problems of one extension type having a name conflict
with a different extension type.

!!! note

    While an extension can provide aliases via `appiumCliAliases`, "short" flags are disallowed,
    since all arguments from extensions are prefixed with `--<extension-type>-<extension-name>-`.
    The extension name and argument name will be kebab-cased for the CLI, according to [Lodash's
    rules](https://lodash.com/docs/4.17.15#kebabCase) around kebab-casing.

The schema object will look much like Appium's base schema, but it will only have top-level
properties (nested properties are currently unsupported). Example:

```json
{
  "title": "my rad schema for the cowabunga driver",
  "type": "object",
  "properties": {
    "fizz": {
      "type": "string",
      "default": "buzz",
      "$comment": "corresponds to CLI --driver-cowabunga-fizz"
    }
  }
}
```

As written in a user's config file, this would be the `server.driver.cowabunga.fizz` property.

When extensions are loaded, the `schema` property is verified and the schema is registered with the
`AppiumSchema` (it is _not_ registered with `Ajv` until `finalize()` is called).

During finalization, each registered schema is added to the `Ajv` instance. The schema is assigned
an `$id` based on the extension type and name (which overrides whatever the extension provides, if
anything). Schemas are also forced to disallowed unknown arguments via the `additionalProperties:
false` keyword.

Behind the scenes, the base schema has `driver` and `plugin` properties which are objects. When
finalized, a property is added to each--corresponding to an extension name--and the value of this
property is a reference to the `$id` of a property in the extension schema. For example, the
`server.driver` property will look like this:

```json
{
  "driver": {
    "cowabunga": {
      "$ref": "driver-cowabunga.json"
    }
  }
}
```

This is why we call it the "base" schema--it is _mutated_ when extensions provide schemas. The
extension schemas are kept separately, but the _references_ are added to the schema before it's
ultimately added to `ajv`. This works because an `Ajv` instance understands references _from_ any
schema it knows about _to_ any schema it knows about.

!!! note

    This makes it impossible to provide a complete static schema for Appium _and_ the installed
    extensions (as of Nov 5 2021). A static `.json` schema _is_ generated from the base (via a Gulp
    task), but it does not contain any extension schemas. The static schema also has uses beyond
    Appium; e.g., IDEs can provide contextual error-checking of config files this way. Let's solve
    this?

Just like how we look up the reference ID of a particular argument in the base schema, validation
of arguments from extensions happens the exact same way. If the `cowabunga` driver has the schema
ID `driver-cowabunga.json`, then the `fizz` property can be referenced from any schema registered
with `ajv` via `driver-cowabunga.json#/properties/fizz`. "Base" schema arguments begin with
`appium.json#properties/` instead.

## Development Environment Support

During the flow of development, a couple extra tasks have been automated to maintain the base
schema:

- As a post-transpilation step, a `lib/appium-config.schema.json` gets generated from
- `lib/schema/appium-config-schema.js` (in addition to its CJS counterpart generated by Babel).
- This file is under version control. It ends up being _copied_ to
- `build/lib/appium-config.schema.json` in this step. A pre-commit hook (see
- `scripts/generate-schema-declarations.js` in the root monorepo) generates
- a `types/appium-config-schema.d.ts` from the above JSON file. The types in `types/types.d.ts`
- depend upon this file. This file is under version control.

## Custom Keyword Reference

Keywords are defined in `lib/schema/keywords.js`.

- `appiumCliAliases`: allows a schema to express aliases (e.g., a CLI argument can be `--verbose` or `-v`). This is an array of strings. Strings shorter than three (3) characters will begin with a single dash (`-`) instead of a double-dash (`--`). Note that any argument provided by an extension will begin with a double-dash, because these are required to have the `--<extension-type>-<extension-name>-` prefix.
- `appiumCliDest`: allows a schema to specify a custom property name in the post-`argprase` arguments objects. If not set, this becomes a camelCased string.
- `appiumCliDescription`: allows a schema to override the description of the argument when displayed on the command-line. This is useful paired with `appiumCliTransformer` (or `array`/`object`-typed properties), since there's a substantial difference between what a CLI-using user can provide vs. what a config-file-using user can provide.
- `appiumCliTransformer`: currently a choice between `csv` and `json`. These are custom functions which post-process a value. They are not used when loading & validating config files, but the idea should be that they result in the same object you'd get if you used whatever the config file wanted (e.g., an array of strings). `csv` is for comma-delimited strings and CSV files; `json` is for raw JSON strings and `.json` files.
- `appiumCliIgnore`: If `true`, do not support this property on the CLI.
- `appiumDeprecated`: If `true`, the property is considered "deprecated", and will be displayed as such to the user (e.g., in the `--help` output). Note the JSON Schema draft-2019-09 introduces a new keyword `deprecated` which we should use instead if upgrading to this metaschema. When doing so, `appiumDeprecated` should itself be marked as `deprecated`.


--- SOURCE: en/developing/sensitive.md ---

---
hide:
  - toc

title: Masking Sensitive Log Data
---

Since Appium server version 2.18.0 there is a possibility to mask sensitive
values in logs. The below tutorial explains how to use this feature in third-party
extensions.

## Why It Might Be Useful

It is the right call to hide sensitive information, like passwords, tokens, etc.
from server logs, so it does not accidentally leak if these logs end up in wrong hands.
Appium server already provides a way to manipulate logs records via
[filtering](../guides/log-filters.md), although it has its own limitations.
The current approach is more sophisticated though, and requires some fine-tuning
on the driver/plugin side.

## How To

The assumption is that your extension uses the standard built-in
[@appium/logger](https://www.npmjs.com/package/@appium/logger).
In order to get some value in logs replaced by a generic mask it is necessary:

- Change the logging expression to wrap sensitive values and format them, for example:

    ```js
    this.log.info(`Value: ${value}`);
    ```

    becomes

    ```js
    import {logger} from '@appium/support';

    this.log.info('Value: %s', logger.markSensitive(value));
    ```

    The formatting happens via the standard Node.js's
    [util.format](https://nodejs.org/api/util.html#utilformatformat-args) API.

- While sending the appropriate server request, where this log line is used and should be masked,
  add the custom header `X-Appium-Is-Sensitive` with its value set to `1` or `true` (case-insensitive).
  Without such header the above log value is not going to be masked.
  This way it is possible to conditionally mask log records depending on which
  request is being handled by the extension if the log expression is used in the
  common section.


--- SOURCE: en/developing/build-docs.md ---

---
title: Building Documentation
---

Once you've [built a driver](./build-drivers.md) or [built a plugin](./build-plugins.md) for Appium,
you will hopefully want to document how that extension works for your users. The most basic way of
doing this is to write up a quick `README.md` and keep it in the root of your project's repository.
However, this can involve a lot of effort.

The Appium project has built tools to help with this, and we've packaged up these tools so our
ecosystem developers building drivers and plugins can _also_ use them. The best way to get going
with these tools is probably to look at an existing Appium driver repo to see how it's done, for
example the [XCUITest driver repo](https://github.com/appium/appium-xcuitest-driver). But this guide
will outline the basic approach.

### Conceptual architecture

Appium settled on [MkDocs](https://www.mkdocs.org/) as a Markdown-based documentation site
generator. It uses a Python toolchain (and not Node.js), but it turned out to be the best option
for our purposes. You can adjust this, but by default Appium's utilities also assume that you'll be
using the [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme/extension for
MkDocs.

In order to make different versions of your docs available (one for each minor release of your
extension, typically), we also bundle [Mike](https://github.com/jimporter/mike).

From here, building a basic docs site is as easy as collecting your Markdown files together and
defining how you want them to be organized.

### Prerequisites

To take advantage of Appium's documentation utilities, you'll need to install:

- [Python v3+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/) (this may be installed automatically with Python)
- The `@appium/docutils` package:

    ```bash
    npm install --save-dev @appium/docutils
    ```

### Initializing an Extension for Building Docs

To prepare your extension for generating documentation, run the following command:

```bash
npx appium-docs init
```

This will:

1. Create a `tsconfig.json` if one does not already exist. This is necessary even if your extension
is not written in TypeScript.
2. Create a `mkdocs.yml` with the necessary configuration for MkDocs.

### Documenting Your Extension

At this point, you can begin documenting your extension. By default, MkDocs will look for Markdown
files in the `docs` directory. You can therefore create your Markdown documentation files, place
them in `docs`, and add links to these files in `mkdocs.yml`.

Refer to the [MkDocs documentation](https://www.mkdocs.org/user-guide/writing-your-docs/) for
information on how to organize and structure your documentation. 

### Building the Docs

At this point, you can use the `appium-docs` CLI tool. Run this tool with no arguments to get the
full help output and see all the available subcommands and parameters. Here are a few usage
examples:

```bash
# Generate reference and build the mkdocs site into the site dir
npx appium-docs build

# Same as build, but host the docs on a local dev server
# and watch for changes and rebuild when files change
npx appium-docs build --serve

# Build the docs and deploy them with mike versioning to the docs-site branch
# using the included commit message.
# This is particularly useful for pushing content to a GitHub pages branch!
npx appium-docs build \
  --deploy \
  -b docs-site \
  -m 'docs: auto-build docs for appium-xcuitest-driver@%s'
```


--- SOURCE: en/developing/index.md ---

---
hide:
  - toc

title: Developing Appium Extensions
---

Appium is built with a modular structure, which means that Appium extensions (drivers and plugins)
are decoupled from the main Appium module, and you only need to install the extensions that you
want to use. This modular structure also unlocks the ability to develop entirely new extensions!

This section of the Appium documentation is intended to help aspiring developers with creating their
own Appium extension:

* For creating a driver, see the [Build Drivers](./build-drivers.md) page
* For creating a plugin, take a look at the [Build Plugins](build-plugins.md) page
* Drivers and plugins both need documentation, so check out the [Build Documentation](./build-docs.md) page
* For creating a doctor check, see the [Building Doctor Checks](./build-doctor-checks.md) page


--- SOURCE: en/developing/build-drivers.md ---

---
title: Building Drivers
---

Appium wants to make it easy for anyone to develop their own automation drivers as part of the
Appium ecosystem. This guide will explain what's involved and how you can accomplish various driver
development tasks using the tools Appium provides. This guide assumes you (1) are a competent user of
Appium, (2) are a competent Node.js developer, and (3) that you have read and understood the
[Driver Intro](../intro/drivers.md).

If that describes you, great! This guide will get you started.

## Before you create your driver

Before you get to work implementing your driver, it's important to have a few things sorted out.
For example, you need to know what your driver will do. Which platform is it trying to expose
WebDriver automation for?

Appium doesn't magically give you the power to automate any platform. All it does is give you a set
of convenient tools for implementing the WebDriver Protocol. So if you want to create, for example,
a driver for a new app platform, you'll need to know how to automate apps on that platform *without Appium*.

This usually means that you need to be very familiar with app development for a given platform. And
it usually means that you will rely on tools or SDKs provided by the platform vendor.

Basically, if you can't answer the question **"how would I launch, remotely trigger behaviours, and
read state from an app on this platform?" then you're not quite ready to write an Appium driver**.
Make sure you do the research to feel comfortable that there *is* a path forward. Once there is,
coding it up and making it available as an Appium driver should be the easy part!

## Other drivers to reference

One of the greatest things about building an Appium driver is that there are already a number of
open source Appium drivers which you can look at for reference. There is
a [fake-driver](https://github.com/appium/appium/tree/master/packages/fake-driver) sample driver which
does basically nothing other than showcase some of the things described in this guide.

And of course, all of Appium's official drivers are open source and available in repositories at
the project's GitHub organization. So if you ever find yourself asking, "how does a driver do X?",
read the code for these drivers! Also don't be afraid to ask questions of the Appium developers if
you get stuck; we're always happy to help make sure the driver development experience is a good
one!

## Basic requirements for Appium drivers

These are the things your driver *must* do (or be), if you want it to be a valid Appium driver.

### Node.js package with Appium extension metadata

All Appium drivers are fundamentally Node.js packages, and therefore must have a valid
`package.json`. Your driver is not _limited_ to Node.js, but it must provide an adapter written in Node.js so it can be loaded by Appium.

Your `package.json` must include `appium` as a `peerDependency`. The requirements for the
dependency versions should be as loose as possible (unless you happen to know your driver will only
work with certain versions of Appium). For Appium 2, for example, this would look something like
`^2.0.0`, declaring that your driver works with any version of Appium that starts with 2.x.

Your `package.json` must contain an `appium` field, like this (we call this the 'Appium extension
metadata'):

```json
{
  ...,
  "appium": {
    "driverName": "fake",
    "automationName": "Fake",
    "platformNames": [
      "Fake"
    ],
    "mainClass": "FakeDriver"
  },
  ...
}
```

The required subfields are:

* `driverName`: this should be a short name for your driver.
* `automationName`: this should be the string users will use for their `appium:automationName`
  capability to tell Appium to use *your* driver.
* `platformNames`: this is an array of one or more platform names considered valid for your driver.
  When a user sends in the `platformName` capability to start a session, it must be included in
  this list for your driver to handle the session. Known platform name strings include: `iOS`,
  `tvOS`, `macOS`, `Windows`, `Android`.
* `mainClass`: this is a named export (in CommonJS style) from your `main` field. It must be a
  class which extends Appium's `BaseDriver` (see below).

### Extend Appium's `BaseDriver` class

Ultimately, your driver is much easier to write because most of the hard work of implementing the
WebDriver protocol and handling certain common logic is taken care of already by Appium. This is
all encoded up as a class which Appium exports for you to use, called `BaseDriver`. It is exported
from `appium/driver`, so you can use one of these styles to import it and create your *own* class
that extends it:

```js
import {BaseDriver} from 'appium/driver';
// or: const {BaseDriver} = require('appium/driver');

export class MyDriver extends BaseDriver {
}
```

### Make your driver available

That's basically it! With a Node.js package exporting a driver class and with correct Appium
extension metadata, you've got yourself an Appium driver! Now it doesn't *do* anything, but you can
load it up in Appium, start and stop sessions with it, etc...

To make it available to users, you could publish it via NPM. When you do so, your driver will be
installable via the Appium CLI:

```
appium driver install --source=npm <driver-package-on-npm>
```

It's a good idea to test your driver first, of course. One way to see how it works within Appium is
to install it locally first:

```
appium driver install --source=local /path/to/your/driver
```

### Developing your driver

How you develop your driver is up to you. It is convenient, however, to run it from within Appium
without having to do lots of publishing and installing. The most straightforward way to do this is
to include the most recent version of Appium as a `devDependency`, and then also your own driver,
like this:

```json
{
  "devDependencies": {
    ...,
    "appium": "^2.0.0",
    "your-driver": "file:.",
    ...
  }
}
```

Now, you can run Appium locally (`npm exec appium` or `npx appium`), and because your driver is
listed as a dependency alongside it, it will be automatically "installed" and available. You can
design your e2e tests this way, or if you're writing them in Node.js, you can simply import
Appium's start server methods to handle starting and stopping the Appium server in Node. (TODO:
reference an implementation of this in one of the open source drivers when ready).

Another way to do local development with an existing Appium server install is to simply install
your driver locally:

```
appium driver install --source=local /path/to/your/driver/dev/dir
```

### Refreshing your driver during development

When the Appium server starts, it loads your driver into memory. Changes to your driver code will
not take effect until the next time the Appium server starts. Simply starting a new session is not
sufficient to cause your driver's code to be reloaded.

However, you can set the `APPIUM_RELOAD_EXTENSIONS` environment variable to `1` to request that
Appium clear its module cache and reload extensions whenever a new session is requested. This may
obviate the need to restart the server when you make code changes to your driver.

## Standard driver implementation ideas

These are things you will probably find yourself wanting to do when creating a driver.

### Set up state in a constructor

If you define your own constructor, you'll need to call `super` to make sure all the standard state
is set up correctly:

```js
constructor(...args) {
    super(...args);
    // now do your own thing
}
```

The `args` parameter here is the object containing all the CLI args used to start the Appium
server.

### Define and validate accepted capabilities

You can define your own capabilities and basic validation for them. Users will always be able to
send in capabilities that you don't define, but if they send in capabilities you have explicitly
defined, then Appium will validate that they are of the correct type (and will check for the
presence of required capabilities).

If you want to turn capability validation off entirely, set `this.shouldValidateCaps` to `false` in
your constructor.

To give Appium your validation constraints, set `this.desiredCapConstraints` to a validation object
in your constructor. Validation objects can be somewhat complex. Here's an example from the
UiAutomator2 driver:

```js
{
  app: {
    presence: true,
    isString: true
  },
  automationName: {
    isString: true
  },
  browserName: {
    isString: true
  },
  launchTimeout: {
    isNumber: true
  },
}
```

### Start a session and read capabilities

Appium's `BaseDriver` already implements the `createSession` command, so you don't have to. However
it's very common to need to perform your own startup actions (launching an app, running some
platform code, or doing different things based on capabilities you have defined for your driver).
So you'll probably end up overriding `createSession`. You can do so by defining the method in your
driver:

```js
async createSession(jwpCaps, reqCaps, w3cCaps, otherDriverData) {
    const [sessionId, caps] = super.createSession(w3cCaps);
    // do your own stuff here
    return [sessionId, caps];
}
```

For legacy reasons, your function will receive old-style JSON Wire Protocol desired and required
caps as the first two arguments. Given that the old protocol isn't supported anymore and clients
have all been updated, you can instead only rely on the `w3cCaps` parameter. (For a discussion
about what `otherDriverData` is about, see the section below on concurrent drivers).

You'll want to make sure to call `super.createSession` in order to get the session ID as well as
the processed capabilities (note that capabilities are also set on `this.caps`; modifying `caps`
locally here would have no effect other than changing what the user sees in the create session
response).

So that's it! You can fill out the middle section with whatever startup logic your driver requires.

### End a session

If your driver requires any cleanup or shutdown logic, it's best to do it as part of overriding the
implementation of `deleteSession`:

```js
async deleteSession() {
    // do your own cleanup here
    // don't forget to call super!
    await super.deleteSession();
}
```

It's very important not to throw any errors here if possible so that all parts of session cleanup
can succeed!

### Access capabilities and CLI args

You'll often want to read parameters the user has set for the session, whether as CLI args or as
capabilities. The easiest way to do this is to access `this.opts`, which is a merge of all options,
from the CLI or from capabilities. So for example to access the `appium:app` capability, you could
simply get the value of `this.opts.app`.

If you care about knowing whether something was sent in as a CLI arg *or* a capability, you can
access the `this.cliArgs` and `this.caps` objects explicitly.

In all cases, the `appium:` capability prefix will have been stripped away by the time you are
accessing values here, for convenience.

### Implement WebDriver classic commands

You handle WebDriver commands by implementing functions in your driver class. Each member of the
WebDriver Protocol, plus the various Appium extensions, has a corresponding function that you
implement if you want to support that command in your driver. The best way to see which commands
Appium supports and which method you need to implement for each command is to look at Appium's
[routes.js](https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/routes.js).
Each route object in this file tells you the command name as well as the parameters you'd expect to
receive for that command.

Let's take this block for example:
```js
'/session/:sessionId/url': {
    GET: {command: 'getUrl'},
    POST: {command: 'setUrl', payloadParams: {required: ['url']}},
}
```

Here we see that the route `/session/:sessionId/url` is mapped to two commands, one for a `GET`
request and one for a `POST` request. If we want to allow our driver to change the "url" (or
whatever that might mean for our driver), we can therefore implement the `setUrl` command, knowing
it will take the `url` parameter:

```js
async setUrl(url) {
    // your implementation here
}
```

A few notes:
- all command methods should be `async` functions or otherwise return a `Promise`
- you don't need to worry about protocol encoding/decoding. You will get JS objects as params, and
  can return JSON-serializable objects in response. Appium will take care of wrapping it up in the
  WebDriver protocol response format, turning it into JSON, etc...
- all session-based commands receive the `sessionId` parameter as the last parameter
- all element-based commands receive the `elementId` parameter as the second-to-last parameter
- if your driver doesn't implement a command, users can still try to access the command, and will
  get a `501 Not Yet Implemented` response error.

### Implement WebDriver BiDi commands

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi) is a newer version of the WebDriver spec
which is implemented over Websockets instead of HTTP. As an Appium driver author you can take
advantage of Appium's BiDi support without having to know anything about the BiDi protocol or
Websockets. Implementing handlers for BiDi commands works just the same as implementing handlers
for WebDriver classic commands (described in the previous section). You simply define a method on
your driver of the appropriate name, and it will be called when the BiDi command is requested by
the client. To see which specific names you should use for BiDi commands, have a look at
[bidi-commands.js](https://github.com/appium/appium/blob/master/packages/base-driver/lib/protocol/bidi-commands.js)

You are not limited to BiDi commands that are defined in the official BiDi specification. If you
wish to define new commands, you may do so; you just need to tell Appium about them! See
[below](#extend-the-existing-protocol-with-new-commands) for more information.

### Implement element finding

Element finding is a special command implementation case. You don't actually want to override
`findElement` or `findElements`, even though those are what are listed in `routes.js`. Appium does
a lot of work for you if instead you implement this function:

```js
async findElOrEls(strategy, selector, mult, context) {
    // find your element here
}
```

Here's what gets passed in:

- `strategy` - a string, the locator strategy being used
- `selector` - a string, the selector
- `mult` - boolean, whether the user has requested one element or all elements matching the
  selector
- `context` - (optional) if defined, will be a W3C Element (i.e., a JS object with the W3C element
  identifier as the key and the element ID as the value)

And you need to return one of the following:

- a single W3C element (an object as described above)
- an array of W3C elements

Note that you can import that W3C web element identifier from `appium/support`:

```js
import {util} from 'appium/support';
const { W3C_WEB_ELEMENT_IDENTIFIER } = util;
```

What you do with elements is up to you! Usually you end up keeping a cache map of IDs to actual
element "objects" or whatever the equivalent is for your platform.

### Define valid locator strategies

Your driver might only support a subset of the standard WebDriver locator strategies, or it might
add its own custom locator strategies. To tell Appium which strategies are considered valid for
your driver, create an array of strategies and assign it to `this.locatorStrategies`:

```js
this.locatorStrategies = ['xpath', 'custom-strategy'];
```

Appium will throw an error if the user attempts to use any strategies other than the allowed ones,
which enables you to keep your element finding code clean and deal with only the strategies you
know about.

By default, the list of valid strategies is empty, so if your driver isn't simply proxying to
another WebDriver endpoint, you'll need to define some. The protocol-standard locator strategies
are defined [here](https://www.w3.org/TR/webdriver/#locator-strategies).

### Throw WebDriver-specific errors

The WebDriver spec defines a [set of error
codes](https://github.com/jlipps/simple-wd-spec#error-codes) to accompany command responses if an
error occurred. Appium has created error classes for each of these codes, so you can throw the
appropriate error from inside a command, and it will do the right thing in terms of the protocol
response to the user. To get access to these error classes, import them from `appium/driver`:

```
import {errors} from 'appium/driver';

throw new errors.NoSuchElementError();
```

### Log messages to the Appium log

You can always use `console.log`, of course, but Appium provides a nice logger for you as
`this.log` (it has `.info`, `.debug`, `.log`, `.warn`, `.error` methods on it for differing log
levels). If you want to create an Appium logger outside of a driver context (say in a script or
helper file), you can always construct your own too:

```js
import {logging} from 'appium/support';
const log = logging.getLogger('MyDriver');
```

## Further possibilities for Appium drivers

These are things your driver *can* do to take advantage of extra driver features or do its job more
conveniently.

### Add a schema for custom command line arguments

You can add custom CLI args if you want your driver to receive data from the command line when the
Appium server is started (for example, ports that a server administrator should set that should not
be passed in as capabilities.

To define CLI arguments (or configuration properties) for the Appium server, your extension must provide a _schema_. In
the `appium` property of your extension's `package.json`, add a `schema` property. This will either
a) be a schema itself, or b) be a path to a schema file.

The rules for these schemas:

- Schemas must conform to [JSON Schema Draft-07](https://ajv.js.org/json-schema.html#draft-07).
- If the `schema` property is a path to a schema file, the file must be in JSON or JS (CommonJS) format.
- Custom `$id` values are unsupported. To use `$ref`, provide a value relative to the schema root, e.g., `/properties/foo`.
- Known values of the `format` keyword are likely supported, but various other keywords may be unsupported. If you find a keyword that is unsupported which you need to use, please [ask for support](https://github.com/appium/appium/issues/new) or send a PR!
- The schema must be of type `object` (`{"type": "object"}`), containing the arguments in a `properties` keyword. Nested properties are unsupported.

Example:

```json
{
  "type": "object",
  "properties": {
    "test-web-server-port": {
      "type": "integer",
      "minimum": 1,
      "maximum": 65535,
      "description": "The port to use for the test web server"
    },
    "test-web-server-host": {
      "type": "string",
      "description": "The host to use for the test web server",
      "default": "sillyhost"
    }
  }
}
```

The above schema defines two properties which can be set via CLI argument or configuration file. If
this extension is a _driver_ and its name is "horace", the CLI args would be
`--driver-horace-test-web-server-port` and `--driver-horace-test-web-server-host`, respectively.
Alternatively, a user could provide a configuration file containing:

```json
{
  "server": {
    "driver": {
      "horace": {
        "test-web-server-port": 1234,
        "test-web-server-host": "localhorse"
      }
    }
  }
}
```

### Add driver scripts

Sometimes you might want users of your driver to be able to run scripts outside the context of
a session (for example, to run a script that pre-builds aspects of your driver). To support this,
you can add a map of script names and JS files to the `scripts` field within your Appium extension
metadata. So let's say you've created a script in your project that lives in a `scripts` directory
in your project, named `driver-prebuild.js`. Then you could add a `scripts` field like this:

```json
{
    "scripts": {
        "prebuild": "./scripts/driver-prebuild.js"
    }
}
```

Now, assuming your driver is named `mydriver`, users of your driver can run `appium driver run
mydriver prebuild`, and your script will execute.

### Proxy commands to another WebDriver implementation

A very common design architecture for Appium drivers is to have some kind of platform-specific
WebDriver implementation that the Appium driver interfaces with. For example, the Appium
UiAutomator2 driver interfaces with a special (Java-based) server running on the Android device. In
webview mode, it also interfaces with Chromedriver.

If you find yourself in this situation, it is extremely easy to tell Appium that your driver is
just going to be proxying WebDriver commands straight to another endpoint.

First, let Appium know that your driver *can* proxy by implementing the `canProxy` method:

```js
canProxy() {
    return true;
}
```

Next, tell Appium which WebDriver routes it should *not* attempt to proxy (there often end up being
certain routes that you don't want to forward on):

```js
getProxyAvoidList() {
    return [
        ['POST', new RegExp('^/session/[^/]+/appium')]
    ];
}
```

The proxy avoidance list should be an array of arrays, where each inner array has an HTTP method as
its first member, and a regular expression as its second. If the regular expression matches the
route, then the route will not be proxied and instead will be handled by your driver. In this
example, we are avoiding proxying all `POST` routes that have the `appium` prefix.

Next, we have to set up the proxying itself. The way to do this is to use a special class from
Appium called `JWProxy`. (The name means "JSON Wire Proxy" and is related to a legacy
implementation of the protocol). You'll want to create a `JWProxy` object using the details required to
connect to the remote server:

```js
// import {JWProxy} from 'appium/driver';

const proxy = new JWProxy({
    server: 'remote.server',
    port: 1234,
    base: '/',
});

this.proxyReqRes = proxy.proxyReqRes.bind(proxy);
this.proxyCommand = proxy.command.bind(proxy);
```

Here we are creating a proxy object and assigning some of its methods to `this` under the names
`proxyReqRes` and `proxyCommand`. This is required for Appium to use the proxy, so don't forget
this step! The `JWProxy` has a variety of other options which you can check out in the source code,
as well. (TODO: publish options as API docs and link here).

Finally, we need a way to tell Appium when the proxy is active. For your driver it might always
be active, or it might only be active when in a certain context. You can define the logic as an
implementation of `proxyActive`:

```js
proxyActive() {
    return true; // or use custom logic
}
```

With those pieces in play, you won't have to reimplement anything that's already implemented by the
remote endpoint you're proxying to. Appium will take care of all the proxying for you.

### Proxy BiDi commands to another BiDi implementation

All of the above about proxying WebDriver commands is conceptually also valid for proxying BiDi
commands specifically. In order to enable BiDi proxying, you need to implement `get bidiProxyUrl`
on your driver. This should return a Websocket URL which is the address of the upstream socket you
want BiDi commands to be proxied to.

The intended pattern here is for you to start a session on the upstream implementation, check
whether it has an active BiDi socket in the returned capabilities (e.g., the `webSocketUrl`
capability), and then to set an internal field to that value, so that it can be returned by `get
bidiProxyUrl`. Once all this is in place, Appium will proxy BiDi commands from the client straight
to the upstream connection.

### Extend the existing protocol with new commands

You may find that the existing commands don't cut it for your driver. If you want to expose
behaviours that don't map to any of the existing commands, you can create new commands in one of
three ways:

1. Extending the classic WebDriver protocol and creating client-side plugins to access the extensions via the classic HTTP interface
1. Extending the WebDriver BiDi protocol with new modules and methods, accessed from a client via the BiDi interface
1. Overloading the Execute Script command by defining [Execute
   Methods](../guides/execute-methods.md)

If you want to follow the first path, you can direct Appium to recognize new methods and add them
to its set of allowed HTTP routes and command names. You do this by assigning the `newMethodMap`
static variable in your driver class to an object of the same form as Appium's `routes.js` object.
For example, here is the `newMethodMap` for the `FakeDriver` example driver:

```js
static newMethodMap = {
  '/session/:sessionId/fakedriver': {
    GET: {command: 'getFakeThing'},
    POST: {command: 'setFakeThing', payloadParams: {required: ['thing']}},
  },
  '/session/:sessionId/fakedriverargs': {
    GET: {command: 'getFakeDriverArgs'},
  },
};
```

In this example we're adding a few new routes and a total of 3 new commands. For more examples of
how to define commands in this way, it's best to have a look through `routes.js`. Now all you need
to do is implement the command handlers in the same way you'd implement any other Appium command.

The downside of this way of adding new commands is that people using the standard Appium clients
won't have nice client-side functions designed to target these endpoints. So you would need to
create and release client-side plugins for each language you want to support (directions or
examples can be found at the relevant client docs).

The second way of adding new commands is adding them as BiDi commands (accessed via the BiDi
websocket interface, rather than the classic HTTP interface). BiDi commands come in two parts:
a "module", which is basically a container or namespace, and a "command", which is the name of your
new command.

As with the first method, you teach Appium to recognize your new BiDi commands by adding a static
field to your driver class, called `newBidiCommands`. It has a format similar to `newMethodMap`.
Basically it encapsulates information about the BiDi module, BiDi command name, reference to your
driver instance method that will handle the command, and required and optional parameters. Here's
an example of a `newBidiCommands` as implemented on an imaginary driver:

```js
static newBidiCommands = {
  'appium:video': {
    startFramerateCapture: {
      command: 'startFrameCap',
      params: {
        required: ['videoSource'],
        optional: ['showOnScreen'],
      }
    },
    stopFramerateCapture: {
      command: 'stopFrameCap',
    },
  }
};
```

In this imaginary example, we have defined two new BiDi commands:
`appium:video.startFramerateCapture` and `appium:video.stopFramerateCapture`. Note first of all
that, because we are defining a custom BiDi command, we should include a 'vendor prefix' (in this
case, `appium:`, though you should pick something that represents your project). The first command
takes a required and an optional parameter, and the second does not. When combined with generic
BiDi support in your driver (see [the section on BiDi](#implement-webdriver-bidi-commands) above),
and given an implementation of the appropriate methods on your driver (e.g. `startFrameCap` and
`stopFrameCap` in this example), clients would be able to send these BiDi commands using whatever
mechanism normally exists for doing so in the client library.

An alternative to these other ways of doing things is to overload a command which all WebDriver clients
have access to already: Execute Script. Appium provides some a convenient tool for making this
easy. Let's say you are building a driver for stereo system called `soundz`, and you wanted to
create a command for playing a song by name. You could expose this to your users in such a way that
they call something like:

```js
// webdriverio example. Calling webdriverio's `executeScript` command is what trigger's Appium's
// Execute Script command handler
driver.executeScript('soundz: playSong', [{song: 'Stairway to Heaven', artist: 'Led Zeppelin'}]);
```

Then in your driver code you can define the static property `executeMethodMap` as a mapping of
script names to methods on your driver. It has the same basic form as `newMethodMap`, described
above. Once `executeMethodMap` is defined, you'll also need to implement the Execute Script command
handler, which according to Appium's routes mapping is called `execute`. The implementation can
call a single helper function, `this.executeMethod`, which takes care of looking at the script and
arguments the user sent in and routing it to the correct custom handler you've defined. Here's an
example:

```js
static executeMethodMap = {
  'soundz: playSong', {
    command: 'soundzPlaySong',
    params: {required: ['song', 'artist'], optional: []},
  }
}

async soundzPlaySong(song, artist) {
  // play the song based on song and artist details
}

async execute(script, args) {
  return await this.executeMethod(script, args);
}
```

A couple notes about this system:
1. The arguments array sent via the call to Execute Script must contain only zero or one element(s). The
   first item in the list is considered to be the parameters object for your method. These parameters
   will be parsed, validated, and then applied to your overload method in the order specified in
   `executeMethodMap` (the order specified in the `required` parameters list, followed by the
   `optional` parameters list). I.e., this framework assumes only a single actual argument sent in via
   Execute Script (and this argument should be an object with keys/values representing the
   parameters your execute method expects).
1. Appium does not automatically implement `execute` (the Execute Script handler) for you. You may
   wish, for example, to only call the `executeMethod` helper function when you're not in proxy
   mode!
1. The `executeMethod` helper will reject with an error if a script name doesn't match one of the
   script names defined as a command in `executeMethodMap`, or if there are missing parameters.

One of the nice things about the Execute Method strategy is that methods implemented in this way
will be available via the classic or BiDi interfaces (since they will result in the same Appium
handlers being called).


### Build Appium Doctor checks

Your users can run `appium driver doctor <driverName>` to run installation and health checks. Visit
the [Building Doctor Checks](./build-doctor-checks.md) guide for more information on this
capability.

### Implement handling of Appium settings

Appium users can send parameters to your driver via CLI args as well as via capabilities. But these
cannot change during the course of a test, and sometimes users want to adjust parameters mid-test.
Appium has a [Settings](../guides/settings.md) API for this purpose.

To support settings in your own driver, first of all define `this.settings` to be an instance of
the appropriate class, in your constructor:

```js
// import {DeviceSettings} from 'appium/driver';

this.settings = new DeviceSettings();
```

Now, you can read user settings any time simply by calling `this.settings.getSettings()`. This will
return a JS object where the settings names are keys and have their corresponding values.

If you want to assign some default settings, or run some code on your end whenever settings are
updated, you can do both of these things as well.

```js
constructor() {
  const defaults = {setting1: 'value1'};
  this.settings = new DeviceSettings(defaults, this.onSettingsUpdate.bind(this));
}

async onSettingsUpdate(key, value) {
  // do anything you want here with key and value
}
```

### Emit BiDi events

With the WebDriver BiDi protocol, clients can subscribe to arbitrary events which can be sent
asynchronously to the client over the BiDi socket connection. As an Appium driver author you don't
need to worry about event subscription. If you want to emit an event with a certain method name and
payload, it's as easy as using the built-in event emitter with the `bidiEvent` event.

As an
example, let's say our driver wants to periodically emit CPU load information. We could define an
event called `system.cpu`, and a payload that looks like `{load: 0.97}` to signify 97% CPU usage.
Whenever we want, our driver can simply call the following code (assuming we have the current load
in `this.currentCpuLoad`):

```js
this.eventEmitter.emit('bidiEvent', {
  method: 'appium:system.cpu',
  params: {load: this.currentCpuLoad},
})
```

Now, if the client has subscribed to the `system.cpu` event, it will be notified with the load
whenever the driver emits it.

### Make itself aware of resources other concurrent drivers are using

Let's say your driver uses up some system resources, like ports. There are a few ways to make sure
that multiple simultaneous sessions don't use the same resources:

1. Have your users specify resource IDs via capabilities (`appium:driverPort` etc)
1. Just always use free resources (find a new random port for each session)
1. Have each driver express what resources it is using, then examine currently-used resources from
   other drivers when a new session begins.

To support this third strategy, you can implement `get driverData` in your driver to return what
sorts of resources your driver is currently using, for example:

```js
get driverData() {
  return {specialPort: 1234, specialFile: /path/to/file}
}
```

Now, when a new session is started on your driver, the `driverData` response from any other
simultaneously running drivers (of the same type) will also be included, as the last parameter of
the `createSession` method:

```js
async createSession(jwpCaps, reqCaps, w3cCaps, driverData)
```

You can dig into this `driverData` array to see what resources other drivers are using to help
determine which ones you want to use for this particular session.

!!! warning

    Be careful here, since `driverData` is only passed between sessions of a single running Appium
    server. There's nothing to stop a user from running multiple Appium servers and requesting your
    driver simultaneously on each of them. In this case, you won't be able to ensure independence
    of resources via `driverData`, so you might consider using file-based locking mechanisms or
    something similar.

!!! warning

    It's also important to note you will only receive `driverData` for other instances of *your*
    driver. So unrelated drivers also running may still be using some system resources. In general
    Appium doesn't provide any features for ensuring unrelated drivers don't interfere with one
    another, so it's up to the drivers to allow users to specify resource locations or addresses to
    avoid clashes.

### Log events to the Appium event timeline

Appium has an [Event Timing API](../guides/event-timing.md) which allows users to get timestamps
for certain server-side events (like commands, startup milestones, etc...) and display them on
a timeline. The feature basically exists to allow introspection of timing for internal events to
help with debugging or running analysis on Appium driver internals. You can add your own events to
the event log:

```js
this.logEvent(name);
```

Simply provide a name for the event and it will be added at the current time, and made accessible
as part of the event log for users.

### Hide behaviour behind security flags

Appium has a feature-flag based [security model](../guides/security.md) that allows driver authors
to hide certain features behind security flags. What this means is that if you have a feature you
deem insecure and want to require server admins to opt in to it, you can require that they enable
the feature by adding it to the `--allow-insecure` list or turning off server security entirely.

To support the check within your own driver, you can call `this.isFeatureEnabled(featureName)` to
determine whether a feature of the given name has been enabled. Or, if you want to simply
short-circuit and throw an error if the feature isn't enabled, you can call
`this.assertFeatureEnabled(featureName)`.

### Use a temp dir for files

If you want to use a temporary directory for files your driver creates that are not important to
keep around between computer or server restarts, you can simply read from `this.opts.tmpDir`. This
reads the temporary directory location from `@appium/support`, potentially overridden by a CLI
flag. I.e., it's safer than writing to your own temporary directory because the location here plays
nicely with possible user configuration. `this.opts.tmpDir` is a string, the path to the dir.

### Deal with unexpected shutdowns or crashes

Your driver might run into a situation where it can't continue operating normally. For example, it
might detect that some external service has crashed and nothing will work anymore. In this case, it
can call `this.startUnexpectedShutdown(err)` with an error object including any details, and Appium
will attempt to gracefully handle any remaining requests before shutting down the session.

If you want to perform some of your own cleanup logic when you encounter this condition, you can
either do so immediately before calling `this.startUnexpectedShutdown`, or you can attach a handler
to the unexpected shutdown event and run your cleanup logic "out of band" so to speak:

```js
this.onUnexpectedShutdown(handler)
```

`handler` should be a function which receives an error object (representing the reason for the
unexpected shutdown).


--- SOURCE: en/developing/build-plugins.md ---

---
title: Building Plugins
---

This is a high-level guide for developing Appium plugins, which is not something most Appium users
need to know or care about. If you are not familiar with Appium plugins yet from a user
perspective, check out the [list of plugins](../ecosystem/plugins.md) to play around with some and get
an idea of the sorts of things that plugins can do. Plugins are a powerful system for augmenting
Appium's functionality or changing the way Appium works. They can be distributed to other Appium
users and can extend Appium's ecosystem in all kinds of interesting ways! (There is also
a significant amount of overlap here with developing Appium drivers, so you may also want to check
out the [building drivers](./build-drivers.md) guide for further inspiration.)

## Before you create your plugin

Before creating your plugin, it's good to have a general idea of what you want your plugin to
accomplish and whether it will be possible to implement it given the restrictions of the Appium
platform. Reading through this guide will help you understand what's possible. In general, Appium's
plugin system is extremely powerful and no attempts have been made to artificially limit what's
possible with them (which is a main reason that all plugins are opt-in by the system administrator
responsible for starting the Appium server---plugins are powerful and should only be used when
explicitly trusted!).

## Other plugins to reference

There are a wide variety of open source Appium plugins available for perusal. It's definitely
recommended to explore the code for some other plugins before embarking on writing your own. The
Appium team maintains a set of official plugins in the [Appium GitHub
repo](https://github.com/appium/appium). Links to other open source plugins can be found in the
[Plugin list](../ecosystem/plugins.md)

## Basic requirements for plugins

These are the things your plugin *must* do (or be), if you want it to be a valid Appium plugin.

### Node.js package with Appium extension metadata

All Appium plugins are fundamentally Node.js packages, and therefore must have a valid
`package.json`. Your driver is not _limited_ to Node.js, but it must provide an adapter written in
Node.js so it can be loaded by Appium.

Your `package.json` must include `appium` as a `peerDependency`. The requirements for the
dependency versions should be as loose as possible (unless you happen to know your plugin will only
work with certain versions of Appium). For Appium 2, for example, this would look something like
`^2.0.0`, declaring that your plugin works with any version of Appium that starts with 2.x.

Your `package.json` must contain an `appium` field, like this (we call this the 'Appium extension
metadata'):

    ```json
    {
      ...,
      "appium": {
        "pluginName": "fake",
        "mainClass": "FakePlugin"
      },
      ...
    }
    ```

The required subfields are:

* `pluginName`: this should be a short name for your plugin.
* `mainClass`: this is a named export (in CommonJS style) from your `main` field. It must be a
  class which extends Appium's `BasePlugin` (see below).

### Extend Appium's `BasePlugin` class

Ultimately, your plugin is much easier to write because most of the hard work of defining patterns
for overriding commands is done for you. This is
all encoded up as a class which Appium exports for you to use, called `BasePlugin`. It is exported
from `appium/plugin`, so you can use one of these styles to import it and create your *own* class
that extends it:

```js
import {BasePlugin} from 'appium/plugin';
// or: const {BasePlugin} = require('appium/plugin');

export class MyPlugin extends BasePlugin {
  // class methods here
}
```

!!! note

    In all the code samples below, whenever we reference an example method, it is assumed
    that it is defined _within_ the class, though this is not explicitly written, for the sake of
    clarity and space.

### Make your plugin available

That's basically it! With a Node.js package exporting a plugin class and with correct Appium
extension metadata, you've got yourself an Appium plugin! Now it doesn't *do* anything, but you can
load it up in Appium, activate it, etc...

To make it available to users, you could publish it via NPM. When you do so, your plugin will be
installable via the Appium CLI:

```
appium plugin install --source=npm <plugin-package-on-npm>
```

It's a good idea to test your plugin first, of course. One way to see how it works within Appium is
to install it locally first:

```
appium plugin install --source=local /path/to/your/plugin
```

And of course, plugins must be "activated" during Appium server start, so make sure you direct your
users to do so:

```
appium --use-plugins=plugin-name
```

### Developing your plugin

How you develop your plugin is up to you. It is convenient, however, to run it from within Appium
without having to do lots of publishing and installing. The most straightforward way to do this is
to include the most recent version of Appium as a `devDependency` (although its being already
included as a `peerDependency` is sufficient in newer versions of NPM), and then also your own plugin,
like this:

```json
{
    "devDependencies": {
        ...,
        "appium": "^2.0.0",
        "your-plugin": "file:.",
        ...
    }
}
```

Now, you can run Appium locally (`npm exec appium` or `npx appium`), and because your plugin is
listed as a dependency alongside it, it will be automatically "installed" and available. You can
design your e2e tests this way, or if you're writing them in Node.js, you can simply import
Appium's start server methods to handle starting and stopping the Appium server in Node.

Of course, you can always install it locally as described above as well.

Anytime you make changes to your plugin code, you'll need to restart the Appium server to make sure
it picks up the latest code. As with drivers, you can set the `APPIUM_RELOAD_EXTENSIONS`
environment variable if you wish Appium to try to re-require your plugin module when a new session
starts.

## Standard plugin implementation ideas

These are things you will probably find yourself wanting to do when creating a plugin.

### Set up state in a constructor

If you define your own constructor, you'll need to call `super` to make sure all the standard state
is set up correctly:

```js
constructor(...args) {
    super(...args);
    // now do your own thing
}
```

The `args` parameter here is the object containing all the CLI args used to start the Appium
server.

### Intercept and handle specific Appium commands

This is the most normal behavior for Appium plugins -- to modify or replace the execution of one or
more commands that would normally be handled by the active driver. To override the default command
handling, you need to implement `async` methods in your class with the same name as the Appium
commands to be handled (just exactly how [drivers themselves are
implemented](./build-drivers.md#implement-webdriver-classic-commands)). Curious what command names there
are? They are defined in the Appium base driver's
[routes.js](https://github.com/appium/appium-base-driver/blob/master/lib/protocol/routes.js) file,
and of course you can add more as defined in the next section.

Each command method is sent the following arguments:

1. `next`: This is a reference to an `async` function which encapsulates the chain of behaviors which would take place if this plugin were not handling the command. You can choose to call the next behavior in the chain at any point in your logic (by making sure to include `await next()` somewhere), or not. If you don't, it means the default behavior (or any plugins registered after this one) won't be run.
1. `driver`: This is the object representing the driver handling the current session. You have access to it for any work you need to do, for example calling other driver methods, checking capabilities or settings, etc...
1. `...args`: A spread array with any arguments that have been applied to the command by the user.

For example, if we wanted to override the `setUrl` command to simply add some extra logging on top,
we would implement as follows:

```js
async setUrl(next, driver, url) {
  this.log(`Let's get the page source for some reason before navigating to '${url}'!`);
  await driver.getPageSource();
  const result = await next();
  this.log(`We can also log after the original behaviour`);
  return result;
}
```

### Intercept and handle _all_ Appium commands

You might find yourself in a position where you want to handle *all* commands, in order to inspect
payloads to determine whether or not to act in some way. If so, you can implement `async handle`,
and any command that is not handled by one of your named methods will be handled by this method
instead. It takes the following parameters (with all the same semantics as above):

1. `next`
1. `driver`
1. `cmdName` - string representing the command being run
1. `...args`

For example, let's say we want to log timing for all Appium commands as part of a plugin. We could
do this by implementing `handle` in our plugin class as follows:

```js
async handle(next, driver, cmdName, ...args) {
  const start = Date.now();
  try {
    const result = await next();
  } finally {
    const elapsedMs = Date.now() - start;
    this.log(`Command '${cmdName}' took ${elapsedMs}`);
  }
  return result;
}
```

### Working with driver proxies

There is a bit of a gotcha with handling Appium commands. Appium drivers have the ability to turn
on a special 'proxy' mode, wherein the Appium server process takes a look at incoming URLs, and
decides whether to forward them on to some upstream WebDriver server. It could happen that
a command which a plugin wants to handle is designated as a command which is being proxied to an
upstream server. In this case, we might run into a problem, because the plugin never gets a chance to
handle that command! The way Appium handles this is as follows:

1. When a command comes in, before deciding whether to proxy the command, the main protocol handler
   checks to see whether a plugin would handle the command.
2. If a plugin would *not* handle the command--all proceeds as normal, and the request is either
   proxied or not, based on the driver's proxy mode.
3. If a plugin *would* handle the command, then the proxy behavior is skipped for the time being,
   and wrapped up as the `next` function sent to the plugin. So if you have a command handler in
   your plugin, and you want to be sure that the default driver proxying *does* take place, then
   simply `await next()` instead of (or in addition to) whatever your plugin handler is doing.

### Throw WebDriver-specific errors

The WebDriver spec defines a [set of error
codes](https://github.com/jlipps/simple-wd-spec#error-codes) to accompany command responses if an
error occurred. Appium has created error classes for each of these codes, so you can throw the
appropriate error from inside a command, and it will do the right thing in terms of the protocol
response to the user. To get access to these error classes, import them from `appium/driver`:

```js
import {errors} from 'appium/driver';

throw new errors.NoSuchElementError();
```

### Log messages to the Appium log

You can always use `console.log`, of course, but Appium provides a nice logger for you as
`this.logger` (it has `.info`, `.debug`, `.log`, `.warn`, `.error` methods on it for differing log
levels). If you want to create an Appium logger outside of a plugin context (say in a script or
helper file), you can always construct your own too:

```js
import {logging} from 'appium/support';
const log = logging.getLogger('MyPlugin');
```

## Further possibilities for Appium plugins

These are things your plugin *can* do to take advantage of extra plugin features or do its job more
conveniently.

### Add a schema for custom command line arguments

You can add custom CLI args if you want your plugin to receive data from the command line when the
Appium server is started (for example, ports that a server administrator should set that should not
be passed in as capabilities).

This works largely the same for plugins as it does for drivers, so for more details have a look at
[the equivalent section in the building drivers
doc](./build-drivers.md#add-a-schema-for-custom-command-line-arguments).

The only difference is that to construct the CLI argument name, you prefix it with
`--plugin-<name>`. So for example, if you have a plugin named `pluggo` and a CLI arg defined with
the name `electro-port`, you can set it when starting Appium via `--plugin-pluggo-electro-port`.

Setting args via a configuration file is also supported, as it is for drivers, but under the
`plugin` field instead. For example:

```json
{
  "server": {
    "plugin": {
      "pluggo": {
        "electro-port": 1234
      }
    }
  }
}
```

### Add plugin scripts

Sometimes you might want users of your plugin to be able to run scripts outside the context of
a session (for example, to run a script that pre-builds aspects of your plugin). To support this,
you can add a map of script names and JS files to the `scripts` field within your Appium extension
metadata. So let's say you've created a script in your project that lives in a `scripts` directory
in your project, named `plugin-prebuild.js`. Then you could add a `scripts` field like this:

```json
{
    "scripts": {
        "prebuild": "./scripts/plugin-prebuild.js"
    }
}
```

Now, assuming your plugin is named `myplugin`, users of your plugin can run `appium plugin run
myplugin prebuild`, and your script will execute.

### Add new Appium commands

If you want to offer functionality that doesn't map to any of the existing commands supported by
drivers, you can create new commands in one of two ways, just as is possible for drivers:

1. Extending the WebDriver protocol and creating client-side plugins to access the extensions
1. Extending the WebDriver BiDi protocol with new modules and methods, accessed from a client via the BiDi interface
1. Overloading the Execute Script command by defining [Execute
   Methods](../guides/execute-methods.md)

#### Extending the HTTP Protocol

If you want to follow the first path, you can direct Appium to recognize new methods and add them
to its set of allowed HTTP routes and command names. You do this by assigning the `newMethodMap`
static variable in your driver class to an object of the same form as Appium's `routes.js` object.
For example, here is part of the `newMethodMap` for the `FakePlugin` example driver:

```js
static newMethodMap = {
  '/session/:sessionId/fake_data': {
    GET: {command: 'getFakeSessionData', neverProxy: true},
    POST: {
      command: 'setFakeSessionData',
      payloadParams: {required: ['data']},
      neverProxy: true,
    },
  },
  '/session/:sessionId/fakepluginargs': {
    GET: {command: 'getFakePluginArgs', neverProxy: true},
  },
};
```

!!! note

    If you're using TypeScript, static member objects like these should be defined `as const`.

In this example we're adding a few new routes and a total of 3 new commands. For more examples of
how to define commands in this way, it's best to have a look through `routes.js`. Now all you need
to do is implement the command handlers in the same way you'd implement any other Appium command.

Note also the special `neverProxy` key for commands; this is generally a good idea to set to `true`
for plugins, since your plugin might be active for a driver that is put into proxy mode but hasn't
bothered to decline proxying for these (new and therefore unknown) commands. Setting `neverProxy`
to `true` here will cause Appium to never proxy these routes and therefore ensure your plugin
handles them, even if a driver is in proxy mode.

The downside of adding new commands via `newMethodMap` is that people using the standard Appium
clients won't have nice client-side functions designed to target these endpoints. So you would need
to create and release client-side plugins for each language you want to support (directions or
examples can be found at the relevant client docs).

#### Extending the BiDi Protocol

You can also make new commands accessible via the WebDriver BiDi (WebSocket-based) protocol. BiDi
commands come in two parts: a "module", which is basically a container or namespace, and
a "command", which is the name of your new command.

As with the first method, you teach Appium to recognize your new BiDi commands by adding a static
field to your driver class, called `newBidiCommands`. It has a format similar to `newMethodMap`.
Basically it encapsulates information about the BiDi module, BiDi command name, reference to your
driver instance method that will handle the command, and required and optional parameters. Here's
an example of a `newBidiCommands` as implemented on an imaginary driver:

```js
static newBidiCommands = {
  'appium:video': {
    startFramerateCapture: {
      command: 'startFrameCap',
      params: {
        required: ['videoSource'],
        optional: ['showOnScreen'],
      }
    },
    stopFramerateCapture: {
      command: 'stopFrameCap',
    },
  }
};
```

In this imaginary example, we have defined two new BiDi commands: `appium:video.startFramerateCapture` and
`appium:video.stopFramerateCapture`. The first command takes a required and an optional parameter, and the
second does not. When you have implemented the `startFrameCap` and `stopFrameCap` methods on your
plugin class, they will be called whenever the BiDi commands are triggered by a client. The
signatures for these methods would look as follows:

```js
async startFrameCap(next: () => Promise<any>, driver: DriverClass, videoSource: string, showOnScreen: boolean): Promise<any>;
async stopFrameCap(next: () => Promise<any>, driver: DriverClass): Promise<any>;
```

As with adding or overriding existing HTTP protocol commands, these methods are injected with
a `next` parameter and a `driver` parameter. The `driver` object represents the driver currently
owning the session, and calling `await next()` will execute/return the behavior that would execute
were the plugin not active (i.e., the driver's own handling of that method, or the chain of
commands executed with the same name by other active plugins).

Note that, currently, if a driver has BiDi proxying turned on, plugins will not be able to override
BiDi methods handled by the proxy. Also note that since these are custom BiDi commands, our module
name should include a vendor prefix (we chose `appium:`, but you can/should choose something that
makes sense for your extension).

#### Overloading Execute Script

An alternative to these ways of doing things is to overload a command which all WebDriver clients
have access to already: Execute Script. Make sure to read the section on [adding new
commands](./build-drivers.md#extend-the-existing-protocol-with-new-commands) in
the Building Drivers guide to understand the way this works in general. The way it works with
plugins is only slightly different. Let's look at an example taken from Appium's `fake-plugin`:

```js
static executeMethodMap = {
  'fake: plugMeIn': {
    command: 'plugMeIn',
    params: {required: ['socket']},
  },
};

async plugMeIn(next, driver, socket) {
  return `Plugged in to ${socket}`;
}

async execute(next, driver, script, args) {
  return await this.executeMethod(next, driver, script, args);
}
```

We have three important components shown here which make this system work, all of which are defined
inside the plugin class:

1. The `executeMethodMap`, defined in just the same way as for drivers
1. The implementation of the command method as defined in `executeMethodMap` (in this case,
   `plugMeIn`)
1. The overriding/handling of the `execute` command. Just like any plugin command handlers, the
first two arguments are `next` and `driver`, followed by the script name and args. `BasePlugin`
implements a helper method which we can simply call with all of these arguments.

Overriding Execute Methods from drivers works as you'd expect: if your plugin defines an Execute
Method with the same name as that of a driver, your command (in this case `plugMeIn`) will be
called first. You can choose to run the driver's original behaviour via `next` if you want.

### Emit BiDi Events

Your plugin can emit custom BiDi events in [exactly the same way as Appium
drivers](./build-drivers.md#emit-bidi-events).

### Build Appium Doctor checks

Your users can run `appium plugin doctor <pluginName>` to run installation and health checks. Visit
the [Building Doctor Checks](./build-doctor-checks.md) guide for more information on this
capability.

### Update the Appium server object

You probably don't normally need to update the Appium server object (which is an
[Express](https://expressjs.com/) server having already been
[configured](https://github.com/appium/appium/blob/master/packages/base-driver/lib/express/server.js)
in a variety of ways). But, for example, you could add new Express middleware to the server to
support your plugin's requirements. To update the server you must implement the `static async
updateServer` method in your class. This method takes three parameters:

* `expressApp`: the Express app object
* `httpServer`: the Node HTTP server object
* `cliArgs`: a map of the CLI args used to start the Appium server

You can do whatever you want with them inside the `updateServer` method. You might want to
reference how these objects are created and worked with in the BaseDriver code, so that you know
you're not undoing or overriding anything standard and important. But if you insist, you can, with
results you'll need to test! Warning: this should be considered an advanced feature and requires
knowledge of Express, as well as the care not to do anything that could affect the operation of
other parts of the Appium server!

### Handle unexpected session shutdown

When developing a plugin you may want to add some cleanup logic for when a session ends. You would
naturally do this by adding a handler for `deleteSession`. This works in most cases, except when
the session does not finish cleanly. Appium sometimes determines that a session has finished
unexpectedly, and in these situations, Appium will look for a method called `onUnexpectedShutdown`
in your plugin class, which will be called (passing the current session driver as the first
parameter, and the error object representing the cause of the shutdown as the second), giving you
an opportunity to take any steps that might be necessary to clean up from the session. For example,
keeping in mind that the function is not `await`ed you could implement something like this:

```js
async onUnexpectedShutdown(driver, cause) {
  try {
    // do some cleanup
  } catch (e) {
    // log any errors; don't allow anything to be thrown as they will be unhandled rejections
  }
}
```


--- SOURCE: en/contributing/index.md ---

---
hide:
  - navigation

title: Contributing to Appium
---

The Appium project would not exist without the many contributions of code, documentation,
maintenance, and support from companies and volunteers. As such, we welcome contributions!

There are a lot of different ways to help the project - see below for everything you can do and the
processes to follow for each contribution method. Note that no matter how you contribute, your
participation is governed by our [Code of Conduct](https://github.com/appium/appium/blob/master/CONDUCT.md).

## Join the Discussion Forum

You don't need to know the internals of Appium to be able to contribute! If you have experience with
using Appium and feel like sharing your knowledge with others, consider helping out users on the
Appium forums at [discuss.appium.io](https://discuss.appium.io/). Hop on over and see if there are
any questions that you can answer.

## Report Bugs or Feature Requests

If you've encountered a bug, or have a cool feature in mind that you think Appium should support,
make sure to let us know at our [GitHub issue tracker](https://github.com/appium/appium/issues).
Please use the appropriate issue form template when creating your issue.

## Triage Issues

In addition to creating issues, you can also help us investigate already reported issues. All you
need is enough familiarity with Appium to try and reproduce bugs.

You can get started by checking our [GitHub issue tracker](https://github.com/appium/appium/issues)
for issues with labels such as `Needs Triage` or `Needs Info`, and leaving relevant comments:

-   If the issue is a duplicate, drop a link to the original issue
-   If the user has not provided enough information (such as Appium logs), ask them for more details
-   If you can reproduce the problem on your own environment, provide all the information that you think
    would help us track down the cause of the issue

For further information on triaging Appium issues (for any Appium project repository), please contact
any member of the [Technical Committee](https://github.com/appium/appium/blob/master/GOVERNANCE.md#the-technical-committee).

## Contribute Code

We are always open to pull requests for improving the Appium code or documentation!

!!! info

    Developer information may not be kept up to date as frequently as user-facing information, or
    it may be most relevant in its current form on the online repository, not in this published
    version. Make sure to check the repo or discuss with maintainers. We would be glad to help
    new contributors get started!

Start by cloning the repository (we recommend [forking](https://github.com/appium/appium/fork)
it first):
```sh
git clone https://github.com/appium/appium.git
cd appium
```

!!! info

    If you are VS Code user, you can easily check out the project using [Runme](https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Fappium%2Fappium.git&fileToOpen=packages%2Fappium%2Fdocs%2Fen%2Fcontributing%2Findex.md).

Install dependencies:
```sh
npm install
```

From here on there are several things you can do.

Build the project:
```sh
npm run build
```

Build the project and watch for changes:
```sh
npm run dev
```

Start the locally built Appium server:
```sh
npm start
```

Run various tests:
```sh
npm run lint
npm run test:unit
npm run test:types
npm run test:smoke
npm run test:e2e
npm run test:quick # unit and types
npm run test:slow # everything
```

You can also run tests for specific workspaces, e.g.:

```sh
export APPIUM_WORKSPACE=@appium/base-driver
npm run test:unit -w $APPIUM_WORKSPACE
```

### Documentation

The documentation for this project is [available in the project repository itself](https://github.com/appium/appium/tree/master/packages/appium/docs).
It is contained in Markdown files, which are built by our documentation system in the
`@appium/docutils` module. This module is based on [MkDocs](https://www.mkdocs.org/) and therefore
requires [Python](https://www.python.org/) to be installed on your system.

Install Python dependencies:
```sh
npm run install-docs-deps
```

After making your changes, you can run the documentation server in dev mode:
```sh
npm run dev:docs
```

You can then view the documentation at `http://127.0.0.1:8000/docs/en`.

## Translating Appium Documentation

The process of Appium documents localization into languages other than English is automated and is done via
the [Crowdin Translations Management System](https://crowdin.com). Do not edit any translated documents
directly in the GitHub Appium repository as they are going to be replaced with ones exported from Crowdin
during an upcoming sync.

### Where To Start

If you would like to contribute to the translation of Appium documents into your language then simply join
the translators group for the [Appium Documentation](https://crowdin.com/project/appium-documentation)
Crowdin project, and start translating documents there. If you see that your language is missing from
the list of available Crowdin languages then simply let us know by creating an
[issue](https://github.com/appium/appium/issues).

### Source Language Updates

Changes in documents are synchronized to Crowdin automatically via the `Update Crowdin English Docs` GitHub action.
This action is triggered automatically as soon as there are any changes under `packages/appium/docs/en/**.md`
or `packages/appium/docs/mkdocs-en.yml`.

### Fetching Translated Documents

In order to fetch translated files from Crowdin to the GitHub repository it is necessary to trigger
the `Sync Crowdin Docs Translations` action. This action should also automatically create a PR with
corresponding translated resources included.


--- SOURCE: en/resources/index.md ---

---
hide:
  - navigation
  - toc

title: Additional Resources
---

Here you can find links to additional Appium resources around the web:

## Websites

- [Appium Pro](https://appiumpro.com) - a blog and newsletter written by one of Appium's
maintainers, Jonathan Lipps, with lots of useful guides

## Online Courses

- [Appium and Selenium Fundamentals](https://ui.headspin.io/university/learn/appium-selenium-fundamentals-2020) - a comprehensive video course on learning Python, Selenium, and Appium by Jonathan Lipps
- [Mobile Test Automation with Appium](https://testautomationu.applitools.com/appium-java-tutorial/) - a video course by Moataz Nabil
- [Advanced Appium](https://www.linkedin.com/learning/advanced-appium) - a video course by Jonathan Lipps

## Conference Archives

- [AppiumConf 2018](https://www.youtube.com/playlist?list=PLhr2WKNPXcZOmOf1k2aqkbMZwnZb2pSZL)
- [AppiumConf 2019](https://www.youtube.com/playlist?list=PL9Z-JgiTsOYSfJh9YKI9Stj3FMwHERw6w)
- [AppiumConf 2021](https://www.youtube.com/playlist?list=PL9Z-JgiTsOYRCcJhDfmKAah9XmAp2b903)
- [AppiumConf 2024](https://www.youtube.com/playlist?list=PL9Z-JgiTsOYQaU5i5LJtAWlh5WVZPi3If)
- [SeleniumConf & AppiumConf 2025](https://www.youtube.com/playlist?list=PLRdSclUtJDYV2R92TLbmwxws6clruuTjH)


--- SOURCE: en/quickstart/requirements.md ---

---
hide:
  - toc

title: System Requirements
---

The basic requirements for the Appium server are:

* A macOS, Linux, or Windows operating system
* [Node.js](https://nodejs.org) version in the [SemVer](https://semver.org) range `^20.19.0 || ^22.12.0 || >=24.0.0`
    * LTS is recommended
* [`npm`](https://npmjs.com) version `>=10` (`npm` is usually bundled with Node.js, but can be upgraded
independently)

By itself, Appium is relatively lightweight and doesn't have significant disk space or RAM
requirements. It can even be run in resource-constrained environments like Raspberry Pi, so long as
Node.js is available.

### Driver Requirements

Drivers for automating specific platforms will likely have other requirements. Refer to the
documentation of the [Appium driver(s)](../ecosystem/drivers.md) for that platform for additional
dependencies. It is almost universally the case that Appium drivers for a given platform will
require the developer toolchain and SDKs for that platform to be installed.

In order to assist with driver requirements, each (official) driver comes with the Appium Doctor tool,
which allows to verify if all requirements have been set up. Learn more about how to use this tool in
the [Command-Line Usage documentation](../reference/cli/extensions.md#doctor).


--- SOURCE: en/quickstart/test-py.md ---

---
hide:
  - toc

title: Write a Test (Python)
---

The [Appium Python Client](https://github.com/appium/python-client) is
an official Appium client in Python, which is available via pypi under the [Appium-Python-Client](https://pypi.org/project/Appium-Python-Client/) package name.
It inherits from the [Selenium Python Binding](https://pypi.org/project/selenium/),
so installing the Appium Python Client includes the selenium binding.

```bash
pip install Appium-Python-Client
```

This example uses Python's built-in `unittest` module, though you can use any Python test framework you want.
The Appium Python client adds the `appium:` vendor prefix automatically.
You usually do not need to worry about the prefix.

```python title="test.py"
--8<-- "./sample-code/quickstarts/py/test.py"
```

!!! note

    It's not within the scope of this guide to give a complete run-down on the Python client
    library or everything that's happening here, so we'll leave the code itself unexplained in detail for now.

    - You may want to read up particularly on Appium [Capabilities](../guides/caps.md).
    - [functional test code](https://github.com/appium/python-client/tree/master/test/functional) in Python Client GitHub repository should help to find more working example.
    - [Documentation](https://appium.github.io/python-client-sphinx/) also helps to find methods
    defined in the Appium Python Client.

!!! note

    The sample code is available from [GitHub Appium repository](https://github.com/appium/appium/tree/master/packages/appium/sample-code/quickstarts/py).


Basically, this code is doing the following:

1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows what
kind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Apps" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session.

That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server
running in another terminal session, otherwise you'll get an error about not being able to connect
to one. Then, you can execute the script:

```bash
python test.py
```

If all goes well, you'll see the Settings app open up and navigate to the "Apps" view before the
app closes again.

Congratulations, you've started your Appium journey! Read on for some [next steps](./next-steps.md) to explore.


--- SOURCE: en/quickstart/install.md ---

---
hide:
  - toc

title: Install Appium
---

!!! info

    Before installing, make sure to check the [System Requirements](./requirements.md).

Appium can be installed globally using `npm`:

```bash
npm install -g appium
```

!!! note

    Other package managers are not currently supported.

## Starting Appium

Appium can be started [using the command line](../reference/cli/index.md):

```
appium
```

This launches the Appium server process, which loads all the installed Appium drivers, and
begins waiting for new session requests from client connections (such as test automation scripts).
Since the server process is independent from its clients, it must be explicitly launched before
attempting to start a new session.

When the server is launched, the console log will list all the valid URLs that clients can use to
connect to this server:

```
[Appium] You can provide the following URLs in your client code to connect to this server:
[Appium] 	http://127.0.0.1:4723/ (only accessible from the same host)
(... any other URLs ...)
```

Once a client requests a new session, the Appium server process will start logging all details about
this session until its termination. Keep this in mind - if you ever encounter issues with Appium
tests, you can always check the server log for more details.

So what's next? Even though Appium is installed and running, it does not come bundled with any
drivers, which means it cannot automate anything yet. We will therefore set up automation for
Android - continue to [Installing the UiAutomator2 Driver](./uiauto2-driver.md).


--- SOURCE: en/quickstart/test-js.md ---

---
hide:
  - toc

title: Write a Test (JS)
---

To write an Appium test in JavaScript (Node.js), we need to choose an Appium-compatible client
library. The best-maintained library and the one the Appium team recommends using is
[WebdriverIO](https://webdriver.io), so let's use that. Since we already have Appium installed we
know our Node and NPM requirements are already satisfied. So just create a new project directory
somewhere on your computer and then initialize a new Node.js project in it:

```bash
npm init
```

It doesn't really matter what you put in the prompts, just so long as you end up with a valid
`package.json`.


Now, install the `webdriverio` package via NPM:

```bash
npm i --save-dev webdriverio
```

Once this is done, your `package.json` file should include a section like the following:

```json title="package.json"
--8<-- "./sample-code/quickstarts/js/package.json"
```

Now it's time to type up the test itself. Create a new file called `test.js` with the following
contents:

```js title="test.js"
--8<-- "./sample-code/quickstarts/js/test.js"
```

!!! note

    It's not within the scope of this guide to give a complete run-down on the WebdriverIO client
    library or everything that's happening here, so we'll leave the code itself unexplained in
    detail for now. You may want to read up particularly on Appium
    [Capabilities](../guides/caps.md) in addition to familiarizing yourself with the excellent
    [WebdriverIO documentation](https://webdriver.io/docs/gettingstarted) for a fuller explanation
    of the various API commands you see and what their purpose is.

!!! note

    The sample code is available from [GitHub Appium repository](https://github.com/appium/appium/tree/master/packages/appium/sample-code/quickstarts/js).


Basically, this code is doing the following:

1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows what
kind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Apps" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session.

That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server
running in another terminal session, otherwise you'll get an error about not being able to connect
to one. Then, you can execute the script:

```bash
node test.js
```

If all goes well, you'll see the Settings app open up and navigate to the "Apps" view before the
app closes again.

Congratulations, you've started your Appium journey! Read on for some [next steps](./next-steps.md) to explore.


--- SOURCE: en/quickstart/index.md ---

---
hide:
  - toc

title: Getting Started
---

Let's get up and running with Appium! To successfully use this quickstart, it's recommended that
you first have read the [Introduction](../intro/index.md), so that you understand the concepts involved in
running Appium and writing Appium scripts.

The basic plan for this quickstart is as follows:

1. Install Appium
1. Install an Appium driver and its dependencies
    - This guide provides instructions for the [UiAutomator2 driver](https://github.com/appium/appium-uiautomator2-driver)
1. Install an Appium client library in your language of choice
    - This guide contains options for JavaScript, Python, Java, Ruby, and .NET
1. Write and run a simple Appium automation script using a sample application

### Requirements

Before getting started, make sure your system satisfies the
[requirements](../quickstart/requirements.md) for running the Appium server. Additional requirements
will be discussed in conjunction with installing the UiAutomator2 driver. The guide also assumes
you have basic command line proficiency on your platform, for example being able to run commands, set
and persist environment variables, etc...

Now you're ready to get started! So head on over to [Installing Appium](./install.md).


--- SOURCE: en/quickstart/uiauto2-driver.md ---

---
title: Install the UiAutomator2 Driver
---

You can't do much with Appium unless you have a [driver](../intro/drivers.md), which is an
interface that allows Appium to automate a particular platform.

!!! info

    For this quickstart guide, we're going to be automating an app on the Android platform, because
    the system requirements for Android automation via Appium are the same as for Appium itself
    (whereas the iOS driver, for example, requires you to be using macOS).

The driver we're going to use is called the [UiAutomator2
Driver](https://github.com/appium/appium-uiautomator2-driver). It's worth visiting that driver's
documentation and bookmarking it, because it will be an invaluable reference down the line.

## Set up Android automation requirements

According to the driver, in addition to a working Appium server, we also need to set up the following:

### Android SDK

- The easiest way to set up the Android SDK requirements is by downloading [Android Studio](https://developer.android.com/studio).
We need to use its SDK manager (_Settings -> Languages & Frameworks -> Android SDK_)
to download the following items:
    - Android SDK Platform (select whichever Android platform we want to automate, for example, API level 30)
    - Android SDK Platform-Tools
- If you wish, you can also download these items without Android Studio:
    - Android SDK Platform can be downloaded using `sdkmanager` included in [Android command-line tools](https://developer.android.com/studio#command-line-tools-only)
    - [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools)
- Set up the `ANDROID_HOME` environment variable to point to the directory where the Android SDK is
installed. You can usually find the path to this directory in the Android Studio SDK manager. It
will contain the `platform-tools` and other directories.

### Java JDK

- Install the Java JDK (for the most recent Android API levels, JDK 9 is required, otherwise JDK
8 is required). You can download this from [Oracle](https://jdk.java.net/) or [Adoptium](https://adoptium.net/en-GB/temurin/releases/).
Make sure you get the JDK and not the JRE.
- Set up the `JAVA_HOME` environment variable to point to the JDK home directory. It will contain
the `bin`, `include`, and other directories.

### Prepare the Device

- If using an emulator, use Android Studio to create and launch an Android Virtual Device (AVD).
You may need to download the system images for the API level of the emulator you want to
create. Using the AVD creation wizard in Android Studio is generally the easiest way to do all of
this.
- If using a real device, you should [set it up for development and enable USB Debugging](https://developer.android.com/studio/debug/dev-options).
- With the emulator or device connected, you can run `adb devices` (via the binary located at
`$ANDROID_HOME/platform-tools/adb`) to verify that your device shows up as connected.

Once your device shows up as connected in `adb`, and you've verified that the environment variables
are set up correctly, you should be good to go! If you ran into problems with any of these steps,
refer to the driver documentation, or the various Android or Java documentation sites as necessary.

Also, congratulations: whether or not you intended to, you now have the Android developer toolchain
set up on your system, so you can get busy making Android apps if you want!

## Install the driver itself

### Standard Install

Like all Appium drivers, the UiAutomator2 driver is installed via the [Appium Extension CLI](../reference/cli/extensions.md).
Since UiAutomator2 is maintained by the core Appium team, it has an 'official' driver name
(`uiautomator2`), which makes the installation simpler.

Before installing, make sure your Appium server is _not_ running (if it is, quit it with _Ctrl-C_).
Then run the following command:

```bash
appium driver install uiautomator2
```

It should produce output that looks something like:

```
Attempting to find and install driver 'uiautomator2'
✔ Installing 'uiautomator2' using NPM install spec 'appium-uiautomator2-driver'
Driver uiautomator2@2.0.5 successfully installed
- automationName: UiAutomator2
- platformNames: ["Android"]
```

Note how the installation process specifies what platforms is the driver valid for (in this case,
`Android`), and what automation name (the `appium:automationName` [capability](../guides/caps.md))
must be used to select this driver for use during an Appium session (in this case, `UiAutomator2`).

!!! note

    In this quickstart we have used the [Extension CLI](../reference/cli/extensions.md) to install the
    UiAutomator2 driver, but if you are incorporating Appium into a Node.js project, you might
    prefer to use `npm` to manage Appium and its connected drivers. To learn more about this
    technique, visit the guide on [managing Appium extensions](../guides/managing-exts.md).

### Batch Install

You may want to use Appium with more than one driver. One way to accomplish this is to run
`appium driver install <driver-name>` for each individual driver, but you can also install multiple
drivers in one go:

```
appium setup
```

Running this will install Appium's mobile-specific drivers: UiAutomator2, [XCUITest](https://appium.github.io/appium-xcuitest-driver/)
(only if running macOS), and [Espresso](https://github.com/appium/appium-espresso-driver).

You can also use this command to batch install drivers for desktop applications or desktop browsers.
For more details on this, refer to the [Setup command documentation](../reference/cli/setup.md).

### Validating the Install

The UiAutomator2 driver, like all official Appium drivers, comes with the Appium Doctor tool, which
allows validating whether all prerequisites have been set up correctly:

```
appium driver doctor uiautomator2
```

This guide has focused on essential requirements, so Appium Doctor may suggest one or more optional
fixes. But if you see `0 required fixes needed`, that means everything is set up!

Now, start the Appium server again (run `appium`), and you should see that the newly-installed
driver is listed as available:

```
[Appium] Available drivers:
[Appium]   - uiautomator2@2.0.5 (automationName 'UiAutomator2')
```

With the Android setup complete and the UiAutomator2 driver installed, you're ready to write your
first test! Now select your preferred language and give it a shot:

<div class="grid cards" markdown>

-   :material-language-javascript: [__JavaScript__](./test-js.md)
-   :material-language-java: [__Java__](./test-java.md)
-   :material-language-python: [__Python__](./test-py.md)
-   :material-language-ruby: [__Ruby__](./test-rb.md)
-   :material-dot-net: [__.NET C#__](./test-dotnet.md)

</div>


--- SOURCE: en/quickstart/next-steps.md ---

---
hide:
  - toc

title: Next Steps
---

Now that you've successfully set up your system for Android automation and run a simple test,
you'll want to continue exploring this documentation. In particular, these are good guides and
reference materials especially for beginners:

- The [Ecosystem](../ecosystem/index.md) page: browse the available drivers, clients, plugins, and tools
- [Managing Appium Drivers and Plugins](../guides/managing-exts.md)
- [Capabilities](../guides/caps.md)
- [Settings](../guides/settings.md)

You'll also find that the [Appium Inspector](https://github.com/appium/appium-inspector) is an
indispensable tool for writing Appium tests, as it enables visual inspection of apps and
helps you to discover element locators for use in your test scripts.

You might also take advantage of one of the many online Appium courses available to you.

Good luck and have fun!


--- SOURCE: en/quickstart/test-rb.md ---

---
hide:
  - toc

title: Write a Test (Ruby)
---


The [AppiumLib](https://github.com/appium/ruby_lib) and the [AppiumLibCore](https://github.com/appium/ruby_lib_core) (**recommended**) are official Appium client libraries in Ruby, which are available via gem under the [appium_lib](https://rubygems.org/gems/appium_lib) and the [appium_lib_core](https://rubygems.org/gems/appium_lib_core) package names. The appium_lib_core inherits from the Selenium Ruby Binding, and the appium_lib inherits from the appium_lib_core, so installing these libraries include the selenium binding. We recommend `appium_lib_core` if you need a less complex client-side solution. The `appium_lib` has some useful methods the core does not have, but for the cost of greater complexity and historical methods which may not work in the latest environment.

As the first step, let's initialize a Gemfile to manage the dependency:

```bash
bundle init
```

Then, you could add Appium Ruby Client dependency as below:

```bash
bundle add appium_lib_core
# or
# bundle add appium_lib
```

Test code example below uses `test-unit` module, thus please run:

```bash
bundle add test-unit
```

Once these steps has done, your `Gemfile` file should include:

```ruby title="Gemfile"
--8<-- "./sample-code/quickstarts/rb/Gemfile"
```

The `appium_lib_core` is the main part as an Appium client.
`appium_lib` has various helper methods, but the driver instance was ordinary designed to be used as a global variable. It could causes an issue to handle the instance.
`appium_lib_core` does not have such a global variable.

This example is by the `appium_lib_core` with `test-unit` gem module.
Tes code in `appium_lib` should be similar.

```ruby title="test.rb"
--8<-- "./sample-code/quickstarts/rb/test.rb"
```

!!! note

    It's not within the scope of this guide to give a complete run-down on the Ruby client
    library or everything that's happening here, so we'll leave the code itself unexplained in detail for now.

    - You may want to read up particularly on Appium [Capabilities](../guides/caps.md).
    - [functional test code](https://github.com/appium/ruby_lib_core/tree/master/test/functional) in the appium_lib_core GitHub repository should help to find more working example.
    - Documentation [appium_lib_core](https://www.rubydoc.info/github/appium/ruby_lib_core) and [appium_lib](https://www.rubydoc.info/github/appium/ruby_lib) also helps to find available methods.

!!! note

    The sample code is available from [GitHub Appium repository](https://github.com/appium/appium/tree/master/packages/appium/sample-code/quickstarts/rb).


Basically, this code is doing the following:

1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows what
kind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Apps" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session.

That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server
running in another terminal session, otherwise you'll get an error about not being able to connect
to one. Then, you can execute the script:

```bash
# Please run "bundle install" first if your environment has not run the installation command yet.
bundle exec ruby test.rb
```

If all goes well, you'll see the Settings app open up and navigate to the "Apps" view before the
app closes again.

Congratulations, you've started your Appium journey! Read on for some [next steps](./next-steps.md) to explore.


--- SOURCE: en/quickstart/test-dotnet.md ---

---
hide:
  - toc

title: Write a Test (.NET)
---

The [Appium .NET Client](https://github.com/appium/dotnet-client/) is
an official Appium client in C#. This driver is an extension of the Selenium C# client. It has all the functionalities of the regular driver, but add Appium-specific methods on top of this. The driver is available on the public NuGet Gallery as [Appium.WebDriver](https://www.nuget.org/packages/Appium.WebDriver/).

Now, we get inside the directory and create a new [NUnit](https://nunit.org/) project. We will also add the references to the Appium.Net driver, and other dependencies.

```bash
cd dotnet-client
dotnet new nunit --name appiumtest

cd appiumtest

# This will install the latest 5.x version
dotnet add package Appium.WebDriver  --prerelease
dotnet add package Newtonsoft.Json --version 13.0.3
```

Once this is done, your project should have a placeholder file `UnitTest1.cs`. We will replace the code to include the OpenQA namespaces, an initialization of the driver, and the actual test.

```C# title="UnitTest1.cs"
using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Enums;

namespace appiumtest;

public class Tests
{
    private AndroidDriver _driver;

    [OneTimeSetUp]
    public void SetUp()
    {
        var serverUri = new Uri(Environment.GetEnvironmentVariable("APPIUM_HOST") ?? "http://127.0.0.1:4723/");
        var driverOptions = new AppiumOptions() {
            AutomationName = AutomationName.AndroidUIAutomator2,
            PlatformName = "Android",
            DeviceName = "Android Emulator",
        };

        driverOptions.AddAdditionalAppiumOption("appPackage", "com.android.settings");
        driverOptions.AddAdditionalAppiumOption("appActivity", ".Settings");
        // NoReset assumes the app com.google.android is preinstalled on the emulator
        driverOptions.AddAdditionalAppiumOption("noReset", true);

        _driver = new AndroidDriver(serverUri, driverOptions, TimeSpan.FromSeconds(180));
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    }

    [OneTimeTearDown]
    public void TearDown()
    {
        _driver.Dispose();
    }

    [Test]
    public void TestFindApps()
    {
        _driver.StartActivity("com.android.settings", ".Settings");
        _driver.FindElement(By.XPath("//*[@text='Apps']")).Click();
    }
}
```

!!! note

    It's not within the scope of this guide to give a complete run-down on the dotnet client
    library or everything that's happening here, so we'll leave the code itself unexplained in
    detail for now. You may want to read up particularly on Appium
    [Capabilities](../guides/caps.md) in addition to familiarizing yourself with the
    [dotnet client driver documentation](https://github.com/appium/dotnet-client/) for a fuller explanation
    of the various API commands you see and what their purpose is.

Basically, this code is doing the following:

1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows what
kind of thing you want to automate. Some of these parameters can be overridden using environment variables.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Apps" list item and clicking it.
1. Ending the Appium session.

That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server
running in another terminal session, otherwise you'll get an error about not being able to connect
to one. Then, you can execute the script:

```bash
dotnet test

# Example output:
# Starting test execution, please wait...
# A total of 1 test files matched the specified pattern.

# Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: 323 ms - appiumtest.dll (net7.0)
```

If all goes well, you'll see the Settings app open up and navigate to the "Apps" view in the emulator before the app closes again.

Congratulations, you've started your Appium journey! Read on for some [next steps](./next-steps.md) to explore.


--- SOURCE: en/quickstart/test-java.md ---

---
hide:
  - toc

title: Write a Test (Java)
---

The Appium team maintains an official [client](https://github.com/appium/java-client) for the Java programming language.
It is built on top of [Selenium](https://github.com/SeleniumHQ/selenium).
You can also use this client in your Kotlin projects.

Follow the [Add Appium java client to your test framework](https://github.com/appium/java-client#add-appium-java-client-to-your-test-framework)
tutorial in order to connect the library to your test framework sources.

The Appium Java client has dedicated classes to support most of the official Appium drivers. For other drivers
you could simply use the [AppiumDriver](https://github.com/appium/java-client/blob/master/src/main/java/io/appium/java_client/AppiumDriver.java) class
or build your custom derivatives from it. Check the [Drivers Support](https://github.com/appium/java-client#drivers-support)
article to learn more about the current driver class implementations.

Follow the [Usage Examples](https://github.com/appium/java-client#usage-examples) article in order understand
how to invoke Java client features from your test framework.

Once you've managed to successfully run a test, you can read on for some [next steps](./next-steps.md) to explore.

--- SOURCE: en/blog/index.md ---

# Appium Blog



--- SOURCE: en/blog/posts/hello-world.md ---

---
authors:
  - jlipps
date: 2024-03-07
---

# Hello World!

This is the first post in the Appium blog. There's not much to see here yet. We're creating this
space so we can make announcements or post other news, or information about events, that don't
really fit inside the documentation itself.

<!-- more -->

Stay tuned for more!


--- SOURCE: en/blog/posts/announcing-lambdatest-as-strategic-partner.md ---

---
authors:
  - jlipps
date: 2025-07-01
---

# Announcing LambdaTest as Appium Strategic Partner

After recently celebrating the 1-year anniversary of our [Sponsorship Program and Compensation
Scheme](https://appium.io/docs/en/latest/blog/2024/05/14/announcing-appiums-sponsorship-program/),
the Appium project is very excited to announce that <a
href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">LambdaTest</a>
is coming on board as one of our Strategic Partners!

<!-- more -->

<div style="text-align:center;width:100%">
  <a href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">
    <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-dark.png#only-dark" width="300" />
    <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-light.png#only-light" width="300" />
  </a>
</div>

Having long been active in the Appium community and the automated testing industry, LambdaTest is
now significantly stepping up their investment into these areas. With the decision to come on board
as a Strategic Partner, LambdaTest will support the Appium project through financial contribution
as well as contribution of code and project maintenance. Obviously, without the generous support of
partners like LambdaTest, we would not be able to continue our contributor compensation scheme,
which has seen the release of a substantial amount of funds to Appium maintainers and contributors
over the last year. Thanks again to LambdaTest, and stay tuned for more collaboration updates
throughout the year!

**About LambdaTest**

<em>LambdaTest is a GenAI-powered Quality Engineering Platform that empowers teams to test
intelligently, smarter, and ship faster. Built for scale, it offers a full-stack testing cloud with
10K+ real mobile devices and 3,000+ browsers. With AI-native test management, MCP servers, and
agent-based automation, LambdaTest supports Selenium, Appium, Playwright, and all major frameworks.
AI Agents like HyperExecute and KaneAI bring the power of AI and cloud into your software testing
workflow, enabling seamless automation testing with 120+ integrations. LambdaTest Agents accelerate
your testing throughout the entire SDLC, from test planning and authoring to automation,
infrastructure, execution, RCA, and reporting.</em>


--- SOURCE: en/blog/posts/announcing-browserstack-as-strategic-partner.md ---

---
authors:
  - jlipps
date: 2024-06-10
---

# Announcing BrowserStack as Appium's Strategic Partner

We have another exciting announcement for you! As part of our recently-announced [sponsorship and
contributor compensation
program](https://appium.io/docs/en/latest/blog/2024/05/14/announcing-appiums-sponsorship-program/),
we are obviously in need of significant funding to support giving back to our contributor
community. We are therefore extremely happy to announce one of our brand new exclusive Strategic Partners: <a
href="https://www.browserstack.com/browserstack-appium?utm_campaigncode=701OW00000AoUTQYA3&utm_medium=partnered&utm_source=appium">BrowserStack</a>!

<!-- more -->

<div style="text-align:center;width:100%">
  <a href="https://www.browserstack.com/browserstack-appium?utm_campaigncode=701OW00000AoUTQYA3&utm_medium=partnered&utm_source=appium">
    <img src="/docs/en/latest/assets/images/sponsor-logo-browserstack-dark.png#only-dark" width="300" />
    <img src="/docs/en/latest/assets/images/sponsor-logo-browserstack-light.png#only-light" width="300" />
  </a>
</div>

BrowserStack has long been recognized in the industry as having extensive support for Appium,
allowing you to run functional and visual regression tests for your native and hybrid apps at scale
across a variety of devices and platforms.

As a token of this collaboration, BrowserStack is extending a special premium access of
BrowserStack App Automate product to Appium users. Discover more about this special offer at
[browserstack.com](https://www.browserstack.com/browserstack-appium?utm_campaigncode=701OW00000AoUTQYA3&utm_medium=partnered&utm_source=appium&utm_term=partannouncement)

With the decision to come on board as Strategic Partner, BrowserStack is making a huge investment
in Appium and the Appium community. BrowserStack is very interested in supporting the development
of the Appium contributor base, and is proud to be a key part of our contributor compensation
scheme. Without Strategic Partners like BrowserStack, we would not be able to maintain such
a program! We welcome them with gratitude!

**About BrowserStack**

<em>BrowserStack is the world’s leading software testing platform powering over two million tests every
day across 19 global data centers. BrowserStack helps Tesco, Shell, NVIDIA, Discovery, Wells Fargo,
and over 50,000 customers deliver quality software at speed by moving testing to their Cloud.
BrowserStack’s platform provides instant access to 20,000+ real mobile devices on a highly reliable
cloud infrastructure that effortlessly scales as testing needs grow. With BrowserStack, Dev and QA
teams can move fast while delivering an amazing experience for every customer.</em>


--- SOURCE: en/blog/posts/announcing-appiumconf2024.md ---

---
authors:
  - srini
  - sai
date: 2024-07-13
---

# Appium Conf 2024: Call for Proposals Now Open!

We're thrilled to announce that Appium Conf is back and going online for 2024! This is the official Appium conference where you can learn all about what's new in Appium 2.0 and explore the latest in automating tests for devices, mobile apps, and desktop applications.

<!-- more -->
<div style="text-align:center;width:100%">
    <a href="https://confengine.com/conferences/appium-conf-2024/proposals?utm_medium=referal&utm_source=appium.io&utm_campaign=launch">
    <img id="image-36-42" alt="Appium Conf logo" src="https://appiumconf.com/wp-content/uploads/2021/06/Appium-Conf-Logo.svg" data-src="https://appiumconf.com/wp-content/uploads/2021/06/Appium-Conf-Logo.svg" decoding="async">
</a>
</div>


## Mark Your Calendars: September 13, 2024

Join us on September 13, 2024, for a full day of inspiring and practical talks from the Appium team and the world's top mobile testing and automation experts. With Appium 2.0 now well-established, this is your opportunity to dive deep and learn how to maximize its potential.

## Why Attend Appium Conf 2024?

1. **Gain Insights**: Hear interesting insights and inspiring case studies from global experts and the core Appium team.
2. **Improve Your Strategy**: Gain valuable knowledge to enhance your own automation strategy.
3. **Network**: Make connections with Appium users from around the globe.
4. **Learn from Specialists**: Benefit from Appium specialists' expertise on a variety of topics.

## Call for Proposals: Share Your Knowledge!

We're looking for a diverse range of speakers from around the globe who are eager to share innovative ideas and use-cases of mobile test automation. If you have experience with Appium and insights that could benefit the community of test practitioners, we want to hear from you!

Don't miss this chance to contribute to the Appium community and showcase your expertise on a global stage.

## How to Submit Your Proposal

Visit our website at [https://appiumconf.com/](https://appiumconf.com/) and [Submit a Proposal](https://confengine.com/conferences/appium-conf-2024/proposals?utm_medium=referal&utm_source=appium.io&utm_campaign=launch). We're excited to see your innovative ideas and experiences with Appium!

## Stay Tuned

Keep an eye on our website and social media channels for updates on the conference schedule, keynote speakers, and more exciting details about Appium Conf 2024.

Join us in shaping the future of mobile and device test automation. Submit your proposal today and be part of this exciting event!

--- SOURCE: en/blog/posts/appium3.md ---

---
authors:
  - sai
  - srini
  - jlipps
date: 2025-08-07
---

# 🚀 Appium 3

Appium 3 is here — and while it's not as massive a leap as Appium 2, it introduces a few essential
breaking changes that developers and QA engineers should be aware of.

<!-- more -->

The main idea behind Appium 3 is to clear out old cruft so that Appium can be leaner moving
forward, and rely on newer versions of software with better performance and security
characteristics. We're also getting rid of legacy behaviors and protocols that we deprecated as
part of Appium 2.

For you as a user, there's not much to worry about. The breaking changes are minimal:

- Node.js / NPM minimum version bump (to 20.19 / 10)
- Removal of certain deprecated endpoints
- Security feature flag prefix requirements (e.g. `adb_shell` to `uiautomator2:adb_shell`)

In terms of new features, we've been adding them incrementally rather than saving them up for
Appium 3. But with this release we are excited to share these new capabilities:

- `appium plugin install inspector` (Use Appium to host the Inspector rather than downloading it as a separate app)
- Clients can set the `X-Appium-Is-Sensitive` HTTP header on requests to direct the server to mask the data in the request in the logs, so that when you send a password into an input box, the password's actual value is not logged in plaintext. ([Learn more](../../developing/sensitive.md))

Of course, we have a full [Appium 3 migration guide](../../guides/migrating-2-to-3.md) to make sure
you know all the details and can deeply understand the consequences of upgrading to Appium 3 in
your environment.

---

**Ready to make the leap?** Appium 3 is a great step forward in creating more secure, maintainable,
and W3C-compliant test automation pipelines. Happy testing!


--- SOURCE: en/blog/posts/announcing-headspin-as-development-partner.md ---

---
authors:
  - jlipps
date: 2024-06-06
---

# Announcing HeadSpin as Appium's Development Partner

Recently, we announced a new [sponsorship and contributor compensation program](https://appium.io/docs/en/latest/blog/2024/05/14/announcing-appiums-sponsorship-program/) for the Appium
project. As part of this program, we felt it was important to have a place to recognize those
companies who make an extremely valuable kind of contribution to the project: dedicated maintainer
time. Appium only survives because of the tireless efforts of the core maintainers, and some of us
are only able to do this work because it is donated on behalf of our day jobs. We're therefore very
excited to announce our first Development Partner: <a
href="https://www.headspin.io/solutions/appium-mobile-test-automation">HeadSpin</a>!

<!-- more -->

<div style="text-align:center;width:100%">
  <a href="https://www.headspin.io/solutions/appium-mobile-test-automation"><img
src="/docs/en/latest/assets/images/sponsor-logo-headspin.png" style="width: 300px"/></a>
</div>

HeadSpin is a real device performance and UX analysis cloud, with full support for Appium. When you
run your Appium tests on HeadSpin, you get access to comprehensive performance reports about your
app, including potential network, system resource, or user experience issues. HeadSpin supports
a variety of complex testing modes, including hooking up your own devices to the cloud, injecting
and receiving video and audio to/from devices, working with media (streaming) platforms, and more.

HeadSpin has been one of the Appium project's biggest supporters for a long time, and currently
employs two of Appium's core maintainers, donating a significant portion of their time towards the
development, maintenance, support, and leadership of open source Appium repos. HeadSpin has also
worked hard towards Appium's vision of a robust Appium ecosystem, contributing several
HeadSpin-maintained Appium drivers and plugins to the community:

- A [Roku TV driver](https://github.com/headspinio/appium-roku-driver)
- A [Tizen TV driver](https://github.com/headspinio/appium-tizen-tv-driver/)
- A [LG webOS TV driver](https://github.com/headspinio/appium-lg-webos-driver/)
- A [Unity game automation plugin](https://github.com/headspinio/appium-altunity-plugin)

These are all free and open source Appium components that HeadSpin has donated to the community
with the goal of fostering collaboration in these areas of media app automation.

Looking to the future, HeadSpin plans to continue supporting Appium in significant ways, both as
a Development Partner and a significant contributor to the Appium ecosystem. The Appium project is
deeply indebted to HeadSpin for all of its support, and is proud to take this moment to recognize
HeadSpin as our first official Development Partner!


--- SOURCE: en/blog/posts/announcing-sauce-labs-as-strategic-partner.md ---

---
authors:
  - jlipps
date: 2024-06-10
---

# Announcing Sauce Labs as Appium's Strategic Partner

The good news surrounding our new [sponsorship and contributor compensation
program](https://appium.io/docs/en/latest/blog/2024/05/14/announcing-appiums-sponsorship-program/)
just keeps coming! Effective immediately we are fortunate and excited to be able to welcome a new Strategic Partner to
the Appium project: <a href="https://saucelabs.com/resources/blog/appium-strategic-partner">Sauce Labs</a>!

<!-- more -->

<div style="text-align:center;width:100%">
  <a href="https://saucelabs.com/resources/blog/appium-strategic-partner"><img src="/docs/en/latest/assets/images/sponsor-logo-sauce.png" style="width: 300px"/></a>
</div>

Sauce Labs has a long history of support for the Appium project. In fact, Appium was initially
incubated at Sauce Labs under the direction of [@jlipps](https://github.com/jlipps), in the early
days of mobile automation. Sauce Labs always envisioned Appium as being a project for and by the
community, and cemented this perspective in 2016 with the donation of Appium to the JS Foundation
(now the [OpenJS Foundation](https://openjsf.org/)). To this day, developers associated with Sauce
Labs continue to help maintain various parts of the Appium project.

Now, Sauce Labs is making a further commitment to support Appium financially as a way to enable
our new contributor compensation program. We're very excited about this program as a vehicle for
getting more people involved in Appium's development and maintenance. With the help of Strategic
Partners like Sauce Labs, our project will be better able to meet the needs of our constantly
growing userbase, and attract new developers (like you?) to build the Appium ecosystem together.
Needless to say, we are extremely grateful for Sauce Labs's support!

**About Sauce Labs**

<em>Sauce Labs is the leader in continuous quality. Our Platform for Test helps organizations transform software testing from a chore to a competitive advantage. With decades of expertise and deep roots in the Selenium and Appium open source communities, high performing software teams use our platform to execute any testing workload across thousands of different devices, browsers, and operating systems—anywhere, any time, and at any scale. For more information, please visit [saucelabs.com](https://saucelabs.com).</em>


--- SOURCE: en/blog/posts/announcing-sponsorship-program.md ---

---
authors:
  - jlipps
date: 2024-05-14
---

# Announcing Appium's Sponsorship Program

Over the last several months, the Appium team has been working on a sponsorship program that is
designed to help give back to Appium's contributors as well as to recognize important partner
individuals or companies in the industry. This program is now officially launching! Let's dive into
some of the details.

<!-- more -->

First of all, the details and fine print will always be available at Appium's [Governance
document](https://github.com/appium/appium/blob/master/GOVERNANCE.md), which outlines how the
project is run, who makes project decisions, etc... This document will be kept up to date with the
latest details of the program, so that's the place to bookmark for reference!

As of now, Appium has opened up sponsorship opportunities via our [OpenCollective
page](https://opencollective.com/appium). OpenCollective is a service which allows people to donate
to open source groups. We've defined a number of giving tiers for donations, within a very wide
range, and welcome any financial amount with gratitude! Based on the donation tier, sponsorship
comes with a variety of benefits, including recognition at different places in the Appium repo,
docs, and website. In addition to financial sponsorship, the project has decided to recognize
significant donations of project leadership and maintenance efforts from companies who have
invested heavily into Appium with their employees' time (we call these "Development Partners").

What will the project do with the funds raised through this sponsorship program? We aim to give it
all back to the Appium community! With the details again available at our [Governance document](https://github.com/appium/appium/blob/master/GOVERNANCE.md),
we have implemented a scheme very much inspired by our friends at [WebdriverIO](https://webdriver.io/blog/2024/02/15/new-contributor-stipend-program) (thanks WDIO
friends!) There are three groups of contributors to Appium that this scheme supports: (1) project
maintainers (those who devote consistent time to leading the project), (2) project contributors
(anyone in the wider community that contributes code or documentation), and (3) upstream projects
(other open source projects Appium relies heavily on to work well). Each month, the funds raised
via sponsorship will be distributed in different amounts to each of these groups. So if you
make a valuable contribution to Appium moving forward, you'll be eligible to get some cash as
a thank-you! (You'll need to have your own OpenCollective account in good standing to receive
funds).

We're very excited about this new program, and hope that it helps existing and new contributors to
feel even better about donating their time to making Appium better. And of course, none of this
would be possible without the amazing Partners and Sponsors we hope to attract! On that note, stay
tuned over the next few weeks as we unveil some of our initial program launch Partners! And if you
or your company would like to participate by supporting Appium financially, you are most welcome.
Just head over to our OpenCollective page and choose the tier that reflects your desired
contribution level.


--- SOURCE: en/blog/posts/announcing-lambdatest-as-development-partner.md ---

---
authors:
  - sai
  - srini
date: 2025-11-25
---

# Announcing LambdaTest as Appium's Newest Development Partner

As part of our ongoing effort to recognize organizations that meaningfully support the Appium project through dedicated maintainer time, we are excited to welcome our newest Development Partner: LambdaTest!
LambdaTest has long been an active participant in the automated testing ecosystem. Today, they are officially formalizing their commitment by investing people—dedicated engineers who will directly support Appium's development, maintenance, and ecosystem growth.
This kind of hands-on contribution is crucial for ensuring Appium continues to evolve. We deeply value partners who empower their engineering teams to contribute code directly to open source rather than just sponsorship.

<!-- more -->

<div style="text-align:center;width:100%">
  <a href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">
    <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-dark.png#only-dark" width="300" />
    <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-light.png#only-light" width="300" />
  </a>
</div>


LambdaTest engineers are already contributing actively across several key Appium repositories. Their current focus includes:
 **appium-mcp** – Supporting Appium's implementation of the Model Context Protocol (MCP) to drive forward modern AI-assisted capabilities.
 **appium-remote-xpc** – Contributing to the native macOS/XPC-based remote execution layer, essential for iOS automation.
 **appium-tun-tap** – Assisting in the development and maintenance of network virtualization and tunneling components for advanced testing scenarios.

These contributions strengthen critical infrastructure within the Appium ecosystem and demonstrate LambdaTest's commitment to deep technical involvement in the project's evolution.
About LambdaTest

LambdaTest’s platform already serves a massive community of Appium users. As a GenAI-powered Quality Engineering Platform, they provide a full-stack testing cloud with 10,000+ real mobile devices and 3,000+ browsers.
Beyond standard infrastructure, they are pushing the boundaries of test execution with AI-native test management and next-generation agents like KaneAI. By supporting Appium alongside Selenium, Playwright, and other major frameworks, LambdaTest helps teams orchestrate intelligent automation at cloud scale.

LambdaTest will continue contributing people, code, and development expertise to strengthen Appium's core functionality. Their commitment represents a significant investment into the future of the framework, and we're thrilled to have them collaborating with us at this deeper level.
The Appium project is proud to recognize LambdaTest as our newest official Development Partner. We can't wait to see what we'll build together!


--- SOURCE: en/sponsors/index.md ---

---
hide:
  - navigation
  - toc

title: Sponsors & Backers
---

<style>
  .appium-sponsor-thanks { display: none; }
  .sponsor-section img { height: 64px; padding-right: 1em; }
</style>

Appium is an Apache-2 licensed open source project whose development is made possible entirely by
donations of time and money by individuals and companies who benefit from our software and our
mission. If you'd like to join this amazing group and help ensure Appium's continued development
and maintenance, you can contribute via [Appium's OpenCollective
Hub](https://opencollective.com/appium).

## Development Partners

We are very grateful for the support of our Development Partners, who donate Appium development and
maintenance as part of their employees' core job duties!

<a href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">
  <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-dark.png#only-dark" width="250" alt="LambdaTest" />
  <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-light.png#only-light" width="250" alt="LambdaTest" />
</a>

## Strategic Partners

We are very grateful for the financial and marketing support of our exclusive Strategic Partners,
who contribute a significant ongoing investment of funds to help the project attract and reward
contributors!

<a href="https://www.browserstack.com/browserstack-appium?utm_campaigncode=701OW00000AoUTQYA3&utm_medium=partnered&utm_source=appium">
  <img src="/docs/en/latest/assets/images/sponsor-logo-browserstack-dark.png#only-dark" width="250" alt="BrowserStack" />
  <img src="/docs/en/latest/assets/images/sponsor-logo-browserstack-light.png#only-light" width="250" alt="BrowserStack" />
</a>

<a href="https://lambdatest.com/?utm_source=appium.io&utm_medium=organic&utm_campaign=june_25&utm_term=sk&utm_content=webpage">
  <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-dark.png#only-dark" width="250" alt="LambdaTest" />
  <img src="/docs/en/latest/assets/images/sponsor-logo-lambdatest-light.png#only-light" width="250" alt="LambdaTest" />
</a>

## Gold Sponsors

<div class="sponsor-section">
  <a href="https://jetify.com/" target="_blank"><img src="https://images.opencollective.com/jetify/415824c/avatar/64.png" alt="Jetify" /></a>
</div>

[Become a Gold Sponsor](https://opencollective.com/appium/contribute/gold-sponsor-72877/checkout?interval=month&amount=500&contributeAs=me)

## Silver Sponsors

<div class="sponsor-section">
  <a href="https://magicpod.com/" target="_blank"><img src="https://images.opencollective.com/magicpod/722b7e4/avatar/64.png" alt="MagicPod" /></a>
</div>

[Become a Silver Sponsor](https://opencollective.com/appium/contribute/silver-sponsor-72876/checkout?interval=month&amount=250&contributeAs=me)

## Bronze Sponsors

<div class="sponsor-section">
  <a href="https://route4me.com/" target="_blank"><img src="https://images.opencollective.com/route4me/71fb6fa/avatar/64.png" alt="Route4Me" /></a>
  <a href="https://webdriver.io/" target="_blank"><img src="https://images.opencollective.com/webdriverio/bbdd6c3/avatar/64.png" alt="WebdriverIO" /></a>
</div>

[Become a Bronze Sponsor](https://opencollective.com/appium/contribute/sponsors-70690/checkout?interval=month&amount=100&contributeAs=me)


--- SOURCE: en/guides/migrating-1-to-2.md ---

---
title: Migrating to Appium 2
---

This document is a guide for those who are using Appium 1 and wish to migrate to Appium 2. It
contains a list of breaking changes and how to migrate your environments or test suites to ensure
compatibility with Appium 2.

Appium 2 is the biggest Appium release in over 5 years. It is _not_ focused on changing the
automation behavior for any particular platform, but instead re-envisions Appium into an
_ecosystem_ of automation tools:

* The core Appium module retains only platform-agnostic functionality
* Functionality for automating specific platforms is moved to separate _driver_ modules
* Functionality for altering/extending Appium is moved to separate _plugin_ modules

At the same time, the Appium project is taking the opportunity to remove many old and deprecated
bits of functionality.

Since Appium 2 is a major architectural change, ^^we do not recommend directly updating your
Appium 1 installations to Appium 2^^. Instead, please uninstall Appium 1 first, and only install
Appium 2 afterwards.

## Breaking Changes

### Drivers Installed Separately

When installing Appium 1, all available drivers would be installed alongside the main Appium
server. In Appium 2, due to its modular structure, this is no longer the case - by default,
installing it only installs the core Appium server, without any drivers.

When it comes to installing Appium 2 drivers, there are several approaches you can take:

* Add the `--drivers` flag when installing Appium, for example:
```bash
npm i -g appium --drivers=xcuitest,uiautomator2
```
* Use the [Appium Extension CLI](../reference/cli/extensions.md), for example:
```bash
appium driver install uiautomator2
```
* Use the [Appium Setup CLI command](../reference/cli/setup.md) (added in Appium `2.6`), for example:
```bash
appium setup mobile
```

Check the [Managing Drivers and Plugins guide](./managing-exts.md) for more information.

!!! info "Actions Needed"

    When installing Appium 2, use one of the above approaches for installing your desired drivers

### Driver Installation Path Changed

When installing Appium 1, all available drivers would be installed as dependencies of the main
Appium server, in `/path/to/appium/node_modules`. For example, `appium-webdriveragent` was located
at `/path/to/appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent`.

In Appium 2, drivers (and plugins) are installed at the path defined by the `APPIUM_HOME`
environment variable, whose default value is `~/.appium`. So, `appium-webdriveragent` would now be
located at `$APPIUM_HOME/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent`.

!!! info "Actions Needed"

    If your code uses paths to Appium driver files, update it to use the `APPIUM_HOME` environment
    variable

### Drivers Updated Separately

In Appium 1, in order to get updates to your drivers, you would simply wait for those updates to be
rolled into a new release of Appium, and then update your Appium version. With Appium 2, since the
server and drivers are separate packages, they can release new versions independently from each
other - this means that you no longer need to wait for a new Appium server release, but can install
the latest driver versions right away.

Checking for driver updates is done by using the [Appium Extension CLI](../reference/cli/extensions.md):

```bash
appium driver list --updates
```

If any updates are available, you can then run the `update` command for any given driver:

```bash
appium driver update xcuitest
```

Updating the Appium server itself is the same as before:

```bash
npm update -g appium
```

However, in Appium 2 this process is a lot quicker, since drivers are no longer bundled with the
server package.

!!! info "Actions Needed"

    Make sure to use the [Appium Extension CLI](../reference/cli/extensions.md) to manage your drivers

### Deprecated Packages No Longer Supported

The Appium 1 ecosystem included several drivers, clients and other packages that had since been
deprecated and replaced with newer packages. Appium 2 no longer includes support for these packages,
and it is recommended to migrate to the following replacements:

|Appium 1 Package|Replacement in Appium 2|
|--|--|
|iOS Driver|[XCUITest Driver](https://appium.github.io/appium-xcuitest-driver/latest/)|
|UiAutomator Driver|[UiAutomator2](https://github.com/appium/appium-uiautomator2-driver/)|
|`wd` Client|[WebdriverIO Client](https://webdriver.io/)|
|Appium Desktop|[Appium Inspector](https://github.com/appium/appium-inspector)|

!!! info "Actions Needed"

    If you are using any of the aforementioned package(s), migrate to their recommended replacement(s)

### Default Server Base Path Changed

In Appium 1, the default Appium server URL was `http://localhost:4723/wd/hub`, where the `/wd/hub`
part (the base path) was a legacy convention from Selenium 1. Appium 2 changes the default base
path to `/`, therefore the default server URL is now `http://localhost:4723/`.

!!! info "Actions Needed"

    In your test scripts, change the base path of the target server URL from `/wd/hub` to `/`.
    Alternatively, you can retain the Appium 1 base path by launching Appium with the
    `--base-path=/wd/hub` [command-line argument](../reference/cli/server.md).

### Server Port 0 No Longer Supported

In Appium 1, it was possible to specify `--port 0` during server startup, which had the effect of
starting Appium on a random free port. Appium 2 no longer allows this, and requires port values to
be `1` or higher. If you wish to start Appium on a random port, you must now take care of this on
your own prior to launching the server.

!!! info "Actions Needed"

    If you are launching Appium with `--port 0`, change the port number value to `1` or higher

### Driver-Specific CLI Options Changed

With Appium 1, command-line options specific to particular drivers were all hosted on the main
Appium server. So, for example, `--chromedriver-executable` was a CLI parameter you could use to
set the Chromedriver location for the UiAutomator2 driver.

In Appium 2, all driver-specific CLI options have been moved to the drivers themselves. However,
depending on the driver, these options may now need to be passed in another way:

* Some options can still be passed as different CLI flags, for example:
```bash
appium --webdriveragent-port=5000                 # Appium 1
appium --driver-xcuitest-webdriveragent-port=5000 # Appium 2
```
* Some options can now be passed as environment variables, for example:
```bash
appium --chromedriver-version=100 # Appium 1
CHROMEDRIVER_VERSION=100 appium   # Appium 2
```
* Some options can now be passed as [capabilities](./caps.md), for example:
```
appium --chromedriver-executable=/path/to/chromedriver      # Appium 1
{"appium:chromedriverExecutable": "/path/to/chromedriver"}  # Appium 2
```

!!! info "Actions Needed"

    If you are using driver-specific CLI options, refer to that driver's documentation for how to
    apply them in Appium 2

### Filepaths No Longer Supported for Some CLI Options

In Appium 1, some server command-line options could be invoked by passing a filepath as their
value, and Appium would then parse the contents of that file as the actual value for that option.
There were four options that supported this:

* `--nodeconfig`
* `--default-capabilities`
* `--allow-insecure`
* `--deny-insecure`

Appium 2 no longer attempts to parse the contents of filepaths passed to these options, and offers
two ways to specify the value for these options:

* As strings, directly on the command line
    * `--nodeconfig` / `--default-capabilities`: JSON string
    * `--allow-insecure` / `--deny-insecure`: comma-separated list
* In the [Appium Configuration file](./config.md)

!!! info "Actions Needed"

    If you are using any of the aforementioned CLI options with a filepath value, update your code
    to pass the file contents either directly or through the Appium config file

### Old Protocols Dropped

Appium's API is based on the [W3C WebDriver Protocol](https://www.w3.org/TR/webdriver/), and it has
supported this protocol for years. Before this protocol was designed as a web standard, the 
[JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) (JSONWP)
and [Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)
(MJSONWP) were used instead.

In Appium 1, all of these protocols were supported, so that older Selenium/Appium clients could
still communicate with newer Appium servers. Appium 2 removes support for JSONWP/MJSONWP and is now
only compatible with the W3C WebDriver Protocol.

!!! info "Actions Needed"

    Make sure you are using Selenium/Appium clients compatible with the W3C WebDriver Protocol

### Capabilities Require Vendor Prefix

In Appium 1, in order to create a session, you had to specify certain desired capabilities, which
would indicate session parameters, e.g. the driver you want to use. Appium 2 retains this behavior
and continues to accept desired capabilities (now renamed simply to 'capabilities'), but as part of
the W3C WebDriver Protocol specification, all non-standard capabilities are now required to use a
vendor prefix. 

The list of standard capabilities is described in the [WebDriver Protocol specification](https://www.w3.org/TR/webdriver/#capabilities),
and includes a few commonly used capabilities like `browserName` and `platformName`. All other
capabilities must now start with the vendor name and a colon (the vendor prefix), for example,
`moz:` or `goog:`. Since most of Appium's capabilities go beyond the standard W3C capabilities,
all of them must include the `appium:` prefix (unless specified otherwise):

```
deviceName        # Appium 1
appium:deviceName # Appium 2
```

This requirement may or may not be a breaking change for your test suites. Up-to-date versions of
official Appium clients and the Appium Inspector will automatically add the `appium:` prefix to all
non-standard capabilities, and the same may apply to cloud-based Appium providers.

Additionally, if you are starting a session with multiple Appium-specific capabilities (which will
likely be the case), it may seem repetitive to add the `appium:` prefix to each individual
capability. To avoid this, you can optionally group up all these capabilities under a single object
capability, `appium:options`, for example:

=== "Default Approach"

    ```json
    {
      "platformName": "iOS",
      "browserName": "Safari",
      "appium:platformVersion": "14.4",
      "appium:deviceName": "iPhone 11",
      "appium:automationName": "XCUITest"
    }
    ```

=== "With `appium:options`"

    ```json
    {
      "platformName": "iOS",
      "browserName": "Safari",
      "appium:options": {
        "platformVersion": "14.4",
        "deviceName": "iPhone 11",
        "automationName": "XCUITest"
      }
    }
    ```

!!! warning

    Capabilities included in the `appium:options` object will overwrite capabilities of the same
    name that are used outside of this object. Note that cloud provider support for the
    `appium:options` syntax may vary.

For more information on capabilities, have a look at the [Capabilities Guide](./caps.md).

!!! info "Actions Needed"

    Add the `appium:` prefix to all Appium-specific capabilities used in your tests, or wrap them
    inside an `appium:options` object

### Advanced Features Moved to Plugins

One of the design goals for Appium 2 is to extract non-core features into special extensions called
[plugins](../ecosystem/plugins.md). Two such features of Appium 1 have been moved to plugins, and
are no longer bundled with Appium 2:

|Feature|Plugin Name|
|--|--|
|Image-related features (comparison, search by image, etc...)|[`images`](https://github.com/appium/appium/tree/master/packages/images-plugin)|
|The Execute Driver Script feature|[`execute-driver`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)|

!!! info "Actions Needed"

    If you were using the image-related features and/or the execute driver script feature in Appium
    1, first install their plugin(s):
    ```
    appium plugin install images 
    appium plugin install execute-driver
    ```
    Afterwards, make sure to activate the plugin(s) upon launching the Appium server:
    ```
    appium --use-plugins=images,execute-driver
    ```

### Endpoint Changes

A few server endpoints used in Appium 1 were accepting old or unused parameters. Appium 2 removes
support for these parameters. The following is a list of these changed endpoints, along with the
parameters they no longer accept, as well as the parameters they continue to accept in Appium 2.

* `POST /session/:sessionId/appium/device/gsm_signal`
    * :octicons-x-24: `signalStrengh`
    * :octicons-check-24: `signalStrength`
* `POST /session/:sessionId/appium/element/:elementId/value`
    * :octicons-x-24: `value`
    * :octicons-check-24: `text`
* `POST /session/:sessionId/appium/element/:elementId/replace_value`
    * :octicons-x-24: `value`
    * :octicons-check-24: `text`

!!! info "Actions Needed"

    Check your Appium client documentation for the methods using these endpoints, and adjust your
    code to only use the accepted parameters

### Internal Packages Renamed

In Appium 1, the internal dependency packages were each located in their own repository. Appium 2
moves to a monorepo structure and therefore renames many of these packages, for example:

```
appium-base-driver  # Appium 1
@appium/base-driver # Appium 2
```

!!! info "Actions Needed"

    If you do not directly import Appium packages into your code - none! However, if you do, make
    sure to update the names of your Appium package imports!

## Major New Features

Apart from the breaking changes mentioned above, here are some of the major new features you may
wish to take advantage of with Appium 2:

### Third-Party Drivers and Plugins

You are no longer limited to official drivers or plugins, or ones that the Appium team even knows
about! Developers can now create their own custom drivers or plugins, which can be installed via
Appium's [Extension CLI](../reference/cli/extensions.md) from `npm`, `git`, GitHub, or even the local
filesystem. Interested in building a driver or plugin? Check out the
[Building Drivers](../developing/build-drivers.md) and
[Building Plugins](../developing/build-plugins.md) guides.

### Configuration Files

Appium now supports _configuration files_ in addition to command-line arguments. Nearly all options
or flags that had to be specified on the CLI in Appium 1, can now also be provided in a
configuration file. The file can be in JSON, JS, or YAML format. For more information, refer to
the [Config File Guide](./config.md).

## Special Notes for Cloud Providers

Most of this guide has applied to Appium end users or developers, but some of the architectural
changes in Appium 2 will constitute breaking changes for different Appium service providers. At the
end of the day, the maintainer of the Appium server is responsible for installing and exposing the
various Appium drivers and plugins that end users may wish to use.

We encourage cloud providers to thoroughly read and understand our [recommendation for cloud
provider capabilities](./caps.md#special-notes-for-cloud-providers) in order to support user needs in
an industry-compatible way!


--- SOURCE: en/guides/managing-exts.md ---

---
title: Managing Drivers and Plugins
---

To do anything useful with Appium, you need to have at least one [Driver](../intro/drivers.md)
installed, otherwise Appium won't know how to automate anything. There is an entire
[Ecosystem](../ecosystem/index.md) of drivers and plugins out there!

This guide helps explain how to manage these drivers and plugins. There are
two basic strategies: using Appium's extension CLI interface, or managing extensions yourself in an
`npm`-based project.

!!! note

    Other package managers are not currently supported.

## Using Appium's Extension CLI

With Appium's [Extension CLI](../reference/cli/extensions.md), you let Appium manage drivers and plugins for
you.  You will use CLI commands to tell Appium which extensions you would like to install, update,
or remove. Here's an example of how you might install a driver using the CLI:

```bash
appium driver install xcuitest
```

This command will install the latest version of the
[XCUITest Driver](https://github.com/appium/appium-xcuitest-driver). The Extension CLI comes with a variety
of commands and parameters; see the documentation for that command for all the specifics.

The all-important question when Appium is managing your extensions for you is: where are they installed?
Appium manages extensions in a directory specified by the `APPIUM_HOME` environment variable. You
can set that variable to anything you like, and Appium will manage its extensions there. You can
therefore also use the `APPIUM_HOME` environment variable to manage different sets of extensions,
for example if you want to have the same driver installed at conflicting versions:

```bash
APPIUM_HOME=/path/to/home1 appium driver install xcuitest@4.11.1
APPIUM_HOME=/path/to/home2 appium driver install xcuitest@4.11.2
```

Running these commands will result in two separate `APPIUM_HOME` directories being created and
populated with the corresponding version of the XCUITest driver. You can then use the same
environment variables to direct Appium which version to use on launch:

```bash
APPIUM_HOME=/path/to/home1 appium  # use xcuitest driver 4.11.1
APPIUM_HOME=/path/to/home2 appium  # use xcuitest driver 4.11.2
```

You don't need to set `APPIUM_HOME` if you don't want to! By default, Appium will set `APPIUM_HOME`
to the directory `.appium` in your user home directory.

These installed packages will be managed by `extensions.yaml` in `$APPIUM_HOME/node_modules/.cache/appium/extensions.yaml`.

## Do-It-Yourself with `npm`

Because Appium and Appium drivers are Node.js programs, if you are integrating your Appium scripts
into your own Node.js project, there is an alternative way to manage drivers and plugins: via `npm`,
like any other dependency. Basically, whenever you run Appium, if you have not explicitly set
`APPIUM_HOME`, it will:

1. Try to determine whether the _current directory_ is inside an `npm` package.
1. If so, it will check whether `appium` is a dependency (dev, prod, or peer) in the project's
   `package.json`
1. If so, _unless you have specified `APPIUM_HOME` in your environment_, Appium will ignore load
   drivers and plugins defined in that `package.json` file instead.

This means you are freely able to add Appium drivers and plugins as regular package dependencies or
dev dependencies. For example, if your project has a `package.json` which includes the following:

```json
{
  "devDependencies": {
    "appium": "^2.0.0",
    "appium-xcuitest-driver": "^4.11.1"
  }
}
```

Then, if you run `npx appium` inside your project, Appium will detect that it is a dependency of
the project, and will load the XCUITest driver which is also listed as a dev dependency for the
project.

This strategy is *only* recommended if you are already using `npm` for your project.
Otherwise, it is recommended that you use Appium's Extension CLI and, if necessary, adjust
`APPIUM_HOME` to change the location of stored extensions.


--- SOURCE: en/guides/settings.md ---

---
hide:
  - toc

title: Session Settings
---

Appium has a set of extension APIs that allow you to adjust parameters for a given session during
the session itself. Called "Settings", these parameters are similar to [Capabilities](./caps.md),
but while Capabilities _cannot be adjusted_ once a session has started, Settings _can be adjusted any
number of times_ during the course of a session.

There are 3 important points to the concept of Settings:

- Settings are mutable; they can be changed during a session using the Settings API
- Settings are only relevant during the session in which they are set. They are typically reset for
  each new session, though depending on the driver, some settings may persist between sessions
- Settings only adjust the way the Appium server behaves during test automation. They do not affect
  the device or app under test

An example of a setting would be the `ignoreUnimportantViews` setting recognized by the UiAutomator2
driver. The driver can be instructed to ignore elements in the view hierarchy which it deems
irrelevant. Changing this setting to `true` can cause tests to run faster. But if later in the same
session you _want_ to access elements which would be ignored under this setting, you can always
change it back to `false`.

Settings are implemented via the following API endpoints:

| Command           | <div style="width:18em">Method/Route</div>  | Params                             | Description                        | Returns                            |
|-------------------|---------------------------------------------|------------------------------------|------------------------------------|------------------------------------|
| `Update Settings` | `POST /session/:id/appium/settings`         | `settings` (`Record<string, any>`) | Update the provided setting values | `null`                             |
| `Get Settings`    | `GET /session/:id/appium/settings`          |                                    | Return the current settings        | `settings` (`Record<string, any>`) |

The `settings` object must be a set of keys and values, where the key is the setting name, and the
value is any documented valid value for that setting.

!!! info

    Settings are driver-specific, so refer to your driver's documentation for a list of supported settings

## Initializing Settings via Capabilities

If you want to start an Appium session with a setting in a non-default state, you can do so by
including a capability of the form `appium:settings[<name>]` with the appropriate value. So to turn
on the `ignoreUnimportantViews` setting mentioned above from the very beginning of a session, you
would construct a set of capabilities that includes the following in its JSON representation:

```json
{
    "appium:settings[ignoreUnimportantViews]": true
}
```

Also, since Appium 2.1, there is a possibility to provide multiple settings in a single
`appium:settings` capability value:

```json
{
    "appium:settings": {
        "ignoreUnimportantViews": true,
        "allowInvisibleElements": true
    }
}
```

Of course, initializing a setting via capabilities doesn't prevent you from changing it later on
via the Settings API. To learn more about how to use the Settings API in the context of your
specific client library, visit the documentation for that client.


--- SOURCE: en/guides/tls.md ---

---
hide:
  - toc

title: SSL/TLS/SPDY Support
---

Appium 2.2 introduces the option to start the Appium server with SSL/TLS support. 

## Command Line Arguments
In order to enable secure connections to the server, you need to provide the following command
line arguments:

```bash
appium server --ssl-cert-path=/path/to/cert.pem --ssl-key-path=/path/to/key.pem
```

Both arguments must be provided and should contain paths to a valid
[X509 PEM](https://www.ssl.com/guide/pem-der-crt-and-cer-x-509-encodings-and-conversions/)
certificate and its corresponding private key.

After the server is started use the `https` protocol and a client supporting SSL/TLS or
[SPDY](https://en.wikipedia.org/wiki/SPDY) to communicate to it.

### Supported Features

Once a secure server socket is established it supports the following protocols:
`['h2', 'spdy/3.1', 'spdy/3', 'spdy/2', 'http/1.1', 'http/1.0']`. See
[the SPDY node module documentation](https://www.npmjs.com/package/spdy) to get more details about
its features. All insecure client connections will be rejected by the server.

### Self-Signed Certificates

Use the following command in order to generate a self-signed certificate/key pair:

```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=company/OU=Com/CN=www.testserver.local"
```

Feel free to change the value of `-subj` in the command above with your matching details. The server
should work just fine with a self-signed certificate, although you need to take care about a proper
client setup, e.g. make sure it does not reject unauthorized certificates.


--- SOURCE: en/guides/branch-testing.md ---

---
title: Local Validation Of Extension PRs
---

Sometimes it might be necessary to validate if a remote driver or a plugin PR works for the particular local
environment before it is merged or published. This tutorial describes how to achieve that.

## Requirements

- Recent LTS version of NodeJS. Check [Node.js main page](https://nodejs.org) for the download link.
- Recent version of the Appium server. Use the following commands to ensure you have
  the latest version installed: `npm uninstall appium` and `npm install -g appium`.
- [Git](https://git-scm.com/) should be available locally.

## Installation

- [Check out](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally) the PR locally.
  There is also an option (although it is less flexible, because you won't be able to easily fetch
  any changes to this PR later) to simply [download](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives) and unzip the sources
  locally. If you choose the later option then no `git` tool would be necessary.
- Navigate to the local driver or plugin folder and run `npm i` from that folder.
- Make sure you don't have the given driver or plugin already installed. Use the `appium driver uninstall <driver_name>`
  or `appium plugin uninstall <plugin_name>` CLI in order to delete any leftovers. The value of
  `<driver_name>`/`<plugin_name>` depends on the actual driver or plugin name the PR has been prepared for.
  If you are not sure which name you need to use then check the content of the `package.json` manifest,
  which must be always located under the root folder of the fetched sources. You should be looking for
  the `"appium" -> "driverName"` entry value there.
- Change the current folder to the one, which is NOT the driver/plugin folder root or its subfolder.
  Also, make sure your current working folder does not contain any extra `package.json` file. If
  it does then simply navigate to any other folder that does not.
- Run the following command in order to link the driver/plugin sources to the Appium server:
  `appium driver install --source=local <full_path_to_driver_folder_with_fetched_sources>` or
  `appium plugin install --source=local <full_path_to_plugin_folder_with_fetched_sources>`.
- Stop the Appium server if it is running and start it again (`appium server --use-drivers=<driver_name>`)
  to check the list of loaded drivers. If the linking succeeded then you must see the driver name and the path to its
  parent folder in the server logs. In case of a plugin it is required to explicitly request
  this plugin to be loaded upon server startup: `appium server --use-plugins=<plugin_name>`.

## Update

After you have tested the PR and there are issues it might be necessary to update the local branch with
the recent changes from Git. Follow the next steps for that:

- Navigate to the parent folder of your local driver/plugin and run `git pull`.
- Stop Appium server if it is running.
- Run `npm i` in the parent folder of your local driver/plugin to rebuild it and update any dependencies if necessary.
- Start Appium server again similarly to how this is done in the corresponding [Installation](#installation) step above.

## Switching Back To a Stable Release

After the PR is merged there is no need to use the local plugin/driver deployment anymore, and it makes sense
to switch back to the package managed by NPM. Follow the next steps for that:

- Unlink the installed driver/plugin from the server by running `appium driver uninstall <driver_name>` or
  `appium plugin uninstall <driver_name>`.
- Delete the local source folder (`rm -rf <full_path_to_plugin_or_driver_folder_with_fetched_sources>`).
- Install the driver or the plugin from NPM. Check the component README in order to find a proper command for that.


--- SOURCE: en/guides/context.md ---

---
hide:
  - toc

title: Managing Contexts
---

A common feature of many app platforms is the ability for developers to embed web content inside of
the platform-native app frame. This allows developers to leverage web technologies or existing web
content for some or all of the app functionality. However, the additional complexity of mixing
"modes" within a single application can make it difficult for automation tools that are designed to
target the "native" elements and behaviours.

Appium provides a set of APIs for working with different app modes, called "contexts", that Appium
drivers can implement if they support automation commands in these different modes. There are three
basic commands that Appium has added to the W3C WebDriver spec for this purpose:

| Command Name          | Method/Route                | Params            | Description                                   | Returns         |
|-----------------------|-----------------------------|-------------------|-----------------------------------------------|-----------------|
| `Get Contexts`        | `GET /session/:id/contexts` |                   | Get a list of the available contexts          | `array<string>` |
| `Get Current Context` | `GET /session/:id/context`  |                   | Get the name of the active context            | `string`        |
| `Set Context`         | `POST /session/:id/context` | `name` (`string`) | Switch into the context with the given `name` | `null`          |

This API is flexible enough to handle a variety of semantic interpretations on the part of the
driver. For example, the XCUITest driver includes two kinds of contexts: the native app context and
any active webviews, as one context per webview. A call to `Get Contexts` will return the list of
names, which you as a test author can sift through and use to switch into the appropriate context.
As another example, the [Appium Altunity
Plugin](https://github.com/headspinio/appium-altunity-plugin) introduces the concept of a `UNITY`
context, which encapsulates all the plugin's specific behaviour to ensure that when outside of the
`UNITY` context, the active driver's usual command implementations are used.

It is important to note that a call to `Get Contexts` will always contain at least one context,
conventionally but not necessarily named `NATIVE_APP`. This is the default active context.

Depending on the type of context you're in, the operation of the driver might change. The XCUITest
driver, when targeting a webview context, will not run its typical routines for finding and
interacting with elements. Instead, it will run a different set of routines appropriate to web
elements. This might have a variety of consequences, like supporting a different set of locator
strategies.

The command names in the table above are generic references to the commands and not code examples.
For examples of how to access the Context API in the language-specific client libraries, please
visit the documentation for a given library.


--- SOURCE: en/guides/caching.md ---

---
title: Caching of Application Bundles
---

Appium's base driver provides a feature which enables caching of application builds provided, for example,
as `app` capability value or to endpoints similar to the `installApp` one. This article explains common caching
principles, so you could create more performant and efficient test suite execution strategies.

## Why Caching Is Necessary

Mobile application bundles could reach hundreds of megabytes is size. This could become a serious
performance issue if a test suite is executed, and it is necessary to fetch/extract the same application
bundle for each test.

## What Is Cached

Caching could be applied to application bundles generated by
[`configureApp`](https://github.com/appium/appium/blob/master/packages/base-driver/lib/basedriver/helpers.js#L107) helper call.
Inherited drivers can customize their caching logic by providing own `onPostProcess`
(or both `inDownload` and `onPostProcess`) property definition, but the general
rule of thumb is that we need to cache locally all application bundles need to be downloaded and/or extracted
first before they could be actually installed on the device under test. On iOS, for example, these are `.ipa` or
`.zip` compressed application bundles, or .`aab` on Android.

## Caching of Remote Application Bundles

In order to validate whether an app bundle downloaded from the given URL could be (re)used from the cache the following
steps are applied:

1. The script checks if the given URL is already present in the cache.
   If yes then it tries to fetch previously remembered
   [Last-Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified)
   or [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header values for it.
2. If `ETag` value is present then it is put into
   [If-None-Match request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match).
   Else if `Last-Modified` header value is present then it is put into
   [If-Modified-Since request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since).
   Otherwise, no caching is applied.
3. If the response status is equal to `304` then the previously cached binary is used,
   otherwise the cached entry is reset and refreshed.

## Caching of Local Application Bundles

It only makes sense to cache application bundles if they need some preprocessing before being installed on the device under test.
For example, on iOS `.ipa` bundles must be unzipped, because the system installer only works with `.app` folders.

1. The script verifies if the given bundle path is already present in the cache. If the bundle was not in the cache yet
then it gets preprocessed and added there.
2. The script validates the hashsum of the bundle and compares it to the previously stored one. If hash sums don't match
then the cached item gets deleted and the preprocessing of the bundle repeats.

## How The Cache File System Is Configured

The cache where the base driver keeps all application bundles is located in the system temp folder. It is configured
on per-process basis, so each test session initialized in scope of the same Appium server process takes advantages
of it. It is a [LRU Cache](https://www.npmjs.com/package/lru-cache) with the following limitations:

- Max items: 1024. You may customize it by providing a new value to
  the [APPIUM_APPS_CACHE_MAX_ITEMS](../reference/cli/env-vars.md) environment variable.
  Do not set it to a lower number than the amount of apps in all parallel sessions per process.
- Max time to live (TTL) for each entry: 24 hours.
  You may customize it by providing a new value to the
  [APPIUM_APPS_CACHE_MAX_AGE](../reference/cli/env-vars.md) environment variable.
  Do not set it to a lower number than the duration of a single session startup.
- TTL is refreshed for each entry upon access
- By default the full application URL is used as cache key. You may change this behavior
  by enabling the [APPIUM_APPS_CACHE_IGNORE_URL_QUERY](../reference/cli/env-vars.md) environment variable.
  If the above option is enabled then the 'search' part of the app URL will be cut off from cache keys.
  See the corresponding [feature request](https://discuss.appium.io/t/regarding-app-caching-when-using-aws-s3-presigned-urls/42713)
  for more details.

!!! warning

    Note: The cache root folder is set up for automatic deletion on Appium process termination. This would only
    work if Appium server is killed with `SIGINT` or `SIGTERM`. If `SIGKILL` is used then no cache cleanup
    would be performed.


--- SOURCE: en/guides/execute-methods.md ---

---
hide:
  - toc

title: Execute Methods
---

Because the scope of commands implemented in Appium drivers is broader than the scope of commands
defined by the W3C WebDriver spec, Appium needs a way for these "extended" commands to be accessible
by client libraries. There are two main strategies for this:

1. Appium drivers define new W3C-compatible API routes, and Appium clients are updated to include
   support for those new routes.
2. Appium drivers define so-called "Execute Methods" which provide new functionality by
   overloading the existing `Execute Script` command which is already available in any WebDriver-
   based client library (including all Selenium and Appium clients).

There are pros and cons for each strategy, but it is ultimately up to the extension author to
decide how they wish implement new commands. 

This guide is designed to specifically help you understand the "Execute Method" strategy.  This
pattern is commonly used in official Appium drivers and other third-party extensions.
Here's an example of how the `Execute Script` command is designed to work in the world of WebDriver
and browser automation:

=== "JS (WebDriverIO)"

    ```js
    await driver.executeScript('return arguments[0] + arguments[1]', [3, 4])
    ```

=== "Java"

    ```java
    JavascriptExecutor jsDriver = (JavascriptExecutor) driver;
    jsDriver.executeScript("return arguments[0] + arguments[1]", 3, 4);
    ```

=== "Python"

    ```py
    driver.execute_script('return arguments[0] + arguments[1]', 3, 4)
    ```

=== "Ruby"

    ```rb
    driver.execute_script 'return arguments[0] + arguments[1]', 3, 4
    ```

=== "C#"

    ```dotnet
    ((IJavaScriptExecutor)driver).ExecuteScript("return arguments[0] + arguments[1]", 3, 4);
    ```

What's happening here is that we are defining a snippet of Javascript (technically,
a function body) to be executed within the web browser. The client can send arguments which are
serialized, sent over HTTP, and finally provided to the function as parameters.  In this example,
we are essentially defining an addition function. The return value of the `Execute Script` command
is whatever the return value of the Javascript snippet is! In the case of this example, that value
would be the number `7` (`3` + `4`).

Each client library has its own way of calling the command and providing any arguments to the script
function, but the function itself—the snippet—is always a string and is the same across all languages.

In the world of Appium, we are usually not automating a web browser, which means this command is
not particularly useful. But it *is* useful as a way to encode the name of an arbitrary command and
to provide parameters. For example, the [XCUITest
Driver](https://github.com/appium/appium-xcuitest-driver) has implemented a command that lets a client
terminate a running application if you know the ID (the `bundleId`) of the app. The way that the
driver makes this command available is via the Execute Method `mobile: terminateApp`. Instead of
providing a JavaScript function to the "Execute Script" command, the user provides a _known string_
as defined by the driver. The only other thing a client needs to know is the set of
parameters for the method, which are documented by the driver. In this case, we have a parameter
named `bundleId`, whose value should be a string encoding the ID of the app to terminate. Here is
how this Execute Method would be called:

=== "JS (WebDriverIO)"

    ```js
    await driver.executeScript('mobile: terminateApp', [{bundleId: 'com.my.app'}])
    ```

=== "Java"

    ```java
    JavascriptExecutor jsDriver = (JavascriptExecutor) driver;
    jsDriver.executeScript("mobile: terminateApp", ImmutableMap.of("bundleId", "com.my.app"));
    ```

=== "Python"

    ```py
    driver.execute_script('mobile: terminateApp', {'bundleId': 'com.my.app'})
    ```

=== "Ruby"

    ```rb
    driver.execute_script 'mobile: terminateApp', { bundleId: 'com.my.app' }
    ```

=== "C#"

    ```dotnet
    ((IJavaScriptExecutor)driver).ExecuteScript("mobile: terminateApp",
        new Dictionary<string, string> { { "bundleId", "com.my.app" } });

    ```

There are two important differences in using Appium Execute Methods from vanilla Selenium
Javascript execution:

1. The script string is just a command name; it will be provided by the driver documentation
1. The standard way to provide parameters is as a *single* object with keys representing parameter
   names and values representing parameter values. So in this case, we had to specify both the
   parameter name (`bundleId`) as the key of the parameters object, and the parameter value
   (`com.my.app`) as the value for that key. A driver can define parameters as _required_ or _optional_.

Of course, always refer to the documentation for the particular Execute Method in case the author
has made any alterations to the standard access method.


--- SOURCE: en/guides/caps.md ---

---
title: Session Capabilities
---

"Capabilities" is the name given to the set of parameters used to start an Appium session. The
information in the set describes what sort of "capabilities" you want your session to have, for
example, a certain mobile operating system or a certain version of a device. Capabilities are
represented as key-value pairs, with values allowed to be any valid JSON type, including
other objects.

The W3C WebDriver spec's [section on Capabilities](https://w3c.github.io/webdriver/#capabilities)
identifies a small set of 10 standard capabilities, including the following:

| Capability Name  | Type     | Description                                    |
|------------------|----------|------------------------------------------------|
| `browserName`    | `string` | The name of the browser to launch and automate |
| `browserVersion` | `string` | The specific version of the browser            |
| `platformName`   | `string` | The type of platform hosting the browser       |

## Common Appium Capabilities

Appium understands these browser-focused capabilities, but introduces a number of additional
capabilities. According to the WebDriver spec, any
non-standard "extension capabilities" must include a namespace prefix (signifying the vendor
introducing the capability), ending in a `:`. Appium's vendor prefix is
`appium:`, and so any Appium-specific capabilities must include this prefix. Depending on which
client you are using, the prefix may be added automatically or in conjunction with certain
interfaces, but it is always a good practice to explicitly include it for clarity.

Here is a list of all the globally-recognized Appium capabilities:

!!! info

    Individual drivers and plugins can support other capabilities, so refer to their documentation
    for lists of specific capability names. Some drivers may also not support all of these capabilities

| <div style="width:12em">Capability</div>   | Type      | Required? | Description  |
|--------------------------------------------|-----------|-----------|----------------------------|
| `platformName`                             | `string`  | yes       | The type of platform hosting the app or browser |
| `appium:automationName`                    | `string`  | yes       | The name of the Appium driver to use |
| `browserName`                              | `string`  | no        | The name of the browser to launch and automate, if the driver supports web browsers as a special case |
| `appium:app`                               | `string`  | no        | The path to an installable application |
| `appium:deviceName`                        | `string`  | no        | The name of a particular device to automate, e.g., `iPhone 14` (currently only actually useful for specifying iOS simulators, since in other situations it's typically recommended to use a specific device id via the `appium:udid` capability). |
| `appium:platformVersion`                   | `string`  | no        | The version of a platform, e.g., for iOS, `16.0` |
| `appium:newCommandTimeout`                 | `number`  | no        | The number of seconds the Appium server should wait for clients to send commands before deciding that the client has gone away and the session should shut down. `60` seconds by default. Setting it to zero disables the timer. |
| `appium:noReset`                           | `boolean` | no        | If true, instruct an Appium driver to avoid its usual reset logic during session start and cleanup (default `false`) |
| `appium:fullReset`                         | `boolean` | no        | If true, instruct an Appium driver to augment its usual reset logic with additional steps to ensure maximum environmental reproducibility (default `false`) |
| `appium:eventTimings`                      | `boolean` | no        | If true, instruct an Appium driver to collect [Event Timings](./event-timing.md) (default `false`) |
| `appium:printPageSourceOnFindFailure`      | `boolean` | no        | If true, collect the page source and print it to the Appium log whenever a request to find an element fails (default `false`) |


Some drivers place more complex constraints on capabilities as a group. For example, while the
`appium:app` and `browserName` capabilities are listed above as optional, if you want to launch
a session with a specific app, the XCUITest driver requires that at least one of `appium:app`,
`browserName`, or `appium:bundleId` are included in the capabilities (otherwise it will not know
what app to install and/or launch and will simply open a session on the home screen). Each driver
will document how it interprets these capabilities and any other platform-specific requirements.

!!! note

    Capabilities are like parameters used when starting a session. After the capabilities are sent
    and the session is started, they cannot be changed. If a driver supports updating aspects of
    its behaviour in the course of a session, it will provide a [Setting](./settings.md) for this
    purpose instead of, or in addition to, a capability.

Each Appium client has its own way of constructing capabilities and starting a session. For
examples of doing this in each client library, head to the [Ecosystem](../ecosystem/index.md) page
and click through to the appropriate client documentation.

## BiDi Protocol Support

Appium supports [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) protocol since base–driver 9.5.0.
The actual behavior depends on individual drivers while the Appium and the baseｰdriver support the protocol.
Please make sure if a driver supports the protocol and what kind of commands/events it supports in the documentation.

| Capability Name | Type      | Description                             |
|-----------------|-----------|-----------------------------------------|
| `webSocketUrl`  | `boolean` | To enable BiDi protocol in the session. |

## Using `appium:options` to Group Capabilities

If you use a lot of `appium:` capabilities in your tests, it can get a little repetitive. You can
combine all capabilities as an object value of a single `appium:options` capability instead, in
which case you don't need to use prefixes on the capabilities inside the object. For example:

```json
{
    "platformName": "iOS",
    "appium:options": {
        "automationName": "XCUITest",
        "platformVersion": "16.0",
        "app": "/path/to/your.app",
        "deviceName": "iPhone 12",
        "noReset": true
    }
}
```

Note that constructing a capability value which is itself an object differs by language; refer to
your client documentation for further examples on how to achieve this.

!!! warning

    If you include the same capabilities both inside and outside of `appium:options`, the values
    inside of `appium:options` take precedence.

## Always-Match and First-Match Capabilities

The W3C spec allows clients to give the Appium server some flexibility in the kind of session it
creates in response to a new session request. This is through the concept of "always-match" and
"first-match" capabilities:

- Always-match capabilities consist of a single set of capabilities, every member of which must
  be satisfied by the server in order for the new session request to proceed.
- First-match capabilities consist of an array of capability sets. Each set is merged with the
  always-match capabilities, and the first set that the server knows how to handle will be the set
  that is used to start the session.

!!! note

    Check out the [spec itself](https://w3c.github.io/webdriver/#processing-capabilities) or
    a [summarized version](https://github.com/jlipps/simple-wd-spec#processing-capabilities) for
    a more in-depth description of how capabilities are processed.

In practice, use of first-match capabilities is not necessary or recommended for use with Appium.
Instead, we recommend that you define the explicit set of capabilities you want the Appium
server to handle. These will be encoded as the always-match capabilities, and the array of
first-match capabilities will be empty.

That being said, Appium _does_ understand always-match and first-match capabilities as
defined in the W3C spec, so if you use these features, Appium will work as expected. The process of
defining always-match and first-match capabilities is unique to each client library, so refer to
the documentation for your client library to see examples of how it works.

## Special Notes for Cloud Providers

!!! warning

    This section is not intended for end-users of Appium; it is intended for developers building
    Appium-compatible cloud services.

When managing an Appium cloud, your users may wish to target various independent versions of Appium
drivers and plugins. It is of course up to each service provider how they wish to implement the
discovery, installation, and availability of any official or third party drivers or plugins. But
the Appium team does provide several suggestions, for consistency across the industry. _These are
recommendations only,_ and not a standard, but adopting it will help users to navigate the increased
complexity that working with Appium in a cloud environment may bring.

### Suggested capabilities

In addition to the standard `platformName`, `appium:deviceName`, `appium:automationName`, and
`appium:platformVersion`, we recommend adopting the capability `$cloud:appiumOptions`, where the
label `$cloud` is not meant to be interpreted literally but instead should be replaced by your
vendor prefix (so for HeadSpin it would be `headspin`, Sauce Labs it would be `sauce`, and
BrowserStack it would be `browserstack`, to name just a few examples). The `$cloud:appiumOptions`
capability would itself be a JSON object, with the following internal keys:

| <div style="width:10em">Capability</div> | Usage  | Example |
| ---------------------------------------- | ------ | ------- |
| `version`           | The version of the Appium server that is used to host and manage drivers. If omitted, the behavior is left up to the provider, but the recommendation would be to provide the latest official version. | `2.0.0` |
| `automationVersion` | The version of the driver (as specified by `appium:automationName`) that should be used. | `1.55.2` |
| `automation`        | The name of a custom driver to use (see below for more info). This would override `appium:automationName` and `$cloud:automationVersion`. | `{"name": "@org/custom-driver", "source": "github", "package": "custom-driver"}` |
| `plugins`           | The list of plugins (and potentially versions of plugins) that should be activated (see below for more info). | `["images", "universal-xml"]` |

### Basic example

Appium extensions (drivers and plugins) have a set of properties that specify where they can be
installed from. Cloud providers are obviously under no obligation to provide support for
arbitrarily specified extensions, seeing as these may represent untrusted code running in a managed
environment. In the case where arbitrary extensions are not supported, the `appium:automationName`,
`$cloud:automationVersion`, and `$cloud:appiumPlugins` capabilities should be sufficient. See the
following JSON object representing capabilities for a session:

```json
{
  "platformName": "iOS",
  "appium:platformVersion": "14.4",
  "appium:deviceName": "iPhone 11",
  "appium:app": "Some-App.app.zip",
  "appium:automationName": "XCUITest",
  "$cloud:appiumOptions": {
    "version": "2.0.0",
    "automationVersion": "3.52.0",
    "plugins": ["images"]
  }
}
```

This set of capabilities requests an Appium 2+ server supporting the XCUITest driver at version
`3.52.0`, and the `images` plugin active. This set is easy for a cloud provider to verify. The
cloud provider can obviously do anything it wants in response to these capabilities, including
downloading Appium and driver and plugin packages on the fly, or erroring out if the versions
requested are not in a supported set, or if the plugin is not supported, etc...

### Basic example with `appium:options`

The previous example still looks a bit disorganized, so of course we also recommend that cloud
providers support the `appium:options` capability as detailed above, which could turn the previous
set of capabilities into the following:

```json
{
  "platformName": "iOS",
  "appium:options": {
    "platformVersion": "14.4",
    "deviceName": "iPhone 11",
    "app": "Some-App.app.zip",
    "automationName": "XCUITest"
  },
  "$cloud:appiumOptions": {
    "version": "2.0.0",
    "automationVersion": "3.52.0",
    "plugins": ["images"]
  }
}
```

### Extension objects

Some service providers may wish to dynamically allow access to all of the features of the Appium
2 CLI, including downloading arbitrary drivers and plugins. To represent these extensions, we can
define special JSON "extension objects", with the following keys:

- `name`: the name of the extension. This would be an `npm` package name (if downloading from `npm`),
  or a `git` or GitHub spec (if downloading from a `git` server or GitHub).
- `version`: the version of the extension, e.g., the `npm` package version or `git` SHA.
- (optional) `source`: a denotation of where the extension can be downloaded from. It is recommended
  to support the following values: `appium`, `npm`, `git`, `github`. Here, `appium` means "Appium's
  own official list", and should be the default value if this key is not included.
- (optional) `package`: when downloading extensions from `git` or GitHub, the `npm` package name of
  the extension must also be provided. This is optional for non-`git` sources.

Since each session is handled by a single driver, the `$cloud:appiumOptions`/`$automation`
capability could be used with an extension object value to denote this driver, for example:

```json
{
    "$cloud:appiumOptions": {
        "automation": {
            "name": "git+https://some-git-host.com/custom-driver-project.git",
            "version": "some-git-sha",
            "source": "git",
            "package": "driver-npm-package-name"
        }
    }
}
```

And since sessions can handle multiple plugins, each value in the list of `$cloud:appiumPlugins`
could also be an extension object rather than a string, so that specific versions could be
requested:

```json
{
    "$cloud:appiumOptions": {
        "plugins": [{
            "name": "images",
            "version": "1.1.0"
        }, {
            "name": "my-github-org/my-custom-plugin",
            "version": "a83f2e",
            "source": "github",
            "package": "custom-plugin"
        }]
    }
}
```

These serve as illustrative examples for the recommendations here. Of course, it is up to the
service providers to implement the handling of these capabilities at their front end / load
balancer, to perform any error checking, or to actually run any of the `appium driver` or `appium
plugin` CLI commands that support the end user's request. This section is merely a suggestion as to
how service providers might design their user-facing capabilities API in a way which in principle
supports all of the capabilities that Appium itself would provide to the end user if they were
running Appium on their own.


--- SOURCE: en/guides/headers.md ---

---
title: Header Handling
---

# Header Handling

## Request ID Tracking

Appium supports setting the request ID for each request through the `x-request-id` header. This is useful for tracing requests through your system, especially in environments where multiple services are involved or when debugging across different requests.

### Using `x-request-id`

When making requests to Appium, you can include an `x-request-id` header with a unique identifier. This ID will be:

- Used to track the request through Appium's logging system
- Preserved across the entire request lifecycle
- Generated automatically (as a UUID) if not provided


--- SOURCE: en/guides/migrating-2-to-3.md ---

---
title: Migrating to Appium 3
---
<style>
    .md-typeset .grid {
        grid-template-columns: repeat(auto-fit,minmax(min(100%,11rem),1fr));
    }
</style>

This document is a guide for those who are using Appium 2 and would like to upgrade to Appium 3.
It contains a list of breaking changes, as well as suggestions for handling them.

While Appium 2 was a major overhaul of the entire Appium architecture, Appium 3 is a smaller
upgrade with fewer breaking changes, which should result in a much simpler migration process.

## Installation

The installation method for Appium 3 remains the same as for Appium 2. If you want to upgrade, you
can simply install Appium 3 on top of your existing installation:

```bash
# optional: `appium setup reset`
npm install -g appium
```

## Breaking Changes

### Node 20+ Required

With Appium 2, the minimum required Node version was `14.17.0`. Support for Node 14 had already
ended before the release of Appium 2, which meant that even users on outdated Node versions were
able to use it.

Appium 3 drops support for outdated Node versions, and bumps the minimum required version to Node
`20.19.0` (with the semver range `^20.19.0 || ^22.12.0 || >=24.0.0`), as well as the minimum `npm`
version to `10`.

!!! info "Actions Needed"

    Upgrade Node.js to `v20.19.0` or newer, and `npm` to `v10` or newer

### Deprecated Endpoints Removed

Appium 3 removes many previously deprecated server endpoints. Some of these endpoints have now
become specific to one or more drivers, while most others have direct or close-to-direct
replacements in other endpoints. All removed endpoints, along with replacements (where applicable)
are listed [in the **Removed Endpoints** section](#removed).

Some W3C endpoints used in Appium also existed in the old JSONWP standard, but required different
parameters. With Appium 2, both standards for these endpoints were supported. Appium 3 changes
these endpoints by removing support for the JSONWP parameters, and only accepting the W3C
parameters. These endpoints are listed [in the **Modified Endpoints** section](#modified).

!!! info "Actions Needed"

    Check your Appium client documentation for the affected methods, and adjust your code to use
    their replacements

### Feature Flag Prefix Required

With Appium 2, it was possible to opt into certain [insecure features](./security.md) on server
startup, which could be enabled using the `--allow-insecure` or `--relaxed-security` flags. Appium
`2.13` added the ability to optionally provide a scope prefix to specific features, ensuring that
they would only be enabled for the specified driver (or all of them).

Appium 3 makes the scope prefix mandatory, and will throw an error if features are specified
without a scope. Note that the behavior of the `--relaxed-security` flag remains unchanged.

!!! info "Actions Needed"

    If you use the `--allow-insecure` server flag, add a scope prefix before each feature name.
    For example, if you use the UiAutomator2 `adb_shell` feature, on Appium 2 you would enable it
    like this:
    ```
    appium --allow-insecure=adb_shell
    ```
    On Appium 3, to ensure this feature is only activated for UiAutomator2, you can run it like so:
    ```
    appium --allow-insecure=uiautomator2:adb_shell
    ```
    Alternatively, if you wish to keep the Appium 2 behavior and enable the feature for _all_
    drivers that support it, you can use the wildcard (`*`) prefix:
    ```
    appium --allow-insecure=*:adb_shell
    ```
    Server-scope features like `session_discovery` also require the wildcard prefix.


### Session Discovery Requires Feature Flag

In Appium 2, it was possible to retrieve all active server sessions via the `GET /sessions`
endpoint. This information could then be used, for example, in Appium Inspector, in order to attach
to an existing session, instead of creating a new one.

Appium 3 makes two changes to the session discovery process:

* The `GET /sessions` endpoint is replaced with `GET /appium/sessions` (see [the Removed Endpoints section](#removed))
* The use of the new endpoint requires the `session_discovery` [feature flag](./security.md)

The return value of `GET /appium/sessions` is largely identical to `GET /sessions`, but additionally
includes the `created` field for each session entry, indicating the session creation time as a Unix
timestamp. The rest of the result format remains unchanged.

To reduce migration efforts, the `GET /appium/sessions` endpoint (locked behind the aforementioned
feature flag) is also available in Appium `2.19`, allowing you to adjust your code before upgrading
to Appium 3. As for Appium Inspector, support for this new endpoint is available starting from
version `2025.3.1`.

!!! info "Actions Needed"

    * If your code uses session retrieval, change the endpoint from `GET /sessions` to
    `GET /appium/sessions`
    * If you use Appium Inspector's Attach to Session feature, upgrade to version `2025.3.1` or later
    * In both cases, ensure your Appium server is launched with the `session_discovery`
    [feature flag](./security.md)

### Unzip Logic Removed

Appium 3 removes the custom unzip logic used when working with files like application packages.
Such files are often only relevant to particular platforms, therefore the functionality for
handling these operations has been moved to relevant drivers.

!!! info "Actions Needed"

    Ensure you are using the most recent versions of your drivers

### Express 5

Appium 3 upgrades the internally-used `express` dependency from `v4` to `v5`. This should not
affect users who use Appium directly, but developers integrating parts of Appium into their own
projects may want to check [the Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html).

!!! info "Actions Needed"

    None! (hopefully)

## Endpoint Changes
### Removed

The following is a list of all the Appium server endpoints removed in Appium 3. For ease of
migration, additional information is provided for each endpoint: drivers that still support the
endpoint; suggested replacement endpoints, or, rarely, the lack of any available replacements.

Icons are used to indicate endpoint support in either certain drivers, or in the core Appium server
(applicable to all drivers):

<div class="grid cards" markdown>

-   :simple-appium:{ .lg } - Appium server
-   :material-apple:{ .lg } - [XCUITest driver](https://appium.github.io/appium-xcuitest-driver/latest/)
-   :material-android:{ .lg } - [UiAutomator2 driver](https://github.com/appium/appium-uiautomator2-driver/)
-   :material-coffee:{ .lg } - [Espresso driver](https://github.com/appium/appium-espresso-driver)
-   :material-apple-finder:{ .lg } - [Mac2 driver](https://github.com/appium/appium-mac2-driver)
-   :material-microsoft-windows:{ .lg } - [Windows driver](https://github.com/appium/appium-windows-driver)

</div>

* `GET /sessions`
    * :octicons-arrow-right-24: `GET /appium/sessions` :simple-appium:
* `POST /session/:sessionId/accept_alert`
    * :octicons-arrow-right-24: `POST /session/:sessionId/alert/accept` :simple-appium:
    * :octicons-arrow-right-24: `mobile: alert` [execute method](./execute-methods.md) :material-apple:
    * :octicons-arrow-right-24: `mobile: acceptAlert` execute method :material-android:
* `GET /session/:sessionId/alert_text`
    * :octicons-arrow-right-24: `GET /session/:sessionId/alert/text` :simple-appium:
* `POST /session/:sessionId/alert_text`
    * :octicons-arrow-right-24: `POST /session/:sessionId/alert/text` :simple-appium:
* `POST /session/:sessionId/appium/app/background`
    * :octicons-arrow-right-24: `mobile: backgroundApp` execute method :material-apple: :material-android: :material-coffee:
* `POST /session/:sessionId/appium/app/close`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `mobile: terminateApp` execute method :material-apple: :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: terminateApp` execute method :material-apple-finder:
    * :octicons-arrow-right-24: `windows: closeApp` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/app/end_test_coverage`
    * :octicons-arrow-right-24: `mobile: shell` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/app/launch`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `mobile: launchApp` execute method :material-apple:
    * :octicons-arrow-right-24: `mobile: activateApp` or `mobile: startActivity` execute methods :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: launchApp` or `macos: activateApp` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: launchApp` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/app/reset`
    * :octicons-arrow-right-24: `mobile: clearApp` execute method :material-apple: [^sim] :material-android: :material-coffee:
* `POST /session/:sessionId/appium/app/strings`
    * :octicons-arrow-right-24: `mobile: getAppStrings` execute method :material-apple: :material-android: :material-coffee:
* `GET /session/:sessionId/appium/device/app_state`
    * :octicons-arrow-right-24: `POST /session/:sessionId/appium/device/app_state` :simple-appium:
    * :octicons-arrow-right-24: `mobile: queryAppState` execute method :material-apple: :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: queryAppState` execute method :material-apple-finder:
* `GET /session/:sessionId/appium/device/current_activity`
    * :octicons-arrow-right-24: `mobile: getCurrentActivity` execute method :material-android: :material-coffee:
* `GET /session/:sessionId/appium/device/current_package`
    * :octicons-arrow-right-24: `mobile: getCurrentPackage` execute method :material-android: :material-coffee:
* `GET /session/:sessionId/appium/device/display_density`
    * :octicons-arrow-right-24: `mobile: getDisplayDensity` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/finger_print`
    * :octicons-arrow-right-24: `mobile: fingerPrint` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/get_clipboard`
    * :octicons-check-24: Moved to drivers: :material-android: :material-coffee:
    * :octicons-arrow-right-24: `mobile: getClipboard` execute method :material-apple: :material-android: :material-coffee:
    * :octicons-arrow-right-24: `mobile: getPasteboard` execute method :material-apple: [^sim]
    * :octicons-arrow-right-24: `windows: getClipboard` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/device/gsm_call`
    * :octicons-arrow-right-24: `mobile: gsmCall` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/gsm_signal`
    * :octicons-arrow-right-24: `mobile: gsmSignal` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/gsm_voice`
    * :octicons-arrow-right-24: `mobile: gsmVoice` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/is_locked`
    * :octicons-arrow-right-24: `mobile: isLocked` execute method :material-apple: :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/keyevent`
    * :octicons-arrow-right-24: `mobile: keys` execute method :material-apple: (iPadOS only)
    * :octicons-arrow-right-24: `mobile: pressKey` execute method :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: keys` execute method :material-apple-finder:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/device/lock`
    * :octicons-arrow-right-24: `mobile: lock` execute method :material-apple: :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/long_press_keycode`
    * :octicons-arrow-right-24: `mobile: pressKey` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/network_speed`
    * :octicons-arrow-right-24: `mobile: networkSpeed` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/open_notifications`
    * :octicons-arrow-right-24: `mobile: statusBar` execute method :material-android: :material-coffee:
    * :octicons-arrow-right-24: `mobile: openNotifications` execute method :material-android:
* `POST /session/:sessionId/appium/device/power_ac`
    * :octicons-arrow-right-24: `mobile: powerAC` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/power_capacity`
    * :octicons-arrow-right-24: `mobile: powerCapacity` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/press_keycode`
    * :octicons-arrow-right-24: `mobile: keys` execute method :material-apple: (iPadOS only)
    * :octicons-arrow-right-24: `mobile: pressKey` execute method :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: keys` execute method :material-apple-finder:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/device/send_sms`
    * :octicons-arrow-right-24: `mobile: sendSms` execute method :material-android: [^sim] :material-coffee: [^sim]
* `POST /session/:sessionId/appium/device/set_clipboard`
    * :octicons-arrow-right-24: `mobile: setClipboard` execute method :material-apple: :material-android: :material-coffee:
    * :octicons-arrow-right-24: `mobile: setPasteboard` execute method :material-apple: [^sim]
    * :octicons-arrow-right-24: `windows: setClipboard` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/device/shake`
    * :octicons-arrow-right-24: `mobile: shake` execute method :material-apple: [^sim]
* `POST /session/:sessionId/appium/device/start_activity`
    * :octicons-arrow-right-24: `mobile: startActivity` execute method :material-android: :material-coffee:
* `GET /session/:sessionId/appium/device/system_bars`
    * :octicons-arrow-right-24: `mobile: deviceScreenInfo` execute method :material-apple:
    * :octicons-arrow-right-24: `mobile: getSystemBars` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/toggle_airplane_mode`
    * :octicons-arrow-right-24: `mobile: setConnectivity` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/toggle_data`
    * :octicons-arrow-right-24: `mobile: setConnectivity` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/toggle_location_services`
    * :octicons-arrow-right-24: `mobile: toggleGps` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/toggle_wifi`
    * :octicons-arrow-right-24: `mobile: setConnectivity` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/device/unlock`
    * :octicons-arrow-right-24: `mobile: unlock` execute method :material-apple: :material-android: :material-coffee:
* `POST /session/:sessionId/appium/element/:elementId/value`
    * :octicons-arrow-right-24: `POST /session/:sessionId/element/:elementId/value` :simple-appium:
* `POST /session/:sessionId/appium/element/:elementId/replace_value`
    * :octicons-arrow-right-24: `POST /session/:sessionId/element/:elementId/value` :simple-appium:
* `POST /session/:sessionId/appium/getPerformanceData`
    * :octicons-arrow-right-24: `mobile: getPerformanceData` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/performanceData/types`
    * :octicons-arrow-right-24: `mobile: getPerformanceDataTypes` execute method :material-android: :material-coffee:
* `POST /session/:sessionId/appium/receive_async_response`
    * :octicons-arrow-right-24: `POST /session/:sessionId/execute/async` :simple-appium:
* `POST /session/:sessionId/appium/simulator/toggle_touch_id_enrollment`
    * :octicons-arrow-right-24: `mobile: enrollBiometric` execute method :material-apple: [^sim]
* `POST /session/:sessionId/appium/simulator/touch_id`
    * :octicons-arrow-right-24: `mobile: sendBiometricMatch` execute method :material-apple: [^sim]
* `POST /session/:sessionId/appium/start_recording_screen`
    * :octicons-check-24: Moved to drivers: :material-apple: :material-android: :material-coffee: :material-apple-finder: :material-microsoft-windows:
    * :octicons-arrow-right-24: `mobile: startXCTestScreenRecording` execute method :material-apple:
    * :octicons-arrow-right-24: `mobile: startMediaProjectionRecording` execute method :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: startRecordingScreen` or `macos: startNativeScreenRecording` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: startRecordingScreen` execute method :material-microsoft-windows:
* `POST /session/:sessionId/appium/stop_recording_screen`
    * :octicons-check-24: Moved to drivers: :material-apple: :material-android: :material-coffee: :material-apple-finder: :material-microsoft-windows:
    * :octicons-arrow-right-24: `mobile: stopXCTestScreenRecording` execute method :material-apple:
    * :octicons-arrow-right-24: `mobile: stopMediaProjectionRecording` execute method :material-android: :material-coffee:
    * :octicons-arrow-right-24: `macos: stopRecordingScreen` or `macos: stopNativeScreenRecording` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: stopRecordingScreen` execute method :material-microsoft-windows:
* `GET /session/:sessionId/application_cache/status`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/buttondown`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: [W3C Actions API](https://www.selenium.dev/documentation/webdriver/actions_api/) (`pointerDown`) :simple-appium:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `POST /session/:sessionId/buttonup`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerUp`) :simple-appium:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `POST /session/:sessionId/click`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown` & `pointerUp`) :simple-appium:
* `POST /session/:sessionId/dismiss_alert`
    * :octicons-arrow-right-24: `POST /session/:sessionId/alert/dismiss` :simple-appium:
* `POST /session/:sessionId/doubleclick`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown` & `pointerUp`) :simple-appium:
* `POST /session/:sessionId/element/active`
    * :octicons-arrow-right-24: `GET /session/:sessionId/element/active` :simple-appium:
* `GET /session/:sessionId/element/:elementId/equals/:otherId`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
* `GET /session/:sessionId/element/:elementId/location`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `GET /session/:sessionId/element/:elementId/rect` :simple-appium:
* `GET /session/:sessionId/element/:elementId/location_in_view`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
* `GET /session/:sessionId/element/:elementId/pageIndex`
    * :octicons-no-entry-24: MJSONWP protocol command with no direct replacement
* `GET /session/:sessionId/element/:elementId/size`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `GET /session/:sessionId/element/:elementId/rect` :simple-appium:
* `POST /session/:sessionId/element/:elementId/submit`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/execute`
    * :octicons-arrow-right-24: `POST /session/:sessionId/execute/sync` :simple-appium:
* `POST /session/:sessionId/execute_async`
    * :octicons-arrow-right-24: `POST /session/:sessionId/execute/async` :simple-appium:
* `POST /session/:sessionId/keys`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`keyDown` & `keyUp`) :simple-appium:
        * Selenium-based clients can also use [Send Keys](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/#send-keys)
* `GET /session/:sessionId/local_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/local_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `DELETE /session/:sessionId/local_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `GET /session/:sessionId/local_storage/key/:key`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `DELETE /session/:sessionId/local_storage/key/:key`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `GET /session/:sessionId/local_storage/size`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/log`
    * :octicons-arrow-right-24: `POST /session/:sessionId/se/log` :simple-appium:
* `GET /session/:sessionId/log/types`
    * :octicons-arrow-right-24: `GET /session/:sessionId/se/log/types` :simple-appium:
* `POST /session/:sessionId/moveto`
    * :octicons-arrow-right-24: W3C Actions API (`pointerMove`) :simple-appium:
        * Selenium-based clients can also use [Move by Offset](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#move-by-offset)
* `GET /session/:sessionId/screenshot/:elementId`
    * :octicons-arrow-right-24: `GET /session/:sessionId/element/:elementId/screenshot` :simple-appium:
* `GET /session/:sessionId/session_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/session_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `DELETE /session/:sessionId/session_storage`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `GET /session/:sessionId/session_storage/key/:key`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `DELETE /session/:sessionId/session_storage/key/:key`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `GET /session/:sessionId/session_storage/size`
    * :octicons-no-entry-24: JSONWP protocol command with no direct replacement
* `POST /session/:sessionId/timeouts/async_script`
    * :octicons-arrow-right-24: `POST /session/:sessionId/timeouts` :simple-appium:
* `POST /session/:sessionId/timeouts/implicit_wait`
    * :octicons-arrow-right-24: `POST /session/:sessionId/timeouts` :simple-appium:
* `POST /session/:sessionId/touch/click`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown` & `pointerUp`) :simple-appium:
        * Selenium-based clients can also use [Click and Release](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#click-and-release)
    * :octicons-arrow-right-24: `mobile: tap` or `mobile: tapWithNumberOfTaps` execute methods :material-apple:
    * :octicons-arrow-right-24: `mobile: clickGesture` execute method :material-android:
    * :octicons-arrow-right-24: `mobile: clickAction` execute method :material-coffee:
    * :octicons-arrow-right-24: `macos: click`, `macos: rightClick`, `macos: press` or `macos: tap` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: click` execute method :material-microsoft-windows:
* `POST /session/:sessionId/touch/doubleclick`
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown` & `pointerUp`) :simple-appium:
        * Selenium-based clients can also use [Double Click](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#double-click)
    * :octicons-arrow-right-24: `mobile: doubleTap` or `mobile: tapWithNumberOfTaps` execute methods :material-apple:
    * :octicons-arrow-right-24: `mobile: doubleClickGesture` execute method :material-android:
    * :octicons-arrow-right-24: `mobile: clickAction` execute method :material-coffee:
    * :octicons-arrow-right-24: `macos: doubleClick` or `macos: doubleTap` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: click` execute method :material-microsoft-windows:
* `POST /session/:sessionId/touch/down`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown`) :simple-appium:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `POST /session/:sessionId/touch/flick`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown`, `pointerMove` & `pointerUp`) :simple-appium:
    * :octicons-arrow-right-24: `mobile: flingGesture` execute method :material-android:
* `POST /session/:sessionId/touch/longclick`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown`, `pause` & `pointerUp`) :simple-appium:
    * :octicons-arrow-right-24: `mobile: touchAndHold` execute method :material-apple:
    * :octicons-arrow-right-24: `mobile: longClickGesture` execute method :material-android:
    * :octicons-arrow-right-24: `mobile: clickAction` execute method :material-coffee:
    * :octicons-arrow-right-24: `macos: press` execute method :material-apple-finder:
    * :octicons-arrow-right-24: `windows: click` execute method :material-microsoft-windows:
* `POST /session/:sessionId/touch/multi/perform`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `POST /session/:sessionId/actions` :simple-appium:
* `POST /session/:sessionId/touch/move`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerMove`) :simple-appium:
        * Selenium-based clients can also use [Move by Offset](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#move-by-offset)
* `POST /session/:sessionId/touch/perform`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `POST /session/:sessionId/actions` :simple-appium:
* `POST /session/:sessionId/touch/scroll`
    * :octicons-arrow-right-24: W3C Actions API (`pointerDown`, `pointerMove` & `pointerUp`) :simple-appium:
    * :octicons-arrow-right-24: `mobile: scroll` or `mobile: swipe` execute methods :material-apple:
    * :octicons-arrow-right-24: `mobile: scrollGesture` or `mobile: swipeGesture` execute methods :material-android:
    * :octicons-arrow-right-24: `mobile: swipe` execute method :material-coffee:
    * :octicons-arrow-right-24: `macos: scroll` or `macos: swipe` execute methods :material-apple-finder:
    * :octicons-arrow-right-24: `windows: scroll` execute method :material-microsoft-windows:
* `POST /session/:sessionId/touch/up`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: W3C Actions API (`pointerUp`) :simple-appium:
    * :octicons-arrow-right-24: `windows: keys` execute method :material-microsoft-windows:
* `GET /session/:sessionId/window_handle`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `GET /session/:sessionId/window` :simple-appium:
* `GET /session/:sessionId/window_handles`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `GET /session/:sessionId/window/handles` :simple-appium:
* `GET /session/:sessionId/window/handle`
    * :octicons-arrow-right-24: `GET /session/:sessionId/window` :simple-appium:
* `POST /session/:sessionId/window/:windowhandle/maximize`
    * :octicons-arrow-right-24: `POST /session/:sessionId/window/maximize` :simple-appium:
        * :fontawesome-solid-triangle-exclamation: Only supported for the current window
* `GET /session/:sessionId/window/:windowhandle/position`
    * :octicons-arrow-right-24: `GET /session/:sessionId/window/rect` :simple-appium:
        * :fontawesome-solid-triangle-exclamation: Only supported for the current window
* `POST /session/:sessionId/window/:windowhandle/position`
    * :octicons-arrow-right-24: `POST /session/:sessionId/window/rect` :simple-appium:
        * :fontawesome-solid-triangle-exclamation: Only supported for the current window
* `GET /session/:sessionId/window/:windowhandle/size`
    * :octicons-check-24: Moved to drivers: :material-microsoft-windows:
    * :octicons-arrow-right-24: `GET /session/:sessionId/window/rect` :simple-appium:
        * :fontawesome-solid-triangle-exclamation: Only supported for the current window

### Modified

The following are all endpoints modified in Appium 3, by removing handling for old or unused
parameters (note that no new parameters have been added). Each endpoint lists the parameters it no
longer accepts, as well as the parameters it continues to accept in Appium 3.

* `POST /session`
    * :octicons-x-24: `desiredCapabilities`, `requiredCapabilities`
    * :octicons-check-24: `capabilities`
* `POST /session/:sessionId/alert/text`
    * :octicons-x-24: `value`
    * :octicons-check-24: `text`
* `GET /session/:sessionId/appium/device/system_time`
    * :octicons-x-24: `format`
    * :octicons-check-24: None
* `POST /session/:sessionId/element/:elementId/value`
    * :octicons-x-24: `value`
    * :octicons-check-24: `text`
* `POST /session/:sessionId/timeouts`
    * :octicons-x-24: `type`, `ms`
    * :octicons-check-24: `script`, `pageLoad`, `implicit`
* `POST /session/:sessionId/window`
    * :octicons-x-24: `name`
    * :octicons-check-24: `handle`

[^sim]: Supported in emulators/simulators only


--- SOURCE: en/guides/config.md ---

---
title: The Appium Config File
---

Instead of passing arguments on the command line to Appium, you may add them to a special config
file. Appium will read values from this config file when it runs. (Please note that CLI arguments
have _precedence_ over configuration files; if a value is set in a config file _and_ via CLI
argument, the CLI argument is preferred.)

## Supported Config File Formats

You can store your config data in the following kinds of files:

- JSON
- YAML
- JS (a JavaScript file exporting a JS object)
- CJS (the same as above; the extension is for common JS)

!!! warning

    Note: Configuration files in ESM format are not currently supported.

## Supported Config File Locations

Configuration files can be named anything, but the following filenames will be automatically
discovered and loaded by Appium:

- `.appiumrc.json` (recommended)
- `.appiumrc.yaml`
- `.appiumrc.yml`
- `.appiumrc.js`
- `.appiumrc.cjs`
- `appium.config.js`
- `appium.config.cjs`
- `.appiumrc` (which is considered to be JSON)

Further, _if your project uses Node.js,_ you can use store the configuration inside an `appium`
property in your `package.json` and it will be automatically discovered.

### Config File Search

Appium will search _up_ the directory tree from the current working directory for one of these
files. If it reaches the current user's home directory or filesystem root, it will stop looking.

To specify a _custom_ location for your config file, use `appium --config /path/to/config/file`.

#### Configuration File Format

First, you might want to look at some examples:

- [Appium Configuration - JSON](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.json)
- [Appium Configuration - YAML](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.yaml)
- [Appium Configuration - JS](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.js)

A description of the format is available, as well:

- [Appium Configuration File JSON Schema](https://github.com/appium/appium/blob/master/packages/schema/lib/appium-config.schema.json)
- [TypeScript declarations for Appium Configuration](https://github.com/appium/appium/blob/master/packages/types/lib/config.ts)

To describe in words, the config file will have a root `server` property, and all arguments are
child properties. For certain properties which must be supplied on the command-line as
comma-delimited lists, JSON strings, and/or external filepaths, these instead will be of their
"native" type. For example, `--use-plugins <value>` needs `<value>` to be comma-delimited string
or path to a delimited file. However, the config file just wants an array, e.g.,:

```json
{
  "server": {
    "use-plugins": ["my-plugin", "some-other-plugin"]
  }
}
```

## Configuring extensions (drivers and plugins)

For `driver`-and-`plugin`-specific configuration, these live under the `server.driver` and
`server.plugin` properties, respectively. Each driver or plugin will have its own named property,
and the values of any specific configuration it provides are under this. For example:

```json
{
  "server": {
    "driver": {
      "xcuitest": {
        "webkit-debug-proxy-port": 5400
      }
    }
  }
}
```

!!! note

    The above configuration corresponds to the `--driver-xcuitest-webkit-debug-proxy-port` CLI argument.

All properties are case-sensitive and will be in
[kebab-case](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words).
For example, `callback-port` is allowed, but `callbackPort` is not.


--- SOURCE: en/guides/grid.md ---

---
title: Appium and Selenium Grid
---

## Using Selenium Grid 4+

The
[relay](https://www.selenium.dev/documentation/grid/configuration/toml_options/#relaying-commands-to-a-service-endpoint-that-supports-webdriver)
feature in Grid 4 allows you to proxy Appium requests to an Appium server instance. Here is
an example walkthrough of how you would connect two different Appium instances to a Selenium Grid.

### Define the Appium configs

Each Appium instance should have a config file that can be easily updated. It should contain any
information which needs to be unique to that particular server (e.g., ports its drivers should use
that others should not). We are going to have 2 Appium servers, so we will need 2 config files:

```yaml
# appium1.yml
server:
  port: 4723
  use-drivers:
    - xcuitest
  default-capabilities:
    appium:wdaLocalPort: 8100
    appium:mjpegServerPort: 9100
    appium:mjpegScreenshotUrl: "http://localhost:9100"
    appium:platformVersion: "26.0"
    appium:deviceName: "iPhone 17"
```

In the above YAML config file, we specify the Appium server port, the driver used, and parameters
for the driver that will be sent in as default capabilities. Our goal is to ensure that any other
drivers running on this host will not compete with system ports or other resources. The second
config file could look like the following, where we simply adjust a few ports to prevent clashes:

```yaml
# appium2.yml
server:
  port: 4733
  use-drivers:
    - xcuitest
  default-capabilities:
    appium:wdaLocalPort: 8110
    appium:mjpegServerPort: 9110
    appium:mjpegScreenshotUrl: "http://localhost:9110"
    appium:platformVersion: "26.0"
    appium:deviceName: "iPhone 16"
```

### Define the Grid node configs

We will be launching one Grid "node" per Appium server, to manage relaying commands and determining
capacity and online status, etc... So we should have one config file per Grid node as well. Each
node config should include the address of the Appium server it will target, as well as a list of
capability "configs" it should accept to relay a session request to Appium. Here is what the config
could look like for the two nodes:

```toml
# node1.toml
[server]
port = 5555

[node]
detect-drivers = false

[events]
publish = "tcp://HUB_IP_ADDRESS:4442"
subscribe = "tcp://HUB_IP_ADDRESS:4443"

[relay]
url = "http://localhost:4723"
status-endpoint = "/status"
configs = [
    "1", "{\"platformName\": \"iOS\", \"appium:automationName\": \"XCUITest\"}"
]
```

```toml
# node2.toml
[server]
port = 5565

[node]
detect-drivers = false

[events]
publish = "tcp://HUB_IP_ADDRESS:4442"
subscribe = "tcp://HUB_IP_ADDRESS:4443"

[relay]
url = "http://localhost:4733"
status-endpoint = "/status"
configs = [
    "1", "{\"platformName\": \"iOS\", \"appium:automationName\": \"XCUITest\"}"
]
```

Note that each node config also specifies a different port itself for the node to run on.

### Putting it together

The Grid nodes aren't enough--you'll also want a Grid "hub" that acts as a load balancer and
manager for all the nodes. So in the end we'll have 5 processes running at once: 2 Appium servers,
2 Grid nodes, and 1 Grid hub. It's best to run each of these in a separate terminal window to avoid
confusion of logs. Here is how you'd start each process:

0. `appium --config appium1.yml`
0. `appium --config appium2.yml`
0. `java -jar /path/to/selenium.jar node --config node1.toml`
0. `java -jar /path/to/selenium.jar node --config node2.toml`
0. `java -jar /path/to/selenium.jar hub`

Once you wait a few moments for the nodes to detect their Appium servers, and to register with the
hub, you'll be able to send all your Appium traffic via the single hub endpoint (defaulting to
`http://localhost:4444`).

And of course, you're able to link up Appium servers and nodes running on different machines in
your network to form a larger grid.

## Using Selenium Grid 3

It is possible to register your Appium server with a local [Selenium Grid 3](https://www.selenium.dev/documentation/legacy/selenium_3/grid_3/)
([setup docs](https://www.selenium.dev/documentation/legacy/grid_3/setting_up_your_own_grid/)) instance by using the
`--nodeconfig` server argument.

```bash
appium server --nodeconfig /path/to/nodeconfig.json --base-path=/wd/hub
```

In the referenced config file you have to define the `browserName`, `version` and `platform`
capabilities and based on these parameters the grid will re-direct your test to the right device.
You will also need to configure your host details and the Selenium Grid details. For a full list of
all parameters and descriptions see
[here](https://www.selenium.dev/documentation/legacy/selenium_3/grid_setup/).

Once you start the Appium server it will register with the grid, and you will see your device on
the grid console page:

`http://**\<grid-ip-adress\>**:**\<grid-port\>**/grid/console`

### Example Grid Node Configuration JSON

```json
{
  "capabilities":
      [
        {
          "browserName": "<e.g._iPhone5_or_iPad4>",
          "version":"<version_of_iOS_e.g._7.1>",
          "maxInstances": 1,
          "platform":"<platform_e.g._MAC_or_ANDROID>"
        }
      ],
  "configuration":
  {
    "cleanUpCycle":2000,
    "timeout":30000,
    "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
    "url":"http://<host_name_appium_server_or_ip-address_appium_server>:<appium_port>/wd/hub",
    "host": "<host_name_appium_server_or_ip-address_appium_server>",
    "port": <appium_port>,
    "maxSession": 1,
    "register": true,
    "registerCycle": 5000,
    "hubPort": <grid_port>,
    "hubHost": "<Grid_host_name_or_grid_ip-address>",
    "hubProtocol": "<Protocol_of_Grid_defaults_to_http>"
  }
}
```

If `url`, `host`, and `port` are not given, the config will be auto updated to point to
`localhost:<appium-port>`.

If your Appium server is running on a different machine to your Selenium Grid server, make sure you
use an external name/IP address in your `host` and `url` configuration; `localhost` and `127.0.0.1`
will prevent Selenium Grid from connecting correctly.


--- SOURCE: en/guides/log-filters.md ---

---
title: Filtering the Appium Log
---

Sometimes it might be necessary to hide sensitive information, like passwords, device identifiers,
hashes, etc..., from the server log. Appium makes it possible to ensure such information is
redacted in logs via the `--log-filters` command line argument. This argument allows you to provide
the path to a special config file, containing one or more log obfuscation rules.

## Config Format

The filtering config must be one of:

- a path to a valid JSON file containing an array of filtering rules
- a `log-filters` entry in an [Appium Config](./config.md) file, with the rules array inline

Each rule is an object with a set of predefined properties. The following rule properties are
supported:

- `pattern`: A valid Javascript RegExp pattern to replace. Must be a valid non-empty pattern.
- `text`: A simple non-empty exact text match to replace. Either this property or the above one must
  be provided. `pattern` has priority over `text` if both are provided.
- `flags`: Regular expression flags for the given pattern. Supported flags are the same as for the
  standard JavaScript [RegExp constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags_2).
  Note that the `g` (global matching) flag is always enabled.
- `replacer`: The replacer value to use. By default it is `**SECURE**`. Empty values are allowed.

### Config Examples

Replace all occurrences of `my.magic.app` string with the default replacer:

```json
[
    {
        "text": "my.magic.app"
    }
]
```

Replace all occurrences of `my.magic.<any char>` string with a custom replacer (case insensitive):

```json
[
    {
        "pattern": "my\\.magic\\.\\w",
        "flags": "i",
        "replacer": "***"
    }
]
```

Replace all occurrences of `my.magic.<any chars>` and/or `your.magic` strings with a custom
replacer (case insensitive):

```json
[
    {
        "pattern": "my\\.magic\\.\\w+",
        "flags": "i",
        "replacer": "***"
    },
    {
        "pattern": "your\\.magic",
        "flags": "i",
        "replacer": "***"
    }
]
```

Truncate all log lines to max 15 chars (advanced):

```json
[
	{
        "pattern": "(.{1,15}).*",
        "flags": "s",
        "replacer": "$1"
    }
]
```

### Config Errors Handling

If any of the config rules contains invalid items (such as empty/invalid pattern, empty rule, etc.)
then Appium will print the detailed report about collected errors and will fail to start until
these errors are addressed.


--- SOURCE: en/guides/security.md ---

---
title: Appium Server Security
---

The Appium team makes every effort to ensure the security of the Appium server. This is especially
important when Appium is run in a multitenant environment, or when multiple users are running
sessions on the same Appium server. In general, you can only safely enable all of Appium's features if
all the following are true:

- You're running your own Appium server locally or within a protected internal network
- You're not sharing it with any untrusted parties
- You don't expose Appium's port(s) to the wider internet

But because many Appium users might not be able to guarantee such a safe environment, the Appium
team puts many features behind a security protection mechanism, which forces system admins (the
people who are in charge of starting the Appium server) to _explicitly opt-in_ to these features.
(Third-party driver and plugin authors can also [hide behaviour behind security
flags](../developing/build-drivers.md).)

For security reasons, Appium client sessions can _not_ request feature enablement via capabilities.
This is the responsibility of the server admin who configures and launches the Appium server.

## Security Server Args

The [Server CLI](../reference/cli/server.md) doc outlines three relevant arguments which may be passed to
Appium, when starting it from the command line:

|<div style="width:10em">Parameter</div>|Description|
|---------------------------------------|-----------|
|`--relaxed-security`|Turns on _all_ insecure features, except those blocked by `--deny-insecure`|
|`--allow-insecure`|Turns on _only_ specified features, except those blocked by `--deny-insecure`. Has no effect when used in combination with `--relaxed-security`|
|`--deny-insecure`|Explicitly turns _off_ specified features, overriding `--relaxed-security` and `--allow-insecure`|

All of the above arguments can also be specified in the [Appium Configuration file](./config.md).

Features passed to `--allow-insecure`/`--deny-insecure` must be specified as a comma-separated list,
and each feature in the list must additionally include a prefix, indicating the driver to which the
feature should apply. The prefix can be either the driver's `automationName`, or the wildcard (`*`)
symbol, if the feature should be applied to all drivers. The prefix and feature name are separated
using the colon character (`:`).

For example, `first:foo` refers to the `foo` feature for the `first` driver, whereas `*:bar` refers
to the `bar` feature for all drivers.

## Insecure Features

Each Appium driver is responsible for its own security, and can create its own feature names. Thus,
you should read through the documentation for a particular driver to know which feature names it
might use. Here is an incomplete list of examples from some of Appium's official drivers:

|<div style="width:12em">Feature Name</div>|Description|Supported Extension(s)|
|------------|-----------|-------|
|`get_server_logs`|Allows retrieving of Appium server logs via the Webdriver log interface|IOS, XCUITest, Android, UiAutomator2, Espresso|
|`adb_shell`|Allows execution of arbitrary shell commands via ADB, using the `mobile: shell` command|Android, UiAutomator2, Espresso|
|`record_audio`|Allow recording of host machine audio inputs|XCUITest|
|`execute_driver_script`| Allows sending a request that has multiple Appium commands.|Execute Driver Plugin|

Some insecure features operate on the server level and do not require a driver session. Enabling
these features require using the wildcard prefix:

|<div style="width:12em">Feature Name</div>|Description|
|------------|-----------|
|`session_discovery`|Allows retrieving the list of active server sessions via `GET /appium/sessions`|

## Examples

Turn on the `foo` feature only for the `first` driver:

```bash
appium --allow-insecure=first:foo
```

Turn on the `foo` feature for all drivers:

```bash
appium --allow-insecure='*:foo'
```

Turn on the `foo` feature for all drivers _except_ `first`:

```bash
appium --allow-insecure='*:foo' --deny-insecure=first:foo
```

Turn on all features _except_ `foo` for all drivers:

```bash
appium --relaxed-security --deny-insecure='*:foo'
```

Turn on multiple insecure features for specific drivers:

```bash
appium --allow-insecure=uiautomator2:adb_shell,xcuitest:get_server_logs
```


--- SOURCE: en/guides/event-timing.md ---

---
hide:
  - toc

title: Retrieving Event Timings
---

Appium comes with the ability to retrieve timing information about startup
information and command length. This is an advanced feature that is controlled
by the use of the `appium:eventTimings` capability (set it to `true` to log event
timings).

With this capability turned on, the `POST /session/:id/appium/events` response (i.e., 
the response to `driver.logs.events` or similar, depending on client) will be 
decorated with an `events` property. This is the structure of that `events`
property:

```
{
    "<event_type>": [<occurence_timestamp_1>, ...],
    "commands": [
        {
            "cmd": "<command_name>",
            "startTime": <js_timestamp>,
            "endTime": <js_timestamp>
        },
        ...
    ]
}
```

In other words, the `events` property has 2 kinds of properties of its own:

* Properties which are the names of event types
* The `commands` property

Properties which are names of event types correspond to an array of timestamps
when that event happened. It's an array because events might happen multiple
times in the course of a session. Examples of event types include:

* `newSessionRequested`
* `newSessionStarted`

(Individual drivers will define their own event types, so we do not have an
exhaustive list to share here. It's best to actually get one of these responses
from a real session to inspect the possible event types.)

The `commands` property is an array of objects. Each object has the name of the
Appium-internal command (for example `click`), as well as the time the command
started processing and the time it finished processing.

With this data, you can calculate the time between events, or a strict timeline
of events, or statistical information about average length of a certain type of
command, and so on.

You can only receive data about events that have happened when you make the
call to `/session/:id/appium/events`, so the best time to get data about an entire session is
right before quitting it.

The Appium team maintains an event timings parser tool that can be used to
generate various kinds of reports from event timings output:
[appium/appium-event-parser](https://github.com/appium/appium-event-parser).

!!! note

    In the past, events were available as a part of `GET /session/:id` response

## Add a custom event

You can add custom events that will show up in the event timings data. You can send a custom event
name to the Appium server using the [Log Custom Event API](../reference/api/appium.md#logcustomevent),
and the server will store the timestamp. The [Get Log Events](../reference/api/appium.md#getlogevents)
command can be used to retrieve named events' timestamps later on.


--- SOURCE: en/reference/index.md ---

---
hide:
  - toc

title: Reference
---

This section of the Appium documentation provides a reference to the two main interfaces within the
Appium server: the command-line executable, and the supported API endpoints.

<div class="grid cards" markdown>

-   :octicons-command-palette-16: [__Command Line Interface__](./cli/index.md)

    ---

    Learn how to use the Appium command-line executable

-   :material-cloud-braces: [__API Endpoints__](./api/index.md)

    ---

    View endpoints supported by the Appium server

</div>


--- SOURCE: en/reference/cli/extensions.md ---

---
title: appium driver/plugin
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

Provides management options for a specific extension (driver or plugin). Both the `appium driver` and
`appium plugin` subcommands support the same options.

The following sub-subcommands are supported: `doctor`, `install`, `list`, `run`, `update`,
and `uninstall`.

## `doctor`

Runs doctor checks for an installed extension, which validate whether the extension has its prerequisites
configured correctly. Note that not all extensions include doctor checks.

!!! note

    If you maintain an Appium extension and would like to add Appium Doctor support for it, check
    out the documentation on [Building Doctor Checks](../../developing/build-doctor-checks.md).

#### Usage

```
appium {driver|plugin} doctor <extension-name>
```

|Argument|Description|
|--|--|
|`extension-name`|The short name of the installed extension|

#### Options

|Argument|Description|Type|
|--|--|--|
|`--json`|Return the result in JSON format|boolean|

#### Example

- Run doctor checks for the UiAutomator2 driver:

    ```
    appium driver doctor uiautomator2
    ```

## `install`

Installs an extension.

#### Usage

```
appium {driver|plugin} install <install-spec>
```

|<div style="width:7em">Argument</div>|Description|
|--|--|
|`install-spec`|The short name of an official extension, with optional `npm` version or tag modifier. If using the `--source` option, the expected format of this argument will change ([see below](#source-vs-install-spec)).|

#### Options

|Argument|Description|Type|
|--|--|--|
|`--json`|Return the result in JSON format|boolean|
|`--package`|The Node.js package name of the extension. Required if `--source` is set to `git` or `github`.|string|
|`--source`|The location where Appium should look for the given extension. Supported values are `git`, `github`, `local`, or `npm`. Changes the expected format of `install-spec` ([see below](#source-vs-install-spec)).|string|

#### Source vs Install Spec

|`source`|Format of `<install-spec>`|
|--|--|
|None|The short name of an official extension, with optional modifiers as supported by `npm install` (e.g. version or tag)|
|`git`|The Git URL of the extension|
|`github`|The GitHub repository URL of the extension|
|`local`|The local path to the extension containing its `package.json` file|
|`npm`|The name of the `npm` package, with optional modifiers as supported by `npm install` (e.g. version or tag)|

#### Examples

- Install the latest XCUITest driver:

    ```
    appium driver install xcuitest
    ```

- Install the XCUITest driver at version 9.0.0:

    ```
    appium driver install xcuitest@9.0.0
    ```

- Install the `beta` version of `@appium/fake-driver` from `npm`:

    ```
    appium driver install @appium/fake-driver@beta --source=npm
    ```

- Install a locally-developed plugin:

    ```
    appium plugin install /path/to/my/plugin --source=local
    ```

- Install the XCUITest driver from GitHub:

    ```
    appium driver install https://github.com/appium/appium-xcuitest-driver --source=github --package=appium-xcuitest-driver
    ```

- Install the XCUITest driver using a Git URL:

    ```
    appium driver install git://github.com/appium/appium-xcuitest-driver.git --source=git --package=appium-xcuitest-driver
    ```

## `list`

Lists all installed extensions, plus all official extensions that are not installed.

#### Usage

```
appium {driver|plugin} list
```

#### Options

|<div style="width:7em">Argument</div>|Description|Type|
|--|--|--|
|`--installed`|Only list all installed extensions|boolean|
|`--json`|Return the result in JSON format|boolean|
|`--updates`|List all extensions along with information on whether newer versions are available. Only supported for extensions installed via `npm`.|boolean|
|`--verbose`|Show additional details for each extension|boolean|

#### Example

- List all installed drivers and check if they have newer versions available:

    ```
    appium driver list --installed --updates
    ```

## `run`

Runs an extension script, which can assist with setup or perform other tasks. Note that not all
extensions include scripts.

#### Usage

```
appium {driver|plugin} run <extension-name> <script-name> [script-args]
```

|Argument|Description|
|--|--|
|`extension-name`|The short name of the installed extension|
|`script-name`|The name of the script to be run|
|`script-args`|Any additional arguments passed to the script|

#### Options

|Argument|Description|Type|
|--|--|--|
|`--json`|Return the result in JSON format|boolean|

#### Example

- Run the `reset` script included in the UiAutomator2 driver:

    ```
    appium driver run uiautomator2 reset
    ```

## `update`

Updates one or more extensions. Only supported for extensions installed via `npm`. By default,
Appium will only update minor and patch versions, in order to prevent any breaking changes.

#### Usage

```
appium {driver|plugin} update <extension-name>
```

|Argument|Description|
|--|--|
|`extension-name`|The short name of the installed extension, or `installed` to update all installed extensions|

#### Options

|Argument|Description|Type|
|--|--|--|
|`--json`|Return the result in JSON format|boolean|
|`--unsafe`|Allow updates of major versions, which may cause breaking changes|boolean|

#### Examples

- Update the UiAutomator2 driver to its latest major version:

    ```
    appium driver update uiautomator2 --unsafe
    ```

- Update all installed plugins:

    ```
    appium plugin update installed
    ```

## `uninstall`

Removes an installed extension.

#### Usage

```
appium {driver|plugin} uninstall <extension-name>
```

|Argument|Description|
|--|--|
|`extension-name`|The short name of the installed extension|

#### Options

|Argument|Description|Type|
|--|--|--|
|`--json`|Return the result in JSON format|boolean|

#### Example

- Remove the `images` plugin:

    ```
    appium plugin uninstall images
    ```


--- SOURCE: en/reference/cli/setup.md ---

---
title: appium setup
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

Installs a specific preset of extensions (drivers and plugins), or uninstalls all extensions.
When installing a preset, any already installed extensions are kept intact.

The following sub-subcommands are supported: `browser`, `desktop`, `mobile`, and `reset`.

Refer to the [Ecosystem documentation](../../ecosystem/index.md) to learn more about the extensions
mentioned below.

## `browser`

Installs the following extensions for browser webview testing:

* Drivers: `safari`[^1], `gecko`, `chromium`
* Plugins: `images`, `inspector`

#### Usage

```
appium setup browser
```

## `desktop`

Installs the following extensions for desktop application testing:

* Drivers: `mac2`[^1], `windows`[^2]
* Plugins: `images`, `inspector`

#### Usage

```
appium setup desktop
```

## `mobile`

Installs the following extensions for mobile testing:

* Drivers: `uiautomator2`, `xcuitest`[^1], `espresso`
* Plugins: `images`, `inspector`

#### Usage

```
appium setup mobile
```

You can also omit the `mobile` sub-subcommand:

```
appium setup
```

## `reset`

Uninstalls all installed extensions, along with their manifest files, from the Appium home
directory. This can be useful if you experience configuration issues on server startup, for
example, due to a failed upgrade attempt from an older Appium version.

#### Usage

```
appium setup reset
```

[^1]: Only installed if the host machine is running macOS.
[^2]: Only installed if the host machine is running Windows.


--- SOURCE: en/reference/cli/index.md ---

---
hide:
  - toc

title: Command Line Interface
---

Appium provides a command-line executable (`appium`), which can be used to configure and launch
the Appium server, as well as manage Appium extensions (drivers and plugins).

The executable has four main subcommands: `server`, `driver`, `plugin`, and `setup`. All subcommands
(and sub-subcommands) can be run with the `--help`/`-h` option for usage instructions.

<div class="grid cards" markdown>

-   [__`appium server`__](./server.md) (or simply `appium`)

    Start an Appium server

-   [__`appium driver`__](./extensions.md)

    Manage individual drivers

-   [__`appium plugin`__](./extensions.md)

    Manage individual plugins

-   [__`appium setup`__](./setup.md)

    Manage multiple drivers/plugins

</div>

Appium also recognizes several [environment variables](./env-vars.md), which may be used for
advanced configuration.


--- SOURCE: en/reference/cli/server.md ---

---
hide:
  - toc

title: appium server
---

Launches an Appium server.

```
appium server
```

You can also omit the `server` subcommand:

```
appium
```

### Options

!!! note

    All of these options can also be set via a [Configuration File](../../guides/config.md). Options
    set on the command line will override any options found in a configuration file.

|<div style="width:15em">Argument</div>|Description|Type|<div style="width:7em">Default</div>|
|--|--|--|--|
|`--address`, `-a`|IPv4/IPv6 address to listen on|string|`0.0.0.0`|
|`--allow-cors`|Allow web browser connections from any host|boolean|`false`|
|`--allow-insecure`|List of [insecure features](../../guides/security.md) that should be allowed in this server's sessions. Individual features can be overridden by `--deny-insecure`. Has no effect in combination with `--relaxed-security`.|array<string>|`[]`|
|`--base-path`, `-pa`|Base path to use as the prefix for all webdriver routes running on the server|string|`""`|
|`--callback-address`, `-ca`|Callback IP address|string|`0.0.0.0`|
|`--callback-port`, `-cp`|Callback port|integer|`4723`|
|`--config`|Path to an [Appium configuration JSON file](../../guides/config.md)|string||
|`--debug-log-spacing`|Add exaggerated spacing in logs to help with visual inspection|boolean|`false`|
|`--default-capabilities`, `-dc`|Capabilities that will be used for each session, unless overridden by received capabilities|object||
|`--deny-insecure`|List of [insecure features](../../guides/security.md) that should be disabled in this server's sessions. Since all insecure features are disabled by default, this argument has no effect without either `--allow-insecure` or `--relaxed-security`, and is applied after both.|array<string>|`[]`|
|`--driver`|Driver-specific configuration. Keys should correspond to driver package names|object||
|`--drivers-import-chunk-size`|Maximum number of drivers that can be imported in parallel on server startup|number|`3`|
|`--keep-alive-timeout`, `-ka`|Timeout (in seconds) to use as both the keep-alive timeout and the connection timeout for all client requests. Disabled if set to `0`.|integer|`600`|
|`--request-timeout`|Timeout (in seconds) for waiting to receive the entire HTTP request from the client. Disabled if set to `0`. Requests exceeding this timeout will be rejected with the code `HTTP 408`.|integer|`3600`|
|`--local-timezone`|Use local timezone for log timestamps|boolean|`false`|
|`--log`, `-g`|Path to a file where the server logs should be output. This does not affect output on the console.|string||
|`--log-filters`|List of log filtering rules. See the [log filtering guide](../../guides/log-filters.md) for details.|array||
|`--log-level`|The log level for the server logs. Supported values are `debug`, `info`, `warn`, or `error`. Combining two supported values using a colon (e.g. `warn:debug`) allows to set separate log levels for the console and file outputs, respectively.|string|`debug`|
|`--log-format`|The log format of the server logs. Supported values are `text`, `json`, or `pretty_json`. Setting the value to `json` disables colors.|string|`text`|
|`--log-no-colors`|Disable colors in the server log|boolean|`false`|
|`--log-timestamp`|Show timestamps in the server log|boolean|`false`|
|`--long-stacktrace`|Add long stack traces to log entries. Recommended for debugging only.|boolean|`false`|
|`--no-perms-check`|Skip various permission checks on the server startup|boolean|`false`|
|`--nodeconfig`|JSON configuration for registering Appium as a node with Selenium Grid 3|object||
|`--plugin`|Plugin-specific configuration. Keys should correspond to plugin package names|object||
|`--plugins-import-chunk-size`|Maximum number of plugins that can be imported in parallel on server startup|number|`7`|
|`--port`, `-p`|Port to listen on|integer|`4723`|
|`--relaxed-security`|Allow all [insecure features](../../guides/security.md). Only use this if all clients are in a trusted network and could not potentially break out of the session sandbox. Specific features can be overridden by using `--deny-insecure`.|boolean|`false`|
|`--session-override`|Enable session override (clobbering)|boolean|`false`|
|`--shutdown-timeout`|Timeout (in milliseconds) for waiting on all active connections to close, when shutting down the server|number|`5000`|
|`--ssl-cert-path`|Absolute path to the `.cert` file if TLS is used. Must be provided together with `--ssl-key-path`. See the [SSL/TLS/SPDY Support guide](../../guides/tls.md) for details.|string||
|`--ssl-key-path`|Absolute path to the `.key` file if TLS is used. Must be provided together with `--ssl-cert-path`. See the [SSL/TLS/SPDY Support guide](../../guides/tls.md) for details.|string||
|`--strict-caps`|Prevent creation of new client sessions that use unsupported capabilities|boolean|`false`|
|`--tmp`|Absolute path to the directory used for temporary files|string|[`os.tmpdir()`](https://nodejs.org/api/os.html#ostmpdir)|
|`--use-drivers`|List of drivers to activate. By default, all installed drivers are activated.|array<string>|`[]`|
|`--use-plugins`|List of plugins to activate. By default, no plugins are activated. Set to `["all"]` to activate all installed plugins.|array<string>|`[]`|
|`--webhook`, `-G`|URL for an HTTP listener where the server logs should be output. This does not affect output on the console.|string||

### Info Options

The following options are used for reference or debug purposes. They are only supported for the base `appium` command (not `appium server`), and will not launch the server.

|<div style="width:10em">Argument</div>|Description|
|--|--|
|`--show-build-info`|Print detailed information on the Appium server version|
|`--show-config`|Print the current Appium server configuration details|
|`--show-debug-info`|Print information on the current environment: details about the operating system, Node.js, and Appium itself|
|`--version`, `-v`|Print the Appium server version|


--- SOURCE: en/reference/cli/env-vars.md ---

---
hide:
  - toc

title: Environment Variables
---

The primary ways of configuring the Appium server are via [Command-Line Arguments](./server.md) or
the [Config File](../../guides/config.md). However, some more advanced features are toggled or
configured via environment variables. To set environment variables, refer to the documentation for
your operating system and terminal.

These are the environment variables that the Appium server understands:

|<div style="width:18em">Variable</div>|Description|
|--------|-----------|
|`APPIUM_APPS_CACHE_IGNORE_URL_QUERY`|Set this to a truthy value to remove any query part of a URL when using it as a cache key. See the corresponding [feature request](https://discuss.appium.io/t/regarding-app-caching-when-using-aws-s3-presigned-urls/42713) for more details.|
|`APPIUM_APPS_CACHE_MAX_AGE`|Set the maximum age (in minutes) for [cached applications](../../guides/caching.md). Do not set it to a lower number than the duration of a single session startup. Default: `60 * 24` (24 hours)|
|`APPIUM_APPS_CACHE_MAX_ITEMS`|Set the maximum amount of [cached applications](../../guides/caching.md). Do not set it to a lower number than the amount of apps in all parallel sessions per process. Default: `1024`|
|`APPIUM_HOME`|Set the path to the Appium home directory, which is used for [Managing Extensions](../../guides/managing-exts.md). Default: `.appium` in the home directory of the current user|
|`APPIUM_OMIT_PEER_DEPS`|Set this to `1` to add `--omit=peer` to all the NPM commands run internally by Appium. Mostly an internal feature.|
|`APPIUM_RELOAD_EXTENSIONS`|Set this to a truthy value to cause Appium to re-require extensions when new sessions are created. This feature is mostly useful for [building extensions](../../developing/build-drivers.md).|
|`APPIUM_TMP_DIR`|Set the path to the directory used for temporary files. Same as the `--tmp` command line argument.|

Appium drivers and plugins may define additional environment variables. The following variables are
used by official plugins:

|<div style="width:13em">Variable</div>|Plugin|Description|
|--------|-----------|-----------|
|`APPIUM_STORAGE_KEEP_ALL`|`storage`|Set this to `1`, `true` or `yes` to preserve files in the storage after the server process is terminated. By default, stopping the server process also deletes all files in the storage.|
|`APPIUM_STORAGE_ROOT`|`storage`|Set the path to the directory used for storage. If set to an existing folder, all files in it will be retained after terminating the server, unless specified otherwise using `APPIUM_STORAGE_KEEP_ALL`.|


--- SOURCE: en/reference/api/appium.md ---

---
title: Appium Protocol
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

The following is a list of endpoints supported in Appium, that are defined in the Appium extension
of the W3C WebDriver protocol.

### getAppiumSessions

```
GET /appium/sessions
```

Retrieves information about all active server sessions.

!!! info

    The `session_discovery` [insecure feature](../../guides/security.md) must be enabled to use this endpoint.

#### Response

`TimestampedMultiSessionData[]` - an array of session data objects. Each object has the following properties:

|Name|Description|Type|
|--|--|--|
|`capabilities`|Session capabilities|object|
|`created`|Session creation time (in milliseconds) as a Unix timestamp|number|
|`id`|Session ID|string|

### getAppiumSessionCapabilities

```
GET /session/:sessionId/appium/capabilities
```

Retrieves the [session capabilities](../../guides/caps.md).

#### Response

`SessionCapabilities` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`capabilities`|Session capabilities|object|

### getSettings

```
GET /session/:sessionId/appium/settings
```

Retrieves the [current session settings](../../guides/settings.md).

#### Response

`Settings` - an object containing setting names and their values

### updateSettings

```
POST /session/:sessionId/appium/settings
```

Updates the specified session settings. Any other previously set settings will remain unchanged.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`settings`|Object containing the names and values of the settings to be updated|object|

#### Response

`null`

### listCommands

```
GET /session/:sessionId/appium/commands
```

Retrieves the URL endpoints and WebDriver BiDi commands supported in the current session.

#### Response

`ListCommandsResponse` - an object containing all supported endpoints and BiDi commands, grouped by
their origin (base Appium, driver-specific, or plugin-specific). Refer to [the type definition file](https://github.com/appium/appium/blob/master/packages/types/lib/command.ts)
for a detailed structure of this object.

### listExtensions

```
GET /session/:sessionId/appium/extensions
```

Retrieves the [execute methods](../../guides/execute-methods.md) supported in the current session.

#### Response

`ListExtensionsResponse` - an object containing all supported execute methods, grouped by their
origin (driver-specific or plugin-specific). Refer to [the type definition file](https://github.com/appium/appium/blob/master/packages/types/lib/command.ts)
for a detailed structure of this object.

### getLogEvents

```
POST /session/:sessionId/appium/events
```

Retrieves events that have occurred in the current session. By default, only driver command
executions are recorded in the log, but drivers or plugins may define additional event types.
Clients can log events by using the [`logCustomEvent`](#logcustomevent) endpoint.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`type?`|One or more types to filter the returned events|string or array<string>|

#### Response

`EventHistory` - an object whose keys correspond to the types of logged events. Event types can be
grouped into three categories, as shown by the following example response:

```json
{
  "commands": [
    { "cmd": "getStatus", "startTime": 1756887645447, "endTime": 1756887645454 }
  ],
  "driverevent": [1756887645454],
  "namespace:event": [1756887645454]
}
```

* The `commands` key is always included in the endpoint response. Its value is an array of objects,
  where each object includes 3 parameters:
    * `cmd`: name of the executed command
    * `startTime`: the command execution start time (in milliseconds), as a Unix timestamp
    * `endTime`: the command execution end time (in milliseconds), as a Unix timestamp
* Other non-namespaced keys are specific to driver/plugin implementations. Their value is an array
  of event times (in milliseconds), as Unix timestamps.
* Namespaced keys can be added using the `logCustomEvent` endpoint, but may also be provided by
  drivers/plugins. Their value is an array of event times (in milliseconds), as Unix timestamps.

### logCustomEvent

```
POST /session/:sessionId/appium/log_event
```

Logs a custom event, which can be retrieved using the [`getLogEvents`](#getlogevents) endpoint.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`vendor`|Name of the namespace (vendor) used to prefix the event|string|
|`event`|Name of the event|string|

#### Response

`null`

### getDeviceTime

```
POST /session/:sessionId/appium/device/system_time
```

Retrieves the current system time of the device under test.

#### Parameters

|Name|Description|Type|Default|
|--|--|--|--|
|`format?`|Format to use for the returned timestamp|string|`YYYY-MM-DDTHH:mm:ssZ`|

#### Response

`string` - the device time

### activateApp

```
POST /session/:sessionId/appium/device/activate_app
```

Activates an app on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appId` or `bundleId`|App identifier such as Android app package or iOS bundle ID|string|
|`options?`|Driver-specific launch options|unknown|

#### Response

`void`

### terminateApp

```
POST /session/:sessionId/appium/device/terminate_app
```

Terminates an app on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appId` or `bundleId`|App identifier such as Android app package or iOS bundle ID|string|
|`options?`|Driver-specific termination options|unknown|

#### Response

`void`

### queryAppState

```
POST /session/:sessionId/appium/device/app_state
```

Retrieves the state of an app on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appId` or `bundleId`|App identifier such as Android app package or iOS bundle ID|string|

#### Response

`number` - an integer value indicating the app state:

|Number|App State|
|--|--|
|`0`|Not installed|
|`1`|Not running|
|`2`|Running in background suspended|
|`3`|Running in background|
|`4`|Running in foreground|

### installApp

```
POST /session/:sessionId/appium/device/install_app
```

Installs an app on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appPath`|Absolute local filepath or URL to an app file|string|
|`options?`|Driver-specific install options|unknown|

#### Response

`void`

### removeApp

```
POST /session/:sessionId/appium/device/remove_app
```

Uninstalls an app from the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appId` or `bundleId`|App identifier such as Android app package or iOS bundle ID|string|
|`options?`|Driver-specific uninstall options|unknown|

#### Response

`boolean` - `true` if uninstall was successful, otherwise `false`

### isAppInstalled

```
POST /session/:sessionId/appium/device/app_installed
```

Determines if an app is installed on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`appId` or `bundleId`|App identifier such as Android app package or iOS bundle ID|string|

#### Response

`boolean` - `true` if app is installed, otherwise `false`

### hideKeyboard

```
POST /session/:sessionId/appium/device/hide_keyboard
```

Attempts to hide the virtual keyboard on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`key?`|Text of a key to use to hide the keyboard|string|
|`keyCode?`|Key code to trigger to hide the keyboard|string|
|`keyName?`|Name of a key to use to hide the keyboard|string|
|`strategy?`|Driver-specific name of a hiding strategy to follow|string|

#### Response

`boolean` - `true` if the operation was successful, otherwise `false`. Note that some platforms
may never return a `false` value.

### isKeyboardShown

```
GET /session/:sessionId/appium/device/is_keyboard_shown
```

Determines if the virtual keyboard is shown on the device under test.

#### Response

`boolean` - `true` if the keyboard is shown, otherwise `false`

### pushFile

```
POST /session/:sessionId/appium/device/push_file
```

Pushes data to a file on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`data`|Base64-encoded data to be written to the file|string|
|`path`|Remote path on the device to create the file at|string|

#### Response

`void`

### pullFile

```
POST /session/:sessionId/appium/device/pull_file
```

Retrieves data from a file on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`path`|Remote path of the file on the device|string|

#### Response

`string` - the Base64-encoded contents of the file

### pullFolder

```
POST /session/:sessionId/appium/device/pull_folder
```

Retrieves data from a directory on the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`path`|Remote path of the directory on the device|string|

#### Response

`string` - the Base64-encoded zip file of the directory contents


--- SOURCE: en/reference/api/bidi.md ---

---
title: WebDriver BiDi Protocol
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

The following is a list of [W3C WebDriver BiDi protocol](https://w3c.github.io/webdriver-bidi/)
commands supported in Appium.

Unlike other protocols that specify URL endpoints, the WebDriver BiDi protocol specifies commands
sent as a websocket event, that both drivers and clients can emit or listen to.

### bidiStatus

```
session.status
```

> WebDriver BiDi documentation: [session.status](https://w3c.github.io/webdriver-bidi/#command-session-status)

Retrieves the current status of the Appium server.

#### Response

[`GetStatusResult`](./webdriver.md#response_2)

### bidiSubscribe

```
session.subscribe
```

> WebDriver BiDi documentation: [session.subscribe](https://w3c.github.io/webdriver-bidi/#command-session-subscribe)

Subscribes to one or more BiDi events.

#### Parameters

|Name|Description|Type|Default|
|--|--|--|--|
|`contexts?`|Contexts in which to subscribe to the specified events. By default, the global context scope is applied.|string[]|`['']`|
|`events`|Names of events to subscribe to|string[]||

#### Response

`null`

### bidiUnsubscribe

```
session.unsubscribe
```

> WebDriver BiDi documentation: [session.unsubscribe](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe)

Unsubscribes from one or more BiDi events.

#### Parameters

|Name|Description|Type|Default|
|--|--|--|--|
|`contexts?`|Contexts in which to unsubscribe from the specified events. By default, the global scope is applied.|string[]|`['']`|
|`events`|Names of events to unsubscribe from|string[]||

#### Response

`null`


--- SOURCE: en/reference/api/webdriver.md ---

---
title: WebDriver Protocol
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

The following is a list of [W3C WebDriver protocol](https://w3c.github.io/webdriver/) endpoints
supported in Appium.

!!! info

    Most WebDriver endpoints are not implemented within Appium itself, and are instead proxied
    directly to the driver, which is responsible for the actual endpoint implementation.

### createSession

```
POST /session
```

> WebDriver documentation: [New Session](https://w3c.github.io/webdriver/#new-session)

Creates a new WebDriver session.

Appium implements a modified version of this endpoint for historical reasons. While the W3C
endpoint only accepts 1 parameter, Appium's implementation allows up to 3 parameters, as this was
required by the legacy JSON Wire Protocol (JSONWP). Since Appium 2, the JSONWP format is no longer
supported, and any of the 3 parameters can be used to specify the W3C capabilities.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`w3cCapabilities1?`|Capabilities of the new session|`W3CDriverCaps`|
|`w3cCapabilities2?`|Another location for the new session capabilities (legacy)|`W3CDriverCaps`|
|`w3cCapabilities?`|Another location for the new session capabilities (legacy)|`W3CDriverCaps`|

#### Response

`CreateResult` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`sessionId`|ID of the new session|string|
|`capabilities`|Capabilities processed by the driver|object|

### deleteSession

```
DELETE /session/:sessionId
```

> WebDriver documentation: [Delete Session](https://w3c.github.io/webdriver/#delete-session)

Closes the current session.

#### Response

`null`

### getStatus

```
GET /status
```

> WebDriver documentation: [Status](https://w3c.github.io/webdriver/#status)

Retrieves the current status of the Appium server.

#### Response

`GetStatusResult` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`build`|Implementation-specific information. For Appium, this is an object containing the `version` key, whose value matches the Appium server version.|`{version}`|
|`message`|Explanation of the `ready` value|string|
|`ready`|Whether the server is able to create new sessions|boolean|

### getTimeouts

```
GET /session/:sessionId/timeouts
```

> WebDriver documentation: [Get Timeouts](https://w3c.github.io/webdriver/#get-timeouts)

Retrieves the timeout values of the current session.

#### Response

`GetTimeoutsResult` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`command`|Command timeout|number|
|`implicit`|Implicit wait timeout|number|

### timeouts

```
POST /session/:sessionId/timeouts
```

> WebDriver documentation: [Set Timeouts](https://w3c.github.io/webdriver/#set-timeouts)

Sets the timeout values of the current session.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`implicit?`|Implicit wait timeout (in milliseconds)|number|
|`pageLoad?`|Page load timeout (in milliseconds)|number|
|`script?`|Script timeout (in milliseconds)|number|

#### Response

`null`

### setUrl

```
POST /session/:sessionId/url
```

> WebDriver documentation: [Navigate To](https://w3c.github.io/webdriver/#navigate-to)

Navigates the current top-level browsing context to the specified URL.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`url`|URL to navigate to|string|

#### Response

`null`

### getUrl

```
GET /session/:sessionId/url
```

> WebDriver documentation: [Get Current URL](https://w3c.github.io/webdriver/#get-current-url)

Retrieves the URL of the current top-level browsing context.

#### Response

`string` - the current URL

### back

```
POST /session/:sessionId/back
```

> WebDriver documentation: [Back](https://w3c.github.io/webdriver/#back)

Navigates backwards in the browser history, if possible.

#### Response

`null`

### forward

```
POST /session/:sessionId/forward
```

> WebDriver documentation: [Forward](https://w3c.github.io/webdriver/#forward)

Navigates forwards in the browser history, if possible.

#### Response

`null`

### refresh

```
POST /session/:sessionId/refresh
```

> WebDriver documentation: [Refresh](https://w3c.github.io/webdriver/#refresh)

Reloads the window of the current top-level browsing context.

#### Response

`null`

### title

```
GET /session/:sessionId/title
```

> WebDriver documentation: [Get Title](https://w3c.github.io/webdriver/#get-title)

Retrieves the window title of the top-level browsing context.

#### Response

`string` - the page title

### getWindowHandle

```
GET /session/:sessionId/window
```

> WebDriver documentation: [Get Window Handle](https://w3c.github.io/webdriver/#get-window-handle)

Retrieves the window handle of the top-level browsing context.

#### Response

`string` - the window handle identifier

### closeWindow

```
DELETE /session/:sessionId/window
```

> WebDriver documentation: [Close Window](https://w3c.github.io/webdriver/#close-window)

Closes the current top-level browsing context.

#### Response

`string[]` - an array of zero or more remaining window handle identifiers

### setWindow

```
POST /session/:sessionId/window
```

> WebDriver documentation: [Switch To Window](https://w3c.github.io/webdriver/#switch-to-window)

Selects the top-level browsing context.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`handle`|Identifier for the window to switch to|string|

#### Response

`null`

### getWindowHandles

```
GET /session/:sessionId/window/handles
```

> WebDriver documentation: [Get Window Handles](https://w3c.github.io/webdriver/#get-window-handles)

Retrieves a list of window handles for every top-level browsing context.

#### Response

`string[]` - an array of zero or more window handle identifiers

### createNewWindow

```
POST /session/:sessionId/window/new
```

> WebDriver documentation: [New Window](https://w3c.github.io/webdriver/#new-window)

Creates a new window or tab.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`type`|Type of window to create (`window` or `tab`)|string|

#### Response

`NewWindow` -  an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`handle`|ID of the created window handle|string|
|`type`|Type of the created window (`window` or `tab`)|string|


### setFrame

```
POST /session/:sessionId/frame
```

> WebDriver documentation: [Switch To Frame](https://w3c.github.io/webdriver/#switch-to-frame)

Selects the top-level or child browsing context as the current browsing context.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`id`|Identifier for the frame|null, number, or [`Element`](#response_23)|

#### Response

`null`

### switchToParentFrame

```
POST /session/:sessionId/frame/parent
```

> WebDriver documentation: [Switch To Parent Frame](https://w3c.github.io/webdriver/#switch-to-parent-frame)

Sets the current browsing context to the parent of the current browsing context.

#### Response

`null`

### getWindowRect

```
GET /session/:sessionId/window/rect
```

> WebDriver documentation: [Get Window Rect](https://w3c.github.io/webdriver/#get-window-rect)

Retrieves the size and position of the current window.

#### Response

`Rect` -  an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`height`|Window height|number|
|`width`|Window width|number|
|`x`|X-axis position of the top-left corner of the window|number|
|`y`|Y-axis position of the top-left corner of the window|number|

### setWindowRect

```
POST /session/:sessionId/window/rect
```

> WebDriver documentation: [Set Window Rect](https://w3c.github.io/webdriver/#set-window-rect)

Sets the size and/or position of the current window.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`height?`|Window height|number|
|`width?`|Window width|number|
|`x?`|X-axis position of the top-left corner of the window|number|
|`y?`|Y-axis position of the top-left corner of the window|number|

#### Response

[`Rect`](#response_18) - the new window size

### maximizeWindow

```
POST /session/:sessionId/window/maximize
```

> WebDriver documentation: [Maximize Window](https://w3c.github.io/webdriver/#maximize-window)

Maximizes the current window.

#### Response

[`Rect`](#response_18) - the new window size

### minimizeWindow

```
POST /session/:sessionId/window/minimize
```

> WebDriver documentation: [Minimize Window](https://w3c.github.io/webdriver/#minimize-window)

Minimizes the current window.

#### Response

[`Rect`](#response_18) - the new window size

### fullScreenWindow

```
POST /session/:sessionId/window/fullscreen
```

> WebDriver documentation: [Fullscreen Window](https://w3c.github.io/webdriver/#fullscreen-window)

Makes the current window fullscreen.

#### Response

[`Rect`](#response_18) - the new window size

### active

```
GET /session/:sessionId/element/active
```

> WebDriver documentation: [Get Active Element](https://w3c.github.io/webdriver/#get-active-element)

Retrieves the currently focused element.

#### Response

`Element` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`element-6066-11e4-a52e-4f735466cecf`|Element ID|string|
|`ELEMENT`|Element ID (same value as `element-6066-11e4-a52e-4f735466cecf`). This key was used in the legacy Mobile JSON Wire Protocol (MJSONWP).|string|

### elementShadowRoot

```
GET /session/:sessionId/element/:elementId/shadow
```

> WebDriver documentation: [Get Shadow Root](https://w3c.github.io/webdriver/#get-shadow-root)

Retrieves the shadow root of the element identified by `:elementId`.

#### Response

`ShadowElement` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`shadow-6066-11e4-a52e-4f735466cecf`|Shadow root ID|string|

### findElement

```
POST /session/:sessionId/element
```

> WebDriver documentation: [Find Element](https://w3c.github.io/webdriver/#find-element)

Finds the first element in the current browsing context that matches the provided selector and
location strategy, starting from the root node.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

[`Element`](#response_23)

### findElements

```
POST /session/:sessionId/elements
```

> WebDriver documentation: [Find Elements](https://w3c.github.io/webdriver/#find-elements)

Finds all elements in the current browsing context that match the provided selector and location
strategy, starting from the root node.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

`Element[]` - an array containing zero or more [`Element` objects](#response_23)

### findElementFromElement

```
POST /session/:sessionId/element/:elementId/element
```

> WebDriver documentation: [Find Element From Element](https://w3c.github.io/webdriver/#find-element-from-element)

Finds the first element in the current browsing context that matches the provided selector and
location strategy, starting from the element node identified by `:elementId`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

[`Element`](#response_23)

### findElementsFromElement

```
POST /session/:sessionId/element/:elementId/elements
```

> WebDriver documentation: [Find Elements From Element](https://w3c.github.io/webdriver/#find-elements-from-element)

Finds all elements in the current browsing context that match the provided selector and location
strategy, starting from the element node identified by `:elementId`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

[`Element[]`](#response_26)

### findElementFromShadowRoot

```
POST /session/:sessionId/shadow/:shadowId/element
```

> WebDriver documentation: [Find Element From Shadow Root](https://w3c.github.io/webdriver/#find-element-from-shadow-root)

Finds the first element in the current browsing context that matches the provided selector and
location strategy, starting from the shadow root node identified by `:shadowId`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

[`Element`](#response_23)

### findElementsFromShadowRoot

```
POST /session/:sessionId/shadow/:shadowId/elements
```

> WebDriver documentation: [Find Elements From Shadow Root](https://w3c.github.io/webdriver/#find-elements-from-shadow-root)

Finds all elements in the current browsing context that match the provided selector and location
strategy, starting from the shadow root node identified by `:shadowId`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`using`|Location strategy to use when searching|string|
|`value`|Selector used to find the element|string|

#### Response

[`Element[]`](#response_26)

### elementSelected

```
GET /session/:sessionId/element/:elementId/selected
```

> WebDriver documentation: [Is Element Selected](https://w3c.github.io/webdriver/#is-element-selected)

Determines if the element identified by `:elementId` is currently selected. This property is only
relevant to certain element types, such as checkboxes, radio buttons, or options.

#### Response

`boolean` - `true` if the element is selected, otherwise `false`

### elementDisplayed

```
GET /session/:sessionId/element/:elementId/displayed
```

> WebDriver documentation: [Element Displayedness](https://w3c.github.io/webdriver/#element-displayedness)

Determines if the element identified by `:elementId` is currently displayed.

#### Response

`boolean` - `true` if the element is displayed, otherwise `false`

### getAttribute

```
GET /session/:sessionId/element/:elementId/attribute/:name
```

> WebDriver documentation: [Get Element Attribute](https://w3c.github.io/webdriver/#get-element-attribute)

Retrieves the value of the `:name` attribute for the element identified by `:elementId`.

#### Response

`string` - the attribute value, or `null` if the attribute does not exist

### getProperty

```
GET /session/:sessionId/element/:elementId/property/:name
```

> WebDriver documentation: [Get Element Property](https://w3c.github.io/webdriver/#get-element-property)

Retrieves the value of the `:name` property for the element identified by `:elementId`.

#### Response

`string` - the property value, or `null` if the property does not exist

### getCssProperty

```
GET /session/:sessionId/element/:elementId/css/:propertyName
```

> WebDriver documentation: [Get Element CSS Value](https://w3c.github.io/webdriver/#get-element-css-value)

Retrieves the value of the `:propertyName` computed CSS property for the element identified by
`:elementId`.

#### Response

`string` - the CSS property value, or `null` if the property does not exist

### getText

```
GET /session/:sessionId/element/:elementId/text
```

> WebDriver documentation: [Get Element Text](https://w3c.github.io/webdriver/#get-element-text)

Retrieves the text of the element identified by `:elementId`, as well as the text of its child
elements (if any).

#### Response

`string` - the element text (including its child elements)

### getName

```
GET /session/:sessionId/element/:elementId/name
```

> WebDriver documentation: [Get Element Tag Name](https://w3c.github.io/webdriver/#get-element-tag-name)

Retrieves the tag name of the element identified by `:elementId`.

#### Response

`string` - the element tag name

### getElementRect

```
GET /session/:sessionId/element/:elementId/rect
```

> WebDriver documentation: [Get Element Rect](https://w3c.github.io/webdriver/#get-element-rect)

Retrieves the dimensions and coordinates of the element identified by `:elementId`.

#### Response

[`Rect`](#response_18)

### elementEnabled

```
GET /session/:sessionId/element/:elementId/enabled
```

> WebDriver documentation: [Is Element Enabled](https://w3c.github.io/webdriver/#is-element-enabled)

Determines if the element identified by `:elementId` is currently enabled. This property is only
relevant to certain element types, such as buttons, input fields, checkboxes, etc.

#### Response

`boolean` - `true` if the element is enabled, otherwise `false`

### getComputedRole

```
GET /session/:sessionId/element/:elementId/computedrole
```

> WebDriver documentation: [Get Computed Role](https://w3c.github.io/webdriver/#get-computed-role)

Retrieves the computed [WAI-ARIA](https://w3c.github.io/aria/#introroles) role of the element
identified by `:elementId`.

#### Response

`string` - the element computed role

### getComputedLabel

```
GET /session/:sessionId/element/:elementId/computedlabel
```

> WebDriver documentation: [Get Computed Label](https://w3c.github.io/webdriver/#get-computed-label)

Retrieves the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name) of the
element identified by `:elementId`.

#### Response

`string` - the element accessible name

### click

```
POST /session/:sessionId/element/:elementId/click
```

> WebDriver documentation: [Element Click](https://w3c.github.io/webdriver/#element-click)

Clicks on the identified by `:elementId`.

#### Response

`null`

### clear

```
POST /session/:sessionId/element/:elementId/clear
```

> WebDriver documentation: [Element Clear](https://w3c.github.io/webdriver/#element-clear)

Clears the identified by `:elementId`. This functionality is only relevant to certain element types,
such as input fields.

#### Response

`null`

### setValue

```
POST /session/:sessionId/element/:elementId/value
```

> WebDriver documentation: [Element Send Keys](https://w3c.github.io/webdriver/#element-send-keys)

Sends keys to the element the identified by `:elementId`. This functionality is only relevant to
keyboard-interactable element types, such as input fields.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`text`|Text to send|string|

#### Response

`null`

### getPageSource

```
GET /session/:sessionId/source
```

> WebDriver documentation: [Get Page Source](https://w3c.github.io/webdriver/#get-page-source)

Retrieves the page/application source of the current browsing context in HTML/XML format.

#### Response

`string` - the DOM of the current browsing context

### execute

```
POST /session/:sessionId/execute/sync
```

> WebDriver documentation: [Execute Script](https://w3c.github.io/webdriver/#execute-script)

Executes synchronous JavaScript code in the current browsing context.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`script`|Script function to execute|string|
|`args`|Arguments passed to the script|array|

#### Response

`any` - the result of the script execution

### executeAsync

```
POST /session/:sessionId/execute/async
```

> WebDriver documentation: [Execute Async Script](https://w3c.github.io/webdriver/#execute-async-script)

Executes asynchronous JavaScript code in the current browsing context.

The `script` function is provided an additional argument (applied after `args`), which is a
function that can be invoked (within `script`) to trigger script completion. The first argument
passed to this completion function is returned as the endpoint response.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`script`|Script function to execute|string|
|`args`|Arguments for the script|array|

#### Response

`any` - the result returned by the completion function of the script

### getCookies

```
GET /session/:sessionId/cookie
```

> WebDriver documentation: [Get Cookies](https://w3c.github.io/webdriver/#get-cookies)

Retrieves all cookies of the current browsing context.

#### Response

`Cookie[]` - an array containing zero or more [`Cookie` objects](#response_49)

### getCookie

```
GET /session/:sessionId/cookie/:name
```

> WebDriver documentation: [Get Named Cookie](https://w3c.github.io/webdriver/#get-named-cookie)

Retrieves a cookie with the name identified by `:name` from the current browsing context.

#### Response

`Cookie` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`domain?`|Cookie domain|string|
|`expiry?`|Cookie expiration time (in seconds) as a Unix timestamp|number|
|`httpOnly?`|Whether the cookie is an HTTP only cookie|boolean|
|`name`|Cookie name|string|
|`path?`|Cookie path|string|
|`sameSite?`|SameSite policy type of the cookie (either `Lax` or `Strict`)|string|
|`secure?`|Whether the cookie is a secure cookie|boolean|
|`value`|Cookie value|string|

### setCookie

```
POST /session/:sessionId/cookie
```

> WebDriver documentation: [Add Cookie](https://w3c.github.io/webdriver/#add-cookie)

Adds a cookie to the cookie store of the current browsing context.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`cookie`|Cookie object to add|[`Cookie`](#response_49)|

#### Response

`null`

### deleteCookie

```
DELETE /session/:sessionId/cookie/:name
```

> WebDriver documentation: [Delete Cookie](https://w3c.github.io/webdriver/#delete-cookie)

Deletes a cookie with the name identified by `:name` from the current browsing context.

#### Response

`null`

### deleteCookies

```
DELETE /session/:sessionId/cookie
```

> WebDriver documentation: [Delete All Cookies](https://w3c.github.io/webdriver/#delete-all-cookies)

Deletes all cookies from the current browsing context.

#### Response

`null`

### performActions

```
POST /session/:sessionId/actions
```

> WebDriver documentation: [Perform Actions](https://w3c.github.io/webdriver/#perform-actions)

Performs a sequence of [actions](https://w3c.github.io/webdriver/#actions).

#### Parameters

|Name|Description|Type|
|--|--|--|
|`actions`|Array of action objects|`ActionSequence[]`|

#### Response

`null`

### releaseActions

```
DELETE /session/:sessionId/actions
```

> WebDriver documentation: [Release Actions](https://w3c.github.io/webdriver/#release-actions)

Releases all currently depressed keys and pointer buttons.

#### Response

`null`

### postDismissAlert

```
POST /session/:sessionId/alert/dismiss
```

> WebDriver documentation: [Dismiss Alert](https://w3c.github.io/webdriver/#dismiss-alert)

Dismisses the currently displayed user prompt.

#### Response

`null`

### postAcceptAlert

```
POST /session/:sessionId/alert/accept
```

> WebDriver documentation: [Accept Alert](https://w3c.github.io/webdriver/#accept-alert)

Accepts the currently displayed user prompt.

#### Response

`null`

### getAlertText

```
GET /session/:sessionId/alert/text
```

> WebDriver documentation: [Get Alert Text](https://w3c.github.io/webdriver/#get-alert-text)

Retrieves the text of the currently displayed user prompt.

#### Response

`string` - prompt text

### setAlertText

```
POST /session/:sessionId/alert/text
```

> WebDriver documentation: [Send Alert Text](https://w3c.github.io/webdriver/#send-alert-text)

Sets the text of the currently displayed user prompt.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`text`|Text to set|string|

#### Response

`null`

### getScreenshot

```
GET /session/:sessionId/screenshot
```

> WebDriver documentation: [Take Screenshot](https://w3c.github.io/webdriver/#take-screenshot)

Takes a screenshot of the current browsing context.

#### Response

`string` - a base64-encoded PNG image

### getElementScreenshot

```
GET /session/:sessionId/element/:elementId/screenshot
```

> WebDriver documentation: [Take Element Screenshot](https://w3c.github.io/webdriver/#take-element-screenshot)

Takes a screenshot of the visible region encompassed by the bounding rectangle of the element
identified by `:elementId`.

#### Response

`string` - a base64-encoded PNG image

### printPage

```
POST /session/:sessionId/print
```

> WebDriver documentation: [Print Page](https://w3c.github.io/webdriver/#print-page)

Prints the page by rendering it as a paginated PDF document.

#### Parameters

|<div style="width:7em">Name</div>|Description|<div style="width:9em">Type</div>|Default|
|--|--|--|--|
|`orientation?`|Page orientation. Supported values are `portrait` or `landscape`.|string|`portrait`|
|`scale?`|Page scale. Supported values are in the range `[0.1, 2]`.|number|`1`|
|`background?`|Whether to include background images|boolean|`false`|
|`page?`|Object specifying the page width and height|[`PrintPageSize`](#printpagesize)|`{}`|
|`margin?`|Object specifying the page margins|[`PrintPageMargins`](#printpagemargins)|`{}`|
|`shrinkToFit?`|Whether to resize page contents to match `PrintPageSize.width`|boolean|`true`|
|`pageRanges?`|Array of pages to be printed, for example, `[1, 4, '8-9']`|array|`[]`|

##### `PrintPageSize`

|Name|Description|Type|Default|
|--|--|--|--|
|`width?`|Page width. Must be greater than or equal to `(2.54 / 72)`.|number|`21.59`|
|`height?`|Page height. Must be greater than or equal to `(2.54 / 72)`.|number|`27.94`|

##### `PrintPageMargins`

|Name|Description|Type|Default|
|--|--|--|--|
|`top?`|Page top margin. Must be greater than or equal to `0`.|number|`1`|
|`bottom?`|Page bottom margin. Must be greater than or equal to `0`.|number|`1`|
|`left?`|Page left margin. Must be greater than or equal to `0`.|number|`1`|
|`right?`|Page right margin. Must be greater than or equal to `0`.|number|`1`|

#### Response

`string` - a base64-encoded PDF document


--- SOURCE: en/reference/api/others.md ---

---
title: Other Protocols
---
<style>
  ul[data-md-component="toc"] .md-nav .md-nav {
    display: none;
  }
</style>

The following is a list of endpoints supported in Appium that are defined in other protocols.

## Chromedriver Protocol

The Chromedriver protocol is an extension of the W3C WebDriver protocol, supported in Appium
clients using Chromedriver. It specifies both its own extension commands, as well as
vendor-agnostic commands.

!!! warning

    Endpoints specified by this protocol are not officially documented.

### executeCdp

```
POST /session/:sessionId/:vendor/cdp/execute
```

Executes a Chrome DevTools Protocol (CDP) method, using the implementation of the vendor identified
by `:vendor`. Refer to [the CDP documentation](https://chromedevtools.github.io/devtools-protocol/)
for a list of available methods and their parameters.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`cmd`|Name of the CDP method to execute|string|
|`params`|Parameters passed to the CDP method|object|

#### Response

`any` - the result of executing the CDP method

## Compute Pressure Protocol

The [Compute Pressure protocol](https://www.w3.org/TR/compute-pressure/) is an extension of the W3C
WebDriver protocol.

### createVirtualPressureSource

```
POST /session/:sessionId/pressuresource
```

> Compute Pressure documentation: [Create Virtual Pressure Source](https://www.w3.org/TR/compute-pressure/#create-virtual-pressure-source)

Creates a new virtual pressure source.

#### Parameters

|<div style="width:6em">Name</div>|Description|Type|Default|
|--|--|--|--|
|`type`|Type of pressure source to create|string||
|`supported?`|Whether the pressure source should be configured as supported|boolean|`true`|

#### Response

`null`

### updateVirtualPressureSource

```
POST /session/:sessionId/pressuresource/:pressureSourceType
```

> Compute Pressure documentation: [Update Virtual Pressure Source](https://www.w3.org/TR/compute-pressure/#update-virtual-pressure-source)

Updates the state of a virtual pressure source with the type identified by `:pressureSourceType`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`sample`|Pressure state. Supported values are `nominal`, `fair`, `serious`, or `critical`.|string|

#### Response

`null`

### deleteVirtualPressureSource

```
DELETE /session/:sessionId/pressuresource/:pressureSourceType
```

> Compute Pressure documentation: [Delete Virtual Pressure Source](https://www.w3.org/TR/compute-pressure/#delete-virtual-pressure-source)

Deletes the virtual pressure source with the type identified by `:pressureSourceType`.

#### Response

`null`

## Custom Handlers Protocol

The [Custom Handlers protocol](https://html.spec.whatwg.org/multipage/system-state.html#user-agent-automation)
is an extension of the W3C WebDriver protocol, defined by the HTML Standard specification.

### setRPHRegistrationMode

```
POST /session/:sessionId/custom-handlers/set-mode
```

> Custom Handlers documentation: [Set RPH Registration Mode](https://html.spec.whatwg.org/multipage/system-state.html#user-agent-automation)

Sets the protocol handler automation mode, for processing registrations of custom protocol handlers.
By default, this mode is set to `none`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`mode`|Automation mode to set. Supported values are `autoAccept`, `autoReject`, or `none`.|string|

#### Response

`null`

## Device Posture Protocol

The [Device Posture protocol](https://www.w3.org/TR/device-posture/) is an extension of the W3C
WebDriver protocol.

### setDevicePosture

```
POST /session/:sessionId/deviceposture
```

> Device Posture documentation: [Set Device Posture](https://www.w3.org/TR/device-posture/#set-device-posture)

Sets the device posture, overriding the posture set by the device hardware.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`posture`|Posture to which the device should be set. Supported values are `continuous` or `folded`.|string|

#### Response

`null`

### clearDevicePosture

```
DELETE /session/:sessionId/deviceposture
```

> Device Posture documentation: [Clear Device Posture](https://www.w3.org/TR/device-posture/#clear-device-posture)

Clears the previously set device posture, returning posture control back to the device hardware.

#### Response

`null`

## Federated Credential Management Protocol

The [Federated Credential Management protocol](https://www.w3.org/TR/fedcm-1) (FedCM) is an
extension of the W3C WebDriver protocol. Clients can enable this protocol by using the
[`fedcm:accounts`](https://www.w3.org/TR/fedcm-1/#webdriver-capability) capability.

### fedCMCancelDialog

```
POST /session/:sessionId/fedcm/canceldialog
```

> FedCM documentation: [Cancel Dialog](https://www.w3.org/TR/fedcm-1/#webdriver-canceldialog)

Cancels the currently open FedCM dialog.

#### Response

`null`

### fedCMSelectAccount

```
POST /session/:sessionId/fedcm/selectaccount
```

> FedCM documentation: [Select Account](https://www.w3.org/TR/fedcm-1/#webdriver-selectaccount)

Selects an account to use for the currently open FedCM dialog.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`accountIndex`|Index of the account in the list of available accounts|number|

#### Response

`null`

### fedCMClickDialogButton

```
POST /session/:sessionId/fedcm/clickdialogbutton
```

> FedCM documentation: [Click Dialog Button](https://www.w3.org/TR/fedcm-1/#webdriver-clickdialogbutton)

Clicks a button in the currently open FedCM dialog.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`dialogButton`|Identifier of the button to click. Must be set to `ConfirmIdpLoginContinue`.|string|

#### Response

`null`

### fedCMGetAccounts

```
GET /session/:sessionId/fedcm/accountlist
```

> FedCM documentation: [Account List](https://www.w3.org/TR/fedcm-1/#webdriver-accountlist)

Retrieves all accounts that the user can select in the currently open FedCM dialog.

#### Response

`FedCMAccount[]` - an array of objects, where each object includes the following properties:

|<div style="width:10em">Name</div>|Description|Type|
|--|--|--|
|`accountId`|Account ID|string|
|`email`|Account email|string|
|`name`|Account name|string|
|`givenName?`|Account given name|string|
|`pictureUrl?`|Account picture URL|string|
|`idpConfigUrl`|URL of the identity provider configuration file|string|
|`loginState`|Login state. Set to `SignUp` if the account is not connected, otherwise `SignIn`.|string|
|`termsOfServiceUrl?`|Terms of Service URL of the website, if `loginState` is set to `SignUp`|string|
|`privacyPolicyUrl?`|Privacy Policy URL of the website, if `loginState` is set to `SignUp`|string|

### fedCMGetTitle

```
GET /session/:sessionId/fedcm/gettitle
```

> FedCM documentation: [Get Title](https://www.w3.org/TR/fedcm-1/#webdriver-gettitle)

Retrieves the title and subtitle (if one exists) of the currently open FedCM dialog.

#### Response

`FedCMDialogTitle` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`title`|Dialog title|string|
|`subtitle?`|Dialog subtitle|string|

### fedCMGetDialogType

```
GET /session/:sessionId/fedcm/getdialogtype
```

> FedCM documentation: [Get Dialog Type](https://www.w3.org/TR/fedcm-1/#webdriver-getdialogtype)

Retrieves the type of the currently open FedCM dialog.

#### Response

`string` - can be set to `AutoReauthn`, `AccountChooser`, or `ConfirmIdpLogin`

### fedCMSetDelayEnabled

```
POST /session/:sessionId/fedcm/setdelayenabled
```

> FedCM documentation: [Set Delay Enabled](https://www.w3.org/TR/fedcm-1/#webdriver-setdelayenabled)

Sets the state of the promise rejection delay, which is used to prevent information leakage about
the logged in state of the user.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`enabled`|Whether to enable the promise rejection delay|boolean|

#### Response

`null`

### fedCMResetCooldown

```
POST /session/:sessionId/fedcm/resetcooldown
```

> FedCM documentation: [Reset Cooldown](https://www.w3.org/TR/fedcm-1/#webdriver-resetcooldown)

Resets the cooldown delay used after dismissing a FedCM dialog.

#### Response

`null`

## Generic Sensor Protocol

The [Generic Sensor protocol](https://www.w3.org/TR/generic-sensor/) is an extension of the W3C
WebDriver protocol.

### createVirtualSensor

```
POST /session/:sessionId/sensor
```

> Generic Sensor documentation: [Create Virtual Sensor](https://www.w3.org/TR/generic-sensor/#create-virtual-sensor-command)

Creates a new virtual sensor.

#### Parameters

|<div style="width:12em">Name</div>|Description|Type|Default|
|--|--|--|--|
|`type`|Type of sensor to create|string||
|`connected?`|Whether the sensor should be configured as connected|boolean|`true`|
|`maxSamplingFrequency?`|Maximum sensor sampling frequency|number||
|`minSamplingFrequency?`|Minimum sensor sampling frequency|number||

#### Response

`null`

### getVirtualSensorInfo

```
GET /session/:sessionId/sensor/:sensorType
```

> Generic Sensor documentation: [Get Virtual Sensor Information](https://www.w3.org/TR/generic-sensor/#get-virtual-sensor-information-command)

Retrieves information about the virtual sensor with the type identified by `:sensorType`.

#### Response

`GetVirtualSensorInfoResponse` - an object containing the `requestedSamplingFrequency` key, whose
value is the requested sampling frequency of the sensor type

### updateVirtualSensorReading

```
POST /session/:sessionId/sensor/:sensorType
```

> Generic Sensor documentation: [Update Virtual Sensor Reading](https://www.w3.org/TR/generic-sensor/#update-virtual-sensor-reading-command)

Updates the virtual sensor with the type identified by `:sensorType` with a new reading.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`reading`|Object containing reading properties specific to the sensor type|object|

#### Response

`null`

### deleteVirtualSensor

```
DELETE /session/:sessionId/sensor/:sensorType
```

> Generic Sensor documentation: [Delete Virtual Sensor](https://www.w3.org/TR/generic-sensor/#delete-virtual-sensor-command)

Deletes the virtual sensor with the type identified by `:sensorType`.

#### Response

`null`

## Permissions Protocol

The [Permissions protocol](https://www.w3.org/TR/permissions/) is an extension of the W3C WebDriver
protocol.

### setPermissions

```
POST /session/:sessionId/permissions
```

> Permissions documentation: [Set Permission](https://www.w3.org/TR/permissions/#webdriver-command-set-permission)

Simulates user modification of the permission state of a PermissionDescriptor (a permissible feature
with optional additional properties).

#### Parameters

|<div style="width:6em">Name</div>|Description|Type|
|--|--|--|
|`descriptor`|Object specifying the feature name in its `name` key, along with any other keys for additional properties|object|
|`state`|New permission state for this descriptor. Supported values are: `granted`, `denied`, or `prompt`.|string|

#### Response

`null`

## Reporting Protocol

The [Reporting protocol](https://www.w3.org/TR/reporting-1/) is an extension of the W3C WebDriver
protocol.

### generateTestReport

```
POST /session/:sessionId/reporting/generate_test_report
```

> Reporting documentation: [Generate Test Report](https://www.w3.org/TR/reporting-1/#generate-test-report-command)

Simulates the generation of a test report, which can be retrieved by registered reporting observers.

#### Parameters

|Name|Description|Type|Default|
|--|--|--|--|
|`message`|Message displayed in the report|string||
|`group?`|Destination group to deliver the report to|string|`default`|

#### Response

`null`

## Secure Payment Confirmation Protocol

The [Secure Payment Confirmation protocol](https://www.w3.org/TR/secure-payment-confirmation) (SPC)
is an extension of the W3C WebDriver protocol.

### setSPCTransactionMode

```
POST /session/:sessionId/secure-payment-confirmation/set-mode
```

> SPC documentation: [Set SPC Transaction Mode](https://www.w3.org/TR/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode)

Sets the transaction automation mode, for automated handling of transaction confirmation prompts.
By default, this mode is set to `none`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`mode`|Automation mode to set. Supported values are `autoAccept`, `autoChooseToAuthAnotherWay`, `autoReject`, or `autoOptOut`.|string|

#### Response

`null`

## Selenium Protocol

The Selenium protocol is an extension of the W3C WebDriver protocol, supported in Appium clients
based on Selenium.

!!! warning

    Endpoints specified by this protocol are not officially documented.

### getLog

```
POST /session/:sessionId/se/log
```

Retrieves the logs for a given log type. Supported log types depend on the driver, and can be
retrieved using the [`getLogTypes`](#getlogtypes) endpoint.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`type`|Type of log to retrieve|string|

#### Response

`GetLogEntry[]` - an array of log entries.

Typically a log entry is an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`level`|Level at which the message was logged|string|
|`message`|Contents of the actual log message|string|
|`timestamp`|Message timestamp (in milliseconds) in Unix format|number|

### getLogTypes

```
GET /session/:sessionId/se/log/types
```

Retrieves the available log types that can be used to call the [`getLog`](#getlog) endpoint.

#### Response

`string[]` - an array of log types

## Web Authentication Protocol

The [Web Authentication protocol](https://w3c.github.io/webauthn/) (WebAuthn) is an extension of
the W3C WebDriver protocol. Clients can enable this protocol by using the
[`webauthn:virtualAuthenticators`](https://w3c.github.io/webauthn/#sctn-automation-webdriver-capability)
capability.

### addVirtualAuthenticator

```
POST /session/:sessionId/webauthn/authenticator
```

> WebAuthn documentation: [Add Virtual Authenticator](https://w3c.github.io/webauthn/#add-virtual-authenticator)

Creates a software [virtual authenticator](https://w3c.github.io/webauthn/#virtual-authenticators).

#### Parameters

|<div style="width:11em">Name</div>|Description|Type|Default|
|--|--|--|--|
|`isUserConsenting?`|Whether to always grant user consent|boolean|true|
|`isUserVerified?`|Whether to always succeed in user verification. Ignored if `hasUserVerification` is set to `false`.|boolean|false|
|`hasResidentKey?`|Whether client-side discoverable credentials are supported|boolean|false|
|`hasUserVerification?`|Whether user verification is supported|boolean|false|
|`protocol`|Protocol of this authenticator. Supported values are: `ctap1/u2f`, `ctap2`, or `ctap2_1`.|string||
|`transport`|Type of transport used to communicate with clients. Supported values are: `ble`, `hybrid`, `internal`, `nfc`, `smart-card`, or `usb`.|string||

#### Response

`string` - the ID of the created authenticator

### removeVirtualAuthenticator

```
DELETE /session/:sessionId/webauthn/authenticator/:authenticatorId
```

> WebAuthn documentation: [Remove Virtual Authenticator](https://w3c.github.io/webauthn/#remove-virtual-authenticator)

Removes the virtual authenticator identified by `:authenticatorId`.

#### Response

`null`

### addAuthCredential

```
POST /session/:sessionId/webauthn/authenticator/:authenticatorId/credential
```

> WebAuthn documentation: [Add Credential](https://w3c.github.io/webauthn/#add-credential)

Injects a [Public Key Credential Source](https://w3c.github.io/webauthn/#public-key-credential-source)
into the virtual authenticator identified by `:authenticatorId`.

#### Parameters

|<div style="width:11em">Name</div>|Description|Type|
|--|--|--|
|`credentialId`|Credential ID, in Base64url encoding|string|
|`isResidentCredential`|Whether to create a client-side discoverable credential. If set to `false`, a server-side credential is created instead.|boolean|
|`privateKey`|Asymmetric key package containing a single private key, in Base64url encoding|string|
|`rpId`|Relying Party ID the credential is scoped to|string|
|`signCount?`|Initial value for the signature counter. Set to `0` if omitted.|number|
|`userHandle?`|User handle associated with the credential, in Base64url encoding. Set to `null` if omitted.|string|

#### Response

`null`

### getAuthCredential

```
GET /session/:sessionId/webauthn/authenticator/:authenticatorId/credentials
```

> WebAuthn documentation: [Get Credentials](https://w3c.github.io/webauthn/#get-credentials)

Retrieves all Public Key Credential Sources stored in the virtual authenticator identified by
`:authenticatorId`.

#### Response

`Credential[]` - an array of credential objects. Each object has the following properties:

|<div style="width:11em">Name</div>|Description|Type|Default|
|--|--|--|--|
|`credentialId`|Credential ID, in Base64url encoding|string||
|`isResidentCredential`|Whether the credential is client-side discoverable (`true`) or server-side (`false`)|boolean||
|`largeBlob`|Large, per-credential blog, in Base64url encoding|string|`null`|
|`privateKey`|Asymmetric key package containing a single private key, in Base64url encoding|string||
|`rpId`|Relying Party ID the credential is scoped to|string||
|`signCount`|Initial value for the signature counter|number|`0`|
|`userHandle`|User handle associated with the credential, in Base64url encoding|string|`null`|

### removeAuthCredential

```
DELETE /session/:sessionId/webauthn/authenticator/:authenticatorId/credentials/:credentialId
```

> WebAuthn documentation: [Remove Credential](https://w3c.github.io/webauthn/#remove-credential)

Removes the Public Key Credential Source identified by `:credentialId` from the virtual authenticator
identified by `:authenticatorId`.

#### Response

`null`

### removeAllAuthCredentials

```
DELETE /session/:sessionId/webauthn/authenticator/:authenticatorId/credentials
```

> WebAuthn documentation: [Remove All Credentials](https://w3c.github.io/webauthn/#remove-all-credentials)

Removes all Public Key Credential Sources from the virtual authenticator identified by
`:authenticatorId`.

#### Response

`null`

### setUserAuthVerified

```
POST /session/:sessionId/webauthn/authenticator/:authenticatorId/uv
```

> WebAuthn documentation: [Set User Verified](https://w3c.github.io/webauthn/#set-user-verified)

Sets the `isUserVerified` property of the virtual authenticator identified by `:authenticatorId`.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`isUserVerified`|Whether to always succeed in user verification|boolean|

#### Response

`null`


--- SOURCE: en/reference/api/mjsonwp.md ---

---
title: Mobile JSON Wire Protocol
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

The following is a list of legacy [Mobile JSON Wire Protocol (MJSONWP)](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)
endpoints supported in Appium.

### getRotation

```
GET /session/:sessionId/rotation
```

> MJSONWP documentation: [Device Rotation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation)

Retrieves the current spatial orientation of the device under test.

#### Response

`Rotation` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`x`|Degrees by which the device is rotated on its X axis|number|
|`y`|Degrees by which the device is rotated on its Y axis|number|
|`z`|Degrees by which the device is rotated on its Z axis|number|

### setRotation

```
POST /session/:sessionId/rotation
```

> MJSONWP documentation: [Device Rotation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation)

Sets the spatial orientation of the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`x`|Degrees by which the device is rotated on its X axis|number|
|`y`|Degrees by which the device is rotated on its Y axis|number|
|`z`|Degrees by which the device is rotated on its Z axis|number|

#### Response

`null`

### getCurrentContext

```
GET /session/:sessionId/context
```

> MJSONWP documentation: [Webviews and Other Contexts](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)

Retrieves the active application context.

#### Response

`string` - the name of the active context

### setContext

```
POST /session/:sessionId/context
```

> MJSONWP documentation: [Webviews and Other Contexts](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)

Sets an application context as the active context.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`name`|Name of the context to set as the active one|string|

#### Response

`null`

### getContexts

```
GET /session/:sessionId/contexts
```

> MJSONWP documentation: [Webviews and Other Contexts](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)

Retrieves all available application contexts.

#### Response

`string[]` - the names of available contexts

### getNetworkConnection

```
GET /session/:sessionId/network_connection
```

> MJSONWP documentation: [Device Modes](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)

Retrieves the current state of network types (data, Wi-Fi, airplane mode).

!!! warning "Deprecated"

    Please use driver-specific extension methods such as `mobile: getConnectivity`

#### Response

`NetworkConnectionState` - a number indicating the current network state:

|Value|Data|Wi-Fi|Airplane Mode|
|--|--|--|--|
|`0`|OFF|OFF|OFF|
|`1`|OFF|OFF|ON|
|`2`|OFF|ON|OFF|
|`4`|ON|OFF|OFF|
|`6`|ON|ON|OFF|

### setNetworkConnection

```
POST /session/:sessionId/network_connection
```

> MJSONWP documentation: [Device Modes](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)

Sets the state of network types (data, Wi-Fi, airplane mode).

!!! warning "Deprecated"

    Please use driver-specific extension methods such as `mobile: setConnectivity`

#### Parameters

|<div style="width:6em">Name</div>|Description|<div style="width:18em">Type</div>|
|--|--|--|
|`parameters`|Object containing the `type` key, whose value is the desired network state|`{"type": `[`NetworkConnectionState`](#response_5)`}`|

#### Response

[`NetworkConnectionState`](#response_5) - the new network state


--- SOURCE: en/reference/api/jsonwp.md ---

---
title: JSON Wire Protocol
---
<style>
  ul[data-md-component="toc"] .md-nav {
    display: none;
  }
</style>

The following is a list of legacy [JSON Wire Protocol (JSONWP)](https://www.selenium.dev/documentation/legacy/json_wire_protocol/)
endpoints supported in Appium.

### getSession

```
GET /session/:sessionId
```

> JSONWP documentation: [/session/:sessionId](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionid)

Retrieves the capabilities of the current session.

Appium implements a modified version of this endpoint. If the `appium:eventTimings` capability is
set to `true`, the returned result will additionally include the `events` key, whose value contains
the event history and timings.

!!! warning "Deprecated"

    For retrieving capabilities, please use [`getAppiumSessionCapabilities`](./appium.md#getappiumsessioncapabilities).<br />
    For retrieving event history, please use [`getLogEvents`](./appium.md#getlogevents).

#### Response

`Capabilities` - an object containing the session capabilities, and the event history (if applicable)

### availableIMEEngines

```
GET /session/:sessionId/ime/available_engines
```

> JSONWP documentation: [/session/:sessionId/ime/available_engines](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidimeavailable_engines)

Retrieves all IME (input method editor) engines available on the device under test.

!!! warning "Deprecated"

    In the future, this endpoint will be moved to the [UiAutomator2 and Espresso drivers](../../ecosystem/drivers.md)

#### Response

`string[]` - a list of available IME engines

### getActiveIMEEngine

```
GET /session/:sessionId/ime/active_engine
```

> JSONWP documentation: [/session/:sessionId/ime/active_engine](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidimeactive_engine)

Retrieves the name of the active IME engine.

!!! warning "Deprecated"

    In the future, this endpoint will be moved to the UiAutomator2 and Espresso drivers

#### Response

`string` - the name of the active IME engine

### isIMEActivated

```
GET /session/:sessionId/ime/activated
```

> JSONWP documentation: [/session/:sessionId/ime/activated](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidimeactivated)

Determines if IME input is available and active.

!!! warning "Deprecated"

    In the future, this endpoint will be moved to the UiAutomator2 and Espresso drivers

#### Response

`boolean` - `true` if IME is active, otherwise `false`

### deactivateIMEEngine

```
POST /session/:sessionId/ime/deactivate
```

> JSONWP documentation: [/session/:sessionId/ime/deactivate](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidimedeactivate)

Deactivates the currently active IME engine.

!!! warning "Deprecated"

    In the future, this endpoint will be moved to the UiAutomator2 and Espresso drivers

#### Response

`null`

### activateIMEEngine

```
POST /session/:sessionId/ime/activate
```

> JSONWP documentation: [/session/:sessionId/ime/activate](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidimeactivate)

Activates an IME engine.

!!! warning "Deprecated"

    In the future, this endpoint will be moved to the UiAutomator2 and Espresso drivers

#### Parameters

|Name|Description|Type|
|--|--|--|
|`engine`|Name of the IME engine to activate|string|

#### Response

`null`

### getOrientation

```
GET /session/:sessionId/orientation
```

> JSONWP documentation: [/session/:sessionId/orientation](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidorientation)

Retrieves the current orientation of the device under test.

#### Response

`string` - either `PORTRAIT` or `LANDSCAPE`

### setOrientation

```
POST /session/:sessionId/orientation
```

> JSONWP documentation: [/session/:sessionId/orientation](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidorientation)

Sets the orientation of the device under test.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`orientation`|New device orientation. Supported values are `PORTRAIT` or `LANDSCAPE`.|string|

#### Response

`null`

### getGeoLocation

```
GET /session/:sessionId/location
```

> JSONWP documentation: [/session/:sessionId/location](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidlocation)

Retrieves the current location of the device under test.

!!! warning "Deprecated"

    Please use driver-specific extension methods such as `mobile: getGeoLocation` or
    `mobile: getSimulatedLocation`

#### Response

`Location` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`altitude`|Altitude of the device location|number|
|`latitude`|Latitude of the device location|number|
|`longitude`|Longitude of the device location|number|

### setGeoLocation

```
POST /session/:sessionId/location
```

> JSONWP documentation: [/session/:sessionId/location](https://www.selenium.dev/documentation/legacy/json_wire_protocol/#sessionsessionidlocation)

Sets the current location of the device under test.

!!! warning "Deprecated"

    Please use driver-specific extension methods such as `mobile: setGeoLocation` or
    `mobile: setSimulatedLocation`

#### Parameters

|Name|Description|Type|
|--|--|--|
|`location`|New device latitude, longitude and altitude|[`Location`](#response_6)|

#### Response

`null`


--- SOURCE: en/reference/api/index.md ---

---
hide:
  - toc

title: API Endpoints
---

Here you can find various API endpoints exposed by the main Appium module through its base driver,
as well as the endpoints added or modified by official plugins.

Since all Appium drivers inherit the Appium base driver, they support all of its endpoints as well,
but may additionally define endpoints of their own. Refer to the documentation of your
[Appium driver](../../ecosystem/drivers.md) to learn about its specific endpoints.

The recommended way of calling these API endpoints is through your [Appium client](../../ecosystem/clients.md).
Refer to the documentation of your client for the exact commands used to invoke specific endpoints.

All endpoints are grouped by their protocol, with an additional group for plugin endpoints:

<div class="grid cards" markdown>

-   [__WebDriver Protocol__](./webdriver.md)
-   [__WebDriver BiDi Protocol__](./bidi.md)
-   [__JSON Wire Protocol__](./jsonwp.md)
-   [__Mobile JSON Wire Protocol__](./mjsonwp.md)
-   [__Appium Protocol__](./appium.md)
-   [__Other Protocols__](./others.md)
-   [__Endpoints Used by Official Plugins__](./plugins.md)

</div>


--- SOURCE: en/reference/api/plugins.md ---

---
title: Plugin Endpoints
---
<style>
  ul[data-md-component="toc"] .md-nav .md-nav {
    display: none;
  }
</style>

The following is a list of endpoints added or modified by official Appium plugins.

## Execute Driver Plugin

### executeDriverScript

```
POST /session/:sessionId/appium/execute_driver
```

Executes a driver script in a child process.

#### Parameters

|Name|Description|Type|Default|
|--|--|--|--|
|`script`|Script to be executed|string||
|`type?`|Name of the library executing the script|string|`webdriverio`|
|`timeout?`|Timeout (in milliseconds) for the script process|number|`3600000`|

#### Response

`RunScriptResult` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`result`|Result returned by the script|any|
|`logs`|Logs generated during script execution|object|

## Images Plugin

### compareImages

```
POST /session/:sessionId/appium/compare_images
```

Compares two images using the specified mode of comparison:

* `matchFeatures`: whether `firstImage` is a rotated, scaled, or otherwise modified version of `secondImage`
* `matchTemplate`: whether `firstImage` contains one or more occurrences of `secondImage`
* `getSimilarity`: calculate similarity score between two images of equal size

#### Parameters

|<div style="width:7em">Name</div>|Description|Type|Default|
|--|--|--|--|
|`mode`|Mode of comparison. Supported values are: `matchFeatures`, `getSimilarity`, or `matchTemplate`.|string||
|`firstImage`|Base64-encoded image file|string or Buffer||
|`secondImage`|Base64-encoded image file|string or Buffer||
|`options?`|Options specific to the `mode` value (see below)|object|`{}`|

**`options` for `mode=matchFeatures`**

|<div style="width:10em">Name</div>|Description|Type|<div style="width:6em">Default</div>|
|--|--|--|--|
|`detectorName?`|Name of the OpenCV feature detector to use. Supported values are: `AKAZE`, `AgastFeatureDetector`, `BRISK`, `FastFeatureDetector`, `GFTTDetector`, `KAZE`, `MSER`, or `ORB`.|string|`ORB`|
|`goodMatchesFactor?`|Maximum number of 'good' matches; or a function accepting current distance, min distance and max distance, and returning a boolean indicating whether the match should be included or not.|number or function||
|`matchFunc?`|Name of the OpenCV descriptor matcher to use. Supported values are: `FlannBased`, `BruteForce`, `BruteForce-L1`, `BruteForce-Hamming`, `BruteForce-HammingLUT`, or `BruteForce-SL2`.|string|`BruteForce`|
|`visualize?`|Whether to include an image of the matcher visualization in the response|boolean|`false`|

**`options` for `mode=matchTemplate`**

|<div style="width:13em">Name</div>|Description|Type|<div style="width:9em">Default</div>|
|--|--|--|--|
|`matchNeighbourThreshold?`|Maximum pixel distance between two matches to consider them the same match|number|`10`|
|`method?`|Name of the OpenCV template matching method to use. Supported values are: `TM_CCOEFF`, `TM_CCOEFF_NORMED`, `TM_CCORR`, `TM_CCORR_NORMED`, `TM_SQDIFF`, or `TM_SQDIFF_NORMED`.|string|`TM_CCOEFF_NORMED`|
|`multiple?`|Whether to look for multiple occurrences of the image|boolean|`false`|
|`threshold?`|Threshold to use for accepting/rejecting a match|number|`0.5`|
|`visualize?`|Whether to include an image of the matcher visualization in the response|boolean|`false`|

**`options` for `mode=getSimilarity`**

|<div style="width:6em">Name</div>|Description|Type|<div style="width:9em">Default</div>|
|--|--|--|--|
|`method?`|Name of the OpenCV template matching method to use. Supported values are: `TM_CCOEFF`, `TM_CCOEFF_NORMED`, `TM_CCORR`, `TM_CCORR_NORMED`, `TM_SQDIFF`, or `TM_SQDIFF_NORMED`.|string|`TM_CCOEFF_NORMED`|
|`visualize?`|Whether to include an image of the matcher visualization in the response|boolean|`false`|

#### Response

`ComparisonResult` - an object whose properties depend on the `mode` input parameter:

**`ComparisonResult` for `mode=matchFeatures`**

|<div style="width:8em">Name</div>|Description|Type|
|--|--|--|
|`count`|Number of matched edges on both images, after applying `goodMatchesFactor` (if specified).|number|
|`points1`|Array of matching points on `firstImage`|`{x, y}[]`|
|`points2`|Array of matching points on `secondImage`|`{x, y}[]`|
|`rect1`|Bounding rectangle for `points1`|`{x, y, width, height}`|
|`rect2`|Bounding rectangle for `points2`|`{x, y, width, height}`|
|`totalCount`|Total number of matched edges on both images, before applying `goodMatchesFactor` (if specified)|number|
|`visualization?`|Image of the matcher visualization. Only included if the `visualize` input option was enabled.|Buffer|

**`ComparisonResult` for `mode=matchTemplate`**

|<div style="width:8em">Name</div>|Description|Type|
|--|--|--|
|`rect`|Region of `firstImage` where a match was found for `secondImage`|`{x, y, width, height}`|
|`multiple?`|Array of all comparison results. Only included if the `multiple` input option was enabled.|`{rect, score, visualization?}`|
|`score`|Similarity score between both images in the range `[0.0, 1.0]`|number|
|`visualization?`|Image of the matcher visualization. Only included if the `visualize` input option was enabled.|Buffer|

**`ComparisonResult` for `mode=getSimilarity`**

|<div style="width:8em">Name</div>|Description|Type|
|--|--|--|
|`score`|Similarity score between both images in the range `[0.0, 1.0]`|number|
|`visualization?`|Image of the matcher visualization. Only included if the `visualize` input option was enabled.|Buffer|

### findElement

```
POST /session/:sessionId/element
```

Modifies the [`findElement`](./webdriver.md#findelement) endpoint:

* Adds `-image` to the supported values for the `using` parameter (the location strategy)

### findElements

```
POST /session/:sessionId/elements
```

Modifies the [`findElements`](./webdriver.md#findelements) endpoint:

* Adds `-image` to the supported values for the `using` parameter (the location strategy)

### performActions

```
POST /session/:sessionId/actions
```

Modifies the [`performActions`](./webdriver.md#performactions) endpoint:

* If any action in `actions` includes `origin`, whose value is an image element:
    * Removes the `origin` property
    * Increments the `x` and `y` properties by the center coordinates of the image element

## Relaxed Caps Plugin

### createSession

```
POST /session
```

Modifies the [`createSession`](./webdriver.md#createsession) endpoint:

* Adds the `appium:` prefix to all keys in `capabilities`, unless they match a standard W3C
  capability, or already have any prefix

## Storage Plugin

!!! tip

    All endpoints for this plugin can be invoked without creating a session, allowing you to prepare
    your test environment in advance.

### addStorageItem

```
POST /storage/add
```

Adds a new file to the storage.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`name`|Name used for saving the file (must not include path separator characters)|string|
|`sha1`|SHA1 hash of the file to be uploaded|string|

#### Response

`AddRequestResult` - an object with the following properties:

|Name|Description|Type|
|--|--|--|
|`ttlMs`|Timeout (in milliseconds) for both web sockets to remain active, or for a file payload to be successfully uploaded|number|
|`ws.events`|Path for the events web socket used to notify about upload success or failure|string|
|`ws.stream`|Path for the streaming web socket used to upload the file content|string|

Example:
```json
{
  "ws": {
    "stream": "/storage/add/ccc963411b2621335657963322890305ebe96186/stream",
    "events": "/storage/add/ccc963411b2621335657963322890305ebe96186/events"
  },
  "ttlMs": 300000
}
```

### deleteStorageItem

```
POST /storage/delete
```

Deletes a file in the storage.

#### Parameters

|Name|Description|Type|
|--|--|--|
|`name`|Name of the file to be deleted|string|

#### Response

`boolean` - `true` upon successful file deletion, or `false` if the file does not exist in
the storage 

### listStorageItems

```
GET /storage/list
```

List all files present in the storage.

#### Response

`List<StorageItem>` - a list of items, where each item has the following properties:

|Name|Description|Type|
|--|--|--|
|`name`|Name of the file in the storage|string|
|`path`|Full path to the file on the remote file system|string|
|`size`|File size in bytes|number|

### resetStorage

```
POST /storage/reset
```

Deletes all uploaded files and stops any incomplete uploads.
If the [`APPIUM_STORAGE_KEEP_ALL` flag](../cli/env-vars.md) is set, all uploaded files will be
preserved, and only the incomplete uploads will be stopped.

#### Response

`void`

## Universal XML Plugin

### findElement

```
POST /session/:sessionId/element
```

Modifies the [`findElement`](./webdriver.md#findelement) endpoint:

* Adds support for universal node/attribute names for the `value` parameter (the selector)

### findElements

```
POST /session/:sessionId/elements
```

Modifies the [`findElements`](./webdriver.md#findelements) endpoint:

* Adds support for universal node/attribute names for the `value` parameter (the selector)

### getPageSource

```
GET /session/:sessionId/source
```

Modifies the [`getPageSource`](./webdriver.md#getpagesource) endpoint:

* After retrieving the result, translates node/attribute names to their universal names
