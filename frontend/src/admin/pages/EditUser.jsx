import { useState } from "react";
import { SideBar } from "../components/reusables/SideBar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditUser() {
    const [editFormData, setEditFormData] = useState({
        name: "",
        username: "",
        password: "",
        role: "",
    });

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleUpdateUser = async () => {
        try {
            await axios.patch(
                `${BASE_URL}/api/user/update-profile/${id}`,
                editFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div
            className="flex min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-photo/gradient-navy-blue-digital-grid-wallpaper_53876-104785.jpg')`,
            }}
        >
            <SideBar />
            <div className="flex flex-col items-center justify-center w-full p-6">
                <h1 className="text-white text-3xl font-bold mb-8 drop-shadow-lg">
                    Edit User Information
                </h1>
                <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                        Edit User
                    </h2>

                    {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Username", name: "username", type: "text" },
                        { label: "Password", name: "password", type: "password" },
                    ].map((field, index) => (
                        <div className="mb-4" key={index}>
                            <label className="block text-sm font-medium text-white/90 mb-1">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={editFormData[field.name]}
                                onChange={handleEditFormChange}
                                className="w-full px-3 py-2 rounded-md border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ))}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white/90 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={editFormData.role}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 rounded-md border border-white/30 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="" disabled>
                                Select a role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="regular">Regular</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2 rounded-lg bg-gray-500/50 text-white hover:bg-gray-500/70 transition-all"
                        >
                            Go back
                        </button>
                        <button
                            onClick={handleUpdateUser}
                            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-500/40 transition-all"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
