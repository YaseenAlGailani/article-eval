const validate = (() => {

  let eventAttached = false;

  function focusCB(e) {
    eventAttached = true;
    this.closest('.form-group').classList.remove('invalid');
    this.closest('.form-group').classList.remove('bad-url');
  }

  return {
    isValid(form) {
      let valid = true;
      for (let input of form.querySelectorAll('input')) {

        if (!eventAttached) input.addEventListener('focus', focusCB);

        if (input.value == '') {
          input.closest('.form-group').classList.add('invalid');
          valid = valid && false;
        } else {

          try {
            new URL(input.value);
            input.closest('.form-group').classList.remove('invalid');
            input.closest('.form-group').classList.remove('invalid-url');
            valid = valid && true;
          } catch (error) {
            input.closest('.form-group').classList.add('bad-url');
            input.closest('.form-group').classList.add('invalid');
            valid = valid && false;
          }
        }
      }
      return valid;
    }
  }
})();

export default validate;