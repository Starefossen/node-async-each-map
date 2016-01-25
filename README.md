# Async; Each, Map, Reduce

[![Build status](https://img.shields.io/wercker/ci/56a5c21f090a9b0d1d03e152.svg "Build status")](https://app.wercker.com/project/bykey/ea2f7fef7cf5cc63c7c4c50405a77b4d)
[![NPM downloads](https://img.shields.io/npm/dm/async-each-map.svg "NPM downloads")](https://www.npmjs.com/package/async-each-map)
[![NPM version](https://img.shields.io/npm/v/async-each-map.svg "NPM version")](https://www.npmjs.com/package/async-each-map)
[![Node version](https://img.shields.io/node/v/async-each-map.svg "Node version")](https://www.npmjs.com/package/async-each-map)
[![Dependency status](https://img.shields.io/david/Starefossen/node-async-each-map.svg "Dependency status")](https://david-dm.org/Starefossen/node-async-each-map)

Efficient, light wegith, dependency free NPM package for doing asyncronous each,
map, and reduce operations in Node.js.

## Requirements

* Node.JS >= v4.0.0

## Install

```
$ npm install async-each-map --save
```

## Usage

```js
const each = require('async-each-map');
```

### each(array, iterator, [callback])

Applies the `iterator` function to each item in `array`, in sequence and in
order.  The `iterator` is called with an item from the list, and a `next`
function for when it has finished. If the `iterator` passes an error to the
`next` function, the `callback` is immediately called with the error.

#### Arguments

* `array` - An array to iterate over.
* `iterator(item, next)` - A function to apply to each item in arr. The iterator
  is passed a callback(err) which must be called once it has completed. If no
  error has occurred, the callback should be run without arguments or with an
  explicit null argument. The array index is not passed to the iterator.
* `callback(error, array)` - *Optional* A callback which is called when all
  iterator functions have finished, or an error occurs. When using the map
  functionality a second parameter is provided.

#### Examples

```js
each([3, 6, 2, 9], (item, next) => {
  some.async.operation(item, error => {
    next(error);
  });
}, error => {
  if (error) { throw error; }

  console.log('Done!');
});
```

### Map

```js
each(['/some/file1', '/some/file2', '/some/file3'], fs.readFile, (error, files) => {
  if (error) { throw error; }

  for (const content in files) {
    console.log(content);
  }
})
```

### Reduce

```js
each(['/some/file1', '/some/file2', '/some/file3'], fs.exists, (error, files) => {
  if (error) { throw error; }

  for (const file in files) {
    console.log(`${file} exists`);
  }
});
```

## [MIT Licensed](https://github.com/Starefossen/node-async-each-map/blob/master/LICENSE)
