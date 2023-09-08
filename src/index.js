import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

// TODO : Display more data
// TODO : Clean up Error handling
// TODO : Separate backend logic
// TODO+ : Implement cache of API results (if currency is called, save conversion rate)
// TODO+ : Implement multiple conversions.

// BUSINESS LOGIC

export function getConversionRate(usd, query) {

  ExchangeService.getConversionRate(usd, query)
    .then((conversion) => {
      if (conversion.result === "success") {
        displayConversion(conversion);
      } else {
        displayError(conversion, query);
      }
    });

  console.log('GET CONVERSION');  // !!!!!!
}

export function getSupportedCodes() {
  
  ExchangeService.getSupportedCodes()
    .then((currencies) => {
      if (currencies.result === "success"){
        addToSessionStorage(currencies["supported_codes"]);
      } else {
        displayError(currencies, "Supported Currencies");
      }
    });

  console.log('GET CODES'); // !!!!!!
}

// for each currency, add it's code and corresponding country name to session storage
export function addToSessionStorage(currencies) {

  sessionStorage.clear(); // clear storage, just in case

  currencies.forEach((currency) => {
    sessionStorage.setItem(currency[0], currency[1]);
  });

  console.log("Added to storage."); // !!!!!!!!
}

// UI LOGIC

// create dropdown selection for all available currencies
// if session storage is empty, call ExchangeService API to GET supported currency codes and add to session storage
function createSelectionForm() {
  if (!sessionStorage.length) {
    getSupportedCodes();
  }

  const selectForm = document.querySelector('select#target-currency');
  const optionGroup = document.createElement('optgroup');
  optionGroup.label = "Supported Currency";

  Object.keys(sessionStorage).sort().forEach((code) => {
    let option = document.createElement('option');
    option.value = code;
    option.innerText = sessionStorage.getItem(code);
    optionGroup.append(option);
  });
  
  selectForm.append(optionGroup);
}

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

// clear displayed results
function clearResults() {
  document.querySelector("p#error-head").innerText = null;
  document.querySelector("p#error-body").innerText = null;
  document.querySelector("p#query-result").innerText = null;
}

// handle all UI Logic
function handleEverything() {

  // create dropdown selection for all available currencies
  createSelectionForm();
  
  // handle form submission
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    clearResults();

    const usdAmount = document.querySelector("input#usd-amount").value;
    // const targetCurrency = document.querySelector("input#target-currency").value;
    const targetCurrency = document.querySelector("select#target-currency").value;
    getConversionRate(usdAmount, targetCurrency);

  });

}

// Wait for resources
window.addEventListener("load", handleEverything);