
var freeSpace = "Free Space!";
var $newCard = $("<button>New Board</button>");
var cardColor;
var firstBuild = true;
var cardArray;

$.ajaxSetup({async: false});

$.getJSON("../js/json/bingoCards.json", function(data) {
  cardArray = data;
  console.log("got json");
});
console.log(cardArray);

// builds 25 cards for the bingo board with randomly chosen text inside. on first run the
//function will create 25 empty list items. for subsequent calls it will only empty the already
//existing list itmes and repopulate them with new text.
function buildBoard() { 
  var usedCards = []; 
  
  if (firstBuild) {                        //appends 25 list items for the bingo cards
    for (var i = 0; i < 25; i++) {
      if (i == 12) {
        $("#cardList").append("<li class='card freeSpace'></li>")   //special class needed for center space
      }
      else {
        $("#cardList").append("<li class='card'></li>")
      }
    }
    firstBuild = false;
  }
  else {
    $("#cardList li").empty();
    $(".card").css("background-color", "white");          //resets color of all cards to white
    $(".freeSpace").css("background-color", "lightblue"); //resets free space color to lightblue
  }
  $("#cardList li").each(function() {
    if ($(this).hasClass("freeSpace")) {
      $(this).text(freeSpace);                            //assigns text into center space(free space)
    }
    else {
      var randNum = Math.floor(Math.random() * cardArray.length);
  
      //checks if the randomly selected card has already been used and chooses a new one if so
      while (usedCards.indexOf(cardArray[randNum]) > -1) {
        randNum = Math.floor(Math.random() * cardArray.length);
      }
      $(this).text(cardArray[randNum]);                    //adds text randomly selected from the array of strings
      usedCards.push(cardArray[randNum]);  
    }
  });
}

$("#cardList h1").remove();         //removes the no javascript warning
buildBoard();

cardColor = $(".card").css("background-color");     //get background color of tiles to check against later

$("#cardBack").append($newCard);        //creates a button and appends it to the bottom of the bingo card

$(".card").click(function() {                               //when a tile is clicked the color is toggled 
	if ($(this).text() != freeSpace) {                       //between the selected and unselected backgrounds
		var currentColor = $(this).css("background-color");
		if (currentColor === cardColor ) {
		    $(this).css("background-color", "lightblue");
		}
		else {
		    $(this).css("background-color", "white");
		}
	}
});

$("button").click(buildBoard);                        //when button is clicked removes all cards and generates a new random set





