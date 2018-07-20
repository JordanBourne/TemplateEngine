const express = require("express");
const router = express.Router();

/**** listen on baseUrl/dynamicTitle for get requests ****/
/**** Example url: localhost:3000/test/dynamicTitle/testing ****/
router.get("/dynamicTitle/:title", renderTitle);

module.exports = router;

function renderTitle (req, res, next) {
    /**** Render page with the param as the title ****/
    res.render("dynamicTitle", { title: req.params.title });
}
