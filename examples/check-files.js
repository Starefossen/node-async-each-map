#!/usr/bin/env node

/* eslint no-console: 0 */
'use strict';

const each = require('../index');
const fs = require('fs');

function fsExists(file, cb) {
  fs.stat(file, err => {
    cb(null, err ? undefined : file);
  });
}

const list = [
  'examples/file0.txt',
  'examples/file1.txt',
  'exmaples/file3.txt',
  'examples/file2.txt',
];

each(list, fsExists, (err, files) => {
  if (err) { throw err; }

  for (const file of files) {
    console.log(`${file} exists!`);
  }
});
