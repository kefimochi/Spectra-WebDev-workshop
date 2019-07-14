//Listening to all input boxes
const boxes = document.querySelectorAll("input");
boxes.forEach((input, index) =>
  input.addEventListener("mousedown", function(e) {
    isShift(e, index);
  })
);
let boxesArr = [...boxes];
firstBox = -1;

//If shift is pressed then check multiple checkboxes
function isShift(e, index) {
  if (firstBox >= 0 && e.shiftKey) {
    if (firstBox < index) {
      for (let i = firstBox; i < index; i++) {
        boxesArr[i].checked = true;
      }
    } else {
      e.preventDefault();
      for (let i = index + 1; i < firstBox; i++) {
        boxesArr[i].checked = true;
        console.log("i " + i);
      }
    }
  } else {
    firstBox = index;
    console.log("first " + firstBox);
  }
}
