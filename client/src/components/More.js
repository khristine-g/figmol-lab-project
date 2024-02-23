import React from 'react';
import '../More.css';

const More = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card">
            
            <div className="card-body">
            <h4 className='card-number'> 01</h4>
              <h5 className="card-title">Trending Quizzes</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor 
              incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card">
           
            <div className="card-body">
            <h4 className='card-number'> 02</h4>
              <h5 className="card-title"> Books & library</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor
               incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card">
        
            <div className="card-body">
              <h4 className='card-number'> 03</h4>
              <h5 className="card-title">Certified Bio-chemists</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor
               incididunt ut labore et dolore magna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;


