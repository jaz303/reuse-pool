var EMPTY = {};
var NO_OP = function() {};

module.exports = reusePool;
function reusePool(factory, opts) {
	return new ReusePool(factory, opts);
}

function ReusePool(factory, opts) {
	this._factory = factory;
	this._recycled = [];
	opts = opts || EMPTY;
	this._prepare = opts.prepare || NO_OP;
}

ReusePool.prototype.get = function() {
	if (this._recycled.length) {
		var obj = this._recycled.pop();
		this._prepare(obj);
		return obj;
	} else {
		return this._factory();
	}
}

ReusePool.prototype.recycle = function(obj) {
	this._recycled.push(obj);
}
