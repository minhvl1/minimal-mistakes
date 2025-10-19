---
title: "Build Framework Selenium TestNG Java from Scratch"
categories:
  - Selenium
  - TestNG
  - Java
tags:
  - Selenium
  - TestNG
  - Java
---
How to build automation framework by Selenium TestNG Java from scratch, for beginner.

### Prerequisite
* Java latest: 24
* Selenium latest
* TestNG latest
* Allure report
* Log4j2


### Reference: [Git](https://gitlab.com/testertop_lession/k2_automation/-/tree/main?ref_type=heads)
### Framework structure
```
framework/
├── src
│   ├── main
│   │   └── java
│   │       ├── constants
│   │       │   ├── FrameworkConstants.java         #global variables
│   │       ├── driver
│   │       │   └── DriverManager.java
│   │       ├── reports
│   │       │   └── AllureManager.java    #config allure report
│   │       └── utils
│   │           ├── LogUtils.java
│   │           └── BasePage.java       #init core action
│   └── test
│       ├── java
│       │   ├── common
│       │   │   ├── BaseTest.java   #hook and init webdriver
│       │   ├── listeners
│       │   │   └── TestListener.java  
│       │   ├── pageAction
│       │   │   ├── SwagLabHomePageAction.java    #specific action of page
│       │   ├── pageUI
│       │   │   └── SwagLabHomePageUI.java    #define page locators
│       │   └── testCase
│       │        ├── AddToCart.java     #Testcase
│       ├── resources
│       │   ├── config
│       │   │   └── log4j2.xml     #config log4j2 
│       │   └── suites
│       │       ├── test.xml        #define testNG suite
├── pom.xml
└── target
```
### Create BaseTest Class

```java
import action.LoginPageAction;
import io.qameta.allure.Step;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.*;

import java.time.Duration;

public class BaseTest {

    @BeforeClass(alwaysRun = true)
    @Parameters({"browser"})
    public void setUpDriver(String browser) {
        WebDriver driver = null;
        switch (browser) {
            case "chrome" -> driver = new ChromeDriver();
            case "firefox" -> driver = new FirefoxDriver();
            case "edge" -> driver = new EdgeDriver();
            case "hedge" -> {
                EdgeOptions edgeOptions = new EdgeOptions();
                edgeOptions.addArguments("--no-sandbox");
                edgeOptions.addArguments("--disable-gpu");
                edgeOptions.addArguments("--disable-popup-blocking");
                edgeOptions.addArguments("--disable-dev-shm-usage");
                edgeOptions.addArguments("--headless");
                driver = new EdgeDriver(edgeOptions);
            }

        }
        DriverManager.setDriver(driver);
        DriverManager.getDriver().get("https://www.saucedemo.com/");
        DriverManager.getDriver().manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
        System.out.println("Setting up driver: " + browser);
    }

    private final LoginPageAction loginPage = new LoginPageAction();

    @BeforeClass(alwaysRun = true)
    public void swagLabLogin() {
        loginPage.setUserName("standard_user");
        loginPage.setPassword("secret_sauce");
        loginPage.clickLoginButton();
        loginPage.verifyLoginSuccess();
    }

    @AfterClass
    public void cleanUpDriver() {
        DriverManager.getDriver().quit();
        DriverManager.quitDriver();
    }

}

```

### Create DriverManager Class

> [! NOTE]
> Use ThreadLocal<> to specific instance webdriver if run test parallel

```java
import org.openqa.selenium.WebDriver;


public class DriverManager {

    private DriverManager() {
    }

    public static final ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static void setDriver(WebDriver driverInstance) {
        driver.set(driverInstance);
    }

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void quitDriver() {
        driver.remove();
    }
}

```
### Create Page object model

POM have 3 packages: Action, UI, Testcases
BasePage: is core class action, define core action: click, sendkey, wait... then extended by PageAction


#### BasePage
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class BasePage {

    public WebElement getElement(String element) {
        return DriverManager.getDriver().findElement(By.xpath(element));
    }

    public void waitElementToBeClickable(String element) {
        WebDriverWait wait = new WebDriverWait(DriverManager.getDriver(), Duration.ofSeconds(30));
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath(element)));
    }

    public void waitElementToVisible(String element) {
        WebDriverWait wait = new WebDriverWait(DriverManager.getDriver(), Duration.ofSeconds(30));
        wait.until(ExpectedConditions.visibilityOf(DriverManager.getDriver().findElement(By.xpath(element))));
    }

    public void clickElement(String element) {
        waitElementToVisible(element);
        waitElementToBeClickable(element);
        getElement(element).click();
    }

    public void setTextElement(String element, String text) {
        waitElementToVisible(element);
        getElement(element).sendKeys(text);
    }

    public String getTextElement(String element) {
        waitElementToVisible(element);
        return getElement(element).getText();
    }

    public void sleep(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
        }
    }
}
```
#### PageAction
```java
import common.BasePage;
import common.DriverManager;
import io.qameta.allure.Step;
import org.testng.Assert;
import ui.LoginPageUI;

public class LoginPageAction extends BasePage {

    @Step("Login with username: {0}")
    public void setUserName(String userName) {
        setTextElement(LoginPageUI.usernameTextBox, userName);
    }

    @Step("Login with password: {0}")
    public void setPassword(String password) {
        setTextElement(LoginPageUI.passwordTextBox, password);
    }

    @Step("Click login button")
    public void clickLoginButton() {
        clickElement(LoginPageUI.loginButton);
    }

    public void verifyLoginSuccess() {
        Assert.assertEquals(DriverManager.getDriver().getCurrentUrl(), "https://www.saucedemo.com/inventory.html", "Login failed");
    }
}

```
#### PageUI
```java
public class LoginPageUI {

    public static final String usernameTextBox = "//input[@name='user-name']";
    public static final String passwordTextBox = "//input[@name='password']";
    public static final String loginButton = "//input[@name='login-button']";
}

```


#### Testcases
```java
import action.InventoryPageAction;
import common.BaseTest;
import io.qameta.allure.Step;
import org.testng.annotations.Test;

public class SwagLabTestCase extends BaseTest {

    private final InventoryPageAction inventoryPage = new InventoryPageAction();

    @Test()
    @Step("Add to cart")
    public void addCart() {
        String productName = "Sauce Labs Bike Light";
        inventoryPage.addProductToCard(productName);
        inventoryPage.verifyAddToCardSuccess(productName);
    }

}
```
