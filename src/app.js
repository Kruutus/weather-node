const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location

// Tells express to use hbs templating module as a view engine (string must match)
app.set("view engine", "hbs");

// Tells express what folder to look for templates
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// This is how we use hbs template, the name of the file is index, and it has to be under root/views
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Kristof Kelemen",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Kristof Kelemen",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some very useful info.",
        name: "Kristof Kelemen",
    });
});

app.get("/weather", (req, res) => {
    const { address } = req.query;
    if(!address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return response.send({error});
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return response.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address,
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found.",
        name: "Kristof Kelemen",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found.",
        name: "Kristof Kelemen",
    });});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});