var questions = [{
    question: "1. Which 70s TV family had eight kids ?",
    answers: [
      "The Brady family",
      "The Bradford Family",
      "The Partridge family",
      "The Bundy family"
    ],
    correctAnswer: "The Bradford Family",
    name: "eight is enough"
  },
  {
    question: "2. Which TV undercover cop had a cockatoo named Fred ?",
    answers: [
      "Police Woman",
      "Barnaby Jones",
      "Baretta",
      "Rockford Files"
    ],
    correctAnswer: "Baretta",
    name: "Crime Drama"
  },
  {
    question: "Before playing Jack Tripper on 'Three's Company,' John Ritter played a preacher on this feel-good 70s family drama. ?",
    answers: [
      "Eight is Enough",
      "Room 222",
      "Family",
      "The Waltons"
    ],
    correctAnswer: "The Waltons",
    name: "Drama"
  },
  {
    question: "4. Which of the following is *not* a spin-off of 'All in the Family' ?",
    answers: [
      "One Day at a Time",
      "The Jeffersons",
      "Maude",
      "Gloria"
    ],
    correctAnswer: "One Day at a Time",
    name: "Ann Romono"
  },
  {
    question: "5. Which was *not* an actor on 'The Mary Tyler Moore Show' ?",
    answers: [
      "John Amos",
      "Ted Knight",
      "Ted Baxter",
      "Betty White"
    ],
    correctAnswer: "Ted Baxter",
    name: "Anchorman"
  },
  {
    question: "6. Name the real 70s show. ?",
    answers: [
      "None of these",
      "That's Peculiar",
      "That's Unbelievable",
      " That's Just Plain Odd"
    ],
    correctAnswer: "None of these",
    name: "70s show"
  },
  {
    question: "7. Find the faux 'Brady' TV spin-off, ",
    answers: [
      " The Brady Brides",
      "The Brady Grandkids",
      "The Brady Kids",
      "The Bradys"
    ],
    correctAnswer: "The Brady Grandkids",
    name: "bradys"
  },
  {
    question: "8. This grizzled guy played 'Trapper John, MD' on the series of the same name, but not in the movie or TV series which created the character.",
    answers: [
      "Wayne Rogers",
      "Donald Sutherland",
      "Wayne Newton",
      "Pernell Roberts"
    ],
    correctAnswer: "Pernell Roberts",
    name: "MASH"
  }
];

var $content = $('#content');
var $finalScreen = $('#finalScreen');
var $splashScreen = $('#splashScreen');
var $timesUp = $('#timesUp');
var $timer = $(".timeRemaining");
var timeLimit = 60;

var correctAnswers = 0;
var incompleteAnswers = 0;
var incorrectAnswers = 0;

var timerIntervalId;

function startTimer() {

  timerIntervalId = setInterval(resetTimer, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalId);
}

function resetTimer() {
  $timer.html(timeLimit);
  timeLimit--;
  if (timeLimit === 0) {
    stopTimer();
    endGame(true);
  }
}

function endGame(timeUp) {

  questions.forEach(function (question) {
    var value = '';

    question.root.find('input').each(function (index, input) {
      var $input = $(input);

      if ($input.prop('checked')) {
        value = $input.val();
      }
    });

    if (!value) {
      incompleteAnswers++;
      return;
    }
    var hasCorrectAns = value === question.correctAnswer;
    if (hasCorrectAns) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
  });
  $content.removeClass('active');

  if (timeUp) {
    startTimesUpScreen();
    return;
  }

  startFinalScreen();
}

function startTimesUpScreen() {
  $timesUp.addClass('active');

  var $correctScreen = $('#correctTimesUp');
  var $noAnswerScreen = $('#noAnswerTimesUp');
  var $wrongScreen = $('#wrongTimesUp');

  $correctScreen.append($('<span> ' + correctAnswers + '</span>'));
  $noAnswerScreen.append($('<span> ' + incompleteAnswers + '</span>'));
  $wrongScreen.append($('<span> ' + incorrectAnswers + '</span>'));

}

function startFinalScreen() {
  $finalScreen.addClass('active');

  var $correctScreen = $('#correctScreen');
  var $noAnswerScreen = $('#noAnswerScreen');
  var $wrongScreen = $('#wrongScreen');

  $correctScreen.append($('<span> ' + correctAnswers + '</span>'));
  $noAnswerScreen.append($('<span> ' + incompleteAnswers + '</span>'));
  $wrongScreen.append($('<span> ' + incorrectAnswers + '</span>'));
}

function startGame() {
  startTimer();
  var questionContainer = $("#question--container");

  for (var i = 0; i < questions.length; i++) {
    var newDiv = $("<div>");
    newDiv.append($("<h4>" + questions[i].question + "</h4>"));

    var options = questions[i].answers
    for (var optIdx = 0; optIdx < options.length; optIdx++) {
      var value = options[optIdx];

      newDiv.append(
        "<label class='question-option'>" +
        "<input type='radio' name='" + questions[i].name + "' value='" + value + "' data-idx='" + i + "' />" +
        value +
        "</label>"
      );

      questions[i].root = newDiv;
    }

    questionContainer.append(newDiv);
  }

  $("#sub-but").on("click", function () {
    endGame(false);
  })
}

$splashScreen.addClass('active');
$splashScreen.on("click", function () {
  $splashScreen.removeClass('active');
  $content.addClass('active');
  startGame();
})
