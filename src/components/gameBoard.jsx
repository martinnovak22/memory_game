import { Card } from "./card.jsx";

import { useEffect, useState } from "react";
import { getThemeData, isCardMatched, sleep } from "../utils/utils.js";

import { startConfetti, stopConfetti } from "../utils/confetti.js";

import data from "../assets/data.json";

// theme strings for win part
const themes = {
  priroda: "Příroda",
  technika: "Technika",
  rodina: "Rodina",
};

export default function GameBoard({
  cards,
  handleCards,
  levels,
  handleLevels,
}) {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // variable, which allows user to check words before going to next level
  const [next, setNext] = useState(false);

  // page url, returns: "/{theme}/{level}" => theme[1] theme[2]
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
  const handleChoice = (card) => {
    if (choiceOne) {
      if (card.word === choiceOne?.word) {
        return;
      }
      setChoiceTwo(card);
      return;
    }
    setChoiceOne(card);
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
                console.log(card.word + card.matched);
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

  // resets variable "next", so the level revision is possible
  useEffect(() => {
    if (next) {
      setNext(false);
    }
  }, [cards]);

  if (notMatched || !next) {
    return (
      <div>
        <div className={"buttonHolder"}>
          {notMatched || cards.length === 0 ? null : (
            <button
              onClick={() => setNext(true)}
              className={"nextLevelButton button"}
            >
              Slovíčka jsem si prohlédl/a.
            </button>
          )}
        </div>

        <div className={"gameBoard"}>
          {cards.map((card) => (
            <Card
              key={card.word}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
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
          Úroveň splněna, klikni pro odemčení další!
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
