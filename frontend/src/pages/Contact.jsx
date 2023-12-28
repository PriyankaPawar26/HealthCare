import React from 'react'

import  { useState } from 'react';
import axios from 'axios';



const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2000/contact', formData);
      
      // Handle success: Display success message to the user or perform any other action
      console.log('Form submitted successfully');
      console.log('Response:', response.data); // Logging the response data if needed
    } catch (error) {
      // Handle error: Display error message or perform error-related actions
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center '>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>Got a technical issue? want to send Feedback about a beta feature? Let us Know.. </p>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div>
            <label htmlFor="email" className='form__label'>Your Email</label>
            <input
              type="email"
              id='email'
              placeholder='example@gmai.com'
              className='form__input mt-1'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="subject" className='form__label'>Subject</label>
            <input
              type="text"
              id='subject'
              placeholder='Let us know how we can help you'
              className='form__input mt-1'
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor="message" className='form__label'>Your Message</label>
            <textarea
              rows='6'
              type="text"
              id='message'
              placeholder='Leave a Comment....'
              className='form__input mt-1'
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className='btn rounded sm:w-fit'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
