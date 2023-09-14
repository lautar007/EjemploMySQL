const db = require('../../database/models/index');

const productController = {
    form: (req, res)=>{
        res.render('productForm');
    },
    list: (req, res)=>{
        db.Product.findAll()
        .then(products =>{
            res.send({result: 'Succes', payload: products})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    },
    detail: (req, res)=>{
        const {id} = req.params
        db.Product.findByPk(parseInt(id))
        .then(product=>{
            res.render('productDetail', {product})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    },
    post: (req, res)=>{
        console.log(req.body);
        const{title, description, price, image} = req.body;

        if(!title || !description || !price){
            res.send({result: 'Error', payload: 'Falta rellenar uno de los campos.'})
        }

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