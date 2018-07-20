var express = require('express');
var router = express.Router();

/**** Load routes from the /routes/ folder ****/
router.use(require('./routes/dynamicTitle'));

module.exports = router;
