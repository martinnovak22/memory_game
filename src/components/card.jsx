export function Card({ card, handleChoice, choiceOne, choiceTwo }) {
  const handleClick = () => {
    handleChoice(card);
  };

  const { word, matched } = card;

  if (card === choiceOne || card === choiceTwo) {
    return (
      <div key={word} className={"cardBox"}>
        <div className={"front"}>
          <p>{word}</p>
        </div>
      </div>
    );
  }
  if (!matched) {
    return (
      <div key={word} className={"cardBox"} onClick={handleClick}>
        <div className={"back"}></div>
      </div>
    );
  }
  return (
    <div key={word} className={"cardBox"}>
      <div className={"front"}>
        <p>{word}</p>
      </div>
    </div>
  );
}
