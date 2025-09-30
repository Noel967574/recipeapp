import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, Eye, EyeOff } from "lucide-react";
import Header from "../components/reusables/Header";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
  if (user && hasSubmitted) {
    toast.success("Login successful!");
    const timer = setTimeout(() => {
      const role = user.role?.toLowerCase(); // normalize
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "regular") {
        navigate("/user-dashboard");
      } else {
        navigate("/"); // fallback
      }
    }, 1500);
    return () => clearTimeout(timer);
  }

  if (error && hasSubmitted) {
    toast.error(error);
  }
}, [user, error, hasSubmitted, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!credentials.email.trim() || !credentials.password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setHasSubmitted(true);
    dispatch(loginUser(credentials));
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg')",
        }}
      >
        <ToastContainer />
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="mb-6 text-center text-gray-200">
            Login to your Dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={credentials.email}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                required
                value={credentials.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-white/70"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              className="w-full py-2 rounded-md font-semibold text-white 
              bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
              shadow-lg shadow-purple-500/30
              hover:shadow-purple-500/50 hover:scale-[1.02]
              transition-all duration-300 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin mx-auto" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
