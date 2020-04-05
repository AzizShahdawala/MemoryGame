var buttonColors= ["red","blue","green","yellow"]; //Create an Array to store button of different colors

var gamePattern=[];  //An empty array which will be further used to store the randomly selected button colors

var userClickedPattern=[]; //An empty array which will be further used to store the randomly selected button colors

var started = false; // Create a boolean value to start toggling between the game started and not yet started

var level= 0; // Initialize the level variable to 0

var UserName= prompt("Enter your name: ");  //Store the User Name

$(document).keypress(function(){  // Records any key pressed over the whole document by the keypress event listener
  if(!started)  // If !started i.e True the If loop will run
  {
    $("#level-title").text(UserName + " You are on Level " + level );  // Replaces the H1 with the current level
    nextSequence();  // Runs the nextSequence function
    started=true; 
  }
});

function nextSequence() //A function created to generate a random number which then point to the colors respectively
{
  userClickedPattern=[]; //Once the nextSequence() is triggered in checkAnswer() empty the userClickedPattern[] Array for next level.
  level++;  // Increments the level by level 

  $("#level-title") .text(UserName + " You are on Level " + level ); // Replaces the H1 with the current level

  var randomNumber= Math.floor(Math.random() * 4);  //Random number 
  var randomChosenColor = buttonColors[randomNumber]; //storing the value selected from an array
  gamePattern.push(randomChosenColor); // Adding the element to an Empty Array  

  $("#" + randomChosenColor ).fadeIn(200).fadeOut(200).fadeIn(200);  // Applying Animation Effects after the button was clicked
  PlaySound(randomChosenColor);  //Calling the PlaySound function
}

nextSequence();

$(".btn").click(function() {  //This is a handler function , it is used to show the user clicked/chosen button
  var userChosenColor= $(this).attr("id"); //Whichever button the user will click "this" keyword will point it towards the respective ID to trigger the color
  userClickedPattern.push(userChosenColor); // Adding the element to an Empty Array
  PlaySound(userChosenColor); //Calling the PlaySound function
  animatePress(userChosenColor); // Calling the Animation function 
  checkAnswer(userClickedPattern.length-1);
});

function PlaySound(place_holder)  // Used to handle fetching the audio files according to the color selected
{
  var audio = new Audio("sounds/" + place_holder + ".mp3");
  audio.play();
}

function animatePress(currentColor) // Used to add/remove the style class "pressed" to obtain the animation effects
{
 $("#" + currentColor).addClass("pressed"); 
 setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
 }, 200);
}

function checkAnswer(currentLevel) //A function to check the current user answer and the game pattern
{
 if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) //If the game pattern and userclickedPattern are same
 {
   
  $("#level-title") .text("Success!"); //Dispkay text Success!
   
  if(gamePattern.length===userClickedPattern.length) //If the gamePattern length and userClickedPattern length are same
  {
    setTimeout(function(){  //Set a timeout to trigger the newSequence();
      nextSequence();
    },1000);
  }
 }
 else
 {
  
  PlaySound("wrong"); //Call the Playsound() with the wrong.mp3 audio
  $("body").addClass("game-over"); //Add the class
  setTimeout(function () {
    $("body").removeClass("game-over"); //Remove the class after a timer
  }, 300);
  $("#level-title").text("Game Over,Press Any key To Restart!"); //Display
  startOver(); //To reset all the values

 }

}

function startOver() // Reset all values function
{
  level=0;
  gamePattern=[];
  started=false;
}

