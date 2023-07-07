package BasePage;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class BasePage {

    protected WebDriverWait wait;
    protected WebDriver driver;
    public String BaseUrl = "http://nginx";

    public BasePage(WebDriver driver, WebDriverWait wait) {
        this.wait = wait;
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
}