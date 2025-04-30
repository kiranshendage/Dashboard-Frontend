import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/signup"); // Redirect to Signup page
  };

  return (
    <div className="main">
  {auth ? (
    <ul className="nav-ul">
      <li><img 
                src="mo.jpeg" 
                alt="Product Icon" 
                className="nav-icon"
              />
      </li>
      <li><Link to="/">Product</Link></li>
      <li><Link to="/add/product">Add Product</Link></li>
      <li><Link to="/products">Check Products</Link></li>
      {/* //<li><Link to="/productByName/:name">Check ProductByName</Link></li> */}
      <li>
        <button className="logout-btn" onClick={logout}>
          Logout ({JSON.parse(auth).name})
        </button>
      </li>
    </ul>
  ) : (
    <ul className="nav-ul nav-right">
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )}
</div>

  );
};

export default Nav;
