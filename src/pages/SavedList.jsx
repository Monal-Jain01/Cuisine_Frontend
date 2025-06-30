import React, { useState, useContext } from 'react'
import { SaveContext } from '../context/SavedContext'
import { ThemeContext } from '../context/ThemeContextProvider'
import save from '../assets/save.png'

export default function SavedList() {
  const { savedRecipes, handleSaveRecipe,isRecipeSaved, setSelectedId, selectedId, handleShowRecipe } = useContext(SaveContext)

  const {theme} = useContext(ThemeContext)
  
   return (
    <div className={`${theme} h-screen min-h-fit`}>
      <h1 className='text-3xl font-bold text-center pt-10'>Saved Recipes</h1>
      <p className='text-center mt-4'>Here you can find all your saved recipes.</p>
      <div className='mt-8 '>
        {savedRecipes.length > 0 ? (
          <ul className='list-disc'>
            {savedRecipes.map((recipe, index) => (
              <li key={recipe.idMeal || index} className='mb-4 p-4 md:p-8 '>
                <div className='flex gap-6'>
                <img src={recipe.strMealThumb} className='sm:w-50 shadow-lg shadow-black/75 rounded-lg sm:h-40 w-40 h-30' alt={recipe.strMeal} />
                <div className='flex '>
                  <div className='flex md:flex-row flex-col' >
                  <h2 className='text-xl md:w-40  font-semibold'>{recipe.strMeal}</h2>
                  <div className='flex'>
                  <button
                    className="md:ml-16 px-3 cursor-pointer py-1 rounded-lg md:h-16 bg-gradient-to-r w-fit from-blue-500 to-blue-900 text-white"
                    onClick={() => handleShowRecipe(recipe.idMeal)}
                  >
                    {selectedId === recipe.idMeal ? "Hide Instructions" : "Show Instructions"}
                  </button>
                  <button
                  className="cursor-pointer ml-2 px-1 py-1 md:p-2 rounded bg-green-600 text-white hover:bg-green-700 md:h-16  min-h-fit "
                  onClick={() => handleSaveRecipe(recipe)}
                >
                  <img
                    src={isRecipeSaved(recipe) ? save : unsave}
                    alt={isRecipeSaved(recipe) ? "Saved" : "Save"}
                    className='w-6 h-6'
                  />
                </button>
                  </div>
                  </div>
                </div>
                </div>
                {selectedId === recipe.idMeal && recipe.strInstructions && (
                    <div className="mt-8 p-4 text-white bg-black/80 shadow-lg shadow-black rounded-xl">
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
