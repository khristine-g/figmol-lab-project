import React from 'react';
import { Link } from 'react-router-dom';
import More from './More';
import '../Home.css';

const Home = () => {
  return (
    <>
    <div className='home-container'>
    
    <div className='home-body'>

      <h1 className='home-header'>Hello there,welcome to Figmol</h1>

      <p className='home-content'>We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.</p>
      <p className='home-content'>We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.</p>
      <p className='home-content'>We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.We are your website for all your biochemistry needs.
      We have a team of amazing biochemists.</p>

      <Link className='title-link' to="/quizzes/titles">See More</Link>
     
       

      
      </div>
      <div>
      <img className='home-img'src='https://img.freepik.com/premium-vector/collection-colored-thin-icon-learning-subject-book-graduated-hat-learning-education-concept-vector-illustration_168824-141.jpg' alt='education-img'/>

      {/* <img src = " https://i0.wp.com/www.differencebetween.com/wp-content/uploads/2011/08/Difference-Between-School-and-Education_Education.jpg"alt="education-img" /> */}
      </div>
    </div>

    <More />

  

    </>
    
  );
};

export default Home;
