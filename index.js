
var gameStarted = false;

$(document).on("keypress", function(event) {
    if (!gameStarted) {
        gameStarted = true;
        $(".startButton").hide();
        gameSequence();
    }
});

$(".startButton").on("click", function() {
    gameSequence();
    $(".startButton").hide();
});


var patternSequenceGame = [];
var patternSequenceUser = [];

var colorButtons = ["red", "blue", "green", "yellow"];



var level = 0;

// this is the game sequence generated by the computer. This will be run till the player is playing.
function gameSequence() {
    patternSequenceUser = [];
    $("h2").text("LEVEL " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var nextBox = colorButtons[randomNumber];
    patternSequenceGame.push(nextBox);
    var nextColorId = "#" + nextBox;
    level++;
    $(nextColorId).fadeOut(100).fadeIn(100);
 }

$(".btn").click(handlerFunction);

function handlerFunction() {
    var userChosenColour = $(this).attr("id");
    patternSequenceUser.push(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound("#" + userChosenColour);
    checkAnswer(patternSequenceUser.length - 1);
 }


function checkAnswer(currentLevel) {
    if (patternSequenceGame[currentLevel] === patternSequenceUser[currentLevel]) {
        if (patternSequenceGame.length === patternSequenceUser.length) {
            setTimeout(function() {
                gameSequence();
            }, 1000);
        } 
    } else {
        gameOver();
    }
}


function gameOver() {
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
    $("h2").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
    patternSequenceGame = [];
    patternSequenceUser = [];
    level = 0;
    $(".startButton").show();
}



 function playSound(userInput) {

    switch (userInput) {
        case "#red":
            var redSound = new Audio("./sounds/red.mp3")
            redSound.play();
            break;

        case "#blue":
            var blueSound = new Audio("./sounds/blue.mp3")
            blueSound.play();
            break;
        
        case "#green":
            var greenSound = new Audio("./sounds/green.mp3")
            greenSound.play();
            break;

        case "#yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3")
            yellowSound.play();
            break;
    
        default: console.log("clicked");
            break;
    }
 }
