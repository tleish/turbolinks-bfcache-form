import TurbolinksBfcacheForm from 'turbolinks-bfcache-form';

describe('FormController', () => {
  let form, input;
  describe('load form page', () => {
    beforeEach(() => {
      document.head.innerHTML = '';
      document.body.innerHTML = `
        <form id="form" data-controller="form">
          <input id="email" type="email" tabindex="1" value="">
          <input id="hidden" type="hidden" value="">
          <input id="password" type="password" value="">
          <input id="checkbox" type="checkbox" value="">
          <input id="radio1" type="radio" name="myRadio" value="1">
          <input id="radio2" type="radio" name="myRadio" value="2">
          <select id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </form>
      `;

      form = document.getElementById('form');
      input = document.getElementById('email');
    });

    describe('general caching', () => {
      it('caches form input', () => {
        TurbolinksBfcacheForm.load();
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.change({ target: input });
        expect(input.dataset.turbolinksBfcachedValue).toBe('test@email.com');
      });

      it('resets cached form as cached for optimization', () => {
        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.change({ target: input });
        input.value = '';
        TurbolinksBfcacheForm.change({ target: input });
        expect(input.dataset.turbolinksBfcachedValue).toBeUndefined();
      });
    });

    describe('pageshow', () => {
      it('caches fields when page loads from browser and not history', () => {
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.pageshow();
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('test@email.com');
      });
    });

    describe('beforeCache', () => {
      it('caches focused field before leaving page', () => {
        input.tabindex = 1; // must set tabindex for JSDOM .focus() to work
        input.focus();
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.beforeCache();
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('test@email.com');
      });
    });

    describe('no cache', () => {
      afterEach(() => {
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.change({ target: input });
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('');
      });

      it('does not cache form when data-turbolinks-bfcache-form="false"', () => {
        form.dataset.turbolinksBfcacheForm = false;
      });

      it('does not cache input when data-turbolinks-bfcache-form="false"', () => {
        input.dataset.turbolinksBfcacheForm = false;
      });

      it('does not cache form when data-turbolinks="false"', () => {
        form.dataset.turbolinks = false;
      });

      it('does not cache form when turbolinks disabled', () => {
        document.head.innerHTML =
          '<meta name="turbolinks-cache-control" content="no-cache">';
      });
    });

    describe('form inputs', () => {
      it('caches text input', () => {
        const input = document.getElementById('email');
        TurbolinksBfcacheForm.load();
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.change({ target: input });
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('test@email.com');
      });

      it('caches from form event', () => {
        const input = document.getElementById('email');
        TurbolinksBfcacheForm.load();
        input.value = 'test@email.com';
        TurbolinksBfcacheForm.change({ target: form });
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('test@email.com');
      });

      it('does not cache password input', () => {
        const input = document.getElementById('password');
        TurbolinksBfcacheForm.load();
        input.value = 'abc123';
        TurbolinksBfcacheForm.change({ target: input });
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('');
      });

      it('caches checkbox input', () => {
        const input = document.getElementById('checkbox');
        TurbolinksBfcacheForm.load();
        input.checked = true;
        TurbolinksBfcacheForm.change({ target: input });
        input.checked = false;
        TurbolinksBfcacheForm.load();
        expect(input.checked).toBeTruthy();
      });

      it('caches radio group', () => {
        const input = document.getElementById('radio1');
        TurbolinksBfcacheForm.load();
        input.checked = true;
        TurbolinksBfcacheForm.change({ target: input });
        input.checked = false;
        TurbolinksBfcacheForm.load();
        expect(input.checked).toBeTruthy();
      });

      it('caches radio without group', () => {
        const input = document.getElementById('radio1');
        input.removeAttribute('name');
        TurbolinksBfcacheForm.load();
        input.checked = true;
        TurbolinksBfcacheForm.change({ target: input });
        input.checked = false;
        TurbolinksBfcacheForm.load();
        expect(input.checked).toBeTruthy();
      });

      it('caches select-one', () => {
        const input = document.getElementById('cars');
        TurbolinksBfcacheForm.load();
        input.value = 'audi';
        TurbolinksBfcacheForm.change({ target: input });
        input.value = '';
        TurbolinksBfcacheForm.load();
        expect(input.value).toBe('audi');
      });

      it('caches select-multiple', () => {
        const input = document.getElementById('cars');
        input.multiple = true;
        TurbolinksBfcacheForm.load();
        const options = input.options;
        options[0].selected = false;
        options[1].selected = true;
        options[3].selected = true;
        TurbolinksBfcacheForm.change({ target: input });
        options[0].selected = true;
        options[1].selected = false;
        options[3].selected = false;
        TurbolinksBfcacheForm.load();
        expect(options[1].selected).toBeTruthy();
        expect(options[3].selected).toBeTruthy();
      });
    });
  });
});
