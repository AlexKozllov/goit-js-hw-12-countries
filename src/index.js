import css from "./css/style.css";

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";


function notification() {
  error({
    title: "ATTENTION",
    text:
          "Too many matches found. Please enter a more specific query!",
    addClass: 'notificationFont',
    modules: new Map([
      [
        Confirm,
        {
            confirm: true,
          buttons: [
            {
                  text: "Ok",
              primary: true,
              click: notice => {
                  notice.close();
                             }
              }
          ]
        }
      ]
    ])
  });
}

const App = document.getElementById("app");

App.innerHTML = `
<div class="container">
  <h1>PNotify 5 in Vanilla ES6!</h1>
  <button>Notify me!</button>
</div>
`;

App.querySelector("button").addEventListener("click", notification);
