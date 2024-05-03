import React, { useState, useEffect } from 'react';
import { SellerNav } from './SellerNav';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api'; 
export const CarSellAppointment = () => {
   const navigate = useNavigate();
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [address, setAddress] = useState('');
   const [agents, setAgents] = useState([]);
   const [transmissionType, setTransmissionType] = useState('');
   const [selectedAgentId, setSelectedAgentId] = useState('');
   const [availableDates, setAvailableDates] = useState([]);
   const [selectedTime, setSelectedTime] = useState('');
   const [slots, setSlots] = useState([]);
   const [successMessage, setSuccessMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDatesFromApi, setAvailableDatesFromApi] = useState([]);

   useEffect(() => {
      const mode = sessionStorage.getItem('mode');
      const vehicleId = sessionStorage.getItem('Vehicle_Id');

      console.log('vehicleId:', vehicleId);
     console.log(mode)
      fetchAgentList();
      fetchAvailableDates();
   }, []);
   const [firstCheckbox, setFirstCheckbox] = useState('');
   const [secondCheckbox, setSecondCheckbox] = useState('');
   
   const fetchAvailableDates = async () => {
  try {
	   //const vehicleId = sessionStorage.getItem('Vehicle_Id');
    const vehicleId = 164;
    const response = await api.get(`/seller/getagentscalender/${vehicleId}`);
    console.log(response.data.Agents_Date);
    if (Array.isArray(response.data.Agents_Date)) {
      const dates = response.data.Agents_Date.map(dateStr => {
        const [year, month, day] = dateStr.split('-');
        return new Date(year, month - 1, day); // Months are zero-based
      });
      setAvailableDatesFromApi(dates);
    } else {
      console.error('Invalid data format:', response.data.Agents_Date[0].Calendar_Date);
      setAvailableDatesFromApi([]);
    }
  } catch (error) {
    console.error('Error fetching agent calendar:', error);
  }
};


  
  const handleDateSelection = async (date, e) => {
    setSelectedDate(date);
	
	const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
  const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
  const selectedDateString = `${year}-${month}-${day}`;
   setDate(selectedDate); // Update state with selected date
 
   try {
     const response = await api.get(`/seller/generate-slots/${selectedDateString}`);
     console.log('time slots:', response.data.slots); // Log the response data
 
     // Assuming `slots` is set in the state
     setSlots(response.data.slots);
 
     // Optionally, if you want to set the first time slot as the selected time by default
     if (response.data.slots.length > 0) {
       setSelectedTime(`${response.data.slots[0].time}-${response.data.slots[0].Agent_id}`);
     }
 
     // Process the response data as needed
   } catch (error) {
     console.error('Error fetching slots:', error);
   }
	
    // Handle date selection here
  };

const isDateDisabled = ({ date }) => {
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return !availableDatesFromApi.some(availableDate => {
      const availableDateString = `${availableDate.getDate()}-${availableDate.getMonth() + 1}-${availableDate.getFullYear()}`;
      return availableDateString === dateString;
    });
  };


  const handleSubmit = async (event) => 
  {event.preventDefault();
   try {
      const sessionId = sessionStorage.getItem('Vehicle_Id');
      console.log(sessionId)
      const selectedDate = new Date(date);
      const timeComponents = selectedTime.split(' '); // Split the time string into hours and minutes
      let [hours, minutes] = timeComponents[0].split(':');
      hours = parseInt(hours);
      if (timeComponents[1] === 'PM' && hours !== 12) {
        hours += 12; // Add 12 hours if it's PM and not already 12 PM
      } else if (timeComponents[1] === 'AM' && hours === 12) {
        hours = 0; // Convert 12 AM to 0 hours
      }
      selectedDate.setHours(hours, minutes);
  
      // Format the selected date and time
      const formattedDateTime =
      `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()} ` +
      `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}:${String(selectedDate.getSeconds()).padStart(2, '0')}`;
      const response = await api.post('/seller/bookinspection', {
         Vehicle_Id: sessionId,
         Agent_Id: selectedAgentId,
         Appt_DateTime: formattedDateTime ,
         Transmission_Type: transmissionType,
         Address: address,
      });
      console.log('Submit', response.data);
      setSuccessMessage("Your Appointment is Booked Successfully");
      setTimeout(() => {
         navigate('/experience-seamless');
       }, 3000);
   } catch (error) {
      console.error('Error Post :', error);
   }
};

   const fetchAgentList = async () => {
      try {
         const response = await api.get('/agent/agentlist');
         console.log('Response data:', response.data); // Log the response data
         const data = response.data.Agent.map(agent => ({
            id: agent.Agent_Id,
            name: agent.Agent_Fname
         }));
         setAgents(data);
      } catch (error) {
         console.error('Error fetching agent list:', error);
      }
   };
   const handleFirstCheckboxChange = (event) => {
      setFirstCheckbox(event.target.value);
      setSecondCheckbox(event.target.value);
      setTransmissionType(event.target.value);
  };

  const handleSecondCheckboxChange = (event) => {
      setSecondCheckbox(event.target.value);
      setFirstCheckbox(event.target.value);
  };

   const handleFirstSectionSubmit = (event) => {
     event.preventDefault();
     // Logic to handle form submission for the first section
     // You can update the state with the values entered by the user
   };


   const handleConfirmClick = () => {
      // Remove session value
      sessionStorage.removeItem('mode');
  };
  const formattedDates = availableDates.map(date => {
   const parts = date.split('-'); // Split the date string
   // Rearrange the parts to the format 'YYYY-MM-DD'
   return `${parts[2]}-${parts[1]}-${parts[0]}`;
 });

 const handleDateChange = async (e) => {
   const selectedDate = e.target.value;
   setDate(selectedDate); // Update state with selected date
 
   try {
     const response = await api.get(`/seller/generate-slots/${selectedDate}`);
     console.log('time slots:', response.data.slots); // Log the response data
 
     // Assuming `slots` is set in the state
     setSlots(response.data.slots);
 
     // Optionally, if you want to set the first time slot as the selected time by default
     if (response.data.slots.length > 0) {
       setSelectedTime(`${response.data.slots[0].time}-${response.data.slots[0].Agent_id}`);
     }
 
     // Process the response data as needed
   } catch (error) {
     console.error('Error fetching slots:', error);
   }
 };
  return (

    <section class="car-details">
         <SellerNav />
      <div class="container">
            <div class="book-appointment-panel py-5">
               <h3 class="bookpanel-heading">Lets book a time to get your car verify.</h3>
               <p>Book a convenient time for your car verification with us. We understand the importance of ensuring your vehicle's condition, and our streamlined process makes it easy for you. Whether you're looking to confirm its overall health, address specific concerns, or simply seeking peace of mind, our scheduling system allows you to choose a time that suits your schedule.</p>
               <form onSubmit={handleSubmit}>
                  <h3 class="bookpanel-heading pt-3">Choose the date & time when you are free</h3>
                  <div class="row">
                     <div class="col-lg-3 col-6">
                        <div class="form-group">
                           <label for="inputdate">Date</label>      
                           <div>
							  <Calendar
								onChange={handleDateSelection}
								value={selectedDate}
								tileDisabled={isDateDisabled}
							  />
							  
							</div>

                        </div>
                    </div>
                     <div class="col-lg-3 col-6">
                        <div class="form-group">
                        <label htmlFor="selectTime">Select Time:</label>
                           <select
                           className="form-control py-3"
                           id="selectTime"
                           value={selectedTime}
                           onChange={(e) => {
                              setSelectedTime(e.target.value);
                              setSelectedAgentId(e.target.options[e.target.selectedIndex].getAttribute('data-agent-id'));
                            }}
                          
                           style={{ padding: '8px 24px' }}
                           >
                          <option value="">Select Time</option>
                     {slots.map((slot, index) => (
                        <option key={index} value={slot.time} data-agent-id={slot.Agent_id}>
                           {slot.time}
                        </option>
                     ))}
                       </select>
                        </div>
                     </div>
                  </div>
                  <div class="select-vehicle">
                     <p class="pb-0 mb-0">Select the vehicle transmission type</p>
                     <div class="select-vehicle-priority">
                        <div class="row">
                           <div class="col-lg-2 col-6">
                              <div class="form-check">
                                 <input class="form-check-input" type="radio" name="firstboxcheck"  id="exampleRadios1" value="Automatic"
                            checked={firstCheckbox === 'Automatic'}
                            onChange={handleFirstCheckboxChange}
                            />
                                 <label class="form-check-label" for="exampleRadios1"></label>
                                 <span>Automatic</span>
                              </div>
                           </div>
                           <div class="col-lg-2 col-6">
                              <div class="form-check">
                                 <input class="form-check-input" type="radio"  name="firstboxcheck" id="exampleRadios2" value="Manual"
                            checked={firstCheckbox === 'Manual'}
                            onChange={handleFirstCheckboxChange} 
                            />
                                 <label class="form-check-label" for="exampleRadios1"></label>
                                 <span>Manual</span>                
                              </div>
                           </div>
                        </div>
                        <div class="form-group py-3">
                           <label for="inputdate">Add the address</label>      
                           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>
                     </div>
                  </div>
                  <h3 class="bookpanel-heading pt-3">Please verify the information is right before confirm..</h3>
                  <div class="book-confirm-appointmetn">
                     <h3 class="bookpanel-heading pt-3">Choose the date & time when you are free</h3>
                     <div class="row">
                        <div class="col-lg-3 col-6">
                           <div class="form-group">
                              <label for="inputdate">Date</label>      
                              <input type="date" class="form-control py-3" id="inputdate"  value={date} readOnly />
                           </div>
                        </div>
                        <div class="col-lg-3 col-6">
                           <div class="form-group">
                              <label for="inputtime">time</label>      
                              <input type="time" class="form-control py-3" id="inputtime"  value={selectedTime} readOnly />
                           </div>
                        </div>
                     </div>
                     <div class="select-vehicle">
                        <p class="pb-0 mb-0">Select the vehicle transmission type</p>
                        <div class="select-vehicle-priority">
                           <div class="row">
                              <div class="col-lg-2 col-6">
                                 <div class="form-check">
                                    <input class="form-check-input" type="radio" name="secondboxcheck"  id="exampleRadios3" 
                                     value="Automatic"
                                     checked={secondCheckbox === 'Automatic'}
                                     onChange={handleSecondCheckboxChange}
                                     disabled
                                    />
                                    <label class="form-check-label" for="exampleRadios1"></label>
                                    <span>Automatic</span>
                                 </div>
                              </div>
                              <div class="col-lg-2 col-6">
                                 <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="secondboxcheck" id="exampleRadios4"
                                    value="Manual"
                                    checked={secondCheckbox === 'Manual'}
                                    onChange={handleSecondCheckboxChange}
                                    disabled
                                    />
                                    <label class="form-check-label" for="exampleRadios1"></label>
                                    <span>Manual</span>                
                                 </div>
                              </div>
                           </div>
                           <div class="form-group py-3">
                              <label for="inputdate">Add the address</label>      
                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={address} readOnly></textarea>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="bookappointment-btn mt-4">
                  {successMessage && <p class="text-success">{successMessage}</p>}
    <button className="btn btn-primary form-button py-3 px-5" onClick={handleSubmit}>Confirm</button>
</div>


               </form>
            </div>
         </div>
   </section>
  )
}
