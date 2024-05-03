import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import axios from 'axios';

function generateRandomText(length) {
    const characters = '123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

export const SellerIn = () => {
    const navigate = useNavigate();
    const [phonenumber, setPhoneNumber] = useState('');
    const [lastphonenumberError, setPhoneNumberError] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('Car Chaser OTP');
    const [from, setFrom] = useState('CarChaser@gmail.com');
    const randomText = generateRandomText(6);
    const message = "Your Car Chaser OTP is: "+randomText+" <br><br>Best Regards: <br>Car Chaser.";
    
    const handlePhoneNumberChange = async (event) => {
        const phoneNumberValue = event.target.value;
        setPhoneNumber(phoneNumberValue);
        if (phoneNumberValue.length === 10) {
        try {
            const response = await api.get(`/seller/sellerlist_byphone/${phoneNumberValue}`);
            setEmail(response.data.Seller_Email);
        } catch (error) {
            console.error('Error occurred while fetching seller list by phone number:', error);
        }
    }
    };

    const handleSignIn = async (event) => {
         event.preventDefault();

        if (phonenumber.trim() === '') {
            setPhoneNumberError('Phone Number cannot be empty');
        } else {
            setPhoneNumberError('');
            console.log('Phone number:', phonenumber); // Log phone number
            sessionStorage.setItem('phoneNumber', phonenumber);
            console.log('Stored in sessionStorage:', sessionStorage.getItem('phoneNumber')); // Log sessionStorage item
        }

        if (phonenumber.trim() !== '') {
            try {
                const response = await api.post('/auth/seller/login', {
                    phone: phonenumber,
                    randomText: randomText,

                });
                const emailresponse = await axios.post('https://seller.carchaser.ca/email.php', {
                        to: email,
                        subject: subject,
                        message: message,
                        from: from,
                });
        
                console.log('Registration successful:', response.data);
                console.log('email mesage successful:', emailresponse);
                navigate('/sellerverification');
                setSubmitted(true);
                sessionStorage.setItem('isNewUser', 'true');
                
            } catch (error) {
                console.error('Error occurred during registration:', error);
                console.error('Response from server:', error.response); // Log the error response
            
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
                        <img src="images/logo.png" alt="logo" />
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
                        {lastphonenumberError && <div className="text-danger">{lastphonenumberError}</div>}
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
