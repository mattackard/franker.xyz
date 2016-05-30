var subDirectories =  [
                        "Alien",
                        "Area51",
                        "Athens",
                        "Atlantis",
                        "Augusta",
                        "Baja",
                        "BourbonStreet",
                        "CapeCanaveral",
                        "CapitolHill",
                        "CollegePark",
                        "Dimension",
                        "Dreamworld",
                        "Dungeon",
                        "Labyrinth",
                        "Shadowlands",
                        "Tokyo",
                        "Underworld",
                        "Zone"
                      ];
var siteArray = [];
var neighborhood = "";
var randNum;

function pickSite() {
   if (neighborhood == "") {                                       //shows an alert if no subdirectory was selected
    $(".select").css("border","2px solid red");
    alert("You must select a subdirectory");
  }
  else {
    $.getJSON("../js/json/reocities/" + neighborhood + ".json", function(data) {              //when button is clicked the json file is selected
      neighborhood = data.subDir;                                                               //based on the neighborhood and loaded. the addresses 
      siteArray = data.address;                                                                 //for the pages are loaded into an array and                                                  
      randNum = Math.floor(Math.random() * siteArray.length);                                    //randomized. the user is then redirected to the page
      window.location = "http://reocities.com/"+neighborhood+"/"+siteArray[randNum];
    })
  }
}

for (var i = 0; i < subDirectories.length; i++) {                   //creates a list of options from the subDirectories array
  $("#directorySelect").append("<option value='" + subDirectories[i] + "'>" + subDirectories[i] + "</option>");
}

$("select").change(function() {                                     //sets neighborhood to the the selected subdirectory
  neighborhood = $("select option:selected").attr("value");
})

$("#submit").click(pickSite);
$("#randomSub").click(function() {
  randNum = Math.floor(Math.random() * subDirectories.length);
  neighborhood = subDirectories[randNum];
  pickSite();
});