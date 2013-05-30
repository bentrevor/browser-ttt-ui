function Service() {}

Service.prototype.attemptMove = function( character,
                                         position,
                                         gui ) {
  var that = this;
  $.ajax({
    type: "POST",
    url:  "/try_move",
    data: { character: character,
            position:  position },
    success: function( data ) { gui.successCallback( data ); },
    error: function( data ) { gui.errorCallback(); }
  });
}

Service.prototype.reloadBoard = function() {
  $( "#board_container" ).load( "/board" );
}


