function CreateUserModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Add User</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            //   value={editFormData.name}
                            //   onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">User Name</label>
                        <input
                            type="text"
                            name="username"
                            //   value={editFormData.name}
                            //   onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            //   value={editFormData.email}
                            //   onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            //   value={editFormData.email}
                            //   onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            name="role"
                            //   value={editFormData.role}
                            //   onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="admin">Admin</option>
                            <option value="regular">Regular</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            //   onClick={handleCloseEditModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Add User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUserModal;