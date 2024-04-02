import React from 'react'
import { SellerNav } from './SellerNav';
export const CarSellAppointment = () => {

  return (

    <section class="car-details">
         <SellerNav />
      <div class="container">
            <div class="book-appointment-panel py-5">
               <h3 class="bookpanel-heading">Lets book a time to get your car verify.</h3>
               <p>Book a convenient time for your car verification with us. We understand the importance of ensuring your vehicle's condition, and our streamlined process makes it easy for you. Whether you're looking to confirm its overall health, address specific concerns, or simply seeking peace of mind, our scheduling system allows you to choose a time that suits your schedule.</p>
               <form>
                  <h3 class="bookpanel-heading pt-3">Choose the date & time when you are free</h3>
                  <div class="row">
                     <div class="col-lg-3 col-6">
                        <div class="form-group">
                           <label for="inputdate">Date</label>      
                           <input type="date" class="form-control py-3" id="inputdate" />
                        </div>
                     </div>
                     <div class="col-lg-3 col-6">
                        <div class="form-group">
                           <label for="inputtime">time</label>      
                           <input type="time" class="form-control py-3" id="inputtime" />
                        </div>
                     </div>
                  </div>
                  <div class="select-vehicle">
                     <p class="pb-0 mb-0">Select the vehicle transmission type</p>
                     <div class="select-vehicle-priority">
                        <div class="row">
                           <div class="col-lg-2 col-6">
                              <div class="form-check">
                                 <input class="form-check-input" type="radio" name="exampleRadios1"  id="exampleRadios2" />
                                 <label class="form-check-label" for="exampleRadios1"></label>
                                 <span>Autmatic</span>
                              </div>
                           </div>
                           <div class="col-lg-2 col-6">
                              <div class="form-check">
                                 <input class="form-check-input" type="radio"  name="exampleRadios1" id="exampleRadios3" />
                                 <label class="form-check-label" for="exampleRadios1"></label>
                                 <span>Manual</span>                
                              </div>
                           </div>
                        </div>
                        <div class="form-group py-3">
                           <label for="inputdate">Add the address</label>      
                           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
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
                              <input type="date" class="form-control py-3" id="inputdate" />
                           </div>
                        </div>
                        <div class="col-lg-3 col-6">
                           <div class="form-group">
                              <label for="inputtime">time</label>      
                              <input type="time" class="form-control py-3" id="inputtime" />
                           </div>
                        </div>
                     </div>
                     <div class="select-vehicle">
                        <p class="pb-0 mb-0">Select the vehicle transmission type</p>
                        <div class="select-vehicle-priority">
                           <div class="row">
                              <div class="col-lg-2 col-6">
                                 <div class="form-check">
                                    <input class="form-check-input" type="radio" name="exampleRadios1"  id="exampleRadios2" checked/>
                                    <label class="form-check-label" for="exampleRadios1"></label>
                                    <span>Autmatic</span>
                                 </div>
                              </div>
                              <div class="col-lg-2 col-6">
                                 <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="exampleRadios1" id="exampleRadios3" />
                                    <label class="form-check-label" for="exampleRadios1"></label>
                                    <span>Manual</span>                
                                 </div>
                              </div>
                           </div>
                           <div class="form-group py-3">
                              <label for="inputdate">Add the address</label>      
                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="47 W 13th St, New York, NY 10011, USA"></textarea>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="bookappointment-btn mt-4">
                     <a href="/experience-seamless" class="btn btn-primary px-5 py-3">Confirm</a>
                  </div>
               </form>
            </div>
         </div>
   </section>
  )
}
