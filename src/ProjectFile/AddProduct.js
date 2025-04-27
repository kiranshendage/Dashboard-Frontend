import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error,setError] =useState(false);
  const navigate = useNavigate();
    const addProduct =async()=>{
        if(!name||!price||!category||!company){
            setError(true)
           alert("Plz fill all form");
           return false;
        }
        //console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("https://dashboard-backend-3-tvfv.onrender.com/add/product",{
            method:'post',
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                "content-type":"application/json",
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
    })

    result = await result.json();
    //console.warn(result);
    if(result){
      alert("Successfully Data Added");
      navigate('/');
    }else{
      alert("Plz try again");
    }
}

  return (
    <div className="add-product-card">
      <h1 className="title">Add Product</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => { setName(e.target.value) }}
          value={name}
        />
        {error && !name && <span className="invalid-input">Enter Valid name</span>}
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Price"
          onChange={(e) => { setPrice(e.target.value) }}
          value={price}
        />
        {error && !name && <span className="invalid-input">Enter Valid price</span>}
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Category"
          onChange={(e) => { setCategory(e.target.value) }}
          value={category}
        />
        {error && !name && <span className="invalid-input">Enter Valid catagory</span>}
        <input
          className="input-field"
          type="text"
          placeholder="Enter Product Company"
          onChange={(e) => { setCompany(e.target.value) }}
          value={company}
        />
        {error && !name && <span className="invalid-input">Enter Valid company name</span>}
        <button onClick={addProduct} className="add-button">Add Product</button>
      </div>
    </div>
  );
}

export default AddProduct;
