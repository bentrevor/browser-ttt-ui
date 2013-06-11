class BrowserObserver
  attr_accessor :valid, :failure_message

  def continue
    self.valid = true
    self.failure_message = ""
  end

  def tie_game
    self.valid = true
    self.failure_message = "Tie Game!\nRefresh to play again."
  end

  def o_wins
    self.valid = true
    self.failure_message = "O Wins!\nRefresh to play again."
  end

  def x_wins
    self.valid = true
    self.failure_message = "X Wins!\nRefresh to play again."
  end

  def unavailable_position
    self.valid = false
    self.failure_message = "That position is already taken."
  end

  def invalid_position
    self.valid = false
    self.failure_message = "Pick a number 0-8."
  end

  def incorrect_player
    self.valid = false
    self.failure_message = "It's not your turn."
  end
end
