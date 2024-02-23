const CreateSchema = {
  type: 'object',
  properties: {
    intCustomerID: {
      type: 'integer'
    },
    intProductID: {
      type: 'integer'
    },
    intQty: {
      type: 'number'
    }
  },
  additionalProperties: false,
  required: ['intCustomerID', 'intProductID', 'intQty']
}

const UpdateSchema = {
  type: 'object',
  properties: {
    intCustomerID: {
      type: 'integer'
    },
    intProductID: {
      type: 'integer'
    },
    intQty: {
      type: 'number'
    }
  },
  additionalProperties: false,
  required: []
}

module.exports = { CreateSchema, UpdateSchema }
