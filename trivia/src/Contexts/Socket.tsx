import io from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("disconnect", () => {
  console.log("disconected");
});

export default socket;
