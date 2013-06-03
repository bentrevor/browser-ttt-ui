class BrowserObserver
  attr_accessor :valid, :failure_message, :game_over

  def continue
    self.valid = true
    self.failure_message = ""
    self.game_over = false
  end

  def tie_game
    self.valid = true
    self.failure_message = "Tie Game!\nRefresh to play again."
    self.game_over = true
  end

  def o_wins
    self.valid = true
    self.failure_message = "O Wins!\nRefresh to play again."
    self.game_over = true
  end

  def x_wins
    self.valid = true
    self.failure_message = "X Wins!\nRefresh to play again."
    self.game_over = true
  end

  def unavailable_position
    self.valid = false
    self.failure_message = "That position is already taken."
    self.game_over = false
  end

  def invalid_position
    self.valid = false
    self.failure_message = "Pick a number 0-8."
    self.game_over = false
  end

  def incorrect_player
    self.valid = false
    self.failure_message = "It's not your turn."
    self.game_over = false
  end
end
