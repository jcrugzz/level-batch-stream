var test = require('tap').test;
var level = require('level-hyper');
var batch = require('./');

var db = level('test.db');

test('Single batch write', function (t) {
  t.plan(2);
  var set = {};

  var stream = batch(db);

  stream.write([
    { type: 'put', key: 'hi', value: 'there' },
    { type: 'put', key: 'hello', value: 'there' }
  ]);

  setImmediate(function () {
    db.createReadStream()
      .on('data', function (data) {
        set[data.key] = data.value;
    }).on('end', function () {
      t.ok(set['hi'] === 'there');
      t.ok(set['hello'] === 'there');
      t.end();
    });

  });
});
