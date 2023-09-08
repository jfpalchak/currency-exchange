# _{Application Name}_

#### By _**Joey Palchak**_

#### _{Brief description of application}_

## Technologies Used

* HTML
* CSS
* JavaScript
* Node v16.13.1
* npm v8.1.2
* webpack v4.46.0

## Description

_{This is a detailed description of your application. Give as much detail as needed to explain what the application does as well as any other information you want users or other developers to have.}_

## Setup/Installation Requirements

1. Copy the **[URL](#link)** provided for this repository.
2. Open Terminal.
3. Change your working directory to where you want the cloned directory.
4. In your terminal, type `git clone` and use the copied URL from Step 1. Or, copy the following git command:

```bash
$ git clone [REPO-LINK]
```

5. To get your own key for the project's API, visit the API's [website](#link).
6. On the site's front page, you can create an account by entering your email and clicking 'Get Free Key'.
7. You'll then be prompted to create a password for your account and click 'Get Started!', before being presented with your API Key.
8. Copy the provided API key.
9. Navigate to the root of the newly cloned directory.
10. In the project's root directory, create an `.env` file.
11. In the `.env` file, create the following variable at the top line:

```javascript
API_KEY=[YOUR-API-KEY-HERE]
```
> where [YOUR-API-KEY-HERE] is replaced with the the API Key you received (make sure to remove the brackets as well).

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

### _Alternatively:_

1. Go to the website and access the application directly via **[GitHub Pages](#link)**.

## Known Bugs

* _No known bugs at this time. If any bugs are discovered, please contact the author._

## License

MIT License

Copyright (c) _date_ _Joey Palchak_