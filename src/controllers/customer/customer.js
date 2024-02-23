const { RegisterSchema, LoginSchema, UpdateSchema } = require('./customer-schema')
const CustomerService = require('#services/customer')
const validator = require('validator')
const Bcrypt = require('#helpers/Bcrypt')
const jwt = require('jsonwebtoken')
const GeneralError = require('#errors/definitions/general-error')
require('dotenv').config()

module.exports = class Controller {
  static async list (req, res) {
    const { query } = req

    const { customer, totalData, totalPage } = await CustomerService.list(query)

    return res.serialize({
      customer,
      totalData,
      totalPage
    })
  }

  static async register (req, res) {
    const { body } = req
    const { txtCustomerEmail } = body

    await Controller._validation(body)

    if (!validator.isEmail(body.txtCustomerEmail)) {
      throw GeneralError.IncorrectFormatEmail()
    }

    req.sanitize(RegisterSchema, body)

    /**
     * check if email already used
     */
    const isEmailExist = await CustomerService.findByEmail(txtCustomerEmail)
    if (isEmailExist) throw GeneralError.emailAlreadyUsed()

    const createdCustomer = await CustomerService.create({
      ...body
    })

    const accessToken = jwt.sign({
      intCustomerID: createdCustomer.intCustomerID, username: createdCustomer.txtCustomerName
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

    return res.serializePost({
      intCustomerID: createdCustomer.intCustomerID,
      token: accessToken
    })
  }

  static async login (req, res) {
    const { body } = req
    const { txtCustomerEmail, txtCustomerPassword } = body

    await Controller._validation(body)

    if (!validator.isEmail(body.txtCustomerEmail)) {
      throw GeneralError.IncorrectFormatEmail()
    }

    req.sanitize(LoginSchema, body)

    const customer = await CustomerService.findByEmail(txtCustomerEmail)
    if (!customer) throw GeneralError.invalidLoginCredential()

    const isMatched = Bcrypt.compare(txtCustomerPassword, customer.txtCustomerPassword)
    if (!isMatched) throw GeneralError.invalidLoginCredential()

    const accessToken = jwt.sign({
      intCustomerID: customer.intCustomerID, username: customer.txtCustomerName
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

    return res.serialize({
      intCustomerID: customer.intCustomerID,
      token: accessToken
    })
  }

  static async profile (req, res) {
    const { intCustomerID } = req
    const customer = await CustomerService.findById(intCustomerID)

    return res.serialize({ customer })
  }

  static async update (req, res) {
    const { params } = req
    const { intCustomerID } = params
    const { body } = req

    await Controller._validation(body)
    req.sanitize(UpdateSchema, body)

    const customer = await CustomerService.findById(intCustomerID)
    if (!customer) throw GeneralError.invalidStaff()
    await CustomerService.update(intCustomerID, req, body)

    return res.serialize({
      mesage: 'update customer success',
      intCustomerID
    })
  }

  static async delete (req, res) {
    const { params } = req
    const { intCustomerID } = params

    const customer = await CustomerService.findById(intCustomerID)

    if (!customer) {
      throw GeneralError.userNotFound()
    }

    await CustomerService.delete(intCustomerID)

    return res.serialize({
      mesage: 'delete account customer success',
      intCustomerID
    })
  }

  // PRIVATE METHODS
  static async _validation (body) {
    const bodyValues = Object.values(body)
    const isEmptyValue = bodyValues.some(value => value === null)
    if (isEmptyValue) throw GeneralError.emptyBody()
    return true
  }
}
