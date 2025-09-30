import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateRecipeModal({ isOpen, onClose, onSuccess }) {
  const { token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    videoUrl: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipe/create-recipe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess(); // refresh recipes
      onClose(); // close modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={form.ingredients}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="url"
            name="videoUrl"
            placeholder="Video URL (optional)"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipeModal;
