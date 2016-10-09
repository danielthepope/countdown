Feature: Web interface tests
  As a user
  I want to access Countdown through a Web browser
  So that I don't have to install it locally

  # A really important test
  Scenario: Visiting the home page
    Given I am on the home page
    Then I should see "Countdown"
