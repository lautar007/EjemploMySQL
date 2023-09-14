const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/form', productController.form);
router.get('/', productController.list);
router.post('/', productController.post);
router.delete('/:id', productController.delete);
router.get('/detail/:id', productController.detail);
module.exports = router;