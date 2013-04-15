function BrowserGUI(service) {
  this.service = service;
}

BrowserGUI.prototype.errorCallback = function() {
  this.showFailureMessage("Something went wrong with that request - please try again.");
}

BrowserGUI.prototype.reloadBoard = function() {
  $('table#board_table').load('/board');
}

BrowserGUI.prototype.showFailureMessage = function(message) {
  $('div#failure_message').text(message);
}

BrowserGUI.prototype.listenToButtons = function() {
  var that = this;
  $('body').on('click', 'button', function() {
    that.service.attemptMove($(this).data('character'), $(this).data('position'), that);
  });
}

BrowserGUI.prototype.stopListeningToButtons = function() {
  $('body').off('click');
}

