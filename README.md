# _Currency Exchanger_

#### By _**Joey Palchak**_

#### _A currency exchange web application, utilizing the [Exchange Rate API](https://www.exchangerate-api.com/)._

## Technologies Used

* HTML
* CSS
* JavaScript
* Fetch API
* Exchange Rate API
* Node v16.13.1
* npm v8.1.2
* webpack v4.46.0

## Description

This JavaScript web application provides a simple, user-friendly way to calculate exchange rates between different currencies. It leverages the [Exchange Rate API](https://www.exchangerate-api.com/) to fetch real-time conversion data.

The application features a straightforward interface where users can select a base currency, enter an amount they wish to convert, and choose a target currency to convert to. Upon clicking the "Exchange" button, the equivalent amount in the selected target currency is displayed, accompanied by the current exchange rate. 

Upon the user's initial visit, the page will display the default base currency to USD (United States Dollar), and the default target currency to EUR (Euro).

In addition, the application dynamically generates dropdown menus that list all available currencies, allowing users to conveniently select both base and target currencies from a comprehensive selection.

## Setup/Installation Requirements

1. Copy the **[URL](https://github.com/jfpalchak/currency-exchange.git)** provided for this repository.
2. Open Terminal.
3. Change your working directory to where you want the cloned directory.
4. In your terminal, type `git clone` and use the copied URL from Step 1. 
   1. Or, you can copy the following git command:

    ```bash
    $ git clone https://github.com/jfpalchak/currency-exchange.git
    ```

1. For the application to properly function, you'll need to get your own key for the project's API: visit the API's [website here](https://www.exchangerate-api.com).
2. On the site's front page, you'll need to create an account by entering your email and clicking 'Get Free Key!'.
3. You'll be prompted to create an account with your email and a password. Agree to the terms of use and click "Get Started!"
4. Next, you'll be presented with a dashboard that includes your API key.
5. Copy the provided API key.
6. Navigate to the root of the newly cloned directory.
7. In the project's root directory, create an `.env` file.
8. In the `.env` file, create the following variable at the top line:

```javascript
API_KEY=[YOUR-API-KEY-HERE]
```
> [YOUR-API-KEY-HERE] should be replaced with the the API Key you received (make sure to remove the brackets as well).

> In the project's .gitignore, .env should already be present.


11.  In your terminal, assuming Node.js and npm is installed, type the following command to install the project's dependencies found in `package.json`:

```bash
$ npm install
```

12. With the dependencies installed, type the following line in your terminal to build the application using webpack:

```bash
$ npm run build
```

* Additionally, if you wish to:
    1. Lint the JavaScript source code, you can do so by running ESLint the following command in the   application's root directory: 
    > `$ npm run lint`
    2. Run tests on the backend JavaScript with Jest, you can do so by running the following command in the application's root directory: 
    > `$ npm run test`

12. And finally, to run a live server of the project, type the following line in your terminal:

```bash
$ npm run start
```

## Known Bugs

* _No known bugs at this time. If any bugs are discovered, please contact the author._

## License

MIT License

Copyright (c) _9/08/2023_ _Joey Palchak_

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.