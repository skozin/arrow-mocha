import { assert } from 'chai'

/**
 * This line is important, otherwise the magic will not work!
 * In your tests, it will look slightly different:
 *
 *   import { it, before, after, beforeEach, afterEach } from 'arrow-mocha'
 */
import { it, before, after, beforeEach, afterEach } from '../'


describe('The functions imported on the previous line decorate the corresp. Mocha functions', () =>
{

  describe('so that the Mocha test context gets passed to the first argument', () => {
    before(t => {
      t.some = 'value'
    })
    it('like this', t => assert.equal(t.some, 'value'))
  })


  describe('this works for async tests too:', () => {
    const delay = (ms) => new Promise(resolve => {
      setTimeout(resolve, ms)
    })
    before(t => {
      return delay(10).then(() => {
        t.another = 'value'
      })
    })
    describe('when a test/hook returns a Promise, just declare the first argument', () => {
      it('and the context will be passed to this arg', t => delay(10).then(() => {
        assert.equal(t.another, 'value')
      }))
    })
  })


  describe('when an async test/hook requires a callback,', () => {
    const delay = (ms, fn) => {
      setTimeout(fn, ms)
    }
    before((t, done) => {
      return delay(10, () => {
        t.another = 'value'
        done()
      })
    })
    describe('declare it as a second argument;', () => {
      it('the context will be passed to the first arg', (t, done) => delay(10, () => {
        assert.equal(t.another, 'value')
        done()
      }))
    })
  })
})
