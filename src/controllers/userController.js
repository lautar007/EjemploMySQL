const db = require('../../database/models/index');

const userController = {
    list: (req, res)=>{
        db.User.findAll()
            .then(data=>{
                res.send({result: 'Succes', payload: data})
            })
            .catch(error =>{
                res.send({result: 'Error', payload: error})
            })
    },
    post: (req, res)=>{
        const {name, surname, email, username, password, image} = req.body;

        db.User.create({
            name, surname, email, username, password, image
        })
        .then(data=>{
            res.send({result: 'Succes', payload: data})
        })
        .catch(error =>{
            res.send({result: 'Error', payload: error})
        })
    },
    delete: (req, res)=>{
        const {id} = req.params;
        db.User.destroy({
            where:{id_user: parseInt(id)}
        })
        .then(result=>{
            res.send({result: 'Succes', payload: result})
        })
        .catch(error=>{
            res.send({result: 'Error', payload: error})
        })
    }
}

module.exports = userController; 