//Select All for box color change
const select = document.querySelectorAll(".selectJS");
select.forEach(box => {
  box.addEventListener("mousedown", selectAll);
  box.addEventListener("mouseup", remove);
});

//Clear All for box color change
const clear = document.querySelectorAll(".clearJS");
clear.forEach(box => {
  box.addEventListener("mousedown", clearAll);
  box.addEventListener("mouseup", remove);
});

//Listening to all input boxes
const boxes = document.querySelectorAll("input");
boxes.forEach((input, index) =>
  input.addEventListener("mousedown", function(e) {
    isShift(e, index);
  })
);
let boxesArr = [...boxes];
firstBox = -1;

//Selects all checkboxes
function selectAll(e) {
  this.classList.add("selectAll");
  var aa = document.querySelectorAll("input[type=checkbox]");
  for (var i = 0; i < aa.length; i++) {
    aa[i].checked = true;
  }
}

//Clear all checkboxes
function clearAll(e) {
  this.classList.add("clearAll");
  var aa = document.querySelectorAll("input[type=checkbox]");
  for (var i = 0; i < aa.length; i++) {
    aa[i].checked = false;
  }
}

//Removes gray color after mouseup on select and clear
function remove(e) {
  this.classList.remove("clearAll");
  this.classList.remove("selectAll");
}

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
