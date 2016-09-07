(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SQS"] = factory();
	else
		root["SQS"] = factory();
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ImageLoader = __webpack_require__(1);
	
	var _ImageLoader2 = _interopRequireDefault(_ImageLoader);
	
	var _Lifecycle = __webpack_require__(2);
	
	var _Lifecycle2 = _interopRequireDefault(_Lifecycle);
	
	var _Tweak = __webpack_require__(3);
	
	var _Tweak2 = _interopRequireDefault(_Tweak);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The public JavaScript API for Squarespace template developers.
	 * @namespace SQS
	 */
	var SQS = {
	  ImageLoader: _ImageLoader2.default,
	  Lifecycle: _Lifecycle2.default,
	  Tweak: _Tweak2.default
	};
	
	exports.default = SQS;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * ​Squarespace comes with a number of built-in facilities for managing images
	 * that are uploaded to our system. After uploading an image into a collection,
	 * Squarespace automatically creates multiple copies of the image with different 
	 * sizes. Our ImageLoader will then help render images properly when they are
	 * presented on a page, even on retina displays.
	 *
	 * ImageLoader can also be used to fit or fill an image inside ​a parent
	 * container, where it automatically determines which image size to use
	 * depending on the current dimensions of the container.
	 *
	 * WARNING:
	 * Currently, ImageLoader is present on all Squarespace sites under the global
	 * namespace ImageLoader, but this is an unsupported API and we recommend
	 * accessing this functionality through squarespace-core.
	 *
	 * @namespace ImageLoader
	 */
	var ImageLoader = {
	
	  /**
	   * Using the global ImageLoader namespace, calls ImageLoader.load on the
	   * given node with the given config options.
	   *
	   * @method load
	   * @param  {HTMLElement} img    Image node to be loaded
	   * @param  {Object} config      Config object
	   * @return {Boolean}            True if the image was loaded, false otherwise
	   */
	  load: function load(img, config) {
	    return window.ImageLoader.load(img, config);
	  }
	};
	
	/**
	 * @exports {Object} ImageLoader
	 */
	exports.default = ImageLoader;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Squarespace provides default functionality for some content that users add
	 * in the CMS.
	 *
	 * If you are building a Developer Platform site that loads Squarespace content
	 * through an XHR or some other kind of AJAX, you can use the Lifecycle methods
	 * provided here to initialize and/or destroy this functionality.
	 *
	 * WARNING:
	 * The functionality called by Lifecycle is available on the global namespace
	 * window.Squarespace, but this is an unsupported API and it is highly
	 * recommended that you access it through squarespace-core.
	 *
	 * @namespace Lifecycle
	 */
	var Lifecycle = {
	
	  /**
	   * Squarespace.afterBodyLoad() trigger loads scripts and calls onInitialize,
	   * which individual modules' init functions are bound to. This should be
	   * called after new HTML content containing Squarespace default functionality
	   * is added to a page (for example, after AJAX loading a new page).
	   *
	   * @method init
	   */
	  init: function init() {
	    window.Squarespace.AFTER_BODY_LOADED = false;
	    window.Squarespace.afterBodyLoad();
	  },
	
	
	  /**
	   * Squarespace.globalDestroy calls onDestroy, triggering each module's
	   * destructor. This should be called prior to loading in new HTML content
	   * containing Squarespace default functionality.
	   *
	   * @method  destroy
	   */
	  destroy: function destroy() {
	    window.Squarespace.globalDestroy(Y);
	  }
	};
	
	/**
	 * @exports {Object} Lifecycle
	 */
	exports.default = Lifecycle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @const {Object} tweaksToWatch
	 */
	var tweaksToWatch = {
	  all: {
	    callbacks: []
	  }
	};
	
	/**
	 * Tweaks allow a developer to isolate specific elements of the design and
	 * present options to the user in an easy-to-use interface. Tweaks are surfaced
	 * in the Squarespace interface through Style Editor (e.g.
	 * yoursite.squarespace.com/config/design/style). Using tweaks, a user can make
	 * presentational changes to their website without having to know or edit CSS code.
	 *
	 * Tweaks are typically used by the developers through LESS variables, mixins,
	 * and class names added to the <body> element.
	 * 
	 * Sometimes, a developer may find it necessary to access the value of a tweak
	 * through Javascript, or to watch for changes in that tweak and update the DOM
	 * accordingly. The Tweak module of squarespace-core is meant to provide an
	 * official interface for doing so.
	 *
	 * @namespace Tweak
	 */
	var Tweak = {
	
	  /**
	   * Gets the value of one of the tweaks given its name.
	   *
	   * @method getValue
	   * @param {String} name      Name of the tweak
	   * @returns {String}         The value of the tweak
	   */
	  getValue: function getValue(name) {
	    if (!name || typeof name !== 'string') {
	      console.error('squarespace-core: Invalid tweak name ' + name);
	      return null;
	    }
	
	    return Y.Squarespace.Template.getTweakValue(name);
	  },
	
	
	  /**
	   * Listen for changes on a tweak item. If one parameter is provided, the
	   * callback will be executed every time any tweak changes. If two parameters
	   * are provided and the first parameter is a String, the callback will be
	   * executed only when that particular tweak changes. If two parameters are
	   * provided and the first parameter is an Array of strings, the callback will
	   * be executed any time one of those tweaks changes.
	   *
	   * @method watch
	   * @param {String}          Optional: Name of the tweak
	   * @param {Array}           Optional: Array with multiple tweak names
	   * @param {Function}        Callback to call when watcher is triggered
	   */
	  watch: function watch() {
	    var _arguments = arguments;
	
	    if (arguments.length === 0) {
	      console.error('squarespace-core: ' + 'Tweak.watch must be called with at least one parameter');
	      return;
	    }
	
	    if (arguments.length === 1) {
	      // Only callback passed in, no tweak name string or tweaks array passed.
	      // Run callback for all tweaks.
	      if (typeof arguments[0] === 'function') {
	        tweaksToWatch.all.callbacks.push(arguments[0]);
	      }
	      return;
	    }
	
	    if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
	      // Specific tweak name passed in. Run callback when that tweak is changed.
	      var tweakName = arguments[0];
	      if (!tweaksToWatch[tweakName]) {
	        tweaksToWatch[tweakName] = {
	          callbacks: []
	        };
	      }
	      tweaksToWatch[tweakName].callbacks.push(arguments[1]);
	    } else if (arguments[0].constructor === Array && typeof arguments[1] === 'function') {
	      // Multiple tweak names passed in as array. Run callback when any one of
	      // those tweaks are changed.
	      arguments[0].forEach(function (tweakName) {
	        if (!tweaksToWatch[tweakName]) {
	          tweaksToWatch[tweakName] = {
	            callbacks: []
	          };
	        }
	        tweaksToWatch[tweakName].callbacks.push(_arguments[1]);
	      });
	    }
	  }
	};
	
	if (window.Y.Global) {
	  // If Y.Global is present on the page, set up the tweak event listener.
	  window.Y.Global.on('tweak:change', function (e) {
	    var tweakName = e.getName();
	    var callbackSignature = {
	      name: tweakName,
	      value: e.config && e.config.value || e.value
	    };
	
	    if (tweaksToWatch[tweakName]) {
	      tweaksToWatch[tweakName].callbacks.forEach(function (callback) {
	        try {
	          callback(callbackSignature);
	        } catch (err) {
	          console.error(err);
	        }
	      });
	    }
	
	    if (tweaksToWatch.all.callbacks.length > 0) {
	      tweaksToWatch.all.callbacks.forEach(function (callback) {
	        try {
	          callback(callbackSignature);
	        } catch (err) {
	          console.error(err);
	        }
	      });
	    }
	  });
	}
	
	/**
	 * @exports {Object} Tweak
	 */
	exports.default = Tweak;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=core-0.1.5.js.map