/**
 * Arrow functions don't have dynamic "this", so we need this
 * helpers to provide them with a Mocha test context.
 *
 * Sync test/hook, or async one that returns a Promise now
 * has the following signature:
 *
 *   (ctx) => {...}
 *
 * Async test/hook that needs a callback:
 *
 *   (ctx, cb) => {...}
 *
 * Sync test/hook that doesn't need the context is the same
 * as before:
 *
 *   () => {...}
 */
const beforeWithCtx = (fn) => before(withTestCtx(fn))
const afterWithCtx = (fn) => after(withTestCtx(fn))
const beforeEachWithCtx = (fn) => beforeEach(withTestCtx(fn))
const afterEachWithCtx = (fn) => afterEach(withTestCtx(fn))


const itWithCtx = (desc, fn) => it(desc, withTestCtx(fn))
itWithCtx.only = (desc, fn) => it.only(desc, withTestCtx(fn))
itWithCtx.skip = (desc, fn) => it.skip(desc, fn)


const withTestCtx = (fn) =>
{
  const decoratedFn = (fn.length == 2
    ? function(cb){ return fn(this, cb) }
    : function  (){ return fn(this)     }
  )
  // this is needed for "document" and "html"
  // reporters to output original test code
  decoratedFn.toString = () => fn.toString()
  return decoratedFn
}

export {
  itWithCtx as it,
  beforeWithCtx as before,
  afterWithCtx as after,
  beforeEachWithCtx as beforeEach,
  afterEachWithCtx as afterEach
}
