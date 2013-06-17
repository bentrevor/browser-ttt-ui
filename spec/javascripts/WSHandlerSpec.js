describe( "WSHandler", function() {
  var wsh;

  beforeEach( function() {
    spyOn( window, "WebSocket" );
  });

  afterEach( function() {
    $( '#fakesubmit' ).remove();
  });

  describe( "opening websockets", function() {
    beforeEach( function() {
      createFakeForm();
      wsh = new WSHandler();
    });

    it( "listens to submit buttons", function() {
      expect( window.WebSocket ).not.toHaveBeenCalled();

      fake_submit.click();
      expect( window.WebSocket ).toHaveBeenCalled();
    });

    it( "opens the connection on port 8080", function() {
      fake_submit.click();
      expect( window.WebSocket ).toHaveBeenCalledWith( 'ws://' + window.location.hostname + ':8080/' );
    });
  });

  function createFakeForm() {
    fake_form = $( "<form>" );
    fake_submit = $( "<button id='fakesubmit' type='submit'>" );
    fake_form.append( fake_submit );
    $( "body" ).append( fake_form );
  }
});
