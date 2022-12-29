import { useEffect, useState } from "react";
import "./index.css";
import "animate.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./components/gameBoard.jsx";
import Home from "./components/home.jsx";
import LevelLayout from "./components/levelLayout.jsx";

export const UNLOCKEDLEVELS = {
  priroda: 0,
  technika: 0,
  rodina: 0,
};

function App() {
  const [cards, setCards] = useState([]);

  const [levels, setLevels] = useState(() => {
    // getting stored value
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
