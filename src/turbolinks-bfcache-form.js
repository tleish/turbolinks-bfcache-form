/**
 * SUMMARY: Back/Forward Cache (bfcache) Form Inputs
 *
 * DESCRIPTION: I cache form inputs for using backwards/forwards navigation
 *
 * @param {string} data-turbolinks="false" : disables form cache for that form, element or children
 * @param {string} data-turbolinks-bfcache-form="false" : disables form cache for that form, element or children
 *
 * TODO: polyfill Element.closest(), Array.prototype.find()
 */

const DATA_TURBOLINKS_BFCACHE_FORM = 'data-turbolinks-bfcache-form';
const DATA_TURBOLINKS_BFCACHE_FORM_VALUE = `${DATA_TURBOLINKS_BFCACHE_FORM}-value`;
const DISABLE_BFCACHED_FORM_QUERY = `[data-turbolinks="false"],[${DATA_TURBOLINKS_BFCACHE_FORM}="false"]`;

class TurbolinksFormBfcache {
  static start() {
    document.addEventListener('turbolinks:load', TurbolinksFormBfcache.load);
    document.addEventListener('turbolinks:before-cache', TurbolinksFormBfcache.beforeCache);
    window.addEventListener('pageshow', TurbolinksFormBfcache.pageshow);
    document.addEventListener('change', TurbolinksFormBfcache.change);
  }

  // force onchange event if capture currently focused element, if user presses back/forward after entering
  // input and presses back or forward button before leaving field
  static beforeCache() {
    if (document.activeElement.form) {
      // if active element is a form field
      FormElementFactory.cache(document.activeElement);
    }
  }

  // re-cache forms on pageshow when view is restored using cache
  static pageshow() {
    document.querySelectorAll('form').forEach((form) => {
      FormElementFactory.cache(form);
    });
  }

  static load() {
    document
      .querySelectorAll(`[${DATA_TURBOLINKS_BFCACHE_FORM_VALUE}]`)
      .forEach((input) => {
        FormElementFactory.restore(input);
      });
  }

  static change(e) {
    const turbolinksCacheControl = new TurbolinksCacheControl('bfcache');
    const isFormElement = e.target.form || e.target.tagName.toLowerCase() === 'form';
    if (isFormElement && turbolinksCacheControl.allowCache) {
      const turbolinksForm = new TurbolinksForm(e.target.form, turbolinksCacheControl);
      turbolinksForm.change(e);
    }
  }
}

export default TurbolinksFormBfcache;

class TurbolinksForm {
  constructor(form, turbolinksCacheControl) {
    this.form = form;
    this.turbolinksCacheControl = turbolinksCacheControl;
  }

  change = (event) => FormElementFactory.cache(event.target);
}

const TURBOLINKS_CACHE_CONTROL = 'turbolinks-cache-control';
class TurbolinksCacheControl {
  constructor(dataTag = '') {
    this.dataTag = dataTag;
  }

  get allowCache() {
    return (this.metaTag() || {}).content !== 'no-cache';
  }

  metaTag() {
    return document.head.querySelector(`[name=${TURBOLINKS_CACHE_CONTROL}]`);
  }
}

class FormElement {
  static tagName = /./;
  static type = /./;

  static check(element) {
    return (
      element.tagName.toLowerCase().match(this.tagName) &&
      String(element.type).toLowerCase().match(this.type)
    );
  }

  constructor(element) {
    this.element = element;
  }

  cache() {
    this.elements.forEach((element) => {
      element.removeAttribute(this.cacheKey);
      if (
        element[this.attribute] &&
        element[this.defaultAttribute] !== element[this.attribute]
      ) {
        element.setAttribute(this.cacheKey, element[this.attribute]);
      }
    });

    return this;
  }

  restore() {
    this.elements.forEach((element) => {
      const cachedValue = element.getAttribute(this.cacheKey);
      if (cachedValue) {
        element[this.attribute] = cachedValue;
      }
    });

    return this;
  }

  get cacheKey() {
    return DATA_TURBOLINKS_BFCACHE_FORM_VALUE;
  }

  get attribute() {
    return 'value';
  }

  get defaultAttribute() {
    return `default${this.attribute
      .charAt(0)
      .toUpperCase()}${this.attribute.slice(1)}`;
  }

  get elements() {
    return [this.element];
  }
}

class FormForm extends FormElement {
  static tagName = /^form$/;

  cache() {
    this.elements.forEach((element) => FormElementFactory.cache(element));
    return this;
  }

  get elements() {
    return [...this.element.elements];
  }
}

class FormInput extends FormElement {
  static tagName = /^input$/;
}

class FormPassword extends FormInput {
  static type = /^password$/;

  cache() {
    return this;
  }
}

class FormCheckbox extends FormElement {
  static type = /^checkbox$/;

  get attribute() {
    return 'checked';
  }
}

class FormRadio extends FormCheckbox {
  static type = /^radio$/;

  get elements() {
    // get all other radios or checkbox with the same name
    const elementRoot = this.element.form || document;
    const radioGroup = elementRoot.querySelectorAll(
      `input[type="radio"][name="${this.element.name}"]`
    );
    if (radioGroup.length === 0) {
      return [this.element];
    }
    return [...radioGroup];
  }
}

class FormSelectOption extends FormElement {
  static tagName = /^option$/;

  get attribute() {
    return 'selected';
  }
}

class FormSelectMultiple extends FormSelectOption {
  static tagName = /^select$/;
  static type = /^select-multiple$/;

  get elements() {
    return [...this.element.options];
  }
}

class FormSelectOne extends FormSelectMultiple {
  static type = /^select-one/;

  cache() {
    if (this.firstOptionSelectedWithNoDefault) {
      return this;
    }
    return super.cache();
  }

  // By default the browser selects the first option in a single-select when no default is set.
  // We do not want to flag the form as dirty if the user does not change this.
  get firstOptionSelectedWithNoDefault() {
    return (
      this.element.selectedIndex === 0 &&
      this.elements.every((element) => element.defaultSelected === false)
    );
  }
}

class BfcacheFormDisabled {
  cache() {
    return false;
  }

  restore() {
    return false;
  }
}

class FormElementFactory {
  // Order is important here:
  // Checked and Password should come before Input
  // FormSelectOption should come before FormSelectOne and FormSelectMultiple
  static elementClasses = [
    FormForm,
    FormCheckbox,
    FormRadio,
    FormPassword,
    FormInput,
    FormSelectOption,
    FormSelectOne,
    FormSelectMultiple,
    FormElement,
  ];

  static cache(element) {
    return this.findClass(element).cache();
  }

  static restore(element) {
    this.findClass(element).restore();
  }

  static findClass(element) {
    if (element.closest(DISABLE_BFCACHED_FORM_QUERY)) {
      return new BfcacheFormDisabled();
    }
    const foundClass = this.elementClasses.find((elementClass) =>
      elementClass.check(element)
    );
    return new foundClass(element);
  }
}
