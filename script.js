//starting off with knowns/made variables, arrays, questions
let timer = document.querySelectorAll('.countdown');
let startBtn = document.querySelector('#hoot');

let questions = [
    {
      title: 'What does Pokémon stand for?',
      choices: ['Poke Mobile On', 'Pocket Monsters', 'Pocket Monastery', 'For what is right in the world'],
      answer: 'Pocket Monsters',
    },
    {
      title: 'Who is the mascot of the Pokémon franchise?',
      choices: ['Charizard', 'Mewtwo', 'Pikachu', 'Muk'],
      answer: 'Pikachu',
    },
    {
      title: 'What was the name of the lead protagonist in the Japanese Pokémon anime?',
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
        'Which of these is a fire type Pokémon weak to?',
      choices: ['Water', 'Rock', 'Ground', 'All of the above'],
      answer: 'All of the above',
    },
    {
      title:
        'Which type would be best to use against a Dark Tera-type Mewtwo?',
      choices: ['Fighting', 'Bug', 'Fairy', 'Poison'],
      answer: 'Bug',
    },
  ];
//just to test how to access
  console.log(questions);
  console.log(questions[1].title);
  console.log(questions[1].choices);
  console.log(questions[1].answer);



//code for clicking start button
//maybe wrap this in if statement later so the else can be when user clicks again, it presents next question
startBtn.addEventListener("click", function() {

//code for timer
  function countdown () {
    let timeLeft = 60;
    let timeInterval = setInterval(function () {
        timer[0].textContent = timeLeft;
        timer[1].textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            //gonna need a time's up message
            timer[0].textContent = 'Time\'s up!';
            timer[1].textContent = 'You\'re done!';
            timer[0].setAttribute('style', 'font-size: 7vh');
            timer[1].setAttribute('style', 'font-size: 6.5vh');
        }
    }, 100)
  };

  //code for showing questions
    

//call timer
  countdown();
//call questions

});




  


  