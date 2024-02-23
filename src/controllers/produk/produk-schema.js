const CreateSchema = {
  type: 'object',
  properties: {
    txtProductCode: {
      type: 'string'
    },
    txtProductName: {
      type: 'string'
    },
    intQty: {
      type: 'integer'
    },
    decPrice: {
      type: 'number'
    }
  },
  additionalProperties: false,
  required: ['txtProductCode', 'txtProductName', 'intQty', 'decPrice']
}

const UpdateSchema = {
  type: 'object',
  properties: {
    txtProductCode: {
      type: 'string'
    },
    txtProductName: {
      type: 'string'
    },
    intQty: {
      type: 'integer'
    },
    decPrice: {
      type: 'number'
    }
  },
  additionalProperties: false,
  required: []
}

module.exports = { CreateSchema, UpdateSchema }
