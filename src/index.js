const app = require('./server')
require('dotenv').config()

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server listening in ${port} on development env`)
})
