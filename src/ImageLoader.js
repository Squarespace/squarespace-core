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
