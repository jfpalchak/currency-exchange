import ExchangeService from './../services/exchange-service.js';
import { displayConversion, displayError, createSelectionForms} from './../index.js';

// call ExchangeService API Pair Conversion endpoint, display conversion data in DOM
// otherwise, display error for bad get
export function getConversionRate(baseAmount, baseCode, queryCode) {

  ExchangeService.getConversionRate(baseAmount, baseCode, queryCode)
    .then((conversion) => {
      if (conversion.result === "success") {
        displayConversion(conversion, baseCode, queryCode);
      } else {
        displayError(conversion, baseCode, queryCode);
      }
    });
}

// call ExchangeService API Supported Codes endpoint, and add data to session storage
// otherwise, display error for bad get
export async function getSupportedCodes() {
  
  const currencies = await ExchangeService.getSupportedCodes();

  if (currencies.result === "success"){
    createSelectionForms(currencies["supported_codes"]);
  } else {
    displayError(currencies, "Supported Currencies");
  }
}