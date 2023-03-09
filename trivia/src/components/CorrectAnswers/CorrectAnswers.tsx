interface intCorrectAnswers {
  text: string;
}

function CorrectAnswers({ text }: intCorrectAnswers) {
  return (
    <div className="cont-data cont-data-green">
      <div>
        <p>{text}:</p>
      </div>
      <div>
        <h2>99/99</h2>
      </div>
    </div>
  );
}

export default CorrectAnswers;
