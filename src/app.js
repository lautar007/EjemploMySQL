const express = require('express');
const path = require('path');
const PORT = 3000

//Require routers:
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter');

//Require DB:
const db = require('../database/models/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers:
app.use('/products', productRouter);
app.use('/users', userRouter);

app.get('/', (req, res)=>{
    //Aquí se renderiza el home con la lista de productos que viene desde la DB
    let productList
    db.Product.findAll()
        .then(products =>{
            productList = products
            res.render('home', {productList});
        })
        .catch(error=>{
            productList = false
            res.render('home', {productList});
        }) 
});

app.listen(PORT, ()=>{
    console.log('Servidor escuchando en puerto ' + PORT);
})
