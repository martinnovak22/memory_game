import { Link } from "react-router-dom";
import { UNLOCKEDLEVELS } from "../App.jsx";
import "animate.css";

export default function Home({ levels, handleLevels }) {
  // checks if theme is done, return checkmark if true
  const isDone = (theme) => {
    if (Number(levels[theme]) === 3) {
      return <span className={"checkMark"}>✅</span>;
    }
  };

  // handles reset of game, gives chance to think about it
  let firstClick;
  const handleGameReset = (e) => {
    firstClick = firstClick === 0 ? 1 : 0;
    if (firstClick === 0) {
      e.target.innerHTML = "Potvrdit vynulování hry";
      return;
    }
    handleLevels(UNLOCKEDLEVELS);
    e.target.innerHTML = "Vynulovat celou hru";
  };

  return (
    <div className="App">
      <h1>Dvojjazyčné pexeso</h1>
      <div className={"startBox"}>
        <h2> Zvolte si jedno z témat </h2>
        <div>
          <Link to="/technika" className={"noLink"}>
            <p className={"themeLink"}>Technika {isDone("technika")}</p>
          </Link>
        </div>
        <div>
          <Link to="/priroda" className={"noLink"}>
            <p className={"themeLink"}>Příroda {isDone("priroda")}</p>
          </Link>
        </div>
        <div>
          <Link to="/rodina" className={"noLink"}>
            <p className={"themeLink"}>Rodina {isDone("rodina")}</p>
          </Link>
        </div>
        <button
          onClick={(e) => handleGameReset(e)}
          className={"resetButton button"}
        >
          Vynulovat celou hru
        </button>
      </div>
    </div>
  );
}
