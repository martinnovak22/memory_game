import { Card } from "./card.jsx";
import data from "../assets/data.json";
import { useEffect, useState } from "react";
import { getThemeData, isCardMatched, sleep } from "../utils/utils.js";

const themes = {
  prirodni: "Přírodní",
  technicke: "Technické",
  rodinne: "Rodinné",
};

export default function GameBoard({
  cards,
  handleCards,
  levels,
  handleLevels,
}) {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // from page url, returns: "/{theme}/{level}
  const theme = window.location.pathname.split("/");

  // getting cards for choice comparison
  const getCardOne = (data) => {
    return getThemeData(data, theme[1], theme[2]).find((word) => {
      if (word.word.cz === choiceOne.word || word.word.eng === choiceOne.word) {
        return word;
      }
    });
  };

  const getCardTwo = (data) => {
    return getThemeData(data, theme[1], theme[2]).find((word) => {
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
  const unlockLevel = (e) => {
    if (e !== undefined) {
      e.currentTarget.style.visibility = "hidden";
    }
    handleLevels({ ...levels, [theme[1]]: [theme[2]] });
  };

  // choice handler
  const handleChoice = async (card) => {
    await sleep(100).then(() =>
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    );
  };

  // function which uses util "isCardMatched" to check, if all the cards are matched or not
  const notMatched = cards.some((card) => {
    return isCardMatched(card);
  });

  // useEffect for card state setting
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

  //  useEffect for last level unlocking (shows marker in main menu)
  useEffect(() => {
    if (Number(theme[2]) === 3 && notMatched === false) {
      unlockLevel();
    }
  }, [notMatched]);

  if (notMatched) {
    return (
      <div className={"gameBoard"}>
        {cards.map((card) =>
          Card({ card, handleChoice, choiceOne, choiceTwo })
        )}
      </div>
    );
  }

  if (!notMatched && cards.length !== 0 && Number(theme[2]) !== 3) {
    return (
      <div>
        <button
          onClick={(e) => unlockLevel(e)}
          className={"nextLevelButton button"}
        >
          Vyhrál jsi, klikni pro pokračování!
        </button>
      </div>
    );
  }
  startConfetti();
  sleep(5000).then(() => stopConfetti());

  return (
    <div className={"endDiv"}>
      <h1>Gratulujeme!</h1>
      <h2>Dokončil jsi téma: {themes[theme[1]]}</h2>
      <p className={"endParagraph"}>
        Nyní můžeš pokračovat do menu, zopakovat si kteroukoliv z úrovní, či si
        celé téma vynulovat.
      </p>
    </div>
  );
}
