const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = 3000

//Require routers:
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter');
const cartRouter = require('./router/cartRouter');

//Require DB:
const db = require('../database/models/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routers:
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/carts', cartRouter);

app.get('/', (req, res)=>{
    //Aquí se renderiza el home con la lista de productos que viene desde la DB
    let productList
    db.Product.findAll()
        .then(products =>{
            const userName = req.cookies.userName;
            const userAvatar = req.cookies.userAvatar;
            if(userName){
                console.log('Hay un usuario logeado: ', userName)
            }
            productList = products
            res.render('home', {productList, userName, userAvatar});
        })
        .catch(error=>{
            productList = false
            res.render('home', {productList});
        }) 
});

app.listen(PORT, ()=>{
    console.log('Servidor escuchando en puerto ' + PORT);
})
