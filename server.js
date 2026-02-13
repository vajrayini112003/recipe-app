const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/recipeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Recipe = require("./recipe");

// Home
app.get("/", (req, res) => {
    res.send("Recipe API Running");
});

// Get stored recipes
app.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

// Add custom recipe
app.post("/recipes", async (req, res) => {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
});

// Search recipes from API
app.get("/search/:name", async (req, res) => {
    const name = req.params.name;

    const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${name[0]}`
    );

    res.json(response.data.meals || []);
});

app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);