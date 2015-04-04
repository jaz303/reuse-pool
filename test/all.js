var test = require('tape');
var pool = require('../');

test('get returns new object when pool is empty', function(assert) {

	var p = pool(function() { return "foo"; });
	var obj = p.get();

	assert.equals(obj, "foo");
	assert.end();

});

test('get returns pooled object when available', function(assert) {

	var p = pool(function() { return {}; });

	var obj1 = p.get();
	var obj2 = p.get();

	p.recycle(obj1);
	p.recycle(obj2);

	assert.equal(p.get(), obj2);
	assert.equal(p.get(), obj1);
	assert.end();

});

test('prepare is not called before returning new object', function(assert) {

	var p = pool(function() { return {}; }, {
		prepare: function(obj) {
			obj.ready = true;
		}
	});

	var obj = p.get();

	assert.ok(!obj.ready);
	assert.end();


});

test('prepare is called before returning reused object', function(assert) {

	var p = pool(function() { return {}; }, {
		prepare: function(obj) {
			obj.ready = true;
		}
	});

	var obj = p.get();
	p.recycle(obj);
	obj = p.get();

	assert.ok(obj.ready);
	assert.end();

});