import React, { useRef, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerNav } from './SellerNav';
import api from '../api';
export const UploadVehicleDetails = () => {
      const navigate = useNavigate();
      const [dashboardImageUrls, setDashboardImageUrls] = useState([]);
      const [imageChangedDashboard, setImageChangedDashboard] = useState(Array(4).fill(false)); // Assuming 4 images, adjust the size accordingly
      const [dashboardImages, setDashboardImages] = useState([]);
      const [exteriorImageUrls, setExteriorImageUrls] = useState([]);
      const [imageChangedExterior, setImageChangedExterior] = useState(Array(4).fill(false)); // Assuming 4 images, adjust the size accordingly
      const [exteriorImages, setExteriorImages] = useState([]);
      const [interiorImageUrls, setInteriorImageUrls] = useState([]);
      const [imageChanged, setImageChanged] = useState(Array(4).fill(false)); // Assuming 4 images, adjust the size accordingly
      const [interiorImages, setInteriorImages] = useState([]);
      const [rimsImageUrls, setRimsImageUrls] = useState([]);
      const [imageChangedRims, setImageChangedRims] = useState(Array(4).fill(false)); // Assuming 4 images, adjust the size accordingly
      const [rimsImages, setRimsImages] = useState([]);
      const [imagesData, setImagesData] = useState({});
      const [isAfterMarketSelected, setIsAfterMarketSelected] = useState(false);
      const [currentStep, setCurrentStep] = useState(1);
      const stepRefs = useRef([]);
      const [isInputVisible, setIsInputVisible] = useState(false);
      const [hasIssues, setHasIssues] = useState(false);
      const [isModificationsSelected, setIsModificationsSelected] = useState(false);
      const [isfinancedSelected, setIsFinancedSelected] = useState(false);
      const inputRefs = useRef([]);
      const [imagePreviews, setImagePreviews] = useState(['', '', '', '']);
      const [storedUserId, setStoredUserId] = useState(null); // Define storedUserId here
      const [vehicleDetails, setVehicleDetails] = useState(null);
      const [location, setLocation] = useState('');
      const [vin, setVin] = useState('');
      const [year, setYear] = useState('');
      const [make, setMake] = useState('');
      const [model, setModel] = useState('');
      const [trim, setTrim] = useState('');
      const [mileage, setMileage] = useState('');
      const [selectedColor, setSelectedColor] = useState('');
      const [selectedKeys, setselectedKeys] = useState('');
      const [setoftire, setSetoftire] = useState(false);
      const [windowTint, setWindowTint] = useState(false); 
      const [aftermarketExhaust, setAftermarketExhaust] = useState(false);
      const [aftermarketRims, setAftermarketRims] = useState(false);
      const [roofRack, setRoofRack] = useState(false); 
      const [remoteStarter, setRemoteStarter] = useState(false); 
      const [aftermarketStereo, setAftermarketStereo] = useState(false);
      const [aftermarketSpoiler, setAftermarketSpoiler] = useState(false); 
      const [minorDamage, setMinorDamage] = useState(false);
      const [fadingPaints, setFadingPaints] = useState(false);
      const [rust, setRust] = useState(false); 
      const [hailDamage, setHailDamage] = useState(false);
      const [mintCondition, setMintCondition] = useState(false); 
      const [dents, setDents] = useState(false);
      const [ripsOrTears, setRipsOrTears] = useState(false); 
      const [visibleStain, setVisibleStain] = useState(false);
      const [strongSmell, setStrongSmell] = useState(false);
      const [damagedSystems, setDamagedSystems] = useState(false);
      const [IntmintCondition, setIntMintCondition] = useState(false);
      const [hasOriginalRims, setHasOriginalRims] = useState(null);
      const [smokeInVehicle, setSmokeInVehicle] = useState('');
      const [tireReplacement, setTireReplacement] = useState(null); 
      const [vehicleDrivable, setVehicleDrivable] = useState(null);
      const [crackOnWindshield, setCrackOnWindshield] = useState(null);
      const [extendedWarranty, setExtendedWarranty] = useState(null);
      const [rimschange, setRimsChange] = useState('');
      const [tradeInInterest, setTradeInInterest] = useState(null);
      const [hasWinterTires, setHasWinterTires] = useState(null); 
      const [carCondition, setCarCondition] = useState('');
      const [sellTiming, setSellTiming] = useState(''); 
      const [DonotNeedCar, setDonotNeedCar] = useState(''); 
      const [MechElectIssues, setMechElectIssues] = useState(''); 
      const [DownSize, setDownSize] = useState(''); 
      const [BuyAnotherCar, setBuyAnotherCar] = useState(''); 
      const [claimnote, setclaimnote] = useState(''); 
      const [storedVehicleId, setStoredVehicleId] = useState(null); // Define storedVehicleId here
      const [issuenote, setIssueNote] = useState('');
      const [modificationsnote, setModificationsNote] = useState('');
      const [financednote, setFinancedNote] = useState('');
      const [notedrivable, setNoteDrivable] = useState('');
      const [isNewUser, setIsNewUser] = useState(false);
      const [isPopupVisible, setIsPopupVisible] = useState(false);
      const [successMessage, setSuccessMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [interioimage, setInterioimage] = useState('');
      const [vehiclevideo, setVehicleVideo] = useState('');
      
      // Modify handleImageChange to update the imageChanged state
   const handleImageChange = (event, index) => {
     const file = event.target.files[0];
      // Check if the user selected a new image
      if (file) {
         // User selected a new image, update the interiorImageUrls and set imageChanged to true
         const reader = new FileReader();
         reader.onloadend = () => {
               const imageDataUrl = reader.result;
               setInteriorImageUrls(prevImageUrls => {
                  const updatedImageUrls = [...prevImageUrls];
                  updatedImageUrls[index] = imageDataUrl;
                  return updatedImageUrls;
               });
               setImageChanged(prevImageChanged => {
                  const updatedImageChanged = [...prevImageChanged];
                  updatedImageChanged[index] = true;
                  return updatedImageChanged;
               });
         };
         reader.readAsDataURL(file);
      } else {
        // User didn't select a new image, set imageChanged to false
        setImageChanged(prevImageChanged => {
            const updatedImageChanged = [...prevImageChanged];
            updatedImageChanged[index] = false;
            return updatedImageChanged;
        });
       }
   };
// Dashboard
const handleImageChangedashboard = (event, index) => {
    const file = event.target.files[0];
    // Check if the user selected a new image
    if (file) {
        // User selected a new image, update the interiorImageUrls and set imageChanged to true
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setDashboardImageUrls(prevImageUrls => {
                const updatedImageUrls = [...prevImageUrls];
                updatedImageUrls[index] = imageDataUrl;
                return updatedImageUrls;
            });
            setImageChangedDashboard(prevImageChanged => {
                const updatedImageChanged = [...prevImageChanged];
                updatedImageChanged[index] = true;
                return updatedImageChanged;
            });
        };
        reader.readAsDataURL(file);
    } else {
        // User didn't select a new image, set imageChanged to false
        setImageChangedDashboard(prevImageChanged => {
            const updatedImageChanged = [...prevImageChanged];
            updatedImageChanged[index] = false;
            return updatedImageChanged;
        });
    }
};

// Exterior
	
const handleImageChangeexterior = (event, index) => {
    const file = event.target.files[0];
    
    // Check if the user selected a new image
    if (file) {
        // User selected a new image, update the interiorImageUrls and set imageChanged to true
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setExteriorImageUrls(prevImageUrls => {
                const updatedImageUrls = [...prevImageUrls];
                updatedImageUrls[index] = imageDataUrl;
                return updatedImageUrls;
            });
            setImageChangedExterior(prevImageChanged => {
                const updatedImageChanged = [...prevImageChanged];
                updatedImageChanged[index] = true;
                return updatedImageChanged;
            });
        };
        reader.readAsDataURL(file);
    } else {
        // User didn't select a new image, set imageChanged to false
        setImageChangedExterior(prevImageChanged => {
            const updatedImageChanged = [...prevImageChanged];
            updatedImageChanged[index] = false;
            return updatedImageChanged;
        });
    }
};

// Rims
const handleImageChangerims = (event, index) => {
    const file = event.target.files[0];
    
    // Check if the user selected a new image
    if (file) {
        // User selected a new image, update the interiorImageUrls and set imageChanged to true
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setRimsImageUrls(prevImageUrls => {
                const updatedImageUrls = [...prevImageUrls];
                updatedImageUrls[index] = imageDataUrl;
                return updatedImageUrls;
            });
            setImageChangedRims(prevImageChanged => {
                const updatedImageChanged = [...prevImageChanged];
                updatedImageChanged[index] = true;
                return updatedImageChanged;
            });
        };
        reader.readAsDataURL(file);
    } else {
        // User didn't select a new image, set imageChanged to false
        setImageChangedRims(prevImageChanged => {
            const updatedImageChanged = [...prevImageChanged];
            updatedImageChanged[index] = false;
            return updatedImageChanged;
        });
    }
};
  
  const getFileNameFromInput = (event) => {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    return input.files[0].name;
  }
  return null;
};
// Interior
useEffect(() => {
    const fetchDataAndConvertToBlob = async () => {
      const blobPromises = interiorImageUrls.map(async (imageUrl, index) => {
        if (imageUrl && !interiorImages[index]) {
          const blob = await fetchAndConvertToBlob(imageUrl);
          if (blob) {
            setInteriorImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[index] = blob;
              return updatedImages;
            });
          }
        }
      });
      await Promise.all(blobPromises);
    };

    fetchDataAndConvertToBlob();
  }, [interiorImageUrls]);
  // Dashboard
  useEffect(() => {
    const fetchDataAndConvertToBlobDashboard = async () => {
      const blobPromises = dashboardImageUrls.map(async (imageUrl, index) => {
        if (imageUrl && !dashboardImages[index]) {
          const blob = await fetchAndConvertToBlob(imageUrl);
          if (blob) {
            setDashboardImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[index] = blob;
              return updatedImages;
            });
          }
        }
      });
      await Promise.all(blobPromises);
    };

    fetchDataAndConvertToBlobDashboard();
  }, [dashboardImageUrls]);
  // Exterior
  useEffect(() => {
    const fetchDataAndConvertToBlobExterior = async () => {
      const blobPromises = exteriorImageUrls.map(async (imageUrl, index) => {
        if (imageUrl && !exteriorImages[index]) {
          const blob = await fetchAndConvertToBlob(imageUrl);
          if (blob) {
            setExteriorImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[index] = blob;
              return updatedImages;
            });
          }
        }
      });
      await Promise.all(blobPromises);
    };

    fetchDataAndConvertToBlobExterior();
  }, [exteriorImageUrls]);
  // Rims
  useEffect(() => {
    const fetchDataAndConvertToBlobRims = async () => {
      const blobPromises = rimsImageUrls.map(async (imageUrl, index) => {
        if (imageUrl && !rimsImages[index]) {
          const blob = await fetchAndConvertToBlob(imageUrl);
          if (blob) {
            setRimsImages(prevImages => {
              const updatedImages = [...prevImages];
              updatedImages[index] = blob;
              return updatedImages;
            });
          }
        }
      });
      await Promise.all(blobPromises);
    };

    fetchDataAndConvertToBlobRims();
  }, [rimsImageUrls]);
  
  const fetchAndConvertToBlob = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

      
      const handleColorChange = (event) => {
         setSelectedColor(event.target.value);
      };
      const handlekeys = (event) => {
         setselectedKeys(event.target.value);

      };
      const handleSetoftireChange = (event) => {
         const isChecked = event.target.checked; // Check if the checkbox is checked
         setSetoftire(isChecked); // Update state based on checkbox checked status
    
      };
      const handleWindowTintChange = (event) => {
         const isChecked = event.target.checked; // Check if the checkbox is checked
         setWindowTint(isChecked); // Update state based on checkbox checked status
      };
      const handleAftermarketExhaustChange = (event) => {
         const isChecked = event.target.checked; // Check if the checkbox is checked
         setAftermarketExhaust(isChecked); // Update state based on checkbox checked status
      };
      const handleAftermarketRimsChange = (event) => {
         const isChecked = event.target.checked; // Check if the checkbox is checked
         setAftermarketRims(isChecked); // Update state based on checkbox checked status
     };
     const handleRoofRackChange = (event) => {
      const isChecked = event.target.checked; // Check if the checkbox is checked
      setRoofRack(isChecked); // Update state based on checkbox checked status
      };
      const handleRemoteStarterChange = (event) => {
      const isChecked = event.target.checked; // Check if the checkbox is checked
      setRemoteStarter(isChecked); // Update state based on checkbox checked status

};

const handleAftermarketStereoChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setAftermarketStereo(isChecked); // Update state based on checkbox checked status
};

const handleAftermarketSpoilerChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setAftermarketSpoiler(isChecked); // Update state based on checkbox checked status
};
const handleMinorDamageChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && mintCondition) {
      setMintCondition(false); // Uncheck "mint condition" if it's checked
    }
   setMinorDamage(isChecked); // Update state based on checkbox checked status
};
const handleFadingPaintsChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && mintCondition) {
      setMintCondition(false); // Uncheck "mint condition" if it's checked
    }
   setFadingPaints(isChecked); // Update state based on checkbox checked status

};
const handleRustChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && mintCondition) {
      setMintCondition(false); // Uncheck "mint condition" if it's checked
    }
   setRust(isChecked); // Update state based on checkbox checked status

};
const handleHailDamageChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && mintCondition) {
      setMintCondition(false); // Uncheck "mint condition" if it's checked
    }
   setHailDamage(isChecked); // Update state based on checkbox checked status

};

const handleMintConditionChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked) {
      setMinorDamage(false);
      setFadingPaints(false);
      setRust(false);
      setDents(false);
      setHailDamage(false);
    }
   setMintCondition(isChecked); // Update state based on checkbox checked status

};
const handleDentsChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && mintCondition) {
      setMintCondition(false); // Uncheck "mint condition" if it's checked
    }
   setDents(isChecked); // Update state based on checkbox checked status
 };
const handleRipsOrTearsChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && IntmintCondition) {
     setIntMintCondition(false); // Uncheck "mint condition" if it's checked
   }
   setRipsOrTears(isChecked); // Update state based on checkbox checked status
 };
 

 
 const handleVisibleStainChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && IntmintCondition) {
     setIntMintCondition(false); // Uncheck "mint condition" if it's checked
   }
   setVisibleStain(isChecked); // Update state based on checkbox checked status
 };
 
 const handleStrongSmellChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && IntmintCondition) {
     setIntMintCondition(false); // Uncheck "mint condition" if it's checked
   }
   setStrongSmell(isChecked); // Update state based on checkbox checked status
 };
 
 const handleDamagedSystemsChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   if (isChecked && IntmintCondition) {
     setIntMintCondition(false); // Uncheck "mint condition" if it's checked
   }
   setDamagedSystems(isChecked); // Update state based on checkbox checked status
 };
 
 const handleIntMintConditionChange = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   // Uncheck all other checkboxes if "mint condition" is checked
   if (isChecked) {
     setRipsOrTears(false);
     setVisibleStain(false);
     setStrongSmell(false);
     setDamagedSystems(false);
   }
   setIntMintCondition(isChecked); // Update state based on checkbox checked status
 };
const handleOriginalRimsChange = (event) => {
   const value = event.target.value; // Get the selected value
   setHasOriginalRims(value === 'Yes'); // Update state based on the selected value

};

const handleSmokeInVehicleChange = (event) => {
   const value = event.target.value; // Get the selected value
   setSmokeInVehicle(value === 'Yes'); // Update state based on the selected value
};


const handleTireReplacementChange = (event) => {
   const value = event.target.value; // Get the selected value
   setTireReplacement(value === 'Yes'); // Update state based on the selected value
};

const handleVehicleDrivableChange = (event) => {
   const value = event.target.value; // Get the selected value
   setVehicleDrivable(value === 'Yes'); // Update state based on the selected value
   if (value === 'No') {
      setNoteDrivable(''); // Clear the input field if the user selects "No"
    }
};


const handleCrackOnWindshieldChange = (event) => {
   const value = event.target.value; // Get the selected value
   setCrackOnWindshield(value === 'Yes'); // Update state based on the selected value
};

const handleExtendedWarrantyChange = (event) => {
   const value = event.target.value; // Get the selected value
   setExtendedWarranty(value === 'Yes'); // Update state based on the selected value
};
const handleMarketRimsChange = (event) => {
   const value = event.target.value; // Get the selected value
   setRimsChange(value === 'Yes'); // Update state based on the selected value
};

const handleaccidentclaims = (event) => {
   const value = event.target.value; // Get the selected value
   setIsInputVisible(value === 'Yes'); // Update state based on the selected value
   if (value === 'No') {
     setclaimnote(''); // Clear the input field if the user selects "No"
   }
 };

const handleTradeInInterestChange = (event) => {
   const value = event.target.value; // Get the selected value
   setTradeInInterest(value === 'Yes'); // Update state based on the selected value
};

const handleWinterTiresChange = (event) => {
   const value = event.target.value; // Get the selected value
   setHasWinterTires(value === 'Yes'); // Update state based on the selected value
};

const handleCarConditionChange = (event) => {
   const value = event.target.value; // Get the selected value
   setCarCondition(value); // Update state with the selected value
};
const handleSellTimingChange = (event) => {
   const value = event.target.value; // Get the selected value
   setSellTiming(value); // Update state with the selected value   in your API request
};

const handledonotneedCar = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setDonotNeedCar(isChecked); // Update state based on checkbox checked status
};

const handlemechelectIssues = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setMechElectIssues(isChecked); // Update state based on checkbox checked status
};

const handlesellingtodownsize = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setDownSize(isChecked); // Update state based on checkbox checked status
};

const handleBuyAnotherCar = (event) => {
   const isChecked = event.target.checked; // Check if the checkbox is checked
   setBuyAnotherCar(isChecked); // Update state based on checkbox checked status
};



const handleclaimnote = (event) => {
   const value = event.target.value; // Get the value from the textarea
   setclaimnote(value); // Update state with the value from the textarea
};

const handleissuenote = (event) => {
   const value = event.target.value; // Get the value from the textarea
   setIssueNote(value); // Update state with the value from the textarea
};

const handlemodificationsnote = (event) => {
   const value = event.target.value; // Get the value from the textarea
   setModificationsNote(value); // Update state with the value from the textarea

};

const handlefinancednote = (event) => {
   const value = event.target.value; // Get the value from the textarea
   setFinancedNote(value); // Update state with the value from the textarea

};

const handledrivablenote = (event) => {
   const value = event.target.value; // Get the value from the textarea
   setNoteDrivable(value); // Update state with the value from the textarea

};
const handlevehiclevideo = (event) => {
   const value = event.target.value; // Get the value from the textarea

   setVehicleVideo(value); // Update state with the value from the textarea

};



const fetchData = async () => {
   try {
       const storedVehicleId = sessionStorage.getItem('Vehicle_Id');
       if (!storedVehicleId) {
      
           return;
       }
       const response = await api.get(`/seller/vehicle/${storedVehicleId}`);
       const vehicleData = response.data;
       // Log the entire API response
       setLocation(vehicleData.vehicle.Location || '');
       setVin(vehicleData.vehicle.VIN || '');
       setYear(vehicleData.vehicle.Year || '');
       setModel(vehicleData.vehicle.Model || '');
       setTrim(vehicleData.vehicle.Trim || '');
       setMileage(vehicleData.vehicle.Mileage || '');
       setMake(vehicleData.vehicle.Make || '');
       setSelectedColor(vehicleData.vehicle.Color || '');
       setselectedKeys(vehicleData.vehicle.Car_Keys || '');
       setSetoftire(vehicleData.vehicle['2_Sets_Of_Tire'] || '');
       setWindowTint(vehicleData.vehicle.Win_Tint || '');
       setAftermarketExhaust(vehicleData.vehicle.Aftermark_Exhaust || '');
       setAftermarketRims(vehicleData.vehicle.Aftermark_Rims || '');
       setRoofRack(vehicleData.vehicle.Roof_Rack || '');
       setRemoteStarter(vehicleData.vehicle.Remote_Start || '');
       setAftermarketStereo(vehicleData.vehicle.Aftermark_Stereo || '');
       setAftermarketSpoiler(vehicleData.vehicle.Aftermark_Spoiler || '');
       setMinorDamage(vehicleData.vehicle.Minor_Damage || '');
       setFadingPaints(vehicleData.vehicle.Fading_Paints || '');
       setRust(vehicleData.vehicle.Rust || '');
       setHailDamage(vehicleData.vehicle.Hail_Damage || '');
       setMintCondition(vehicleData.vehicle.Ext_Mint_Condition || '');
       setDents(vehicleData.vehicle.Dents || '');
       setRipsOrTears(vehicleData.vehicle.Seats_Rips_Tears || '');
       setVisibleStain(vehicleData.vehicle.Seats_Visible_Stain || '');
       setStrongSmell(vehicleData.vehicle.Strong_Smell || '');
       setDamagedSystems(vehicleData.vehicle.Nav_Entmt_Ctrl_Dmg_Sys || '');
       setIntMintCondition(vehicleData.vehicle.Int_Mint_Condition || '');
       setHasOriginalRims(vehicleData.vehicle.Original_Factory_Rims || '');
       setSmokeInVehicle(vehicleData.vehicle.Smoke_In_Vehicle || '');
       setTireReplacement(vehicleData.vehicle.Tires_Repld_12_Months || '');
       setVehicleDrivable(vehicleData.vehicle.Vehicle_Drivable || '');
       setCrackOnWindshield(vehicleData.vehicle.Windshield_Crack || '');
       setExtendedWarranty(vehicleData.vehicle.Extended_Warranty || '');
       setRimsChange(vehicleData.vehicle.Car_Rims || '');
       setTradeInInterest(vehicleData.vehicle.TradeIn_Interested || '');
       setHasWinterTires(vehicleData.vehicle.Winter_Tires || '');
       setCarCondition(vehicleData.vehicle.Car_Condition || '');
       setSellTiming(vehicleData.vehicle.How_Soon_Ready_Sell || '');
       setDonotNeedCar(vehicleData.vehicle.Donot_Need_Car || '');
       setMechElectIssues(vehicleData.vehicle.Mech_Elect_Issues || '');
       setDownSize(vehicleData.vehicle.Downsize || '');
       setBuyAnotherCar(vehicleData.vehicle.Buy_Another_Car || '');
       setclaimnote(vehicleData.vehicle.How_Much_Claims || '');
       setIssueNote(vehicleData.vehicle.Vehicle_Issues_desc || '');
       setModificationsNote(vehicleData.vehicle.Modification_desc || '');
       setFinancedNote(vehicleData.vehicle.Financed_By || '');
       setNoteDrivable(vehicleData.vehicle.vehicle_drivable_not_explanation || '');
       setIsInputVisible(vehicleData.vehicle.Accident_Claims || '');
       setHasIssues(vehicleData.vehicle.Any_Vehicle_Issues || '');
       setIsModificationsSelected(vehicleData.vehicle.Car_Modification || '');
       setIsFinancedSelected(vehicleData.vehicle.Leased_Financed || '');
       setIsAfterMarketSelected(vehicleData.vehicle.Car_Rims || '');
       setRimsChange(vehicleData.vehicle.Stock_Rims || '');
       setInterioimage(vehicleData.vehicle.Interior_Image || '');
       setVehicleVideo(vehicleData.vehicle.Vehicle_video || '');
   } catch (error) {
       console.error('Error fetching vehicle details:', error);
   }
};
const handleRemoveImage = (indexToRemove) => {
   setInteriorImageUrls(prevUrls => {
       const newUrls = [...prevUrls];
       newUrls[indexToRemove] = null; // Set the image URL at the specified index to null
       return newUrls;
   });
};

const handleRemoveExteriorImage = (indexToRemove) => {
   setExteriorImageUrls(prevUrls => {
       const newUrls = [...prevUrls];
       newUrls[indexToRemove] = null; // Set the image URL at the specified index to null
       return newUrls;
   });
};

const handleRemoveDashboardImage = (indexToRemove) => {
   setDashboardImageUrls(prevUrls => {
       const newUrls = [...prevUrls];
       newUrls[indexToRemove] = null; // Set the image URL at the specified index to null
       return newUrls;
   });
};

const handleRemoveRimsImage = (indexToRemove) => {
   setRimsImageUrls(prevUrls => {
       const newUrls = [...prevUrls];
       newUrls[indexToRemove] = null; // Set the image URL at the specified index to null
       return newUrls;
   });
};
useEffect(() => {
   const storedUserId = sessionStorage.getItem('user_id');
   if (!storedUserId) {
       navigate('/sellerverification');
   } else {
       const storedVehicleId = sessionStorage.getItem('Vehicle_Id');
       console.log('Stored Vehicle Id:', storedVehicleId); // Log storedVehicleId
       if (!storedVehicleId) {
           // Handle case where Vehicle_Id is not stored
           console.error('Vehicle Id not found in session storage');
       } else {
           setStoredUserId(storedUserId);
           setStoredVehicleId(storedVehicleId); // Set storedVehicleId here
           fetchData(storedVehicleId); // Call fetchData with storedVehicleId
          
       }
   }
}, [navigate]);
 
const getFileNameFromUrl = (url) => {
  // Split the URL by '/' and get the last part
  const parts = url.split('/');
  return parts[parts.length - 1];
}; 

const handleSubmit = async (event) => {
   event.preventDefault();
 
   try {
       const formData = new FormData(); // Create a new FormData object
         formData.append('Location', location);
         formData.append('VIN', vin);
         formData.append('Year', year);
         formData.append('Model', model);
         formData.append('Trim', trim);
         formData.append('Mileage', mileage);
         formData.append('Make', make);
         formData.append('Seller_Id', storedUserId);
         formData.append('Color', selectedColor);
         formData.append('Car_Keys', selectedKeys);
         formData.append('2_Sets_Of_Tire', setoftire ? '1' : '0');
         formData.append('Win_Tint', windowTint ? '1' : '0');
         formData.append('Aftermark_Exhaust', aftermarketExhaust ? '1' : '0');
         formData.append('Aftermark_Rims', aftermarketRims ? '1' : '0');
         formData.append('Roof_Rack', roofRack ? '1' : '0');
         formData.append('Remote_Start', remoteStarter ? '1' : '0');
         formData.append('Aftermark_Stereo', aftermarketStereo ? '1' : '0');
         formData.append('Aftermark_Spoiler', aftermarketSpoiler ? '1' : '0');
         formData.append('Minor_Damage', minorDamage ? '1' : '0');
         formData.append('Fading_Paints', fadingPaints ? '1' : '0');
         formData.append('Rust', rust ? '1' : '0');
         formData.append('Hail_Damage', hailDamage ? '1' : '0');
         formData.append('Ext_Mint_Condition', mintCondition ? '1' : '0');
         formData.append('Dents', dents ? '1' : '0');
         formData.append('Seats_Rips_Tears', ripsOrTears ? '1' : '0');
         formData.append('Seats_Visible_Stain', visibleStain ? '1' : '0');
         formData.append('Strong_Smell', strongSmell ? '1' : '0');
         formData.append('Nav_Entmt_Ctrl_Dmg_Sys', damagedSystems ? '1' : '0');
         formData.append('Int_Mint_Condition', IntmintCondition ? '1' : '0');
         formData.append('Original_Factory_Rims', hasOriginalRims ? '1' : '0');
         formData.append('Smoke_In_Vehicle', smokeInVehicle ? '1' : '0');
         formData.append('Tires_Repld_12_Months', tireReplacement ? '1' : '0');
         formData.append('Vehicle_Drivable', vehicleDrivable ? '1' : '0');
         formData.append('Windshield_Crack', crackOnWindshield ? '1' : '0');
         formData.append('Extended_Warranty', extendedWarranty ? '1' : '0');
         formData.append('TradeIn_Interested', tradeInInterest ? '1' : '0');
         formData.append('Winter_Tires', hasWinterTires ? '1' : '0');
         formData.append('Car_Condition', carCondition);
         formData.append('How_Soon_Ready_Sell', sellTiming);
         formData.append('Donot_Need_Car', DonotNeedCar ? '1' : '0');
         formData.append('Mech_Elect_Issues', MechElectIssues ? '1' : '0');
         formData.append('Downsize', DownSize ? '1' : '0');
         formData.append('Buy_Another_Car', BuyAnotherCar ? '1' : '0');
         formData.append('Accident_Claims', isInputVisible ? '1' : '0');
         formData.append('How_Much_Claims', claimnote);
         formData.append('Car_Rims', isAfterMarketSelected ? 'AfterMarket' : 'StockRims');
         formData.append('Stock_Rims', rimschange ? '1' : '0');
         formData.append('Any_Vehicle_Issues', hasIssues ? '1' : '0');
         formData.append('Vehicle_Issues_desc', issuenote);
         formData.append('Car_Modification', isModificationsSelected  ? '1' : '0');
         formData.append('Modification_desc', modificationsnote);
         formData.append('Leased_Financed', isfinancedSelected  ? '1' : '0');
         formData.append('Financed_By', financednote);
         formData.append('vehicle_drivable_not_explanation', notedrivable);
         formData.append('Vehicle_video', vehiclevideo);
		interiorImageUrls.forEach((imageUrl, index) => {
		const fileInput = document.getElementById(`imageInput-${index}`);
		const file = fileInput.files[0];

		if (imageUrl && !imageChanged[index]) {
		  // Extract file name from the URL
		  const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		  // Send the file name to your backend API
		  formData.append(`Interior_Image${index + 1}`, fileName);
		} else if (file) {
		  // Send the image file to your backend API
		  formData.append(`Interior_Image${index + 1}`, file);
		}
	  });
  
  // Dashboard
	  dashboardImageUrls.forEach((imageUrl, index) => {
		const fileInput = document.getElementById(`imageInputd-${index}`);
		const file = fileInput.files[0];

		if (imageUrl && !imageChangedDashboard[index]) {
		  // Extract file name from the URL
		  const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		  // Send the file name to your backend API
		  formData.append(`Dashboard_Image${index + 1}`, fileName);
		} else if (file) {
		  // Send the image file to your backend API
		  formData.append(`Dashboard_Image${index + 1}`, file);
		}
	  });
	   // Exterior
	  exteriorImageUrls.forEach((imageUrl, index) => {
		const fileInput = document.getElementById(`imageInpute-${index}`);
		const file = fileInput.files[0];

		if (imageUrl && !imageChangedExterior[index]) {
		  // Extract file name from the URL
		  const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		  // Send the file name to your backend API
		  formData.append(`Exterior_Image${index + 1}`, fileName);
		} else if (file) {
		  // Send the image file to your backend API
		  formData.append(`Exterior_Image${index + 1}`, file);
		}
	  });
	   // Rims
	  rimsImageUrls.forEach((imageUrl, index) => {
		const fileInput = document.getElementById(`imageInputr-${index}`);
		const file = fileInput.files[0];

		if (imageUrl && !imageChangedRims[index]) {
		  // Extract file name from the URL
		  const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		  // Send the file name to your backend API
		  formData.append(`Rims_Image${index + 1}`, fileName);
		} else if (file) {
		  // Send the image file to your backend API
		  formData.append(`Rims_Image${index + 1}`, file);
		}
	  });
       // Make the API request with formData
       setIsLoading(true); // Show loader
       setIsPopupVisible(false);  // Hide Popup
        try {
            const response = await api.post(`/seller/updatevehicle/${storedVehicleId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });
            setSuccessMessage('Vehicle Edit Successfuly');
        } catch (error) {
            console.error('Error uploading vehicle details:', error);
            // Handle error
        } finally {
       
            if (!sessionStorage.getItem('isNewUser')) {
                // Set a timeout to navigate to '/view-posts' after 5 seconds
                setTimeout(() => {
                    // Navigate to '/view-posts' page
                    navigate('/view-posts');
                }, 5000);
            } else { 
                
                // If 'isNewUser' key exists, remove it from session storage
                sessionStorage.removeItem('isNewUser');
                // Update state to reflect the change
                setIsNewUser(false);

                setIsLoading(false); // Hide loader
                setIsPopupVisible(true); 
            }

        }
      } catch (error) {
         console.error('Error uploading vehicle details:', error);
         // Handle error
     }
    };

const nextStep = () => {
   setCurrentStep(prevStep => {
     const nextStep = prevStep + 1;
 
     // Scroll to the top of the next step
     window.scrollTo({
       top: stepRefs.current[nextStep - 1].offsetTop,
       behavior: 'smooth'
     });
 
     return nextStep;
   });
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

      const vehicleId = sessionStorage.getItem('Vehicle_Id');
      if (!vehicleId) {
        
         navigate('/view-posts');
       }
      const isNewUserSession = sessionStorage.getItem('isNewUser');
    
        setIsNewUser(isNewUserSession === 'true');
        updateStepClasses();
        fetchDataImages();
    }, [currentStep]);

    const baseImageUrl = `https://backend.carchaser.ca/uploads/${storedVehicleId}/`;
   

    const fetchDataImages = async () => {
      try {
        const response = await api.get(`/seller/getvehicleimages/${storedVehicleId}`);
      
        // Extract image names from the response
        const dashboardImages = response.data.Vehicle_Image[0].dashboard;
        const exteriorImages = response.data.Vehicle_Image[0].exterior;
        const interiorImages = response.data.Vehicle_Image[0].interior;
        const rimsImages = response.data.Vehicle_Image[0].rims;
    
        // Mix base URL with each image name and filter out null values
        const mixBaseDashboardImages = [];
		dashboardImages.forEach(image => {
		  if (image !== null) {
			mixBaseDashboardImages.push(baseImageUrl + image);
		  } else {
			mixBaseDashboardImages.push(null);
		  }
		});
        const mixBaseExteriorImages = [];
		exteriorImages.forEach(image => {
		  if (image !== null) {
			mixBaseExteriorImages.push(baseImageUrl + image);
		  } else {
			mixBaseExteriorImages.push(null);
		  }
		});

		const mixBaseInteriorImages = [];
		interiorImages.forEach(image => {
		  if (image !== null) {
			mixBaseInteriorImages.push(baseImageUrl + image);
		  } else {
			mixBaseInteriorImages.push(null);
		  }
		});

		const mixBaseRimsImages = [];
		rimsImages.forEach(image => {
		  if (image !== null) {
			mixBaseRimsImages.push(baseImageUrl + image);
		  } else {
			mixBaseRimsImages.push(null);
		  }
		});
    
	    setInteriorImageUrls(mixBaseInteriorImages);
        setDashboardImageUrls(mixBaseDashboardImages);
        setExteriorImageUrls(mixBaseExteriorImages);
        setRimsImageUrls(mixBaseRimsImages);
      } catch (error) {
        console.error('Error fetching vehicle images:', error);
        // Handle error
      }
    };

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
    
    const handleOptionChangerimss = (event) => {
      const value = event.target.value; // Get the selected value
      setIsAfterMarketSelected(value === 'AfterMarket'); // Update state based on the selected value
      if (value === 'StockRims') {
         setRimsChange('');
   }
  };

  
 
const handleIssuesChange = (event) => {
   const value = event.target.value; // Get the selected value
   setHasIssues(value === 'Yes'); // Update state based on the selected value
   if (value === 'No') {
      setIssueNote('');
}
   setHasIssues(event.target.id === 'showButton2');
};
      const handleModificationsChange = (event) => {
         const value = event.target.value; // Get the selected value
         setIsModificationsSelected(value === 'Yes'); // Update state based on the selected value
          if (value === 'No') {
            setModificationsNote('');
      }
        
        setIsModificationsSelected(event.target.id === 'showButton3');
    };
    const handlefinanced = (event) => {
      const value = event.target.value; // Get the selected value
      setIsFinancedSelected(value === 'Yes'); // Update state based on the selected value
    
      if (value === 'No') {
         setFinancedNote('');
      }
        setIsFinancedSelected(event.target.id === 'showButton4');
    };

   
    
    const handleFileChange = (index, event) => {
      const file = event.target.files[0];
      if (file) {
          // Check if the file type is supported (e.g., image/jpeg, image/png)
          const allowedTypes = ['image/jpeg', 'image/png'];
          if (!allowedTypes.includes(file.type)) {
              // Handle unsupported file type error
         
              return;
          }
  
          // Check if the file size exceeds the limit (in bytes)
          const maxSize = 5 * 1024 * 1024; // 5 MB
          if (file.size > maxSize) {
              // Handle file size limit exceeded error
             
              return;
          }
  
          const reader = new FileReader();
          reader.onload = () => {
              const newPreviews = [...imagePreviews];
              newPreviews[index] = reader.result;
              setImagePreviews(newPreviews);
          };
          reader.readAsDataURL(file);
      } else {
          // Handle no file selected error
          console.error('No file selected.');
      }
  };



    return (
        
        <section class="car-details">
        <SellerNav />
        <div class="container">
           <form id="multi-step-form" onSubmit={handleSubmit} enctype="multipart/form-data">
              <h3 class="main-heading text-center">Upload Vehicle Details</h3>
              {renderStepIndicator()}
              <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} id="step-1" ref={el => stepRefs.current[0] = el}>
                 <div class="vehicle-detaile-one">
                    <h3 class="vehicle-info-heading">Tell us more about your vehicle</h3>
                    <p>Share details about your vehicle to receive a solid offer within minutes</p>
                    <div class="mileage-section d-flex">                            
                        <div className="form-group">
                           <input type="text" value={location} hidden />
                           <input type="text" value={vin}  hidden/>
                           <input type="text" value={year}  hidden/>
                           <input type="text" value={make}  hidden/>
                           <input type="text" value={model} hidden />
                           <input type="text" value={trim} hidden />
                           <input type="text" value={mileage}  hidden/>
                           <label htmlFor="exampleFormControlSelect1">Color</label>
                           <select className="form-control" id="exampleFormControlSelect1" value={selectedColor} onChange={handleColorChange}>
                           <option value="Red">Red</option>
                              <option value="Orange">Orange</option>
                              <option value="Yellow">Yellow</option>
                              <option value="Green">Green</option>
                              <option value="Blue">Blue</option>
                              <option value="Pink">Pink</option>
                              <option value="Purple">Purple</option>
                              <option value="Indigo">Indigo</option>
                              <option value="Violet">Violet</option>
                              <option value="Brown">Brown</option>
                              <option value="Gray">Gray</option>
                              <option value="Black">Black</option>
                              <option value="White">White</option>
                           </select>
                        </div>
                       <div class="form-group">
                          <label for="exampleFormControlSelect1">Keys</label>
                          <select class="form-control" id="exampleFormControlSelect1" value={selectedKeys} onChange={handlekeys} >  
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                          </select>
                       </div>
                    </div>
                    <div class="vehicle-detail-list">
                       <div class="row">
                          <div class="col-md-4">
                          <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck1"
                                    checked={setoftire} // Bind checked status to state variable
                                    onChange={handleSetoftireChange} // Handle checkbox change
                                 />
                                 <label className="form-check-label" htmlFor="defaultCheck1"></label>
                                 <span>2 sets of tire</span>
                           </div>
                          </div>
                          <div class="col-md-4">
                              <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck2"
                                 checked={windowTint} // Bind checked status to state variable
                                 onChange={handleWindowTintChange} // Handle checkbox change
                              />
                              <label className="form-check-label" htmlFor="defaultCheck2"></label>
                              <span>Window tint</span>
                        </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                             <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck3"
                                 checked={aftermarketExhaust} // Bind checked status to state variable
                                 onChange={handleAftermarketExhaustChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck3"></label>
                                <span>Aftermarket exhaust</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                             <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck4"
                                 checked={aftermarketRims} // Bind checked status to state variable
                                 onChange={handleAftermarketRimsChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck4"></label>
                                <span>Aftermarket rims</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                             <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck5"
                                 checked={roofRack} // Bind checked status to state variable
                                 onChange={handleRoofRackChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck5"></label>
                                <span>Roof rack</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                             <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck6"
                                 checked={remoteStarter} // Bind checked status to state variable
                                 onChange={handleRemoteStarterChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck6"></label>
                                <span>Remote starter</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                               <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck7"
                                 checked={aftermarketStereo} // Bind checked status to state variable
                                 onChange={handleAftermarketStereoChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck7"></label>
                                <span>Aftermarket stereo</span>
                             </div>
                          </div>
                          <div class="col-md-4">
                             <div class="form-check">
                             <input
                                 className="form-check-input"
                                 type="checkbox"
                                 id="defaultCheck8"
                                 checked={aftermarketSpoiler} // Bind checked status to state variable
                                 onChange={handleAftermarketSpoilerChange} // Handle checkbox change
                              />
                                <label class="form-check-label" for="defaultCheck8"></label>
                                <span>Aftermarket spoiler</span>
                             </div>
                          </div>
                       </div>
                       <h3 class="vehicle-info-heading pt-5">Any exterior/body damage?</h3>
                       <div class="row">
                          <div class="col-md-12">
                             <div class="form-check">
                              <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck9"
                              checked={minorDamage} // Bind checked status to state variable
                              onChange={handleMinorDamageChange} // Handle checkbox change
                           />
                                <label class="form-check-label" for="defaultCheck9"></label>
                                <span>Minor damage (scratches, stone chips,scruffs)</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"
                                  checked={fadingPaints} // Bind checked status to state variable
                                  onChange={handleFadingPaintsChange} // Hand
                                />
                                <label class="form-check-label" for="defaultCheck10"></label>
                                <span>Fading paints</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck11"
                                checked={rust} // Bind checked status to state variable
                                onChange={handleRustChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck11"></label>
                                <span>Rust</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck12"
                                checked={hailDamage} // Bind checked status to state variable
                                onChange={handleHailDamageChange} // Handle checkbox change
                                
                                />
                                <label class="form-check-label" for="defaultCheck12"></label>
                                <span>hail damage</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck13"
                                checked={mintCondition} // Bind checked status to state variable
                                  onChange={handleMintConditionChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck13"></label>
                                <span>mint condition</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck14"
                                 checked={dents} // Bind checked status to state variable
                                 onChange={handleDentsChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck14"></label>
                                <span>dents</span>
                             </div>
                          </div>
                       </div>
                       <h3 class="vehicle-info-heading pt-5">Any interior damage?</h3>
                       <div class="row">
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck15" 
                                 checked={ripsOrTears} // Bind checked status to state variable
                                 onChange={handleRipsOrTearsChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck15"></label>
                                <span>Rips or tears on the seats</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck16"
                               checked={visibleStain} // Bind checked status to state variable
                               onChange={handleVisibleStainChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck16"></label>
                                <span>Visible stain on the seats</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck17"
                                 checked={strongSmell} // Bind checked status to state variable
                                 onChange={handleStrongSmellChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck17"></label>
                                <span>strong smell (smoking, pets and other)</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck18"
                                 checked={damagedSystems} // Bind checked status to state variable
                                 onChange={handleDamagedSystemsChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck18"></label>
                                <span>damaged systems  (navigation, entertainment, and controls) others</span>
                             </div>
                          </div>
                          <div class="col-md-6">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck19"
                                checked={IntmintCondition} // Bind checked status to state variable
                                onChange={handleIntMintConditionChange} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck19"></label>
                                <span>mint condition</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="our-priority pt-5">
                       <h3 class="vehicle-info-heading">Our top priority is to sell your car.</h3>
                       <p>We are ager to have a conversation with you.</p>
                       <div className="our-priority-list">
                        <p className="pb-0 mb-0">Do you smoke in this vehicle?</p>
                        <div className="list-panel-priority">
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios1"
                                    id="exampleRadios1"
                                    value="No"
                                    checked={!smokeInVehicle} // Bind checked status to state variable
                                    onChange={handleSmokeInVehicleChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios1"><span>No</span> </label>
                           </div>
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios1"
                                    id="exampleRadios2"
                                    value="Yes"
                                    checked={smokeInVehicle} // Bind checked status to state variable
                                    onChange={handleSmokeInVehicleChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios2"><span>Yes</span> </label>
                           </div>
                        </div>
                  </div>
                       <div className="our-priority-list">
                           <p className="pb-0 mb-0">Do you have original factory rims?</p>
                           <div className="list-panel-priority">
                              <div className="form-check">
                                 <input
                                       className="form-check-input"
                                       type="radio"
                                       name="exampleRadios2"
                                       id="exampleRadios3"
                                       value="No"
                                       checked={!hasOriginalRims} // Bind checked status to state variable
                                       onChange={handleOriginalRimsChange} // Handle radio button change
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios3"><span>No</span> </label>
                              </div>
                              <div className="form-check">
                                 <input
                                       className="form-check-input"
                                       type="radio"
                                       name="exampleRadios2"
                                       id="exampleRadios4"
                                       value="Yes"
                                       checked={hasOriginalRims} // Bind checked status to state variable
                                       onChange={handleOriginalRimsChange} // Handle radio button change
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios4"><span>Yes</span> </label>
                              </div>
                           </div>
                     </div>
                     <div className="our-priority-list">
                        <p className="pb-0 mb-0">Have you replaced your tires in the last 12 months?</p>
                        <div className="list-panel-priority">
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios3"
                                    id="exampleRadios5"
                                    value="No"
                                    checked={!tireReplacement} // Bind checked status to state variable
                                    onChange={handleTireReplacementChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios5"><span>No</span> </label>
                           </div>
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios3"
                                    id="exampleRadios6"
                                    value="Yes"
                                    checked={tireReplacement} // Bind checked status to state variable
                                    onChange={handleTireReplacementChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios6"><span>Yes</span> </label>
                           </div>
                        </div>
                    </div>
                    <div>
                     <div className="our-priority-list">
                     <p className="pb-0 mb-0">Is your vehicle drivable?</p>
                     <div className="list-panel-priority">
                        <div className="form-check">
                           <input
                           className="form-check-input"
                           type="radio"
                           name="exampleRadios4"
                           id="exampleRadios7"
                           value="No"
                           checked={!vehicleDrivable}
                           onChange={handleVehicleDrivableChange}
                           />
                           <label className="form-check-label" htmlFor="exampleRadios7"><span>No</span></label>
                        </div>
                        <div className="form-check">
                           <input
                           className="form-check-input"
                           type="radio"
                           name="exampleRadios4"
                           id="exampleRadios8"
                           value="Yes"
                           checked={vehicleDrivable}
                           onChange={handleVehicleDrivableChange}
                           />
                           <label className="form-check-label" htmlFor="exampleRadios8"><span>Yes</span></label>
                        </div>
                     </div>
                     </div>
                     {!vehicleDrivable && (
                     <div className="form-group pb-3 px-2 " id="inputField4">                
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please explain why"
                        value={notedrivable}
                           onChange={handledrivablenote}
                           ></textarea>
                     </div>
                     )}
                  </div>
                      
                         <div className="our-priority-list">
                              <p className="pb-0 mb-0">Any crack on the windshield?</p>
                              <div className="list-panel-priority">
                                 <div className="form-check">
                                    <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios5"
                                          id="exampleRadios9"
                                          value="No"
                                          checked={!crackOnWindshield} // Bind checked status to state variable
                                          onChange={handleCrackOnWindshieldChange} // Handle radio button change
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios9"><span>No</span> </label>
                                 </div>
                                 <div className="form-check">
                                    <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios5"
                                          id="exampleRadios10"
                                          value="Yes"
                                          checked={crackOnWindshield} // Bind checked status to state variable
                                          onChange={handleCrackOnWindshieldChange} // Handle radio button change
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios10"><span>Yes</span> </label>
                                 </div>
                              </div>
                        </div>
                        <div className="our-priority-list">
                           <p className="pb-0 mb-0">Do you have any extended warranty?</p>
                           <div className="list-panel-priority">
                              <div className="form-check">
                                 <input
                                       className="form-check-input"
                                       type="radio"
                                       name="exampleRadios6"
                                       id="exampleRadios11"
                                       value="No"
                                       checked={!extendedWarranty} // Bind checked status to state variable
                                       onChange={handleExtendedWarrantyChange} // Handle radio button change
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios11"><span>No</span> </label>
                              </div>
                              <div className="form-check">
                                 <input
                                       className="form-check-input"
                                       type="radio"
                                       name="exampleRadios6"
                                       id="exampleRadios12"
                                       value="Yes"
                                       checked={extendedWarranty} // Bind checked status to state variable
                                       onChange={handleExtendedWarrantyChange} // Handle radio button change
                                 />
                                 <label className="form-check-label" htmlFor="exampleRadios12"><span>Yes</span> </label>
                              </div>
                           </div>
                     </div>
                     <div className="our-priority-list">
                        <p className="pb-0 mb-0">Are you interested in a trade-in?</p>
                        <div className="list-panel-priority">
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios7"
                                    id="exampleRadios13"
                                    value="No"
                                    checked={!tradeInInterest} // Bind checked status to state variable
                                    onChange={handleTradeInInterestChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios13"><span>No</span> </label>
                           </div>
                           <div className="form-check">
                              <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios7"
                                    id="exampleRadios14"
                                    value="Yes"
                                    checked={tradeInInterest} // Bind checked status to state variable
                                    onChange={handleTradeInInterestChange} // Handle radio button change
                              />
                              <label className="form-check-label" htmlFor="exampleRadios14"><span>Yes</span> </label>
                           </div>
                        </div>
                        </div>
                           
                           </div>
                        </div>
                        <button class="btn btn-primary form-button py-3 px-5 my-3" type="button"onClick={nextStep}>Continue</button>
                     </div>
                     <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} id="step-2" ref={el => stepRefs.current[1] = el}>
                        <div class="vehicle-detaile-one">
                           <h3 class="vehicle-info-heading">Now is the perfect moment to sell your vehicle. No time !</h3>
                           <p>Share details about your vehicle to receive a solid offer within minutes</p>
                           <div className="readyto-sell">
                        <p className="pb-0 mb-0">How soon are you ready to sell?</p>
                        <div className="readyto-sell-priority">
                              <div className="row">
                                 <div className="col-lg-3 col-6">
                                    <div className="form-check ">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios9"
                                             id="exampleRadios1"
                                             value="Immediately"
                                             checked={sellTiming === 'Immediately'} // Bind checked status to state variable
                                             onChange={handleSellTimingChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios1"><span>Immediately</span> </label>
                                    </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                    <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios9"
                                             id="exampleRadios2"
                                             value="1-2 months"
                                             checked={sellTiming === '1-2 months'} // Bind checked status to state variable
                                             onChange={handleSellTimingChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios2"><span>1-2 months</span> </label>
                                    </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                    <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios9"
                                             id="exampleRadios3"
                                             value="3-5 months"
                                             checked={sellTiming === '3-5 months'} // Bind checked status to state variable
                                             onChange={handleSellTimingChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios3"><span>3-5 months</span> </label>
                                    </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                    <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios9"
                                             id="exampleRadios4"
                                             value="6-12 months"
                                             checked={sellTiming === '6-12 months'} // Bind checked status to state variable
                                             onChange={handleSellTimingChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios4"><span>6-12 months</span> </label>
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
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck9"
                                  checked={DonotNeedCar} // Bind checked status to state variable
                                  onChange={handledonotneedCar} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck9"></label>
                                <span>selling because I don’t need the car anymore</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"
                                  checked={MechElectIssues} // Bind checked status to state variable
                                  onChange={handlemechelectIssues} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck10"></label>
                                <span>selling because the car has some mechanical/ electrical issues</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck11"
                                  checked={DownSize} // Bind checked status to state variable
                                  onChange={handlesellingtodownsize} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck11"></label>
                                <span>selling to downsize</span>
                             </div>
                          </div>
                          <div class="col-md-12">
                             <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck12"
                                checked={BuyAnotherCar} // Bind checked status to state variable
                                onChange={handleBuyAnotherCar} // Handle checkbox change
                                />
                                <label class="form-check-label" for="defaultCheck12"></label>
                                <span>selling to buy another car</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="readyto-sell">
                           <p className="pb-0 mb-0">Select the best option that describes the condition of the car</p>
                           <div className="readyto-sell-priority">
                              <div className="row">
                                 <div className="col-lg-3 col-6">
                                       <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios10"
                                             id="exampleRadios01"
                                             value="Awesome"
                                             checked={carCondition === 'Awesome'} // Bind checked status to state variable
                                             onChange={handleCarConditionChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios01"><span>Awesome</span> </label>
                                       </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                       <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios10"
                                             id="exampleRadios02"
                                             value="Good"
                                             checked={carCondition === 'Good'} // Bind checked status to state variable
                                             onChange={handleCarConditionChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios02"><span>Good</span> </label>
                                       </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                       <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios10"
                                             id="exampleRadios03"
                                             value="Ok"
                                             checked={carCondition === 'Ok'} // Bind checked status to state variable
                                             onChange={handleCarConditionChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios03"><span>Ok</span> </label>
                                       </div>
                                 </div>
                                 <div className="col-lg-3 col-6">
                                       <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="radio"
                                             name="exampleRadios10"
                                             id="exampleRadios04"
                                             value="Rough"
                                             checked={carCondition === 'Rough'} // Bind checked status to state variable
                                             onChange={handleCarConditionChange} // Handle radio button change
                                          />
                                          <label className="form-check-label" htmlFor="exampleRadios04"><span>Rough</span> </label>
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
                                <input class="form-check-input" type="radio" name="exampleRadios" id="hideButton1"
                                checked={!isInputVisible} 
                                value="No"
                                onChange={handleaccidentclaims} // Handle radio button change
                          
                                />
                                <label class="form-check-label" for="exampleRadios11"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="showButton1" value="Yes"
                                 
                                 checked={isInputVisible}
                                 onChange={handleaccidentclaims} // Handle radio button change
                                />
                                <label class="form-check-label" for="exampleRadios12"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isInputVisible && (
                            <div className="form-group pb-3 px-2" id="inputField1">                
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Eg. Front end Damage, rear end collision etc., $2000"
                                value={claimnote}
                                 onChange={handleclaimnote}
                                ></textarea>
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
                                        name="exampleRadiosRims"
                                        id="hideButton"
                                        value="StockRims"
                                 
                                        onChange={handleOptionChangerimss}
                                        checked={!isAfterMarketSelected}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios133"><span>Stock Rims</span></label>
                                </div>
                                <div className="form-check option-field">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadiosRims"
                                        id="showButton"
                                        value="AfterMarket"
                               
                                        onChange={handleOptionChangerimss}
                                        checked={isAfterMarketSelected}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios12"><span>After Market</span></label>
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
                                        <input className="form-check-input" type="radio" name="exampleRadios13" id="exampleRadios13" value="No"
                                        onChange={handleMarketRimsChange} 
                                        checked={!rimschange} 
                                        />
                                        <label className="form-check-label" htmlFor="exampleRadios12"><span>No</span></label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios13" id="exampleRadios14" value="Yes"
                                        onChange={handleMarketRimsChange} 
                                        checked={rimschange} 
                                        />
                                        <label className="form-check-label" htmlFor="exampleRadios13"><span>Yes</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Any issues with the vehicle?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios25" id="hideButton2" value="No"
                                 onChange={handleIssuesChange}
                                 checked={!hasIssues}
                            
                                />
                                <label class="form-check-label" for="exampleRadios16"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios25" id="showButton2" value="Yes"
                                 onChange={handleIssuesChange}
                                 checked={hasIssues}
                                
                                />
                                <label class="form-check-label" for="exampleRadios16"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                      {hasIssues && (
                            <div className="form-group pb-3 px-2" id="inputField2">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="eg. Warning Light shows, Brakes are squeaking/grinding etc."
                                 value={issuenote}
                                 onChange={handleissuenote}
                                ></textarea>
                            </div>
                        )}
                    </div>
                    
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Are there any modifications on the car?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios14" id="hideButton3" value="No"
                                onChange={handleModificationsChange}
                                checked={!isModificationsSelected}
                                />
                                <label class="form-check-label" for="exampleRadios17"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios14" id="showButton3" value="Yes"
                                 onChange={handleModificationsChange}
                                 checked={isModificationsSelected}
                                />
                                <label class="form-check-label" for="exampleRadios18"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isModificationsSelected && (
                       <div class="form-group pb-3 px-2 " id="inputField3">                
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please describe"
                           value={modificationsnote}
                           onChange={handlemodificationsnote}
                          ></textarea>
                       </div>
                         )}
                    </div>
                    <div class="ourview-listpanel my-3">
                       <div class="our-view-list">
                          <p class="pb-0 mb-0">Is the car leased or financed?</p>
                          <div class="list-panel-priority">
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios15" id="hideButton4" value="No"  
                                  onChange={handlefinanced}
                                  checked={!isfinancedSelected}
                                />
                                <label class="form-check-label" for="exampleRadios19"><span>No</span> </label>                  
                             </div>
                             <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios15" id="showButton4" value="Yes"
                                 onChange={handlefinanced}
                                 checked={isfinancedSelected}
                                />
                                <label class="form-check-label" for="exampleRadios20"><span>Yes</span> </label>                 
                             </div>
                          </div>
                       </div>
                       {isfinancedSelected && (
                       <div class="form-group pb-3 px-2 " id="inputField4">                
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please share who the car is leased or financed by and the amount"
                           value={financednote}
                           onChange={handlefinancednote}
                          ></textarea>
                       </div>
                         )}
                    </div>
                    <div class="form-group pb-3 px-2" id="inputField4">    
      <p class="pb-0 font-weight-bold">Vehicle Upload Video Link</p> 
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="1"
        onChange={handlevehiclevideo}
        value={vehiclevideo}
        
      ></textarea>
    </div>
                    <h3 className="vehicle-info-heading pt-3">Interior of the car</h3>
                    <div className="row">
					 {/* Render input fields for each type of car part */}
						{/* Display existing images */}

                  {interiorImageUrls.map((imageUrl, index) => (
    <div key={index}>
        {imageUrl ? (
            <div style={{ position: 'relative' }}>
                <img
                    src={imageUrl}
                    alt={`Interior Image ${index}`}
                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                />
                <button
                    onClick={() => handleRemoveImage(index)}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: '16px',
                    }}
                >
                    &#10006;
                </button>
            </div>
        ) : (
            <div
                onClick={() => document.getElementById(`imageInput-${index}`).click()}
                style={{ width: '100px', height: '100px', margin: '5px', border: '1px solid #ccc', textAlign: 'center', lineHeight: '100px', cursor: 'pointer' }}
            >
                Add Image
            </div>
        )}
        <input
            id={`imageInput-${index}`}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(event) => handleImageChange(event, index)}
        />
    </div>
))}        
        	    </div>
               <h3 className="vehicle-info-heading pt-3">Exterior of the car</h3>
<div className="row">
    {/* Display existing images */}
    {exteriorImageUrls.map((imageUrl, index) => (
        <div key={index}>
            {imageUrl ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={imageUrl}
                        alt={`Exterior Image ${index}`}
                        style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                    />
                    <button
                        onClick={() => handleRemoveExteriorImage(index)}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'red',
                            fontSize: '16px',
                        }}
                    >
                        &#10006;
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => document.getElementById(`imageInpute-${index}`).click()}
                    style={{ width: '100px', height: '100px', margin: '5px', border: '1px solid #ccc', textAlign: 'center', lineHeight: '100px', cursor: 'pointer' }}
                >
                    Add Image
                </div>
            )}
            <input
                id={`imageInpute-${index}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(event) => handleImageChangeexterior(event, index)}
            />
        </div>
    ))}
</div>
<h3 className="vehicle-info-heading pt-3">Dashboard of the car</h3>
<div className="row">
    {/* Display existing images */}
    {dashboardImageUrls.map((imageUrl, index) => (
        <div key={index}>
            {imageUrl ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={imageUrl}
                        alt={`Dashboard Image ${index}`}
                        style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                    />
                    <button
                        onClick={() => handleRemoveDashboardImage(index)}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'red',
                            fontSize: '16px',
                        }}
                    >
                        &#10006;
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => document.getElementById(`imageInputd-${index}`).click()}
                    style={{ width: '100px', height: '100px', margin: '5px', border: '1px solid #ccc', textAlign: 'center', lineHeight: '100px', cursor: 'pointer' }}
                >
                    Add Image
                </div>
            )}
            <input
                id={`imageInputd-${index}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(event) => handleImageChangedashboard(event, index)}
            />
        </div>
    ))}
</div>
<h3 className="vehicle-info-heading pt-3">Rims of the car</h3>
<div className="row">
    {/* Display existing images */}
    {rimsImageUrls.map((imageUrl, index) => (
        <div key={index}>
            <label htmlFor={`imageInputr-${index}`}>
                {imageUrl ? (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={imageUrl}
                            alt={`Rims Image ${index}`}
                            style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                        />
                        <button
                            onClick={() => handleRemoveRimsImage(index)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'red',
                                fontSize: '16px',
                            }}
                        >
                            &#10006;
                        </button>
                    </div>
                ) : (
                    <div
                        style={{ width: '100px', height: '100px', margin: '5px', border: '1px solid #ccc', textAlign: 'center', lineHeight: '100px', cursor: 'pointer' }}
                    >
                        Add Image
                    </div>
                )}
                <input
                    id={`imageInputr-${index}`}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(event) => handleImageChangerims(event, index)}
                />
            </label>
        </div>
    ))}
</div>
          
                 </div>
            
 {isNewUser ? (
   <div>
   {isLoading && (
       <div className="loader">
           <img src="../images/load.png"/>
           <p>Loading your Estimate</p>
       </div>
   )}
   {!isLoading && (
       <button className="btn btn-primary form-button py-3 px-5 my-3" onClick={handleSubmit} type="button">
           Submit
       </button>
   )}
</div>
) : (
     <div>{successMessage && <p class="text-success">{successMessage}</p>}
    <button className="btn btn-primary form-button py-3 px-5 my-3" onClick={handleSubmit} type="button">
        Update
    </button>
    </div>
)}
                 </div>
           </form>
        </div>
     
            {isPopupVisible && (
                   <div class="main-popout">
               <div class="inner-popout">
                  <div className="form-step-img">
                    <img src="../images/pngkey-1.png" alt="image" />
                 </div>
               <h3 className="main-heading py-3">Vehicle Added Successfully</h3>
               <a href="/carvalue" className="btn btn-primary px-5 py-3">Let's Get Going</a>
               </div>
               </div>
           )}
     
     </section>

    );
};