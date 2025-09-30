import {
    Trash2,
    Search,
    MessageSquare
} from 'lucide-react';
import { SideBar } from '../components/reusables/SideBar';


function ContactMessages() {
    const messages = [
        { id: 201, name: 'Alice Wonderland', email: 'alice@example.com', subject: 'Inquiry about recipes', status: 'Unread', date: '2025-07-30' },
        { id: 202, name: 'Bob Builder', email: 'bob@example.com', subject: 'Website feedback', status: 'Read', date: '2025-07-28' },
        { id: 203, name: 'Charlie Chaplin', email: 'charlie@example.com', subject: 'Partnership proposal', status: 'Unread', date: '2025-07-25' },
        { id: 204, name: 'Dora Explorer', email: 'dora@example.com', subject: 'Bug Report', status: 'Read', date: '2025-07-22' },
    ];

    return (
        <div className='flex'>
            <SideBar />
            <div className="flex-1 p-8 bg-gray-50 overflow-auto ml-64">
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
        </div>
    );
}

export default ContactMessages