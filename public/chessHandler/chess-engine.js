insertImage();
coloring();

let chessState;

let mySide = "W";
const audio = new Audio("/utility/audio/moveSound.wav");
let user1Timer = new Timer(document.querySelector(".timer1"), timeLimit);
let user2Timer = new Timer(document.querySelector(".timer2"), timeLimit);

tog = 1;
//to handle second click
function clickHandler() {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
      if (box.style.backgroundColor == "yellowgreen") {
        socket.emit("move", {
          boxId: box.id,
          piece: piece,
          prevBoxId: prevBoxId,
        });

        makeMove(box, piece, prevBoxId);
        user2Timer.stop();
        user1Timer.start();
      }
      setCurrentBoxId(box);

      // Toggling the turn
      toggling();
      // winning()
      matchWonOrNot();
    });
  });
  // first click
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
      if (tog % 2 != 0) {
        leagelMoves("W", box);
      } else leagelMoves("B", box);
      illeagelMoves();
      if (box.style.backgroundColor == "pink") {
        prevBoxId = box.id;
        piece = box.innerText;
      }
    });
  });
}

clickHandler();

z = 0;
document.querySelectorAll(".box").forEach((ee) => {
  ee.addEventListener("click", function () {
    z = z + 1;
    if (z % 2 == 0 && ee.style.backgroundColor !== "yellowgreen") {
      coloring();
    }
  });
});

document.getElementById("board").style.margin = "0px";
document.getElementById("board").style.padding = "0px";
document.getElementById("board").style.width = "fit-content";

const onConfirmRefresh = function (event) {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to leave the page?");
};
window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });

function stopLoader() {
  document.getElementById("spinner-wrapper2").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("spinner-wrapper2").style.display = "none";
  }, 1000);
}
