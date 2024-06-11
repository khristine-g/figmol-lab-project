import React from 'react';
import More from './More';

import Contact from './Contact';
import Footer from './Footer';
import '../Home.css'; 
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <div className="home">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RE4CA2I-Panel03-FeaturePriority-3Things-1-feature?scl=1"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First Slide Label</h3>
              <p>Some description for the first slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src=" https://blog.planbook.com/wp-content/uploads/2023/08/PLA443-feature-image-girl-with-headphones-and-laptop-writing-in-book.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second Slide Label</h3>
              <p>Some description for the second slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://potomac.edu/wp-content/uploads/2022/08/why-education-is-important-in-our-life-scaled-e1661154967268.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third Slide Label</h3>
              <p>Some description for the third slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <More />
      
      <Contact id="contact" />
      <Footer />
    </>
  );
};

export default Home;


