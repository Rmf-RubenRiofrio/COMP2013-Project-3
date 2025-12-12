import "./App.css";
import { useState, useEffect } from "react";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import UserRegister from "./Components/UserRegister";
import axios from "axios";
import AddProductPage from "./Components/AddProductPage";

function App() {
  //will hold products from the database
  const [products, setProducts] = useState([]);

  //getting products from the database
  const getProducts = async () => {
    try {
      //use the get route for the products to fill in array
      const prodData = await axios.get("http://localhost:3000/products");
      //set the products array to be the data
      setProducts(await prodData.data);
    } catch (err) {
      console.log(err);
    }
  };

  //fills out the array on runtime
  useState(() => {
    getProducts();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<UserRegister />} />
          <Route
            path="/main"
            element={<GroceriesAppContainer products={products} />}
          />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
