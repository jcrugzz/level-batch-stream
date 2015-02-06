# level-batch-stream

[![build status](https://img.shields.io/travis/jcrugzz/level-batch-stream/master.svg?style=flat-square)](http://travis-ci.org/jcrugzz/level-batch-stream)

A simple `Writable` stream that executes a batch operation on a given levelDB
instance. Perfect to use in conjunction with [`batch-stream`][BatchStream] to
batch up your array size for you and [`concurrent-transform`][concurrent] for
tweaking the batch execution concurrency level.


[BatchStream]: https://github.com/segmentio/batch-stream
[concurrent]: https://github.com/segmentio/concurrent-transform
