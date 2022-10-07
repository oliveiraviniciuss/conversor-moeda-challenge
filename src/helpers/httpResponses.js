const httpStatus = {
  401: {
    message: 'Unauthorized.'
  },
  409: {
    message: 'The request could not be completed due to a conflict with the current state of the resource.'
  },
  422: {
    message: 'Missing Arguments.'
  },
  500: {
    message: 'Internal Server Error.'
  }
}

module.exports = { httpStatus }
