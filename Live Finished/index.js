// Grabs all elements w/ class of "key", will return an array of objects.
const keys = document.querySelectorAll(".key");

// Loops through every key and attaches an event listener
// on every element. Now whenever 'mousedown' event will
// be triggered, playSound will be run while passing
// true for isClick variable and passing the event that occured.
keys.forEach(key =>
  key.addEventListener("mousedown", function(e) {
    playSound(true, e); // Can't do () => {} since need to pass arguments
  })
);

// Listening on window(root of the DOM tree) in case user presses
// any keyboard keys. Once an event is fired, playSounds
// will be called w/ false as a value for isClick & a corresponding event.
window.addEventListener("keydown", function(e) {
  playSound(false, e);
});

// Loops through every key and listen for any transition.
// Once a transition occurs, runs removeTransition function.
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

function playSound(isClick, e) {
  // Executes in case user clicks on a key.
  if (isClick === true) {
    // Returns a key object on which click event fired and
    // adds the class of playing to it.
    let target = e.currentTarget;
    target.classList.add("playing");

    //Wtf this code does?
    console.log("target.dataset.key", target.dataset.key);
    for (let i = 0; i < keys.length; i++) {
      if (target.dataset.key === keys[i].dataset.key) {
        const audio = document.querySelector(
          `audio[data-key="${keys[i].dataset.key}"]`
        );
        audio.currentTime = 0;
        audio.play();
      }
    }
  }

  // Executes in case user presses a keyboard key.
  if (isClick === false) {
    // e.keyCode returns a unique number assigned to a keyboard key.
    // So we added data-key corresbonding to a key on both '.key' elements
    // as well as on audio elements in HTML to make it easier to select them.

    // Selects audio file with a corresponding data key.
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // Selects a key abject with a corresponding data key.
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    // In case audio is missing, stop the function, otherwise add
    // the class of playing to the key on which click event occured.
    if (!audio) return;
    key.classList.add("playing");

    // Setting audio's currentTime to zero will make sure that audio starts
    // from the beginning every time a key is pressed.
    audio.currentTime = 0;
    audio.play();
  }
}

function removeTransition(e) {
  // There will be either 'transform' or 'box-shadow' events
  // that had a transition. If it was a shadow, stop the function.
  if (e.propertyName !== "transform") return;
  // 'This' is a key object, from which we remove the class 'playing'
  // that we added earlier.
  this.classList.remove("playing");
}
