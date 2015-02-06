# level-batch-stream

[![build status](https://img.shields.io/travis/jcrugzz/level-batch-stream/master.svg?style=flat-square)](http://travis-ci.org/jcrugzz/level-batch-stream)

A simple `Transform` stream that executes a batch operation on a given levelDB
instance. Perfect to use in conjunction with [`batch-stream`][BatchStream] to
batch up your array size for you and [`concurrent-writable`][concurrent] for
tweaking the batch execution concurrency level.

```js

var level = require('level-hyper');
var through = require('through2');
var LevelBatch = require('level-batch-stream');
var BatchStream = require('batch-stream');
var parallel = require('concurrent-writable');

var db = level('new.db', { valueEncoding: 'json' });

source
  //
  // Turn source data into what levelup expects in batches
  //
  .pipe(through(function (data, enc, cb) {
    data = { type: 'put', key: data.id, value: data };
    cb(null, data);
  }))
  //
  // Will batch up 100 objects an send an array down the chain
  //
  .pipe(new BatchStream({ size: 100 }))
  //
  // Will batch the arrays it receives into the level instance
  // doing up to a max of 10 concurrently
  //
  .pipe(parallel(new LevelBatch(db), 10))

```


[BatchStream]: https://github.com/segmentio/batch-stream
[concurrent]: https://www.npmjs.com/package/concurrent-writable
