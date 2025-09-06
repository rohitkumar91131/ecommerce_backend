import dotenv from 'dotenv'
import mongoose from "mongoose"
import Product from "../models/ProductModel.js"
import { sampleProducts } from "./ProductData.js"
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce"

const seedDatabase = async () => {
  try {

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ MongoDB connected")

    await Product.deleteMany({})
    console.log("🗑️ Old products removed")


    await Product.insertMany(sampleProducts)
    console.log("🌱 Sample products inserted successfully")

    process.exit()
  } catch (error) {
    console.error("❌ Error seeding database:", error.message)
    process.exit(1)
  }
}

seedDatabase()
