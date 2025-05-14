import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/baseURLS";

const RecipeDetail = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run this effect when the router is ready
    if (!router.isReady) return;

    // Get the ID from the URL path
    const { id } = router.query;

    if (id) {
      setLoading(true);

      // Convert id to a number to ensure proper comparison with DB
      const recipeId = parseInt(id, 10);

      console.log("Fetching recipe with ID:", recipeId); // Debug log

      axios
        .get(`${getBaseUrl()}/api/recipes/${id}/`)
        .then((res) => {
          console.log("Recipe data received:", res.data); // Debug log
          setRecipe(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Failed to load recipe", err);
          setError("Failed to load recipe. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.isReady, router.query]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading recipe...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );

  if (!recipe)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p>Recipe not found</p>
        <button
          onClick={() => router.push("/recipe")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Recipes
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="mb-4 w-full rounded h-64 object-cover"
        />
      )}

      <div className="mb-4 text-sm text-gray-500">
        {recipe.created_at && (
          <p>Posted: {new Date(recipe.created_at).toLocaleDateString()}</p>
        )}
        {recipe.created_by && (
          <p>By: {recipe.created_by.username || "Unknown Chef"}</p>
        )}
      </div>

      <p className="text-gray-700 whitespace-pre-line">{recipe.description}</p>

      <div className="mt-6">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
