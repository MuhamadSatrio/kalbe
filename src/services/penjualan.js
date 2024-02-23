const { penjualan: Penjualan } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')

const PenjualanService = {
  // PROPERTIES
  filterAttributes: [
    'intSalesOrderID',
    'intCustomerID',
    'intProductID',
    'dtSalesOrder'
  ],
  searchAttributes: [
  ],

  // METHODS
  async create (payload) {
    return await Penjualan.create(payload)
  },

  async list (query = {}) {
    const { searchAttributes, filterAttributes } = PenjualanService

    const { rows, count } = await Penjualan.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      where: {
        ...QueryHelper.getSearchQuery(query, {
          searchAttributes
        }),
        ...QueryHelper.getFilterQuery(query, {
          filterAttributes
        })
      },
      subQuery: false
    })

    return {
      penjualan: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  },

  async findById (intSalesOrderID) {
    return await Penjualan.findOne({
      where: { intSalesOrderID }
    })
  },

  async update (intSalesOrderID, req, payload) {
    return await Penjualan.update(payload, {
      where: { intSalesOrderID }
    })
  },

  async delete (intSalesOrderID) {
    return await Penjualan.destroy({
      where: { intSalesOrderID }
    })
  }
}

module.exports = PenjualanService
