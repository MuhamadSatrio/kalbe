const express = require('express')
const router = express.Router()

const ProdukController = require('#controllers/produk')

router.get('/list', ProdukController.list)
router.post('/create', ProdukController.create)
router.patch('/update/:intProductID', ProdukController.update)
router.delete('/delete/:intProductID', ProdukController.delete)

module.exports = router
