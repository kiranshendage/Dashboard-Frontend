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
     {auth ? <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add/product">Add Product</Link></li>
                <li><Link to="/update/:id">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button className="logout-btn" onClick={logout}>Logout ({JSON.parse(auth).name})</button></li>:
            </ul>
            :
            <ul className="nav-ul nav-right">
                  <li> <Link to="/signup">Sign Up</Link></li>
                  <li> <Link to="/login">Login</Link></li>
            </ul>

     }
    </div>
  );
};

export default Nav;
