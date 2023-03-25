import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { intRoomData } from "../../interfaces";
import ButtonCopy from "../ButtonCopy/ButtonCopy";
import "./RoomData.scss";

function RoomData({ roomCode }: intRoomData) {
  console.log({ roomCode });
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
          Personas en la sala: <span>99</span>
        </p>

        <EmojiPeopleIcon sx={{ color: "#fff" }} />
      </div>
    </div>
  );
}
export default RoomData;
