import { assert } from 'chai'

/**
 * This line is important, otherwise the magic will not work!
 * In your tests, it will look slightly different:
 *
 *   import { it, before, after, beforeEach, afterEach } from 'arrow-mocha'
 */
import { it, before, after, beforeEach, afterEach } from '../'


describe('The functions imported on the previous line decorate the corresponding Mocha functions', () =>
{
  describe('so that the Mocha test context gets passed to the first argument', () => {
    before(t => {
      t.some = 'value'
    })
    it('like this', t => assert.equal(t.some, 'value'))
  })


  describe('this works for async tests too:', () => {
    const delay = (ms, value) => new Promise(resolve => {
      setTimeout(resolve, ms, value)
    })
    before(t => {
      return delay(10, 'value').then(v => {
        t.another = v
      })
    })
    describe('when a test/hook returns a Promise', () => {
      it('the context is passed to the first argument', t => delay(10).then(() => {
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
        t.third = 'value'
        done()
      })
    })
    describe('declare it as the second argument;', () => {
      it('the context will be passed to the first arg', (t, done) => delay(10, () => {
        assert.equal(t.third, 'value')
        done()
      }))
    })
  })
})
