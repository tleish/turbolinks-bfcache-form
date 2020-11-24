!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TurboLinks BFCache Form",[],e):"object"==typeof exports?exports["TurboLinks BFCache Form"]=e():t["TurboLinks BFCache Form"]=e()}(this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t,e,n){return(r="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return i(this,n)}}function i(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e,n){return e&&h(t.prototype,e),n&&h(t,n),t}n.r(e);var p='[data-turbolinks="false"],['.concat("data-turbolinks-bfcache-form",'="false"]'),d=function(){function t(){s(this,t)}return y(t,null,[{key:"start",value:function(){document.addEventListener("turbolinks:load",t.load),document.addEventListener("turbolinks:before-cache",t.cache)}},{key:"cache",value:function(){t.forms.forEach((function(t){return t.cache()}))}},{key:"load",value:function(){t.forms.forEach((function(t){return t.restore()}))}},{key:"forms",get:function(){var t=new b("bfcache");return t.allowCache?f(document.forms).map((function(e){return new m(e,t)})):[]}}]),t}();e.default=d;var m=function(){function t(e,n){var r=this;s(this,t),this.cache=function(){_.cache(r.form),r.form.querySelector("[".concat("data-turbolinks-bfcached-form","]"))?(r.form.setAttribute("data-turbolinks-bfcache-form",!0),r.turbolinksCacheControl.add("no-preview")):(r.form.removeAttribute("data-turbolinks-bfcache-form"),r.turbolinksCacheControl.remove())},this.form=e,this.turbolinksCacheControl=n}return y(t,[{key:"restore",value:function(){if(!this.cachedValue)return!1;this.form.querySelectorAll("[".concat("data-turbolinks-bfcached-form","]")).forEach((function(t){_.restore(t)}))}},{key:"allowCache",get:function(){return!this.form.closest(p)&&this.turbolinksCacheControl.allowCache}},{key:"cachedValue",get:function(){return this.form.getAttribute("data-turbolinks-bfcache-form")}}]),t}(),b=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";s(this,t),this.dataTag=e}return y(t,[{key:"add",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"no-cache";if(this.metaTag())return!1;document.head.insertAdjacentHTML("beforeend",'<meta name="'.concat("turbolinks-cache-control",'" content="').concat(t,'" data-tag="').concat(this.dataTag,'">'))}},{key:"remove",value:function(){var t=this.metaTag("[data-tag=".concat(this.dataTag,"]"));t&&t.remove()}},{key:"metaTag",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return document.head.querySelector("[name=".concat("turbolinks-cache-control","]").concat(t))}},{key:"allowCache",get:function(){return"no-cache"!==(this.metaTag()||{}).content}}]),t}(),v=function(){function t(e){s(this,t),this.element=e}return y(t,null,[{key:"check",value:function(t){return t.tagName.toLowerCase().match(this.tagName)&&String(t.type).toLowerCase().match(this.type)}}]),y(t,[{key:"cache",value:function(){var t=this;return this.elements.forEach((function(e){e.removeAttribute(t.cacheKey),e[t.attribute]&&e[t.defaultAttribute]!==e[t.attribute]&&e.setAttribute(t.cacheKey,e[t.attribute])})),this}},{key:"restore",value:function(){var t=this;return this.elements.forEach((function(e){var n=e.getAttribute(t.cacheKey);n&&(e[t.attribute]=n)})),this}},{key:"cacheKey",get:function(){return"data-turbolinks-bfcached-form"}},{key:"attribute",get:function(){return"value"}},{key:"defaultAttribute",get:function(){return"default".concat(this.attribute.charAt(0).toUpperCase()).concat(this.attribute.slice(1))}},{key:"elements",get:function(){return[this.element]}}]),t}();v.tagName=/./,v.type=/./;var g=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"cache",value:function(){return this.elements.forEach((function(t){return _.cache(t)})),this}},{key:"elements",get:function(){return f(this.element.elements)}}]),n}(v);g.tagName=/^form$/;var k=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return n}(v);k.tagName=/^input$/;var w=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"cache",value:function(){return this}}]),n}(k);w.type=/^password$/;var O=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"attribute",get:function(){return"checked"}}]),n}(v);O.type=/^checkbox$/;var C=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"elements",get:function(){var t=(this.element.form||document).querySelectorAll('input[type="radio"][name="'.concat(this.element.name,'"]'));return 0===t.length?[this.element]:f(t)}}]),n}(O);C.type=/^radio$/;var j=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"attribute",get:function(){return"selected"}}]),n}(v);j.tagName=/^option$/;var S=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"elements",get:function(){return f(this.element.options)}}]),n}(j);S.tagName=/^select$/,S.type=/^select-multiple$/;var A=function(t){o(n,t);var e=c(n);function n(){return s(this,n),e.apply(this,arguments)}return y(n,[{key:"cache",value:function(){return this.firstOptionSelectedWithNoDefault?this:r(a(n.prototype),"cache",this).call(this)}},{key:"firstOptionSelectedWithNoDefault",get:function(){return 0===this.element.selectedIndex&&this.elements.every((function(t){return!1===t.defaultSelected}))}}]),n}(S);A.type=/^select-one/;var T=function(){function t(){s(this,t)}return y(t,[{key:"cache",value:function(){return!1}},{key:"restore",value:function(){return!1}}]),t}(),_=function(){function t(){s(this,t)}return y(t,null,[{key:"cache",value:function(t){return this.findClass(t).cache()}},{key:"restore",value:function(t){this.findClass(t).restore()}},{key:"findClass",value:function(t){return t.closest(p)?new T:new(this.elementClasses.find((function(e){return e.check(t)})))(t)}}]),t}();_.elementClasses=[g,O,C,w,k,j,A,S,v]}])}));