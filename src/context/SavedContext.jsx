import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const SaveContext = createContext();

export const SavedContext = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [savedRecipes, setSavedRecipes] = useState([]);
  console.log(savedRecipes)

  const [selectedId, setSelectedId] = useState(null)
    
  
    const handleShowRecipe = (idMeal) => {
      setSelectedId(selectedId === idMeal ? null : idMeal)
    }

  // Fetch saved recipes from backend (user is determined by backend auth)
  useEffect(() => {
    fetch(`${backendUrl}/api/saved-recipes/`, {
      credentials: 'include', // Send cookies/JWT for auth
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => setSavedRecipes(data))
      .catch(() => setSavedRecipes([]));
  }, []);

  // Save or unsave recipe
  const handleSavedRecipeButton = async (recipe) => {
    // Try to save
    const alreadySaved = savedRecipes.some(r => r.idMeal === recipe.idMeal);
    if (!alreadySaved) {
      const res = await fetch(`${backendUrl}/api/saved-recipes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ recipe }),
      });
      if (res.ok) {
        setSavedRecipes([...savedRecipes, recipe]);
        toast('Recipe saved successfully');
      } else if (res.status === 401) {
        toast('Please log in to save recipes');
      } else {
        toast('Failed to save recipe');
      }
    } else {
      // Try to unsave
      const res = await fetch(`${backendUrl}/api/saved-recipes/${recipe.idMeal}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setSavedRecipes(savedRecipes.filter(r => r.idMeal !== recipe.idMeal));
        toast('Recipe removed from saved recipes');
      } else if (res.status === 401) {
        toast('Please log in to remove recipes');
      } else {
        toast('Failed to remove recipe');
      }
    }
  };

  async function handleSaveRecipe(recipe) {
        console.log(recipe.strInstructions)
      // If recipe already has instructions, just save it
      if (recipe.strInstructions) {
        handleSavedRecipeButton(recipe);
        return;
      }
      // Otherwise, fetch full details
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          handleSavedRecipeButton(data.meals[0]);
        } else {
          toast("Could not fetch recipe details for saving.");
        }
      } catch {
        toast("Error fetching recipe details for saving.");
      }
    }
      // Check if a recipe is saved
      function isRecipeSaved(recipe) {
        return savedRecipes.some(r => r.idMeal === recipe.idMeal)
      }

  return (
    <SaveContext.Provider value={{ setSavedRecipes, savedRecipes, selectedId,setSelectedId, handleSavedRecipeButton, handleSaveRecipe, isRecipeSaved, handleShowRecipe }}>
      {props.children}
    </SaveContext.Provider>
  );
};
