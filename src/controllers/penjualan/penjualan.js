const { CreateSchema, UpdateSchema } = require('./penjualan-schema')
const PenjualanService = require('#services/penjualan')
const GeneralError = require('#errors/definitions/general-error')
const ProdukService = require('#services/produk')
const CustomerService = require('#services/customer')
require('dotenv').config()

module.exports = class Controller {
  static async list (req, res) {
    const { query } = req

    const { penjualan, totalData, totalPage } = await PenjualanService.list(query)

    return res.serialize({
      penjualan,
      totalData,
      totalPage
    })
  }

  static async beli (req, res) {
    const { body } = req
    const { intProductID, intCustomerID } = body

    await Controller._validation(body)

    console.log('tes')
    req.sanitize(CreateSchema, body)
    console.log('tes')

    const produk = await ProdukService.findById(intProductID)
    if (!produk) throw GeneralError.produkNotFound()

    const customer = await CustomerService.findById(intCustomerID)
    if (!customer) throw GeneralError.customerNotFound()

    const createdPenjualan = await PenjualanService.create({
      ...body
    })

    return res.serializePost({
      intSalesOrderID: createdPenjualan.intSalesOrderID
    })
  }

  static async update (req, res) {
    const { params, body } = req
    const { intSalesOrderID } = params
    const { intProductID, intCustomerID } = body

    await Controller._validation(body)
    req.sanitize(UpdateSchema, body)

    const penjualan = await PenjualanService.findById(intSalesOrderID)
    if (!penjualan) throw GeneralError.penjualanNotFound()

    if (intProductID) {
      const produk = await ProdukService.findById(intProductID)
      if (!produk) throw GeneralError.produkNotFound()
    }

    if (intCustomerID) {
      const customer = await CustomerService.findById(intCustomerID)
      if (!customer) throw GeneralError.customerNotFound()
    }

    await PenjualanService.update(intSalesOrderID, req, body)

    return res.serialize({
      mesage: 'update penjualan success',
      intSalesOrderID: penjualan.intSalesOrderID
    })
  }

  static async delete (req, res) {
    const { params } = req
    const { intSalesOrderID } = params

    const penjualan = await PenjualanService.findById(intSalesOrderID)

    if (!penjualan) {
      throw GeneralError.penjualanNotFound()
    }

    await PenjualanService.delete(intSalesOrderID)

    return res.serialize({
      mesage: 'delete penjualan success'
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
