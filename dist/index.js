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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _debug = __webpack_require__(3);
	
	var _request = __webpack_require__(4);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _job = __webpack_require__(10);
	
	var _job2 = _interopRequireDefault(_job);
	
	var _queue = __webpack_require__(11);
	
	var _queue2 = _interopRequireDefault(_queue);
	
	var _worker = __webpack_require__(14);
	
	var _worker2 = _interopRequireDefault(_worker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Orderly() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var debug = _ref.debug;
	  var max = _ref.max;
	  var sleep = _ref.sleep;
	
	
	  // ============================================
	  // debug mode
	  // ============================================
	  (0, _debug.setMode)(debug);
	
	  // ============================================
	  // initialize queue and worker
	  // ============================================
	  var queue = new _queue2.default();
	  var worker = new _worker2.default(queue, { max: max, sleep: sleep });
	
	  // ============================================
	  // Public Functions
	  // ============================================
	
	  // create an ajax request
	  // that wraps inside a job with priority
	  // and insert the job to the queue
	  // finally return the request
	  function ajax(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var priority = options.priority;
	
	    var rest = _objectWithoutProperties(options, ['priority']);
	
	    var req = new _request2.default(url, rest);
	    var job = new _job2.default({ action: req.execute, priority: priority });
	    queue.add(job);
	    return req;
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
	
	  return { ajax: ajax, get: get, post: post, put: put, del: del, queue: queue, worker: worker };
	}
	
	exports.default = Orderly;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mode = false;
	
	function setMode(boolean) {
	  return mode = boolean;
	}
	
	function getMode() {
	  return mode;
	}
	
	function log(klass, action) {
	  var _console;
	
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  if (mode) (_console = console).log.apply(_console, ["Orderly." + klass + " - " + action + " -"].concat(args));
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
	exports.default = undefined;
	
	var _ajax = __webpack_require__(5);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _ajax2.default;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _Version = __webpack_require__(6);
	
	var _Version2 = _interopRequireDefault(_Version);
	
	var _callbacks = __webpack_require__(7);
	
	var _content_type = __webpack_require__(8);
	
	var _url = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function someConditionMet(conditions, value) {
	  return conditions.some(function (condition) {
	    return condition(value);
	  });
	}
	
	function shouldSkip(conditions) {
	  return someConditionMet(conditions);
	}
	
	function shouldCancel(conditions, reject) {
	  return function (resp) {
	    var skip = shouldSkip(conditions);
	    if (skip) reject(_extends({}, resp, { status: 'cancelled' }));
	    return skip;
	  };
	}
	
	function initHeader(headers, type) {
	  return new Headers(_extends({}, headers, (0, _content_type.requestContentType)(type)));
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
	  options = _extends({}, options, { headers: headers, body: body });
	
	  return new Request(url, _extends({}, options, { headers: headers, body: body }));
	}
	
	function initAction(request, _ref2, version) {
	  var type = _ref2.type;
	
	  return function (resolve, reject) {
	    return function (conditions) {
	
	      if (shouldCancel(conditions, reject)()) return;
	
	      version.setAsCurrent();
	
	      return fetch(request).then(shouldCancel(conditions, reject)).then((0, _content_type.parseContentType)(type)).then(resolve).then(reject);
	    };
	  };
	}
	
	function initExecute(action, conditions) {
	  return function () {
	    return action(conditions);
	  };
	}
	
	var Ajax = function () {
	  function Ajax(url) {
	    var _this = this;
	
	    var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var version = _ref3.version;
	
	    var options = _objectWithoutProperties(_ref3, ['version']);
	
	    _classCallCheck(this, Ajax);
	
	    this.q = new Promise(function (resolve, reject) {
	      var request = initRequest(url, options);
	      var version = new _Version2.default((0, _url.filterParams)(url), version);
	      var action = initAction(request, options, version);
	
	      action = action(resolve, reject);
	
	      _this.conditions = [version.isOutdated];
	      _this.execute = initExecute(action, _this.conditions);
	    });
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
	      this.q.catch(callback);
	      return this;
	    }
	  }, {
	    key: 'fail',
	    value: function fail(callback) {
	      return this.then((0, _callbacks.onFail)(callback));
	    }
	  }, {
	    key: 'success',
	    value: function success(callback) {
	      return this.then((0, _callbacks.onSuccess)(callback));
	    }
	  }, {
	    key: 'then',
	    value: function then(callback) {
	      this.q.then(callback);
	      return this;
	    }
	  }]);
	
	  return Ajax;
	}();
	
	exports.default = Ajax;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function initValue() {
	  return { counter: 0, current: 0 };
	}
	
	var Version = function Version(key, willOutdated) {
	  _classCallCheck(this, Version);
	
	  _initialiseProps.call(this);
	
	  this.willOutdated = willOutdated !== undefined ? willOutdated : true;
	  this.key = key;
	  this.id = Version.inc(key);
	};
	
	// class VersionTracker {
	//   constructor() {
	//     this.initValue = 0
	//     this.map = {}
	//   }
	
	//   get(key) {
	//     return this.map[key] || (this.map[key] = { counter: 0, current: 0 })
	//   }
	
	//   getCounter(key) {
	//     return this.get(key).counter
	//   }
	
	//   getCurrent(key) {
	//     return this.get(key).current
	//   }
	
	//   setCurrent(key, val) {
	//     return this.get(key).current = val
	//   }
	
	//   inc(key) {
	//     return (this.map[key] || (this.map[key] = this.get(key))).counter += 1
	//   }
	// }
	
	Version.map = {};
	
	Version.get = function (key) {
	  return this.map[key] || (this.map[key] = initValue());
	};
	
	Version.inc = function (key) {
	  return this.get(key).counter += 1;
	};
	
	var _initialiseProps = function _initialiseProps() {
	  var _this = this;
	
	  this.isOutdated = function () {
	    return _this.willOutdated && Version.get(_this.key).current > _this.id;
	  };
	
	  this.setAsCurrent = function () {
	    var versionForKey = Version.get(_this.key);
	    if (versionForKey.current < _this.id) {
	      return versionForKey.current = _this.id;
	    }
	
	    debugger;
	  };
	};
	
	exports.default = Version;

/***/ },
/* 7 */
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
	
	function onCatch(callback, cancelConditions) {
	  return callback;
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
	
	exports.buildCallback = buildCallback;
	exports.onCatch = onCatch;
	exports.onFail = onFail;
	exports.onSuccess = onSuccess;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function bodyContainsJson(resp) {
	  return resp._bodyBlob.type.includes('application/json');
	}
	
	function parseContentType(type) {
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
	
	function requestContentType(type) {
	  if (type) {
	    return {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    };
	  }
	}
	
	exports.bodyContainsJson = bodyContainsJson;
	exports.parseContentType = parseContentType;
	exports.requestContentType = requestContentType;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _debug = __webpack_require__(3);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Job = function () {
	  function Job() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var action = _ref.action;
	    var _ref$priority = _ref.priority;
	    var priority = _ref$priority === undefined ? 0 : _ref$priority;
	
	    var options = _objectWithoutProperties(_ref, ['action', 'priority']);
	
	    _classCallCheck(this, Job);
	
	    this.action = action;
	    this.priority = priority;
	    this.options = options;
	
	    (0, _debug.log)('Job', 'constructed', this.priority, this.options);
	  }
	
	  _createClass(Job, [{
	    key: 'execute',
	    value: function () {
	      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(callback) {
	        var result;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                (0, _debug.log)('Job', 'executing', this.priority, this.options);
	
	                _context.next = 3;
	                return this.action();
	
	              case 3:
	                result = _context.sent;
	
	                if (callback && typeof callback === 'function') {
	                  callback(result);
	                }
	
	                return _context.abrupt('return', result);
	
	              case 6:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	
	      function execute(_x2) {
	        return _ref2.apply(this, arguments);
	      }
	
	      return execute;
	    }()
	  }]);
	
	  return Job;
	}();
	
	exports.default = Job;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _fastpriorityqueue = __webpack_require__(12);
	
	var _fastpriorityqueue2 = _interopRequireDefault(_fastpriorityqueue);
	
	var _debug = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Queue = function () {
	  function Queue() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$strategy = _ref.strategy;
	    var strategy = _ref$strategy === undefined ? this.__defaultStrategy__ : _ref$strategy;
	    var debug = _ref.debug;
	
	    _classCallCheck(this, Queue);
	
	    this.q = new _fastpriorityqueue2.default(strategy);
	    this.debug = debug;
	  }
	
	  _createClass(Queue, [{
	    key: 'add',
	    value: function add(obj) {
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty('action')) {
	        return this.q.add(obj);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      (0, _debug.log)('Queue', 'get', 'size: ' + this.size());
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
/* 12 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	      return job.execute(_this.complete);
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
	    key: "dispatch",
	    value: function dispatch(func, job) {
	      return setTimeout(func, 0, job);
	    }
	  }, {
	    key: "available",
	    get: function get() {
	      return this.pending < this.max;
	    }
	  }, {
	    key: "hasJob",
	    get: function get() {
	      return !this.queue.isEmpty();
	    }
	  }]);
	
	  return Worker;
	}();
	
	exports.default = Worker;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map