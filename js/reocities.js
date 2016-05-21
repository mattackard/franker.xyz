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
                        "Tokyo"
                      ];
var siteArray = [];
var neighborhood = "";
var randNum;

for (var i = 0; i < subDirectories.length; i++) {                   //creates a list of options from the subDirectories array
  $("#directorySelect").append("<option value='" + subDirectories[i] + "'>" + subDirectories[i] + "</option>");
}

$("select").change(function() {                                     //sets neighborhood to the the selected subdirectory
  neighborhood = $("select option:selected").attr("value");
  console.log(neighborhood);
})

$("#submit").click(function() { 
  if (neighborhood == "") {                                       //shows an alert if no subdirectory was selected
    $(".select").css("border","2px solid red");
    alert("You must select a subdirectory");
  }
  else {
    $.getJSON("../js/json/reocities/" + neighborhood + ".json", function(data) {              //when button is clicked the json file is selected
      neighborhood = data.subDir;
      console.log(neighborhood);                                                                //based on the neighborhood and loaded. the addresses
                                                                                                //for the pages are loaded into an array and
                                                                                               //randomized. the user is then redirected to the page
      siteArray = data.address;  
      console.log(siteArray);
      randNum = Math.floor(Math.random() * siteArray.length);
      window.location = "http://reocities.com/"+neighborhood+"/"+siteArray[randNum];
    })
  }
});