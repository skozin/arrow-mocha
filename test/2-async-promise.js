import { assert } from 'chai'

/**
 * This line is important, otherwise the magic will not work!
 * In your tests, it will look slightly different:
 *
 *   import { it, before, after, beforeEach, afterEach } from 'arrow-mocha'
 */
import { it, before, after, beforeEach, afterEach } from '../'


describe('Patched Mocha functions allow to use Mocha test context inside ES6 arrows:', () =>
{
  describe('in async tests that return Promises', () =>
  {
    let check = undefined

    const delay = (ms) => new Promise(resolve => {
      setTimeout(resolve, ms)
    })

    describe('the context is passed to the first argument as well', () =>
    {
      // _ is just an unused argument, because .then(() => ...) is ugly
      //                         v
      before(t => delay(10).then(_ => {
        t.before = 'before'
        t.i = 0
      }))
      beforeEach(t => delay(10).then(_ => {
        ++t.i
      }))
      afterEach(t => delay(10).then(_ => {
        t[ 'a' + t.i ] = false
      }))
      it('test 1', t => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 1)
        return delay(10).then(_ => {
          t.a1 = t.b1 = true
        })
      })
      it('test 2', t => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 2)
        assert.isFalse(t.a1)
        assert.isTrue(t.b1)
        return delay(10).then(_ => {
          t.a2 = t.b2 = true
        })
      })
      after(t => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 2)
        assert.isFalse(t.a1)
        assert.isFalse(t.a2)
        assert.isTrue(t.b1)
        assert.isTrue(t.b2)
        return delay(10).then(_ => {
          check = 'Promise'
        })
      })
    })

    describe('check that', () => {
      it('the "after all" hook was called', () => assert.equal(check, 'Promise'))
    })
  })
})
