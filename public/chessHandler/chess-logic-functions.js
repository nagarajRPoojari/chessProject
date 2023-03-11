function leagelMoves(toggle, item, isACheck) {
  //moves are allowed only when own side piece is picked ,   i.e white can move only white
  if (toggle != mySide) return;
  // PAWN
  if (item.innerText == `${toggle}pawn`) {
    item.style.backgroundColor = "pink";
    if (tog % 2 !== 0 && aup < 800) {
      if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
        document.getElementById(`b${a + 100}`).style.backgroundColor =
          "yellowgreen";
      }
      if (
        aside < 8 &&
        document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
          "yellowgreen";
      }

      if (
        aside > 1 &&
        document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
          "yellowgreen";
      }

      if (aup == 200) {
        if (
          document.getElementById(`b${a + 200}`).innerText.length == 0 &&
          document.getElementById(`b${a + 100}`).innerText.length == 0
        ) {
          document.getElementById(`b${a + 200}`).style.backgroundColor =
            "yellowgreen";
        }
      }
    }

    if (tog % 2 == 0 && aup > 100) {
      if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
        document.getElementById(`b${a - 100}`).style.backgroundColor =
          "yellowgreen";
      }
      if (
        aside < 8 &&
        document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
          "yellowgreen";
      }
      if (
        aside > 1 &&
        document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
          "yellowgreen";
      }

      if (aup == 700) {
        if (
          document.getElementById(`b${a - 200}`).innerText.length == 0 &&
          document.getElementById(`b${a - 100}`).innerText.length == 0
        ) {
          document.getElementById(`b${a - 200}`).style.backgroundColor =
            "yellowgreen";
        }
      }
    }
  }
  // KING

  if (item.innerText == `${toggle}king`) {
    if (aside < 8) {
      document.getElementById(`b${a + 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside > 1) {
      document.getElementById(`b${a - 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup < 800) {
      document.getElementById(`b${a + 100}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup > 100) {
      document.getElementById(`b${a - 100}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup > 100 && aside < 8) {
      document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup > 100 && aside > 1) {
      document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup < 800 && aside < 8) {
      document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aup < 800 && aside > 1) {
      document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
        "yellowgreen";
    }

    item.style.backgroundColor = "pink";
  }

  // ROOK

  if (item.innerText == `${toggle}rook`) {
    for (let i = 1; i < 9; i++) {
      if (
        a + i * 100 < 900 &&
        document.getElementById(`b${a + i * 100}`).innerText == 0
      ) {
        document.getElementById(`b${a + i * 100}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a + i * 100 < 900 &&
        document.getElementById(`b${a + i * 100}`).innerText !== 0
      ) {
        document.getElementById(`b${a + i * 100}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        a - i * 100 > 100 &&
        document.getElementById(`b${a - i * 100}`).innerText == 0
      ) {
        document.getElementById(`b${a - i * 100}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a - i * 100 > 100 &&
        document.getElementById(`b${a - i * 100}`).innerText !== 0
      ) {
        document.getElementById(`b${a - i * 100}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        a + i < aup + 9 &&
        document.getElementById(`b${a + i}`).innerText == 0
      ) {
        document.getElementById(`b${a + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a + i < aup + 9 &&
        document.getElementById(`b${a + i}`).innerText !== 0
      ) {
        document.getElementById(`b${a + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (a - i > aup && document.getElementById(`b${a - i}`).innerText == 0) {
        document.getElementById(`b${a - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a - i > aup &&
        document.getElementById(`b${a - i}`).innerText !== 0
      ) {
        document.getElementById(`b${a - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    item.style.backgroundColor = "pink";
  }

  // BISHOP

  if (item.innerText == `${toggle}bishop`) {
    for (let i = 1; i < 9; i++) {
      if (
        i < (900 - aup) / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < (900 - aup) / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < aup / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < aup / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < (900 - aup) / 100 &&
        i < aside &&
        document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < (900 - aup) / 100 &&
        i < aside &&
        document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < aup / 100 &&
        i < aside &&
        document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < aup / 100 &&
        i < aside &&
        document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    item.style.backgroundColor = "pink";
  }

  // QUEEN

  if (item.innerText == `${toggle}queen`) {
    for (let i = 1; i < 9; i++) {
      if (
        a + i * 100 < 900 &&
        document.getElementById(`b${a + i * 100}`).innerText == 0
      ) {
        document.getElementById(`b${a + i * 100}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a + i * 100 < 900 &&
        document.getElementById(`b${a + i * 100}`).innerText !== 0
      ) {
        document.getElementById(`b${a + i * 100}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        a - i * 100 > 100 &&
        document.getElementById(`b${a - i * 100}`).innerText == 0
      ) {
        document.getElementById(`b${a - i * 100}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a - i * 100 > 100 &&
        document.getElementById(`b${a - i * 100}`).innerText !== 0
      ) {
        document.getElementById(`b${a - i * 100}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        a + i < aup + 9 &&
        document.getElementById(`b${a + i}`).innerText == 0
      ) {
        document.getElementById(`b${a + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a + i < aup + 9 &&
        document.getElementById(`b${a + i}`).innerText !== 0
      ) {
        document.getElementById(`b${a + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (a - i > aup && document.getElementById(`b${a - i}`).innerText == 0) {
        document.getElementById(`b${a - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        a - i > aup &&
        document.getElementById(`b${a - i}`).innerText !== 0
      ) {
        document.getElementById(`b${a - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < (900 - aup) / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < (900 - aup) / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < aup / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < aup / 100 &&
        i < 9 - aside &&
        document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < (900 - aup) / 100 &&
        i < aside &&
        document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < (900 - aup) / 100 &&
        i < aside &&
        document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    for (let i = 1; i < 9; i++) {
      if (
        i < aup / 100 &&
        i < aside &&
        document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
      ) {
        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
      } else if (
        i < aup / 100 &&
        i < aside &&
        document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0
      ) {
        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor =
          "yellowgreen";
        break;
      }
    }

    item.style.backgroundColor = "pink";
  }

  // KNIGHT

  if (item.innerText == `${toggle}knight`) {
    if (aside < 7 && aup < 800) {
      document.getElementById(`b${a + 100 + 2}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside < 7 && aup > 200) {
      document.getElementById(`b${a - 100 + 2}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside < 8 && aup < 700) {
      document.getElementById(`b${a + 200 + 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside > 1 && aup < 700) {
      document.getElementById(`b${a + 200 - 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside > 2 && aup < 800) {
      document.getElementById(`b${a - 2 + 100}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside > 2 && aup > 100) {
      document.getElementById(`b${a - 2 - 100}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside < 8 && aup > 200) {
      document.getElementById(`b${a - 200 + 1}`).style.backgroundColor =
        "yellowgreen";
    }
    if (aside > 1 && aup > 200) {
      document.getElementById(`b${a - 200 - 1}`).style.backgroundColor =
        "yellowgreen";
    }
    item.style.backgroundColor = "pink";
  }
}

function illeagelMoves() {
  document.querySelectorAll(".box").forEach((i1) => {
    if (i1.style.backgroundColor == "pink") {
      document.querySelectorAll(".box").forEach((i2) => {
        if (
          i2.style.backgroundColor == "yellowgreen" &&
          i2.innerText.length !== 0
        ) {
          yellowgreenText = i2.innerText;
          piece = i1.innerText;
          pinkColor = Array.from(piece).shift().toString();
          yellowgreenColor = Array.from(yellowgreenText).shift().toString();

          getId = i2.id;
          arr = Array.from(getId);
          arr.shift();
          aside = eval(arr.pop());
          aup = eval(arr.shift());
          a = aside + aup;

          if (pinkColor == yellowgreenColor) {
            i2.style.backgroundColor = "rgb(192, 0, 0,0.75)";
          }
        }
      });
    }
  });
}

function makeMove(box, piece, prevBoxId) {
  document.getElementById(prevBoxId).innerText = "";
  box.innerText = piece;
  audio.play();
  coloring();
  insertPiece(box);
  tog = tog + 1;
}

function toggling() {
  if (tog % 2 !== 0) {
    document.getElementById("tog").innerText = "White's Turn";
  }
  if (tog % 2 == 0) {
    document.getElementById("tog").innerText = "Black's Turn";
  }
}

function matchWonOrNot() {
  numOfKings = 0;
  document.querySelectorAll(".box").forEach((win) => {
    if (win.innerText == "Wking" || win.innerText == "Bking") {
      numOfKings += 1;
    }
  });
  if (numOfKings == 1) {
    let winner = "W";
    if (tog % 2 != 0) {
      winner = "B";
      //location.reload();
    }
    if (mySide == winner) conclude(true);
    else conclude(false);
  }
}

function flipBoard() {
  document.getElementById("board").style.transform = "rotate(180deg)";
  document.querySelectorAll(".allimg").forEach((img) => {
    img.style.transform = "rotate(180deg) scale(1.5)";
  });
}

function insertPiece(box) {
  if (box.innerText == "Wpawn" || box.innerText == "Bpawn") {
    box.innerHTML = `${box.innerText} <img class='allimg allpawn' src="/utility/images/${box.innerText}.png" alt="">`;
    box.style.cursor = "pointer";
  } else {
    box.innerHTML = `${box.innerText} <img class='allimg' src="/utility/images/${box.innerText}.png" alt="">`;
    box.style.cursor = "pointer";
  }
  if (mySide == "B") box.style.transform = "rotate(180deg)";
}

function insertImage() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerText.length !== 0) {
      if (image.innerText == "Wpawn" || image.innerText == "Bpawn") {
        image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="/utility/images/${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      } else {
        image.innerHTML = `${image.innerText} <img class='allimg' src="/utility/images/${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      }
    }
  });
}

function coloring() {
  const color = document.querySelectorAll(".box");
  color.forEach((color) => {
    getId = color.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;

    if (a % 2 == 0) {
      color.style.backgroundColor = "rgb(111, 154, 63)";
    }
    if (a % 2 !== 0) {
      color.style.backgroundColor = "rgb(229, 240, 216)";
    }
  });
}

class Timer {
  constructor(root, inputMinutes) {
    root.innerHTML = Timer.getHTML(inputMinutes);
    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
    };

    this.interval = null;
    this.remainingSeconds = inputMinutes * 60;
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  start() {
    if (this.remainingSeconds === 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
        if (tog % 2 == 0) {
          alert("White Wins !!");
          location.reload();
        } else if (tog % 2 !== 0) {
          alert("Black Wins !!");
          location.reload();
        }
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
  static getHTML(inputMinutes) {
    return `
      <i class="bi bi-alarm"></i>  
			<span class="timer__part timer__part--minutes">${inputMinutes}</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
		`;
  }
}

function setCurrentBoxId(box) {
  getId = box.id;
  arr = Array.from(getId);
  arr.shift();
  aside = eval(arr.pop());
  arr.push("0");
  aup = eval(arr.join(""));
  a = aside + aup;
}

function conclude(won) {
  user1Timer.stop();
  user2Timer.stop();
  if (won) {
    document.getElementById("user1").classList.add("won");
    document.getElementById("user2").classList.add("lose");
    document.getElementById("wonOrnot").innerHTML = `<p>you won</p>`;
  } else {
    document.getElementById("user2").classList.add("won");
    document.getElementById("user1").classList.add("lose");
    document.getElementById("wonOrnot").innerHTML = `<p>you lose</p>`;
  }
  var myModal = new bootstrap.Modal(document.getElementById("timerModal"), {});
  myModal.show();
}
