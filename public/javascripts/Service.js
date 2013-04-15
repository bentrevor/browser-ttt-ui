function Service() {}

Service.prototype.attemptMove = function(character,
                                         position,
                                         gui) {
  var that = this;
  $.ajax({
    type: "POST",
    url:  "/try_move",
    data: { character: character,
            position:  position },
    success: function(data) { that.successCallback(data, gui); },
    error: function(data) { gui.errorCallback(data); }
  });
}

Service.prototype.successCallback = function(data, gui) {
  if(isValidMove(data)) {
    gui.reloadBoard();
  } else {
    setFailureMessage(data);
  }

  if(data.failureMessage == "Thanks for playing! Refresh to play again.") {
    gui.stopListeningToButtons();
  }
  gui.showFailureMessage(data.failureMessage);
}

function setFailureMessage(data) {
  if(noFailureMessageProvided(data)) {
    data.failureMessage = "Sorry, something went wrong...";
  }
}

function noFailureMessageProvided(data) {
  return !data.failureMessage;
}

function isValidMove(data) {
  return data.valid === true;
}
