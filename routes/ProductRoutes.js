import {Router} from 'express'
import { getAllProducts } from '../controllers/ProductController.js';

const router = Router();

router.get("/",getAllProducts);

export default router