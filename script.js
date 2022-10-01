let text = document.querySelector(".text"),
  para = paragraphs[Math.floor(Math.random() * paragraphs.length)].split(""),
  mistakes = document.querySelector(".mistakes span"),
  gspeed = document.querySelector(".gspeed span"),
  nspeed = document.querySelector(".nspeed span"),
  timer = document.querySelector(".timer span"),
  btn = document.querySelector("button");

// clear the existing items
text.innerHTML = "";
para.forEach((element) => {
  text.innerHTML += `<span>${element}</span>`;
});

// variable to store wrong attempts to write
let mistake = 0,
  grossSpeed = 0,
  netSpeed = 0,
  // time is in minute
  time = 2;

// event listener to know the key press to match the item
function start() {
  let textSpan = document.querySelectorAll(".text span");

  // keypressed for timer, id for set interval and flag to stop the program
  let keypressed = true,
    id;

  let i = 0;
  addEventListener("keydown", (element) => {
    //   checking the timer to stop the typing test
    let flag = true;

    if (timer.innerText == 0 || textSpan.length == i) {
      clearInterval(id);
      flag = false;
    }

    // implementing the timer
    if (keypressed) {
      id = setInterval(() => {
        if (timer.innerText != 0 || textSpan.length == i) {
          timer.innerText -= 1;
        }
      }, 1000);
    }
    keypressed = false;

    if (
      element.key == "Alt" ||
      element.key == "Shift" ||
      element.key == "Control" ||
      element.key == "Tab"
    ) {
      flag = false;
    }

    if (flag) {
      if (element.key == "Backspace") {
        if (i > 0) {
          // decreasing the mistake if the deleted word was wrong
          i--;
          if (textSpan[i].classList.contains("incorrect")) {
            mistake--;
          }

          // removing the classes to update them
          textSpan[i].classList.remove("correct", "incorrect", "active");

          textSpan[i].classList.add("active");
        }
      } else {
        if (textSpan[i].innerText == element.key) {
          textSpan[i].classList.add("correct");
        } else {
          mistake++;
          textSpan[i].classList.add("incorrect");
        }
        i++;
      }
    }
    // Updating the mistakes
    mistakes.innerHTML = mistake;

    // removing all active class and assigning to the new one only
    textSpan.forEach((element) => {
      element.classList.remove("active");
    });
    textSpan[i].classList.add("active");

    // calculating the net and gross speed
    grossSpeed = (i / 5 / time).toFixed(0);
    netSpeed = (grossSpeed - mistake / time).toFixed(0);

    //  updating the speed
    gspeed.innerText = grossSpeed;
    nspeed.innerText = netSpeed;
  });
}

start();
