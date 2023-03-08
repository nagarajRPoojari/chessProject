let username = "nagaraj";
let textarea = document.getElementById("textbar");
let messageArea = document.querySelector(".message_area");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value) sendMessage(e.target.value);
    e.target.value = "";
  }
});

function sendMessage(mess) {
  let msg = {
    user: username,
    message: mess,
  };
  console.log(msg);
  appendMessage(msg, "outgoing");

  scroll();
  textarea.value = "";
  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
      <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scroll();
});

function scroll() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
