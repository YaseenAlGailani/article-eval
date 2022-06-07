import './styles/main.scss'
import transitions from './js/transitions'
import fetcher from './js/fetcher'

window.addEventListener('DOMContentLoaded',function(){

    const closeButtons = document.querySelectorAll('.close-btn');
    const evalForm = document.querySelector('#eval-form');
    const evalResults = document.getElementById('eval-results');

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

    evalForm.addEventListener('submit', function(e){
        e.preventDefault();
        const artcileURL = document.getElementById('eval-url').value;
        const backdrop = document.querySelector('.backdrop');
        transitions.fadeOut(evalResults);
        transitions.fadeIn(backdrop);

        fetcher.text('http://localhost:3000/MCk').then(key=>{
          return fetcher.JSON(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${artcileURL}`)
        }).then(evaluation=>{
            const values = evalParser(evaluation);
            $placeholders.polarity.innerText = values.polarity;
            $placeholders.subjectivity.innerText = values.subjectivity;
            $placeholders.sentences.innerText = values.sentences;

            transitions.fadeIn(evalResults);
            transitions.fadeOut(backdrop);    
        })
    })
});

const evalParser = (data) => {
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

    for (let i=0;i<3;i++){
        sentences += data.sentence_list[i].text;
    }

    sentences = sentences.replace(/(\.)([A-Z])/g, ". $2");

    return {
        polarity,
        subjectivity: data.subjectivity.charAt(0).concat(data.subjectivity.substring(1).toLowerCase()),
        sentences
    }
}