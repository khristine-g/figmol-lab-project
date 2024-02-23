import React, { useState, useEffect } from 'react';
import More from './More';
import Discover from './Discover';
import '../Home.css';


const Home = () => {
  const images = [
    {
      src: 'https://www.uniservitate.org/wp-content/uploads/2021/04/identify-a-service-learning-experience.jpg',
      text: 'Education is the key to success.',
    },
    {
      src: 'https://wpvip.edutopia.org/wp-content/uploads/2022/12/2BN341F-crop.jpg',
      text: 'Continuous learning leads to growth.',
    },
    {
      src: ' https://www.turnitin.com/assets/images/resources/intro-images/all-the-turnitin-feedback-studio-features-and-resources-to-increase-student-learning-academic-integrity-plagiarism.png',
      text: 'Empower yourself through knowledge.',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change 5000 to the desired time interval in milliseconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className='home-container'>
        <div>
          <img className='home-img' src={images[currentImageIndex].src} alt='education-img' />
          <p className='image-text'>{images[currentImageIndex].text}</p>
        
        </div>
      </div>
      <More />
      <Discover />
    </>
  );
};

export default Home;
