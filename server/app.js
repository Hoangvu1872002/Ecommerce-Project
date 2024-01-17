var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var productCategorysRouter = require("./routes/productCategorys");
var blogCategorysRouter = require("./routes/blogCategorys");
var blogsRouter = require("./routes/blogs");
var brandsRouter = require("./routes/brand");
var couponsRouter = require("./routes/coupon");
var ordersRouter = require("./routes/order");
var insertRouter = require("./routes/insert");

const { errorsMiddleware } = require("./middlewares/errorsMiddleware");
const dbConnect = require("./config/database");

dbConnect();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// app.use((req, res, next) => {
//   const originalCookieFunction = res.cookie;
// console.log('a');
//   res.cookie = function (name, value, options) {
//     // Thay đổi domain từ "127.0.0.1" sang "localhost" tại đây nếu cần thiết
//     if (options && options.domain === '127.0.0.1') {
//       options.domain = 'localhost';
//     }
    
//     // Gọi hàm cookie ban đầu
//     originalCookieFunction.call(this, name, value, options);
//   };

//   next();
// });


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/products-category", productCategorysRouter);
app.use("/blogs-category", blogCategorysRouter);
app.use("/blogs", blogsRouter);
app.use("/brands", brandsRouter);
app.use("/coupons", couponsRouter);
app.use("/orders", ordersRouter);
app.use("/inserts", insertRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorsMiddleware);

module.exports = app;
