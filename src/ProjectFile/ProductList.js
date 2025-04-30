import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      let result = await fetch("https://dashboard-backend-3-tvfv.onrender.com/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        alert("Product deleted successfully");
        getProducts();
      } else {
        alert("Product deletion failed");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const searchProduct = async (event) => {
    const key = event.target.value;
    if (key) {
      setLoading(true);
      let result = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result || []);
      setLoading(false);
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        className="input-bar"
        type="text"
        placeholder="Enter mobile name or brand"
        onChange={searchProduct}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : products.length > 0 ? (
        <>
          <ul className="product-header">
            <li>Sr.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
          </ul>
          {products.map((item, index) => (
            <ul key={item._id} className="product-item">
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li className="actions">
                <button onClick={() => deleteProduct(item._id)} className="delete-btn">
                  Delete
                </button>
                <Link to={`/update/${item._id}`} className="update-btn">
                  Update
                </Link>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <h2>No Products Found</h2>
      )}
    </div>
  );
};

export default ProductList;
