const expect = require('chai').expect
const describe = require('mocha').describe
const it = require('mocha').it
const owners = require('.')

describe('owners', () => {
  it('is an array', () => {
    expect(owners).to.be.an('array')
    expect(owners).to.not.be.empty
  })

  it('includes more than 106000 accounts', () => {
    expect(owners.length).to.be.above(106000)
  })

  it('has a username and packageCount prop', () => {
    expect(owners.find(o => o.username === 'zeke').packageCount).to.be.above(175)
  })
})
