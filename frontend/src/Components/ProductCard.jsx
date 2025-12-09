import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  handleEditProduct,
  _id,
  handleDeleteProduct,
  isAdmin,
}) {
  if(isAdmin){
    return (
      <div className="ProductCard">
        <h3>{productName}</h3>
        <img src={image} alt="" />
        <h4>{brand}</h4>
        <QuantityCounter
          handleAddQuantity={handleAddQuantity}
          productQuantity={productQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          id={id}
          mode="product"
        />
        <h3>{price}</h3>
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
        <button
          id="edit-button"
          onClick={() =>
            handleEditProduct({ price, brand, productName, image, _id })
          }
        >
          Edit
        </button>
        <button className="RemoveButton" onClick={() => handleDeleteProduct(_id)}>
          Delete
        </button>
      </div> 
    );
  }
  else{
    return (
      <div className="ProductCard">
        <h3>{productName}</h3>
        <img src={image} alt="" />
        <h4>{brand}</h4>
        <QuantityCounter
          handleAddQuantity={handleAddQuantity}
          productQuantity={productQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          id={id}
          mode="product"
        />
        <h3>{price}</h3>
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      </div>
    )
  }
  
}
