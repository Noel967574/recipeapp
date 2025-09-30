import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, clearAuthState } from "../redux/slices/authSlice";
import { Loader, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/reusables/Header";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "regular",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && hasSubmitted) {
      toast.success("Registration successful!");
      setData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "regular",
      });
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (error && hasSubmitted) {
      toast.error(error);
    }
  }, [user, error, hasSubmitted, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: all fields filled
    if (!data.name || !data.username || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Validation: password match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setHasSubmitted(true);
    const { confirmPassword, ...userData } = data;
    dispatch(clearAuthState());
    dispatch(registerUser(userData));
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
          <h1 className="text-3xl font-bold mb-2 text-center">Join Us</h1>
          <p className="mb-6 text-center text-gray-200">
            Become part of our recipe community
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="text"
              name="name"
              placeholder="Enter Name"
              value={data.name}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="text"
              name="username"
              placeholder="Enter Username"
              value={data.username}
              onChange={handleChange}
            />
            <input
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={data.password}
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

            <div className="relative">
              <input
                className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/40 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-white/70"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
              {loading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
