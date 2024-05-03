
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from './Auth/Login';
import { SellerIn } from './Auth/SellerIn';
import { SellerVerification } from './Auth/SellerVerification';
import { UploadVehicleDetails } from './Seller/UploadVehicleDetails';
import { SellerNav } from './Seller/SellerNav';
import { CarEstimated } from './Seller/CarEstimated';
import { CarSellAppointment } from './Seller/CarSellAppointment';
import { SeamlessProcess } from './Seller/SeamlessProcess';
import { BookedInspection } from './Seller/BookedInspection';
import { ViewPosts } from './Seller/ViewPosts';
import { CarDetails } from './Seller/CarDetails';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sellerin" element={<SellerIn />} />
          <Route path="/sellerverification" element={<SellerVerification />} />
          <Route path="/uploadvehicledetails/:vechicleid" element={<UploadVehicleDetails />} />
          <Route path="/uploadvehicledetails" element={<UploadVehicleDetails />} />
          <Route path="/SellerNav" element={<SellerNav />} />
          <Route path="/carvalue" element={<CarEstimated />} />
          <Route path="/book-appointment" element={<CarSellAppointment />} />
          <Route path="/experience-seamless" element={<SeamlessProcess />} />
          <Route path="/view-posts" element={<ViewPosts />} />
          <Route path="/car-details/:Vehicle_Id" element={<CarDetails />} />
          <Route path="/booked-inspection-appointments" element={<BookedInspection />} />
       
        </Routes>
      </div>
    </Router>

  );
}

export default App;
