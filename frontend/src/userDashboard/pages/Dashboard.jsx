import { useState } from "react";
import {SideBar }from "../components/Sidebar";
import { Bell, ChevronDown, Search } from "lucide-react";

function UserHeader() {
  return (
    <header className="flex items-center justify-between bg-white p-5 shadow-md h-16 ml-64">
      {/* Search Bar */}
      <div className="relative flex items-center w-1/3 max-w-md">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notifications & Profile */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Bell className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            2
          </span>
        </div>
        <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-medium text-gray-700">Jane Doe</span>
          <ChevronDown className="ml-2 text-gray-500" size={18} />
        </div>
      </div>
    </header>
  );
}

export default function UserDashboard() {
  const [user] = useState({ name: "Jane Doe", email: "janedoe@email.com" });

  return (
    <div className="flex">
      {/* Reusable Sidebar */}
      <SideBar />

      {/* Main Section */}
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <UserHeader />

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} 👋</h2>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Your Profile</h3>
              <p className="text-gray-600 mt-2">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Saved Items</h3>
              <p className="text-gray-600 mt-2">You have 5 saved recipes.</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-gray-600 mt-2">2 new messages today.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
