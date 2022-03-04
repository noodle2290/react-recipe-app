import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';

function App() {

  const APP_ID = '7d8f9f33'
  const APP_KEY = "0b6767acd468cb8f4a4f8f984a796842"

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);//queryにsearchの値を代入
    setSearch("");//searchを空にする
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  // query変更時に呼び出される
  useEffect(() => {
    getRecipes();
  }, [query])

  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
