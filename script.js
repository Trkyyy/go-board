var jsonData = {
  "4-4PointJosekis": [
    {
      "name": "3-3 point invasion",
      "firstMove": "R17",
      "lines": [
        [{
          "name": "",
          "moves": ["R17"]
          }]
      ]
    }
  ],
  "3-4PointJosekis": [
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


console.log(jsonData);


var boardElement = document.querySelector(".tenuki-board");

//localStorage.setItem("startPath", JSON.stringify([{y:3,x:15}, {pass:true}, {y:2,x:13}]));
//var game = new tenuki.Game({ element: boardElement }, localStorage);

var game = new tenuki.Game({ element: boardElement });

// game.setAutoplay("black"); // AI is white

var controlElement = document.querySelector(".controls");
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
        console.log("Clicked on:", objName);

        // Clearing lines element
        linesElement.innerHTML = "";

        var josekiJson = getJosekiData(objName);

        for(var joseki in josekiJson){
          var josekiButton = document.createElement("a");
          josekiButton.classList.add("btn", "btn-secondary", "mr-2", "mb-2");
          josekiButton.textContent = joseki.name;

          // Add click event listener to log the name of the object
          josekiButton.addEventListener("click", function(objName) {
            return function() {
              console.log(joseki.firstMove)
            };
          }); // Using a closure to capture the current key value

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
  return josekiData[category] || [];
}

