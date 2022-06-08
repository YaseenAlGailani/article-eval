import './styles/main.scss'
import transitions from './js/transitions'
import fetcher from './js/fetcher'
import validate from './js/validation'

window.addEventListener('DOMContentLoaded', function () {

    const closeButtons = document.querySelectorAll('.close-btn');
    const evalForm = document.querySelector('#eval-form');
    const evalResults = document.getElementById('eval-results');
    const errorBox = document.getElementById('error-box');

    const $placeholders = {
        polarity: document.getElementById('pol'),
        subjectivity: document.getElementById('sub'),
        sentences: document.getElementById('sentences')
    }

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

    evalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validate.isValid(evalForm)) return ;
        const URLInput = document.getElementById('eval-url');
        const backdrop = document.querySelector('.backdrop');

        transitions.fadeOut(errorBox);
        transitions.fadeOut(evalResults);
        transitions.fadeIn(backdrop);

        fetcher.text('http://localhost:3000/MCk').then(key => {
            return fetcher.JSON(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${URLInput.value}`)
        }).then(evaluation => {
            const values = evalParser(evaluation);

            $placeholders.polarity.innerText = values.polarity;
            $placeholders.subjectivity.innerText = values.subjectivity;
            $placeholders.sentences.innerText = values.sentences;

            transitions.fadeIn(evalResults);
            transitions.fadeOut(backdrop);
        }).catch(error => {
            errorBox.querySelector('.message').innerHTML = error;
            transitions.fadeOut(backdrop);
            transitions.fadeIn(errorBox);
        })
    })
});

const evalParser = (data) => {

    if (data.status.code > 0) {
        throw (data.status.msg);
    }

    let polarity = '';
    switch (data.score_tag) {
        case 'P+':
            polarity = 'Strong positive';
            break;
        case 'P':
            polarity = 'Positive';
            break;
        case 'NEU':
            polarity = 'Neutral';
            break;
        case 'N':
            polarity = 'Negative';
            break;
        case 'N+':
            polarity = 'Strong negative';
            break;
        case 'NONE':
            polarity = 'Without polarity';
            break;
    }

    let sentences = '';

    for (let i = 0; i < 3; i++) {
        sentences += data.sentence_list[i].text;
    }

    sentences = sentences.replace(/(\.)([A-Z])/g, ". $2");

    return {
        polarity,
        subjectivity: data.subjectivity.charAt(0).concat(data.subjectivity.substring(1).toLowerCase()),
        sentences
    }
}

