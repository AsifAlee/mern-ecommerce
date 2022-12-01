const express = require("express");
const {
  getProducts,
  CreateProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/productController");
const {
  isAuthenticatedUser,
  isAuthorizedRoled,
} = require("../utils/isAuthenticatedUser");

const router = express.Router();
router.route("/products").get(getProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, isAuthorizedRoled("admin"), CreateProduct);
router
  .route("/products/:id")
  .put(isAuthenticatedUser, isAuthorizedRoled("admin"), updateProduct)
  .get(getSingleProduct)
  .delete(deleteProduct, isAuthenticatedUser, isAuthorizedRoled("admin"));

module.exports = router;
