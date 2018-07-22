# Project Title

JBT-Express is an open-source templating engine for Express.js

## Installation

To install jbt-express first run:

```
npm insall --save jbt-express
```

Then in the file your express app is set up in, add these three lines (assuming `app = express()` was set earlier)

```
const jbt = require("jbt-express");

app.set("view engine", "jbt");
app.set("views", "./views");
```

This will set up express such that it looks in the /views/ directory in the same level as the app settings.

## How To Use

In the /views/ directory, create a .jbt file and wherever templating is required, drop a variable name inside tokens like this `<| exampleVar |>`. Next in the express route that is delivering the page, use `res.render` to return the page, and add any variables needed to the second parameter as keys in an object like so:

```
const router = express.Router();
router.get("/example", renderTitle);

function renderTitle (req, res, next) {
    res.render("dynamicTitle", { exampleVar: "Hello World" });
}
```

## Features

*Currently Supported*
* Simple variables passed in from Options
* Simple operations such as string and number arithmetic
* Support for Objects and Arrays within Options

*To Be Added*
* Declaring and updating variables within scope of .jbt file
* Loops and conditionals

## How To Contribute

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project will require you have Node and NPM installed already. You can verify these are installed by typing the following into the terminal:

```
node -v
npm -v
```

### Installing

How to get set up:

Clone the Repo:

```
git clone https://github.com/JordanBourne/TemplateEngine
```

Run NPM install

```
NPM install
```

To verify everything is set up properly, run the tests as shown below.

### Running the tests

To run all the tests, in the root directory:

```
mocha --recursive
```

### Break down into end to end tests

```
mocha --recursive -g "E2E::"
```

Full End to End test which sets up an instance of a Nodejs server on port 3000 and a basic route to verify the templating engine is working.

```
mocha --recursive -g "Lexer::"
```

This is where the majority of the work is being done. Run these tests to verify the template is finding and parsing properly.

### Built With

* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [NPM](https://www.npmjs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
