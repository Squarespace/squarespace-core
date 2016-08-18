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

	var ImageLoader = __webpack_require__(1);
	var Tweak = __webpack_require__(2);
	var Lifecycle = __webpack_require__(3);
	
	/**
	 * The public JavaScript API for Squarespace template developers.
	 * @namespace Space
	 */
	var SQS = {
	  ImageLoader: ImageLoader,
	  Tweak: Tweak,
	  Lifecycle: Lifecycle
	};
	
	module.exports = SQS;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @namespace ImageLoader
	 */
	var ImageLoader = {
	
	  /**
	   * @method load
	   * @param {Node} img
	   * @param {Object} config
	   */
	  load: function(img, config) {
	    return window.ImageLoader.load(img, config);
	  }
	};
	
	/**
	 * @exports {Object} ImageLoader
	 */
	module.exports = ImageLoader;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @var {Object} tweaksToWatch
	 */
	var tweaksToWatch = { all: { callbacks: [] } };
	
	/**
	 * Tweaks are items in the Squarespace Style Editor. You can get a tweak
	 * value to use in your JavaScript or watch a tweak for a changing value.
	 *
	 * @namespace Tweak
	 * @memberof Squarespace
	 */
	var Tweak = {
	
	  /**
	   * Gets the value of one of the style editor tweaks.
	   *
	   * @method getValue
	   * @param {String} name
	   * @returns {*} The tweak value, can be any type.
	   */
	  getValue: function (name) {
	    if (!name || typeof name !== 'string') {
	      return null;
	    }
	
	    return Y.Squarespace.Template.getTweakValue(name);
	  },
	
	  /**
	   * Listen for changes on a tweak item.
	   *
	   * @method watch
	   * @param {String} Optional: the tweak name.
	   * @param {Callback}
	   */
	  watch: function () {
	
	    var args = arguments;
	
	    if (args.length === 0) {
	      return;
	    }
	
	    if (args.length === 1) {
	      // Only callback passed in, no tweak name
	      // string or tweaks array passed in.
	
	      if (typeof args[0] === 'function') {
	        tweaksToWatch.all.callbacks.push(args[0]);
	      } else {
	        return;
	      }
	    } else {
	      // Multiple arguments
	      if (typeof args[0] === 'string') {
	
	        // Specific tweak name passed in
	
	        var tweakName = args[0];
	        if (!tweaksToWatch[tweakName]) {
	          tweaksToWatch[tweakName] = { callbacks: [] };
	        }
	
	        tweaksToWatch[tweakName].callbacks.push(args[1]);
	      }
	
	      if (args[0].constructor === Array) {
	
	        // Multiple tweak names passed in
	        // as array
	
	        var tweakNames = args[0];
	        tweakNames.forEach(function (tweak) {
	          if (!tweaksToWatch[tweak]) {
	            tweaksToWatch[tweak] = { callbacks: [] };
	          }
	
	          tweaksToWatch[tweak].callbacks.push(args[1]);
	        });
	      }
	    }
	  }
	};
	
	if (Y.Global) {
	  // If Y.Global is present on the page, set up the
	  // tweak event listener.
	  Y.Global.on('tweak:change', function (e) {
	    var tweakName = e.getName();
	    var callbackSignature = {
	      name: tweakName,
	      value: e.config && e.config.value
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
	module.exports = Tweak;
	


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 *
	 * @namespace Lifecycle
	 * @memberof Squarespace
	 */
	var Lifecycle = {
	
	  init: function () {
	
	    // Squarespace.afterBodyLoad() trigger loads
	    // scripts and calls onInitialize, which 
	    // individual modules' init functions are
	    // bound to.
	
	    window.Squarespace.AFTER_BODY_LOADED = false;
	    window.Squarespace.afterBodyLoad();
	
	  },
	
	  destroy: function () {
	
	    // Squarespace.globalDestroy calls onDestroy
	    // for each destructor
	
	    window.Squarespace.globalDestroy(Y);
	
	  }
	
	};
	
	/**
	 * @exports {Object} Lifecycle
	 */
	module.exports = Lifecycle;
	


/***/ }
/******/ ])
});
;
//# sourceMappingURL=squarespace-core-0.1.2.js.map