import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [apiResults, setApiResults] = useState([]);

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    // Load DB recipes
    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        const res = await axios.get("http://localhost:5000/recipes");
        setRecipes(res.data);
    };

    // Search API recipes
    const searchRecipe = async () => {
        const res = await axios.get(
            `http://localhost:5000/search/${search}`
        );
        setApiResults(res.data);
    };

    // Add custom recipe
    const addRecipe = async () => {
        await axios.post("http://localhost:5000/recipes", {
            title,
            ingredients: ingredients.split(","),
            instructions
        });

        loadRecipes();
        setTitle("");
        setIngredients("");
        setInstructions("");
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Recipe App</h1>

            {/* Search recipes */}
            <h2>Search Recipes</h2>
            <input
                placeholder="Search recipe"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchRecipe}>Search</button>

            {apiResults.map((meal) => (
                <div key={meal.idMeal}>
                    <h3>{meal.strMeal}</h3>
                    <img src={meal.strMealThumb} width="150" alt="" />
                    <p>{meal.strInstructions.substring(0, 150)}...</p>
                </div>
            ))}

            <hr />

            {/* Add recipe */}
            <h2>Add Recipe</h2>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br/>

            <input
                placeholder="Ingredients comma separated"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            /><br/>

            <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            /><br/>

            <button onClick={addRecipe}>Add Recipe</button>

            <hr />

            {/* Table */}
            <h2>Stored Recipes</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((r) => (
                        <tr key={r._id}>
                            <td>{r.title}</td>
                            <td>{r.ingredients.join(", ")}</td>
                            <td>{r.instructions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;