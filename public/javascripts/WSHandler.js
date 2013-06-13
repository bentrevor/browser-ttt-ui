function WSHandler() {
}

WSHandler.prototype.listenForConnections = function() {
  $( 'form' ).on( 'submit', openWS);
}

function openWS() {
  var ws = WebSocket( 'ws://' + window.location.host + window.location.pathname );
  return false;
}
