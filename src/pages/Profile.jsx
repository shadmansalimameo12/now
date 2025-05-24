// User profile show korar page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { FaUserCircle, FaEnvelope, FaUser } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // User check korsi
  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      setUser(auth.currentUser);
    }
  }, [navigate]);

  if (!user) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
          <div className="flex items-center mb-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="h-12 w-12 rounded-full mr-2" />
            ) : (
              <FaUserCircle className="h-12 w-12 mr-2" />
            )}
            <div>
              <h3 className="text-lg font-bold">{user.displayName || 'User'}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <input
                type="text"
                value={user.displayName || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                value={user.email || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;