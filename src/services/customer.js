const { customer: Customer } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')

const CustomerService = {
  // PROPERTIES
  filterAttributes: [
    'bitGender',
    'intCustomerID'
  ],
  searchAttributes: [
    'txtCustomerEmail',
    'txtCustomerName'
  ],

  // METHODS
  async create (payload) {
    return await Customer.create(payload)
  },

  async list (query = {}) {
    const { searchAttributes, filterAttributes } = CustomerService

    const { rows, count } = await Customer.findAndCountAll({
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
      customer: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  },

  async findById (intCustomerID) {
    return await Customer.findOne({
      where: { intCustomerID }
    })
  },

  async findByEmail (txtCustomerEmail) {
    return await Customer.findOne({
      where: { txtCustomerEmail }
    })
  },

  async update (intCustomerID, req, payload) {
    return await Customer.update(payload, {
      where: { intCustomerID }
    })
  },

  async delete (intCustomerID) {
    return await Customer.destroy({
      where: { intCustomerID }
    })
  }
}

module.exports = CustomerService
