describe( "WSHandler", function() {
  it( "listens to submit buttons", function() {
    var wsh = new WSHandler();
    spyOn( window, "WebSocket" );
    var fakeWS = jasmine.createSpyObj( 'fakeWS', ['onopen',
                                                  'onmessage',
                                                  'onclose'] );

    fake_form = $( "<form>" );
    fake_submit = $( "<button id='fakesubmit' type='submit'>" );
    fake_form.append( fake_submit );
    $( "body" ).append( fake_form );
    wsh.listenForConnections();

    expect( window.WebSocket ).not.toHaveBeenCalled();
    fake_submit.click();
    expect( window.WebSocket ).toHaveBeenCalledWith( 'ws://' + window.location.host + window.location.pathname );

    $( '#fakesubmit' ).remove();
  });
});
