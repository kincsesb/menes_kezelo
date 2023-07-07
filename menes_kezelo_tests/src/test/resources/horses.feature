Feature: Horse management
  As a registered user
  I want to view all horses
  I want to filter and sort them.

  Scenario: Successful display of the number of horses
    Given I am logged in with valid credentials
    When I navigate to the horse management page
    Then I should see the correct total number of horses
