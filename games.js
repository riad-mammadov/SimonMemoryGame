var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;

var level = 0;

$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
    playSound(randomChosenColour);
}

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastAnswer = userClickedPattern.length - 1;
    checkAnswer(lastAnswer);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 100);
        }
    } else {
        endGame();
    }
}

function endGame() {
    $("#level-title").text("You have failed, refresh to try again!");

}



