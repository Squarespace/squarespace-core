Squarespace Core
------------------------------

This is the public JavaScript API for Squarespace's Developer Platform. It exposes a few crucial methods for building Squarespace templates.

## Usage

````sh
npm install @squarespace/core;
````

````js
const core = require('@squarespace/core');
````

## Reference

### ImageLoader

Squarespace comes with a number of built-in facilities for managing images that are uploaded to our system. After uploading an image into a collection, Squarespace automatically creates multiple copies of the image with different sizes. Our ImageLoader will then help render images properly when they are presented on a page, even on retina displays.

ImageLoader can also be used to fit or fill an image inside ​a parent container, where it automatically determines which image size to use depending on the current dimensions of the container.

WARNING:
Currently, ImageLoader is present on all Squarespace sites under the global namespace ImageLoader, but this is an unsupported API and we recommend accessing this functionality through squarespace-core.

#### ImageLoader.load(img, [config])
Using the global ImageLoader namespace, calls ImageLoader.load on the given node with the given config options.

**Params**
- img `HTMLElement` - Image node to be loaded
- [config] `Object` - Config object

**Return**
- `Boolean`- True if the image was loaded, false otherwise]

### Lifecycle
Squarespace provides default functionality for some content that users add in the CMS. 

If you are building a Developer Platform site that loads Squarespace content through an XHR or some other kind of AJAX, you can use the Lifecycle methods provided here to initialize and/or destroy this functionality.

WARNING:
The functionality called by Lifecycle is available on the global namespace window.Squarespace, but this is an unsupported API and it is highly recommended that you access it through squarespace-core.

#### Lifecycle.init()
Squarespace.afterBodyLoad() trigger loads scripts and calls onInitialize, which individual modules' init functions are bound to. This should be called after new HTML content containing Squarespace default functionality is added to a page (for example, after AJAX loading a new page).

#### Lifecycle.destroy()
Squarespace.globalDestroy calls onDestroy, triggering each module's destructor. This should be called prior to loading in new HTML content containing Squarespace default functionality.

### Tweak
Tweaks allow a developer to isolate specific elements of the design and present options to the user in an easy-to-use interface. Tweaks are surfaced in the Squarespace interface through Style Editor (e.g. yoursite.squarespace.com/config/design/style). Using tweaks, a user can make presentational changes to their website without having to know or edit CSS code. Tweaks are typically used by the developers through LESS variables, mixins, and class names added to the `<body>` element.

Sometimes, a developer may find it necessary to access the value of a tweak through Javascript, or to watch for changes in that tweak and update the DOM accordingly. The Tweak module of squarespace-core is meant to provide an official interface for doing so.

#### Tweak.getValue(name)
Gets the value of one of the tweaks given its name.

**Params**
- name `String` - Name of the tweak

**Return**
- `String`- The value of the tweak

#### Tweak.watch([name], callback)
Listen for changes on a tweak item. If one parameter is provided, the callback will be executed every time any tweak changes. If two parameters are provided and the first parameter is a String, the callback will be executed only when that particular tweak changes. If two parameters are provided and the first parameter is an Array of strings, the callback will be executed any time one of those tweaks changes.

**Params**
- name `String` - Name of the tweak
– name `Array` – Array with multiple tweak names
– callback `Function` - Callback to call when watcher is triggered

**Return**
- `String`- The value of the tweak


### Contributing
We are currently not accepting contributions to Squarespace Core.

### License
Squarespace Core is [Apache Licensed](http://www.apache.org/licenses/LICENSE-2.0.html)