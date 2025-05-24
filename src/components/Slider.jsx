// Slider component for hero section
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaUsers, FaTasks, FaHandshake } from 'react-icons/fa';

const Slider = () => {
  const slides = [
    { id: 1, text: 'Find Freelancers', bg: 'bg-blue-500', icon: <FaUsers className="text-3xl" /> },
    { id: 2, text: 'Post Tasks', bg: 'bg-green-500', icon: <FaTasks className="text-3xl" /> },
    { id: 3, text: 'Connect with Pros', bg: 'bg-purple-500', icon: <FaHandshake className="text-3xl" /> },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Previous slide e jabo
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Next slide e jabo
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-64 overflow-hidden">
      <div className={`h-full flex items-center justify-center text-white ${slides[currentSlide].bg}`}>
        <div className="text-center">
          {slides[currentSlide].icon}
          <h2 className="text-2xl font-bold">{slides[currentSlide].text}</h2>
          <p>Join TaskMarket today!</p>
        </div>
      </div>
      <button onClick={prevSlide} className="absolute left-2 top-1/2 bg-gray-800 text-white p-2 rounded">
        <FaArrowLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 bg-gray-800 text-white p-2 rounded">
        <FaArrowRight />
      </button>
      <div className="absolute bottom-2 flex justify-center space-x-2 w-full">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;