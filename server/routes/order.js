var express = require("express");
var router = express.Router();
const { createNewOrder } = require("../controllers/orderController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

/* GET users listing. */
router.post("/",verifyAccessToken, createNewOrder);


module.exports = router;
