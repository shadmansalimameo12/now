// Home page with tasks, features, ar typewriter effect
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Slider from '../components/Slider';
import TaskCard from '../components/TaskCard';
import { FaTasks, FaUsers, FaStar } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tasks fetch korsi (6 ta, deadline sort default)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          'https://server-ten-virid-49.vercel.app/api/tasks?limit=6&sort=deadline'
        );
        setTasks(response.data);
      } catch (error) {
        toast.error('Tasks load korte problem holo!');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Features data
  const features = [
    { icon: <FaTasks />, title: "Easy Task Management", description: "Post and track tasks easily." },
    { icon: <FaUsers />, title: "Skilled Freelancers", description: "Find verified professionals." },
    { icon: <FaStar />, title: "Quality Work", description: "Get the best talent." },
  ];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <Slider />
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
          {/* Typewriter effect add korsi */}
          <Typewriter
            words={['Featured Tasks', 'Find Work', 'Post Jobs']}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
        {loading ? (
          <div className="text-center p-4 text-gray-900 dark:text-gray-200">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-200">Why Choose TaskMarket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded text-gray-900 dark:text-gray-200">
                {feature.icon}
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-200">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded text-gray-900 dark:text-gray-200">
              <p className="italic">"TaskMarket helped me find a great developer!"</p>
              <p className="font-bold">- Sarah, Business Owner</p>
            </div>
            <div className="p-4 border rounded text-gray-900 dark:text-gray-200">
              <p className="italic">"I found consistent work on TaskMarket."</p>
              <p className="font-bold">- Michael, Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;