// More.js

import React, { useEffect } from 'react';
import '../More.css';

const More = () => {
  useEffect(() => {
    const cardContainer = document.querySelector('.container');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cardContainer.classList.add('animate-cards');
        }
      });
    });

    observer.observe(cardContainer);

    return () => observer.disconnect(); // Cleanup when component unmounts
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
            <img className='card-img' src=' https://images.pexels.com/photos/9159068/pexels-photo-9159068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
              <h4 className='card-number'> 01</h4>
              <h5 className="card-title">Trending Quizzes</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
            <img className='card-img' src='https://img.freepik.com/free-photo/close-up-people-studying-together_23-2149204774.jpg' alt='' />
              <h4 className='card-number'> 02</h4>
              <h5 className="card-title"> Books & library</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <img className='card-img' src='https://st4.depositphotos.com/2783505/30337/i/450/depositphotos_303378166-stock-photo-female-teacher-learning-with-group.jpg ' alt='' />
              <h4 className='card-number'> 03</h4>
              <h5 className="card-title">Certified Bio-chemists</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
