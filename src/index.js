import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';



// BUSINESS LOGIC

export function getConversionRate(usd, target) {

  ExchangeService.getConversionRate(usd, target)
    .then((conversion) => {
      if (conversion.result === "success") {
        displayConversion(conversion);
      } else {
        displayError(conversion);
      }
    });

}

// UI LOGIC

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