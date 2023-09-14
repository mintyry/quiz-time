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

//starting numbers for questions index and time left
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
    timer[0].textContent = timeLeft;
    timer[1].textContent = timeLeft;
  timeInterval = setInterval(function () {
    timeLeft--;
    timer[0].textContent = timeLeft;
    timer[1].textContent = timeLeft;
    
    /* when time's up or user finishes all questions, showLeaderboard() will run, which will immediately stop timer. Placing clearInterval at the top
    solved the issue of the clock still running for a nanosecond even though quiz is over */
    if (timeLeft <= 0 || currentIndex >= 5) {
      showLeaderboard();
    }
  }, 1000)
  // ^above is the timer's increment in milliseconds
};

//putting content inside of quiz variable (accesses #question in HTML)
//the content will override what's in HTML and become the various questions, accessed by their index number
//choiceSection, which accesses the ul #choices, is an empty section for the multiple choices that will populate from the for loop
//when this for loop runs, it will create list items containing buttons in the ul
//populate empty buttons with the choices for the question
//onclick, runs checkCorrect function which will pass through the parameters to check the current question's correct answer against the user's choice.
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
    //bellow appends/adds to the variable that access their corresponding HTML elements
    listEl.appendChild(listBtn);
    choiceSection.appendChild(listEl);
  }
};

/* this runs the next question in the array, and since there are only 5 questions, the highest index is 4, 
so once it hits 5 or higher, we will run the showLeaderboard function.
If it hasn't hit index 5 yet, it will continue to run the showQuiz function, which continues the questions in the array. */
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= 5) {
    showLeaderboard();
  } else {
    showQuiz();
  }
};

// this function checks to see if user's answer is correct. If not, time is deducted by ten, and they see a message.
// if user is correct, they see a message, and one second is added; this is to allow for opportunity to get a perfect score.
function checkCorrect(x, y) {
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

//clears the scoreboard and local storage when called in clearBtn later
function clearScores() {
  localStorage.clear();
  correctShow.setAttribute('style', "display:none");
}

// below populates the leaderboard page
function showLeaderboard() {
  /* once timer hits zero or user passes all questions, timer is immediately stopped. Placing clearInterval here and accessing global timeInterval here
  resolved the issue of the timer still running for a nanosecond even after quiz was done */
  clearInterval(timeInterval);
  timer[0].textContent = 'Time\'s up!';
  timer[1].textContent = 'You\'re done!';
  timer[0].setAttribute('style', 'font-size: 7vh');
  timer[1].setAttribute('style', 'font-size: 6.5vh');

//actual leaderboard populates
  topLine.textContent = 'Leaderboard';
  choiceSection.textContent = '';
  quiz.textContent = '';

  // this is to ensure there is a cap to the top score and that the score cannot be a negative number
  let score = timeLeft;
  if (score > 60) {
    score = 60;
  } else if (score < 0) {
    score = 0;
  };

  //displays final score at the end of quiz
  scoreShow.textContent = 'Your score is ' + score + '!';

  //creating input box for user to enter nickname or initials
  let initialsBox = document.createElement('input');
  initialsBox.setAttribute('type', 'text');
  initialsBox.setAttribute('placeholder', 'Enter nickname/initials');
  initialsBox.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');

  //creating submit button for input box
  let submitBtn = document.createElement('input');
  submitBtn.setAttribute('style', 'font-size: 3vh; padding: 2vh; border-radius:100px; font-family: Bricolage Grotesque');
  submitBtn.setAttribute('type', 'submit');
  // submitBtn.setAttribute('id', 'scores-button');

  //add them to HTML sections
  quiz.appendChild(initialsBox);
  choiceSection.appendChild(submitBtn);

  // Below is the submit button's functionality
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // alert box in case user leaves input box empty
    if (initialsBox.value === '') {
      return alert("Input cannot be blank.\nPlease enter initials or nickname.");
    }

    //getItem (whats in local storage), keep it as array, modify to include current data, set that into local storage to keep adding input
    let showUsername = JSON.parse(localStorage.getItem('myUsername')) || [];
    console.log(showUsername);
    //we need to parse this, because we want usernames and scores AND SAVE them all, not just overwrite old entries

    //.push keep adding newer entries into array
    //written as object so this way browswer can access the keys and sort the entries in order from highest score to lowest
    let newScore = {
      initials: initialsBox.value,
      score: score
    }
    showUsername.push(newScore);
    showUsername.sort(function (a, b) {
      return b.score - a.score;
    })

    localStorage.setItem('myUsername', JSON.stringify(showUsername));

    //creating an ol element so scores in leaderboard are displayed in a numbered, vertical list
    let scoresList = document.createElement('ol');
    correctShow.textContent = '';
    correctShow.appendChild(scoresList);
    correctShow.setAttribute('style', 'color: antiquewhite; height: 20%; overflow: scroll; overflow-x: visible; padding-left: 50px; margin: 3% auto');

    //adds each entry in the object as a list item
    for (i = 0; i < showUsername.length; i++) {
      let scoresListItem = document.createElement('li');
      scoresListItem.textContent = showUsername[i].initials + ' - ' + showUsername[i].score;
      scoresList.appendChild(scoresListItem);
    }
    // hides the submit button after user has entered their input; this way they can't keep pressing and submitting their score into local storage after one game
    submitBtn.setAttribute('style', 'display: none');

    //restarts the quiz
    let restartBtn = document.createElement('button');
    restartBtn.setAttribute('style', ' width: 100%; background-color: #d0d0d0; color: black; padding: 10px; border-color: none; border-radius: 360px; border-style: none; margin-bottom: 5%; box-shadow: 2px 5px; margin: 1% auto 3%;');
    restartBtn.setAttribute('onClick', 'window.location.reload()')
    restartBtn.textContent = 'Try again?';
    choiceSection.appendChild(restartBtn);

    //creates clear scores button
    let clearBtn = document.createElement('button');
    clearBtn.setAttribute('style', ' width: 100%; background-color: #d0d0d0; color: black; padding: 10px; border-color: none; border-radius: 360px; border-style: none; margin-bottom: 5%; box-shadow: 2px 5px; margin: 1% auto 3%;');
    clearBtn.setAttribute('onClick', 'clearScores()')
    clearBtn.textContent = 'Wipe out scores';
    choiceSection.appendChild(clearBtn);
  })

}

//the button to start it all
startBtn.addEventListener("click", function () {
  countdown();
  showQuiz();
  // after running those functions, the button becomes disabled
  startBtn.setAttribute('disabled', true);
});


//ask Meg: why the second discrepancy // clearing scores 227 //fix scroll