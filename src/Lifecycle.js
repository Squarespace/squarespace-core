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
const Lifecycle = {

  /**
   * Squarespace.afterBodyLoad() trigger loads scripts and calls onInitialize,
   * which individual modules' init functions are bound to. This should be
   * called after new HTML content containing Squarespace default functionality
   * is added to a page (for example, after AJAX loading a new page).
   *
   * @method init
   */
  init() {
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
  destroy() {
    window.Squarespace.globalDestroy(window.Y);
  }

};

/**
 * @exports {Object} Lifecycle
 */
export default Lifecycle;

