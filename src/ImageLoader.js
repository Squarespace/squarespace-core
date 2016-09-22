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
const ImageLoader = {

  /**
   * Using the global ImageLoader namespace, calls ImageLoader.load on the
   * given node with the given config options.
   *
   * @method load
   * @param  {HTMLElement} img    Image node to be loaded
   * @param  {Object} config      Config object
   * @return {Boolean}            True if the image was loaded, false otherwise
   */
  load(img, config) {
    return window.ImageLoader.load(img, config);
  }
};

/**
 * @exports {Object} ImageLoader
 */
export default ImageLoader;
