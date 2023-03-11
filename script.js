const API_KEY = "c54a81b5-7812-4518-bfe8-2a486e7a1e3c";

const BtnHandler = () => {
  console.log("handle click event");
};

document
  .getElementById("countries-list-btn")
  .addEventListener("click", BtnHandler);

const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderCountries = async () => {
  try {
    const data = await getCountries();
    const countriesList = document.getElementById("countries-list");
    const ulCountriesList = countriesList.children[2];
    ulCountriesList.innerHTML = "";
    data.countries.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

document
  .getElementById("countries-list-btn")
  .addEventListener("click", renderCountries);

document
  .getElementById("languages-list-btn")
  .addEventListener("click", BtnHandler);

const getLanguages = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderLanguages = async () => {
  try {
    const data = await getLanguages();
    const languagesList = document.getElementById("languages-list");
    const ulLanguagesList = languagesList.children[2];
    ulLanguagesList.innerHTML = "";
    data.languages.forEach((languages, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
              <div class="li-wrapper">
                  <div class="li-title">${languages.name}</div>
                  <div>Code: ${languages.code}</div>
              </div>`;
      ulLanguagesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

document
  .getElementById("languages-list-btn")
  .addEventListener("click", renderLanguages);

const search = document.getElementById("search-query");
const year = document.getElementById("year-query");
const month = document.getElementById("month-query");
const day = document.getElementById("day-query");
const country = document.getElementById("country-query");
const language = document.getElementById("language-query");

document.getElementById("holidays-btn").addEventListener("click", BtnHandler);

const getHolidays = async () => {
  try {
    let queryString = "";
    if (search.value) {
      queryString += `&search=${search.value}`;
    }
    if (year.value) {
      queryString += `&year=${year.value}`;
    } else {
      queryString += `&year=2021`;
    }
    if (month.value) {
      queryString += `&month=${month.value}`;
    }
    if (day.value) {
      queryString += `&day=${day.value}`;
    }
    if (country.value) {
      queryString += `&country=${country.value}`;
    } else {
      queryString += `&country=VN`;
    }
    if (language.value) {
      queryString += `&language=${language.value}`;
    }
    const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderHolidays = async () => {
  try {
    const data = await getHolidays();
    const holidaysList = document.getElementById("holidays-list");
    const ulHolidaysList = holidaysList.children[1];
    ulHolidaysList.innerHTML = "";
    data.holidays.forEach((holidays, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${holidays.name}</div>
                <div>${holidays.weekday.date.name} - ${holidays.date}</div>
            </div>`;
      ulHolidaysList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

document
  .getElementById("holidays-btn")
  .addEventListener("click", renderHolidays);
