describe( "BrowserGUI", function() {
  var gui, fake_service;
  jasmine.getFixtures().fixturesPath = 'views/';

  beforeEach( function() {
    fake_service = jasmine.createSpyObj( 'fake_service', ['reloadBoard',
                                                          'attemptMove'] );
    gui = new BrowserGUI( fake_service );
  });

  afterEach( function() {
    service = null;
    gui = null;
  });

  describe( "reacting to server responses", function() {
    it( "shows an error message for unsuccessful requests", function() {
      loadFixtures( 'ttt_game.erb' );
      gui.errorCallback();
      expect( $( '#flash_message' )).toHaveText( "Something went wrong with that request - please try again." );
    });

    describe( "success callback", function() {
      it( "tells the service to reload the board for valid moves", function() {
        var data = ( JSON.parse( TestResponses.attemptMove.success_with_valid_move.responseText ));
        gui.successCallback( data );
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
      expect( fake_service.attemptMove ).toHaveBeenCalled();
    });

    it( "can stop listening to buttons", function() {
      gui.listenToButtons();
      gui.stopListeningToButtons();
      first_button.click();
      expect( fake_service.attemptMove ).not.toHaveBeenCalled();
    });
  });

  function getFakeResponseData() {
    jasmine.Ajax.useMock();
    service.attemptMove( character, position, fake_gui );
    request = mostRecentAjaxRequest();
    request.response( testResponse );
    responseJSON = JSON.parse( request.responseText );
  }
});
