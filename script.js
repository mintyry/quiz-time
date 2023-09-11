//starting off with knowns/made variables, arrays, questions
let timer = document.querySelectorAll('.countdown');
let startBtn = document.querySelector('#surroundHoot');
//variables in question/quiz portion
let quiz = document.querySelector('#question');
let choiceSection = document.querySelector('#choices');
let topLine = document.querySelector('#startline');
let scoreShow = document.querySelector('#scores');

let currentIndex = 0;
let timeLeft = 60;

//array of questions and choices
let questions = [
  {
    title: '1. What does Pokémon stand for?',
    choices: ['Poke Mobile On', 'Pocket Monsters', 'Pocket Monastery', 'For what is right in the world'],
    answer: 'Pocket Monsters',
  },
  {
    title: '2. Who is the mascot of the Pokémon franchise?',
    choices: ['Charizard', 'Mewtwo', 'Pikachu', 'Muk'],
    answer: 'Pikachu',
  },
  {
    title: '3. What was the name of the lead protagonist in the Japanese Pokémon anime?',
    choices: [
      'Satoshi',
      'Ash',
      'Red',
      'Suzuki',
    ],
    answer: 'Satoshi',
  },
  {
    title:
      '4. Which of these is a fire type Pokémon weak to?',
    choices: ['Water', 'Rock', 'Ground', 'All of the above'],
    answer: 'All of the above',
  },
  {
    title:
      '5. Which type would be best to use against a Dark Tera-type Mewtwo?',
    choices: ['Fighting', 'Bug', 'Fairy', 'Poison'],
    answer: 'Bug',
  },
];
//just to test how to access
console.log(questions);//all of the questions/choices in array
console.log(questions[0].title);//access title of [index] question
console.log(questions[0].choices); //access choices ""
console.log(questions[0].answer); //access answer ""

//code for timer
function countdown() {
  // let timeLeft = 60;
  let timeInterval = setInterval(function () {
    timer[0].textContent = timeLeft;
    timer[1].textContent = timeLeft;
    timeLeft--;
    //when time's up or user finishes all questions, time stops and game over messages display
    if (timeLeft === 0 || currentIndex >= 5) {
      clearInterval(timeInterval);
      timer[0].textContent = 'Time\'s up!';
      timer[1].textContent = 'You\'re done!';
      timer[0].setAttribute('style', 'font-size: 7vh');
      timer[1].setAttribute('style', 'font-size: 6.5vh');
      showLeaderboard();
    }
  }, 1000)
};

//make reusable code (ie: function) that will show question and choices
//putting content inside of quiz variable (accesses #question in HTML)
//the content will override what's in HTML and become the various questions, accessed by their index number
//choiceSection (which accesses the ul #choices, is an empty section for the multiple choices that will populate from the for loop)
//when this for loop runs, it will create list items containing buttons in the ul
//populate empty buttons with the choices for the question
//onclick, runs nextQuestion function which will increase the index number for the questions array, thus changing to the next question.
function showQuiz() {
  quiz.textContent = questions[currentIndex].title;
  choiceSection.textContent = '';

  for (let i = 0; i < questions[currentIndex].choices.length; i++) {

    let listEl = document.createElement('li');
    let listBtn = document.createElement('button');

    listBtn.textContent = questions[currentIndex].choices[i];
    listBtn.onclick = function () {
      checkCorrect(questions[currentIndex].choices[i], questions[currentIndex].answer);
    };
    listEl.appendChild(listBtn);
    choiceSection.appendChild(listEl);
  }
};

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= 5) {
    showLeaderboard();
  } else {
  showQuiz();
  }
};

function checkCorrect (x, y) {
  if (x !== y) {
    timeLeft = timeLeft - 10;
    // listBtn.setAttribute('style','background-color:red');
  };
  nextQuestion();
};

function showLeaderboard() {
  topLine.textContent = 'Leaderboard';
  choiceSection.textContent = '';
  quiz.textContent = '';

  scoreShow.textContent = 'Your score is ' + timeLeft + '!';


  let initialsBox = document.createElement('input');
  initialsBox.setAttribute('type', 'text');
  initialsBox.setAttribute('placeholder', 'Enter nickname/initials');
  initialsBox.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');

  let submitBtn = document.createElement('input');
  submitBtn.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');
  submitBtn.setAttribute('type', 'submit');

  quiz.appendChild(initialsBox);
  choiceSection.appendChild(submitBtn);

}
//code for clicking start button
//call timer
//call questions
//disables button from being clicked after first click

startBtn.addEventListener("click", function () {
  countdown();
  showQuiz();
  startBtn.setAttribute('disabled', true);
});








