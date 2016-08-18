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

Squarespace comes with a number of built-in facilities for managing images that are uploaded via the Squarespace CMS. After uploading an image into a collection, Squarespace automatically creates multiple copies of the image with different sizes. ImageLoader will then help render images properly when they are presented on a page, even on retina displays.

ImageLoader can also be used to fit or fill an image inside ​a parent container, where it automatically determines which image size to use depending on the current dimensions of the container.

#### ImageLoader.load(img, [config])

Loads an image.

**Params**
- img `HTMLElement` - Image node to be loaded
- [config] `Object` - Config object

**Return**
- `Boolean`- True if the image was loaded, false otherwise]

### Lifecycle

Certain Squarespace content, like map and chart blocks, have built-in javascript functionality. Typically this JS is initialized when the page is loaded.

If you are building a Developer Platform site that loads Squarespace content through an XHR, you can use the Lifecycle methods provided here to initialize and/or destroy this functionality.

#### Lifecycle.init()

Loads scripts and calls their initialize methods. This should be called after new HTML content containing Squarespace blocks is added to a page (for example, after AJAX loading a new page).

#### Lifecycle.destroy()

Triggers each block's destructor. This should be called to clean up blocks that are about to be removed from the page, such as prior to loading in new HTML content.

### Tweak

Tweaks allow a developer to isolate specific elements of the design and present options to the user in an easy-to-use interface. Tweaks are surfaced in the Squarespace interface through Style Editor (e.g. yoursite.squarespace.com/config/design/style). Using tweaks, a user can make presentation changes to their website without having to know or edit CSS code. Tweaks are typically used by developers through LESS variables, mixins, and class names added to the `<body>` element.

Sometimes, a developer may find it necessary to access the value of a tweak through Javascript, or to watch for changes in that tweak and update the DOM accordingly. The Tweak module of squarespace-core is provides an interface for doing so.

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