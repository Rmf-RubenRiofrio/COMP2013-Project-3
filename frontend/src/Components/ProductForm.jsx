import Cookie from "js-cookie"

export default function ProductForm({
  handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  isEditing,
}) {

  const userData = Cookie.get("JWT-TOKEN").split("@");
  const adminAcc = (userData[1].split("#")[0] == "true") ? (true) : (false);
  //console.log(isAdmin);
  if(adminAcc === true){
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
      //this is here to keep the formating without having text (I love tab spacing with html (-_-))
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    )
  }
 
}
