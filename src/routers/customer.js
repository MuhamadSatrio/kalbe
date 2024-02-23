const express = require('express')
const router = express.Router()

const CustomerController = require('#controllers/customer')

router.get('/list', CustomerController.list)
router.get('/profile', CustomerController.profile)
router.delete('/delete/:intCustomerID', CustomerController.delete)
router.patch('/update/:intCustomerID', CustomerController.update)

module.exports = router
