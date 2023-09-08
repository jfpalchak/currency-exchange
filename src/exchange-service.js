
export default class ExchangeService {

  static getConversionRate(usdAmount, targetCurrency) {

    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;

    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          return response.json()
            .then(function(apiResponse) {
              let apiError = apiResponse["error-type"];
              if (response.status === 404){
                apiError = "Currency not found.";
              }
              const errorMessage = `${response.status}: ${apiError}`;
              throw new Error(errorMessage);
            });
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });

  }

  // static method to call ExchangeRate API's supported codes endpoint
  static getSupportedCodes() { 
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`;

    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          return response.json()
            .then(function(apiResponse) {
              const errorMessage = `${response.status}: ${apiResponse["error-type"]}`;
              throw new Error(errorMessage);
            });
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}