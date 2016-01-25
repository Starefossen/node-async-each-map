#!/usr/bin/env node

/* eslint no-console: 0 */
'use strict';

const each = require('../index');
const fs = require('fs');

const list = [
  'examples/file1.txt',
  'examples/file2.txt',
];

each(list, fs.readFile, (err, files) => {
  if (err) { throw err; }

  files.forEach((content, i) => {
    console.log(`file${i + 1}.txt`, content.toString('utf8'));
  });
});
