var jsonData = {
  "4-4PointJosekis": {
    "base": "3,3",
    "josekis": [
      {
        "name": "3-3 point invasion",
        "firstMove": "2,2",
        "lines": [
          [{
            "name": "",
            "moves": ["2,2"]
            }]
        ]
      }
    ]
  },
  "3-4PointJosekis": {
    "base": "3,2",
    "josekis": [
      {
        "name": "3-4 Point",
        "lines": [
            [{
              "name": "3-3 point invasion",
              "moves": ["R17"]
              }]
          ]
      }
    ]
  }
}


console.log(jsonData);



// Get board element and create new game
var boardElement = document.querySelector(".tenuki-board");
var controlElement = document.querySelector(".controls");
var game;
newBoard()

var josekiSelector = document.getElementById("jsonLinks");
var linesElement = document.getElementById("lines");


// Iterate through keys and create hyperlinks
for (var key in jsonData) {
  if (jsonData.hasOwnProperty(key)) {
    // Create a hyperlink element
    var link = document.createElement("a");
    link.href = "#"; // Set the href to "#" for demonstration purposes

    // Add Bootstrap classes for formatting
    link.classList.add("btn", "btn-secondary", "mr-2", "mb-2");

    // Set the text content to the key (name of the object)
    link.textContent = key;

    // Add click event listener to log the name of the object
    link.addEventListener("click", function(objName) {
      return function() {
        // Logging
        console.log("Clicked on:", objName);

        // Get data
        var josekiJson = getJosekiData(objName);

        // Clear board
        newBoard();

        // Play first move
        var coords = josekiJson.base.split(",");
        game.playAt(3,3);

        // Clearing lines element
        linesElement.innerHTML = "";


        for(var joseki in josekiJson.josekis){
          var josekiButton = document.createElement("a");
          josekiButton.classList.add("btn", "btn-secondary", "mr-2", "mb-2");
          josekiButton.textContent = josekiJson.josekis[joseki].name;

          // Add click event listener to log the name of the object
          josekiButton.addEventListener("click", function(objName) {
            return function() {
              console.log(josekiJson.josekis[joseki].firstMove);
            };
          }(joseki)); // Using a closure to capture the current key value

          linesElement.appendChild(josekiButton);
        }


      };
    }(key)); // Using a closure to capture the current key value

    // Append the hyperlink to the container
    josekiSelector.appendChild(link);
  }
}


// Function to get JSON object of specific Joseki
function getJosekiData(category) {
  return jsonData[category] || [];
}

// Clear board element and create new board, assigning it to game variable
function newBoard() {
  // Empty HTML 
  boardElement.innerHTML = "";
  controlElement.innerHTML = "<div class=\"buttons\"> <a class=\"pass\" href=\"#\">Pass<\/a> <a class=\"undo\" href=\"#\">Undo<\/a> <\/div> <div class=\"branch-info\" style=\"width:600px;\"><p>\u00A0<\/p><\/div> <div class=\"game-info\" style=\"width:600px;\"><p>\u00A0<\/p><\/div> <div class=\"text-info\" style=\"width:600px;\"><p><\/p><\/div>";

  // Instansiate new game 
  game = new tenuki.Game({ element: boardElement });

  // Configure controls
  var controls = new ExampleGameControls(controlElement, game);
  controls.setup();

  game.callbacks.postRender = function(game) {
    controls.updateStats();
  };

  document.addEventListener("keydown",  function (e) {
    //if (e.keyCode == 82) { // r pressed
    if (e.keyCode == 69) { // e pressed
      controls.reset(e);
    }
    else if (e.keyCode == 27) { // enter pressed
      controls.reset(e);
    }
  }, false);
}

