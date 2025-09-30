import { SideBar } from "../components/reusables/SideBar";
import {
    Plus,
    ArrowRight,
    ChevronRight,
    Users,
    BookText,
    Mail,
    BarChart,
    ClipboardList,
} from 'lucide-react';
function Dashboard() {
    return (
        <>
            <div className="flex">
                <SideBar />

                <div className="flex-1 p-8 bg-gray-50 overflow-auto ml-64">
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
            </div>
        </>

    );
}

export default Dashboard
