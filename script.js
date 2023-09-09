//starting off with knowns/made variables, arrays, questions
var timer = document.querySelector('.countdown');
var startBtn = document.querySelector('#hoot');

var questions = [
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
  console.log(questions[1].title);



//code for clicking start button


startBtn.addEventListener("click", function() {
//code for timer
  function countdown () {
    let timeLeft = 60;
    let timeInterval = setInterval(function () {
        timer.textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            //gonna need a time's up message
        }
    }, 1000)

  };
  countdown();
});




  


  