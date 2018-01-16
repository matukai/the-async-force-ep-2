console.log('sanitycheck');

let userInput = document.getElementById('resourceId');
let idNum = null;
let type = document.getElementById('resourceType');
let userButton = document.getElementById('requestResourceButton').addEventListener('click', reqListener);

function reqListener() {

  idNum = parseFloat(userInput.value);

  if (type.value === 'people') {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener('load', people);
    oReq.open('GET', 'https://swapi.co/api/people/' + idNum);
    oReq.send();

    function people() {
      let data = JSON.parse(this.response);
      console.log(data.species[0]);

      let name = document.createElement('H2');
      document.body.appendChild(name);
      name.innerHTML = data.name;

      let gender = document.createElement('p');
      name.appendChild(gender);
      gender.innerHTML = data.gender;
 
      let speciesRequest = new XMLHttpRequest();
      speciesRequest.addEventListener('load', getSpecies);
      speciesRequest.open('GET', data.species[0]);
      speciesRequest.send();

      function getSpecies() {
        let speciesName = JSON.parse(this.response);
        let species = document.createElement('p');
        name.appendChild(species);  
        species.innerHTML = speciesName.name;
      } // end getSpecies

    } // end people
  }
  // else if(type.value === 'planet'){
  //   let oReq2 = new XMLHttpRequest();
  //   oReq2.addEventListener('load', planet);
  //   oReq2.open('GET', 'https://swapi.co/api/planet/' + idNum);
  //   oReq2.send();
    
  //   function planet() {
  //     let data = JSON.parse(this.response);
  //     console.log(data);
  //   }

  // }
} // end reqListener