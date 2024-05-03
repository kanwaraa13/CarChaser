import React, { useState } from 'react';
import { SellerNav } from './SellerNav';
export const CarEstimated = () => {
  return (
    <section class="car-details">
    <SellerNav />
    <div class="container">
    <div class="estimateimg-detail row">
       <div class="estimated-bannerimg col-md-7">
          <img src="../images/Rectangle 54.png" alt="banner-img" />
       </div>
       <div class="estimated-price py-4 col-md-5">
          <div class="estimate-name">
             <h3>2018 Volvo</h3>
             <p><strong>XC90 T6 R-Design wagon</strong> | 180000km</p>
          </div>
          <div class="estimated-list py-3">
             <h3>25,000$</h3>
             <p><strong>Estimated Offer</strong></p>
          </div>
       </div>
    </div>
    <div class="estimate-panel py-5">
       <h3> Car Chaser's Estimated Value Range for Your Car.</h3>
       <p>Our estimated range serves as an initial assessment. By leveraging competition within our dealer network, Car Chaser ensures you receive a solid offer, ultimately leading to a higher price compared to other alternatives.</p>
    </div>
    <div class="average-range-first">
       <div class="slider-container">
           <input type="range" min="0" max="50000" value="8,000" class="slider" id="rangeInput" />
             <div class="values">
                <span id="minValue">$4,626</span> <span id="maxValue">$8,224</span>
             </div>
       </div>
    </div>
    <div class="estimate-button pb-5">
       <a href="/book-appointment" type="submit" class="btn btn-primary">Sound good, Lets go</a> 
    </div>
 </div>
</section>
  )
}
