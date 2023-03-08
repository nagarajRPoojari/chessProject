socket.on("name-exchange", (opponentDetails, timeLimit) => {
  stopLoader();
  setTimeLimit(timeLimit);
  user2Timer.start();
  document.getElementById("user1-name").innerText = opponentDetails.name;
  document.getElementById("user1-skill").innerText = opponentDetails.skill;
});

socket.on("user-connected", (userId, opponentDetails) => {
  mySide = "B";
  flipBoard();
  stopLoader();
  document.getElementById("user1-name").innerText = opponentDetails.name;
  document.getElementById("user1-skill").innerText = opponentDetails.skill;
  socket.emit("name-exchange", currentUserDetails, timeLimit);
  user1Timer.start();
  if (userId != 0) connectToNewUser(userId, MainStream);
});

//to handle move made by opponent
socket.on("move-made", (data) => {
  user1Timer.stop();
  user2Timer.start();

  const { boxId, piece, prevBoxId } = data;
  let _box;
  document.querySelectorAll(".box").forEach((_i) => {
    if (_i.id == boxId) _box = _i;
  });
  console.log(data);
  makeMove(_box, piece, prevBoxId);
  toggling(_box);
  matchWonOrNot();
});

function setTimeLimit(timeLimit) {
  user1Timer = new Timer(document.querySelector(".timer1"), timeLimit);
  user2Timer = new Timer(document.querySelector(".timer2"), timeLimit);
}
