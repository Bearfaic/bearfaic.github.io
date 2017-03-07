$(document).ready(function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //this.responseText holds the info that we loaded
      var response = this.responseText;
      //JSON.parse takes a string, and converts it into a javascript object
      //This is how we will get particular questions below
      var creatureData = JSON.parse(response);

      generateDropDown(creatureData.creatures);
      var generatedCreatureDiv = generateCreatureDiv(creatureData.creatures);
      $("#creatureArea").append(generatedCreatureDiv); 
    }
  };
  //The two lines below will go get the json object at the specified link
  //When it is finished getting the data, the xhttp.onreadystatechange
  //will be called
  xhttp.open("GET", "https://api.myjson.com/bins/17f3jl", true);
  xhttp.send();



  //The function below will generate a div that has a question, the choices,
  //and a button that reveals the correct answer
  //This function assumes that the parameter 'question' has the following format:
  /*
    {
      "question": "The question",
      "choices": {
        "a": "choice1",
        "b": "choice2"
      },
      "answer": "The answer"
    }
  */
  var generateDropDown = function(Creatures){
    var dropDownDiv = document.getElementById("dropDown");
      var addition ="Select a creature: <select id=\"SelectedCreature\">";
      for(x=0; x<Creatures.length;x++){
        addition += "<option value=\""+Creatures[x].name+"\">"+Creatures[x].name+"</option>";
      }
      addition += "</select>";
      dropDownDiv.innerHTML += addition;
    }
  var generateCreatureDiv = function(Creatures) {
    //The div, 'questionDiv' will hold all of the info about the question
    var creatureDiv = $("<div />");


    //Create a button that when pressed, will add question's answer to the div
    var revealButton = $("<button/>");
    creatureDiv.append(revealButton);
    revealButton.text("Display Selected");
    revealButton.click(function() {
      //Figure out which is the current creature
      for(x=0; x<Creatures.length;x++){
        if (Creatures[x].name==selectedCreature()){
          var creature=Creatures[x];
        }
      }
      creatureDiv.append("<h1>" + creature.name + "</h1>");
      creatureDiv.append("<p></p><a href=\""+creature.image+"\"> <img src=\""+creature.image+"\" alt=\"\" width=\"250\" height=\"250\" align=\"middle\"></a>" +"<p>"+creature.description+"</p>");
    });
        var revealButton2 = $("<button/>");
    creatureDiv.append(revealButton2);
    revealButton2.text("Display All");
    revealButton2.click(function(){
      for(x=0; x<Creatures.length;x++){
        creatureDiv.append("<h2>" + Creatures[x].name + "</h2>");
        creatureDiv.append("<p></p><a href=\""+ Creatures[x].image+"\"> <img src=\""+ Creatures[x].image+"\" alt=\"\" width=\"250\" height=\"250\" align=\"middle\"></a>" +"<p>"+ Creatures[x].description+"</p>");
      
      }
    });

    //Return the div with all the querstion information
    //Note: this will not yet be added to the DOM
    return creatureDiv;
  }
  var selectedCreature = function() {
  var creatureList = document.getElementById("SelectedCreature");
  var selectCreature = creatureList.options[creatureList.selectedIndex].value;
    return selectCreature;
  }
});
