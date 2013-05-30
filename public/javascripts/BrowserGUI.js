function BrowserGUI( service ) {
  this.service = service;
}

BrowserGUI.prototype.successCallback = function( data ) {
  if( isValidMove( data )) {
    this.service.reloadBoard();
  } else {
    setFailureMessage( data );
  }

  if( gameIsOver( data )) {
    stopListeningToButtons();
  }
  this.showFailureMessage( data.failureMessage );
}

BrowserGUI.prototype.errorCallback = function() {
  this.showFailureMessage( "Something went wrong with that request - please try again." );
}

BrowserGUI.prototype.reloadBoard = function() {
  $( '#board_container' ).load( '/board' );
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

BrowserGUI.prototype.stopListeningToButtons = function() {
  $( 'body' ).off( 'click' );
}

function isValidMove( data ) {
  return data.valid === true;
}

function gameIsOver( data ) {
  return false;
}

function setFailureMessage( data ) {
  if( noFailureMessageProvided( data )) {
    data.failureMessage = "Sorry, something went wrong...";
  }
}

function noFailureMessageProvided( data ) {
  return !data.failureMessage;
}
