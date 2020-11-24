The intent of this library is to add support for bfcache (back-forward cache) forms when using [TurboLinks](https://github.com/turbolinks/turbolinks) ?

### SUPPORTED BROWSERS

Turbolinks works in all modern desktop and mobile browsers.

**IE Browser Support**

Note: if using this library with IE you must polyfill [Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) and [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).


### INSTALLATION

1. Download `dist/turbolinks-bfcache-form.js` or `src/turbolinks-bfcache-form.js` 
2. Import and initialize TubolinksBfcacheForm and start the listener

```javascript
window.Turbolinks = require('turbolinks');
window.Turbolinks.start();
require('elements');

import TurbolinksFormBfcache from 'turbolinks-bfcache-form';
TurbolinksFormBfcache.start();
```



### DISABLING BFCACHE

**Entire Page:**
You can disable bfcace for the entire page using turbolinks standard cache control:

```html
<meta name="turbolinks-cache-control" content="no-cache">
```
**Parent DOM**

Any part of the parent DOM using `data-turbolinks`

```html
<div data-turbolinks="false">
	<form...>
```

**Form**

Disable on a specific form using `data-turbolinks-bfcache-form`

```html
<form... data-turbolinks-bfcache-form="false">
```

**Field**

Disable for a specific field using `data-turbolinks-bfcache-form`
```html
<input type="text"... data-turbolinks-bfcache-form="false">
```

Note: input type=password is disabled.


### BACKGROUND

Browsers today have bfcache (back-forward cache).  Turbolinks essentially replaces this bfcache functionality and behaves similar to browsers except with form inputs (text, select, checkboxes, etc).

### DISCOVERIES
When a user changes values in HTML form fields, these changes are preserved in memory and not in the DOM.  For example, lets say you have the following input:

#### Original DOM:

```html
<input type="text" id="first_name" name="first_name" value="" />
```

#### Original JavaScript:

```javascript
document.getElementById("first_name").value //=> ""
document.getElementById("first_name").defaultValue //=> ""
```

**Update form value:**
Update the form with user input or javascript

```javascript
document.getElementById("first_name").value = "Suzy"
```

After entering in a first name "Suzy", you now have the following:

**Updated DOM: (no change)**

```html
<input type="text" id="first_name" name="first_name" value="" />
```

**Updated JavaScript:**

```javascript
document.getElementById("first_name").value //=> "Suzy"
document.getElementById("first_name").defaultValue //=> ""
```

Even though the "value" changed, the DOM reflects the inputs "defaultValue".  The assumption is the browser uses this defaultValue in the DOM in the event of a form reset.

Since Turbolinks caches DOM changes (not memory changes), it only caches the defaultValue and not the users input.  In some cases, this is desired (there are forums with developers asking how to prevent browsers from apply bfcache to their forms).  However, [some users](https://github.com/stimulusjs/stimulus/issues/328) want this functionality on forms to make it easier for users after they press back/forward buttons on pages where they've spent time filling out forms.  This is especially important if the form was long.

#### Solution:

This library caches the input values to each form field before leaving the page

1. Write form input values to a custom field data attributes on event `turbolinks:before-cache`
2. Restore form inputs using custom form field attributes on event `turbolinks:load` (and remove the custom form field attribute).



## Contributing to TurbolinksBfcacheForms

Turbolinks is open-source software, freely distributable under the terms of an [MIT-style license](https://github.com/turbolinks/turbolinks/blob/master/LICENSE). The [source code is hosted on GitHub](https://github.com/turbolinks/turbolinks). Development is sponsored by [Basecamp](https://basecamp.com/).

We welcome contributions in the form of bug reports, pull requests, or thoughtful discussions in the [GitHub issue tracker](https://github.com/turbolinks/turbolinks/issues).

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/turbolinks/turbolinks/blob/master/CONDUCT.md). By participating in this project you agree to abide by its terms.

### Building From Source

To build from source, first make sure you have the [Yarn package manager](https://yarnpkg.com/) installed.

```
$ yarn install
$ yarn build
```

Include the resulting `dist/turbolinks.js` file in your application’s JavaScript bundle.

### Running Tests

To run the test suite, follow the instructions for *Building From Source* above, then run:

```
$ yarn test
```



## REFERENCES

- Turbolinks: https://github.com/turbolinks/turbolinks
- https://github.com/turbolinks/turbolinks/issues/574
- MDN: https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Working_with_BFCache
- Google Chrome: https://web.dev/bfcache/
- Firefox: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/1.5/Using_Firefox_1.5_caching