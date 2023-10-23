const db = require('../../database/models/index');

const productController = {
    form: (req, res)=>{
        res.render('productForm');
    },
    list: (req, res)=>{
        db.Product.findAll()
        .then(products =>{
            res.json({result: 'Succes', payload: products})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    },
    detail: (req, res)=>{
        const {id} = req.params;
        let userLoged = req.cookies.userLoged;
        db.Product.findByPk(parseInt(id))
        .then(product=>{
            res.render('productDetail', {product, userLoged})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    },
    post: (req, res)=>{
        const{title, description, price} = req.body;

        if(!title || !description || !price){
            res.send({result: 'Error', payload: 'Falta rellenar uno de los campos.'})
        }
        //Para poder guardar múltiples archivos en la DB debemos guardar los nombres de los archivos captados por multer desde req.files, dentro de un arreglo aparte transformado en string:
        let image = [];
        req.files.forEach(e => {
            image.push(e.filename)
        });

        image = image.toString();

        db.Product.create({
            title, price, description, image
        });
        res.redirect('/');
    },
    delete: (req, res)=>{
        const {id} = req.params;
        db.Product.destroy({
            where:{id_product: parseInt(id)}
        })
        .then(result=>{
            res.send({result: 'Succes', payload: result})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    }
}

module.exports = productController;