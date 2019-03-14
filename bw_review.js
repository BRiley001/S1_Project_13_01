"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 1

   Author: Brenden Riley
   Date:   3.12.19
   
   Filename: bw_review.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers.
      
   lightStars(e)
      Function that colors the stars representing the user rating
      for the book.
      
   turnOffStars(e)
      Function that restores the stars to empty colors, removing
      the user rating for the book.

   updateCount()
      Updates the count of characters in the wordCountBox
      element.

   countCharacters(textStr)
      Returns the number of a non-whitespace characters
      within textStr

*/
//the init() function will run when the page is loaded
window.onload = init();

// The init function will store all the values in an array, it then loops through it, and if the mouse goes over it, will change the cursor to a pointer and run the lightStars() function. If something is typed in the textarea box, the updateCount function is run
function init() {
      var stars = document.querySelectorAll("span#stars img");
      for (var i = 0; i < stars.length; i++) {
            stars[i].style.cursor = "pointer";
            stars[i].addEventListener("mouseenter", lightStars);
      }
      document.getElementById("comment").addEventListener("keyup", updateCount);
}

// When the lightstars() function is run the starNumber variable stores which star was hovered over. The stars variable stores which star triggered the event (and all the ones before it). for each value in the array the stars will light up, and then unlight up when no longer hovered over. The page then tells how many stars. When the stars leave it runs the turnOffStars function. When someone clicks on the stars it saves that value, and will not unlight the stars.
function lightStars() {
      var starNumber = event.target.alt;
      var stars = document.querySelectorAll("span#stars img");
      for (var i = 0; i < starNumber; i++) {
            stars[i].src = "bw_star2.png";
      };
      for (var i = starNumber; i < 5; i++) {
            stars[i].src = "bw_star.png";
      };
      document.getElementById("rating").value = starNumber + " stars";
      event.target.addEventListener("mouseleave", turnOffStars);
      event.target.addEventListener("click", function () {
            event.target.removeEventListener("mouseleave", turnOffStars);
      })
}

// the function will unlight the same number of stars that were lit up, and save the value of how many stars were lit into a variable.
function turnOffStars() {
      var stars = document.querySelectorAll("span#stars img");
      for (var i = 0; i < stars.length; i++) {
            stars[i].src = "bw_star.png";
      }
      document.getElementById("rating").value = "";
}

//The updateCount() function will update the number of characters that have been typed, adding (or subtracting) them from the wordcounter. If it goes over 1000 characters, then it will change to red, meant to show that it is over limit.
function updateCount() {
      var commentText = document.getElementById("comment").value;
      var charCount = countCharacters(commentText);
      var wordCountBox = document.getElementById("wordCount");
      wordCountBox.value = charCount + "/1000";
      if (charCount > 1000) {
            wordCountBox.style.color = "white";
            wordCountBox.style.backgroundColor = "red";
      } else {
            wordCountBox.style.color = "black";
            wordCountBox.style.backgroundColor = "white";
      }
}

/*=================================================================*/

function countCharacters(textStr) {
      var commentregx = /\s/g;
      var chars = textStr.replace(commentregx, "");
      return chars.length;
}