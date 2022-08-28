//for all user related routes
// if there is any request of '/users' it will get in this router
const express = require("express");
// Destructuring a JSON Object .... JSON Data Import
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route : /users
 * Methord used GET
 * Discrition : to Get all users
 * Access : Public
 * Parameters : NONE
 */

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const id = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id == id);
  //not working
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

/**
 * Route : /users/:id
 * Methord used DELETE
 * Discrition : Delete a user by ID
 * Access : Public
 * Parameters : ID
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      massage: "User to be deleted was not found",
    });
  }

  const indexofuser = users.indexOf(user);

  users.splice(indexofuser, 1); //deleting that index
  return res.status(200).json({ success: true, data: users });
});

module.exports = router;
