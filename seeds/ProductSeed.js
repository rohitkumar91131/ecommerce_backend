import dotenv from 'dotenv'
import mongoose from "mongoose"
import Product from '../models/ProductModel.js'
import '../config/db.js'
import { sampleProducts } from "./ProductData.js"
import getBase64 from '../lib/getBase64.js';
dotenv.config();

//const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce"


//let updatedProducts = [];

await Product.deleteMany({}).then((res)=>console.log(res))
for (const product of sampleProducts) {
  const base64Url = await getBase64(product.image);
  const newProduct = await Product.create({
    name : product.name,
    imageUrl : product.image,
    description : product.description,
    category : product.category,
    price : product.price,
    base64Url 
  })
}


//getBase64();
// const seedDatabase = async () => {
//   try {

//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     console.log("✅ MongoDB connected")

//     await Product.deleteMany({})
//     console.log("🗑️ Old products removed")


//     await Product.insertMany(sampleProducts)
//     console.log("🌱 Sample products inserted successfully")

//     process.exit()
//   } catch (error) {
//     console.error("❌ Error seeding database:", error.message)
//     process.exit(1)
//   }
// }

// seedDatabase()
