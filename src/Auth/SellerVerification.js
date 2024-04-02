import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const SellerVerification = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, event) => {
        const { value } = event.target;
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        // Move to the next input field if a number is entered
        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission or validation
        // For now, just navigate to the next page
        navigate('/uploadvehicledetails');
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
                        {verificationCode.map((digit, index) => (
                            <div className="form-group" key={index}>
                                <input
                                    type="number"
                                    className="form-control py-3"
                                    placeholder=""
                                    value={digit}
                                    onChange={(e) => handleChange(index, e)}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    maxLength={1}
                                    min="0"
                                    max="9"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3">
                        <img src="../images/Arrow 1.png" alt="arrow-img" />
                    </button>
                    <div className="bottom-link pt-4 text-center">
                        <p>Didn't Receive an OTP? <a href="#" className="w-100 py-3">Resend OTP</a></p>
                    </div>
                </form>
            </div>
        </section>
    );
};
