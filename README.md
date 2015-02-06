# level-batch-stream

[![build status](https://img.shields.io/travis/jcrugzz/level-batch-stream/master.svg?style=flat-square)](http://travis-ci.org/jcrugzz/level-batch-stream)

A simple `Transform` stream that executes a batch operation on a given levelDB
instance. Perfect to use in conjunction with [`batch-stream`][BatchStream] to
batch up your array size for you and [`concurrent-transform`][concurrent] for
tweaking the batch execution concurrency level.

Note: While this is a transform stream, it is used as a writable stream. The
reason we did this was to be able to take advantage of
[`concurrent-transform`][concurrent] without writing a specific version for
writable streams at this point in time. We do not pass any data onwards to the
next stream so we will not fill our buffer in anyway


[BatchStream]: https://github.com/segmentio/batch-stream
[concurrent]: https://github.com/segmentio/concurrent-transform
