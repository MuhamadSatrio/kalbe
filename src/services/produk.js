const { produk: Produk } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')

const ProdukService = {
  // PROPERTIES
  filterAttributes: [
    'intProductID'
  ],
  searchAttributes: [
    'txtProductName',
    'txtProductCode'
  ],

  // METHODS
  async create (payload) {
    return await Produk.create(payload)
  },

  async list (query = {}) {
    const { searchAttributes, filterAttributes } = ProdukService

    const { rows, count } = await Produk.findAndCountAll({
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
      produk: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  },

  async findById (intProductID) {
    return await Produk.findOne({
      where: { intProductID }
    })
  },

  async update (intProductID, req, payload) {
    return await Produk.update(payload, {
      where: { intProductID }
    })
  },

  async delete (intProductID) {
    return await Produk.destroy({
      where: { intProductID }
    })
  }
}

module.exports = ProdukService
