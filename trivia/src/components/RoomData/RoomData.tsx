import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useContext, useEffect } from "react";
import { useTriviaContext } from "../../Contexts/AppContext";
import { SocketContext } from "../../Contexts/SocketContext";
import { intRoomData } from "../../interfaces";
import ButtonCopy from "../ButtonCopy/ButtonCopy";
import "./RoomData.scss";

function RoomData({ roomCode }: intRoomData) {
  const { countUsersConected } = useTriviaContext();
  console.log({ roomCode });

  // socket?.on("listenCountUsersConected", async (data) => {
  //   console.log(data);
  //   setCountUsersConected(data);
  // });

  return (
    <div className="room-data">
      <div>
        <p>
          Codigo: <span id="room_code">{roomCode}</span>
        </p>
        <ButtonCopy id="room_code" />
      </div>
      <div>
        <p>
          Personas en la sala: <span>{countUsersConected}</span>
        </p>

        <EmojiPeopleIcon sx={{ color: "#fff" }} />
      </div>
    </div>
  );
}
export default RoomData;
