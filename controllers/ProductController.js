import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};



export const filterProducts = async (req, res) => {
  try {
    const { category, query, minPrice, maxPrice } = req.body;

    const mongoQuery = {};

    if (category && category !== "All Categories") {
      mongoQuery.category = category;
    }

    const orConditions = [];

    if (query && query.trim() !== "") {
      orConditions.push(
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      );

      const numbers = query.match(/\d+(\.\d+)?/g);
      if (numbers) {
        numbers.forEach((num) => {
          orConditions.push({
            $expr: {
              $regexMatch: {
                input: { $toString: "$price" },
                regex: num,
              },
            },
          });
        });
      }
    }

    if (orConditions.length > 0) {
      mongoQuery.$or = orConditions;
    }

    if (minPrice != null || maxPrice != null) {
      mongoQuery.price = mongoQuery.price || {};
      if (minPrice != null) mongoQuery.price.$gte = minPrice;
      if (maxPrice != null) mongoQuery.price.$lte = maxPrice;
    }

    const products = await Product.find(mongoQuery).limit(50);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
