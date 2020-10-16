import css from "./css/style.css";
import debounce from "lodash.debounce";

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import countryList from "./template/countryList.hbs";
import oneCountry from "./template/oneCountry.hbs";

const foundСountries = document.querySelector(".foundСountries");
const searchInput = document.getElementById("searchInput");

function notification() {
  error({
    title: "ATTENTION",
    text: "Too many matches found. Please enter a more specific query!",
    addClass: "notificationFont",
    delay: 3000,
  });
}

function countryNotFound() {
  error({
    title: "ATTENTION",
    text: "Country not found",
    addClass: "notificationFont",
    delay: 3000,
  });
}

let baseUrl = `https://restcountries.eu/rest/v2/name/`;

searchInput.addEventListener(
  "input",
  debounce((e) => {
    getData(e.target.value);
  }, 500),
);

function getData(name) {
  if (!name) {
    resetInput(foundСountries)
    return
  }
  let url = `${baseUrl}${name}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Error fetching data')
    })
    .then((data) => {
      markupSelection(data);
    })
    .catch(() => { countryNotFound() });
}

function markupSelection(data) {
  if (data.length >= 10) {
    notification();
  } else if (data.length === 1) {
    insertAloneCountries(data, foundСountries);
  } else {
    insertCountriesList(data, foundСountries);
  }
}

function insertCountriesList(data, place) {
  const countryItem = countryList(data);
  place.innerHTML = countryItem;
}

function resetInput(place) {
  place.innerHTML = ''
}

function insertAloneCountries(data, place) {
  const aloneCountry = oneCountry(data);
  place.innerHTML = aloneCountry;
}
