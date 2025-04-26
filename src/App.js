import "./App.css";
import Footer from "./ProjectFile/Footer";
import Nav from "./ProjectFile/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./ProjectFile/Signup";
import PrivateComponent from "./ProjectFile/PrivateComponent";
import Login from "./ProjectFile/Login";
import AddProduct from "./ProjectFile/AddProduct";
import ProductList from "./ProjectFile/ProductList";
import UpdateProduct from "./ProjectFile/UpdateProduct";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add/product" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout list component</h1>} />
            <Route path="/profile" element={<h1>Profile list component</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
