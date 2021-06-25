async function authorization(req, res, next) {
    try {
        //check isCashier
        console.log("isCashier::::::", req.loggedUser)
        if (req.loggedUser.role === 'cashier') {
            next();
        } else {
            throw {
                name : "No Access - you're waiter"
            }
        }     
    } catch (error) {
        next(error)
    }
}

module.exports = authorization