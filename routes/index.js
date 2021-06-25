const router = require('express').Router();
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.use(userRouter)
router.use(articleRouter)

module.exports = router