export default class ExchangeService {
  
  // static method to call ExchangeRate API's Pair Conversion endpoint
  static getConversionRate(baseAmount, baseCode, targetCode) {

    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${baseCode}/${targetCode}/${baseAmount}`;

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

  // static method to call ExchangeRate API's Supported Codes endpoint
  static async getSupportedCodes() { 

    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`;

    try{
      const response = await fetch(url);
      const jsonResponse = await response.json();

      if (!response.ok) {
        const errorMessage = `${response.status}: ${jsonResponse["error-type"]}`;
        throw new Error(errorMessage);
      }

      return jsonResponse;
    } catch(error) {
      return error;
    }
  }
}