import React, { useRef, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerNav } from './SellerNav';

export const UploadVehicleDetails = () => {
    const navigate = useNavigate();
    const [isAfterMarketSelected, setIsAfterMarketSelected] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const stepRefs = useRef([]);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [hasIssues, setHasIssues] = useState(false);
    const [isModificationsSelected, setIsModificationsSelected] = useState(false);
    const [isfinancedSelected, setIsFinancedSelected] = useState(false);
    
    // Function to move to the next step
    const nextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    // Function to move to the previous step
    const prevStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    // Function to update step classes based on currentStep
    const updateStepClasses = () => {
        // Remove 'active' class from all steps
        stepRefs.current.forEach((stepRef, index) => {
            stepRef.classList.remove('active');
        });

        // Add 'active' class to the current step
        stepRefs.current[currentStep - 1].classList.add('active');
    };

    // Call updateStepClasses whenever currentStep changes
    useEffect(() => {
        updateStepClasses();
    }, [currentStep]);

    
    const renderStepIndicator = () => {
        return (
            <ul className="step-indicator py-3">
                {[...Array(2)].map((_, index) => (
                    <li key={index} className={index + 1 === currentStep ? 'active' : ''}>
                        <img src="../images/Group 27.png" alt={`Step ${index + 1}`} />
                    </li>
                ))}
            </ul>
        );
    };
    const toggleInputVisibility = () => {
        setIsInputVisible(prevState => {
            return !prevState;
        });
    };

    const handleOptionChange = (event) => {
        setIsAfterMarketSelected(event.target.id === 'showButton');
    };

    const handleIssuesChange = (event) => {
        setHasIssues(event.target.id === 'showButton2');
    };
      const handleModificationsChange = (event) => {
        setIsModificationsSelected(event.target.id === 'showButton3');
    };
    const handlefinanced = (event) => {
        setIsFinancedSelected(event.target.id === 'showButton4');
    };
    
 

    return (
        
        <section class="car-details">
        <SellerNav />
        <div class="container">
           <form id="multi-step-form" action="#" method="post">
              <h3 class="main-heading text-center">Upload Vehicle Details</h3>
              {renderStepIndicator()}
              <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} id="step-1" ref={el => stepRefs.current[0] = el}>
                 <div class="vehicle-detaile-one">
                    <h3 class="vehicle-info-heading">Tell us more about your vehicle</h3>
                    <p>Share details about your vehicle to receive a solid offer within minutes</p>
                    <div class="mileage-section d-flex">                        
                       <div class="form-group">
                          <label for="exampleFormControlSelect1">Color</label>
                          <select class="form-control" id="exampleFormControlSelect1">
                             <option>Red</option>
                             <option>White</option>
                             <option>Black</option>
                          </select>
                       </div>
                       <div class="form-group">
                          <label for="exampleFormControlSelect1">Keys</label>
                          <select class="form-control" id="exampleFormControlSelect1">
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                          </select>
                       </div>
                    </div>
                    <div class="vehicle-detail-list">
                       <div class="row">
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label class="form-check-label" for="defaultCheck1"></label>
                                <span>2 sets of tire</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                <label class="form-check-label" for="defaultCheck2"></label>
                                <span>Window tint</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck3"/>
                                <label class="form-check-label" for="defaultCheck3"></label>
                                <span>Aftermarket exhaust</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck4"/>
                                <label class="form-check-label" for="defaultCheck4"></label>
                                <span>Aftermarket rims</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck5"/>
                                <label class="form-check-label" for="defaultCheck5"></label>
                                <span>Roof rack</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck6"/>
                                <label class="form-check-label" for="defaultCheck6"></label>
                                <span>Remote starter</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck7"/>
                                <label class="form-check-label" for="defaultCheck7"></label>
                                <span>Aftermarket stereo</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck8"/>
                                <label class="form-check-label" for="defaultCheck8"></label>
                                <span>Aftermarket spoiler</span>
                             </div>
                          </div>
                       </div>
                       <h3 class="vehicle-info-heading pt-5">Any exterior/body damage?</h3>
                       <div class="row">
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck9"/>
                                <label class="form-check-label" for="defaultCheck9"></label>
                                <span>Minor damage (scratches, stone chips,scruffs)</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"/>
                                <label class="form-check-label" for="defaultCheck10"></label>
                                <span>Fading paints</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck11"/>
                                <label class="form-check-label" for="defaultCheck11"></label>
                                <span>Rust</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck12" />
                                <label class="form-check-label" for="defaultCheck12"></label>
                                <span>hail damage</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck13"/>
                                <label class="form-check-label" for="defaultCheck13"></label>
                                <span>mint condition</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck14"/>
                                <label class="form-check-label" for="defaultCheck14"></label>
                                <span>dents</span>
                             </div>
                          </div>
                       </div>
                       <h3 class="vehicle-info-heading pt-5">Any interior damage?</h3>
                       <div class="row">
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck15"/>
                                <label class="form-check-label" for="defaultCheck15"></label>
                                <span>Rips or tears on the seats</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck16"/>
                                <label class="form-check-label" for="defaultCheck16"></label>
                                <span>Visible stain on the seats</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck17"/>
                                <label class="form-check-label" for="defaultCheck17"></label>
                                <span>strong smell (smoking, pets and other)</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck18"/>
                                <label class="form-check-label" for="defaultCheck18"></label>
                                <span>damaged systems  (navigation, entertainment, and controls) others</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck19"/>
                                <label class="form-check-label" for="defaultCheck19"></label>
                                <span>mint condition</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="our-priority pt-5">
                       <h3 class="vehicle-info-heading">Our top priority is to sell your car.</h3>
                       <p>We are ager to have a conversation with you.</p>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Do you smoke in this vehicle?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" value="option1"/>
                                <label class="form-check-label" for="exampleRadios1"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios2" value="option1"/>
                                <label class="form-check-label" for="exampleRadios2"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Do you have original factory rims?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios3" value="option1"/>
                                <label class="form-check-label" for="exampleRadios3"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios4" value="option1"/>
                                <label class="form-check-label" for="exampleRadios4"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Have you replaced your tires in last 12 months?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios5" value="option1"/>
                                <label class="form-check-label" for="exampleRadios5"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios6" value="option1"/>
                                <label class="form-check-label" for="exampleRadios6"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Is your vehicle drivable?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios4" id="exampleRadios7" value="option1"/>
                                <label class="form-check-label" for="exampleRadios7"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios4" id="exampleRadios8" value="option1"/>
                                <label class="form-check-label" for="exampleRadios8"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Any crack on the windshield?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios5" id="exampleRadios9" value="option1"/>
                                <label class="form-check-label" for="exampleRadios9"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios5" id="exampleRadios10" value="option1"/>
                                <label class="form-check-label" for="exampleRadios10"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Do you have any extended warranty?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios6" id="exampleRadios11" value="option1"/>
                                <label class="form-check-label" for="exampleRadios11"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios6" id="exampleRadios12" value="option1"/>
                                <label class="form-check-label" for="exampleRadios12"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Are you interested in a trade In?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios7" id="exampleRadios13" value="option1"/>
                                <label class="form-check-label" for="exampleRadios13"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios7" id="exampleRadios14" value="option1"/>
                                <label class="form-check-label" for="exampleRadios14"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       <div class="our-priority-list">
                          <p class="pb-0 mb-0">Do you have winter tires?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios8" id="exampleRadios15" value="option1"/>
                                <label class="form-check-label" for="exampleRadios15"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios8" id="exampleRadios16" value="option1"/>
                                <label class="form-check-label" for="exampleRadios16"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <button class="btn btn-primary form-button py-3 px-5" type="button"onClick={nextStep}>Continue</button>
              </div>
              <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} id="step-2" ref={el => stepRefs.current[1] = el}>
                 <div class="vehicle-detaile-one">
                    <h3 class="vehicle-info-heading">Now is the perfect moment to sell your vehicle. No time !</h3>
                    <p>Share details about your vehicle to receive a solid offer within minutes</p>
                    <div class="readyto-sell">
                       <p class="pb-0 mb-0">How soon are you ready to sell?</p>
                       <div class="readyto-sell-priority">
                          <div class="row">
                             <div class="col-lg-3 col-6">
                                <div class="form-check ">
                                   <input class="form-check-input" type="radio" name="exampleRadios9" id="exampleRadios1" value="option1" />
                                   <label class="form-check-label" for="exampleRadios1"><span>Immediately</span> </label>                  
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios9" id="exampleRadios2" value="option1" />
                                   <label class="form-check-label" for="exampleRadios2"><span>1-2 months</span> </label>                 
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios9" id="exampleRadios2" value="option1" />
                                   <label class="form-check-label" for="exampleRadios2"><span>3 -5months</span> </label>                 
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios9" id="exampleRadios2" value="option1" />
                                   <label class="form-check-label" for="exampleRadios2"><span>6-12 months</span> </label>                 
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="selling-detail-list">
                       <h3 class="vehicle-info-heading pt-5">Why are you selling?</h3>
                       <div class="row">
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck9"/>
                                <label class="form-check-label" for="defaultCheck9"></label>
                                <span>selling because I don’t need the car anymore</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"/>
                                <label class="form-check-label" for="defaultCheck10"></label>
                                <span>selling because the car has some mechanical/ electrical issues</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck11"/>
                                <label class="form-check-label" for="defaultCheck11"></label>
                                <span>selling to downsize</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck12" />
                                <label class="form-check-label" for="defaultCheck12"></label>
                                <span>selling to buy another car</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="readyto-sell">
                       <p class="pb-0 mb-0">Selection the best option that describe the condition of the car</p>
                       <div class="readyto-sell-priority">
                          <div class="row">
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios10" id="exampleRadios01" value="option1"/>
                                   <label class="form-check-label" for="exampleRadios01"><span>Awesome</span> </label>                  
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios10" id="exampleRadios02" value="option1"/>
                                   <label class="form-check-label" for="exampleRadios02"><span>good</span> </label>                 
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios10" id="exampleRadios03" value="option1"/>
                                   <label class="form-check-label" for="exampleRadios03"><span>ok</span> </label>                 
                                </div>
                             </div>
                             <div class="col-lg-3 col-6">
                                <div class="form-check">
                                   <input class="form-check-input" type="radio" name="exampleRadios10" id="exampleRadios04" value="option1"/>
                                   <label class="form-check-label" for="exampleRadios04"><span>rough</span> </label>                 
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Any accident claims? How much?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios11" id="hideButton1" value="option1"
                                onClick={toggleInputVisibility}
                                checked={!isInputVisible}
                                />
                                <label class="form-check-label" for="exampleRadios11"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios11" id="showButton1" value="option1"
                                 onClick={toggleInputVisibility}
                                 checked={isInputVisible}
                                />
                                <label class="form-check-label" for="exampleRadios12"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isInputVisible && (
                            <div className="form-group pb-3 px-2" id="inputField1">                
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Note"></textarea>
                            </div>
                        )}
                    </div>
                    <div className="ourview-listpanel my-3">
                        <div className="our-view-list">
                            <p className="pb-0 mb-0">What rims are on the car?</p>
                            <div className="list-panel-priority">
                                <div className="form-check option-field">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios12"
                                        id="hideButton"
                                        value="option1"
                                        onChange={handleOptionChange}
                                        checked={!isAfterMarketSelected}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios13"><span>Stock Rims</span></label>
                                </div>
                                <div className="form-check option-field">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios12"
                                        id="showButton"
                                        value="option1"
                                        onChange={handleOptionChange}
                                        checked={isAfterMarketSelected}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios14"><span>After Market</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isAfterMarketSelected && (
                        <div className="ourview-listpanel  my-3" id="inputField">
                            <div className="our-view-list">
                                <p className="pb-0 mb-0">Do you have stock rims?</p>
                                <div className="list-panel-priority">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios12" id="exampleRadios13" value="option1" />
                                        <label className="form-check-label" htmlFor="exampleRadios13"><span>No</span></label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios12" id="exampleRadios14" value="option1" />
                                        <label className="form-check-label" htmlFor="exampleRadios14"><span>Yes</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                   
                    <div class="ourview-listpanel hidden my-3" id="inputField">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Do you have stock rims?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios12" id="exampleRadios13" value="option1"
                                 
                                />
                                <label class="form-check-label" for="exampleRadios13"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios12" id="exampleRadios13" value="option1"
                                 
                                />
                                <label class="form-check-label" for="exampleRadios14"><span>Yes</span> </label>  
                                             
                             </div>
                          </div>
                       </div>               
                    </div>
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Any issues with the vehicle?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios13" id="hideButton2" value="option1"
                                 onChange={handleIssuesChange}
                                 checked={!hasIssues}
                                />
                                <label class="form-check-label" for="exampleRadios15"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios13" id="showButton2" value="option1"
                                 onChange={handleIssuesChange}
                                 checked={hasIssues}
                                />
                                <label class="form-check-label" for="exampleRadios16"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                      {hasIssues && (
                            <div className="form-group pb-3 px-2" id="inputField2">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="eg. Warning Light shows, Brakes are squeaking/grinding etc."></textarea>
                            </div>
                        )}
                    </div>
                    
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Are there any modifications on the car?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios14" id="hideButton3" value="option1"
                                onChange={handleModificationsChange}
                                checked={!isModificationsSelected}
                                />
                                <label class="form-check-label" for="exampleRadios17"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios14" id="showButton3" value="option1"
                                 onChange={handleModificationsChange}
                                 checked={isModificationsSelected}
                                />
                                <label class="form-check-label" for="exampleRadios18"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isModificationsSelected && (
                       <div class="form-group pb-3 px-2 " id="inputField3">                
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please describe"></textarea>
                       </div>
                         )}
                    </div>
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Is the car leased or financed?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios15" id="hideButton4" value="option1"  
                                  onChange={handlefinanced}
                                  checked={!isfinancedSelected}
                                />
                                <label class="form-check-label" for="exampleRadios19"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios15" id="showButton4" value="option1"
                                 onChange={handlefinanced}
                                 checked={isfinancedSelected}
                                />
                                <label class="form-check-label" for="exampleRadios20"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isfinancedSelected && (
                       <div class="form-group pb-3 px-2 " id="inputField4">                
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please share who the car is leased or financed by"></textarea>
                       </div>
                         )}
                    </div>
                    <div class="row">
                       <div class="col-md-6">
                     <h3 class="vehicle-info-heading pt-3">Interior of the car</h3>
                    <div class="form-add-image my-4">
                       <div class="form-group">                
                          <input class="form-file" type="file" name="file" id="image-input" accept="image/*" placeholder="add-image" />
                          <label class="form-label" for="file">Add Image</label>
                          <div id="image-preview" class="image-preview"></div>
                       </div>
                    </div>
                 </div>
                 <div class="col-md-6">
                    <h3 class="vehicle-info-heading pt-3">Exterior of the car</h3>
                    <div class="form-add-image my-4">
                       <div class="form-group">                
                          <input class="form-file" type="file" name="file" id="image-input2" accept="image/*" placeholder="add-image" />
                          <label class="form-label" for="file">Add Image</label>
                          <div id="image-preview2" class="image-preview"></div>
                       </div>
                    </div>
                 </div>
                 <div class="col-md-6">
                    <h3 class="vehicle-info-heading pt-3">Dashboard of the car</h3>
                    <div class="form-add-image my-4">
                       <div class="form-group">                
                          <input class="form-file" type="file" name="file" id="image-input3" accept="image/*" placeholder="add-image" />
                          <label class="form-label" for="file">Add Image</label>
                          <div id="image-preview3" class="image-preview"></div>
                       </div>
                    </div>
                 </div>
                 <div class="col-md-6">
                    <h3 class="vehicle-info-heading pt-3">Rims of the car</h3>
                    <div class="form-add-image my-4">
                       <div class="form-group">                
                          <input class="form-file" type="file" name="file" id="image-input4" accept="image/*" placeholder="add-image" />
                          <label class="form-label" for="file">Add Image</label>
                          <div id="image-preview4" class="image-preview"></div>
                       </div>
                    </div>
                 </div>
              </div>
                 </div>
                 <button class="btn btn-primary form-button py-3 px-5" type="button"  data-toggle="modal" data-target="#exampleModal">Submit</button>
              </div>
           </form>
        </div>
        <div class="modal fade multistep-popup" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="form-step-img">
                     <img src="../images/pngkey-1.png" alt="image" />
                  </div>
                  <h3 class="main-heading py-3">thank you for your submission!</h3>
                  <a href="/carvalue" class="btn btn-primary px-5 py-3">Let's Get Going</a>
               </div>
            </div>
         </div>
      </div>
     </section>

    );
};