import React, { useState, useEffect } from 'react';
import { SellerNav } from './SellerNav';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import ReactApexChart from 'react-apexcharts'; // Import ApexCharts wrapper
export const CarEstimated = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [vin, setVin] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [trim, setTrim] = useState('');
    const [mileage, setMileage] = useState('');
    const [exteriorimage, setExteriorImage] = useState('');
    const [exteriorimagetwo, setExteriorImageTwo] = useState('');
    const [exteriorimagethree, setExteriorImageThree] = useState('');
    const [exteriorimagefour, setExteriorImageFour] = useState('');
    const [sessionVehicleId, setSessionVehicleId] = useState('');
    const [getPrice, setGetPrice] = useState('');
    const [averageprice, setGetaveragePrice] = useState('');
    const [belowprice, setGetbelowPrice] = useState('');
    const [firmPrice, setFirmPrice] = useState('');
    const storedVehicleId = sessionStorage.getItem('Vehicle_Id');
    const [fadingpaints, setFadingPaints] = useState('');
    const [rust, setRust] = useState('');
    const [minordamage, setMinorDamage] = useState('');
    const [dents, setDents] = useState('');
    const [haildamage, setHailDamage] = useState('');
    const [ripsOrTears, setRipsOrTears] = useState(false); 
    const [visibleStain, setVisibleStain] = useState(false);
    const [strongSmell, setStrongSmell] = useState(false);
    const [damagedSystems, setDamagedSystems] = useState(false);
    const [hasOriginalRims, setHasOriginalRims] = useState(null);
    const [tireReplacement, setTireReplacement] = useState(null); 
    const [crackOnWindshield, setCrackOnWindshield] = useState(null);

    useEffect(() => {
    if (storedVehicleId) {
         fetchData();
    } else {
         console.error('Vehicle Id is null');
    }
    }, [storedVehicleId]);

    const fetchData = async () => {
        try {
            const response = await api.get(`/seller/vehicle/${storedVehicleId}`);
            const vehicleData = response.data.vehicle;
            setRust(vehicleData.Rust || '')
            setFadingPaints(vehicleData.Fading_Paints || '');
            setLocation(vehicleData.Location || '');
            setFirmPrice(vehicleData.firm_price || '');
            setVin(vehicleData.VIN || '');
            const vin = vehicleData.VIN;
            setYear(vehicleData.Year || '');
            const year = vehicleData.Year;
            setModel(vehicleData.Model || '');
            const model = vehicleData.Model;
            setTrim(vehicleData.Trim || '');
            const trim = vehicleData.Trim;
            setMileage(vehicleData.Mileage || '');
            const mileage = vehicleData.Mileage;
            setMake(vehicleData.Make || '');
            const make = vehicleData.Make;
            if (vehicleData.Rust === 1) {
                 setRust('Rust');
            }else {
                 setRust('');
            }
            if (vehicleData.Fading_Paints === 1) {
                setFadingPaints('Fading Paints');
            }else{
                 setFadingPaints('');
            }
            if (vehicleData.Hail_Damage === 1) {
                  setHailDamage('Hail Damage');
            }else{
                 setHailDamage(''); 
            }
            if (vehicleData.Dents === 1) {
                 setDents('Dents');
            }else{
                 setDents('');
            }
            if (vehicleData.Minor_Damage === 1) {
                setMinorDamage('Minor Damage');
            }else{
                setMinorDamage('');
            }
            if (vehicleData.Nav_Entmt_Ctrl_Dmg_Sys === 1) {
                setDamagedSystems('Damaged Systems');
            }else{
                setDamagedSystems('');
            }
            if (vehicleData.Strong_Smell === 1) {
                setStrongSmell('Strong Smell');
            }else{
                setStrongSmell('');
            }
            if (vehicleData.Seats_Visible_Stain === 1) {
                setVisibleStain('Visible Stain On The Seats');
            }else{
                setVisibleStain('');
            }
            if (vehicleData.Seats_Rips_Tears === 1) {
                setRipsOrTears('Rips Or Tears On The Seats');
            }else{
                setRipsOrTears('');
            }
            if (vehicleData.Original_Factory_Rims === 1) {
                setHasOriginalRims('Yes');
            }else{
                setHasOriginalRims('');
            }
            if (vehicleData.Tires_Repld_12_Months === 1) {
                setTireReplacement('Yes');
            }else{
                setTireReplacement('');
            }
            if (vehicleData.Windshield_Crack === 1) {
                setCrackOnWindshield('Yes');
            }else{
                setCrackOnWindshield('');
            }
            setExteriorImage(vehicleData['Exterior_Image'] || '');
            setExteriorImageTwo(vehicleData['Exterior_Image2'] || '');
            setExteriorImageThree(vehicleData['Exterior_Image3'] || '');
            setExteriorImageFour(vehicleData['Exterior_Image4'] || '');
            try {
                    const response = await api.get(`/seller/vehicleofferprice/${vin}/${mileage}/${trim}/${year}/${make}/${model}`);
                    const offerprice = response.data.offer_price;
                    const average = response.data.average_price;
                    const belowprice = response.data.below_price;
                    setGetPrice(offerprice);
                    setGetaveragePrice(average);
                    setGetbelowPrice(belowprice);
                } catch (error) {
                    console.error('Error fetching offer price:', error);
                }
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
        }
    };
    
    // Deduction of price by Checks
    const rustValue = rust === 'Rust' ? 800 : 0;
    const fadingPaintsValue = fadingpaints === 'Fading Paints' ? 750 : 0;
    const haildamgeValue = haildamage === 'Hail Damage' ? 800 : 0;
    const dentsValue = dents === 'Dents' ? 700 : 0;
    const minordamageValue = minordamage === 'Minor Damage' ? 300 : 0;
    const ripsOrTearsvalue  = ripsOrTears === 'Rips Or Tears On The Seats' ? 750 : 0;
    const visibleStainvalue = visibleStain === 'Visible Stain On The Seats' ? 350 : 0;
    const strongSmellvalue = strongSmell === 'Strong Smell' ? 350 : 0;
    const damagedSystemsvalue = damagedSystems === 'Damaged Systems' ? 1500 : 0;
    const hasOriginalRimsvalue = hasOriginalRims === 'Yes' ? 1000 : 0;
    const tireReplacementvalue = tireReplacement === 'Yes' ? 1000 : 0;
    const crackOnWindshieldvalue = crackOnWindshield === 'Yes' ? 800 : 0;
    const totalDeductions = rustValue + fadingPaintsValue + haildamgeValue + dentsValue + minordamageValue + ripsOrTearsvalue + visibleStainvalue + strongSmellvalue + damagedSystemsvalue + hasOriginalRimsvalue + tireReplacementvalue + crackOnWindshieldvalue;
    const finalPrice = averageprice - totalDeductions;

    const postDataFirmPrice = async () => {
        try {
            const response = await api.post(`/seller/updatefirmprice/${storedVehicleId}`, {
            firm_price: finalPrice
        });
            navigate('/book-appointment');
        } catch (error) {
            console.error('Error updating firm price:', error);
        }
    };

    const formatWithCommas = (value) => {
    // Ensure the value is a number and format it with commas and two decimal places
        if (isNaN(value) || value === null || value === undefined) {
            return '$0.00';
        }
        return `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };
    // Chart options and data
        const chartOptions = {
            chart: {
                type: 'area',
                height: 250
            },
            series: [{
                name: 'Price',
                data: [belowprice, averageprice, getPrice]
            }],
            xaxis: {
                categories: ['Below Market', 'Average Market', 'Above Market']
            },
            grid: {
                show: false
            },
                tooltip: {
                y: {
                formatter: (value) => formatWithCommas(value)
                }
            }
        };
return (
<section className="car-details">
   <SellerNav />
   <div className="container">
      <div className="estimateimg-detail row">
         <div className="estimated-bannerimg col-md-7">
            <div className="image-panel">
               {(exteriorimage || exteriorimagetwo || exteriorimagethree || exteriorimagefour) && (
               <img
               src={`https://backend.carchaser.ca/uploads/${storedVehicleId}/${exteriorimage || exteriorimagetwo || exteriorimagethree || exteriorimagefour}`}
               alt="Exterior"
               />
               )}
            </div>
         </div>
         <div className="estimated-price py-4 col-md-5">
            <div className="estimate-name">
               <h3>{year} {make}</h3>
               <p><strong>{model}</strong> | {trim}</p>
            </div>
            <div className="estimated-list py-3">
               {getPrice ? (
               finalPrice > 0 ? (
               <h3>{formatWithCommas(finalPrice)}</h3>
               ) : (
               <p>No price available</p>
               )
               ) : (
               <div className="loader">
                  <img src="../images/load.png" alt="Loading" />
                  <p>Calculating your Offer</p>
               </div>
               )}
               <p><strong>Estimated Offer:-</strong></p>
            </div>
         </div>
      </div>
      <div className="estimate-panel py-5">
         <h3> Car Chaser's Estimated Value Range for Your Car.</h3>
         <p>Our estimated range acts as a preliminary evaluation. Through harnessing competition among our dealer network, Car Chaser guarantees you secure a competitive offer, ultimately resulting in a higher price than other options.</p>
      </div>
      {
      /*
      <div id="mountainChart">
         <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={350} />
      </div>
      */
      }
      {getPrice && (
      <div className="estimate-button pb-5">
         <button className="btn btn-primary" onClick={postDataFirmPrice}>Sounds good, Let's Book My Appointment Now</button>
      </div>
      )}
   </div>
</section>
);
};