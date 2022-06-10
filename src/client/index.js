import './styles/main.scss'
import getEvaluation from './js/getEvaluation'

window.addEventListener('DOMContentLoaded', function () {

  const closeButtons = document.querySelectorAll('.close-btn');
  const evalForm = document.querySelector('#eval-form');

  closeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const parent = this.closest('.container, .box');
      if (parent.classList.contains('message')) {
        transitions.fadeInOut(parent).then(() => {
          parent.remove();
        })
      } else {
        transitions.fadeInOut(parent);
      }
    });
  });

  evalForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validate.isValid(e.target)) return;
    let inputValues = getUserInput(e.target);

    try {
      updateUI.fetching();
      const data = await getEvaluation(inputValues);
      updateUI.dispResults(data);
    }
    catch (error) {
      updateUI.error(error);
    }

  })
});

function getUserInput(form) {

  let inputValues = {}
  form.querySelectorAll('input').forEach(input => {
    inputValues[input.name] = input.value;
  });

  return inputValues;
}

const updateUI = {

  fetching() {
    transitions.fadeOut(document.getElementById('error-box'));
    transitions.fadeOut(document.getElementById('eval-results'));
    transitions.fadeIn(document.querySelector('.backdrop'));
  },
  dispResults(values) {
    document.getElementById('pol').innerText = values.polarity;
    document.getElementById('sub').innerText = values.subjectivity;
    document.getElementById('sentences').innerText = values.sentences;

    transitions.fadeIn(document.getElementById('eval-results'));
    transitions.fadeOut(document.querySelector('.backdrop'));
  },
  error(error) {
    document.getElementById('error-box').querySelector('.message').innerHTML = error;
    transitions.fadeOut(document.querySelector('.backdrop'));
    transitions.fadeIn(document.getElementById('error-box'));
  }

}

const transitions = (() => {

  const handleTransEnd = element => {
    return new Promise((resolve) => {
      const callback = (e) => {
        e.stopPropagation();
        element.classList.remove('transition');
        resolve(callback);
      }
      element.addEventListener('transitionend', callback);
    }).then((callback) => {
      element.removeEventListener('transitionend', callback);
    });
  }

  return {
    fadeInOut: element => {
      if (element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.clientHeight;
        element.classList.remove('hidden');
      } else {
        element.classList.add('transition');
        element.classList.add('hidden');
      }
      return handleTransEnd(element);
    },
    fadeIn: element => {
      if (element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.clientHeight;
        element.classList.remove('hidden');
        return handleTransEnd(element);
      }
    },
    fadeOut: element => {
      if (!element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.classList.add('hidden');
        return handleTransEnd(element);
      }
    },
  }
})()

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