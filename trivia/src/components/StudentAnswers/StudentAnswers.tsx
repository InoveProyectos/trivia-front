function StudentAnswers({
  usersInRoom,
  cantRes,
}: {
  usersInRoom: number;
  cantRes: number;
}) {
  return (
    <div>
      Rerspondieron {cantRes}/{usersInRoom - 1}
    </div>
  );
}

export default StudentAnswers;
