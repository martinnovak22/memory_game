import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home.jsx";
import GameBoard from "./components/gameBoard.jsx";
import LevelLayout from "./components/levelLayout.jsx";

// default variable for unlocked levels
export const UNLOCKEDLEVELS = {
  priroda: 0,
  technika: 0,
  rodina: 0,
};

function App() {
  // array of played cards
  const [cards, setCards] = useState([]);

  // levels, saved in local storage
  const [levels, setLevels] = useState(() => {
    const saved = localStorage.getItem("levels");
    const initialValue = JSON.parse(saved);
    return initialValue || UNLOCKEDLEVELS;
  });

  // card setter
  const handleCards = (cards) => {
    setCards(cards);
  };

  // level setter
  const handleLevels = (levels) => {
    setLevels(levels);
  };

  // useEffect for storing data in local storage
  useEffect(() => {
    localStorage.setItem("levels", JSON.stringify(levels));
  }, [levels]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<Home levels={levels} handleLevels={handleLevels} />}
        ></Route>
        <Route
          path="/:temaId"
          element={
            <LevelLayout
              handleCards={handleCards}
              handleLevels={handleLevels}
              levels={levels}
            />
          }
        >
          <Route
            path={":level"}
            element={
              <GameBoard
                cards={cards}
                handleCards={handleCards}
                levels={levels}
                handleLevels={handleLevels}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
