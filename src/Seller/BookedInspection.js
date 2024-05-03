import React, { useEffect, useState } from 'react';
import { SellerNav } from './SellerNav';
import api from '../api';

export const BookedInspection = () => {
  const [bookinspection, setBookInspection] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInspectionReport, setSelectedInspectionReport] = useState('');

  useEffect(() => {
  
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      fetchData(userId);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async (userId) => {
   
    try {
      const response = await api.get(`/seller/bookedinspection/${userId}`);
      console.log('API response:', response.data); // Debugging log
      const bookedInspections = response.data.BookedInspection;

      if (bookedInspections && Array.isArray(bookedInspections)) {
        setBookInspection(bookedInspections);
      } else {
        console.error('Booked inspection data is not in the expected format:', bookedInspections);
        setBookInspection([]);
      }
    } catch (error) {
      console.error('Error fetching booked inspection details:', error);
    }
  };

  const handleModalToggle = (agent) => {
    setSelectedAgent(agent);
    setShowModal(!showModal);
  };

  const handleModalToggleReport = (inspectionReport) => {
    setSelectedInspectionReport(inspectionReport);
    setShowModal(true);
  };

  return (
    <section className="bookedappointment-section">
      <SellerNav />
      <div className="container">
        <div className="table-panel py-5">
          <table className="table table-bordered mid-table">
            <thead>
              <tr>
                <th scope="col">Vehicle</th>
                <th scope="col">Agent</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookinspection.map((item, index) => (
                <tr key={index}>
                  <td>
                    <a href={`/car-details/${item.vehicle.Vehicle_Id}`}>
                      {item.vehicle.VIN} {item.vehicle.Make} {item.vehicle.Year}
                    </a>
                  </td>
                  <td>
                    <a onClick={() => handleModalToggle(item.agent)} data-toggle="modal" data-target=".bd-example-modal-lg11">
                      {item.agent.Agent_Fname}
                    </a>
                  </td>
                  <td>{item.Appt_DateTime}</td>
                  <td>
                    {item.Inspection_Status.toLowerCase() === "pending" ? (
                      item.Inspection_Status
                    ) : (
                      <a onClick={() => handleModalToggleReport(item.Inspection_Report)} data-toggle="modal" data-target=".bd-example-modal-lg14">
                        {item.Inspection_Status}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade bd-example-modal-lg11 newcar-modal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="seller-details">
                {selectedAgent && (
                  <>
                    <div className="seller-list d-flex">
                      <h4>First Name : </h4>
                      <span>{selectedAgent.Agent_Fname}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>Last Name : </h4>
                      <span>{selectedAgent.Agent_Lname}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>Street Address : </h4>
                      <span>{selectedAgent.Agent_Address}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>City :</h4>
                      <span>{selectedAgent.Agent_City}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>Zip :</h4>
                      <span>{selectedAgent.Agent_Zip}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>Phone No : </h4>
                      <span>{selectedAgent.Agent_Phone}</span>
                    </div>
                    <div className="seller-list d-flex">
                      <h4>Email :</h4>
                      <span>{selectedAgent.Agent_Email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade bd-example-modal-lg14 newcar-modal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="seller-details">
                  {selectedInspectionReport && (
                    <div className="appointment-approved">
                      {selectedInspectionReport}
                    </div>
                  )}
                </div>
                <div className="text-center mb-4">
                  <button type="button" className="btn btn-primary px-5 py-2" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
