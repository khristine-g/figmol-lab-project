import React from 'react';
import '../Contact.css'; 

const Contact = () => {
  return (
    <div  id="contact"className="contact-container">
      <div className="grid-container">
        {/* Div with an image */}
       

        {/* Div with a contact form */}
        <div className="form-container">
            <h3 className='contact-header'>Contact Us</h3>
            <p className='contact-text'>Send us a message</p>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"></label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label"></label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div className="image-container">
          <img  className='contact-img'src="https://www.aier.org/wp-content/uploads/2022/12/graduationcaps-1200x1200-cropped.jpg" alt="Contact Img" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
