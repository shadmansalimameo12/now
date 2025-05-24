// User er posted tasks show korbo
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import { FaEdit, FaTrash, FaGavel } from 'react-icons/fa';

const MyPostedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tasks fetch korsi user er email diye
  useEffect(() => {
    if (auth.currentUser) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `https://server-ten-virid-49.vercel.app/api/tasks?userEmail=${auth.currentUser.email}`
          );
          setTasks(response.data);
        } catch (error) {
          toast.error('Tasks load korte problem holo!');
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, []);

  // Task delete korar function
  const handleDelete = async (id) => {
    if (window.confirm('Task delete korbe?')) {
      try {
        await axios.delete(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success('Task delete hoye gese!');
      } catch (error) {
        toast.error('Task delete korte problem holo!');
      }
    }
  };

  // Date format korar function
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Posted Tasks</h2>
      {loading ? (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
          <p>Loading...</p>
        </div>
      ) : tasks.length > 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Deadline</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.category}</td>
                  <td className="p-2">{formatDate(task.deadline)}</td>
                  <td className="p-2 flex space-x-2">
                    <Link to={`/update-task/${task._id}`} className="btn btn-sm bg-blue-500 text-white">
                      <FaEdit /> Update
                    </Link>
                    <button onClick={() => handleDelete(task._id)} className="btn btn-sm bg-red-500 text-white">
                      <FaTrash /> Delete
                    </button>
                    <Link to={`/bids/${task._id}`} className="btn btn-sm bg-green-500 text-white">
                      <FaGavel /> View Bids
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-4">
          <p>No tasks posted yet.</p>
          <Link to="/add-task" className="btn bg-blue-500 text-white mt-2">Add Task</Link>
        </div>
      )}
    </div>
  );
};

export default MyPostedTasks;