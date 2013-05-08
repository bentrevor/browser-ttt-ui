describe("Service", function() {
  var service, fake_gui;

  beforeEach(function() {
    jasmine.Ajax.useMock();
    fake_gui = jasmine.createSpyObj('fake_gui',
                                      ['errorCallback',
                                       'reloadBoard',
                                       'showFailureMessage',
                                       'stopListeningToButtons']);
    service = new Service();
    makeAjaxRequest('x', 0);
  });

  afterEach(function() {
    clearAjaxRequests;
  });

  it("sends a POST request to '/try_move'", function() {
    expect(request.method).toBe("POST");
    expect(request.url).toBe("/try_move");
  });

  it("sends character and position parameters", function() {
    expect(request.params).toMatch(/character=x&position=0/);

    makeAjaxRequest('o', 2);
    expect(request.params).toMatch(/character=o&position=2/);
  });

  it("calls the gui's errorCallback when request is unsuccessful", function() {
    setResponse(TestResponses.attemptMove.error);
    expect(fake_gui.errorCallback).toHaveBeenCalled();
  });


  describe("successful request", function() {
    beforeEach(function() {
      spyOn($, 'ajax').andCallFake(function(options) {
        options.success(JSON.parse(request.responseText));
      });
    });

    it("shows the failureMessage", function() {
      setResponse(TestResponses.attemptMove.success_with_valid_move);
      expect(fake_gui.reloadBoard).toHaveBeenCalled();
      expect(fake_gui.showFailureMessage).toHaveBeenCalled();
    });

    xit("removes click listeners if the game is over", function() {
      setResponse(TestResponses.attemptMove.success_with_valid_move);
      expect(fake_gui.stopListeningToButtons).not.toHaveBeenCalled();

      setResponse(TestResponses.attemptMove.success_with_game_over);
      makeAjaxRequest('x', 0);
      expect(fake_gui.stopListeningToButtons).toHaveBeenCalled();
    });

    describe("with invalid move", function() {
      it("tells the gui to show a failure message", function() {
        setResponse(TestResponses.attemptMove.success_with_invalid_position);
        expect(fake_gui.showFailureMessage).toHaveBeenCalledWith(responseJSON.failureMessage);
      });

      it("provides a default failure message", function() {
        setResponse(TestResponses.attemptMove.success_with_no_failure_message);
        expect(fake_gui.showFailureMessage).toHaveBeenCalledWith("Sorry, something went wrong...");
      });
    });
  });

  function makeAjaxRequest(character, position) {
    service.attemptMove(character, position, fake_gui);
    request = mostRecentAjaxRequest();
  }

  function setResponse(testResponse) {
    request.response(testResponse);
    responseJSON = JSON.parse(request.responseText);
  }
});

