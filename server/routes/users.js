var express = require("express");
var router = express.Router();
const {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
  finalRegister,
} = require("../controllers/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

/* GET users listing. */
router.post("/register", register);
router.get("/finalregister/:token", finalRegister);
router.post("/login", login);
router.get("/current", verifyAccessToken, getCurrent);
router.post("/refreshtoken", refreshAccessToken);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/", verifyAccessToken, isAdmin, getUsers);
router.delete("/", verifyAccessToken, isAdmin, deleteUser);
router.put("/current", verifyAccessToken, updateUser);
router.put("/address", verifyAccessToken, updateUserAddress);
router.put("/cart", verifyAccessToken, updateCart);
router.put("/:uid", verifyAccessToken, isAdmin, updateUserByAdmin);

module.exports = router;
