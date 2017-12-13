let countries = [];

const app = function () {



// MAKE DROPDOWN
  const dropdown = document.querySelector('#dropdown');
  const url = 'https://restcountries.eu/rest/v2/all';
  // dropdown.addEventListener('click', populateDropDown());
  makeRequest(url, requestComplete);


// this is getting the country back form local localStorage. 
  const country = JSON.parse(localStorage.getItem('country'));
  getCountryInfo(country);

  const dropDown = document.querySelector('#dropdown');
  dropDown.addEventListener('change', function () {
    const country = countries[this.value];
    getCountryInfo(country);
    save(country);
  });

}

const save = function(country){
  // const countryInfo = JSON.parse(localStorage.getItem('country'));
  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);

};

const getCountryInfo = function (country) {
  const select = document.querySelector('#name');
  const nameStringy = JSON.stringify(country.name);
  select.innerText = nameStringy;

  const population = document.querySelector('#population');
  const popStringy = JSON.stringify(country.population);
  population.innerText = 'population: '+  popStringy;

  const capitalCity = document.querySelector('#capitalCity');
  const capStringy = JSON.stringify(country.capital);
  capitalCity.innerText = 'capital: '+  capStringy;

  console.log(country);
}


const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('load',callback);
}

const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString =this.responseText;
  countries = JSON.parse(jsonString);
  populateDropDown(countries);
}

const populateDropDown = function (countries) {
  const select = document.querySelector('#dropdown');
    countries.forEach(function (country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });
}





document.addEventListener('DOMContentLoaded', app);
