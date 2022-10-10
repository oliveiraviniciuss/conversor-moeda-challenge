const expect = require('chai').expect
require('dotenv').config()
const conversionController = require('../../../src/controllers/conversionController')

describe('Testing getUrlToRequest function', () => {
  it('should return the sum of two string to form url', () => {
    const BASE_URL = 'https://testingurl.com/'
    const currencies = 'BRL,USD'
    const result = conversionController.getUrlToRequest(BASE_URL, currencies)
    expect(result).to.be.equal('https://testingurl.com/BRL,USD')
  })
  it('should return the sum of two string to form url - get url from env', () => {
    const BASE_URL = process.env.BASE_URL
    const currencies = 'BRL,USD'
    const result = conversionController.getUrlToRequest(BASE_URL, currencies)
    expect(result).to.be.equal('https://economia.awesomeapi.com.br/json/last/BRL,USD')
  })
  it('should return the sum of two string to form url - get url from env', () => {
    const BASE_URL = process.env.BASE_URL
    const currencies = ''
    const result = conversionController.getUrlToRequest(BASE_URL, currencies)
    expect(result).to.be.equal('https://economia.awesomeapi.com.br/json/last/')
  })
})

describe('Testing getValidCurrenciesArr function', () => {
  it('should return an array with validated currencies - Two valids and one invalid.', () => {
    const currenciesQueryParam = 'BRL,USD,INR'
    const result = conversionController.getValidCurrenciesArr(currenciesQueryParam)

    const expectedResultTest = {
      validatedCurrenciesArr: [
        {
          currency: 'BRL',
          valid: false
        },
        {
          currency: 'USD',
          valid: true
        },
        {
          currency: 'INR',
          valid: true
        }
      ]
    }
    expect(result).to.be.deep.equals(expectedResultTest.validatedCurrenciesArr)
  })
  it('should return an array with validated currencies - 1 invalid.', () => {
    const currenciesQueryParam = ''
    const result = conversionController.getValidCurrenciesArr(currenciesQueryParam)

    const expectedResultTest = {
      validatedCurrenciesArr: [
        {
          currency: '',
          valid: false
        }
      ]
    }
    expect(result).to.be.deep.equals(expectedResultTest.validatedCurrenciesArr)
  })
  it('should return an array with validated currencies - 2 invalids.', () => {
    const currenciesQueryParam = '$, '
    const result = conversionController.getValidCurrenciesArr(currenciesQueryParam)

    const expectedResultTest = {
      validatedCurrenciesArr: [
        {
          currency: '$',
          valid: false
        },
        {
          currency: ' ',
          valid: false
        }
      ]
    }
    expect(result).to.be.deep.equals(expectedResultTest.validatedCurrenciesArr)
  })
})

describe('Testing getPricesFromQuotationsResponse function', () => {
  it('should parse a response of external api and get the valor of quotation', async () => {
    const price = 1
    const currenciesArr = [
      {
        currency: 'BRL',
        valid: false
      },
      {
        currency: 'USD',
        valid: true
      },
      {
        currency: 'EUR',
        valid: true
      }
    ]

    const externalApiMock = {
      USDBRL: {
        code: 'USD',
        codein: 'BRL',
        name: 'Dólar Americano/Real Brasileiro',
        high: '5.2523',
        low: '5.1957',
        varBid: '-0.0194',
        pctChange: '-0.37',
        bid: '5.201',
        ask: '5.2035',
        timestamp: '1665176396',
        create_date: '2022-10-07 17:59:56'
      },
      EURBRL: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        high: '5.0652',
        low: '5.0569',
        varBid: '-0.0015',
        pctChange: '-0.03',
        bid: '5.0629',
        ask: '5.064',
        timestamp: '1665363594',
        create_date: '2022-10-09 21:59:54'
      }
    }
    const expectedResult = {
      USD: {
        price: 5.2523
      },
      EUR: {
        price: 5.0652
      },
      invalidParams: ['BRL']
    }
    const result = await conversionController.getPricesFromQuotationsResponse(price, externalApiMock, currenciesArr)

    expect(result).to.be.deep.equals(expectedResult)
  })
  it('should parse a response of external api and get the valor of quotation.', async () => {
    const price = 1
    const currenciesArr = [
      {
        currency: 'BTC',
        valid: false
      },
      {
        currency: 'ETH',
        valid: false
      }
    ]

    const externalApiMock = {
      BTCBRL: {
        code: 'BTC',
        codein: 'BRL',
        name: 'Bitcoin/Real Brasileiro',
        high: '102.474',
        low: '101.403',
        varBid: '648',
        pctChange: '0.64',
        bid: '102.095',
        ask: '102.222',
        timestamp: '1665364171',
        create_date: '2022-10-09 22:09:31'
      },
      ETHBRL: {
        code: 'ETH',
        codein: 'BRL',
        name: 'Ethereum/Real Brasileiro',
        high: '7.01623',
        low: '6.83376',
        varBid: '127.38',
        pctChange: '1.85',
        bid: '6.99702',
        ask: '7.00634',
        timestamp: '1665364171',
        create_date: '2022-10-09 22:09:31'
      }
    }
    const expectedResult = {
      invalidParams: ['BTC',
        'ETH']
    }
    const result = await conversionController.getPricesFromQuotationsResponse(price, externalApiMock, currenciesArr)

    expect(result).to.be.deep.equals(expectedResult)
  })

  describe('Testing getValidCurrenciesString function', () => {
    it('should return a valid string to make a request to external Api.', async () => {
      const currenciesArr = [
        {
          currency: 'BTC',
          valid: false
        },
        {
          currency: 'ETH',
          valid: false
        },
        {
          currency: 'USD',
          valid: true
        },
        {
          currency: 'INR',
          valid: true
        }
      ]

      const expectedResult = 'USD,INR'
      const result = await conversionController.getValidCurrenciesString(currenciesArr)

      expect(result).to.be.deep.equals(expectedResult)
    })
    it('should return a valid string to make a request to external Api. - All params invalid', async () => {
      const currenciesArr = [
        {
          currency: 'BTC',
          valid: false
        },
        {
          currency: 'ETH',
          valid: false
        }
      ]

      const expectedResult = ''
      const result = await conversionController.getValidCurrenciesString(currenciesArr)

      expect(result).to.be.deep.equals(expectedResult)
    })
  })

  describe('Testing valueToStoreInCache function', () => {
    it('should return an object to store in cache based on external Api response.', async () => {
      const externalApiMock = {
        USDBRL: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          high: '5.2523',
          low: '5.1957',
          varBid: '-0.0194',
          pctChange: '-0.37',
          bid: '5.201',
          ask: '5.2035',
          timestamp: '1665176396',
          create_date: '2022-10-07 17:59:56'
        },
        EURBRL: {
          code: 'EUR',
          codein: 'BRL',
          name: 'Euro/Real Brasileiro',
          high: '5.0652',
          low: '5.0569',
          varBid: '-0.0015',
          pctChange: '-0.03',
          bid: '5.0629',
          ask: '5.064',
          timestamp: '1665363594',
          create_date: '2022-10-09 21:59:54'
        }
      }

      const keyToSave = 'USDBRL'
      const expectedResult = {
        USDBRL: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          high: '5.2523',
          low: '5.1957',
          varBid: '-0.0194',
          pctChange: '-0.37',
          bid: '5.201',
          ask: '5.2035',
          timestamp: '1665176396',
          create_date: '2022-10-07 17:59:56'
        }
      }
      const result = await conversionController.valueToStoreInCache(externalApiMock, keyToSave)

      expect(result).to.be.deep.equals(expectedResult)
    })
    it('should return an object to store in cache based on external Api response.', async () => {
      const externalApiMock = {
        USDBRL: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          high: '5.2523',
          low: '5.1957',
          varBid: '-0.0194',
          pctChange: '-0.37',
          bid: '5.201',
          ask: '5.2035',
          timestamp: '1665176396',
          create_date: '2022-10-07 17:59:56'
        },
        EURBRL: {
          code: 'EUR',
          codein: 'BRL',
          name: 'Euro/Real Brasileiro',
          high: '5.0652',
          low: '5.0569',
          varBid: '-0.0015',
          pctChange: '-0.03',
          bid: '5.0629',
          ask: '5.064',
          timestamp: '1665363594',
          create_date: '2022-10-09 21:59:54'
        }
      }

      const keyToSave = 'EURBRL'
      const expectedResult = {
        EURBRL: {
          code: 'EUR',
          codein: 'BRL',
          name: 'Euro/Real Brasileiro',
          high: '5.0652',
          low: '5.0569',
          varBid: '-0.0015',
          pctChange: '-0.03',
          bid: '5.0629',
          ask: '5.064',
          timestamp: '1665363594',
          create_date: '2022-10-09 21:59:54'
        }
      }
      const result = await conversionController.valueToStoreInCache(externalApiMock, keyToSave)

      expect(result).to.be.deep.equals(expectedResult)
    })
  })
})
