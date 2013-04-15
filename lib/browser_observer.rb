class BrowserObserver
  attr_accessor :valid, :failure_message

  def continue
    set_member_variables true, ""
  end

  def unavailable_position
    set_member_variables false, "That position is already taken."
  end

  def invalid_position
    set_member_variables false, "Pick a number 0-8."
  end

  def incorrect_player
    set_member_variables false, "It's not your turn."
  end

  def restart
    set_member_variables false, "Refresh to play again."
  end

  def game_over(board)
    if board.check_winner? 'x'
      game_over_string = "X Wins!"
    elsif board.check_winner? 'o'
      game_over_string = "O Wins!"
    else
      game_over_string = "Tie Game!"
    end
    game_over_string << "\nRefresh to play again."

    set_member_variables true, game_over_string
  end

  private
  def set_member_variables(valid, failure_message)
    self.valid = valid
    self.failure_message = failure_message
  end
end
