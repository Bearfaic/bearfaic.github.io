//Define a Person class
function Person(fName, lName, img, Height, Weight ) {
  this.firstName = fName;
  this.lastName = lName;
  this.image = img;
  this.HEIGHT = Height;
  this.WEIGHT = Weight;
  this.names = function() {
    return this.firstName + " " + this.lastName + ", ";
  }
  this.pic = function() {

      return "<a href=\"../exercise03/" + this.image + ".png\"> <img src=\"../exercise03/" + this.image + ".png\" alt=\"\" width=\"243\" height=\"201\" align=\"middle\">  </a>";
  }
  this.specs = function() {
    return this.HEIGHT + " inches, " + this.WEIGHT + " lbs";
  }
}
//This function will run when the button is clicked
var people = [];

//This function will run when the button is clicked
var buttonClicked = function() {
  //Grab the div with the id "nameList" from the DOM
  var x = document.getElementsByName("fname")[0].value;
  var y = document.getElementsByName("lname")[0].value;
  var im = selectedGrave()
  var z = document.getElementsByName("theight")[0].value;
  var w = document.getElementsByName("tweight")[0].value;
  var dude = new Person(x,y,im,z,w)
  people.push(dude);
}
var buttonClickedTwo = function() {
  var nameListDiv = document.getElementById("nameList");
  //Loop through each person in people, and add a p with the output
  //of the person's sayHello function inside of it
  for (var i = 0; i < people.length; i++) {
    nameListDiv.innerHTML += "<p> Future: deceased.</p>"+ "<p>" + people[i].names() + people[i].pic() + people[i].specs() + "</p>";
  }
}

var createPersonEntry = function(person) {
  var personEntry = document.createElement("div");
  var personNameHeading = document.createElement("p");
  personNameHeading.className = "personTitle";
  personNameHeading.innerHTML = person.name;
  personEntry.appendChild(personNameHeading);

  return personEntry;
}

var submitPressed = function() {
  var x = document.getElementsByName("fname")[0].value;
  console.log("SUBMITTED! " + x);
}

var selectedGrave = function() {
  var graveList = document.getElementById("preferredGrave");
  var selectGrave = graveList.options[graveList.selectedIndex].value;
    return selectGrave;
}
