import React from 'react'
import { SellerNav } from './SellerNav';
export const  SeamlessProcess = () => {
  return (
    <section class="car-details">
    <SellerNav />
    <div class="container">
    <div class="experience-seamless-panel p-5">
       <h3 class="bookpanel-heading">Experience a Seamless Process.</h3>
       <p class="pt-2">On your scheduled appointment, our expert acquisition team meticulously captures your car's details, conducts a comprehensive test drive, and assesses for any mechanical issues and damages. Once completed, your vehicle swiftly becomes available on our dynamic platform, engaging over 300 dealers within our extensive network to compete for your car.
          Upon accepting an offer, our streamlined payment process kicks in, encompassing all necessary paperwork. You have the flexibility to either drop off your car or arrange for convenient pickup, with payment due on the scheduled handover date. Discover the effortless way to sell your car.
       </p>
       <div class="bookappointment-btn mt-4">
          <div class="row">
             <div class="col-lg-3 col-md-6 mt-sm-3 mt-3">
                <a href="/view-posts" class="btn btn-primary px-5 py-3">View Post</a>
             </div>
             <div class="col-lg-6 col-md-12 text-center mt-sm-3 mt-3">
                <a href="https://carchaser.ca/" class="btn btn-primary px-5 py-3 mx-3">Add another vehicle to sell</a>
             </div>
          </div>
       </div>
    </div>
 </div>
</section>
  )
}
