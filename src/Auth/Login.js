import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
export const Login = () => {
const navigate = useNavigate();
const [submitted, setSubmitted] = useState(false);
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phonenumber, setPhoneNumber] = useState('');
const [postalcode, setPostalCode] = useState('');
const [city, setCity] = useState('');
const [firstNameError, setFirstNameError] = useState('');
const [lastNameError, setLastNameError] = useState('');
const [lastemailError, setLastEmailError] = useState('');
const [lastphonenumberError, setPhoneNumberError] = useState('');
const [lastpostalcodeError, setPostalCodeError] = useState('');
const [cityError, setCityError] = useState('');
const [errors, setErrors] = useState();
useEffect(() => {
const params = new URLSearchParams(window.location.search);
const vehicleId = params.get('Vehicle_Id');
if (vehicleId) {
// Store Vehicle_Id in sessionStorage
sessionStorage.setItem('Vehicle_Id', vehicleId);
}
}, []); // Run only once on component mount
const handleSignUp = async (event) => {
event.preventDefault();
// Reset all error messages
setFirstNameError('');
setLastNameError('');
setLastEmailError('');
setPhoneNumberError('');
setPostalCodeError('');
setCityError('');
// Check if any input field is empty
if (
firstName.trim() === '' ||
lastName.trim() === '' ||
email.trim() === '' ||
phonenumber.trim() === '' ||
postalcode.trim() === '' ||
city.trim() === ''
) {
// Set error messages for empty fields
setFirstNameError(firstName.trim() === '' ? 'First name cannot be empty' : '');
setLastNameError(lastName.trim() === '' ? 'Last name cannot be empty' : '');
setLastEmailError(email.trim() === '' ? 'Email cannot be empty' : '');
setPhoneNumberError(phonenumber.trim() === '' ? 'Phone Number cannot be empty' : '');
setPostalCodeError(postalcode.trim() === '' ? 'Postal Code cannot be empty' : '');
setCityError(city.trim() === '' ? 'City cannot be empty' : '');
// Exit the function early if any field is empty
return;
}
// If all input fields are filled, proceed with the API call
try {
const response = await api.post('/auth/seller/register', {
first_name: firstName,
last_name: lastName,
email: email,
phone: phonenumber,
postal_code: postalcode,
city,
});
setSubmitted(true);
sessionStorage.setItem('isNewUser', 'true');
setTimeout(() => {
navigate('/sellerin');
}, 3000);
} catch (error) {
console.error('Error occurred during registration:', error);
const errorMessage = error.response.data; // Log the error response
setErrors(errorMessage);
}
};
return (
<section className="seller-section">
   <div className="container">
      <div className="header-logo">
         <a href="/">
         <img src="images/logo.png" alt="logo" />
         </a>
      </div>
      <div className="seller-heading py-3">
         <h3 className="main-heading text-center">Seller Sign Up</h3>
      </div>
      {submitted && (
      <div className="alert alert-success" role="alert">
         Seller added successfully. 
      </div>
      )}
      <form onSubmit={handleSignUp}>
         <div className="form-row">
            <div className="form-group col-md-6">
               <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               />
               {firstNameError && 
               <div className="text-danger">{firstNameError}</div>
               }
            </div>
            <div className="form-group col-md-6">
               <input type="text" 
                  className="form-control"
                  placeholder="Last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
               />
               {lastNameError && 
               <div className="text-danger">{lastNameError}</div>
               }
            </div>
         </div>
         <div className="form-group">
            <input type="email" 
               className="form-control"
               id="inputEmail4"
               placeholder="Email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            {lastemailError && 
            <div className="text-danger">{lastemailError}</div>
            }
         </div>
         <div className="form-group">
            <input type="number" 
               className="form-control"
               id="inputphone" 
               placeholder="Phone number"
               value={phonenumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {lastphonenumberError && 
            <div className="text-danger">{lastphonenumberError}</div>
            }
         </div>
         <div className="form-group">
            <input type="text"
               className="form-control"
               id="inputpostalcode" 
               placeholder="Postal Code"
               value={postalcode}
               onChange={(e) => setPostalCode(e.target.value)}
            />
            {lastpostalcodeError && 
            <div className="text-danger">{lastpostalcodeError}</div>
            }
         </div>
         <div className="form-group">
            <input type="text" 
               className="form-control" 
               id="inputCity"
               placeholder="City"
               value={city}
               onChange={(e) => setCity(e.target.value)}
            />
            {cityError && 
            <div className="text-danger">{cityError}</div>
            }
         </div>
         {errors && Object.keys(errors).length > 0 && (
         <div className="error-message text-danger">
            {Object.keys(errors).map((key, index) => (
            <p class="text-danger" key={index}>{errors[key]}</p>
            ))}
         </div>
         )}
         <button type="submit" className="btn btn-primary w-100 py-3">Sign Up</button>
         <div className="bottom-link pt-4 text-center">
            <p>Already have an account? <a href="/sellerin" className="w-100 py-3">Sign In</a></p>
         </div>
      </form>
   </div>
</section>
);
};