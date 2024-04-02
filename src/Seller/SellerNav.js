import React from 'react';

export const SellerNav = () => {
  return (
    <section className="car-details">
        <header className="py-3">
            <div className="container">
               <nav className="navbar navbar-expand-lg navbar-light p-0">
                  <a className="navbar-brand" href="#">
                  <img src="../images/logo.png" alt="logo-img"/>
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                     <ul className="navbar-nav">
                        <li className="nav-item">
                           <a className="nav-link active" href="/carvalue">Sell My Car <span className="sr-only">(current)</span> </a>
                        </li>
                        <li className="nav-item">
                           <a className="nav-link" href="/view-posts">view posts</a>
                        </li>
                     </ul>
                  </div>
                  <div className="signout-btn">
                     <a href="/" className="btn btn-primary"> Sign Out</a>
                  </div>
               </nav>
            </div>
         </header>
      </section>
  );
};
