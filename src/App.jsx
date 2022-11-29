import { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./components/gameBoard.jsx";
import Home from "./components/home.jsx";
import LevelLayout from "./components/levelLayout.jsx";

const UNLOCKEDLEVELS = {
  prirodni: 0,
  technicke: 0,
  rodinne: 0,
};

function App() {
  const [cards, setCards] = useState([]);

  const [levels, setLevels] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("levels");
    const initialValue = JSON.parse(saved);
    return initialValue || UNLOCKEDLEVELS;
  });

  const handleCards = (cards) => {
    setCards(cards);
  };

  const handleLevels = (levels) => {
    setLevels(levels);
  };

  useEffect(() => {
    localStorage.setItem("levels", JSON.stringify(levels));
  }, [levels]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home levels={levels} />}></Route>
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
