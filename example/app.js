const express = require("express");
const app = express();

/**** replace require statement with require("jbt") ****/
const jbt = require("../index");

const routes = require("./routes");

/**** Creates jbt engine ****/
jbt.create(app);

/**** Load in routes from routes.js and sets base url to /test ****/
app.use("/test", routes);

/**** Replace ./views with location of .jbt templates ****/
app.set("views", "./views");

/**** Sets view engine to jbt ****/
app.set("view engine", "jbt");

/**** Start test server on port 3000 ****/
app.listen(3000, function() {
	console.log("hello world");
});
