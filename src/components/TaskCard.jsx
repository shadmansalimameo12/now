// Single task card component
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaCalendarAlt, FaTag, FaDollarSign } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  // Date format korsi
  const formattedDate = new Date(task.deadline).toLocaleDateString();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-200">{task.title}</h3>
      <div className="space-y-2 text-gray-900 dark:text-gray-200">
        <div className="flex items-center">
          <FaTag className="mr-2" />
          <p>Category: {task.category}</p>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <p>Deadline: {formattedDate}</p>
        </div>
        <div className="flex items-center">
          <FaDollarSign className="mr-2" />
          <p>Budget: ${task.budget}</p>
        </div>
      </div>
      <Link
        to={`/task/${task._id}`}
        className="block mt-2 bg-blue-500 dark:bg-blue-600 text-white p-2 rounded text-center"
      >
        <FaInfoCircle className="inline mr-1" /> See Details
      </Link>
    </div>
  );
};

export default TaskCard;