# reuse-pool

A simple object pool that uses a factory function to instantiate new objects and an optional `prepare` callback for preparing objects for reuse.

## Installation

Get it:

    $ npm install --save reuse-pool

Require it:

	var createPool = require('reuse-pool');

## API

#### `var pool = createPool(factory, [opts])`

Creates a new object pool with the given `factory` function. `opts` is an options object, valid keys:

  * `prepare`: callback used to prepare an object for reuse, called each time an existing object is removed from the pool by a call to `pool.get()`. It is not called when new objects are created by the factory function.
  * `max`: maximum number of items to be pooled for reuse; any additional items beyond this number will be discared. Default: `Infinity`.

#### `pool.get()`

If there are objects in the pool, `pool.get()` returns the most recently recycled object, otherwise it returns a new object created by calling the pool's `factory` function.

#### `pool.recycle(obj)`

Returns `obj` to the pool for later reuse.

## Copyright &amp; License

&copy; 2015 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
