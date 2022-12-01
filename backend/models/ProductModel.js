const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  images: [
    {
      publicId: { type: String, required: true },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    maxLength: [4, "Stock cant be greater than 4 digits"],
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
