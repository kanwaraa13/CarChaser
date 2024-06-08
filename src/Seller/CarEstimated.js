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
            setLocation(vehicleData.Location || '');
            setFirmPrice(vehicleData.firm_price || '');
            setVin(vehicleData.VIN || '');
            const vin = vehicleData.VIN;
            setYear(vehicleData.Year || '');
            setModel(vehicleData.Model || '');
            setTrim(vehicleData.Trim || '');
            const trim = vehicleData.Trim;
            setMileage(vehicleData.Mileage || '');
            const mileage = vehicleData.Mileage;
            setMake(vehicleData.Make || '');
            setExteriorImage(vehicleData['Exterior_Image'] || '');
            setExteriorImageTwo(vehicleData['Exterior_Image2'] || '');
            setExteriorImageThree(vehicleData['Exterior_Image3'] || '');
            setExteriorImageFour(vehicleData['Exterior_Image4'] || '');
            try {
                const response = await api.get(`/seller/vehicleofferprice/${vin}/${mileage}/${trim}`);
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

    const postDataFirmPrice = async () => {
        try {
            const response = await api.post(`/seller/updatefirmprice/${storedVehicleId}`, {
                firm_price: getPrice
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
                                    src={`https://topdevit.com/clients/carchaser/public/uploads/${storedVehicleId}/${exteriorimage || exteriorimagetwo || exteriorimagethree || exteriorimagefour}`}
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
                                <h3>{formatWithCommas(averageprice)}</h3>
                            ) : (
                                <p>No price available</p>
                            )}
                            <p><strong>Estimated Offer:-</strong></p>
                        </div>
                    </div>
                </div>
                <div className="estimate-panel py-5">
                    <h3> Car Chaser's Estimated Value Range for Your Car.</h3>
                    <p>Our estimated range serves as an initial assessment. By leveraging competition within our dealer network, Car Chaser ensures you receive a solid offer, ultimately leading to a higher price compared to other alternatives.</p>
                </div>
               
                <div id="mountainChart">
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={350} />
                </div>
                {getPrice && (
                    <div className="estimate-button pb-5">
                        <button className="btn btn-primary" onClick={postDataFirmPrice}>Sounds good, Let's Book My Appointment Now</button>
                    </div>
                )}
            </div>
        </section>
    );
};
