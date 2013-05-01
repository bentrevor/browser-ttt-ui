Feature: Remote game
  In order to have fun
  As two users at separate browsers
  We want to play a game of TTT

  Scenario: starting a new remote game
    Given a user visits the menu page
    When he clicks on "Create New Remote Game"
    And he enters "Darek" for his name
    And he clicks the "Submit" button
    Then he should see a unique secret code for the game
    And he should see an empty board
    And he should see the flash message "Waiting for player to join..."

  @javascript
  Scenario: joining a remote game
    Given a user visits the menu page
    And his friend "Darek" has previously started a new remote game
    When he clicks on "Join Remote Game"
    And he enters in the secret code he received from "Darek"
    # Then he should see an empty board
    # And he should see that his opponent is "Darek"
    # And he should see the flash message "It is Darek's turn"

