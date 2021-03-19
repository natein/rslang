import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">Home Page</Link>
      <Link to="/ebook">Ebook Page</Link>
    </div>
  );
}

export default Header;
