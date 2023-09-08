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

// call ExchangeService API Pair Conversion endpoint, display conversion data in DOM
// otherwise, display error for bad get
export function getConversionRate(baseAmount, baseCode, queryCode) {

  ExchangeService.getConversionRate(baseAmount, baseCode, queryCode)
    .then((conversion) => {
      if (conversion.result === "success") {
        displayConversion(conversion);
      } else {
        displayError(conversion, queryCode);
      }
    });

  console.log('GET CONVERSION');  // !!!!!!
}

// call ExchangeService API Supported Codes endpoint, and add data to session storage
// otherwise, display error for bad get
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

// For each currency, add code and corresponding country name to session storage
export function addToSessionStorage(currencies) {

  sessionStorage.clear(); // clear storage, just in case

  currencies.forEach((currency) => {
    sessionStorage.setItem(currency[0], currency[1]);
  });

  console.log("Added to storage."); // !!!!!!!!
}

// UI LOGIC

// Create dropdown selection for all available currencies, 
// both for Base Currency (default USD), and Target Currency (default USD)
function createSelectionForms() {
  const selectBase = document.querySelector('select#base-code')
  const selectTarget = document.querySelector('select#target-code');
  selectBase.append(createCurrencyOptions());
  selectTarget.append(createCurrencyOptions());
}

// Create select option elements for all available currencies, found in session storage.
// If session storage is empty:
// call ExchangeService API to GET supported currency codes and add to session storage.
function createCurrencyOptions() {
  if (!sessionStorage.length) {
    getSupportedCodes();
  }

  const optionGroup = document.createElement('optgroup');
  optionGroup.label = "Supported Currency";

  Object.keys(sessionStorage).sort().forEach((code) => {
    let option = document.createElement('option');
    option.value = code;
    option.innerText = sessionStorage.getItem(code);

    // Set default selection to USD
    if (code === "USD") {
      option.selected = true;
    }

    optionGroup.append(option);
  });

  return optionGroup;
}

// display conversion data in DOM for user specified currency query
function displayConversion(response) {
  document.querySelector("p#query-result").innerText = `$${response["conversion_result"]}`;
  document.getElementById('target-amount').value = response["conversion_result"];
}

// display error messages in DOM for user specified currency query
function displayError(error, query) {
  const errorHead = `There was an issue getting the conversion rate for "${query}":`;
  document.querySelector("p#error-head").innerText = errorHead;
  document.querySelector("p#error-body").innerText = `${error}`;
}

// clear displayed results
function clearResults() {
  document.querySelector("p#error-head").innerText = null;
  document.querySelector("p#error-body").innerText = null;
  document.querySelector("p#query-result").innerText = null;


  // document.querySelector("input#usd-amount").value = null;
  document.querySelector('input#target-amount').value = null;

}

// handle all UI Logic
function handleEverything() {

  // create dropdown selection for all available currencies
  createSelectionForms();
  
  // handle form submission
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    clearResults();

    const baseCurrency = document.querySelector("select#base-code").value;
    const baseAmount = document.querySelector("input#usd-amount").value;
    const targetCurrency = document.querySelector("select#target-code").value;

    if (!baseAmount || baseAmount < 0) {
      return null;
    }

    getConversionRate(baseAmount, baseCurrency, targetCurrency);

  });

}

// Wait for resources
window.addEventListener("load", handleEverything);