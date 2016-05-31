'use strict';

const assert = require('assert');
const spawn = require('child_process').spawn;
const each = require('./');

describe('each', () => {
  it('returns immediately for empty array', done => {
    each([], assert.fail, done);
  });

  it('returns immediately for null array', done => {
    each(null, assert.fail, done);
  });

  it('calls each element in order', done => {
    const arr = [1, 9, 3, 10, 13, 14, 19, 6, 3, 2];

    let i = 0;

    each(arr, (item, next) => {
      assert.equal(item, arr[i++]);
      next();
    }, done);
  });

  it('accepts optionak done callback', () => {
    each([2, 3, 4, 5], (item, next) => { next(); });
  });

  it('accepts a BIG array', done => {
    const arr = Array.from(Array(10000).keys());
    let i = 0;

    each(arr, (item, next) => { i++; next(); }, err => {
      assert.ifError(err);
      assert.equal(i, 10000);

      done();
    });
  });
});

describe('map', () => {
  it('returns empty array for empty array', done => {
    each([], assert.fail, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, []);

      done();
    });
  });

  it('returns empty array for null array', done => {
    each(null, assert.fail, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, []);

      done();
    });
  });

  it('returns mapped array', done => {
    each([3, 5, 2, 9], (item, next) => {
      next(null, item * item);
    }, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, [9, 25, 4, 81]);

      done();
    });
  });
});

describe('reduce', () => {
  it('returns rediced empty array', done => {
    each([3, 2, 6, 7, 3, 2, 1], (item, next) => {
      next();
    }, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, []);

      done();
    });
  });

  it('returns reduced array', done => {
    each([3, 5, 2, 9, 8], (item, next) => {
      if (item % 2 === 0) {
        next(null, item);
      } else {
        next(null);
      }
    }, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, [2, 8]);

      done();
    });
  });

  it('returns map reduced array', done => {
    each([3, 5, 2, 9, 8], (item, next) => {
      if (item % 3 === 0) {
        next(null, item * item);
      } else {
        next(null);
      }
    }, (err, arr) => {
      assert.ifError(err);
      assert.deepEqual(arr, [9, 81]);

      done();
    });
  });
});

describe('example', () => {
  it('check-files.js returns existing files', done => {
    const child = spawn('examples/check-files.js');

    const output = [
      'examples/file1.txt exists!\n',
      'examples/file2.txt exists!\n',
    ];

    let i = 0;

    child.stdout.on('data', (data) => {
      assert.equal(data.toString('utf8'), output[i++]);
    });

    child.stderr.on('data', assert.fail.bind(assert));

    child.on('close', (code) => {
      assert.equal(code, 0);
      done();
    });
  });

  it('map-files.js returns content of files', done => {
    const child = spawn('examples/map-files.js');

    const output = [
      'file1.txt foo\n\n',
      'file2.txt bar\n\n',
    ];

    let i = 0;

    child.stdout.on('data', (data) => {
      assert.equal(data.toString('utf8'), output[i++]);
    });

    child.stderr.on('data', assert.fail.bind(assert));

    child.on('close', (code) => {
      assert.equal(code, 0);
      done();
    });
  });
});
