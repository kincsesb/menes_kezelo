package MainPage;

import BasePage.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.WebDriverWait;

public class MainPage extends BasePage {

    @FindBy(xpath = "//div[@id='root']//a[2]")
    public WebElement horsesButton;
    public MainPage(WebDriver driver, WebDriverWait wait) {
        super(driver, wait);
    }
    public void clickToTheHorsesButton(){
        horsesButton.click();
    }
}
