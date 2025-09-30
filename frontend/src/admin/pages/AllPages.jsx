import {
    Plus,
    Edit,
    Trash2,
    Eye,
    ArrowRight,
    ChevronRight,
    Search,
    Users,
    BookText,
    Mail,
    BarChart,
    ClipboardList,
    MessageSquare
} from 'lucide-react';

// --- Dashboard Component ---
function DashboardPage() {
    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <h3 className="text-2xl font-semibold text-gray-900">1,234</h3>
                    </div>
                    <Users className="text-blue-500" size={36} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Recipes</p>
                        <h3 className="text-2xl font-semibold text-gray-900">567</h3>
                    </div>
                    <BookText className="text-green-500" size={36} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">New Messages</p>
                        <h3 className="text-2xl font-semibold text-gray-900">12</h3>
                    </div>
                    <Mail className="text-yellow-500" size={36} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Page Views (Today)</p>
                        <h3 className="text-2xl font-semibold text-gray-900">8,901</h3>
                    </div>
                    <BarChart className="text-purple-500" size={36} />
                </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium">New User Registered: <span className="text-blue-600">Jane Doe</span></p>
                                <p className="text-sm text-gray-500">2 minutes ago</p>
                            </div>
                            <ChevronRight className="text-gray-400" size={20} />
                        </li>
                        <li className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium">Recipe Updated: <span className="text-green-600">Spicy Chicken Curry</span></p>
                                <p className="text-sm text-gray-500">1 hour ago</p>
                            </div>
                            <ChevronRight className="text-gray-400" size={20} />
                        </li>
                        <li className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium">New Contact Message from: <span className="text-purple-600">Admin Support</span></p>
                                <p className="text-sm text-gray-500">3 hours ago</p>
                            </div>
                            <ChevronRight className="text-gray-400" size={20} />
                        </li>
                        <li className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium">Recipe Added: <span className="text-orange-600">Vegetable Lasagna</span></p>
                                <p className="text-sm text-gray-500">Yesterday</p>
                            </div>
                            <ChevronRight className="text-gray-400" size={20} />
                        </li>
                    </ul>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        View All Activity <ArrowRight className="ml-2" size={18} />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <ul className="space-y-3">
                        <li>
                            <button className="w-full flex items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                <Plus className="mr-3" size={20} /> Add New User
                            </button>
                        </li>
                        <li>
                            <button className="w-full flex items-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                <Plus className="mr-3" size={20} /> Add New Recipe
                            </button>
                        </li>
                        <li>
                            <button className="w-full flex items-center p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                <ClipboardList className="mr-3" size={20} /> View All Messages
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// --- Users Component ---
function UsersPage() {
    const users = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
        { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'User' },
    ];

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h2>

            {/* Top Bar: Search and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="relative flex items-center w-full md:w-1/3 max-w-sm">
                    <Search className="absolute left-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    <Plus className="mr-2" size={20} /> Add New User
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto"> {/* For responsiveness on small screens */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                                user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (Placeholder) */}
            <div className="mt-6 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 text-sm font-medium text-white hover:bg-blue-600">
                        1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                    </a>
                </nav>
            </div>
        </div>
    );
}

// --- Recipes Component ---
function RecipesPage() {
    const recipes = [
        { id: 101, title: 'Spicy Chicken Curry', category: 'Main Course', status: 'Published' },
        { id: 102, title: 'Vegetable Lasagna', category: 'Vegetarian', status: 'Draft' },
        { id: 103, title: 'Chocolate Lava Cake', category: 'Dessert', status: 'Published' },
        { id: 104, title: 'Classic Caesar Salad', category: 'Salad', status: 'Published' },
        { id: 105, title: 'Homemade Pizza Dough', category: 'Basics', status: 'Draft' },
    ];

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Recipes</h2>

            {/* Top Bar: Search and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="relative flex items-center w-full md:w-1/3 max-w-sm">
                    <Search className="absolute left-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors">
                    <Plus className="mr-2" size={20} /> Add New Recipe
                </button>
            </div>

            {/* Recipes Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recipes.map((recipe) => (
                                <tr key={recipe.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{recipe.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{recipe.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${recipe.status === 'Published' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {recipe.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-green-600 hover:text-green-900 mr-4" title="View">
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900 mr-4" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (Placeholder) */}
            <div className="mt-6 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 text-sm font-medium text-white hover:bg-blue-600">
                        1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                    </a>
                </nav>
            </div>
        </div>
    );
}

// --- Contact Messages Component ---
function ContactMessagesPage() {
    const messages = [
        { id: 201, name: 'Alice Wonderland', email: 'alice@example.com', subject: 'Inquiry about recipes', status: 'Unread', date: '2025-07-30' },
        { id: 202, name: 'Bob Builder', email: 'bob@example.com', subject: 'Website feedback', status: 'Read', date: '2025-07-28' },
        { id: 203, name: 'Charlie Chaplin', email: 'charlie@example.com', subject: 'Partnership proposal', status: 'Unread', date: '2025-07-25' },
        { id: 204, name: 'Dora Explorer', email: 'dora@example.com', subject: 'Bug Report', status: 'Read', date: '2025-07-22' },
    ];

    return (
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Messages</h2>

            {/* Top Bar: Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="relative flex items-center w-full md:w-1/3 max-w-sm">
                    <Search className="absolute left-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Messages</option>
                    <option>Unread</option>
                    <option>Read</option>
                    <option>Archived</option>
                </select>
            </div>

            {/* Messages Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sender
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {messages.map((message) => (
                                <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                                        <div className="text-sm text-gray-500">{message.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{message.subject}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${message.status === 'Unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {message.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {message.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4" title="View Message">
                                            <MessageSquare size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900" title="Delete Message">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination (Placeholder) */}
            <div className="mt-6 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 text-sm font-medium text-white hover:bg-blue-600">
                        1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                    </a>
                </nav>
            </div>
        </div>
    );
}

export { DashboardPage, UsersPage, RecipesPage, ContactMessagesPage };