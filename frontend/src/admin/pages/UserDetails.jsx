import { User, Mail, Calendar, Briefcase, Key } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SideBar } from "../components/reusables/SideBar";

const UserDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/user-details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedUser = res.data.userDetails;

        if (!fetchedUser) {
          setError("No user found");
          return;
        }
        setUser(fetchedUser);
        setError("");
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message || "Failed to fetch user details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserDetails();
  }, [id, token]);

  if (loading)
    return <div className="p-8 text-gray-100">Loading user details...</div>;
  if (error) return <div className="p-8 text-red-300">{error}</div>;
  if (!user) return <div className="p-8 text-gray-100">User not found.</div>;

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1699891730676-037bed3c1bed?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SideBar />
      <div className="flex-1 flex justify-center items-center p-6 ml-64">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-3xl text-white">
          {/* Header */}
          <div className="flex items-center mb-8 border-b border-white/30 pb-4">
            <div className="w-20 h-20 flex items-center justify-center bg-blue-500/60 text-white rounded-full font-bold text-3xl uppercase shadow-lg">
              {user.name?.charAt(0)}
            </div>
            <div className="ml-5">
              <h2 className="text-3xl font-bold drop-shadow-lg">{user.name}</h2>
              <p
                className={`mt-2 px-3 py-1 rounded-full inline-block text-sm font-semibold shadow-md ${
                  user.role === "Admin"
                    ? "bg-red-500/70"
                    : user.role === "Editor"
                    ? "bg-yellow-500/70"
                    : "bg-green-500/70"
                }`}
              >
                {user.role}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem
              icon={<Mail size={20} />}
              label="Email"
              value={user.email}
            />
            <DetailItem
              icon={<User size={20} />}
              label="Username"
              value={user.username}
            />
            {user.createdAt && (
              <DetailItem
                icon={<Calendar size={20} />}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            )}
            <DetailItem
              icon={<Key size={20} />}
              label="User ID"
              value={user._id}
            />
            {user.team && (
              <DetailItem
                icon={<Briefcase size={20} />}
                label="Team"
                value={user.team}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="text-white/80">{icon}</div>
    <div>
      <p className="text-xs font-medium text-white/80 uppercase">{label}</p>
      <p className="text-base font-semibold drop-shadow">{value || "—"}</p>
    </div>
  </div>
);

export default UserDetails;


