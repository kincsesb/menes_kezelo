package HorsesPage;

import BasePage.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HorsesPage extends BasePage {

    @FindBy(xpath = "//h2[@id='number_of_horse']")
    public WebElement number_of_horse;

    public HorsesPage(WebDriver driver, WebDriverWait wait) {
        super(driver, wait);
    }

    public int getNumberOfHorse(){
        wait.until(ExpectedConditions.visibilityOf(number_of_horse));
        return Integer.parseInt(number_of_horse.getText());
    }
}
