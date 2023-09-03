import "./StudentAnswers.scss"
function StudentAnswers({
  usersInRoom,
  cantRes,
}: {
  usersInRoom: number;
  cantRes: number;
}) {
  return (
    <div className="cant-res">
      Rerspondieron {cantRes}/{usersInRoom - 1}
    </div>
  );
}

export default StudentAnswers;
