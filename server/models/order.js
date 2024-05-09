const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
        discount: String,
        price: Number,
        thumbnail: String,
        title: String,
      },
    ],
    status: {
      type: String,
      default: "Proccessing",
      enum: ["Cancelled", "Proccessing", "Shipping", "Successed"],
    },
    totalPriceProducts: {
      type: Number,
    },
    transportFee: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    coupons: {
      type: Number,
    },
    total: {
      type: Number,
    },
    message: {
      type: String,
    },
    paymentMethods: {
      type: String,
    },
    address: {
      type: String,
    },
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
