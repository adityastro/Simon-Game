var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];   var userClickedPattern = []; var level=0; 
var started = false;


$(document).keypress( function (){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if(gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("#level-title").text( "Game Over, Press Any Key to Restart" );
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      }, 200);

    startOver();
  }
}


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {

  $('#'+currentColor).addClass("pressed");

  setTimeout( function() {
    $('#'+currentColor).removeClass("pressed");
  }, 100 );
    
}

function playSound(x) {
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}