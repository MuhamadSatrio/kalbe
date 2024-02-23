const express = require('express')
const router = express.Router()
const RootController = require('#controllers/root')
const CustomerController = require('#controllers/customer')

router.get('/', RootController.root)

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)

module.exports = router
