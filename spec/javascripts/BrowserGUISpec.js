describe("BrowserGUI", function() {
  var gui, service;
  jasmine.getFixtures().fixturesPath = 'views/';

  beforeEach(function() {
    service = new Service();
    gui = new BrowserGUI(service);
    spyOn(gui.service, 'attemptMove');
  });

  afterEach(function() {
    service = null;
    gui = null;
  });

  describe("reacting to server responses", function() {
    it("reloads the board for a successful move", function() {
      loadFixtures('board.erb');
      spyOn($.fn, 'load');
      gui.reloadBoard();
      expect($.fn.load).toHaveBeenCalledWith('/board');
    });

    it("shows a failure message for unsuccessful moves", function() {
      loadFixtures('ttt_game.erb');
      gui.showFailureMessage("content of failure_message div");
      expect($('#flash_message')).toHaveText("content of failure_message div");
    });

    it("shows an error message for unsuccessful requests", function() {
      loadFixtures('ttt_game.erb');
      gui.errorCallback();
      expect($('#flash_message')).toHaveText("Something went wrong with that request - please try again.");
    });
  });

  describe("listening to buttons", function() {
    var fake_board, first_button;

    beforeEach(function() {
      fake_board = $("<div>");
      first_button = $("<button>");
      first_button.data('position', 0);
      first_button.data('character', 'x');
      fake_board.append(first_button);
      $('body').append(fake_board);
    });

    it("triggers attemptMove on click", function() {
      gui.listenToButtons();
      first_button.click();
      expect(service.attemptMove).toHaveBeenCalled();
    });

    it("can stop listening to buttons", function() {
      gui.listenToButtons();
      gui.stopListeningToButtons();
      first_button.click();
      expect(service.attemptMove).not.toHaveBeenCalled();
    });
  });
});
