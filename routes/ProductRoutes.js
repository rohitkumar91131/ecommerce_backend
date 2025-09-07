import {Router} from 'express'
import { filterProducts, getAllProducts } from '../controllers/ProductController.js';

const router = Router();

router.get("/",getAllProducts);
router.post("/filter", filterProducts);

export default router