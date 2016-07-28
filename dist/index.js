(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Orderly", [], factory);
	else if(typeof exports === 'object')
		exports["Orderly"] = factory();
	else
		root["Orderly"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _job = __webpack_require__(9);

	var _job2 = _interopRequireDefault(_job);

	var _queue = __webpack_require__(4);

	var _queue2 = _interopRequireDefault(_queue);

	var _worker = __webpack_require__(7);

	var _worker2 = _interopRequireDefault(_worker);

	var _version_tracker = __webpack_require__(10);

	var _version_tracker2 = _interopRequireDefault(_version_tracker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function Orderly() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	  // ============================================
	  // initialize environment
	  // ============================================

	  var queue = new _queue2.default();
	  var worker = new _worker2.default(queue, config);
	  var versioning = new _version_tracker2.default();

	  // ============================================
	  // Private Functions
	  // ============================================

	  function filterSearchParams(url) {
	    return ('' + url).replace(/\?.*$/, '');
	  }

	  function buildAbort(abort) {
	    if (abort) return abort;
	  }

	  function buildVersion(url, version) {
	    if (version === undefined) version = true;

	    if (version) {
	      var _ret = function () {
	        var key = filterSearchParams(url);
	        var next = versioning.inc(key);

	        return {
	          v: function v() {
	            return versioning.get(key) === next;
	          }
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	  }

	  function buildCancel(abort, url, version) {
	    abort = buildAbort(abort);
	    version = buildVersion(url, version);
	    return function () {
	      return version && !version() || abort && abort();
	    };
	  }

	  function isGoodRequest(_ref) {
	    var status = _ref.status;

	    return status >= 200 && status < 400;
	  }

	  function buildJob(action, priority) {
	    return new _job2.default({ action: action, priority: priority });
	  }

	  function responseStatus(reject) {
	    return function (resp) {
	      return isGoodRequest(resp) ? resp : reject(resp);
	    };
	  }

	  function responseType() {
	    var _this = this;

	    var type = arguments.length <= 0 || arguments[0] === undefined ? 'text' : arguments[0];

	    return function () {
	      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resp) {
	        var body;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return resp[type]();

	              case 2:
	                body = _context.sent;
	                return _context.abrupt('return', _extends({}, resp, { body: body }));

	              case 4:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, _this);
	      }));

	      return function (_x3) {
	        return _ref2.apply(this, arguments);
	      };
	    }();
	  }

	  function shouldCancel(cancel, reject) {
	    return function (resp) {
	      return cancel() ? reject(_extends({}, resp, { cancelled: true })) : resp;
	    };
	  }

	  function buildAction(url, options, resolve, reject) {
	    var abort = options.abort;
	    var type = options.type;
	    var version = options.version;

	    return function () {
	      return fetch(url, options).then(responseStatus(reject)).then(shouldCancel(buildCancel(abort, url, version), reject)).then(responseType(type)).then(resolve).catch(reject);
	    };
	  }

	  // ============================================
	  // Public Functions
	  // ============================================

	  function ajax(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var priority = options.priority;

	    return new Promise(function (resolve, reject) {
	      queue.add(buildJob(buildAction(url, options, resolve, reject), priority));
	    });
	  }

	  function get(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, _extends({}, options, { method: 'GET' }));
	  }

	  function post(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, _extends({}, options, { method: 'POST' }));
	  }

	  function put(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, _extends({}, options, { method: 'PUT' }));
	  }

	  function del(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, _extends({}, options, { method: 'DELETE' }));
	  }

	  return { ajax: ajax, get: get, post: post, put: put, del: del, versioning: versioning, queue: queue, worker: worker };
	}

	exports.default = Orderly;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fastpriorityqueue = __webpack_require__(5);

	var _fastpriorityqueue2 = _interopRequireDefault(_fastpriorityqueue);

	var _job = __webpack_require__(9);

	var _job2 = _interopRequireDefault(_job);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Queue = function () {
	  function Queue() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$strategy = _ref.strategy;
	    var strategy = _ref$strategy === undefined ? this.__defaultStrategy__ : _ref$strategy;

	    _classCallCheck(this, Queue);

	    this.q = new _fastpriorityqueue2.default(strategy);
	  }

	  _createClass(Queue, [{
	    key: 'add',
	    value: function add(obj) {
	      console.info('Orderly.Job.Added');
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty('action')) return this.q.add(obj);
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.q.poll();
	    }
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.q.isEmpty();
	    }
	  }, {
	    key: 'size',
	    value: function size() {
	      return this.q.size;
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup() {
	      return this.q.trim();
	    }
	  }, {
	    key: '__defaultStrategy__',
	    value: function __defaultStrategy__(_ref2, _ref3) {
	      var x = _ref2.priority;
	      var y = _ref3.priority;

	      return x !== undefined && x > y;
	    }
	  }]);

	  return Queue;
	}();

	exports.default = Queue;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/**
	 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
	 * (c) the authors
	 * Licensed under the Apache License, Version 2.0.
	 *
	 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
	 *
	 * Usage :
	         Installation (in shell, if you use node):
	         $ npm install fastpriorityqueue

	         Running test program (in JavaScript):

	         // var FastPriorityQueue = require("fastpriorityqueue");// in node
	         var x = new FastPriorityQueue();
	         x.add(1);
	         x.add(0);
	         x.add(5);
	         x.add(4);
	         x.add(3);
	         x.peek(); // should return 0, leaves x unchanged
	         x.size; // should return 5, leaves x unchanged
	         while(!x.isEmpty()) {
	           console.log(x.poll());
	         } // will print 0 1 3 4 5
	         x.trim(); // (optional) optimizes memory usage
	 */
	'use strict';

	var defaultcomparator = function defaultcomparator(a, b) {
	    return a < b;
	};

	// the provided comparator function should take a, b and return *true* when a < b
	function FastPriorityQueue(comparator) {
	    this.array = [];
	    this.size = 0;
	    this.compare = comparator || defaultcomparator;
	}

	// Add an element the the queue
	// runs in O(log n) time
	FastPriorityQueue.prototype.add = function (myval) {
	    var i = this.size;
	    this.array[this.size++] = myval;
	    while (i > 0) {
	        var p = i - 1 >> 1;
	        var ap = this.array[p];
	        if (!this.compare(myval, ap)) break;
	        this.array[i] = ap;
	        i = p;
	    }
	    this.array[i] = myval;
	};

	// replace the content of the heap by provided array and "heapifies it"
	FastPriorityQueue.prototype.heapify = function (arr) {
	    this.array = arr;
	    this.size = arr.length;
	    for (var i = this.size >> 1; i >= 0; i--) {
	        this._percolateDown(i);
	    }
	};

	// for internal use
	FastPriorityQueue.prototype._percolateUp = function (i) {
	    var myval = this.array[i];
	    while (i > 0) {
	        var p = i - 1 >> 1;
	        var ap = this.array[p];
	        if (!this.compare(myval, ap)) break;
	        this.array[i] = ap;
	        i = p;
	    }
	    this.array[i] = myval;
	};

	// for internal use
	FastPriorityQueue.prototype._percolateDown = function (i) {
	    var size = this.size;
	    var hsize = this.size >>> 1;
	    var ai = this.array[i];
	    while (i < hsize) {
	        var l = (i << 1) + 1;
	        var r = l + 1;
	        var bestc = this.array[l];
	        if (r < size) {
	            if (this.compare(this.array[r], bestc)) {
	                l = r;
	                bestc = this.array[r];
	            }
	        }
	        if (!this.compare(bestc, ai)) {
	            break;
	        }
	        this.array[i] = bestc;
	        i = l;
	    }
	    this.array[i] = ai;
	};

	// Look at the top of the queue (a smallest element)
	// executes in constant time
	//
	// This function assumes that the priority queue is
	// not empty and the caller is resposible for the check. 
	// You can use an expression such as
	// "isEmpty() ? undefined : peek()"
	// if you expect to be calling peek on an empty priority queue.
	// 
	FastPriorityQueue.prototype.peek = function (t) {
	    return this.array[0];
	};

	// remove the element on top of the heap (a smallest element)
	// runs in logarithmic time
	//
	//
	// This function assumes that the priority queue is
	// not empty, and the caller is responsible for the check. 
	// You can use an expression such as
	// "isEmpty() ? undefined : poll()"
	// if you expect to be calling poll on an empty priority queue.
	//
	// For long-running and large priority queues, or priority queues
	// storing large objects, you may  want to call the trim function
	// at strategic times to recover allocated memory.
	FastPriorityQueue.prototype.poll = function (i) {
	    var ans = this.array[0];
	    if (this.size > 1) {
	        this.array[0] = this.array[--this.size];
	        this._percolateDown(0 | 0);
	    } else --this.size;
	    return ans;
	};

	// recover unused memory (for long-running priority queues)
	FastPriorityQueue.prototype.trim = function () {
	    this.array = this.array.slice(0, this.size);
	};

	// Check whether the heap is empty
	FastPriorityQueue.prototype.isEmpty = function (i) {
	    return this.size == 0;
	};

	// just for illustration purposes
	var main = function main() {
	    // main code
	    var x = new FastPriorityQueue(function (a, b) {
	        return a < b;
	    });
	    x.add(1);
	    x.add(0);
	    x.add(5);
	    x.add(4);
	    x.add(3);
	    while (!x.isEmpty()) {
	        console.log(x.poll());
	    }
	};

	if (__webpack_require__.c[0] === module) {
	    main();
	}

	module.exports = FastPriorityQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _job = __webpack_require__(9);

	var _job2 = _interopRequireDefault(_job);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Worker = function () {
	  function Worker(queue) {
	    var _this = this;

	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref$sleep = _ref.sleep;
	    var sleep = _ref$sleep === undefined ? 50 : _ref$sleep;
	    var _ref$max = _ref.max;
	    var max = _ref$max === undefined ? 8 : _ref$max;

	    _classCallCheck(this, Worker);

	    this.start = function () {
	      while (_this.available && _this.hasJob) {
	        _this.pending += 1;

	        var job = _this.queue.get();
	        _this.dispatch(_this.execute, job);
	      }

	      _this.queue.cleanup();
	      setTimeout(_this.start, _this.sleep);
	    };

	    this.execute = function (job) {
	      return _job2.default.invoke(job, _this.complete);
	    };

	    this.complete = function () {
	      _this.pending -= 1;
	    };

	    this.queue = queue;
	    this.sleep = sleep;
	    this.max = max;
	    this.pending = 0;

	    this.start();
	  }

	  _createClass(Worker, [{
	    key: 'dispatch',
	    value: function dispatch(func, job) {
	      return setTimeout(func, 0, job, this.complete);
	    }
	  }, {
	    key: 'available',
	    get: function get() {
	      return this.pending < this.max;
	    }
	  }, {
	    key: 'hasJob',
	    get: function get() {
	      return !this.queue.isEmpty();
	    }
	  }]);

	  return Worker;
	}();

	exports.default = Worker;

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Job = function () {
	  _createClass(Job, null, [{
	    key: 'invoke',
	    value: function invoke(job, callback) {
	      var q = job.action();

	      if (callback && typeof callback === 'function') q.then(callback);

	      return q;
	    }
	  }]);

	  function Job(_ref) {
	    var action = _ref.action;
	    var _ref$priority = _ref.priority;
	    var priority = _ref$priority === undefined ? 0 : _ref$priority;

	    _classCallCheck(this, Job);

	    this.action = action;
	    this.priority = priority;
	  }

	  return Job;
	}();

	exports.default = Job;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VersionTracker = function () {
	  function VersionTracker() {
	    _classCallCheck(this, VersionTracker);

	    this.initValue = 0;
	    this.map = {};
	  }

	  _createClass(VersionTracker, [{
	    key: "get",
	    value: function get(key) {
	      return this.map[key] || this.initValue;
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      return this.map[key] = value;
	    }
	  }, {
	    key: "inc",
	    value: function inc(key) {
	      return this.set(key, this.get(key) + 1);
	    }
	  }]);

	  return VersionTracker;
	}();

	exports.default = VersionTracker;

/***/ }
/******/ ])
});
;