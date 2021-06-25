const bcrypt = require('bcrypt');

function hashPsw(plainPassw) {
    return bcrypt.hashSync(plainPassw, 8);
}

function comparePsw(plainPassw, encryptPsw) {
    return bcrypt.compareSync(plainPassw, encryptPsw)
}

module.exports = {
    hashPsw, comparePsw
}