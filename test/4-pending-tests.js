import { assert } from 'chai'

/**
 * This line is important, otherwise the magic will not work!
 * In your tests, it will look slightly different:
 *
 *   import { it, before, after, beforeEach, afterEach } from 'arrow-mocha'
 */
import { it, before, after, beforeEach, afterEach } from '../'


describe('Patched Mocha functions support pending tests:', () =>
{
  it.skip('this is a pending test', t => {
    assert(false, 'oops...')
  })

  it('and this is pending too')

  // it.only is also supported, but it would skip all other tests
  // from the entire suite
})
