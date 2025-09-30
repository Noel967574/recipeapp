import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import {Recipe }from "./pages/recipe";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Dashboard from "./admin/pages/Dashboard";
import AllUsers from "./admin/pages/Users";
import AdminRecipes from "./admin/pages/AdminRecipes";
import ContactMessages from "./admin/pages/ContactMessages";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/protectedRoutes";
import UserDetails from "./admin/pages/UserDetails";
import EditUser from "./admin/pages/EditUser";
import RecipeDetails from "./admin/pages/RecipeDetails";

//user dashboard imports
import UserDashboard from "./userDashboard/pages/Dashboard";
import Profile from "./userDashboard/pages/Profile";

import UserRecipeDetails from "./userDashboard/pages/UserRecipeDetails";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/recipes" element={<Recipe />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/admin/recipes" element={<AdminRecipes />} /> {/* ✅ FIXED */}
          <Route path="/messages" element={<ContactMessages />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute allowedRoles={["regular"]} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-recipe-details/:id" element={<UserRecipeDetails />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
