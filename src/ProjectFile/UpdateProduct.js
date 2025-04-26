import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const getProductDetail = async() =>{
      
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      result =await result.json();
      
  
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }
      getProductDetail();
  },[params])

  

    const updateProduct =async()=>{
      console.warn(name,price,category,company);
      let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: "PUT",    
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, category, company }), 
      }) 
        alert("Data updated successfully")
        result = result.json();
        console.warn(result);
        navigate('/');
      
    }

  return (
    <div className="add-product-card">
      <h1 className="title">Update Product data</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => { setName(e.target.value) }}
          value={name}
        />

        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Price"
          onChange={(e) => { setPrice(e.target.value) }}
          value={price}
        />
        
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Category"
          onChange={(e) => { setCategory(e.target.value) }}
          value={category}
        />
       
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Company"
          onChange={(e) => { setCompany(e.target.value) }}
          value={company}
        />

        <button onClick={updateProduct} className="add-button">Update Product </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
