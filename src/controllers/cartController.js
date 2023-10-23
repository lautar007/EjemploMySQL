const db = require('../../database/models/index');

const cartController = {
    show: (req, res) =>{
        let userLoged = req.cookies.userLoged;
        res.render('cart', {userLoged});
    },
    createCart: async (req, res) =>{
        //Traigo los valores desde el fetch post que configuré en JS de front.
        const {ids, products, values} = req.body;
        //Traigo desde cookies el nombre de usuario del cliente.
        const userLoged = req.cookies.userLoged;
        //Utilizo un try catch para capturar posibles errores.
        try {     
            //Guardo en una variable el usuario logeado.
            let user = await db.User.findOne({where: {username: userLoged}});
            //Por cada uno de los productos que el cliente seleccionó, vamos a crear una orden de compra:
            products.forEach((e) => {
                //Necesito el index del producto para matchear con su id y su cantidad:
                let index = products.indexOf(e);
                console.log('DATOS:', ids[index], values[index]);
                //Creamos entonces la orden de compra:
                db.PurchaseOrder.create({
                    //el ID del usuario viene desde la variable user, donde anteriormente guardamos los datos del usuario traídos de la DB:
                    UserIdUser: user.id_user,
                    //Los otros dos datos salen desde los otros arreglos que vinieron por body, donde estan guardados los ids de los productos y la correspondiente cantidad que se pidió por cada uno. Usamos el index antes capturado para indicar cuál es el elemento del array correspondiente.
                    ProductIdProduct: parseInt(ids[index]),
                    quantity: parseInt(values[index])
                })
                .then(data=>{
                    console.log('Se logró guardar la orden en la DB exitósamente', data);
                })
                .catch(error =>{console.log('Ocurrió un error: ', error)})
            });
            
        } catch (error) {
            console.log('Ocurrió un error: ', error);
        }
    }
}

module.exports = cartController;