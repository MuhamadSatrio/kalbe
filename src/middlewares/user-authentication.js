const GeneralError = require('#errors/definitions/general-error')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const customerToken = getAuthorizationToken(req)
  const customer = await getCustomer(customerToken)
  req.intCustomerID = customer
  return next()
}

function getAuthorizationToken (req) {
  if (!req.headers.authorization) {
    throw GeneralError.unauthorized()
  }
  const splitted = req.headers.authorization.split(' ')

  if (splitted[0] !== 'Bearer') {
    throw GeneralError.unauthorized()
  }
  return splitted
}

async function getCustomer (customerToken) {
  let id
  jwt.verify(customerToken[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) throw GeneralError.unauthorized()
    id = decoded.intCustomerID
  })
  return id
}
