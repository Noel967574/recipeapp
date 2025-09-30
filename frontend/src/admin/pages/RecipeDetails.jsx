import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/recipe/recipe-details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecipe(res.data.recipeDetails || res.data.recipe);
        setError("");
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, token]);

  if (loading) return <p className="text-center mt-6">Loading recipe...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!recipe) return null;

  // ✅ Helper for YouTube embedding
  const getYoutubeEmbed = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      } else if (urlObj.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
    } catch {
      return null;
    }
    return null;
  };

  const youtubeEmbed = recipe.videoUrl ? getYoutubeEmbed(recipe.videoUrl) : null;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {/* Image + Video */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* ✅ Image */}
        {recipe.image && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${recipe.image}`}
            alt={recipe.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow"
          />
        )}

        {/* ✅ Video (YouTube or direct video) */}
        {recipe.videoUrl && (
          youtubeEmbed ? (
            <iframe
              src={youtubeEmbed}
              title="Recipe Video"
              allowFullScreen
              className="w-full md:w-1/2 h-64 rounded-xl shadow"
            ></iframe>
          ) : (
            <video
              controls
              className="w-full md:w-1/2 h-64 rounded-xl shadow"
            >
              <source src={recipe.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        )}
      </div>

      {/* Details */}
      <div className="mt-6">
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {recipe.category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(recipe.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Instructions */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>
    </div>
  );
}
