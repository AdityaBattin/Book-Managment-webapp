//http://localhost:8081/
const express = require("express");

//Destructuring a JSON object.....JSON DATA IMPORT
const { books } = require("./data/books.json");
const { users } = require("./data/users.json");
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  //callBack
  res.status(200).json({
    massage: "Server is uo and running",
  });
});

/**
 * Route : /users
 * Methord used GET
 * Discrition : to Get all users
 * Access : Public
 * Parameters : NONE
 */

app.get("/users", (req, res) => {
  //callBack
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route : /users/${id}
 * Methord used GET
 * Discrition : to Get specific user by ID
 * Access : Public
 * Parameters : ID
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params; // getting ID from paramiter
  const user = users.find((each) => each.id === id); //checking in DATABASE
  if (!user) {
    return res.status(404).json({
      success: false,
      massage: "user not found",
    }); // if user not found
  }
  res.status(202).json({
    data: user,
  });
});

/**
 * Route : /users
 * Methord used POST
 * Discrition : to Create New Users
 * Access : Public
 * Parameters : NONE
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  // checking if user exist or not
  const user = users.find((each) => each.id == id);

  //IF user already Exists
  if (user) {
    return res.status(404).json({
      success: false,
      massage: "USER exists with this ID",
    });
  }

  //USER DOES NOT Exist so CREATE one...
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    massage: "User Created Successfully",
    data: users,
  });
});

/**
 * Route : /users
 * Methord used PUT
 * Discrition : Upadate existing user
 * Access : Public
 * Parameters : ID
 */

app.put("/users/:id", (req, res) => {
  const id = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id == id);

  if (!user)
    return res.status(404).json({ success: false, massage: "user not found" });

  const updateUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return res.status(202).json({
      success: true,
      massage: "User Created Successfully",
      data: users,
    });
  });
});

//for all the other routes
app.all("*", (req, res) => {
  res.status(404).json({
    massage: "This route does not exist..",
  });
});

app.listen(port, () => {
  //callback
  console.log("Nodejs & Express started on port : ${port}");
});
