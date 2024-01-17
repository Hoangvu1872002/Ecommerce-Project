const { map } = require("../app");
const orderModel = require("../models/order");
const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await userModel
    .findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const product = userCart?.cart.map((e) => ({
    product: e.product._id,
    count: e.quantity,
    color: e.color,
  }));
  const total = userCart?.cart.reduce(
    (sum, e) => e.product.price * e.quantity + sum,
    0
  );
  if (coupon) total = Math.round((total * (1 - coupon / 100)) / 1000) * 1000;
  const rs = await orderModel.create({product, total, orderBy: _id})
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : " Something went wrong.",
  });
});

module.exports = {
  createNewOrder,
};
