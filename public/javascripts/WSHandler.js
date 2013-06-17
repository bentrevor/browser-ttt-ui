function WSHandler() {
  $( 'form' ).submit( this.openWS );
}

WSHandler.prototype.openWS = function() {
  var ws = new WebSocket( 'ws://' + window.location.hostname + ':8080/' );
  return false;
}

$( function() {
  var wsh = new WSHandler();
});
