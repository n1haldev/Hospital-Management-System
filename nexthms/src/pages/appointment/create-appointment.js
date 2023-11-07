import React, { useState } from 'react';

export default function CreateAppointment() {
  const initialForm = {
    date_time: '',
    patient_id: '',
    doctor_id: '',
  };
  const [formDetails, setFormDetails] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server to store in the database (replace '/api/register-appointment' with your actual endpoint)
    const response = await fetch('/api/register-appointment', {
      method: 'POST',
      body: JSON.stringify(formDetails),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      alert('Appointment registered successfully');
      setFormDetails(initialForm);
    } else {
      // Handle errors
      alert('Appointment registration failed');
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Appointment Registration</h1>
      <div className="items-center p-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="border border-green-500 p-4">
            <legend className="p-2 font-bold">Appointment Details</legend>
            <label htmlFor="date_time">Date and Time: </label>
            <input
              type="datetime-local"
              id="date_time"
              name="date_time"
              value={formDetails.date_time}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="patient_id">Patient ID: </label>
            <input
              type="text"
              id="patient_id"
              name="patient_id"
              value={formDetails.patient_id}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="doctor_id">Doctor ID: </label>
            <input
              type="text"
              id="doctor_id"
              name="doctor_id"
              value={formDetails.doctor_id}
              onChange={handleChange}
            />
            <br />
            <button type="submit">SUBMIT</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
