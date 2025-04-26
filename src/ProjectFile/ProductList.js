import React, { useEffect, useState } from "react";
import  { Link } from "react-router-dom";


const ProductList = () =>{

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async ()=>{
        let result = await fetch("http://localhost:5000/products",{
        headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
        result = await result.json();
        setProducts(result);
    }
    


    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:"Delete",
        headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result = await result.json()
    if(result){
        alert("Product delete successfully")
        getProducts();
    }else{
        alert("Product does not delete")
    }
    }

    const searchProduct =async (event) =>{
      let key = event.target.value;
      if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: { 
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`  // Retrieve and send token in the Authorization header
        }
      });
      result =await result.json();
      if(result){
        setProducts(result);
      }
    }else{
        getProducts();
      }
    }

    return(
        <div className="product-list">
            <h1>Product List</h1>
            <input className="input-bar" type="text" placeholder="Enter mobile name or brand"
                onChange={searchProduct}
            />
            <ul>
                <li>Sr.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Catagory</li>
                <li>Company</li>
                <li>Operation</li>
                

            </ul>
            {   products.length>0 ?
                products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                        <button style={{ backgroundColor: "red",marginRight:"5px",borderRadius:"5px",border:"none",fontWeight:"600" }} onClick={() => deleteProduct(item._id)}>Delete</button>
                        <button style={{ backgroundColor: "yellow",marginRight:"5px",borderRadius:"5px",fontWeight:"600", border: "none" , color: "black"}}>
                            <Link style={{ backgroundColor: "yellow",fontWeight:"600", border: "none",textDecoration:"none" , color: "black"}} to={`/update/${item._id}`}>Update</Link>
                        </button>


                        </li>

                    </ul>
                )
                : <h1>Product Result found</h1>

            }
        </div>
    )
}
export default ProductList;