describe( "Service", function() {
  var service, fake_gui;

  beforeEach( function() {
    jasmine.Ajax.useMock();
    fake_gui = jasmine.createSpyObj( 'fake_gui',
                                      ['errorCallback',
                                       'successCallback',
                                       'reloadBoard',
                                       'showFailureMessage',
                                       'stopListeningToButtons'] );
    service = new Service();
  });

  afterEach( function() {
    clearAjaxRequests();
  });

  it( "sends a POST request to '/try_move'", function() {
    makeAjaxRequest( 'x', 0 );

    expect( request.method ).toBe( "POST" );
    expect( request.url ).toBe( "/try_move" );
  });

  it( "sends character and position parameters", function() {
    makeAjaxRequest( 'x', 0 );
    expect( request.params ).toMatch( /character=x&position=0/ );

    makeAjaxRequest( 'o', 2 );
    expect( request.params ).toMatch( /character=o&position=2/ );
  });

  it( "calls the gui's errorCallback when request fails", function() {
    makeAjaxRequest( 'x', 0 );
    setResponse( TestResponses.attemptMove.error );

    expect( fake_gui.errorCallback ).toHaveBeenCalled();
  });

  it( "calls the gui's successCallback when the request succeeds", function() {
    makeAjaxRequest( 'x', 0 );
    setResponse( TestResponses.attemptMove.success_with_valid_move );

    expect( fake_gui.successCallback ).toHaveBeenCalled();
  });

  it( "reloads the board for a successful move", function() {
    spyOn( $.fn, 'load' );
    service.reloadBoard();
    expect( $.fn.load ).toHaveBeenCalledWith( '/board' );
  });

  function makeAjaxRequest( character, position ) {
    service.attemptMove( character, position, fake_gui );
    request = mostRecentAjaxRequest();
  }

  function setResponse( testResponse ) {
    request.response( testResponse );
    responseJSON = JSON.parse( request.responseText );
  }
});

