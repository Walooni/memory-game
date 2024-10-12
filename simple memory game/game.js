// INIT
const colorList = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let condition = "idle";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextSequence() {
  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColor = colorList[randNum];
  gamePattern.push(randomChosenColor);
  console.log("game pattern : " + gamePattern);

  setTimeout(() => {
    gamePattern.forEach((color, index) => {
      setTimeout(() => {
        $("#" + color)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
        playSound(color);
      }, 700 * index);
    });
  }, 1000);

  level = level + 1;
  $("#level-title").html("Level " + level).fadeOut(50).fadeIn(50);
  userClickPattern = [];
}

// AUDIO
var clickGreen = document.getElementById("green-audio");
var clickRed = document.getElementById("red-audio");
var clickBlue = document.getElementById("blue-audio");
var clickYellow = document.getElementById("yellow-audio");

function playSound(name) {
  if (name === "green") {
    clickGreen.play();
  }

  if (name === "red") {
    clickRed.play();
  }

  if (name === "yellow") {
    clickYellow.play();
  }

  if (name === "blue") {
    clickBlue.play();
  }

}

// $("#green").on("click", function(){
//     $(this).fadeOut(200).fadeIn(200)
//     clickGreen.play()
// })
// $("#red").on("click", function(){
//     $(this).fadeOut(200).fadeIn(200)
//     clickRed.play()
// })
// $("#blue").on("click", function(){
//     $(this).fadeOut(200).fadeIn(200)
//     clickBlue.play()
// })
// $("#yellow").on("click", function(){
//     $(this).fadeOut(200).fadeIn(200)
//     clickYellow.play()
// })

//button handler
$(".btn").on("click", function () {
  if (condition === "run") {
    //click pattern
    let btn_id = $(this).attr("id");

    $("#" + btn_id).toggleClass("pressed");
    playSound(btn_id);
    setTimeout(function () {
      $("#" + btn_id).toggleClass("pressed");
    }, 100);

    userClickPattern.push(btn_id);
    console.log("user click pattern: " + userClickPattern);

    //   check user answer
    for (let index = 0; index < userClickPattern.length; index++) {
      const answer = userClickPattern[index];
      if (answer != gamePattern[index]) {
        condition = "gameOver";
        $("#level-title").html("Game Over");
        level = 0;
        userClickPattern = [];
        gamePattern = [];

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
      }
    }

    //   check if user input already finish
    if (gamePattern.length == userClickPattern.length && condition == "run") {
      nextSequence();
    }
  }
});

// Testing

// start button
$(".start").click(function () {
  if (condition === "idle") {
    condition = "run";
    nextSequence();
    console.log("game pattern: " + gamePattern);
    userClickPattern = [];
  }
});

//restart button
$(".restart").on("click", function () {
  location.reload();
});
