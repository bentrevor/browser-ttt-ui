function BrowserGUI( service ) {
  this.service = service;
}

BrowserGUI.prototype.successCallback = function( data ) {
  if( isValidMove( data )) {
    this.service.reloadBoard();
  } else {
    setFailureMessage( data );
  }

  this.showFailureMessage( data.failureMessage );
}

BrowserGUI.prototype.errorCallback = function() {
  this.showFailureMessage( "Something went wrong with that request - please try again." );
}

BrowserGUI.prototype.showFailureMessage = function( message ) {
  $( '#flash_message' ).text( message );
}

BrowserGUI.prototype.listenToButtons = function() {
  var gui = this;
  $( 'body' ).on( 'click', 'button', function() {
    gui.service.attemptMove( $( this ).data( 'character' ),
                             $( this ).data( 'position' ),
                             gui );
  });
}

function isValidMove( data ) {
  return data.valid === true;
}

function setFailureMessage( data ) {
  if( noFailureMessageProvided( data )) {
    data.failureMessage = "Sorry, something went wrong...";
  }
}

function noFailureMessageProvided( data ) {
  return !data.failureMessage;
}
