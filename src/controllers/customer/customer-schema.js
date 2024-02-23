const RegisterSchema = {
  type: 'object',
  properties: {
    txtCustomerEmail: {
      type: 'string',
      format: 'email'
    },
    txtCustomerPassword: {
      type: 'string',
      minLength: 8
    },
    txtCustomerName: {
      type: 'string'
    },
    txtCustomerAddress: {
      type: 'string'
    },
    bitGender: {
      type: 'boolean'
    },
    dtmBirthDate: {
      type: 'string',
      format: 'date'
    }
  },
  additionalProperties: false,
  required: ['txtCustomerEmail', 'txtCustomerPassword', 'txtCustomerName', 'txtCustomerAddress', 'bitGender', 'dtmBirthDate']
}

const UpdateSchema = {
  type: 'object',
  properties: {
    txtCustomerEmail: {
      type: 'string',
      format: 'email'
    },
    txtCustomerPassword: {
      type: 'string',
      minLength: 8
    },
    txtCustomerName: {
      type: 'string'
    },
    txtCustomerAddress: {
      type: 'string'
    },
    bitGender: {
      type: 'boolean'
    },
    dtmBirthDate: {
      type: 'string',
      format: 'date'
    }
  },
  additionalProperties: false,
  required: []
}

const LoginSchema = {
  type: 'object',
  properties: {
    txtCustomerEmail: {
      type: 'string',
      format: 'email'
    },
    txtCustomerPassword: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['txtCustomerEmail', 'txtCustomerPassword']
}

module.exports = { RegisterSchema, LoginSchema, UpdateSchema }
