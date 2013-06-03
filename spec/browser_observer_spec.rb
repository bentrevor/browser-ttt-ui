require 'browser_observer'

describe BrowserObserver do
  let(:observer) { BrowserObserver.new }

  it "responds to requests for successful moves" do
    observer.continue

    observer.valid.should be true
    observer.failure_message.should == ""
    observer.game_over.should be false
  end

  it "resets the failure_message to nil" do
    observer.unavailable_position
    observer.continue

    observer.valid.should be true
    observer.failure_message.should == ""
    observer.game_over.should be false
  end

  it "responds to tie_game notification" do
    observer.tie_game

    observer.valid.should be true
    observer.failure_message.should == "Tie Game!\nRefresh to play again."
    observer.game_over.should be true
  end

  it "responds to o_wins notification" do
    observer.o_wins

    observer.valid.should be true
    observer.failure_message.should == "O Wins!\nRefresh to play again."
    observer.game_over.should be true
  end

  it "responds to x_wins notification" do
    observer.x_wins

    observer.valid.should be true
    observer.failure_message.should == "X Wins!\nRefresh to play again."
    observer.game_over.should be true
  end

  it "responds to requests for unavailable positions" do
    observer.unavailable_position

    observer.valid.should be false
    observer.failure_message.should == "That position is already taken."
    observer.game_over.should be false
  end

  it "responds to requests for invalid position" do
    observer.invalid_position

    observer.valid.should be false
    observer.failure_message.should == "Pick a number 0-8."
    observer.game_over.should be false
  end

  it "responds to requests from incorrect player" do
    observer.incorrect_player

    observer.valid.should be false
    observer.failure_message.should == "It's not your turn."
    observer.game_over.should be false
  end

  def assert_json_values(valid, failure_message)
    observer.valid.should be valid
    observer.failure_message.should eq failure_message
  end
end

