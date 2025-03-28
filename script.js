// flag to check if the result is already displayed
let resultOut = false;
// pointer to screen div
let screen = document.querySelector(".result");
// pointer to history div
let history = document.querySelector(".history");

// function to display the value on the screen
function display(value) {
  // if the value on screen include . and another . is pressed then return
  if (screen.innerText.includes(".") && value === ".") {
    return;
  }
  // if the result is already displayed then clear the screen and set resultOut to false
  if (resultOut) {
    screen.innerText = "0";
    resultOut = false;
  }
  // if the screen is empty then set the value to screen else append the value to the screen div
  if (screen.innerText === "0") {
    screen.innerText = value;
  } else {
    screen.innerText += value;
  }
}

// function to clear the screen on clear button pressed
function clearScreen() {
  screen.innerText = "0";
  history.innerText = "";
}

// function to delete the last character on delete button pressed
// if the screen is empty then set the value to 0
function del() {
  let str = screen.innerText;
  if (str.length > 1) {
    screen.innerText = str.slice(0, str.length - 1);
  } else {
    screen.innerText = "0";
  }
}

// function to calculate the result on equal button pressed
function calculate() {
  // saving the screen value to str variable
  let str = screen.innerText;
  //   using error handling to check if the expression is valid or not
  try {
    // if screen inner text contains nothing then alert user to enter a value
    if (screen.innerText === "") {
      alert("Please enter a value");
      return;
    }

    // if screen inner text contains only 0 then alert user to enter a value other than 0
    if (screen.innerText === "0") {
      alert("Please enter a value other than 0");
      return;
    }

    // evaluate the expression using math.js library
    let result = math.evaluate(str);

    // if the result is infinity then alert user that cannot divide by zero
    if (result === Infinity) {
      alert("Cannot divide by zero");
      return;
    }

    // if the result is undefined then alert user that invalid expression
    if (result === undefined) {
      alert("Invalid Expression");
      return;
    }

    // set the result value to screen inner text
    screen.innerText = result;

    // if history inner text is empty then set the history inner text to str + " = " + result
    // else append the "\n" + str + " = " + result to history inner text
    if (history.innerText === "") {
      history.innerText = str + " = " + result;
    } else {
      history.innerText += "\n" + str + " = " + result;
    }
  } catch (e) {
    //   catch the error if the expression is invalid
    alert("Invalid Expression");
    return;
  }

  //   make the flag resultOut true to check if the result is already displayed
  resultOut = true;

  //   get the history from the local storage and append the new history to it else
  //   set the history to the new history
  localStorage.getItem("history")
    ? localStorage.setItem(
        "history",
        localStorage.getItem("history") + "\n" + history.innerText
      )
    : localStorage.setItem("history", history.innerText);
}

// onclick event for the history div to show the greater history div on click
document.querySelector(".greater-history").onclick = function () {
  // set the greater history div to display none
  document.querySelector(".greater-history").style.display = "none";

  //   store the history from local storage to historyContent variable
  let historyContent = localStorage.getItem("history");

  //   set the greater history container to display flex if historyContent is not null
  if (historyContent) {
    document.querySelector(".greater-history-container").style.display = "flex";
  }

  //   if the historyContent is not null then split the historyContent by "\n" and append it to the history list
  if (historyContent) {
    // pointer to the greater history container ul
    let historyList = document.querySelector(".greater-history-container ul");
    // change the pointer inner html to nothing
    historyList.innerHTML = ""; // Clear previous history
    // split the historyContent by "\n" and use forEach loop
    historyContent.split("\n").forEach((item) => {
      // create a li element and set the inner text to item
      let li = document.createElement("li");
      li.innerText = item;

      //   set the li class to p-2 text-lg font-bold text-gray-700
      li.classList.add("p-2", "text-lg", "font-bold", "text-gray-700");
      //   append the li to the history list
      historyList.appendChild(li);
    });

    // set the greater history container to display none
    document
      .querySelector(".greater-history-container")
      .classList.toggle("hidden");
  }
  //   if history is null then alert user that no history available
  else {
    alert("No history available.");
  }
};
