const express = require('express');
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/auth');
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: 'public/images/category'});

router.post("/add-category",auth.isAuth,upload.single('categoryImage'),categoryController.addCategory);
router.get("/add-category",auth.isAuth,categoryController.addCategoryPage);

router.get("/category-list",categoryController.categoryList);
router.get("/edit-category/:categoryid",categoryController.getCategoryById);



module.exports = router;


