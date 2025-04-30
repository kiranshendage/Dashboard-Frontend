import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheackProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://dashboard-backend-3-tvfv.onrender.com/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    
    result = await result.json();
    setProducts(result);
    
  };

  return (
    <div className="product-list">
        <h1>Product List</h1>
        <div className="card-container">
            {products.length > 0 ? (
            products.map((item) => (
                <div className="card" key={item._id}>
                <div className="card-image">
                    <Link to={`/productByName/${item.name}`}>
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    />
                    </Link>
                </div>
                <div className="card-details">
                    <h2>{item.name}</h2>
                    <p>Price: {item.price}</p>
                    <p>Category: {item.category}</p>
                </div>
                </div>
            ))
            ) : (
            <p>No Products Found</p>
            )}
        </div>
    </div>

)}

export default CheackProduct;
