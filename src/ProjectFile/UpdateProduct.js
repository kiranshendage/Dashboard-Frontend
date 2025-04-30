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
      let result = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/product/${params.id}`,{
         headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result =await result.json();
      
      
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }
      getProductDetail();
  },[params])

  

    const updateProduct =async()=>{
      //console.warn(name,price,category,company);
      let result = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/product/${params.id}`,{
        method: "PUT",    
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify({ name, price, category, company }), 
      }) 
      if(result){
        alert("Data updated successfully")
        result =await result.json();
        navigate('/');
      }else{
        alert("Data does not update");
      }
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
