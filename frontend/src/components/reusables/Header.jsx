import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-black/60 shadow-xl fixed top-0 left-0 w-full z-50 backdrop-blur-sm border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-white text-3xl font-extrabold tracking-wide drop-shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    🍳 CookBook<span className="text-sky-400">Pro</span>
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className="flex gap-8 text-lg font-medium">
                        <li>
                            <Link to="/" className="text-white hover:text-sky-400 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="text-white hover:text-sky-400 transition">About</Link>
                        </li>
                        <li>
                            <Link to="/recipes" className="text-white hover:text-sky-400 transition">Recipes</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="text-white hover:text-sky-400 transition">Contact</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-sky-400 text-black px-4 py-2 rounded-full hover:bg-sky-500 transition">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="border border-sky-400 text-white px-4 py-2 rounded-full hover:bg-sky-400 hover:text-black transition">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
