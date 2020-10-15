import css from "./css/style.css";
import debounce from 'lodash.debounce'

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";

import countryList from './template/countryList.hbs'
import oneCountry from './template/oneCountry.hbs'

function notification() {
  error({
    title: "ATTENTION",
    text: "Too many matches found. Please enter a more specific query!",
    addClass: 'notificationFont',
    delay: 3000,
    // hide: false,
    // remove: true
    // modules: new Map([
    //   [
    //     Confirm,
    //     {
    //         confirm: true,
    //       buttons: [
    //         {
    //               text: "Ok",
    //           primary: true,
    //           click: notice => {
    //               notice.close();
    //                          }
    //           }
    //       ]
    //     }
    //   ]
    // ])
  });
}



const foundСountries = document.querySelector('.foundСountries')
const searchInput = document.getElementById('searchInput')

let baseUrl = `https://restcountries.eu/rest/v2/name/`

searchInput.addEventListener('input', debounce((e)=>{
  getData(e.target.value)
}, 500))

function getData(name){
  let url = `${baseUrl}${name}`
  fetch(url)
  .then(response=> response.json())
    .then(data => {
      if (data.length >= 10) { notification() }
      else if (data.length === 1) {
        insertAloneCountries(data, foundСountries)
      console.log(data);
      }
      else { insertCountriesList(data, foundСountries) }
      
    })
  
}

function insertCountriesList(data, place){
  const countryItem = countryList(data)
  place.innerHTML=countryItem
}

function insertAloneCountries(data, place){
  const aloneCountry = oneCountry(data)
   place.innerHTML =aloneCountry
}
// const App = document.getElementById("app");

// App.innerHTML = `
{/* <div class="container">
  <h1>PNotify 5 in Vanilla ES6!</h1>
  <button>Notify me!</button>
</div>
`;

App.querySelector("button").addEventListener("click", notification); */}
