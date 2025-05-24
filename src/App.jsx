// Main app component with routing
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

// Components import korsi
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import BrowseTasks from './pages/BrowseTasks';
import MyPostedTasks from './pages/MyPostedTasks';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateTask from './pages/UpdateTask';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Terms from './pages/Terms';
import ViewBids from './pages/ViewBids';

// Private route component for protected pages
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User login check korsi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Loading hole spinner show korbo
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // User na thakle login page e pathabo
  return user ? children : <Navigate to="/login" />;
};

function App() {
  // Default light theme set korsi
  useEffect(() => {
    document.documentElement.className = 'light';
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse-tasks" element={<BrowseTasks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
            <Route path="/my-posted-tasks" element={<PrivateRoute><MyPostedTasks /></PrivateRoute>} />
            <Route path="/task/:id" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
            <Route path="/update-task/:id" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/bids/:id" element={<PrivateRoute><ViewBids /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;