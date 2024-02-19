import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className='home-background'>
    <div className='home-body'>
      <img
        className="home-img"
        src="https://wallpapers.com/images/hd/minimalistic-cyan-chemistry-lab-eoiujag5rlfbi5hm.jpg"
        alt="research-img"
      />
      <div className="home-text">
        <h1>FIGMOL LAB</h1>
        <h1 className='home-header'>Test your knowledge</h1>
        <p>
          Test your knowledge with our quizzes! Click the button below to start.
        </p>
        <Link to="/quiz" className="btn btn-primary">
          Go to Quizzes
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
