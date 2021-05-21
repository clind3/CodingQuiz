//create variables/constants for question section, answer list
var timer = document.getElementById("timer");
console.log(timer);
var questionListed = document.getElementById("question");
var answerList = document.getElementById("answerList");
var nextScreenButton = document.getElementById("nextScreenButton");
var responseToUserAnswer = document.getElementById("responseToUserAnswer");
var inputYourScore = document.getElementById("submitYourScore");
var submitToScoreBoard = document.getElementById("submitButton");
console.log(submitToScoreBoard);

var score = 0;
var highScores = [];
var questionIndex = (-1);
// console.log(questionIndex);

var questions = [
    {
        question: "Question 1",
        answers : ["a", "b", "c", "d"],
        correctAnswer: 2,
    },
    {
        question: "Question 2",
        answers : ["a", "b", "c", "d"],
        correctAnswer: 3,
    }

]

var givenSeconds = 15;

function setTime() {
    var timeInterval = setInterval(function() {
        givenSeconds--;
        timer.textContent = "Time Left: " + givenSeconds;
    }, 1000);

    if(givenSeconds === 0){
        clearInterval(timeInterval);
        generateAddScorePage();
    }
}

function generateNewQuestion(questionInput) {
    //  console.log(questionInput)
    answerList.disabled = false;
    questionListed.textContent = questionInput.question;
    var answers = questionInput.answers;
    //  console.log(questionInput.answers.length);
    var correctAnswer = questionInput.correctAnswer;
    answerList.innerHTML = "";
    for(var i=0; i<answers.length; i++){
        var li = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.setAttribute("name", "button");
        answerButton.textContent = answers[i];
        if(answers[i]== answers[correctAnswer]){
            answerButton.setAttribute("data-correct", "true");
        }else{
            answerButton.setAttribute("data-correct", "false");
            givenSeconds -= 5;
        }
        li.appendChild(answerButton);
        answerList.appendChild(li);
    }
    nextScreenButton.style.display = "none";
}

function generateAddScorePage(){
    answerList.textContent=""
    questionListed.textContent = "To list your highscore enter your name and hit submit."
    inputYourScore.style.display = "inline-block";



    //!!!Currently working on getting highscore page to appear after
    //!!!submit has been pressed does not currently generate anything
    submitToScoreBoard.addEventListener("click", function(){
        console.log("I am submitting");
        var inputName = document.getElementById("yourName").value;
        console.log(inputName);
        var highscoreInput = score + " " +inputName;
        highScores.push(highscoreInput);
        console.log(highScores);
        questionListed.textContent= "Here are the High scores:"
        highScores.sort();
        for(var i=0; i<highScores.length; i++){
            var li = document.createElement("li");
            li.textContent = highScores[i];
            answerList.appendChild(li);
        }
        inputYourScore.style.display = "none";

    });
};

nextScreenButton.addEventListener("click", function() {
    if(questionIndex == -1){
      setTime();  
    }
    
    questionIndex++;
    // console.log(questionIndex);
    responseToUserAnswer.textContent = "";
    if(questionIndex<questions.length){
        var questionInput = questions[questionIndex];
        generateNewQuestion(questionInput);
    }else{
        generateAddScorePage();
        nextScreenButton.style.display = "none";
    }
    
    }
);

answerList.addEventListener("click", function(event){
    var questionInput = questions[questionIndex];
    var answers = questionInput.answers;
    var correctAnswer = questionInput.correctAnswer;
    console.log(correctAnswer);
    var selectedAnswer = event.target;
    console.log(selectedAnswer);
    var isCorrect = selectedAnswer.getAttribute("data-correct");
    console.log(isCorrect);
    if(isCorrect == "true"){
        responseToUserAnswer.textContent = "Yes, that was correct!"
        responseToUserAnswer.style.color = "rgb(4, 70, 4)";
        responseToUserAnswer.style.background = "rgba(168, 253, 168, 0.521)";
        responseToUserAnswer.style.fontWeight = "800";
        score++;
    }else{
        responseToUserAnswer.textContent = "That is incorrect! The correct answer was " + answers[correctAnswer];
        responseToUserAnswer.style.color = "rgb(122, 7, 7)";
        responseToUserAnswer.style.background = "rgba(250, 123, 123, 0.74)";
        responseToUserAnswer.style.fontWeight = "800";
    }
    console.log(answerList.children);
    var listItem = document.getElementsByName("button");
    console.log(listItem);
    for(var i=0; i<listItem.length ;i++){
        listItem[i].disabled = true;
    }
    nextScreenButton.textContent = "Next";
    nextScreenButton.style.display = "inline-block";
})

// inputYourScore.addEventListener("submit", function(){
//     highScores.appendChild(score);
//     questionListed.textContent= "Here are the High scores:"
//     highScores.sort();
//     for(var i=0; i<highScores.length; i++){
//         var li = document.createElement("li");
//         li.textContent = highScores[i];
//         answerList.appendChild(li);
//     }
// })