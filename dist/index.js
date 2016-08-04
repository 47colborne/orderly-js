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

	var _debug = __webpack_require__(3);

	var _ajax = __webpack_require__(4);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _job = __webpack_require__(9);

	var _job2 = _interopRequireDefault(_job);

	var _queue = __webpack_require__(10);

	var _queue2 = _interopRequireDefault(_queue);

	var _worker = __webpack_require__(13);

	var _worker2 = _interopRequireDefault(_worker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Orderly() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var debug = _ref.debug;
	  var max = _ref.max;
	  var sleep = _ref.sleep;


	  // ============================================
	  // SET DEBUG MODE
	  // ============================================
	  (0, _debug.setMode)(debug);

	  // ============================================
	  // INITIALIZE QUEUE AND WORKER
	  // ============================================
	  var queue = new _queue2.default();
	  var worker = new _worker2.default(queue, { max: max, sleep: sleep });

	  // ============================================
	  // PUBLIC INTERFACE
	  // ============================================

	  function ajax(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var req = new _ajax2.default(url, options);
	    var job = new _job2.default({ action: req.execute, priority: options.priority });

	    queue.add(job);

	    return req;
	  }

	  function get(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, Object.assign(options, { method: 'GET' }));
	  }

	  function post(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, Object.assign(options, { method: 'POST' }));
	  }

	  function put(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, Object.assign(options, { method: 'PUT' }));
	  }

	  function del(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    return ajax(url, Object.assign(options, { method: 'DELETE' }));
	  }

	  return { ajax: ajax, get: get, post: post, put: put, del: del, queue: queue, worker: worker };
	}

	exports.default = Orderly;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var mode = false;

	function setMode(boolean) {
	  return mode = boolean;
	}

	function getMode() {
	  return mode;
	}

	function log(klass, action) {
	  var args = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  if (mode) {
	    var msg = Object.keys(args).reduce(function (msg, key) {
	      var value = args[key];
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') value = JSON.stringify(value);
	      return msg + ' ' + key + ':' + value;
	    }, klass);

	    msg = msg + ' ' + action;

	    console.log(msg);
	  }
	}

	exports.setMode = setMode;
	exports.getMode = getMode;
		exports.log = log;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _callbacks = __webpack_require__(5);

	var _callbacks2 = _interopRequireDefault(_callbacks);

	var _content_type = __webpack_require__(6);

	var _content_type2 = _interopRequireDefault(_content_type);

	var _url = __webpack_require__(7);

	var _debug = __webpack_require__(3);

	var _version = __webpack_require__(8);

	var _version2 = _interopRequireDefault(_version);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var SKIP_STATUS = 'skipped';
	var CANCEL_STATUS = 'cancelled';
	var STAMP_KEY = '_v';

	function logAction(action, version, priority) {
	  (0, _debug.log)('Ajax', action, {
	    url: version.key,
	    id: version.id,
	    priority: priority
	  });
	}

	function someConditionMet(conditions, value) {
	  return conditions.some(function (condition) {
	    return condition(value);
	  });
	}

	function shouldSkip(conditions, version) {
	  return someConditionMet(conditions) || version.sentIsOutdated();
	}

	function shouldCancel(resp, conditions, version, priority, reject) {
	  if (someConditionMet(conditions, resp) || version.receivedIsOutdated()) {
	    logAction('CANCELLED', version, priority);
	    resp = _extends({}, resp, { status: CANCEL_STATUS });
	    return reject(resp);
	  } else {
	    logAction('RECEIVED', version, priority);
	  }
	}

	function stamp(resp, key, value) {
	  {
	    resp[key] = value;
	  }
	}

	function proxy(callback) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return function (resp) {
	    callback.apply(undefined, [resp].concat(args));
	    return resp;
	  };
	}

	function initHeader(headers, type) {
	  return new Headers(_extends({}, headers, _content_type2.default.request(type)));
	}

	function initBody(body, type) {
	  return body && type === 'json' ? JSON.stringify(body) : body;
	}

	function initRequest(url, _ref) {
	  var headers = _ref.headers;
	  var body = _ref.body;
	  var type = _ref.type;

	  var options = _objectWithoutProperties(_ref, ['headers', 'body', 'type']);

	  headers = initHeader(headers, type);
	  body = initBody(body, type);
	  return new Request(url, _extends({}, options, { headers: headers, body: body }));
	}

	function initAction(request, _ref2, version) {
	  var type = _ref2.type;
	  var priority = _ref2.priority;

	  return function (resolve, reject) {
	    return function (conditions) {
	      if (shouldSkip(conditions, version)) {
	        logAction('SKIPPED', version, priority);
	        return reject({ status: SKIP_STATUS });
	      }

	      version.sent();
	      logAction('SENT', version, priority);

	      return fetch(request).then(proxy(shouldCancel, conditions, version, priority, reject)).then(proxy(version.received)).then(proxy(stamp, STAMP_KEY, version)).then(_content_type2.default.parse(type)).then(resolve).catch(reject);
	    };
	  };
	}

	function initExecute(func, conditions) {
	  return function () {
	    return func(conditions);
	  };
	}

	var Ajax = function () {
	  function Ajax(url) {
	    var _this = this;

	    var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var version = _ref3.version;

	    var options = _objectWithoutProperties(_ref3, ['version']);

	    _classCallCheck(this, Ajax);

	    version = new _version2.default((0, _url.filterParams)(url), version);

	    var request = initRequest(url, options);
	    var action = initAction(request, options, version);

	    this.conditions = [];
	    this.q = new Promise(function (resolve, reject) {
	      action = action(resolve, reject);
	      _this.execute = initExecute(action, _this.conditions);
	    });

	    logAction('CREATED', version, options.priority);
	  }

	  _createClass(Ajax, [{
	    key: 'cancel',
	    value: function cancel(callback) {
	      this.conditions.push(callback);
	      return this;
	    }
	  }, {
	    key: 'catch',
	    value: function _catch(callback) {
	      this.q = this.q.catch(callback);
	      return this;
	    }
	  }, {
	    key: 'fail',
	    value: function fail(callback) {
	      return this.then(_callbacks2.default.onFail(callback));
	    }
	  }, {
	    key: 'success',
	    value: function success(callback) {
	      return this.then(_callbacks2.default.onSuccess(callback));
	    }
	  }, {
	    key: 'then',
	    value: function then(callback) {
	      this.q = this.q.then(callback);
	      return this;
	    }
	  }]);

	  return Ajax;
	}();

		exports.default = Ajax;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function buildCallback(callback, condition) {
	  return function (resp) {
	    if (condition(resp)) {
	      resp = callback(resp);
	    }

	    return resp;
	  };
	}

	function onFail(callback, cancelConditions) {
	  return buildCallback(callback, function (resp) {
	    return resp.status >= 400;
	  });
	}

	function onSuccess(callback, cancelConditions) {
	  return buildCallback(callback, function (resp) {
	    return resp.status < 400;
	  });
	}

	exports.default = { buildCallback: buildCallback, onFail: onFail, onSuccess: onSuccess };

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function bodyContainsJson(resp) {
	  return resp._bodyBlob.type.includes('application/json');
	}

	function parse(type) {
	  return function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resp) {
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (!type) {
	                _context.next = 6;
	                break;
	              }

	              _context.next = 3;
	              return resp[type]();

	            case 3:
	              resp.data = _context.sent;
	              _context.next = 10;
	              break;

	            case 6:
	              if (!bodyContainsJson(resp)) {
	                _context.next = 10;
	                break;
	              }

	              _context.next = 9;
	              return resp.json();

	            case 9:
	              resp.data = _context.sent;

	            case 10:
	              return _context.abrupt('return', resp);

	            case 11:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));

	    return function (_x) {
	      return _ref.apply(this, arguments);
	    };
	  }();
	}

	function request(type) {
	  if (type) {
	    return {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    };
	  }
	}

	exports.default = { bodyContainsJson: bodyContainsJson, parse: parse, request: request };

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PARAMS_FORMAT = new RegExp(/\?.*$/);

	function filterParams(url) {
	  return url.toString().replace(PARAMS_FORMAT, '');
	}

	exports.filterParams = filterParams;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function initValue() {
	  return { counter: 0, sent: 0, received: 0 };
	}

	var Version = function () {
	  function Version(key, check) {
	    _classCallCheck(this, Version);

	    _initialiseProps.call(this);

	    this.check = check !== undefined ? check : true;
	    this.key = key;
	    this.id = Version.inc(key);
	  }

	  _createClass(Version, [{
	    key: 'keyIsOyutdated',
	    value: function keyIsOyutdated(key) {
	      return this.check && Version.get(this.key)[key] > this.id;
	    }
	  }]);

	  return Version;
	}();

	Version.map = {};

	Version.get = function (key) {
	  return this.map[key] || (this.map[key] = initValue());
	};

	Version.inc = function (key) {
	  return this.get(key).counter += 1;
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this = this;

	  this.sentIsOutdated = function () {
	    return _this.keyIsOyutdated('sent');
	  };

	  this.receivedIsOutdated = function () {
	    return _this.keyIsOyutdated('received');
	  };

	  this.sent = function () {
	    var versionForKey = Version.get(_this.key);
	    if (versionForKey.sent < _this.id) {
	      return versionForKey.sent = _this.id;
	    }
	  };

	  this.received = function () {
	    var versionForKey = Version.get(_this.key);
	    if (versionForKey.received < _this.id) {
	      return versionForKey.received = _this.id;
	    }
	  };
	};

		exports.default = Version;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Job = function Job() {
	  var _this = this;

	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var action = _ref.action;
	  var _ref$priority = _ref.priority;
	  var priority = _ref$priority === undefined ? 0 : _ref$priority;

	  var options = _objectWithoutProperties(_ref, ['action', 'priority']);

	  _classCallCheck(this, Job);

	  this.execute = function () {
	    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(callback) {
	      var result;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return _this.action();

	            case 2:
	              result = _context.sent;

	              if (callback && typeof callback === 'function') {
	                callback(result);
	              }

	              return _context.abrupt('return', result);

	            case 5:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, _this);
	    }));

	    return function (_x2) {
	      return _ref2.apply(this, arguments);
	    };
	  }();

	  this.action = action;
	  this.priority = priority;
	  this.options = options;
	};

		exports.default = Job;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fastpriorityqueue = __webpack_require__(11);

	var _fastpriorityqueue2 = _interopRequireDefault(_fastpriorityqueue);

	var _debug = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultStrategy(_ref, _ref2) {
	  var x = _ref.priority;
	  var y = _ref2.priority;

	  return y === undefined || x > y;
	}

	var Queue = function () {
	  function Queue() {
	    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref3$strategy = _ref3.strategy;
	    var strategy = _ref3$strategy === undefined ? defaultStrategy : _ref3$strategy;

	    _classCallCheck(this, Queue);

	    this.queue = new _fastpriorityqueue2.default(strategy);
	  }

	  _createClass(Queue, [{
	    key: 'add',
	    value: function add(obj) {
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.action === 'function') {
	        this.queue.add(obj);
	        return obj;
	      } else {
	        throw new Error('trying to insert an invalid job', obj);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      (0, _debug.log)('Queue', 'getting a job', { size: this.size() });
	      return this.queue.poll();
	    }
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.queue.isEmpty();
	    }
	  }, {
	    key: 'size',
	    value: function size() {
	      return this.queue.size;
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup() {
	      return this.queue.trim();
	    }
	  }]);

	  return Queue;
	}();

		exports.default = Queue;

/***/ },
/* 11 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)(module)))

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function isFree(pending, max) {
	  return pending <= max;
	}

	function hasJob(queue) {
	  return !queue.isEmpty();
	}

	function dispatch(func) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return setTimeout.apply(undefined, [func, 0].concat(args));
	}

	var Worker = function () {
	  function Worker(queue) {
	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref$sleep = _ref.sleep;
	    var sleep = _ref$sleep === undefined ? 50 : _ref$sleep;
	    var _ref$max = _ref.max;
	    var max = _ref$max === undefined ? 8 : _ref$max;

	    _classCallCheck(this, Worker);

	    _initialiseProps.call(this);

	    this.pending = 0;
	    this.continue = true;

	    this.start(queue, sleep, max);
	  }

	  _createClass(Worker, [{
	    key: "stop",
	    value: function stop() {
	      this.continue = false;
	      clearTimeout(this.setTimeout);
	    }
	  }]);

	  return Worker;
	}();

	var _initialiseProps = function _initialiseProps() {
	  var _this = this;

	  this.start = function (queue, sleep, max) {
	    while (_this.continue && isFree(_this.pending, max) && hasJob(queue)) {
	      _this.pending += 1;
	      var job = queue.get();
	      dispatch(job.execute, _this.complete);
	    }

	    if (_this.continue) {
	      queue.cleanup();
	      _this.setTimeout = setTimeout(_this.start, sleep, queue, sleep, max);
	    }
	  };

	  this.complete = function () {
	    _this.pending -= 1;
	  };
	};

		exports.default = Worker;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map