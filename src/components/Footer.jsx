// Footer component
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p className="mb-2">
        Contact: <a href="mailto:support@taskmarket.com" className="text-blue-500">support@taskmarket.com</a>
      </p>
      <p className="mb-2">
        <a href="/terms" className="text-blue-500">Terms & Conditions</a>
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://www.facebook.com/taskmarket" className="text-2xl">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com/taskmarket" className="text-2xl">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/company/taskmarket" className="text-2xl">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;