const express = require('express')
const router = express.Router()

const CustomerRouter = require('./customer')
const ProdukRouter = require('./produk')
const PenjualanRouter = require('./penjualan')

router.use('/customer', CustomerRouter)
router.use('/produk', ProdukRouter)
router.use('/penjualan', PenjualanRouter)

module.exports = router
