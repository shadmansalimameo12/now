// Task er bids show korar page
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaGavel } from 'react-icons/fa';

const ViewBids = () => {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Task and bids fetch korsi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/tasks/${id}`);
        const bidsResponse = await axios.get(`https://server-ten-virid-49.vercel.app/api/bids?taskId=${id}`);
        setTask(taskResponse.data);
        setBids(bidsResponse.data);
      } catch (error) {
        toast.error('Bids load korte problem holo!');
        if (error.response?.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaGavel className="mr-2" /> Bids for {task?.title}
        </h2>
        <div className="bg-white p-4 rounded shadow">
          {bids.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">User Email</th>
                  <th className="text-left p-2">Bid Date</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid._id}>
                    <td className="p-2">{bid.userEmail}</td>
                    <td className="p-2">{new Date(bid.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center p-4">No bids yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBids;