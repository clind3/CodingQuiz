//create variables/constants for question section, answer list
var timer = document.getElementById("timer");
console.log(timer);
var questionListed = document.getElementById("question");
var answerList = document.getElementById("answerList");
var startQuizButton = document.getElementById("startQuizButton");
var responseToUserAnswer = document.getElementById("responseToUserAnswer");
var inputYourScore = document.getElementById("submitYourScore");
var submitToScoreBoard = document.getElementById("submitButton");
// console.log(submitToScoreBoard);
// localStorage.setItem("highscores", "");
var priorScores = localStorage.getItem("highscores");


var highScores = []
var questionIndex = (-1);
// console.log(questionIndex);
if (priorScores != null) {
    highScores = priorScores.split(",");
}
var questions = [
    {
        question: "What symbols go arround elements of an array?",
        answers: ["a. ()", "b. {}", "c. []", "d. <>"],
        correctAnswer: 2,
    },
    {
        question: "You are able to edit format and styling using javascript coding.",
        answers: ["a. True", "b. False"],
        correctAnswer: 0,
    },
    {
        question: "What is the basic format for a 'for' loop?",
        answers: ["a. while(i<2){...}", "b. for(i=0, i<2, i++){...}", "c. for(var i=0; i<2){...}", "d. for(var i=0; i<2; i++){...}"],
        correctAnswer: 3
    }

]

var givenSeconds = 60;

function setTime() {
    var timeInterval = setInterval(function () {
        givenSeconds--;
        timer.textContent = "Time Left: " + givenSeconds;
        if (givenSeconds <= 0 || questionIndex >= questions.length) {
            clearInterval(timeInterval);
            if (givenSeconds <= 0) {
                givenSeconds = 0;
            }
            generateAddScorePage();
            localStorage.setItem("score", givenSeconds);
            // var storeScore = localStorage.getItem("score");
            // console.log(storeScore);
        }
    }, 1000);
}

function stylingButton(listButton) {
    listButton.style.width = "100%";
    listButton.style.padding = "5px";
    listButton.style.fontSize = "16px";
    listButton.style.fontWeight = "bolder";
    listButton.style.color = "white";
    listButton.style.borderColor = "white";
    listButton.style.background = "linear-gradient(purple,rgb(231, 114, 231))";
    listButton.addEventListener("mouseenter", function () {
        listButton.style.color = "blue";
        listButton.style.background = "linear-gradient(rgb(228, 108, 228),rgb(243, 172, 243))";

    });
    listButton.addEventListener("mouseout", function () {
        listButton.style.color = "white";
        listButton.style.borderColor = "white";
        listButton.style.background = "linear-gradient(purple,rgb(231, 114, 231))";
    });
}

function generateNewQuestion(questionInput) {
    //  console.log(questionInput)
    answerList.disabled = false;
    questionListed.textContent = questionInput.question;
    var answers = questionInput.answers;
    //  console.log(questionInput.answers.length);
    var correctAnswer = questionInput.correctAnswer;
    answerList.innerHTML = "";
    for (var i = 0; i < answers.length; i++) {
        var li = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.setAttribute("name", "button");
        stylingButton(answerButton);
        answerButton.textContent = answers[i];
        if (answers[i] == answers[correctAnswer]) {
            answerButton.setAttribute("data-correct", "true");
        } else {
            answerButton.setAttribute("data-correct", "false");
            givenSeconds -= 5;
        }
        li.appendChild(answerButton);
        answerList.appendChild(li);
    }
    startQuizButton.style.display = "none";
}

function generateAddScorePage() {
    timer.textContent = "";
    answerList.textContent = "";
    var yourScore = localStorage.getItem("score");
    questionListed.textContent = "To list your highscore enter your name and hit submit.";
    var p = document.createElement("p");
    p.textContent = "Your score is " + yourScore;
    questionListed.appendChild(p);
    inputYourScore.style.display = "inline-block";
    // console.log(p);
    // console.log(givenSeconds);

    submitToScoreBoard.addEventListener("click", function () {
        // console.log("I am submitting");
        var inputName = document.getElementById("yourName").value;
        // console.log(inputName);
        var highscoreInput = yourScore + " " + inputName;
        highScores.push(highscoreInput);
        // console.log(highScores);
        questionListed.textContent = "Here are the High scores:";
        highScores.sort();
        for (var i = 0; i < highScores.length; i++) {
            var li = document.createElement("li");
            li.textContent = highScores[i];
            answerList.appendChild(li);
        }
        localStorage.setItem("highscores", highScores);
        inputYourScore.style.display = "none";
        questionIndex = 0;
        if (!startQuizButton.hasChildNodes) {
            var clearScoreButton = document.createElement("button");
            clearScoreButton.setAttribute("type", "button");
            clearScoreButton.innerHTML = "Clear Score";
            
            startQuizButton.append(clearScoreButton);
            startQuizButton.style.display = "inline-block";
            clearScoreButton.addEventListener("click", function (event) {
                event.preventDefault();
                for (var i = 0; i < highScores.length; i++) {
                    highScores.pop();
                }
                localStorage.setItem("highscores", highScores);
            });
        }
        
    });
};

startQuizButton.addEventListener("click", function () {
    givenSeconds = 75;
    setTime();
    questionIndex++;
    // console.log(questionIndex);
    generateNewQuestion(questions[questionIndex]);
}
);

answerList.addEventListener("click", function (event) {
    var questionInput = questions[questionIndex];
    var answers = questionInput.answers;
    var correctAnswer = questionInput.correctAnswer;
    // console.log(correctAnswer);
    var selectedAnswer = event.target;
    // console.log(selectedAnswer);
    var isCorrect = selectedAnswer.getAttribute("data-correct");
    // console.log(isCorrect);
    if (isCorrect == "true") {
        responseToUserAnswer.textContent = "Yes, that was correct!"
        responseToUserAnswer.style.color = "rgb(4, 70, 4)";
        responseToUserAnswer.style.background = "rgba(168, 253, 168, 0.521)";
        responseToUserAnswer.style.fontWeight = "800";
    } else {
        responseToUserAnswer.textContent = "That is incorrect! The correct answer was " + answers[correctAnswer];
        responseToUserAnswer.style.color = "rgb(122, 7, 7)";
        responseToUserAnswer.style.background = "rgba(250, 123, 123, 0.74)";
        responseToUserAnswer.style.fontWeight = "800";
        givenSeconds -= 5;
    }
    // console.log(answerList.children);
    var listItem = document.getElementsByName("button");
    // console.log(listItem);
    for (var i = 0; i < listItem.length; i++) {
        listItem[i].disabled = true;
    }

    setTimeout(function () {
        responseToUserAnswer.textContent = "";
        questionIndex++;
        if (questionIndex < questions.length) {
            generateNewQuestion(questions[questionIndex]);
        } else {
            localStorage.setItem("score", givenSeconds);
            generateAddScorePage();
        }
    }, 1000);
});

// clearScoreButton.addEventListener("click", function(){
//     for(var i = 0; i< highScores.length; i++){
//     highScores.pop();
//     }
//     localStorage.setItem("highscores", highScores);
// });