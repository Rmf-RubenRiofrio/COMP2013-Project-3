export default function ProductForm({
  handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  isEditing,
  isAdmin,
}) {
  //console.log(isAdmin);
  if(isAdmin === true){
     return (
      <div className="product-form">
        <h2>Product Form</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleOnChange}
          />
          <br />

          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleOnChange}
          />
          <br />

          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image Link"
            value={formData.image}
            onChange={handleOnChange}
          />
          <br />

          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleOnChange}
          />
          <br />
          <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
        </form>
        {postResponse && <p>{postResponse}</p>}
      </div>
    );
  }
  else{
    return(
      <h1>Not an admin ACC</h1>
    )
  }
 
}
