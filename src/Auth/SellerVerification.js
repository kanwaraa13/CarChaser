import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export const SellerVerification = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
      const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
      if (storedPhoneNumber) {
        // Optionally, you can set the phone number to state here if needed
      }
    }, []);

    const handleChange = (index, event) => {
      const { value } = event.target;
      const newValue = value.length > 0 ? value.charAt(value.length - 1) : '';
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = newValue;
      setVerificationCode(newVerificationCode);
      if (newValue !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullVerificationCode = verificationCode.join('');
        // Check if all fields are filled
        if (verificationCode.some(code => code === '')) {
          setErrors('All fields must be filled.');
          return;
        }
        if (fullVerificationCode.trim()) {
          try {
            const response = await api.post('/auth/seller/verifylogin', {
              phone: sessionStorage.getItem('phoneNumber'),
              otp: fullVerificationCode,
            });
            if (response.data.status === true) {
                const UserID = response.data.UserID; // Assuming UserID is directly available in response.data
                sessionStorage.setItem('user_id', UserID);
                const isNewUser = sessionStorage.getItem('isNewUser');
                navigate('/uploadvehicledetails');
            } else {
              setErrors('Verification code does not match.');
            }
          } catch (error) {
          
            setErrors(error.response?.data?.errors || 'Wrong verification code.');
          }
        } else {
          setErrors('Verification code is empty.');
        }
    };

  return (
    <section className="seller-section Verification">
      <div className="container">
        <div className="header-logo">
          <a href="/">
            <img src="images/logo.png" alt="logo" />
          </a>
        </div>
        <div className="seller-heading text-center py-4">
          <h3 className="main-heading">Car Chaser</h3>
          <p>Enter Verification Code</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="Verification-input">
            {[...Array(6)].map((_, index) => (
              <div className="form-group" key={index}>
                <input
                  type="number"
                  className="form-control py-3 mr-4"
                  placeholder=""
                  value={verificationCode[index]}
                  onChange={(event) => handleChange(index, event)}
                  ref={(input) => (inputRefs.current[index] = input)}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary w-100 py-3 ml-5 text-center">
            <img src="../images/Arrow 1.png" alt="arrow-img" />
          </button>
          <div className="container text-center mt-3">
            <div className="row">
              <div className="col-md-12">
                <p className="text-danger">{errors}</p>
              </div>
            </div>
          </div>
          <div className="bottom-link pt-4 text-center">
            <p>
              Didn't receive an OTP? <a href="#" className="w-100 py-3">Resend OTP</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
