import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import axios from 'axios';
export const SellerIn = () => {
   const navigate = useNavigate();
   const [phonenumber, setPhoneNumber] = useState('');
   const [lastphonenumberError, setPhoneNumberError] = useState('');
   const [errors, setErrors] = useState({});
   const [submitted, setSubmitted] = useState(false);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const vehicleId = params.get('Vehicle_Id');
      if (vehicleId) {
      // Store Vehicle_Id in sessionStorage 
      sessionStorage.setItem('Vehicle_Id', vehicleId);
      }
   }, []); // Run only once on component mount

   const handlePhoneNumberChange = async (event) => {
      const phoneNumberValue = event.target.value;
      setPhoneNumber(phoneNumberValue);
   };
   
   const handleSignIn = async (event) => {
      event.preventDefault();
      if (phonenumber.trim() === '') {
         setPhoneNumberError('Phone Number cannot be empty');
      } else {
      setPhoneNumberError('');
         sessionStorage.setItem('phoneNumber', phonenumber);
      }
      if (phonenumber.trim() !== '') {
         try {
               const response = await api.post('/auth/seller/login', {
               phone: phonenumber,
            });
            if(response.data.status == true) {
               navigate('/sellerverification');
               setSubmitted(true);
               sessionStorage.setItem('isNewUser', 'true');
            }
            else {
               const otpmessage = 'Otp Not Sent please try again later';
               setErrors({ message: otpmessage });
            }
         } catch (error) {
            if (error.response && error.response.status === 500) {
               // Internal server error
               const errorMessage = 'Wrong Credentials';
               setErrors({ message: errorMessage });
               } else {
               // Other errors
               setErrors(error.response?.data?.errors || {});
            }
         }
      }
   };
return (
      <section class="seller-section seller-signin">
         <div class="container">
            <div class="header-logo">
               <a href="/">
               <img src="https://seller.carchaser.ca/images/logo.png" alt="logo" />
               </a>
            </div>
            <div class="seller-heading text-center py-4">
               <h3 class="main-heading">seller Sign-In </h3>
               <p>Welcome to Car Chaser</p>
            </div>
            <form onSubmit={handleSignIn}>
               <div class="form-group">
                  <input 
                     type="number" 
                     class="form-control py-3" 
                     id="inputphone" 
                     placeholder="Phone number" 
                     value={phonenumber}
                     onChange={handlePhoneNumberChange}
                     />
                  {lastphonenumberError && 
                  <div className="text-danger">{lastphonenumberError}</div>
                  }
               </div>
               {errors && errors.message && (
               <div className="error-message">
                  <p class="text-danger">{errors.message}</p>
               </div>
               )}
               <button type="submit" className="btn btn-primary w-100 py-3">Sign In</button>
               <div class="bottom-link pt-4 text-center">
                  <p> Don't have an account?  <a href="/" class="w-100 py-3">Sign Up</a></p>
               </div>
            </form>
         </div>
      </section>
   );
};