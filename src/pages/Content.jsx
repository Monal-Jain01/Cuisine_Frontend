import React , { useContext } from 'react'
import { toast } from 'react-toastify'
import save from '../assets/save.png'
import unsave from '../assets/unsave.jpg'
import { SaveContext } from '../context/SavedContext'
import { AppContent } from '../context/AppContext'
import { ThemeContext } from '../context/ThemeContextProvider'

export default function Content() {
  const [ingredient, setIngredient] = React.useState("")
  const [recipes, setRecipes] = React.useState([])
  const [selectedRecipe, setSelectedRecipe] = React.useState(null)
  const { handleSaveRecipe, isRecipeSaved, selectedId, setSelectedId, handleShowRecipe } = useContext(SaveContext)
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
    setIngredient("")
  }

  // Fetch full recipe details (including instructions) by id
  async function handleShowRecipeInstructions(idMeal) {
    handleShowRecipe(idMeal)
  scrollTo(0,3000) 
  
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
  const {theme} = useContext(ThemeContext)
  

  return (
    <>
      <main className={` rounded-2xl border-0 pt-40 h-screen min-h-fit ${theme}`} >
        <div className='w-[75%] text-center md:ml-20 ml-2 my-4 text-2xl font-semibold'>
        Enter your Ingredient:</div>
        <form onSubmit={handleSubmit} className='flex justify-center gap-3 h-10'>
          <input
            className='rounded-lg outline bg-gray-800 text-gray-100 px-4 py-2 w-[50%] sm:w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
          <div className="mt-8 md:pl-20 m-8">
            <h2 className="text-2xl font-bold mb-4">Recipes:</h2>
            <ul className='list-disc'>
              {recipes.map((r, idx) => (
                <li key={r.idMeal || idx} className="mb-2 flex items-center md:gap-44">
                  <div className="font-light w-96 text-xl ">
                    {r.strMeal}
                  </div>
                  <div className='flex md:flex-row flex-col gap-1 mb-8 md:gap-16'>
                  <button
                    className="cursor-pointer ml-2 px-3 py-1 rounded bg-gradient-to-r from-blue-500 to-blue-900 text-white md:p-2"
                    onClick={() => handleShowRecipeInstructions(r.idMeal)}
                  >
                    {selectedId === r.idMeal ? "Hide Instructions" : "Show Instructions"}
                  </button>
                  {userData && <button
                    className="cursor-pointer ml-2 px-3 py-1 md:p-2 rounded w-32 bg-green-600 text-white hover:bg-green-700 flex items-center gap-3"
                    onClick={() => handleSaveRecipe(r)}
                  >
                    <img
                      src={isRecipeSaved(r) ? save : unsave}
                      alt={isRecipeSaved(r) ? "Saved" : "Save"}
                      className='w-6 h-6'
                    />
                    {isRecipeSaved(r) ? "Unsave" : "Save"}
                  </button>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedId && selectedRecipe && (
          <div className="mt-8 p-4 bg-black/80 text-white shadow-md shadow-black rounded-xl">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold mb-2">{selectedRecipe.strMeal}</h3>
            <img
                      onClick={() => handleSaveRecipe(selectedRecipe)}
                      src={isRecipeSaved(selectedRecipe) ? save : unsave}
                      alt={isRecipeSaved(selectedRecipe) ? "Saved" : "Save"}
                      className='w-6 h-6 cursor-pointer'
                    />
                  </div>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="w-[40vw] h-[52vh] mb-4 rounded" />
            <h4 className="font-semibold mb-1">Instructions:</h4>
            <p className="whitespace-pre-line ">{selectedRecipe.strInstructions}</p>
          </div>
        )}
      </main>
    </>
  )
}
