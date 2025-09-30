import { SideBar } from "../components/reusables/SideBar";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CreateRecipeModal from "../components/createRecipeModal"; // ⬅️ Import modal

function AllRecipes() {
  const { token } = useSelector((state) => state.auth);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // ✅ Fetch recipes
  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipe/all-recipes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const recipesArray = res.data.recipeDetails || [];
      setRecipes(recipesArray);
      setFilteredRecipes(recipesArray);
      setError("");
    } catch (e) {
      console.error("Error fetching recipes:", e);
      setError(e.response?.data?.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // ✅ Search filter
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [search, recipes]);

  // ✅ Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Recipe deleted successfully");
      fetchRecipes(); // refresh list
    } catch (e) {
      console.error("Delete error:", e);
      toast.error(e.response?.data?.message || "Failed to delete recipe");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading recipes...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-50 overflow-auto ml-64">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Recipes</h2>

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Add New Recipe */}
          <button
            className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={openCreateModal}
          >
            <Plus className="mr-2" size={20} /> Add New Recipe
          </button>
        </div>

        {/* Create Recipe Modal */}
        <CreateRecipeModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSuccess={fetchRecipes} // refresh list after create
        />

        {/* Recipes Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Instructions</th>
                <th className="p-3 border-b">Created At</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <tr
                    key={recipe._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b">{recipe.title}</td>
                    <td className="p-3 border-b">{recipe.category}</td>
                    <td className="p-3 border-b truncate max-w-xs">
                      {recipe.instructions}
                    </td>
                    <td className="p-3 border-b">
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b flex justify-center gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() => navigate(`/recipe-details/${recipe._id}`)} // ✅ Navigate to details
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan="5">
                    No recipes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
