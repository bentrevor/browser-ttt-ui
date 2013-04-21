require 'browser_observer'

describe BrowserObserver do
  let(:observer) { BrowserObserver.new }

  it "responds to requests for successful moves" do
    observer.continue
    assert_json_values true, ""
  end

  it "resets the failure_message to nil" do
    observer.unavailable_position
    observer.continue
    assert_json_values true, ""
  end

  it "responds to requests for unavailable positions" do
    observer.unavailable_position
    assert_json_values false, "That position is already taken."
  end

  it "responds to requests for invalid position" do
    observer.invalid_position
    assert_json_values false, "Pick a number 0-8."
  end

  it "responds to requests for incorrect player" do
    observer.incorrect_player
    assert_json_values false, "It's not your turn."
  end

  it "responds to requests for restart" do
    observer.restart
    assert_json_values false, "Refresh to play again."
  end

  it "responds to o_wins notification" do
    observer.o_wins
    assert_json_values true, "O Wins!\nRefresh to play again."
  end

  it "responds to x_wins notification" do
    observer.x_wins
    assert_json_values true, "X Wins!\nRefresh to play again."
  end

  it "responds to tie_game notification" do
    observer.tie_game
    assert_json_values true, "Tie Game!\nRefresh to play again."
  end

  def assert_json_values(valid, failure_message)
    observer.valid.should be valid
    observer.failure_message.should eq failure_message
  end
end

