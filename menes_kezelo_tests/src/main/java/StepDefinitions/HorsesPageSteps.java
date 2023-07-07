package StepDefinitions;
import MainPage.MainPage;
import HorsesPage.HorsesPage;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import DriverManager.DriverManager;
public class HorsesPageSteps {

    private DriverManager driverManager;
    private MainPage mainPage;
    private HorsesPage horsesPage;

    @Before
    public void SetUp(){
        driverManager = new DriverManager();
        mainPage = new MainPage(driverManager.getDriver(),driverManager.getWait());
        horsesPage = new HorsesPage(driverManager.getDriver(),driverManager.getWait());
    }

    @After
    public void TearDown(){
        driverManager.tearDown();
    }

    @Given("I am logged in with valid credentials")
    public void i_am_logged_in_with_valid_credentials() {
        //Currently, there is no login feature,
        // so we just navigate to the main page.

        driverManager.goTo("http://nginx/");
    }

    @When("I navigate to the horse management page")
    public void i_navigate_to_the_horse_management_page() {
        mainPage.clickToTheHorsesButton();
    }

    @Then("I should see the correct total number of horses")
    public void i_should_see_the_correct_total_number_of_horses() {
        int numberOfHorse = 251; // in this case just created a code what generated 251 random horse.

        Assert.assertEquals(numberOfHorse,horsesPage.getNumberOfHorse());
    }
}
