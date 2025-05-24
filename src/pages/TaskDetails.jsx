// Task details page with bids count
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import { FaInfoCircle, FaSpinner } from 'react-icons/fa';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [bidsCount, setBidsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Task ar bids count fetch korsi
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`);
        const bidsResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}/bids-count`);
        setTask(taskResponse.data);
        // Extract bidsCount from response
        const count = typeof bidsResponse.data === 'object' && bidsResponse.data.message
          ? parseInt(bidsResponse.data.message.match(/\d+/)[0]) || 0
          : 0;
        setBidsCount(count);
      } catch (error) {
        toast.error('Task load korte problem holo!');
        if (error.response?.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, navigate]);

  // Bid place korsi ar updated count fetch korsi
  const handleBid = async () => {
    try {
      await axios.post('https://server-ten-virid-49.vercel.app/api/bids', {
        taskId: id,
        userEmail: auth.currentUser.email,
      });
      const bidsResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}/bids-count`);
      const count = typeof bidsResponse.data === 'object' && bidsResponse.data.message
        ? parseInt(bidsResponse.data.message.match(/\d+/)[0]) || 0
        : 0;
      setBidsCount(count);
      toast.success('Bid place hoye gese!');
    } catch (error) {
      toast.error('Bid place korte problem holo!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Task Details</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-200">You bid for {bidsCount} opportunities.</p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">{task.title}</h3>
          <p className="text-gray-900 dark:text-gray-200">Category: {task.category}</p>
          <p className="text-gray-900 dark:text-gray-200">Description: {task.description}</p>
          <p className="text-gray-900 dark:text-gray-200">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
          <p className="text-gray-900 dark:text-gray-200">Budget: ${task.budget}</p>
          <p className="text-gray-900 dark:text-gray-200">Posted by: {task.userName} ({task.userEmail})</p>
          <button
            onClick={handleBid}
            className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded mt-2"
          >
            <FaInfoCircle className="inline mr-1" /> Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;