Feature: User plays game
  In order to have fun
  As two users at the same browser
  We want to play a game of TTT

  Scenario: First visiting page
    Given we haven't started a game yet
    When we visit the home page
    Then we should see an empty board

  @javascript
  Scenario: Making first move
    Given we haven't started a game yet
    When we visit the home page
    And we try to place an "x" at position "0"
    Then we should see an "x" in position "0"

  @javascript
  Scenario: Clicking 'O' first
    Given we haven't started a game yet
    When we visit the home page
    And we try to place an "o" at position "0"
    Then we should see a "." in position "0"
    And we should see the flash message "It's not your turn."

  @javascript
  Scenario: X wins the game
    Given we haven't started a game yet
    When we visit the home page
    And we try to place an "x" at position "0"
    And we try to place an "o" at position "8"
    And we try to place an "x" at position "1"
    And we try to place an "o" at position "7"
    And we try to place an "x" at position "2"
    Then we should see the flash message "X Wins! Refresh to play again."


