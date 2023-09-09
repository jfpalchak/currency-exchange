import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { getConversionRate, getSupportedCodes } from './js/exchange';

// TODO++ : Implement saving conversion rates to session storage.

// UI LOGIC //

// Create dropdown selection for all available currencies, 
// both for Base Currency (default USD), and Target Currency (default EUR)
function createSelectionForms() {
  const selectBaseCurrency = document.querySelector('select#base-code');
  const selectTargetCurrency = document.querySelector('select#target-code');
  selectBaseCurrency.append(createCurrencyOptions("USD"));
  selectTargetCurrency.append(createCurrencyOptions("EUR"));
}

// Create select form option elements for all available currencies found in session storage.
// Takes a parameter that specifies which currency to set as the default option.
// If session storage is empty:
// call ExchangeService API to GET supported currency codes and add to session storage.
function createCurrencyOptions(setDefault) {
  if (!sessionStorage.length) {
    getSupportedCodes();
  }

  const optionGroup = document.createElement('optgroup');
  optionGroup.label = "Supported Currency";

  Object.keys(sessionStorage).sort().forEach((code) => {
    let option = document.createElement('option');
    option.value = code;
    option.innerText = sessionStorage.getItem(code);

    // Set default select option
    if (code === setDefault) {
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

  const base = sessionStorage.getItem(response["base_code"]);
  const target = sessionStorage.getItem(response["target_code"]);
  const rate = response["conversion_rate"];

  const message = `1 ${base} equals: <h4>${rate} ${target}</h4>`;

  document.querySelector("p#query-result").innerHTML = message;

}

// Display error messages in DOM for user specified currency query
export function displayError(error, base, query) {
  const errorHead = `There was an issue getting the conversion rate for "${base}" to "${query}":`;

  document.querySelector("p#error-head").innerText = errorHead;
  document.querySelector("p#error-body").innerText = `${error}`;
}

// Handle all UI Logic
function handleEverything() {

  createSelectionForms();
  
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

    getConversionRate(baseAmount, baseCurrency, targetCurrency);

  });

}

window.addEventListener("load", handleEverything);