
var Writable = require('stream').Writable;
var util = require('util');

module.exports = LevelBatchStream;

util.inherits(LevelBatchStream, Writable);

/**
 * @constructor LevelBatchStream
 *  @param {Object} options Either an options object or a db reference
 */
function LevelBatchStream(options) {
  if (!(this instanceof LevelBatchStream)) { return new LevelBatchStream(options); }
  var hwm = options.highWaterMark || 16;
  Writable.call(this, { objectMode: true, highWaterMark: hwm  });

  this.db = options.db || options;

  if (!this.db) throw new Error('DB required');
}

/**
 * @function _write
 *  @param {Object} data Array or single object read to be batched to levelDB
 *
 *  We assume we are getting an object or an array of objects of the form
 *  { type: 'put', key: 'x', value: 'y' }
 */
LevelBatchStream.prototype._write = function (data, enc, cb) {
  data = !Array.isArray(data) ? [data] : data;

  this.batch(data, cb);
};

/**
 * @function batch
 *  @param {Object} data Array of objects or object
 *  @param {function} callback Continuation to respond to
 *
 *  This is a resillient batch function that does not take an error for an
 *  answer
 */
LevelBatchStream.prototype.batch = function (data, cb) {
  var self = this;
  this.db.batch(data, function (err) {
    if (err) {
      self.emit('retry', data);
      return void setImmediate(self.batch.bind(self, data, cb));
    }
    cb();
  });
};
