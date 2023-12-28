import React from 'react'
import { useState } from 'react';
import HashLoader from "react-spinners/HashLoader.js";
import { Link, useNavigate } from "react-router-dom";

const SidePanel = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    paymentOption: 'Card Payment', // Default to 'Card Payment'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();


    navigate("/doctors/:id/payment");

    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'> 
     <div className='flex items-center justify-between'>
 <p className='text__para mt-0 font-semibold'>Ticket Price</p>
 <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>500 BDT</span>
     </div>

     <div className='mt-[30px]'>
 <p className='text__para mt-0 font-semibold text-headingColor'>Available Time Slots:</p>
 <ul className='mt-3'>
  <li className='flex items-center justify-between mb-2'>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>Sunday</p>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 PM - 9:30 PM</p>
  </li>

  <li className='flex items-center justify-between mb-2'>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>Tuesday</p>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 PM - 9:30 PM</p>
  </li>

  <li className='flex items-center justify-between mb-2'>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>Wednesday</p>
    <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 PM - 9:30 PM</p>
  </li>
 </ul>
     </div>

    
     <button className='btn px-2 w-full rounded-md' onClick={handleFormSubmit}>Book Appointment</button>
  


     </div>
    
  )
}

export default SidePanel