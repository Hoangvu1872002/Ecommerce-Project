const { response } = require("express");
const productModel = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color } = req.body;
  const thumb = req.files?.thumb[0]?.path;
  const images = req.files?.images?.map((e) => e.path);
  if (!(title && price && description && brand && category && color))
    throw new Error("Missing inputs");
  req.body.slug = slugify(req.body.title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const newProduct = await productModel.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    mes: newProduct ? 'Created new product.' : "Cannot create new product.",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await productModel.findById(pid).populate({
    path: "ratings",
    populate: {
      path: "postedBy",
      select: "firstname lastname avatar",
    },
  });
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product.",
  });
});

//filltering, sorting, pagination
const getManyProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // tach ca truong dac biet ra khoi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lai cac operators cho dung cu phap cua mongoes
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};

  //filltering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((e) => ({
      color: { $regex: e, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }
  const q = { ...colorQueryObject, ...formatedQueries };
  let queryCommand = productModel.find(q);

  //sorting
  //abc,efg => [abc,efg] => abc efg
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    queryCommand = queryCommand.sort(sortBy);
  }

  //fields limit
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
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
      const counts = await productModel.find(q).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ? response : "Cannot get products.",
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await productModel.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updateProduct: updatedProduct ? updatedProduct : "Cannot update products.",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const deletedProduct = await productModel.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deleteProduct: deletedProduct ? deletedProduct : "Cannot delete products.",
  });
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid, updateAt } = req.body;
  if (!star || !pid) throw new Error("Missing inputs.");
  const ratingProduct = await productModel.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (e) => e.postedBy.toString() === _id
  );
  if (alreadyRating) {
    //update star & comment
    await productModel.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updateAt": updateAt,
        },
      },
      {
        new: true,
      }
    );
  } else {
    //add star & comment
    const response = await productModel.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id, updateAt } },
      },
      { new: true }
    );
  }

  //sum rating
  const updatedProduct = await productModel.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, e) => sum + +e.star,
    0
  );
  updatedProduct.totalRating = Math.round((sumRatings * 10) / ratingCount) / 10;

  const check = await updatedProduct.save();

  return res.status(200).json({
    status: check ? true : false,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs.");
  const response = await productModel.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "Cannot upload images product.",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getManyProduct,
  updateProduct,
  deleteProduct,
  rating,
  uploadImagesProduct,
};
