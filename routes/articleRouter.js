const router = require('express').Router();
const articleController = require('../controllers/articleController');
const authenticate = require('../middleware/authentication')


router.get('/articles', articleController.getArticle)
router.use(authenticate)
router.post('/articles', articleController.postArticle)

module.exports = router