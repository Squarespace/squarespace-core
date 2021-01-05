/**
 * @license
 * Copyright 2016 Squarespace, INC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const isAuthenticated = Static.SQUARESPACE_CONTEXT.authenticatedAccount;

/**
 * @const {Object} tweaksToWatch
 */
const tweaksToWatch = {
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
const Tweak = {

  /**
   * Gets the value of one of the tweaks given its name.
   *
   * @method getValue
   * @param {String} name      Name of the tweak
   * @returns {String}         The value of the tweak
   */
  getValue(name) {
    if (!name || typeof name !== 'string') {
      console.error('squarespace-core: Invalid tweak name ' + name);
      return null;
    }

    return (window.Static.SQUARESPACE_CONTEXT.tweakJSON[name] ||
      window.Static.SQUARESPACE_CONTEXT.tweakJSON[name.replace('@', '').replace('.', '')]);
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
  watch: function () {

    if (!isAuthenticated) {
      return;
    }

    if (arguments.length === 0) {
      console.error('squarespace-core: ' +
        'Tweak.watch must be called with at least one parameter');
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
      const tweakName = arguments[0];
      if (!tweaksToWatch[tweakName]) {
        tweaksToWatch[tweakName] = {
          callbacks: []
        };
      }
      tweaksToWatch[tweakName].callbacks.push(arguments[1]);
    } else if (arguments[0].constructor === Array && typeof arguments[1] === 'function') {
      // Multiple tweak names passed in as array. Run callback when any one of
      // those tweaks are changed.
      arguments[0].forEach((tweakName) => {
        if (!tweaksToWatch[tweakName]) {
          tweaksToWatch[tweakName] = {
            callbacks: []
          };
        }
        tweaksToWatch[tweakName].callbacks.push(arguments[1]);
      });
    }
  }
};

function addTweakChangeListener() {
  // If Y.Global is present on the page, set up the tweak event listener.
  window.Y.Global.on('tweak:change', (e) => {
    const tweakName = e.getName();
    const callbackSignature = {
      name: tweakName,
      value: e.config && e.config.value || e.value
    };

    if (tweaksToWatch[tweakName]) {
      tweaksToWatch[tweakName].callbacks.forEach((callback) => {
        try {
          callback(callbackSignature);
        } catch (err) {
          console.error(err);
        }
      });
    }

    if (tweaksToWatch.all.callbacks.length > 0) {
      tweaksToWatch.all.callbacks.forEach((callback) => {
        try {
          callback(callbackSignature);
        } catch (err) {
          console.error(err);
        }
      });
    }
  });
}

if (isAuthenticated) {
  if (document.readyState !== 'complete') {
    window.addEventListener('load', addTweakChangeListener);
  } else if (window.Y && window.Y.Global) {
    addTweakChangeListener();
  }
}

/**
 * @exports {Object} Tweak
 */
export default Tweak;