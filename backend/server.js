const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
require("dotenv").config();
const { DB_URI } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//encrypting passwords
const bcrypt = require("bcrypt");
//tokens for logged in users
const jwt = require("jsonwebtoken");

mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

server.get("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  try{
    const product = await Product.findById(prodId);
    if(product){
      response.status(200).send(product);
    }
    else{
      response.status(404).send({message: "Product not found"});
    } 
  }catch(error){
    console.log(error.message);
    response.status(500).send({message: "Error retrieving product"});
  }});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  try {
    await product
      .save()
      .then((result) =>
        response.status(201).send(`${productName} added\nwith id: ${id}`)
      );
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});


//SCCS
server.post("/login", async (request, response) => {
  const {username, password} = request.body;
  
  try{
    //find the user from the DB
    const user = await User.findOne({username});
    //no user was found with the corisponding username (should also check emails?)
    if(!user){
      return response.status(404).send({message: "NO USERNAME"});
    }
    else{
      //there is a user so now we compare the passwords
      const pass = bcrypt.compare(password, user.password);
      if(!pass){
        //the passwords do not match, bcrypt.compare auto decrypts and checks the data
        return response.status(303).send({message: "WRONG PASSWORD"});
      }
      else{
        //if it gets here, both username and password are correct, so we can pass it through
        //*make a web token to use later*
        const webToken = jwt.sign({id: user._id /*auto made by mongo*/, username}, "SECRET");
        return response.status(201).send({message: "LOGIN GOOD", user:username, token: webToken})
      }
    }
  }
  catch(err){
    console.log(err);
  }
});

server.post("/addUser", async (request, response) => {
  console.log("BEFORE REQUEST");
  const {username, password, email} = request.body;
  console.log("AFTER REQUEST");

  try{
    //make an encrpted password to use inside of the db
    const encryptPass = await bcrypt.hash(password, 5);

    //create a user with that encrpyted password
    const newUser = new User({
      username,
      password: encryptPass,
      email,
    });

    console.log("AFTER NEW USER");
    //save said user to the database
    await newUser.save().then(response.send({message: "ADDED USER: " + username}));
     console.log("AFTER SAVE");
  }
  catch (err) {
    console.log(err);
  }
});