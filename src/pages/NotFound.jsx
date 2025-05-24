// 404 Not Found page
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow text-center">
        <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold mb-2">404 - Page Not Found</h2>
        <p className="mb-4">Page ta khuje pai nai!</p>
        <Link to="/" className="bg-blue-500 text-white p-2 rounded">
          <FaHome className="inline mr-1" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;