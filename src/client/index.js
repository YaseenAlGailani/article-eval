import './styles/main.scss'
import getEvaluation from './js/getEvaluation'
import transitions from './js/transitions'
import validate from './js/validation'

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

const updateUI = (()=>{
  const backdrop = document.querySelector('.backdrop');
  const evalResults = document.getElementById('eval-results');
  const errorBox = document.getElementById('error-box');

  return {
    fetching() {
      transitions.fadeOut(errorBox);
      transitions.fadeOut(evalResults);
      transitions.fadeIn(backdrop);
    },
    dispResults(values) {
      document.getElementById('pol').innerText = values.polarity;
      document.getElementById('sub').innerText = values.subjectivity;
      document.getElementById('sentences').innerText = values.sentences;
      
      transitions.fadeIn(evalResults);
      transitions.fadeOut(backdrop);
    },
    error(error) {
      errorBox.querySelector('.message').innerHTML = error;
      transitions.fadeOut(backdrop);
      transitions.fadeIn(errorBox);
    }
  }
})();
