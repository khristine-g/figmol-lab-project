import React from 'react';
import More from './More';
 import Discover from './Discover';
 import Contact from './Contact';
 import Footer from './Footer';
import '../Home.css';


const Home = () => {
  return (
    <>
    <div id="app">
      <div className="title">
        <div className="title-inner">
          <div className="cafe">
            <div className="cafe-inner">Figmol</div>
          </div>
          <div className="mozart">
            <div className="mozart-inner">Lab</div>
          </div>
        </div>
      </div>

      <div className="image">
        <img src='https://img.freepik.com/premium-photo/women-students-library-with-laptop-studying-exam-research-project-with-education-young-female-people-study-group-search-internet-pc-learning-university-campus_590464-188334.jpg ' alt='' />
      </div>

      <a href="https://youtu.be/mBY62jtbMYM" target="_bl" data-keyframers-credit style={{ color: '#000' }}>Hey</a>
      <script src="https://codepen.io/shshaw/pen/QmZYMG.js"></script>
    </div>
    <More />
          <Discover id=' about' />
          <Contact id='contact' />
          <Footer />

          </>
  );
};

export default Home;




// import React from 'react';
// import More from './More';
// import Discover from './Discover';
// import Contact from './Contact';
// import Footer from './Footer';
// import '../Home.css';

// const Home = () => {
//   return (
//     <>
//       <div className='home-container'>
//         <div>
//           <div className='title'>
//             <div className='title-inner'>
//               <div className='cafe'>
//                 <div className='cafe-inner'>Figmol</div>
//               </div>
//               <div className='mozart'>
//                 <div className='mozart-inner'>Lab</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='image'>

//         <img src='https://images.unsplash.com/photo-1616362355051-6a9f8c434fff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzE0MTYzNQ&ixlib=rb-1.2.1&q=80&w=800&h=600' alt='' />
//         </div>
//       </div>
//       <More />
//       <Discover id=' about' />
//       <Contact id='contact' />
//       <Footer />
//     </>
//   );
// };

// export default Home;
