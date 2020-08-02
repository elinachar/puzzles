$(document).on('turbolinks:load', function() {

  var nPieces, nPiecesWidth, nPiecesHeight, imageUrl
  nPieces = $(".main-puzzle").data("pieces-number");
  nPiecesWidth = $(".main-puzzle").data("pieces-number-width");
  nPiecesHeight = $(".main-puzzle").data("pieces-number-height");
  imageUrl = $(".main-puzzle").data("image-url");
  resizePuzzleAndPieces(nPieces, nPiecesWidth, nPiecesHeight, imageUrl);

  function resizePuzzleAndPieces(nPieces, nPiecesWidth, nPiecesHeight, imageUrl) {
    // Initialize the variables
    var ratio, col8Width, col2Width, nPiecesWidth, nPiecesHeight, puzzleWidth, puzzleHeight, pieceWidth, pieceHeight, pieceScale

    // Set the image
    $(".piece").css("background-image", "url('" + imageUrl + "')");

    // Set the size of the main puzzle
    ratio = 1920/1280;
    col8Width  = $(".col-8").width();

    // The main puzzle (whole image) will have the 40% of the document height
    // The width will be respective with the default image ratio
    puzzleWidth = col8Width;
    puzzleHeight = puzzleWidth/ratio;


    // Each piece will have the following dimensions respective to the total
    // pieces per side
    pieceHeight = puzzleHeight/nPiecesHeight
    pieceWidth = puzzleWidth/nPiecesWidth
    imageScaleWidth = nPiecesWidth * 100;
    imageScaleHeight = nPiecesHeight * 100;
    $(".piece").css({ "height": pieceHeight, "width": pieceWidth, "background-size": imageScaleWidth + "% " + imageScaleHeight + "%" });

    var stepHeight, stepWidth, count
    stepHeight = 100/(nPiecesHeight-1);
    stepWidth = 100/(nPiecesWidth-1);
    count = 0;
    for (h = 0; h < nPiecesHeight; h++) {
      positionHeight = h*stepHeight;
      for (w = 0; w < nPiecesWidth; w++) {
        positionWidth = w*stepWidth;
        count++;
        $(".piece" + count).css({"background-position": positionWidth + "% " + positionHeight + "%"});
      }
    }

    // Scale the pieces on the side
    col2Width = $(".col-2").width();
    scale = col2Width/pieceWidth;

    // Rotation angle of the side pieces
    var angle = [5, -5, 0, 5, -5, 0, 5, -5];

    // Position the side pieces
    var topShift, top, angle, piecesLeft, piecesRight;
    topShift = (pieceHeight*scale)/2;

    piecesLeft = $(".pieces-left").children();
    piecesRight = $(".pieces-right").children();
    $.each(piecesLeft, function(i, itemLeft) {
      top = -i*topShift;
      $(itemLeft).css({ "top": top + "px", "left": "-15%", "transform": "scale(" + scale + ") rotate(" + angle[i] + "deg)"});
      $(piecesRight[i]).css({ "top": top + "px", "left": "10%", "transform": "scale(" + scale + ") rotate(" + angle[i] + "deg)"})
    })

    $(".puzzle-pieces-side").css("height", puzzleHeight + "px");
  }

  $(window).on('resize', function() {
    resizePuzzleAndPieces(nPieces, nPiecesWidth, nPiecesHeight, imageUrl);
  });

  // Drag and Drop
  // Drag
  $( ".piece.draggable" ).draggable({
    cursor: "move",
    // revert: true,
    start: function( event, ui) {
      $(this).css("transform", "scale(1)");
    }
  // drag: function( event, ui ) {}
  // stop: function( event, ui ) {}
  });

  // Drop
  $( ".droppable" ).droppable({
    over: function( event, ui ) {
      // over droppable
      $(this).addClass("ui-droppable-hover");
    },
    out: function( event, ui ) {
      // not over droppable
      $(this).removeClass("ui-droppable-hover");
    },

    drop: function( event, ui ) {
      // dropped
      var droppableId = $(this).attr("id").split("-")[1];
      var draggableId = $(ui.draggable).attr("id");
      if (draggableId.includes(droppableId)) {
        $("#" + draggableId).fadeOut("fast");
        $(this).css("opacity", "1");

      }
    }
  });

  // Bootstrap Tooltips of possibilities buttons
  $('[data-toggle="tooltip"]').tooltip();

  // Set active puzzle piece of pieces
  var url_index_of_pieces, num_of_pieces_1, num_of_pieces_2, num_of_pieces;
  url_index_of_pieces = window.location.href.indexOf("piecesnumber=");
  num_of_pieces = 6;
  if ( url_index_of_pieces > 0 ) {
    num_of_pieces_1 = window.location.href[url_index_of_pieces + 13];
    num_of_pieces_2 = window.location.href[url_index_of_pieces + 14];
    num_of_pieces = parseInt(num_of_pieces_1);
    if ( !isNaN(parseInt(num_of_pieces_2)) ) {
      num_of_pieces = parseInt(num_of_pieces_1 + num_of_pieces_2);
    }
  }
  $(".piece-selection").each (function (index, value) {
    $(value).removeClass("active");
  })

  $("#piece-selection-" + num_of_pieces).addClass("active");

  // Unable to click active puzzle piece of pieces number for avoid reload
  $(".piece-selection.active").click(function(e){
    e.preventDefault();
  })


})


function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}
