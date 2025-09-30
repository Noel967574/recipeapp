// import { useState } from "react";
// import { Menu, X, Search } from "lucide-react";

// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const categories = ["Chains", "Rings", "Bracelets", "Earrings", "Belts"];
//   const products = [
//     { name: "ring", price: "₦25,000", image: "/images/ring.jpg" },
//     { name: "chain", price: "₦35,000", image: "/images/chain.jpg" },
//     { name: "bracelet", price: "₦20,000", image: "/images/bracelet.jpg" },
//     { name: "earring", price: "₦15,000", image: "/images/earring.jpg" },
//     { name: "belt", price: "₦40,000", image: "/images/belt.jpg" },
//   ];

//   // Filter products by search
//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-black text-white font-sans min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//         <h1 className="text-2xl font-[Cinzel] tracking-wider">DARK Y2K</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-gray-300">
//           <li className="hover:text-white cursor-pointer">Home</li>
//           <li className="hover:text-white cursor-pointer">Shop</li>
//           <li className="hover:text-white cursor-pointer">Lookbook</li>
//           <li className="hover:text-white cursor-pointer">Contact</li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </nav>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <ul className="flex flex-col items-center bg-black text-gray-300 py-4 space-y-4 md:hidden">
//           <li className="hover:text-white cursor-pointer">Home</li>
//           <li className="hover:text-white cursor-pointer">Shop</li>
//           <li className="hover:text-white cursor-pointer">Lookbook</li>
//           <li className="hover:text-white cursor-pointer">Contact</li>
//         </ul>
//       )}

//       {/* Hero Section */}
//       <section className="relative flex-1 flex items-center justify-center text-center px-6 py-16">
//         <img
//           src="/images/y2k-hero.jpg"
//           alt="Y2K Jewelry"
//           className="absolute inset-0 w-full h-full object-cover opacity-40"
//         />
//         <div className="relative z-10 max-w-2xl">
//           <h2 className="text-4xl md:text-6xl font-[Cinzel] tracking-widest drop-shadow-[0_0_15px_#c0c0c0]">
//             Gothic Street Jewelry
//           </h2>
//           <p className="mt-4 text-gray-400 text-sm md:text-lg">
//             Chrome-inspired. Built for rebels. Designed for the streets.
//           </p>
//           <button className="mt-6 bg-gray-200 text-black px-6 py-3 rounded-full hover:bg-white hover:scale-105 transition">
//             Shop Collection
//           </button>
//         </div>
//       </section>

//       {/* Content Layout (Sidebar + Products) */}
//       <section className="flex flex-1 flex-col md:flex-row px-6 py-12 space-y-8 md:space-y-0 md:space-x-8">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-1/5 bg-gray-900 p-6 rounded-lg">
//           <h3 className="text-xl font-[Cinzel] mb-4">Collections</h3>
//           <ul className="space-y-3 text-gray-300">
//             {categories.map((cat, i) => (
//               <li
//                 key={i}
//                 className="cursor-pointer hover:text-white"
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Search Bar */}
//           <div className="flex items-center bg-gray-900 rounded-lg px-4 py-2 mb-6">
//             <Search size={20} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search jewelry..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent outline-none w-full text-sm md:text-base text-gray-200 placeholder-gray-500"
//             />
//           </div>

//           {/* Products */}
//           <h3 className="text-2xl md:text-3xl font-[Cinzel] mb-8">
//             New Arrivals
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-900 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded"
//                   />
//                   <h4 className="mt-3 font-semibold capitalize">{item.name}</h4>
//                   <p className="text-sm text-gray-400">{item.price}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400">No items found</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
//         © {new Date().getFullYear()} Dark Y2K Jewelry · All rights reserved.
//       </footer>
//     </div>
//   );
// }
