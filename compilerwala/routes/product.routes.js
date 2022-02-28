const express  = require('express');
const multer = require('multer');
const upload = multer({dest: 'public/images/product'});
const router = express.Router();
const productController = require('../controller/product.controller');
const auth = require('../middleware/auth');

router.get("/add-product",auth.isAuth,productController.addProductPage);
router.post("/add-product",auth.isAuth,upload.array('productImages'),productController.saveProduct);

router.get("/product-list",productController.productList);

router.get('/delete-product/:id',productController.deleteProduct);

router.post("/edit-product",productController.updateProduct);

router.get("/edit-product/:productid",productController.getProductById);

module.exports = router;


