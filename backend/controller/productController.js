const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/apiFeatures");

exports.CreateProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const response = await Product.create(req.body);
    res.status(201).json({ message: "Product Created", response: response });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res) => {
  const resultPerPage = 5;
  console.log(`queryy :${req.query.page}`);
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ message: "success", products, productCount });
};

exports.updateProduct = async (req, res) => {
  const productToUpdate = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ msg: "update success", response: productToUpdate });
};
exports.deleteProduct = async (req, res, next) => {
  const proudctToDel = await Product.findById(req.params.id);
  if (!proudctToDel) {
    next(new ErrorHandler("Product not found", 404));
    // res.status(500).json({message:'Product not found',response:proudctToDel})
  }
  await proudctToDel.remove();
  res.status(200).json({ message: "Product Deleted", proudctToDel });
};
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    //  return next({message:'Product Not found',statusCode:404});
    //  res.status(500).json({message:'Product not found',response:product})
  }
  res.status(200).json({ message: "success", product });
};
