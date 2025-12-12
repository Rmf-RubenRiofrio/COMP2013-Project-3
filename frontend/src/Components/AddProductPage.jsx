import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProductForm from "./ProductForm";
export default function AddProductPage() {
  const nav = useNavigate();
  useEffect(() => {
    checkValid();
  }, []);

  const checkValid = () => {
    const userData = Cookie.get("JWT-TOKEN").split("@");
    const adminAcc = (userData[1].split("#")[0] == "true") ? (true) : (false);

    if(!adminAcc){
      nav("/not-authorized");
    }
  }

  

  const [postResponse, setPostResponse] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
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
    <>
      <table className="formTable">
        <tr>
          <ProductForm
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            formData={formData}
            postResponse={postResponse}
            isEditing={false}
            isAdmin={true}
          />
        </tr>
        <tr>
          <Link to="/main">Back to main</Link>
        </tr>
      </table> 
    </>
  );
}
