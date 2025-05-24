// Terms and Conditions page
import { FaFileContract } from 'react-icons/fa';

const Terms = () => {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaFileContract className="mr-2" /> Terms & Conditions
        </h2>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">1. Introduction</h3>
          <p className="mb-4">Welcome to TaskMarket. By using our platform, you agree to these terms.</p>
          <h3 className="text-lg font-bold mb-2">2. User Responsibilities</h3>
          <p className="mb-4">Provide accurate info and follow platform rules.</p>
          <h3 className="text-lg font-bold mb-2">3. Task Posting</h3>
          <p className="mb-4">Tasks must follow our policies. We are not responsible for disputes.</p>
          <h3 className="text-lg font-bold mb-2">4. Payments</h3>
          <p className="mb-4">Payments are secure. Users handle their own taxes.</p>
          <p>
            Contact <a href="mailto:support@taskmarket.com" className="text-blue-500">support@taskmarket.com</a> for details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;