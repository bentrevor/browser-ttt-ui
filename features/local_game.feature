Feature: Local game
  In order to have fun
  As two users at the same browser
  We want to play a game of TTT

  Scenario: First visiting page
    Given a user visits the menu page
    Then he should see the menu

  Scenario: Starting local game
    Given a user visits the menu page
    When he clicks on "Play Local Game"
    Then he should see an empty board

  @javascript
  Scenario: Making first move
    Given a user visits the menu page
    When he clicks on "Play Local Game"
    And he tries to place an "x" at position "0"
    Then he should see an "x" in position "0"
    And he should see a "." in position "1"

  @javascript
  Scenario: Clicking 'O' first
    Given a user visits the menu page
    When he clicks on "Play Local Game"
    And he tries to place an "o" at position "0"
    Then he should see a "." in position "0"
    And he should see the flash message "It's not your turn."

  @javascript
  Scenario: X wins the game
    Given a user visits the menu page
    When he clicks on "Play Local Game"
    And he tries to place an "x" at position "0"
    And he tries to place an "o" at position "8"
    And he tries to place an "x" at position "1"
    And he tries to place an "o" at position "7"
    And he tries to place an "x" at position "2"
    Then he should see the flash message "X Wins! Refresh to play again."

  @javascript
  Scenario: Tie game
    Given a user visits the menu page
    When he clicks on "Play Local Game"
    And he tries to place an "x" at position "0"
    And he tries to place an "o" at position "1"
    And he tries to place an "x" at position "2"
    And he tries to place an "o" at position "4"
    And he tries to place an "x" at position "3"
    And he tries to place an "o" at position "5"
    And he tries to place an "x" at position "7"
    And he tries to place an "o" at position "6"
    And he tries to place an "x" at position "8"
    Then he should see the flash message "Tie Game! Refresh to play again."

