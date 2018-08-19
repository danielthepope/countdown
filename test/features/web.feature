Feature: Web interface tests
  As a user
  I want to access Countdown through a Web browser
  So that I don't have to install it locally

  # A really important test
  Scenario: Visiting the home page
    Given I am on the home page
    Then I should see "Countdown"

  Scenario: Solve the anagram
    Given I am on the home page
    Then I should see 9 letters in the anagram box
    When I press the "Solve" button
    Then I should see some answers

  Scenario: Enter own anagram
    Given I am on the home page
    And I replace the anagram with "tnetennba"
    When I press the "Solve" button
    Then I should see "TENANT"

  Scenario: Generate a new anagram
    Given I am on the home page
    Then I should see 9 letters in the anagram box
    When I press the "New letters" button
    Then the anagram box should have different letters

  Scenario: Navigate to specific anagram
    Given I visit "/tnetennba"
    Then I should see "TENANT"

  Scenario: New letters should clear previous answers
    Given I visit "/tnetennba"
    Then I should see "TENANT"
    When I press the "New letters" button
    Then I should not see any answers
