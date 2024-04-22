var express = require("express");
const { createVnpayOrder, vnpayReturn } = require("../controllers/vnpayController");
var router = express.Router();

router.post("/create_payment_url", createVnpayOrder);
router.get("/vnpay_return", vnpayReturn);

module.exports = router;