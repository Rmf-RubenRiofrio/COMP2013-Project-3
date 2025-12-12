import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
export default function GroceriesAppContainer(userDetails) {
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookie from "js-cookie"

export default function GroceriesAppContainer() {
  //https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
  const navigate = useNavigate();
  const { id } = useParams();
  
  /*
    -- This is unused, and the auth stuff will happen inside of each element that uses them,
      so this will be commented out, but is here for its explination comments --

    getting the cookie that was made earlier, I am using an @ to seperate the cookie string
    from the user data, as the cookie will not contain any special characters
    I know that to the right of the @, is the user's data 

      - Sawyer
 
  const userData = Cookie.get("JWT-TOKEN").split("@");
  //I know that to the right of the # is the username, as the logic sets it up that way
  const username = userData[1].split("#")[1];
  //and to the left is the admin status (if they're authorized or not)
  //I have the turnary as it has to be a boolean, and it returns as a string
  const adminAcc = (userData[1].split("#")[0] == "true") ? (true) : (false);
  */

  //console.log(adminAcc);
  //console.log(username);


  /////////// States ///////////
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  //////////useEffect////////

  useEffect(() => {
    handleProductsFromDB();
  }, [postResponse]);

  // Navigate to add product page
  const navigate = useNavigate();
  const navigateToAddProd = () => {
    navigate("/add-product", { state: { isAdmin: adminAcc } });
  };
  useEffect(() => {
    if(id){
      const productToEdit = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/products/${id}`);
          const product = response.data;
          setFormData({
            productName: product.productName,
            brand: product.brand,
            image: product.image,
            price: product.price,
            _id: product._id,
          });
          setIsEditing(true);
          setPostResponse("");
        }catch (error) {
          console.log("Error fetching product: ",error.message);
          setPostResponse("Failed to load product. Please try again.");
        } 
      };
      productToEdit();
    }
  }, [id]);

  useEffect(() => {
    const token = Cookie.get('JWT-TOKEN');
    if (!token) {
      console.log("No token found, redirecting to not-authorized");
      navigate("/NotAuthorized");
    }
  }, [navigate]);

  ////////Handlers//////////
  const initialProductQuantity = (prods) =>
    prods.map((prod) => {
      return { id: prod.id, quantity: 0 };
    });

  const handleProductsFromDB = async () => {
    try {
      //console.log("Fetching products from DB...");
      await axios.get("http://localhost:3000/products").then((result) => {
        //console.log("Products received:", result.data);
        setProductList(result.data);
        setProductQuantity(initialProductQuantity(result.data));
      });
    } catch (error) {
      console.log("Error fetching products:", error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
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
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
    setIsEditing(true);
    setPostResponse("");
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
      setPostResponse("Failed to update product. Please try again.");
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  const handleLogout = () => {
    Cookie.remove('JWT-TOKEN');
    navigate("/");
  };
  /////////Renderer
  return (
    <div>
      <NavBar quantity={cartList.length} username={username} />
      <button
        onClick={navigateToAddProd}
        style={{ backgroundColor: "green", color: "white" }}
      >
        Add Product
      </button>
      <NavBar quantity={cartList.length} onLogout={handleLogout}/>
      <div className="GroceriesApp-Container">
        <ProductForm
          handleOnSubmit={handleOnSubmit}
          postResponse={postResponse}
          handleOnChange={handleOnChange}
          formData={formData}
          isEditing={isEditing}
        />
        <ProductsContainer
          products={productList}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
