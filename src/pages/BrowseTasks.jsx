// Browse Tasks page with bid count sorting
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('deadline'); // Default sort by deadline
  const navigate = useNavigate();

  // Tasks fetch korsi with sorting option
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://server-ten-virid-49.vercel.app/api/tasks?sort=${sortBy}`
        );
        setTasks(response.data);
      } catch (error) {
        toast.error('Tasks load korte problem holo!');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [sortBy]);

  // Task click korle details page e jabo
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Browse Tasks</h2>
        <div className="mb-4">
          <label className="mr-2 text-gray-900 dark:text-gray-200">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="deadline">Deadline</option>
            <option value="bidsCount">Highest Bids</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer"
              onClick={() => handleTaskClick(task._id)}
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">{task.title}</h2>
              <p className="text-gray-900 dark:text-gray-200">Category: {task.category}</p>
              <p className="text-gray-900 dark:text-gray-200">Budget: ${task.budget}</p>
              <p className="text-gray-900 dark:text-gray-200">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <p className="text-gray-900 dark:text-gray-200">{task.description.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseTasks;