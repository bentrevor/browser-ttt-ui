describe( "BrowserGUI", function() {
  var gui, fakeService;
  jasmine.getFixtures().fixturesPath = 'views/';

  beforeEach( function() {
    fakeService = jasmine.createSpyObj( 'fakeService', ['reloadBoard',
                                                        'attemptMove'] );
    gui = new BrowserGUI( fakeService );
  });

  afterEach( function() {
    service = null;
    gui = null;
  });

  describe( "reacting to server responses", function() {
    it( "shows a failure message for unsuccessful requests", function() {
      loadFixtures( 'ttt_game.erb' );
      gui.errorCallback();

      expect( $( '#flash_message' )).toHaveText( "Something went wrong with that request - please try again." );
    });

    describe( "success callback", function() {
      it( "tells the service to reload the board for valid moves", function() {
        var data = ( JSON.parse( TestResponses.attemptMove.success_with_valid_move.responseText ));
        gui.successCallback( data );

        expect( fakeService.reloadBoard ).toHaveBeenCalled();
      });

      it( "shows a failure message for invalid moves", function() {
        loadFixtures( 'ttt_game.erb' );
        var data = ( JSON.parse( TestResponses.attemptMove.success_with_invalid_position.responseText ));
        gui.successCallback( data );

        expect( $( '#flash_message' )).toHaveText( data.failureMessage );
      });

      it( "sets a default failure message when none is provided", function() {
        loadFixtures( 'ttt_game.erb' );
        var data = ( JSON.parse( TestResponses.attemptMove.success_with_no_failure_message.responseText ));
        gui.successCallback( data );

        expect( data.failureMessage ).toBe( "Sorry, something went wrong..." );
      });
    });
  });

  describe( "listening to buttons", function() {
    var fake_board, first_button;

    beforeEach( function() {
      fake_board = $( "<div id='fake_board'>" );
      first_button = $( "<button>" );
      first_button.data( 'position', 0 );
      first_button.data( 'character', 'x' );
      fake_board.append( first_button );
      $( 'body' ).append( fake_board );
    });

    afterEach( function() {
      $( "#fake_board" ).remove();
    });

    it( "triggers attemptMove on click", function() {
      gui.listenToButtons();
      first_button.click();
      expect( fakeService.attemptMove ).toHaveBeenCalled();
    });

    it( "can stop listening to buttons", function() {
      gui.listenToButtons();
      gui.stopListeningToButtons();
      first_button.click();
      expect( fakeService.attemptMove ).not.toHaveBeenCalled();
    });
  });
});
