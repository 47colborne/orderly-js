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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _debug = __webpack_require__(3);

	var _ajax = __webpack_require__(4);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _job = __webpack_require__(12);

	var _job2 = _interopRequireDefault(_job);

	var _queue = __webpack_require__(13);

	var _queue2 = _interopRequireDefault(_queue);

	var _worker = __webpack_require__(16);

	var _worker2 = _interopRequireDefault(_worker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Orderly = function () {

	  // ============================================
	  // PUBLIC INTERFACE
	  // ============================================

	  // ============================================
	  // CLASS SHARED VERIABLES
	  // ============================================

	  function Orderly() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Orderly);

	    this.options = options;
	  }

	  // ============================================
	  // CLASS FUNCTIONS
	  // ============================================

	  // ============================================
	  // SET DEBUG MODE
	  // ============================================

	  _createClass(Orderly, [{
	    key: 'withOptions',
	    value: function withOptions() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      return new Orderly(_extends({}, this.options, options));
	    }
	  }, {
	    key: 'after',
	    value: function after(callback) {
	      if (typeof callback !== 'function') throw "Invalid Function Call #after";
	      this.options.after = callback;
	      return this;
	    }
	  }, {
	    key: 'before',
	    value: function before(callback) {
	      if (typeof callback !== 'function') throw "Invalid Function Call #before";
	      this.options.before = callback;
	      return this;
	    }
	  }, {
	    key: 'ajax',
	    value: function ajax(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (!url) throw "Invalid URL: url is undefined";

	      var req = new _ajax2.default(url, Object.assign({}, this.options, options));
	      var job = new _job2.default(req.execute, options.priority);

	      Orderly.queue.add(job);

	      return req;
	    }
	  }, {
	    key: 'get',
	    value: function get(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return this.ajax(url, Object.assign(options, { method: 'GET' }));
	    }
	  }, {
	    key: 'post',
	    value: function post(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return this.ajax(url, Object.assign(options, { method: 'POST' }));
	    }
	  }, {
	    key: 'put',
	    value: function put(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return this.ajax(url, Object.assign(options, { method: 'PUT' }));
	    }
	  }, {
	    key: 'del',
	    value: function del(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return this.ajax(url, Object.assign(options, { method: 'DELETE' }));
	    }
	  }]);

	  return Orderly;
	}();

	Orderly.debugMode = function (bool) {
	  (0, _debug.setMode)(bool);
	  return this;
	};

	Orderly.queue = undefined;
	Orderly.worker = undefined;
	Orderly.global = undefined;

	Orderly.start = function () {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var max = _ref.max;
	  var sleep = _ref.sleep;

	  if (!this.worker) {
	    this.queue = new _queue2.default();
	    this.worker = new _worker2.default(this.queue, { max: max, sleep: sleep });
	    this.default = new Orderly();
	  }

	  this.worker.start();

	  return this.default;
	};

	Orderly.pause = function () {
	  if (this.worker) this.worker.stop();
	};

	Orderly.stop = function () {
	  this.pause();
	  this.queue = this.worker = this.default = undefined;
	};

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _callbacks = __webpack_require__(5);

	var _request = __webpack_require__(6);

	var _request2 = _interopRequireDefault(_request);

	var _response = __webpack_require__(7);

	var _response2 = _interopRequireDefault(_response);

	var _constants = __webpack_require__(8);

	var _misc = __webpack_require__(9);

	var _version = __webpack_require__(10);

	var _version2 = _interopRequireDefault(_version);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function abortResponse(version, sent) {
	  var _ref;

	  return _ref = {}, _defineProperty(_ref, _constants.VERSION_KEY, version), _defineProperty(_ref, 'aborted', true), _defineProperty(_ref, 'sent', sent), _ref;
	}

	function conditionMet(condition, arg) {
	  return typeof condition === 'function' && condition(arg);
	}

	function shouldSkip(skip, condition, version) {
	  return skip !== false && (_version2.default.isOutdated(version, 'sent') || conditionMet(condition));
	}

	function shouldCancel(resp, condition, version, priority) {
	  if (_version2.default.isOutdated(version, 'received') || conditionMet(condition, resp)) {
	    var _resp = abortResponse(version, true);
	    throw _resp;
	  }
	}

	function appendVersion(resp, value) {
	  resp[_constants.VERSION_KEY] = value;
	}

	function initHeader() {
	  var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var body = arguments[1];
	  var type = arguments[2];

	  return Object.assign(headers, _request2.default.accepts(type), _request2.default.contentType(body, type));
	}

	function initBody(body, type) {
	  return body && ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' || type === 'json') ? JSON.stringify(body) : body;
	}

	function initRequest(url, _ref2) {
	  var before = _ref2.before;
	  var headers = _ref2.headers;
	  var body = _ref2.body;
	  var type = _ref2.type;

	  var options = _objectWithoutProperties(_ref2, ['before', 'headers', 'body', 'type']);

	  options.headers = initHeader(headers, body, type);
	  options.body = initBody(body, type);

	  if (before) before(options);

	  return options;
	}

	function initAction(url, request, version, _ref3) {
	  var type = _ref3.type;
	  var priority = _ref3.priority;
	  var skip = _ref3.skip;

	  return function (condition) {
	    if (shouldSkip(skip, condition, version)) {
	      var resp = abortResponse(version, false);
	      return Promise.reject(resp);
	    }

	    version.sent();
	    (0, _misc.debugLogger)('SENT', version, priority);

	    return fetch(url, request).then((0, _callbacks.proxy)(shouldCancel, condition, version, priority)).then((0, _callbacks.proxy)(version.received)).then((0, _callbacks.proxy)(appendVersion, version)).then(_response2.default.contentType);
	  };
	}

	var Ajax = function () {
	  function Ajax(url) {
	    var _this = this;

	    var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var after = _ref4.after;
	    var version = _ref4.version;

	    var options = _objectWithoutProperties(_ref4, ['after', 'version']);

	    _classCallCheck(this, Ajax);

	    _initialiseProps.call(this);

	    version = new _version2.default(url, version);
	    var request = initRequest(url, options);
	    var action = initAction(url, request, version, options);

	    this.q = new Promise(function (resolve, reject) {
	      _this.execute = function (callback) {
	        return action(_this.abortCondition).then((0, _callbacks.proxy)(callback), (0, _callbacks.catchProxy)(callback)).then((0, _callbacks.proxy)(after)).then(_this.__done__).then(resolve).catch(_this.__abort__(version, options)).catch(reject).then(_this.__cleanup__);
	      };
	    });

	    (0, _misc.debugLogger)('CREATED', version, options.priority);
	  }

	  _createClass(Ajax, [{
	    key: 'abort',
	    value: function abort(callback) {
	      this.abortCallback = callback;
	      return this;
	    }
	  }, {
	    key: 'abortWhen',
	    value: function abortWhen(callback) {
	      this.abortCondition = callback;
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
	      this.q = this.q.then(callback);
	      return this;
	    }
	  }]);

	  return Ajax;
	}();

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.__done__ = function (resp) {
	    return _this2.q = Promise.resolve(resp);
	  };

	  this.__cleanup__ = function () {
	    _this2.execute = _this2.abortCallback = _this2.abortCondition = undefined;
	  };

	  this.__abort__ = function (version, _ref5) {
	    var priority = _ref5.priority;

	    return function (err) {
	      if (err.aborted) {
	        (0, _misc.debugLogger)('ABORTED', version, priority);
	        if (typeof _this2.abortCallback === 'function') _this2.abortCallback(err);
	      } else {
	        throw err;
	      }
	    };
	  };
	};

		exports.default = Ajax;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function proxy(callback) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  if (!callback) {
	    return function (resp) {
	      return resp;
	    };
	  } else {
	    return function (resp) {
	      callback.apply(undefined, [resp].concat(args));
	      return resp;
	    };
	  }
	}

	function catchProxy(callback) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  if (!callback) {
	    return function (err) {
	      throw err;
	    };
	  } else {
	    return function (err) {
	      callback.apply(undefined, [err].concat(args));
	      throw err;
	    };
	  }
	}

	function conditionalProxy(callback, condition) {
	  return function (resp) {
	    if (condition(resp)) callback(resp);
	    return resp;
	  };
	}

	function onFail(callback) {
	  return conditionalProxy(callback, function (resp) {
	    return resp && resp.status >= 400;
	  });
	}

	function onSuccess(callback) {
	  return conditionalProxy(callback, function (resp) {
	    return resp && resp.status < 400;
	  });
	}

	exports.proxy = proxy;
	exports.catchProxy = catchProxy;
	exports.conditionalProxy = conditionalProxy;
	exports.onFail = onFail;
		exports.onSuccess = onSuccess;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function accepts(type) {
	  if (type === 'json') return { 'Accept': 'application/json' };
	}

	function contentType(body, type) {
	  if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' || type === 'json') return { 'Content-Type': 'application/json' };
	}

	exports.default = { contentType: contentType, accepts: accepts };

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getContentType(resp) {
	  var ct = resp.headers.get('Content-Type');

	  if (ct && ct.includes('application/json')) {
	    return 'json';
	  }

	  return 'text';
	}

	function includeDataType(resp) {
	  resp['_t'] = getContentType(resp);
	  return resp;
	}

	function convertDataType(resp) {
	  return resp[resp._t]();
	}

	function includeAsData(resp) {
	  return function (data) {
	    resp['data'] = data;
	    return resp;
	  };
	}

	function contentType(resp) {
	  return Promise.resolve(resp).then(includeDataType).then(convertDataType).then(includeAsData(resp));
	}

	exports.default = { contentType: contentType };

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var STATUS_KEY = 'statusText';
	var STATUS_SKIP = 'skipped';
	var STATUS_CANCEL = 'cancelled';
	var VERSION_KEY = '_v';

	exports.STATUS_KEY = STATUS_KEY;
	exports.STATUS_SKIP = STATUS_SKIP;
	exports.STATUS_CANCEL = STATUS_CANCEL;
		exports.VERSION_KEY = VERSION_KEY;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.debugLogger = undefined;

	var _debug = __webpack_require__(3);

	function debugLogger(action, _ref, priority) {
	  var id = _ref.id;
	  var url = _ref.key;

	  (0, _debug.log)('Orderly', action, { url: url, id: id, priority: priority });
	}

	exports.debugLogger = debugLogger;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _url = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Version = function () {
	  _createClass(Version, null, [{
	    key: 'isOutdated',
	    value: function isOutdated(version, action) {
	      return version.check && this.get(version.key)[action] > version.id;
	    }
	  }, {
	    key: 'sent',
	    value: function sent(version) {
	      var record = this.get(version.key);
	      if (version.id > record.sent) {
	        return record.sent = version.id;
	      }
	    }
	  }, {
	    key: 'received',
	    value: function received(version) {
	      var record = this.get(version.key);
	      if (version.id > record.received) {
	        return record.received = version.id;
	      }
	    }
	  }]);

	  function Version(url) {
	    var _this = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Version);

	    this.sent = function () {
	      return Version.sent(_this);
	    };

	    this.received = function () {
	      return Version.received(_this);
	    };

	    this.check = options !== false;
	    this.key = options.name || (options.filterParams ? (0, _url.filterParams)(url) : url);
	    this.id = Version.inc(this.key);
	  }

	  return Version;
	}();

	Version.map = {};

	Version.get = function (key) {
	  return this.map[key] || (this.map[key] = { counter: 0, sent: 0, received: 0 });
	};

	Version.inc = function (key) {
	  return this.get(key).counter += 1;
	};

		exports.default = Version;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PARAMS_FORMAT = new RegExp(/\?.*$/);

	function filterParams(url) {
	  return url.split('?')[0];
	}

	exports.filterParams = filterParams;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function initExecute(execute) {
	  return function (callback) {
	    return execute(callback);
	  };
	}

	var Job = function Job(execute) {
	  var priority = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	  _classCallCheck(this, Job);

	  this.execute = initExecute(execute);
	  this.priority = priority;
	};

		exports.default = Job;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fastpriorityqueue = __webpack_require__(14);

	var _fastpriorityqueue2 = _interopRequireDefault(_fastpriorityqueue);

	var _debug = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultStrategy(_ref, _ref2) {
	  var _ref$priority = _ref.priority;
	  var p1 = _ref$priority === undefined ? 0 : _ref$priority;
	  var qId1 = _ref.queueId;
	  var _ref2$priority = _ref2.priority;
	  var p2 = _ref2$priority === undefined ? 0 : _ref2$priority;
	  var qId2 = _ref2.queueId;


	  return p1 === p2 && qId2 > qId1 || p2 < p1;
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
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.execute === 'function') {
	        obj.queueId = Queue.inc();
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

	Queue.counter = 0;

	Queue.inc = function () {
	  return this.counter += 1;
	};

		exports.default = Queue;

/***/ },
/* 14 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 15 */
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
/* 16 */
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
	    var sleep = _ref$sleep === undefined ? 32 : _ref$sleep;
	    var _ref$max = _ref.max;
	    var max = _ref$max === undefined ? 8 : _ref$max;

	    _classCallCheck(this, Worker);

	    this.start = function () {
	      while (_this.pending < _this.max && !_this.queue.isEmpty()) {
	        _this.pending += 1;
	        var job = _this.queue.get();

	        setTimeout(job.execute, 0, _this.complete);
	      }

	      _this.queue.cleanup();

	      if (_this.continue) _this.setTimeout = setTimeout(_this.start, _this.sleep);
	    };

	    this.complete = function () {
	      _this.pending -= 1;
	    };

	    this.queue = queue;
	    this.sleep = sleep;
	    this.max = max;

	    this.pending = 0;
	    this.continue = true;
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

		exports.default = Worker;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map