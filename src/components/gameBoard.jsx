import { Card } from "./card.jsx";
import data from "../assets/data.json";
import { useEffect, useState } from "react";
import { getThemeData, isCardMatched, sleep } from "../utils/utils.js";

export default function GameBoard({
  cards,
  handleCards,
  levels,
  handleLevels,
}) {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // from page url, returns: "/{theme}/{level}
  const tema = window.location.pathname.split("/");

  // getting cards for choice comparison
  const getCardOne = (data) => {
    return getThemeData(data, tema[1], tema[2]).find((word) => {
      if (word.word.cz === choiceOne.word || word.word.eng === choiceOne.word) {
        return word;
      }
    });
  };

  const getCardTwo = (data) => {
    return getThemeData(data, tema[1], tema[2]).find((word) => {
      if (word.word.cz === choiceTwo.word || word.word.eng === choiceTwo.word) {
        return word;
      }
    });
  };

  // function for resetting turns(choices)
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // unlocks new level after button click
  const unlockLevel = () => {
    handleLevels({ ...levels, [tema[1]]: [tema[2]] });
  };
  // choice handler
  const handleChoice = async (card) => {
    await sleep(100).then(() =>
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    );
  };

  //useEffect for card state setting
  useEffect(() => {
    async function checkChoices() {
      if (choiceOne && choiceTwo) {
        if (getCardOne(data) === getCardTwo(data)) {
          handleCards((prevState) => {
            return prevState.map((card) => {
              if (card.id === getCardOne(data).id) {
                return { ...card, matched: true };
              }
              return card;
            });
          });

          resetTurn();
          return;
        }
        await sleep(1000).then(() => resetTurn());
      }
    }

    checkChoices().catch((err) => console.log(err));
  }, [choiceOne, choiceTwo]);

  // function which uses util "isCardMatched" to check, if all the cards are matched
  const notMatched = cards.some((card) => {
    return isCardMatched(card);
  });

  if (notMatched) {
    return (
        <div className={"gameBoard"}>
          {cards.map((card) =>
            Card({ card, handleChoice, choiceOne, choiceTwo })
          )}
        </div>
    );
  }
  if (!notMatched && cards.length !== 0 && Number(tema[2]) !== 3) {
    return (
      <div>
        <button onClick={() => unlockLevel()} className={"nextLevelButton"}>
          Vyhrál jsi, klikni pro pokračování!
        </button>
      </div>
    );
  }
  return(
    <div>
      <p>Dokončil jsi toto téma, nyní se můžeš vrátit do menu.</p>
    </div>
  )
}
