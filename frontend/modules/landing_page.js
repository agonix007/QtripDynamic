import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
 
  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let res = await fetch(config.backendEndpoint+"/cities");
    let data = await res.json();
    return data;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data = document.getElementById("data");
  let element = document.createElement("div");
  element.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  element.innerHTML = 
  `
  <a href="pages/adventures/?city=${city}" id="${id}">
  <div class="tile">
    <img src="${image}" />
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </div>
  </a>
  `
  data.append(element);
}

export { init, fetchCities, addCityToDOM };
