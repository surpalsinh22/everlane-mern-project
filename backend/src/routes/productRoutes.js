import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getNewProducts,
  getClothingProducts,
  getPantsAndDenimProducts,
  getTopsAndSweaters


} from '../controllers/productController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

// CREATE PRODUCT
router.post('/create', upload.array('images', 5), createProduct);

// GET ALL PRODUCTS
router.get('/', getProducts);

//GET NEW PRODUCT
router.get('/new/:category', getNewProducts);

//GET CLOTHING
router.get('/clothing', getClothingProducts);

//GET PANTS & DENIM
router.get('/pants-denim', getPantsAndDenimProducts);

// TOPS & KNITWEAR
router.get('/tops-sweaters', getTopsAndSweaters);


// GET SINGLE PRODUCT
router.get('/:id', getProductById);

// PUT UPDATE PRODUCT
router.put('/:id', upload.array('images', 5), updateProduct);

// DELETE PRODUCT
router.delete('/:id', deleteProduct);

export default router;