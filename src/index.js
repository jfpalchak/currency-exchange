import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { getConversionRate, getSupportedCodes } from './js/exchange';

// UI LOGIC //

// Create dropdown selection for all available currencies, 
// both for Base Currency (default USD), and Target Currency (default EUR)
export function createSelectionForms(currencies) {
  const selectBaseCurrency = document.querySelector('select#base-code');
  const selectTargetCurrency = document.querySelector('select#target-code');
  selectBaseCurrency.append(createOptions(currencies, "USD"));
  selectTargetCurrency.append(createOptions(currencies, "EUR"));
}

// For each supported currency, create a select form option element, and return those elements.
// Takes two parameters: an array of currencies and their corresponding codes,
// and a parameter that specifies which currency to set as the default select option.
function createOptions(currencies, setDefault) {

  const optionGroup = document.createElement('optgroup');
  optionGroup.label = "Supported Currency";

  currencies.forEach((currency) => {
    let option = document.createElement('option');
    option.value = currency[0];
    console.log(option.value);
    option.innerText = currency[1];

    // Set default select option
    if (option.value === setDefault) {
      option.selected = true;
    }

    optionGroup.append(option);
    
  });

  return optionGroup;
}

// Clear displayed results
function clearResults() {
  document.querySelector("p#error-head").innerText = null;
  document.querySelector("p#error-body").innerText = null;
  document.querySelector("p#query-result").innerText = null;
  document.querySelector('input#target-amount').value = null;
}

// Display conversion data in DOM for user specified currency query
export function displayConversion(response) {
  document.getElementById('target-amount').value = response["conversion_result"];

  const base = response["base_code"];
  const target = response["target_code"];
  const rate = response["conversion_rate"];

  const message = `1 ${base} equals: <h4>${rate} ${target}</h4>`;

  document.querySelector("p#query-result").innerHTML = message;

}

// Display error messages in DOM for user specified currency query
export function displayError(error, base, query) {
  const errorHead = `There was an issue getting the conversion rate for "${base}" to "${query}":`;

  // Clear user instructions to display error, if error on initial site visit
  document.querySelector("p#query-result").innerHTML = null;

  document.querySelector("p#error-head").innerText = errorHead;
  document.querySelector("p#error-body").innerText = `${error}`;
}

// Handle all UI Logic
function handleEverything() {

  // Call ExchangeService API to create dropdown menus
  getSupportedCodes();

  // Handle form submission
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const baseCurrency = document.querySelector("select#base-code").value;
    const baseAmount = document.querySelector("input#base-amount").value;
    const targetCurrency = document.querySelector("select#target-code").value;

    if (!baseAmount || baseAmount < 0) {
      return null;
    }

    clearResults();

    // Call ExchangeService API to receive and display conversion data
    getConversionRate(baseAmount, baseCurrency, targetCurrency);

  });

}

window.addEventListener("load", handleEverything);