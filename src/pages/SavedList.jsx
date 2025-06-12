import React, { useState, useContext } from 'react'
import { SaveContext } from '../context/SavedContext'

export default function SavedList() {
  const { savedRecipes } = useContext(SaveContext)
  const [selectedId, setSelectedId] = useState(null)

  const handleShowRecipe = (idMeal) => {
    setSelectedId(selectedId === idMeal ? null : idMeal)
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-10'>Saved Recipes</h1>
      <p className='text-center mt-4'>Here you can find all your saved recipes.</p>
      <div className='mt-8'>
        {savedRecipes.length > 0 ? (
          <ul className='list-disc'>
            {savedRecipes.map((recipe, index) => (
              <li key={recipe.idMeal || index} className='mb-4 p-8 '>
                <div className='flex gap-6'>
                <img src={recipe.strMealThumb} className='sm:w-30 sm:h-30 w-20 h-20' alt={recipe.strMeal} />
                <div className='flex '>
                  <h2 className='text-xl font-semibold'>{recipe.strMeal}</h2>
                  <button
                    className="sm:ml-16 ml-4 px-3 py-1 rounded-lg h-16 bg-gradient-to-r from-blue-500 to-blue-900 text-white"
                    onClick={() => handleShowRecipe(recipe.idMeal)}
                  >
                    {selectedId === recipe.idMeal ? "Hide Instructions" : "Show Instructions"}
                  </button>
                  
                </div>
                </div>
                {selectedId === recipe.idMeal && recipe.strInstructions && (
                    <div className="mt-4 bg-gray-100 p-4 rounded">
                      <h4 className="font-semibold mb-1">Instructions:</h4>
                      <p className="whitespace-pre-line">{recipe.strInstructions}</p>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center'>No saved recipes found.</p>
        )}
      </div>
    </div>
  )
}
