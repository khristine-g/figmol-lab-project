import React from 'react';
import '../Footer.css';

const Footer = () => {
  return (
    <div className='footer-container'> 

    <div className='div1'>

        <h5 className='footer-header'>Headquarter</h5>
        <p className='footer-text'> 1800 dapibus a tortor pretium,<br></br>
           Integer nisl dui, ABC 12000</p>

           <p className='footer-text'> Copyright © 2024 Company</p>
           <p className='footer-text'> Design: Template Mo</p>
    </div>
    <div className='div2'>

        <h5 className='footer-header'>Contact Info</h5>

        <p className='footer-text'> +65 2244 1100, +66 1800 1100</p>
        <p className='footer-text'> hello@youremail.co</p>

        <h5 className='footer-header'>Quick Links </h5>
        <p className='footer-text'> Career Investor Terms & Conditions</p>
    </div>
    <div className='div3'>

        <h5 className='footer-header'> Newsletter Signup</h5>

        <form>
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
            <button type="submit" className="footer-btn">Send Message</button>



        </form>
    </div>
      
      
      
    </div>
  )
}

export default Footer
