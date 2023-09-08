export default class ExchangeService {

  static getConversionRate(usdAmount, targetCurrency) {

    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;

    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          return response.json()
            // if response is not OK, grab the API's custom error message
            .then(function(apiResponse) {
              const errorMessage = `${response.status} ${response.statusText}: ${apiResponse["error-type"]}`;
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