//starting off with knowns/made variables, arrays, questions
let timer = document.querySelectorAll('.countdown');
let startBtn = document.querySelector('#surroundHoot');
//variables in question/quiz portion
let quiz = document.querySelector('#question');
let choiceSection = document.querySelector('#choices');
let topLine = document.querySelector('#startline');
let scoreShow = document.querySelector('#scores');
let correctShow = document.querySelector('#correct-and-names');
let timeInterval;


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
  timeInterval = setInterval(function () {
    timer[0].textContent = timeLeft;
    timer[1].textContent = timeLeft;
    timeLeft--;
    //when time's up or user finishes all questions, time stops and game over messages display
    if (timeLeft === 0 || currentIndex >= 5) {
    
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
    listBtn.setAttribute('class', 'choicebutton');

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
    if (timeLeft <= 0) {
      timeLeft = 0;
      timer[0].textContent = timeLeft;
      timer[1].textContent = timeLeft;
    }
    correctShow.textContent = 'Boo! That ain\'t it!!'
    correctShow.setAttribute('style', 'color: red');
  } else {
    timeLeft++
    correctShow.textContent = 'Woohoo! You got it!'
    correctShow.setAttribute('style', 'color: yellowgreen');
    if (timeLeft > 60) {
      timeLeft = 60;
    }
  };
  nextQuestion();
};

function showLeaderboard() {
  clearInterval(timeInterval);
  timer[0].textContent = 'Time\'s up!';
  timer[1].textContent = 'You\'re done!';
  timer[0].setAttribute('style', 'font-size: 7vh');
  timer[1].setAttribute('style', 'font-size: 6.5vh');

  topLine.textContent = 'Leaderboard';
  choiceSection.textContent = '';
  quiz.textContent = '';

  let score = timeLeft;
  if (score > 60) {
    score = 60;
  }
  scoreShow.textContent = 'Your score is ' + score + '!';


  let initialsBox = document.createElement('input');
  initialsBox.setAttribute('type', 'text');
  initialsBox.setAttribute('placeholder', 'Enter nickname/initials');
  initialsBox.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');

  let submitBtn = document.createElement('input');
  submitBtn.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');
  submitBtn.setAttribute('type', 'submit');
  // submitBtn.setAttribute('id', 'scores-button');

  quiz.appendChild(initialsBox);
  choiceSection.appendChild(submitBtn);


  //might have to be in a function (within this function it's already in)
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (initialsBox.value === '') {
      return alert("Input cannot be blank.\nPlease enter initials or nickname.");
      
    } 
    // correctShow.setAttribute('style', 'color: antiquewhite; height:300px; overflow:hidden; overflow:scroll;');

    // const newObject = {
    //   score: score;
    // }

   
//getItem (whats in local storage), keep it as array, modify to include current data, set that into local storage
   

    //  let usernames = initialsBox.value;
    //  localStorage.setItem('myUsername', usernames);


    let showUsername = JSON.parse(localStorage.getItem('myUsername')) || [];
    console.log(showUsername);
    //we need to parse this, because we want usernames and scores AND SAVE them all, not just overwrite old entries

    //.push keep adding newer entries into array
    let newScore = {
      initials: initialsBox.value,
      score: score
    }
    showUsername.push(newScore);
    showUsername.sort(function(a , b){
      return b.score-a.score;
    })

    localStorage.setItem('myUsername', JSON.stringify(showUsername));


    let scoresList = document.createElement('ol');
    correctShow.textContent = '';
    correctShow.appendChild(scoresList);
    correctShow.setAttribute('style', 'color: antiquewhite; height: 20%; overflow: scroll; overflow-x: visible; padding-left: 50px; margin: 3% auto');

    for (i = 0; i < showUsername.length; i++) {
      let scoresListItem = document.createElement('li');
      scoresListItem.textContent = showUsername[i].initials + ' - ' + showUsername[i].score;
      scoresList.appendChild(scoresListItem);
    }
   

    submitBtn.setAttribute('style', 'display: none');

    let restartBtn = document.createElement('button');
    restartBtn.setAttribute('style', ' width: 100%; background-color: #d0d0d0; color: black; padding: 10px; border-color: none; border-radius: 360px; border-style: none; margin-bottom: 5%; box-shadow: 2px 5px; margin: 1% auto 3%;');
    restartBtn.setAttribute('onClick', 'window.location.reload()')
    restartBtn.textContent = 'Try again?';
    choiceSection.appendChild(restartBtn);

  })

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





//ask Meg: form element to input box; how to sort or organize scores by highest number
//todo: create restart button, criteria for initials, hover for multiple choices


