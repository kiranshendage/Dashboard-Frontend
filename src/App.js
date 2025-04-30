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
import CheackProduct from "./ProjectFile/CheackProduct";
import CheckProductByName from "./ProjectFile/CheackProductByName";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add/product" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>Logout list component</h1>} />
            <Route path="/productByName/:name" element={<CheckProductByName/>} />

            <Route path="/products" element={<CheackProduct/>} />
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
