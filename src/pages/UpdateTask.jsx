// Update Task page with responsive form
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { FaTasks, FaListAlt, FaAlignLeft, FaCalendarAlt, FaDollarSign, FaEnvelope, FaUser } from 'react-icons/fa';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });
  const [loading, setLoading] = useState(true);

  // User check ar task fetch korsi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`);
        setFormData(response.data);
      } catch (error) {
        toast.error('Task load korte problem holo!');
        navigate('/my-posted-tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();

    return () => unsubscribe();
  }, [id, navigate]);

  // Form data change handle korsi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit korsi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`, {
        ...formData,
        userEmail: user.email,
        userName: user.displayName,
      });
      toast.success('Task update hoye gese!');
      navigate('/my-posted-tasks');
    } catch (error) {
      toast.error('Task update korte problem holo!');
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="container mx-auto max-w-full sm:max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Update Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Task Title</label>
            <div className="flex items-center">
              <FaTasks className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Category</label>
            <div className="flex items-center">
              <FaListAlt className="mr-2 text-gray-900 dark:text-gray-200" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Description</label>
            <div className="flex items-center">
              <FaAlignLeft className="mr-2 text-gray-900 dark:text-gray-200" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="border p-2 w-full rounded h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Deadline</label>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Budget</label>
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Your Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Your Name</label>
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded w-full">
            <FaTasks className="inline mr-1" /> Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;