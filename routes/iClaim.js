var express = require('express');
var router = express.Router();
const request_line=require("line-notify-nodejs")
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var controller = require('../controllers/iClaim');
router.get('/list', controller.iclaim_get_date);
router.get('/list/log', controller.iclaim_get_log);
router.post('/insert', controller.iclaim_insert_date);
router.post('/insert/log', controller.iclaim_insert_log);
router.get('/list/hospital', controller.iClaim_get_name_hospital);




module.exports = router;