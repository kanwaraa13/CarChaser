import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const SellerIn = () => {
    const navigate = useNavigate();
    const [phonenumber, setPhoneNumber] = useState('');
    const [lastphonenumberError, setPhoneNumberError] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();

    if (phonenumber.trim() === '') {
        setPhoneNumberError('Phone Number cannot be empty');
    } else {
        setPhoneNumberError('');
    }
    if (phonenumber.trim() !== '') {
        // Navigate to the desired page
        navigate('/sellerverification');
    }

}
return (

    <section class="seller-section seller-signin">
    <div class="container">
       <div class="header-logo">
        <a href="/">
            <img src="images/logo.png" alt="logo" />
         </a>
       </div>
       <div class="seller-heading text-center py-4">
          <h3 class="main-heading">seller Sign-In </h3>
          <p>Welcome to Car Chaser</p>
       </div>
       <form onSubmit={handleSignIn}>
          <div class="form-group">      
             <input type="number" class="form-control py-3" id="inputphone" placeholder="Phone number" 
               value={phonenumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
             />
             {lastphonenumberError && <div className="text-danger">{lastphonenumberError}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 py-3">Sign In</button>
          <div class="bottom-link pt-4 text-center">
             <p> Don't have an account?  <a href="seller-sign-up.html" class="w-100 py-3">Sign Up</a></p>
          </div>
       </form>
    </div>
 </section>
    );
};