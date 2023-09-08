import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';



// BUSINESS LOGIC

export function getConversionRate(usd, query) {

  ExchangeService.getConversionRate(usd, query)
    .then((conversion) => {
      if (conversion.result === "success") {
        displayConversion(conversion);
        // console.log("Success!");
        // console.log(conversion);
      } else {
        displayError(conversion, query);
      }
    });

}

// UI LOGIC

// display conversion data in DOM for user specified currency query
function displayConversion(response) {
  document.querySelector("p#query-result").innerText = response["conversion_result"];
}

// display error messages in DOM for user specified currency query
function displayError(error, query) {
  const errorHead = `There was an issue getting the conversion rate for "${query}":`;
  document.querySelector("p#error-head").innerText = errorHead;
  document.querySelector("p#error-body").innerText = `${error.message}`;
}

// handle all UI Logic
function handleEverything() {

  // handle form submission
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const usdAmount = document.querySelector("input#usd-amount").value;
    const targetCurrency = document.querySelector("input#target-currency").value;

    getConversionRate(usdAmount, targetCurrency);

  });

}

// Wait for resources
window.addEventListener("load", handleEverything);