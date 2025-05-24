// Login page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Email login handle korsi
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Login korte problem holo!');
    }
  };

  // Google login handle korsi
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google diye login hoye gese!');
      navigate('/');
    } catch (error) {
      toast.error('Google login korte problem holo!');
    }
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            <FaEnvelope className="inline mr-1" /> Login
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 rounded w-full mt-2">
          <FaGoogle className="inline mr-1" /> Login with Google
        </button>
        <p className="text-center mt-2">
          No account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;