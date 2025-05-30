import { events } from './events.js';

let question = [];
let answer = [];

function setQuestion(melody) {
  question = melody.notes.map((note) => note.pitch);
}

function clearQuestion() {
  question = [];
  answer = [];
}

function clearFeedback() {
  document.querySelector('.feedback-container').replaceChildren();
}

function listen() {
  events.on('keyPressed', addToAnswer);
}

function ignore() {
  events.off('keyPressed', addToAnswer);
}

function addToAnswer(midi) {
  answer.push(midi);
  const position = answer.length - 1;

  const answerDiv = document.createElement('div');
  answerDiv.classList.add('answer');

  if (answer[position] === question[position]) {
    const correctDiv = document.createElement('div');
    correctDiv.classList.add('correct');

    const correctIcon = document.createElement('i');
    correctIcon.classList.add('far', 'fa-check-circle');

    correctDiv.appendChild(correctIcon);
    answerDiv.appendChild(correctDiv);
  } else {
    const wrongDiv = document.createElement('div');
    wrongDiv.classList.add('wrong');

    const wrongIcon = document.createElement('i');
    wrongIcon.classList.add('far', 'fa-times-circle');

    wrongDiv.appendChild(wrongIcon);
    answerDiv.appendChild(wrongDiv);
  }

  document.querySelector('.feedback-container').appendChild(answerDiv);

  if (position >= question.length - 1) {
    ignore();
    clearQuestion;
    const wait = setTimeout(() => {
      if (answer.length === 0 || answer.length === question.length) {
        clearFeedback();
      }

      clearTimeout(wait);
    }, 2000);
  }
}

export default {
  setQuestion,
  clearQuestion,
  clearFeedback,
  listen,
  ignore,
  addToAnswer,
};
