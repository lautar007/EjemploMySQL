const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require ('path');

//---------------------Config. de Multer----------------------------
//Se define un objeto llamado storage que utiliza multer.diskStorage. Este objeto tiene dos propiedades: destination y filename.
// La propiedad destination especifica la carpeta de destino donde se guardarán los archivos cargados. En este caso, la carpeta de destino es ./public/images/avatars.
// La función anónima dentro de destination recibe tres argumentos: req (la solicitud HTTP), file (el archivo que se está cargando) y cb (la función de devolución de llamada). Al llamar a cb(null, './public/images/avatars'), se especifica que la carpeta de destino para los archivos cargados es ./public/images/avatars.
// La propiedad filename define cómo se va a nombrar el archivo una vez que se haya guardado. En este caso, el nombre del archivo se compone de la marca de tiempo actual en milisegundos y el nombre original del archivo cargado. La función path.extname se utiliza para obtener la extensión del nombre de archivo original.
// La función anónima dentro de filename también recibe tres argumentos: req (la solicitud HTTP), file (el archivo que se está cargando) y cb (la función de devolución de llamada). Al llamar a cb(null, ${Date.now()}img${path.extname(file.originalname)}), se establece el nombre del archivo en el formato de marca de tiempo actual más "img" y la extensión del archivo original.

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join( __dirname,'..', 'public', 'images','avatars')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  
    } 
});



//la función multer() toma como argumento un objeto literal que trae la variable que guarda las configuraciones realizadas en el paso anterior:
 
const upload = multer({ storage: storage });

//------------------------------------------------------------------

router.get('/form', userController.form);
router.get('/login', userController.loginView);
router.post('/login', userController.loginSystem);
router.get('/', userController.list);
//en medio del nombre de la ruta y el método del controlador, traemos a la variable definida en el punto anterior. Y sobre la misma estamos ejecutando el método single(), el cual toma como argumento el nombre de input que enviará la imagen que deseamos procesar.
router.post('/', upload.single("avatar"), userController.post);
router.delete('/:id', userController.delete);

module.exports = router;
