const socket = io("/");
const videoGrid = document.getElementById("video-grid");
/*
const myPeer = new Peer(undefined, {
  host: "/",
  port: "443",
});*/

let id = 0;
console.log(ROOM_ID);

const currentUserDetails = {
  name: currentUserName,
  id: currentUserID,
  skill: currentUserSkill,
};

let MainStream;

/*
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    //addVideoStream(myVideo, stream);
    MainStream = stream;
    myPeer.on("call", (call) => {
      console.log("got a call");
      mySide = "B";
      console.log(mySide);
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
  });*/

socket.on("user-disconnected", (userId) => {
  //if (peers[userId]) peers[userId].close();
});

socket.emit("join-room", ROOM_ID, id, currentUserDetails);

/*
myPeer.on("open", (id) => {
  console.log("fisrt peer connection");
});*/

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  console.log("make a call");
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
