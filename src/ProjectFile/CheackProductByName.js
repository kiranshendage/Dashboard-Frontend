// import React, { useEffect, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";


// const CheckProductByName = () => {
//   const { name } = useParams();
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const response = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/productByName/${name}`, {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//           },
//         });

//         const result = await response.json();
//         setProducts(result);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     getProducts();
//   }, [name]);

//   return (
//     <div className="big-card-container">
//       {Array.isArray(products) && products.length > 0 ? (
//         products.map((item) => (
//           <motion.div
//             className="big-card-overlay"
//             key={item._id}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="big-card">
//               <img src={item.image} alt={item.name} />
//               <h2>{item.name}</h2>
//               <p>Price: {item.price}</p>
//               <p>Company: {item.company}</p>
//               {/* <button className="add-to-cart-btn">Add to Cart</button> */}
//               <button
//         onClick={() => navigate(-1)}
//         className="back-btn"
//       >
//         ← Back
//       </button>
//             </div>
//           </motion.div>
//         ))
//       ) : (
//         <p className="no-product-message">No product found with the given name.</p>
//       )}
//     </div>
//   );
// };

// export default CheckProductByName;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckProductByName = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dashboard-backend-3-tvfv.onrender.com/productByName/${name}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProducts([]); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [name]);

  return (
    <div className="big-card-container">
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : Array.isArray(products) && products.length > 0 ? (
        products.map((item) => (
          <motion.div
            className="big-card-overlay"
            key={item._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="big-card">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>Price: {item.price}</p>
              <p>Company: {item.company}</p>
              <button onClick={() => navigate(-1)} className="back-btn">
                ← Back
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="no-product-message">No product found with the given name.</p>
      )}
    </div>
  );
};

export default CheckProductByName;
