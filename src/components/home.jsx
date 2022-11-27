import { Link, Outlet } from "react-router-dom";
import "animate.css";

export default function Home() {
  return (
    <div className="App">
      <h1>Pexeso</h1>
      <div className={"startBox"}>
        <h2> Zvolte si jedno z témat </h2>
        <div>
          <Link to="/technicke" className={"noLink"}>
            <p className={"themeLink"}>Technické</p>
          </Link>
        </div>
        <div>
          <Link to="/prirodni" className={"noLink"}>
            <p className={"themeLink"}>Přírodní</p>
          </Link>
        </div>
        <div>
          <Link to="/rodinne" className={"noLink"}>
            <p className={"themeLink"}>Rodinné</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
