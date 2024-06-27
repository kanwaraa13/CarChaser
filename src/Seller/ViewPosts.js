import React, { useState, useEffect } from 'react';
import { SellerNav } from './SellerNav';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const ViewPosts = () => {
   const navigate = useNavigate();
   const [posts, setPosts] = useState([]);
   const [error, setError] = useState(null);
   const storedUserId = sessionStorage.getItem('user_id');
   const [isNewUser, setIsNewUser] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      sessionStorage.removeItem('isNewUser');
      setIsNewUser(false);
      const fetchPosts = async () => {
      try {
            if (!storedUserId) {
               navigate('/sellerverification');
               return; // Stop further execution
            }        
            const response = await api.get(`/vehiclelisting/${storedUserId}/Seller`);
            const { message, Vehicle } = response.data;
            // Check if message is true and Vehicle is an array
            if (message && Array.isArray(Vehicle)) {
            // Log the entire response data
            // Set the Vehicle data in state
            setPosts(Vehicle);
            } else {
               throw new Error('Invalid data format: Vehicle array not found');
            }
      } catch (error) {
         setError(error.message);
      }
      };
       fetchPosts();
   }, [navigate, storedUserId]);

   const fetchSerchdata = async () => {
      try {
            const response = await api.post(`/vehiclesearch/${storedUserId}/Seller`, {
            search: searchQuery
         });
            const vehicles = response.data.Vehicle;
            setPosts(vehicles);
      } 
      catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      fetchSerchdata();
   };

return (
<section className="car-details">
   <SellerNav />
   <div className="container">
      <div className="view-post-panel mid-table mt-4">
         <h3 className="main-heading py-3">View Posts</h3>
         <div className="car-bid-gallary">
            <form onSubmit={(e) => e.preventDefault()} className="input-group">
               <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
               <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Search Cars"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  />
            </form>
            <div className="carbid-gallery-panel py-4">
               <div className="row">
                  {posts.map(post => (
                  <div key={post.id} className="col-lg-4 col-12">
                     <a href={`/car-details/${post.Vehicle_Id}`}>
                        <div className="carbid-image-panel">
                           {/* Replace 'your_static_id' with your desired static ID */}
                           {post.Exterior_Image && (
                           <img
                              src={`https://backend.carchaser.ca/uploads/${post.Vehicle_Id}/${post.Exterior_Image}`}
                              alt="Car"
                              />
                           )}
                           {post.Exterior_Image2 && !post.Exterior_Image && (
                           <img
                              src={`https://backend.carchaser.ca/uploads/${post.Vehicle_Id}/${post.Exterior_Image2}`}
                              alt="Car"
                              />
                           )}
                           {post.Exterior_Image3 && !post.Exterior_Image2 && !post.Exterior_Image && (
                           <img
                              src={`https://backend.carchaser.ca/uploads/${post.Vehicle_Id}/${post.Exterior_Image3}`}
                              alt="Car"
                              />
                           )}
                           {post.Exterior_Image4 && !post.Exterior_Image3 && !post.Exterior_Image2 && !post.Exterior_Image && (
                           <img
                              src={`https://backend.carchaser.ca/uploads/${post.Vehicle_Id}/${post.Exterior_Image4}`}
                              alt="Car"
                              />
                           )}
                           <div className="bidpanel-innercont">
                              <h6 className="pt-2 text-capitalize">{post.Year} {post.Make} {post.Model}</h6>
                              <span><small>Vin #{post.VIN}</small></span>
                           </div>
                        </div>
                     </a>
                  </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
);
};