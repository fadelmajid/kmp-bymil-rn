const { verify } = require('../helper/jwt');
const { User } = require('../models');

async function authenticate(req, res, next) {
    try {
        const { access_token } = req.headers;
        if(access_token) {
            const verifying = verify(access_token)
            const findUser = await User.findOne({
                where : {
                    email : verifying.email
                }
            })
            if (findUser) {
                req.loggedUser = {
                    id : verifying.id,
                    username : verifying.username,
                    email : verifying.email,
                }
                next();
            } else {
                throw {
                    name : "Invalid JWT"
                }
            }
        } else {
            throw {
                name : "Invalid JWT"
            }
        }
    } catch(err) {
        console.log("err");
        next(err)
    }
}

module.exports = authenticate;