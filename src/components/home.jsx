import { Link, Outlet } from "react-router-dom";
import "animate.css";

export default function Home({ levels }) {
  const isDone = (theme) => {
    if (levels[theme][0] === "3") {
      return <span className={"checkMark"}>✅</span>;
    }
  };

  return (
    <div className="App">
      <h1>Dvojjazyčné pexeso</h1>
      <div className={"startBox"}>
        <h2> Zvolte si jedno z témat </h2>
        <div>
          <Link to="/technicke" className={"noLink"}>
            <p className={"themeLink"}>Technické {isDone("technicke")}</p>
          </Link>
        </div>
        <div>
          <Link to="/prirodni" className={"noLink"}>
            <p className={"themeLink"}>Přírodní {isDone("prirodni")}</p>
          </Link>
        </div>
        <div>
          <Link to="/rodinne" className={"noLink"}>
            <p className={"themeLink"}>Rodinné {isDone("rodinne")}</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
