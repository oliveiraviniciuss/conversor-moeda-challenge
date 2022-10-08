const app = require('../src/routes/routes')
const logger = require('../src/service/logger')

require('dotenv').config()

const port = process.env.PORT || 3001
app.listen(port, () => {
    logger.info(`Server listening in ${port} on development env`)
})
