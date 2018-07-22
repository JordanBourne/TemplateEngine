const express = require("express");
const router = express.Router();

/**** Load routes from the /routes/ folder ****/
router.use(require("./routes/dynamicTitle"));

module.exports = router;
