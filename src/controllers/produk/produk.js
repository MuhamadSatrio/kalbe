const { CreateSchema, UpdateSchema } = require('./produk-schema')
const ProdukService = require('#services/produk')
const GeneralError = require('#errors/definitions/general-error')
require('dotenv').config()

module.exports = class Controller {
  static async list (req, res) {
    const { query } = req

    const { produk, totalData, totalPage } = await ProdukService.list(query)

    return res.serialize({
      produk,
      totalData,
      totalPage
    })
  }

  static async create (req, res) {
    const { body } = req

    await Controller._validation(body)

    req.sanitize(CreateSchema, body)

    const createdProduk = await ProdukService.create({
      ...body
    })

    return res.serializePost({
      txtProductName: createdProduk.txtProductName
    })
  }

  static async update (req, res) {
    const { params, body } = req
    const { intProductID } = params

    await Controller._validation(body)
    req.sanitize(UpdateSchema, body)

    const produk = await ProdukService.findById(intProductID)
    if (!produk) throw GeneralError.produkNotFound()

    await ProdukService.update(intProductID, req, body)

    return res.serialize({
      mesage: 'update produk success',
      intProductID: produk.intProductID
    })
  }

  static async delete (req, res) {
    const { params } = req
    const { intProductID } = params

    const produk = await ProdukService.findById(intProductID)

    if (!produk) {
      throw GeneralError.produkNotFound()
    }

    await ProdukService.delete(intProductID)

    return res.serialize({
      mesage: 'delete produk success'
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
