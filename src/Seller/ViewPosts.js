import React, { useState, useEffect } from 'react';
import { SellerNav } from './SellerNav';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const ViewPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const storedUserId = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Stored User Id:', storedUserId); // Log storedUserId
        if (!storedUserId) {
          navigate('/sellerverification');
          return; // Stop further execution
        }

        const response = await api.get(`/vehiclelisting/${storedUserId}/Seller`);
        const { message, Vehicle } = response.data;

        // Check if message is true and Vehicle is an array
        if (message && Array.isArray(Vehicle)) {
          // Log the entire response data
          console.log('Response data:', response.data);

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

  return (
    <section className="car-details">
      <SellerNav />
      <div className="container">
        <div className="view-post-panel mid-table mt-4">
          <h3 className="main-heading py-3">View Posts</h3>
          <div className="car-bid-gallary">
            <div className="input-group">
              <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
              <input type="search" id="form1" className="form-control" placeholder="Search Cars" />
            </div>
            <div className="carbid-gallery-panel py-4">
              <div className="row">
                {posts.map(post => (
                  <div key={post.id} className="col-lg-4 col-12">
                    <a href={`/car-details/${post.Vehicle_Id}`}>
                      <div className="carbid-image-panel">
                        {/* Replace 'your_static_id' with your desired static ID */}
                        <img src={`https://topdevit.com/clients/carchaser/public/uploads/${post.Vehicle_Id}/${post.Exterior_Image}`} alt="Car" />
                        <div className="bidpanel-innercont">
                          <h6 className="pt-2">{post.Year} {post.Model}</h6>
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
