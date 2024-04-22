const orderModel = require("../models/order");
const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");

const createNewOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {
    address,
    coupons,
    message,
    products,
    tax,
    total,
    totalPriceProducts,
    transportFee,
    paymentMethods,
  } = req.body;

  const rs = await orderModel.create({
    address,
    coupons,
    message,
    products,
    tax,
    total,
    totalPriceProducts,
    transportFee,
    paymentMethods,
    orderBy: _id,
  });

  const rsp = await userModel.findByIdAndUpdate(
    _id,
    { cart: [] },
    { new: true }
  );
  console.log(rsp);
  return res.json({
    success: rsp && rs ? true : false,
    rs: rsp && rs ? rs : " Something went wrong.",
  });
});

const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  const { status, q } = queries;
  console.log(queries);

  if (q) {
    const isValidId = ObjectId.isValid(q);
    if (isValidId) {
      const response = await orderModel
        .find({ _id: q, orderBy: _id })
        .populate("orderBy", "firstname lastname mobile");
      return res.status(200).json({
        success: response ? true : false,
        counts: 1,
        order: response ? response : [],
      });
    } else {
      return res.status(200).json({
        success: false,
        counts: 0,
        order: [],
      });
    }
  } else {
    let qr;
    let queryCommand;
    if (status) {
      qr = { status: status, orderBy: _id };
      queryCommand = orderModel
        .find(qr)
        .populate("orderBy", "firstname lastname mobile");
    } else {
      queryCommand = orderModel
        .find({ orderBy: _id })
        .populate("orderBy", "firstname lastname mobile");
    }

    //sorting
    //abc,efg => [abc,efg] => abc efg
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      queryCommand = queryCommand.sort(sortBy);
    }

    //pagination
    //limit: so object lay ve trong 1 l;an goij api
    //skip: bo qua bao nhieu object
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //execute query
    //so luong san pham thoa man dieu kien !== so luong sp tra ve 1 lan goi api
    queryCommand
      .then(async (response) => {
        const counts = await orderModel.find(qr).countDocuments();
        return res.status(200).json({
          success: response ? true : false,
          counts,
          order: response ? response : "Cannot get products.",
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
});

const getAdminOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { status, q } = queries;
  console.log(queries);

  if (q) {
    const isValidId = ObjectId.isValid(q);
    if (isValidId) {
      const response = await orderModel
        .findById(q)
        .populate("orderBy", "firstname lastname mobile");
      return res.status(200).json({
        success: response ? true : false,
        counts: 1,
        order: response ? [response] : [],
      });
    } else {
      return res.status(200).json({
        success: false,
        counts: 0,
        order: [],
      });
    }
  } else {
    let qr;
    let queryCommand;
    if (status) {
      qr = { status: status };
      queryCommand = orderModel
        .find(qr)
        .populate("orderBy", "firstname lastname mobile");
    } else {
      queryCommand = orderModel
        .find()
        .populate("orderBy", "firstname lastname mobile");
    }

    //sorting
    //abc,efg => [abc,efg] => abc efg
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      queryCommand = queryCommand.sort(sortBy);
    }

    //pagination
    //limit: so object lay ve trong 1 l;an goij api
    //skip: bo qua bao nhieu object
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //execute query
    //so luong san pham thoa man dieu kien !== so luong sp tra ve 1 lan goi api
    queryCommand
      .then(async (response) => {
        const counts = await orderModel.find(qr).countDocuments();
        return res.status(200).json({
          success: response ? true : false,
          counts,
          order: response ? response : "Cannot get products.",
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const response = await orderModel.find().select("products status total updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    order: response ? response : "err",
  });
});

module.exports = {
  createNewOrder,
  getUserOrders,
  getAdminOrders,
  getAllOrders,
};
