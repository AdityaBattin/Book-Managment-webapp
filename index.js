//http://localhost:8081/
const express = require("express");

//Destructuring a JSON object.....JSON DATA IMPORT
const { books } = require("./data/books.json");
const { users } = require("./data/users.json");
// importing Routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  //callBack
  res.status(200).json({
    massage: "Server is up and running",
  });
});

// to direct requests in there respective routers
app.use("/users", userRouter);
app.use("/books/", bookRouter);

//for all the other routes
app.all("*", (req, res) => {
  res.status(404).json({
    massage: "This route does not exist..",
  });
});

app.listen(port, () => {
  //callback
  console.log(`Nodejs & Express started on port : ${port}`);
});
