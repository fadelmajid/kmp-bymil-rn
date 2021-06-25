const { User } = require('../models');
const { comparePsw } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');
class UserController {
    static register(req, res, next) {
        let UserData = {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            role : req.body.role
        }
        User.create(UserData)
        .then((data) => {
            res.status(201).json({ id : data.id, email : data.email, username: data.email, role: data.role })
        })
        .catch(err => {
            next(err);
        })
    }

    static login(req, res, next) {
        let { email, password } = req.body
        console.log(email)
        User.findOne({ where : {
            email : email
            }
        })
        .then(data => {
            if (!data) {
                throw {
                    name : 'Unauthorized'
                }
            } else {
                //check password
                const isPswMatch = comparePsw(password, data.password);
                if (!isPswMatch) {
                    console.log("!unmatch");
                    throw {
                        name : 'Unauthorized'
                    }
                } else {
                    //generate jwt token
                    const payload = {
                        id : data.id,
                        email : data.email,
                        username : data.username
                    }
                    const token = generateToken(payload)
                    res.status(200).json({ access_token : token })
                }
            }
        })
        .catch(err => {
            console.log(err, ">>>");
            next(err)
        })
    }
}

module.exports = UserController