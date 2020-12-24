// Write your JavaScript code here!

window.addEventListener("load", function() {
   // put DOM code here to ensure elements have been loaded
   console.log('window loaded');
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const div = document.getElementById("missionTarget");  
         //let index = Math.floor(Math.random()*json.length);
         //let data = json[index];
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

   //let listView = document.getElementById("faultyItems").style.visibility = "hidden";
   //let listView = document.getElementById("faultyItems");
   let form = document.querySelector("form");
   let fuelStatusChange = document.getElementById("fuelStatus");
   let cargoStatusChange = document.getElementById("cargoStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   
   form.addEventListener("submit", function(event) {

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let launchStatusChange = document.getElementById("launchStatus");

      
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "" ){
         alert("Please fill all fields!");
         //Stop the form submission
         event.preventDefault();
      }

      //else if (typeof pilotNameInput.value === NaN || typeof copilotNameInput.value === NaN || typeof fuelLevelInput.value !== NaN || typeof cargoMassInput.value !== NaN ){
      else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)){
         alert("Please make sure to use valid data types!");
         //Stop the form submission
         event.preventDefault();
      }

      else{

         if (fuelLevelInput.value < 10000 && cargoMassInput.value < 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            pilotStatus.innerText = `Pilot ${pilotNameInput.value} Ready`;
            copilotStatus.innerText = `CoPilot ${copilotNameInput.value} Ready`;
            fuelStatusChange.innerText = "There is not enough fuel for this journey.";
            launchStatusChange.innerText = "Shuttle not ready for launch.";
            launchStatusChange.style.color = "red";
            event.preventDefault();
         }
         
         else if (fuelLevelInput.value > 10000 && cargoMassInput.value > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            pilotStatus.innerText= `Pilot ${pilotNameInput.value} Ready`;
            copilotStatus.innerText = `CoPilot ${copilotNameInput.value} Ready`;
            cargoStatusChange.innerText = "There is too much mass for the shuttle to take off.";
            launchStatusChange.innerText = "Shuttle not ready for launch.";
            launchStatusChange.style.color = "red";
            event.preventDefault();
         }

         else if (fuelLevelInput.value < 10000 && cargoMassInput.value > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            pilotStatus.innerText = `Pilot ${pilotNameInput.value} Ready`;
            copilotStatus.innerText = `CoPilot ${copilotNameInput.value} Ready`;
            fuelStatusChange.innerText = "There is not enough fuel for this journey.";
            cargoStatusChange.innerText = "There is too much mass for the shuttle to take off.";
            launchStatusChange.innerText = "Shuttle not ready for launch.";
            launchStatusChange.style.color = "red";
            event.preventDefault();
         }

         else{
            launchStatusChange.style.color = "green";
            launchStatusChange.innerText = "Shuttle is ready for launch.";
            event.preventDefault();
            }

      }
   });
});

