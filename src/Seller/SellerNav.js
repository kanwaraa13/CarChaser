import React from 'react';
import { useNavigate } from 'react-router-dom';
export const SellerNav = () => {
   const navigate = useNavigate();
   const handleSignOut = () => {
      // Remove the sessionStorage items
      sessionStorage.removeItem('Vehicle_Id');
      sessionStorage.removeItem('user_id');
   
        
      
      
      // Perform sign-out actions here (if any)
      // For now, just navigate to the sign-in page
     navigate("/sellerin");
    };
  
  return (
    <section className="car-details">
        <header className="py-3">
            <div className="container">
               <nav className="navbar navbar-expand-lg navbar-light p-0">
                  <a className="navbar-brand" href="https://carchaser.ca/">
                  <img src="../images/logo.png" alt="logo-img"/>
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                     <ul className="navbar-nav">
                        <li className="nav-item">
                           <a className="nav-link active" href="https://carchaser.ca/">Sell My Car <span className="sr-only">(current)</span> </a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link" href="/view-posts">view posts</a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link" href="/booked-inspection-appointments">Booked Inspection Appointments</a>
                        </li>
                     </ul>
                  </div>
                  <div className="signout-btn">
                   
                     <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
                  </div>
               </nav>
            </div>
         </header>
      </section>
  );
};
