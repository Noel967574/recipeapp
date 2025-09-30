import { Link, useNavigate } from "react-router-dom";
import {
    Home,
    Users,
    BookText,
    Mail,
    LogOut as LogOutIcon, // 👈 rename icon import
    Settings,
    Bell,
    Search,
    ChevronDown,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAuthState } from "../../../redux/slices/authSlice"; // 👈 import your logout action
import { useDispatch } from "react-redux";

// --- SideBar Component ---
function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        // clear Redux state
        dispatch(clearAuthState());

        // clear localStorage
        localStorage.clear();

        toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 2000,
        });

        // Redirect to login page after logout
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-gray-200 w-64 p-5 shadow-lg fixed">
            {/* Admin Title/Logo */}
            <div className="flex items-center justify-center mb-10 mt-2">
                <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            </div>

            {/* Main Navigation */}
            <nav className="flex-grow">
                <ul>
                    <Link to="/dashboard">
                        <li className="mb-3 flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-200">
                            <Home className="mr-4" size={20} />
                            Dashboard
                        </li>
                    </Link>

                    <Link to="/users">
                        <li className="mb-3 flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-200">
                            <Users className="mr-4" size={20} />
                            Users
                        </li>
                    </Link>

                    <Link to="/admin/recipes">
                        <li className="mb-3 flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-200">
                            <BookText className="mr-4" size={20} />
                            Recipes
                        </li>
                    </Link>

                    <Link to="/messages">
                        <li className="mb-3 flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-200">
                            <Mail className="mr-4" size={20} />
                            Contact Messages
                        </li>
                    </Link>
                </ul>
            </nav>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Bottom Navigation/Actions */}
            <ul>
                <li className="mb-3">
                    <a
                        href="#"
                        className="flex items-center p-3 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                        <Settings className="mr-4" size={20} />
                        Settings
                    </a>
                </li>
                <li>
                    <button
                        onClick={logout}
                        className="flex items-center w-full text-left p-3 rounded-lg text-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
                    >
                        <LogOutIcon className="mr-4" size={20} />
                        Logout
                    </button>
                </li>
            </ul>

            <ToastContainer />
        </div>
    );
}

// --- Header Component ---
function Header() {
    return (
        <header className="flex items-center justify-between bg-white p-5 shadow-md h-16">
            {/* Search Bar */}
            <div className="relative flex items-center w-1/3 max-w-md">
                <Search className="absolute left-3 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* User Actions / Notifications */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <div className="relative">
                    <Bell
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        size={24}
                    />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        3
                    </span>
                </div>

                {/* User Profile */}
                <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                        src="https://i.pinimg.com/474x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium text-gray-700">John Doe</span>
                    <ChevronDown className="ml-2 text-gray-500" size={18} />
                </div>
            </div>
        </header>
    );
}

export { SideBar, Header };
