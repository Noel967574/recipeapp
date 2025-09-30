import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateRecipeModal({ isOpen, onClose, onCreated }) {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ error: "", success: "" });

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipe/create-recipe`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedback({ success: "✅ Recipe created successfully!", error: "" });

      // Reset form
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        videoUrl: "",
      });

      if (onCreated) onCreated();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setFeedback({
        error: err.response?.data?.message || "❌ Failed to create recipe",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Add New Recipe
        </h2>

        {feedback.error && <p className="text-red-500 mb-3">{feedback.error}</p>}
        {feedback.success && (
          <p className="text-green-600 mb-3">{feedback.success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients (comma-separated)
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              required
            ></textarea>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://example.com/video"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipeModal;
