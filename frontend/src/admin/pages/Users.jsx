import { SideBar } from "../components/reusables/SideBar";
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import CreateUserModal from "../components/CreateUserModal";

function AllUsers() {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data.usersDetails || []);
      setFilteredUsers(res.data.usersDetails || []);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [token]);

const deleteUser = async (id) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/delete-user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Correct way to access the response message
    return res.data.message;
  } catch (e) {
    console.error("Delete user error:", e);
    throw e;
  }
};


  // handle openmodal
  const handleOpenModal = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseModal = () => {
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const viewDetails = (id) => {
    navigate(`/user-details/${id}`);
  };

  const EditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Filter users on search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          [user.name, user.email, user.role]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-50 overflow-auto ml-64">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h2>

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative flex items-center w-full md:w-1/3 max-w-sm">
            <Search className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={handleOpenCreateModal}
          >
            <Plus className="mr-2" size={20} /> Add New User
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading users...
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {/* No Users Found */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-10 text-gray-500">No users found.</div>
        )}
        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={() => {
            deleteUser(itemToDelete).then(() => {
              fetchUsers(); // refresh the list after deletion
              handleCloseModal();
            });
          }}
        />
        {/* Users Table */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="pl-6 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === "admin"
                              ? "bg-green-400 capitalize text-gray-900"
                              : user.role === "regular"
                                ? "bg-yellow-100 capitalize text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-green-600 hover:text-green-800 mr-4"
                          title="View"
                          onClick={() => viewDetails(user._id)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                          onClick={() => EditUser(user._id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleOpenModal(user._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUsers;


