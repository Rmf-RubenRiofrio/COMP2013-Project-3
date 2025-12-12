import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProductForm from "./ProductForm";
export default function AddProductPage() {
  const [postResponse, setPostResponse] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const jwt = Cookies.get("JWT-TOKEN");
    if (!jwt) {
      return "";
    }
    try {
      const decodedToken = jwtDecode(jwt);
      return decodedToken.username;
    } catch (error) {
      return "";
    }
  });

  const location = useLocation();
  const isAdmin = location?.state?.isAdmin || false;
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("JWT-TOKEN");
    if (!jwt) {
      setCurrentUser("");
    }
    try {
      const decodedToken = jwtDecode(jwt);
      setCurrentUser(decodedToken.username);
    } catch (error) {
      setCurrentUser("");
    }
    if (currentUser === "" || !isAdmin) {
      navigate("/not-authorized");
      return;
    }
  });

  // handlers
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/add-product", formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <ProductForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        postResponse={postResponse}
        isEditing={false}
        isAdmin={true}
      />
      <Link to="/main">Back to main</Link>
    </div>
  );
}
