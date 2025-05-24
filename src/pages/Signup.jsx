// Signup page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLink, FaLock, FaGoogle } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const navigate = useNavigate();

  // Form input handle korsi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email signup handle korsi
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(formData.password)) {
      toast.error('Password e uppercase, lowercase, and 6+ chars lagbe!');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name, photoURL: formData.photoURL });
      toast.success('Signup hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Signup korte problem holo!');
    }
  };

  // Google signup handle korsi
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google diye signup hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Google signup korte problem holo!');
    }
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Photo URL</label>
            <div className="flex items-center">
              <FaLink className="mr-2" />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter your photo URL"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <div className="flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Signup
          </button>
        </form>
        <button onClick={handleGoogleSignup} className="bg-red-500 text-white p-2 rounded w-full mt-2">
          <FaGoogle className="inline mr-1" /> Signup with Google
        </button>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;