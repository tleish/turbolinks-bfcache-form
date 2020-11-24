import TurbolinksBfcacheForm from 'turbolinks-bfcache-form';

describe('FormController', () => {
  let form, input;
  describe('load form page', () => {
    beforeEach(() => {
      document.head.innerHTML = '';
      document.body.innerHTML = `
        <form id="form" data-controller="form">
          <input id="email" type="email" value="">
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

    it('flags form as cached for optimization', () => {
      TurbolinksBfcacheForm.start();
      input.value = 'test@email.com';
      document.dispatchEvent(new Event('turbolinks:before-cache'));
      expect(form.dataset.turbolinksBfcacheForm).toBe('true');
    });

    it('resets cached form as cached for optimization', () => {
      TurbolinksBfcacheForm.start();
      input.value = 'test@email.com';
      document.dispatchEvent(new Event('turbolinks:before-cache'));
      input.value = '';
      document.dispatchEvent(new Event('turbolinks:before-cache'));
      expect(form.dataset.turbolinksBfcacheForm).toBeUndefined();
    });

    describe('no cache', () => {
      it('does not cache form when data-turbolinks-bfcache-form="false"', () => {
        TurbolinksBfcacheForm.start();
        form.dataset.turbolinksBfcacheForm = false;
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(form.dataset.turbolinksBfcacheForm).toBeUndefined();
      });

      it('does not cache input when data-turbolinks-bfcache-form="false"', () => {
        input.dataset.turbolinksBfcacheForm = false;
        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        TurbolinksBfcacheForm.cache();
        TurbolinksBfcacheForm.start();
        expect(input.value).toBe('');
      });

      it('does not cache form when data-turbolinks="false"', () => {
        TurbolinksBfcacheForm.start();
        form.dataset.turbolinks = false;
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(form.dataset.turbolinksBfcacheForm).toBeUndefined();
      });
    });

    describe('form inputs', () => {
      it('caches text input', () => {
        const input = document.getElementById('email');
        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.value).toBe('test@email.com');
      });

      it('does not cache password input', () => {
        const input = document.getElementById('password');
        TurbolinksBfcacheForm.start();
        input.value = 'abc123';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.value).toBe('');
      });

      it('caches checkbox input', () => {
        const input = document.getElementById('checkbox');
        TurbolinksBfcacheForm.start();
        input.checked = true;
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.checked = false;
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.checked).toBeTruthy();
      });

      it('caches radio group', () => {
        const input = document.getElementById('radio1');
        TurbolinksBfcacheForm.start();
        input.checked = true;
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.checked = false;
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.checked).toBeTruthy();
      });

      it('caches radio without group', () => {
        const input = document.getElementById('radio1');
        input.removeAttribute('name');
        TurbolinksBfcacheForm.start();
        input.checked = true;
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.checked = false;
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.checked).toBeTruthy();
      });

      it('caches select-one', () => {
        const input = document.getElementById('cars');
        TurbolinksBfcacheForm.start();
        input.value = 'audi';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.value).toBe('audi');
      });

      it('caches select-multiple', () => {
        const input = document.getElementById('cars');
        input.multiple = true;
        TurbolinksBfcacheForm.start();
        const options = input.options;
        options[0].selected = false;
        options[1].selected = true;
        options[3].selected = true;
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        options[0].selected = true;
        options[1].selected = false;
        options[3].selected = false;
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(options[1].selected).toBeTruthy();
        expect(options[3].selected).toBeTruthy();
      });
    });

    const noCacheHead =
      '<meta name="turbolinks-cache-control" content="no-cache">';
    const noPreviewHead =
      '<meta name="turbolinks-cache-control" content="no-preview">';
    describe('turbolinks-cache-control', () => {
      it('adds cache control no-preview when form changes', () => {
        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(
          document.head.querySelector('[name=turbolinks-cache-control]').content
        ).toBe('no-preview');
      });

      it('removes no-preview when dirty form is not clean', () => {
        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(document.head.innerHTML).toBe('');
      });

      it('does not cache form when turbolinks disabled', () => {
        document.head.innerHTML = noCacheHead;

        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        input.value = '';
        document.dispatchEvent(new Event('turbolinks:load'));
        expect(input.value).toBe('');
      });

      it('does not remove no-cache from head when turbolinks cache disabled', () => {
        document.head.innerHTML = noCacheHead;

        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(document.head.innerHTML).toBe(noCacheHead);
        expect(
          document.head.querySelector('[name=turbolinks-cache-control]').content
        ).toBe('no-cache');
      });

      it('does not remove no-preview from head when turbolinks cache disabled', () => {
        document.head.innerHTML = noPreviewHead;

        TurbolinksBfcacheForm.start();
        input.value = 'test@email.com';
        document.dispatchEvent(new Event('turbolinks:before-cache'));
        expect(
          document.head.querySelector('[name=turbolinks-cache-control]').content
        ).toBe('no-preview');
      });
    });
  });
});
