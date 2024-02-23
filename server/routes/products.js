var express = require("express");
var router = express.Router();
const {
  createProduct,
  getProduct,
  getManyProduct,
  updateProduct,
  deleteProduct,
  rating,
  uploadImagesProduct,
} = require("../controllers/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadImage = require("../config/cloudinary.config");

/* GET users listing. */
router.post("/", verifyAccessToken, isAdmin, createProduct);
router.get("/", getManyProduct);
router.put("/rating", verifyAccessToken, rating);

router.put(
  "/upload-image/:pid",
  verifyAccessToken,
  isAdmin,
  uploadImage.array("images", 10),
  uploadImagesProduct
);
router.put("/:pid", verifyAccessToken, isAdmin, updateProduct);
router.delete("/:pid", verifyAccessToken, isAdmin, deleteProduct);
router.get("/:pid", getProduct);

module.exports = router;
