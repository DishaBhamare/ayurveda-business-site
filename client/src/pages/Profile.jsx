import {useState, useEffect} from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile (){

    const [profile, setProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProfile = async () => {
    try {
        const response = await api.get("/users/profile");

        setProfile(response.data);
        setEditProfile(response.data);

        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};


const handleSave = async () => {
    try {
        const response = await api.put("/users/profile", editProfile);

        setProfile(response.data.user);
        setEditProfile(response.data.user);

        setIsEditing(false);
         toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile");
    }
};

 const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((prev) => ({
        ...prev,
        [name]: value,
    }));
};

    useEffect(() => {
    fetchProfile();
    }, []);

        if (loading) {
        return <p>Loading...</p>;
    }

   
    return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">

    <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
      👤 My Profile
    </h1>

    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

      {/* Profile Picture */}
     <div className="flex flex-col items-center mb-8">
  <img
    src={
      profile.profilePicture ||
      "https://via.placeholder.com/120?text=Profile"
    }
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow"
  />
</div>

      {/* Name */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Name
        </h3>

        {isEditing ? (
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            name="name"
            value={editProfile.name || ""}
            onChange={handleChange}
          />
        ) : (
          <p className="text-lg text-gray-800">{profile.name ||"Not Added"}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Email
        </h3>

        <p className="text-lg text-gray-800">{profile.email ||"Not Added"}</p>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Phone
        </h3>

        {isEditing ? (
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            name="phone"
            value={editProfile.phone || ""}
            onChange={handleChange}
          />
        ) : (
          <p className="text-lg text-gray-800">
            {profile.phone || "Not Added"}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Address
        </h3>

        {isEditing ? (
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
            name="address"
            value={editProfile.address || ""}
            onChange={handleChange}
          />
        ) : (
          <p className="text-lg text-gray-800">
            {profile.address || "Not Added"}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">

        {isEditing ? (
          <>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
              onClick={handleSave}
            >
              Save Changes
            </button>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
              onClick={() => {
                setEditProfile(profile);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}

      </div>

    </div>
  </div>
);
}
export default Profile;

