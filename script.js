// Write your JavaScript code here!

window.addEventListener("load", function() {
   // put DOM code here to ensure elements have been loaded
   console.log('window loaded');

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {

      const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let launchStatusChange = document.getElementById("launchStatus");
      let fuelStatusChange = document.getElementById("fuelStatus");
      let cargoStatusChange = document.getElementById("cargoStatus");

      if (typeof pilotNameInput.value !== "string" || typeof copilotNameInput.value !== "string" || typeof fuelLevelInput.value !== "number" || typeof cargoMassInput.value !== "number" ){
         //alert("Please make sure to use valid data types!");
         // stop the form submission
         //event.preventDefault();
      }
      else if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "" ){
         //alert("Please fill all fields!");
         //Stop the form submission
         //event.preventDefault();
      }
      
      else if (fuelLevelInput < 10000){
         //document.styleSheets[0].cssRules[2].style.visibility = "visible";
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput} Ready`;
         document.getElementById("copilotStatus").innerText = `CoPilot ${copilotNameInput} Ready`;
         fuelStatusChange.innerText = "There is not enough fuel for this journey.";
         launchStatusChange.innerText = "Shuttle not ready for launch.";
         launchStatusChange.style.color = "red";
         event.preventDefault();
      }
      else if (cargoMassInput > 10000){
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput} Ready`;
         document.getElementById("copilotStatus").innerText = `CoPilot ${copilotNameInput} Ready`;
         cargoStatusChange.innerText = "There is not enough fuel for this journey.";
         launchStatusChange.innerText = "Shuttle not ready for launch.";
         launchStatusChange.style.color = "red";
         event.preventDefault();
      }
      else{
         event.preventDefault();
         launchStatusChange.style.color = "green";
         launchStatusChange.innerText = "Shuttle is ready for launch.";
         fetchPromise.then(function(response){
             response.json().then(function(json){
               const div = document.getElementById("missionTarget");  
               div.innerHTML += `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[5].name}</li>
                  <li>Diameter: ${json[5].diameter}</li>
                  <li>Star: ${json[5].star}</li>
                  <li>Distance from Earth: ${json[5].distance}</li>
                  <li>Number of Moons: ${json[5].moons}</li>
               </ol>
               <img src="${json[5].image}">
               `
            });
         });
      };
   });
});




