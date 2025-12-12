import { useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
export default function AddProductPage() {
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
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
    </div>
  );
}
