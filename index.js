'use strict';
const APIKEY = '7b1b143dc07246fb87d53816233112';
let currentWether = document.getElementById('parent');
let children = document.getElementById('children');
let btnClick = document.getElementById('click');
let inputSearch = document.getElementById('search');
/* Start Navbar */

// Toggle Class Active
let links = document.querySelectorAll('li.nav-item');
links[0].classList.add('active');

//forEach return undefind ⭐⭐⭐⭐⭐
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Remove 'active' class from all links
    links.forEach((otherLink) => {
      otherLink.classList.remove('active');
    });
    // Add 'active' class to the clicked link
    link.classList.add('active');
    console.log(link);
  });
});

// Start Integrations API get Current Weather

function getWether(qeury = 'alex') {
  let data = new XMLHttpRequest();
  data.open(
    'GET',
    `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${qeury}&days=7`
  );
  data.send();
  data.addEventListener('readystatechange', function () {
    if (data.readyState === 4 && data.status === 200) {
      let res = JSON.parse(data.response);
      display(res);
    }
  });
}
getWether();

// Display Data
function display(res) {
  /* Sart Cuurent Time */

  // Split Day And Month
  let localData = convertLocalTime(res.location.localtime);
  let dateNow = localData.split(' ');
  let [day, month] = dateNow;
  let distract = res.current;
  // Start Dsiplay
  let data = `   <div class="inner ">
                  <div
                    class="header-wether d-flex justify-content-between align-items-center p-2  "
                  >
                    <p class="mb-0">${day}</p>
                    <p class="mb-0">${month}</p>
                  </div>
                  <div class="body-wether px-3 py-3 today">
                    <p class="location">${res.location.name}</p>
                    <div
                      class="temp d-flex justify-content-start gap-4 justify-content-lg-center align-items-center"
                    >
                      <p class="counter mb-0">${distract.temp_c}<sup>o</sup></p>
                      <figure class="mb-0 w-50">
                        <img
                          class="w-75 w-40"
                          src="${distract.condition.icon}"
                          alt="temp"
                        />
                      </figure>
                    </div>
                  </div>
                  <div class="foot-wether px-3 d-flex gap-3 flex-wrap justify-content-between align-items-center">
                    <div class="icon d-flex justify-content-between gap-3">
                    <figure>
                      <img src="./images/icon-umberella.png" alt="Sunny" />
                    </figure>
                      <p>${distract.precip_mm}%</p>
                    </div>
                    <div class="icon d-flex justify-content-between gap-3">
                    <figure>
                    <img src="./images/icon-compass.png" alt="Sunny" />
                    </figure>
                    <p>${distract.wind_dir}</p>
                    </div>
                    <div class="icon d-flex justify-content-between gap-3">
                    <figure>
                      <img src="./images/icon-wind.png" alt="gust_kph" />
                    </figure>
                      <p>${distract.gust_kph} km/h</p>
                    </div>
                    <p class="ms-auto">last update <span class="">: ${distract.last_updated}<span/> </p>
                  </div>
                </div>`;
  currentWether.innerHTML = data;

  // Start History Wether
  let historyDays = res.forecast.forecastday;
  // Remove first Daye becouse i have cuurent day
  historyDays.shift();
  let cartona = ``;
  historyDays.forEach((day) => {
    cartona += `
        <div class=" col-2 child text-center ">
                <div class="inner ">
                  <div class="header-wether p-2">
                    <p class="mb-0">Monday</p>
                  </div>
                  <div class="body-wether p-0 p-md-3  text-center">
                    <figure class="mb-5 w-75 m-auto">
                      <img class="w-100 " src=${day.day.condition.icon} alt="temp" />
                    </figure>
                    <p class="counter mb-3">${day.day.maxtemp_c}<sup>o</sup>6</p>
                    <p class="counter ">${day.day.mintemp_c}</p>
                  </div>
                </div>
              </div>
            
      `;
  });
  children.innerHTML = cartona;

  getLastItemToAddClassLast();
}

function getLastItemToAddClassLast() {
  let allItem = document.querySelectorAll('.col-2');
  for (let i = 0; i < allItem.length; i += 2) {
    allItem[i].classList.add('activeItem');
  }
  allItem[allItem.length - 1].classList.add('lastItem');
}

// Convert LocalDate To named Date
function convertLocalTime(localdata) {
  // Start Get Day
  var dateString = localdata;
  var date = new Date(dateString);
  var dayOfWeek = date.getDay();
  var month = date.getMonth();
  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  // Start Month
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var dayName = dayNames[dayOfWeek];
  var monthName = monthNames[month];
  return dayName + ' ' + monthName;
}

// Get Weather When User Searching
inputSearch.addEventListener('blur', getInput);
function getInput() {
  let e = inputSearch.value;
  getWether(e);
}
// CLick to Btn To Run Input Search
btnClick.addEventListener('click', getInput);