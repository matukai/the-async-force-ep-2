console.log('sanitycheck');

let userInput = document.getElementById('resourceId');
let idNum = null;
let type = document.getElementById('resourceType');
let userButton = document.getElementById('requestResourceButton').addEventListener('click', reqListener);

function reqListener() {

  idNum = parseFloat(userInput.value);
  console.log(idNum);
  if (type.value === 'people') {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener('load', people);
    oReq.open('GET', 'https://swapi.co/api/people/' + idNum);
    oReq.send();

    function people() {
      let data = JSON.parse(this.response);
      //console.log(data.species[0]);

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
  }else if(type.value === 'planets'){
    let oReq2 = new XMLHttpRequest();
    oReq2.addEventListener('load', planet);
    oReq2.open('GET', 'https://swapi.co/api/planets/' + idNum);
    oReq2.send();
    
    function planet() {
      let data = JSON.parse(this.response);
      //console.log(data);
      let name = document.createElement('h2');
      document.body.appendChild(name);  
      name.innerHTML = data.name;
      let terrain = document.createElement('p');
      name.appendChild(terrain);
      terrain.innerHTML = data.terrain;
      let population = document.createElement('p');
      name.appendChild(population);
      population.innerHTML = data.population;
      let films = document.createElement('ul');
      name.appendChild(films);

      //for each loop through data.films
      data.films.forEach(function (element, index, array){
        //XHR request for films
        let filmsRequest = new XMLHttpRequest();
        filmsRequest.addEventListener('load', getFilms);
        filmsRequest.open('GET', element)
        filmsRequest.send();
        function getFilms() {
          let data = JSON.parse(this.response);
          let listFilms = document.createElement('li');
          films.appendChild(listFilms);
          listFilms.innerHTML = data.title;
        } // end getFilms
      }) // end forEach
    } // end planet
  }else if(type.value === 'starships'){
    let oReq3 = new XMLHttpRequest();
    oReq3.addEventListener('load', starships);
    oReq3.open('GET', 'https://swapi.co/api/starships/' + idNum);
    oReq3.send();

    function starships() {
      let data = JSON.parse(this.response);
      //console.log(data);
      let name = document.createElement('h2');
      document.body.appendChild(name);
      name.innerHTML = data.name;
      let manufacturer = document.createElement('p');
      name.appendChild(manufacturer);
      manufacturer.innerHTML = data.manufacturer;
      let films = document.createElement('ul');
      name.appendChild(films);
      //console.log(data.films);

      //for each loop through data.films
      data.films.forEach(function (element, index, array){
        //XHR request for films
        let filmsRequest = new XMLHttpRequest();
        filmsRequest.addEventListener('load', getFilms);
        filmsRequest.open('GET', element);
        filmsRequest.send();
        function getFilms() {
          let data = JSON.parse(this.response);
          console.log(data);
          let listFilms = document.createElement('li');
          name.appendChild(listFilms);
          listFilms.innerHTML = data.title;
        } // end getFilms
      }) // end for each
    } // end starships
  } //end else if
} // end reqListener