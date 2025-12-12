import "./App.css";
import { useState, useEffect } from "react";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import UserRegister from "./Components/UserRegister";
import PageNotFound from "./Components/PageNotFound"; // Zack
import NotAuthorized from "./Components/NotAuthorized"; // Zack
import PrivateRoute from "./Components/PrivateRoute"; // Zack
import axios from "axios";
import AddProductPage from "./Components/AddProductPage";
import ProductForm from "./Components/ProductForm";

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
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<UserRegister />} />
          <Route path="/add-product" element={<AddProductPage />} />
          {/* Main Page */}
          {/* Protected route wrapper. Ensures authorization is checked before rendering /main*/}
          <Route element={<PrivateRoute />}>
            <Route
              path="/main"
              element={<GroceriesAppContainer products={products} />}
            />
          </Route>
          {/* Zack */}
          {/* Unauthorized access route */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          {/* Page not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
