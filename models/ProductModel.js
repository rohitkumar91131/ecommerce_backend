import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    base64Url:{
      type : String
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Fashion", "Books", "Others"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
