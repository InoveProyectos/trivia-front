import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ButtonCopy from "../ButtonCopy/ButtonCopy";
import "./RoomData.scss";

function RoomData() {
  return (
    <div className="room-data">
      <div>
        <p>
          Codigo: <span id="room_code">0000</span>
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
