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
  describe('in async tests that accept callbacks', () =>
  {
    let check = undefined

    const delay = (ms, fn) => {
      setTimeout(fn, ms)
    }

    describe('the context is passed to the first argument, and callback is to the second one', () =>
    {
      before((t, done) => delay(10, () => {
        t.before = 'before'
        t.i = 0
        done()
      }))
      beforeEach((t, done) => delay(10, () => {
        ++t.i
        done()
      }))
      afterEach((t, done) => delay(10, () => {
        t[ 'a' + t.i ] = false
        done()
      }))
      it('test 1', (t, done) => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 1)
        delay(10, () => {
          t.a1 = t.b1 = true
          done()
        })
      })
      it('test 2', (t, done) => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 2)
        assert.isFalse(t.a1)
        assert.isTrue(t.b1)
        delay(10, () => {
          t.a2 = t.b2 = true
          done()
        })
      })
      after((t, done) => {
        assert.equal(t.before, 'before')
        assert.equal(t.i, 2)
        assert.isFalse(t.a1)
        assert.isFalse(t.a2)
        assert.isTrue(t.b1)
        assert.isTrue(t.b2)
        delay(10, () => {
          check = 'callback'
          done()
        })
      })
    })
    
    describe('check that', () => {
      it('the "after all" hook was called', () => assert.equal(check, 'callback'))
    })
  })
})
