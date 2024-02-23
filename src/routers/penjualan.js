const express = require('express')
const router = express.Router()

const PenjualanController = require('#controllers/penjualan')

router.get('/list', PenjualanController.list)
router.post('/beli', PenjualanController.beli)
router.patch('/update/:intSalesOrderID', PenjualanController.update)
router.delete('/delete/:intSalesOrderID', PenjualanController.delete)

module.exports = router
