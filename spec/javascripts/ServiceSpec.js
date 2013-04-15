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
    ajaxRequests = [];
  });

  it("sends a POST request to '/try_move'", function() {
    expect(request.method).toBe("POST");
    expect(request.url).toBe("/try_move");
  });

  it("sends character and position parameters", function() {
    expect(request.params).toBe("character=x&position=0");

    makeAjaxRequest('o', 2);
    expect(request.params).toBe("character=o&position=2");
  });

  describe("on success", function() {
    beforeEach(function() {
      spyOn($, 'ajax').andCallFake(function(options) {
        options.success(JSON.parse(request.responseText));
      });
    });

    it("calls successCallback", function() {
      spyOn(service, 'successCallback');
      setResponse(TestResponses.attemptMove.success_with_valid_move);
      expect(service.successCallback).toHaveBeenCalledWith(responseJSON, fake_gui);
    });

    describe("with valid move", function() {
      it("tells the gui to reload the board", function() {
        setResponse(TestResponses.attemptMove.success_with_valid_move);
        expect(fake_gui.reloadBoard).toHaveBeenCalled();
      });

      it("removes click listeners if the game is over", function() {
        setResponse(TestResponses.attemptMove.success_with_valid_move);
        expect(fake_gui.stopListeningToButtons).not.toHaveBeenCalled();

        setResponse(TestResponses.attemptMove.success_with_game_over);
        makeAjaxRequest('x', 0);
        expect(fake_gui.stopListeningToButtons).toHaveBeenCalled();
      });
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

  describe("on failure", function() {
    it("sends an error message to the gui object", function() {
      setResponse(TestResponses.attemptMove.error);
      expect(fake_gui.errorCallback).toHaveBeenCalled();
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

