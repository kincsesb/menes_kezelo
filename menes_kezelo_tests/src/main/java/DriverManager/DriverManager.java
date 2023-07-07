package DriverManager;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class DriverManager {
    private WebDriver driver;
    private WebDriverWait wait;

    public DriverManager() {
        setUp();
    }

    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        try {
            driver = new RemoteWebDriver(new URL("http://selenium-hub:4444/wd/hub"), options);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }


    public WebDriver getDriver() {
        return driver;
    }

    public WebDriverWait getWait() {
        return wait;
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
            driver = null;
            wait = null;
        }
    }

    public void goTo(String url){
        driver.get(url);
    }
}