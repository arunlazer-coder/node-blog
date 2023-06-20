const blogController = require('../controllers/blog')
const router = require('express').Router()
const {registerVal} = require('../middlewares/validation')

router.get('/', blogController.list)
router.post('/add', registerVal, blogController.add)
router.get('/edit/:id', blogController.findOne)
router.post('/update/:id', blogController.update)
router.get('/delete/:id', blogController.destroy)

module.exports = router