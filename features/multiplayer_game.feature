Feature: Multiplayer game
  In order to have fun
  As two users at separate browsers
  We want to play a game of TTT

  Scenario: starting a new multiplayer game
    Given a user visits the menu page
    When he clicks on "Start New Multiplayer Game"
    And he enters "Darek" for his name
    And he clicks the "Submit" button
    Then he should see a unique secret code for the game
    And he should see an empty board
    And he should see the flash message "Waiting for player to join..."

  @javascript
  Scenario: joining a multiplayer game
    Given a user visits the menu page
    And his friend "Darek" has previously started a new multiplayer game
    When he clicks on "Join Multiplayer Game"
    And he enters in the secret code he received from "Darek"
    # Then he should see an empty board
    # And he should see that his opponent is "Darek"
    # And he should see the flash message "It is Darek's turn"

