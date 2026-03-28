
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>🚀 AI Validator</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/submit">Validate</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;