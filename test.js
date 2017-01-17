const expect = require('chai').expect
const describe = require('mocha').describe
const it = require('mocha').it
const owners = require('.')

describe('owners', () => {
  it('is a non-empty array', () => {
    expect(owners).to.be.an('array')
    expect(owners).to.not.be.empty
  })
})
