import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../api/authApi";


export default function Profile() {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(user); // Start with context user

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token!);
        setProfile(data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        {profile?.profilePicture ? (
          <img
            src={profile.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Pic</span>
          </div>
        )}
        <p><strong>Name:</strong> {profile?.name}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Role:</strong> {profile?.role}</p>
      </div>
    </div>
  );
}
