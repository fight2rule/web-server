const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const hbs = require("hbs");
const path = require("path");
const express = require("express");
//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));
//console.log(__filename);

//define paths for express coding
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();
const port = process.env.PORT || 3000;
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
//setup static directory to server
app.use(express.static(publicPath));
// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!!<h1>");
// });
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Abhi",
//     age: 27,
//   });
// });
// app.get("/about", (req, res) => {
//   res.send("<h1>HTML</h1>");
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather-app",
    name: "Abhi~",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abhi~",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abhi~",
    msg: "This is help page",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (erorr, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          placeName,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   location: "Philadelphia",
  //   forecast: "Its freezing",
  //   address: req.query.address,
  // });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Yo must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("header", {
    errorMsg: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("header", {
    errorMsg: "My 404 page",
  });
});
app.listen(port, () => {
  console.log(`Port${port}is running!`);
});
