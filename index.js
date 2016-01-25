'use strict';

module.exports = function each(arr, iterator, callback) {
  const done = callback || function done() {};

  if (!Array.isArray(arr) || !arr.length) {
    return done(null, []);
  }

  let i = 0;

  const map = [];

  function next() {
    iterator(arr[i], function nextCb(err, item) {
      if (err) {
        done(err);
      } else {
        if (typeof item !== 'undefined') {
          map.push(item);
        }

        if (++i < arr.length) {
          process.nextTick(next);
        } else {
          done(null, map);
        }
      }
    });
  }

  next();
};
