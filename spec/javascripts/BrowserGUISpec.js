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
      spyOn($.fn, 'load');
      gui.reloadBoard();
      expect($.fn.load).toHaveBeenCalledWith('/board');
    });

    it("shows a failure message for unsuccessful moves", function() {
      loadFixtures('_failure_message.erb');
      gui.showFailureMessage("content of failure_message div");
      expect($('div#failure_message')).toHaveText("content of failure_message div");
    });

    it("shows an error message for unsuccessful requests", function() {
      loadFixtures('_failure_message.erb');
      gui.errorCallback();
      expect($('div#failure_message')).toHaveText("Something went wrong with that request - please try again.");
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

    it("binds listeners to newly-loaded buttons", function() {
      gui.listenToButtons();
      first_button.click();
      expect(service.attemptMove).toHaveBeenCalledWith('x', 0, gui);

      var new_button = $("<button>");
      new_button.data('position', 1);
      new_button.data('character', 'o');
      $('body').append(new_button);

      new_button.click();
      expect(service.attemptMove).toHaveBeenCalledWith('o', 1, gui);
    });

    it("can stop listening to buttons", function() {
      gui.listenToButtons();
      gui.stopListeningToButtons();
      first_button.click();
      expect(service.attemptMove).not.toHaveBeenCalled();
    });
  });
});
