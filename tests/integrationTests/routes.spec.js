const app = require('../../src/routes/routes')
const request = require('supertest')
const expect = require('chai').expect
require('dotenv').config()

describe('Testing the routes of application', () => {
  test('Verify if the response code is 422 if the price query parameter is empty', async () => {
    await request(app)
      .get('/conversion')
      .expect(422)
  }, 20000)

  test('Verify if the response code is 200 and the body Response is OK when the currencies query parameter and price are correctly', async () => {
    const res = await request(app)
      .get('/conversion?price=10&currencies=USD,EUR')
    // .expect(200)
    expect(res.body).to.be.an('object').that.has.all.keys('invalidParams', 'USD', 'EUR')
  }, 20000)

  test('Verify if the response code is 200 if the price query parameter and currencies are valids', async () => {
    await request(app)
      .get('/conversion?price=10&currencies=USD')
    expect(200)
  }, 20000)

  test('Verify if the response code is 422 if the price query parameter is wrong', async () => {
    await request(app)
      .get('/conversion?price=teste')
      .expect(422)
  }, 20000)

  test('Verify if the response code is 200 and the body Response is OK when the currencies query parameter is wrong', async () => {
    const res = await request(app)
      .get('/conversion?price=10&currencies=BRL')
      .expect(200)
    expect(res.body).to.be.an('object').that.has.all.keys('invalidParams')
    expect(res.body.invalidParams).to.be.an('array')
    expect(['BRL']).to.include.members(res.body.invalidParams)
  }, 20000)

  test('Verify if the response code is 200 and the body Response is OK when the currencies query parameter is wrong', async () => {
    const res = await request(app)
      .get('/conversion?price=10&currencies=BRL,BTC')
      .expect(200)
    expect(res.body).to.be.an('object').that.has.all.keys('invalidParams')
    expect(res.body.invalidParams).to.be.an('array')
    expect(['BRL', 'BTC']).to.include.members(res.body.invalidParams)
  }, 20000)

  test('Verify if the response code is 200 and the body Response is OK when the currencies query parameter is wrong', async () => {
    const res = await request(app)
      .get('/conversion?price=10&currencies=BRL,USD,BTC')
      .expect(200)
    expect(res.body).to.be.an('object').that.has.all.keys('invalidParams', 'USD')
    expect(res.body.invalidParams).to.be.an('array')
    expect(['BRL', 'BTC']).to.include.members(res.body.invalidParams)
    expect(res.body.USD).to.be.an('object').that.has.all.keys('price')
  }, 20000)

  test('Verify healthcheck route', async () => {
    const res = await request(app)
      .get('/healthcheck')
      .expect(200)
    expect(res.body).to.be.an('object').that.has.all.keys('status', 'developed_by')
  }, 20000)

  test('Returns 404 when received a invalid route', async () => {
    await request(app)
      .post('/conversion')
      .expect(404)
  }, 20000)

})
