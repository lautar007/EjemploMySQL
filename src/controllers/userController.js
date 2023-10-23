const db = require('../../database/models/index');

const userController = {
    form: (req, res) =>{
        res.render('userForm')
    },

    loginView: (req, res)=>{
        res.render('login')
    },

    loginSystem: (req, res)=>{
        const {username, password} = req.body;
        db.User.findOne({where: {username: username}})
            .then((user)=>{
                if(user && user.password == password){
                    res.cookie('userLoged', user.username, {maxAge: 3*60*60*1000}).cookie('userAvatar', user.image, {maxAge: 3*60*60*1000}).cookie('userName', user.name, {maxAge: 3*60*60*1000}).redirect('/');
                }
                else{
                    res.send('El usuario o la contraseña no son correctos')
                }
            })
            .catch(error =>{
                res.send({result: 'Error', payload: error})
            });
    },

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
        const {name, surname, email, username, password} = req.body;

        console.log(req.file);

        const image = req.file.filename;

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