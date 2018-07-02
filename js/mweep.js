
const $forwardObj = $('#video-forward');          //gets the object containing the videos
const $reverseObj = $('#video-reverse');
const $forward = $('#video-forward').get(0);      //gets the video HTML for use with play() and pause()
const $reverse = $('#video-reverse').get(0);
const $bgMusic = $('#bgMusic').get(0);
const $fanfare = $('#fanfare').get(0);
const $modal = $('#modal');
const $textBox = $('#textBox');
const $inventoryDiv = $('#inventoryUI');
const rightArrow = 39;    //keycode for left arrow key
const leftArrow = 37;     //keycode for right arrow key
let gameStarted = false;
let playerName = 'Anonymous'; //default name for if none is given
let inventory = { };


function getItem() {
  let item = items[Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)]];  //gets a random item (items is inherited from items.js)


  while (inventory.hasOwnProperty(item.name) && Object.keys(items).length != Object.keys(inventory).length) {                                                 //gets a new item if the random item is a duplicate
    item = items[Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)]];
  }

  inventory[item.name] = {                                  //adds random unique item to inventory
    "name": item.name,
    "image": item.image,
    "description": item.description
  };
  $(`[src="${item.image}"]`).css('opacity', '1');           //sets opacity low until player has item in inventory
  return item;
}

function itemPopup(item) {
  $('#itemName').text(item['name']);                      //sets the text on the modal pop-up
  $('#modal img').attr('src', item['image']);
  $('#itemDescription').text(item['description']);
  $fanfare.play();
  $modal.fadeIn().delay(3000).fadeOut(400, winCheck);
}

function startGame() {
  playerName = $('#titleScreen input').val() || "Anonymous";    //sets player name to anonymous if no other value is provided
  $('#titleScreen').fadeOut();
  $bgMusic.play();
  startingInventory();
  gameStarted = true;                                           //allows player movement
  createText([`Welcome to my domain ${playerName}.`,
        "My son-in-law needs some more gadgets so he can save the world again.",
        "My legs don't work like they used to, but I can slide left and right better than any Zora in my kingdom!",
        "There is always junk drifting down Zora's river that end up to the left or right of me. I think it's time to check it out!",
        "I see something to the left! Quick!"]);
}

function createText(textArray) {
  $textBox.fadeIn();
  textArray.unshift(" ");                         //why does it skip the first array index? using unshift to hack around it until i figure it out
  let typed = new Typed('#textBox', {
    strings: textArray,
    typeSpeed: 50,
    loop: false,
    startDelay: 400,
    onComplete: () => {                                                     //when text is complete the typed object destroys itself
      $textBox.delay(2000).fadeOut(400, () => {typed.destroy();});          //to prevent backspacing before starting next text
    }
  });
}

function startingInventory() {
  let count = Math.floor(Math.random() * (Object.keys(items).length - 1));      //gets a random number of items that will start in your inventory
  for(count; count != 0; count--) {
    getItem();
  }
}

function populateInventory(inventoryObject) {
  let data = "";
  for (let count = 0; count < Object.keys(items).length; count++) {                                 //adds the image of each item to the UI
    data += `<img class="inventoryItem" src="${items[Object.keys(items)[count]].image}">`;
  }
  data += "";
  $inventoryDiv.html(data);
}

function winCheck() {
  if (Object.keys(inventory).length === Object.keys(items).length) {
    $('#winner').fadeIn();
    gameStarted = false;              //disallows player movement on win
  }
}

$modal.hide();    //hides modal when page is loaded
$textBox.hide();
populateInventory(items);
$inventoryDiv.hide();

setTimeout(() => {
  $reverse.currentTime = $reverse.duration;     //gives the reverse video the "ended" property from start
  $reverseObj.css('z-index', '-1');             //hides the reverse video behind the forward video for the start
  console.log('loadeddata triggered');
}, 1000);                                       //used timeout to prevent js trying to access object proprerties before they load

$('#startGame').click(startGame);               //runs startGame on title button press

$('body').keydown((e) => {
  console.log('key pressed');
  if (e.which == leftArrow && $reverse.ended && gameStarted) {
    if ( ! $forward.ended ) {
      $forward.play();
    }
    else {                                        //when forward video has ended, move it behind the reverse video,
      $reverse.currentTime = 0;                   //give the player an item, and reset the reverse video to the beginning
      itemPopup(getItem());
      $reverseObj.css('z-index', '1');
      $forwardObj.css('z-index', '-1');
      createText(["I see something to the right! Quick!"]);
    }
  }
  if (e.which == rightArrow  && $forward.ended && gameStarted) {
    if ( ! $reverse.ended ) {
      $reverse.play();
    }
    else {                                        //when reverse video has ended, move it behind the forward video,
      $forward.currentTime = 0;                   //give the player an item, and reset the forward video to the beginning
      itemPopup(getItem());
      $forwardObj.css('z-index', '1');
      $reverseObj.css('z-index', '-1');
      createText(["I see something to the left! Quick!"]);
    }
  }
});

$('body').keyup((e) => {
  if (e.which == leftArrow) {
    $forward.pause();
  }
  if (e.which == rightArrow) {
    $reverse.pause();
  }
});

$("#inventoryButton").click(() => {
  $inventoryDiv.slideToggle();
})
