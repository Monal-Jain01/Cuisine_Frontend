import React , { useContext } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import save from '../assets/save.png'
import unsave from '../assets/unsave.jpg'
import { SaveContext } from '../context/SavedContext'
import { AppContent } from '../context/AppContext'

export default function Content() {
  const [ingredient, setIngredient] = React.useState("")
  const [recipes, setRecipes] = React.useState([])
  const [selectedRecipe, setSelectedRecipe] = React.useState(null)
  const {savedRecipes, handleSavedRecipeButton } = useContext(SaveContext)
  const {userData} = useContext(AppContent)


  // Fetch recipes by the single ingredient
  async function getRecipesByIngredient() {
    if (!ingredient.trim()) {
      toast("Please enter an ingredient")
      return
    }
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient.trim())}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.meals) {
        setRecipes(data.meals)
        toast(`Found ${data.meals.length} recipes with "${ingredient}"`)
      } else {
        setRecipes([])
        toast("No recipes found for this ingredient.")
      }
    } catch (err) {
      toast("Error fetching recipes.")
    }
  }

  // Fetch full recipe details (including instructions) by id
  async function handleShowRecipeInstructions(idMeal) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.meals && data.meals[0]) {
        setSelectedRecipe(data.meals[0])
      } else {
        toast("Recipe details not found.")
      }
    } catch (err) {
      toast("Error fetching recipe details.")
    }
  }

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

  // Handle form submission to set ingredient and fetch recipes
  function handleSubmit(event) {
    event.preventDefault()
    if (!ingredient.trim()) {
      toast("Please enter an ingredient")
      return
    }
    setSelectedRecipe(null)
    getRecipesByIngredient()
  }

  return (
    <div>
      <div className='shadow-md'>
        <Navbar />
      </div>
      <main className='m-4 mt-40 '>
        <form onSubmit={handleSubmit} className='flex justify-center gap-3 h-10'>
          <input
            className='rounded-lg bg-slate-200 px-4 py-2 w-60 sm:w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text"
            placeholder='e.g. rice'
            aria-label='Add ingredient'
            name='ingredient'
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
          />
          <button type="submit" className='rounded-lg bg-gradient-to-r from-blue-500 to-blue-900 text-white px-6 py-2 hover:bg-blue-600'>
            Get recipes
          </button>
        </form>

        {recipes.length > 0 && (
          <div className="mt-8 m-8">
            <h2 className="text-2xl font-bold mb-4">Recipes:</h2>
            <ul className='list-disc'>
              {recipes.map((r, idx) => (
                <li key={r.idMeal || idx} className="mb-2 flex items-center gap-4">
                  <div className="text-gray-800 w-96">
                    {r.strMeal}
                  </div>
                  
                  <button
                    className="ml-2 px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-blue-900 text-white"
                    onClick={() => handleShowRecipeInstructions(r.idMeal)}
                  >
                    Show Instructions
                  </button>
                  {userData && <button
                    className="ml-2 px-3 py-1 rounded w-28 bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                    onClick={() => handleSaveRecipe(r)}
                  >
                    <img
                      src={isRecipeSaved(r) ? save : unsave}
                      alt={isRecipeSaved(r) ? "Saved" : "Save"}
                      className='w-6 h-6'
                    />
                    {isRecipeSaved(r) ? "Unsave" : "Save"}
                  </button>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedRecipe && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold mb-2">{selectedRecipe.strMeal}</h3>
            <img
                      src={isRecipeSaved(selectedRecipe) ? save : unsave}
                      alt={isRecipeSaved(selectedRecipe) ? "Saved" : "Save"}
                      className='w-6 h-6'
                    />
                  </div>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="w-64 mb-4 rounded" />
            <h4 className="font-semibold mb-1">Instructions:</h4>
            <p className="whitespace-pre-line">{selectedRecipe.strInstructions}</p>
          </div>
        )}
      </main>
    </div>
  )
}
