import React from 'react';
import '../More.css'; 

const More = () => {
  return (
    <>
       <p className='More-header1'>Find a topic</p>
    
    <div className="container mt-5">
 
       
      <div className="card-container">
   
     
        <div className="card">
          <img className="card-image" src=" https://pubs.acs.org/cms/10.1021/acs.chemrev.1c00377/asset/images/medium/cr1c00377_0015.gif"  alt="Card 1" />
          <div className="card-body">
            <h5 className="card-title">Card 1</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>

        <div className="card">
          <img  className=" card-image"src=" https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/marketing/global/images/applications/analytical-chemistry/nuclear-magnetic-resonance-diagram/nuclear-magnetic-resonance-diagram.jpg"  alt="Card 2" />
          <div className="card-body">
            <h5 className="card-title">Card 2</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>

        <div className="card">
          <img className=" card-image"src="https://www.ssi.shimadzu.com/sites/ssi.shimadzu.com/files/products/images/gc/fundamentals/gc-system-configuration.jpg"  alt="Card 3" />
          <div className="card-body">
            <h5 className="card-title">Card 3</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default More;
