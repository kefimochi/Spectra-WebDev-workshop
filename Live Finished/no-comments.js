const keys = document.querySelectorAll(".key");

keys.forEach(key =>
  key.addEventListener("mousedown", function(e) {
    playSound(true, e); // Can't do () => {} since need to pass arguments
  })
);

window.addEventListener("keydown", function(e) {
  playSound(false, e);
});

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

function playSound(isClick, e) {
  let audio;
  if (isClick === true) {
    let target = e.currentTarget;
    target.classList.add("playing");

    audio = document.querySelector(`audio[data-key="${target.dataset.key}"]`);
  }

  if (isClick === false) {
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if (!audio) return;
    key.classList.add("playing");
  }
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}
