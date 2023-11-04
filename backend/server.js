const express = require("express");
const { PORT, mongoUrl } = require("./config");
const mongoose = require("mongoose");
const bookRoutes = require('./routes/bookRoutes')
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json());
app.use('/books', bookRoutes);
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['application/json']
// }))


app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
