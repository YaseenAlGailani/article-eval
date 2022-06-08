const validate = (() => {

    let eventAttached = false;

    function focusCB(e) {
        this.closest('.form-group').classList.remove('invalid');
        this.closest('.form-group').classList.remove('bad-url');
        eventAttached = true;
    }

    return {
        isValid: function (form) {
            for (let input of form.querySelectorAll('input')) {

                if (!eventAttached) input.addEventListener('focus', focusCB);

                if (input.value == '') {
                    input.closest('.form-group').classList.add('invalid');
                    return false;
                }

                try {
                    new URL(input.value);
                    input.closest('.form-group').classList.remove('invalid');
                    input.closest('.form-group').classList.remove('invalid-url');
                    return true;
                } catch (error) {
                    input.closest('.form-group').classList.add('bad-url');
                    input.closest('.form-group').classList.add('invalid');
                    return false
                }
            }
        }
    }
})();

export default validate;