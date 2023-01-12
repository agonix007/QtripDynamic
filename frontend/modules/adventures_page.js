import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  let city_id = params.get("city");
  return city_id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  city = city.toLowerCase();
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  let data = document.getElementById("data");
  adventures.forEach((item) => {
    data.innerHTML += `<div class="col-6 col-lg-3 mb-3" style="position: relative">
    <a href="detail/?adventure=${item.id}" id="${item.id}">
    <div class="category-banner">${item.category}</div>
      <div class="activity-card">
        <img src="${item.image}" />
        <div class="d-md-flex justify-content-between px-3 pt-3 w-100">
          <h6>${item.name}</h6>
          <span>₹${item.costPerHead}</span>
        </div>
        <div class="d-md-flex justify-content-between px-3 py-2 w-100">
          <h6>Duration</h6>
          <span>${item.duration} Hours</span>
        </div>
      </div>
    </a>
    </div>`;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filter_list = list.filter((item) => {
    if (item.duration >= low && item.duration <= high) {
      return 1;
    }
  });

  return filter_list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filter_list = [];
  categoryList.forEach((key) => {
    list.forEach((item) => {
      if (item.category === key) {
        filter_list.push(item);
      }
    });
  });

  return filter_list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filter_list = [];

  if (!filters.category.length && !filters.duration) {
    filter_list = list;
  } 
  else {
    if (filters.category.length && !filters.duration) {
      filter_list = filterByCategory(list, filters.category);
    } 
    else if (!filters.category.length && filters.duration) {
      let [low, high] = filters.duration.split("-");
      filter_list = filterByDuration(list, low, high);
    } 
    else if (filters.category.length && filters.duration) {
      let [low, high] = filters.duration.split("-");
      let List1 = filterByDuration(list, low, high);
      filter_list = filterByCategory(List1, filters.category);
    }
  }
  // // Place holder for functionality to work in the Stubs
  return filter_list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let parent = document.getElementById("category-list");
  // parent.innerHTML=''
  filters.category.forEach((item) => {
    parent.innerHTML += `<div class="category-filter" onclick="FilterRemover(event)" id="${item}">${item} x </div>`;
  });
}



export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
