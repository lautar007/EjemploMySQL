const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const multer = require('multer');
const path = require ('path');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join( __dirname,'..', 'public', 'images','films')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  
    } 
});

const upload = multer({ storage: storage });

router.get('/form', productController.form);
router.get('/', productController.list);
router.post('/', upload.array('images'), productController.post);
router.delete('/:id', productController.delete);
router.get('/detail/:id', productController.detail);
module.exports = router;