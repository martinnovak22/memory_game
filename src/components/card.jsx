export function Card({ card, handleChoice, flipped }) {
  // sets card as choice one/two
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className={"card"}>
      <div className={flipped ? "flipped holder" : "holder"}>
        <div className={"front"}>{card.word}</div>
        <div onClick={handleClick} className={"back"}></div>
      </div>
    </div>
  );
}
