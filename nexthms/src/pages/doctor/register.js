import { useState, useEffect } from 'react';

export default function DoctorRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    specialization: '',
    contactInfo: ''
  });

  useEffect(() => {
    // Fetch the last patient ID from the database and set it in the form
    fetchLastDoctorId().then((lastDoctorId) => {
      // Increment the last patient ID by 1 for the new patient
      const newDoctorId = lastDoctorId + 1;
      setFormData({ ...formData, patientId: newDoctorId });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID for the patient (you can use a UUID library)
    const doctorId = generateUniqueDoctorId();

    // Send the data to your server to store in the MySQL database
    const response = await fetch('/api/register-doctor', {
      method: 'POST',
      body: JSON.stringify({ doctorId, ...formData }),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      console.log('Doctor registered successfully');
    } else {
      // Handle errors
      console.error('Doctor registration failed');
    }
  };

  async function fetchLastDoctorId() {
    try {
      const response = await fetch('/api/get-last-doctor-id'); // Create an API route to fetch the last patient ID
      if (response.ok) {
        const lastDoctorId = await response.json();
        return lastDoctorId;
      }
    } catch (error) {
      console.error('Error fetching last doctor ID:', error);
    }
    return null;
  }

  return (
    <div>
        <h1 className="text-4xl text-center pt-2 font-bold">Doctor Registration</h1>
        <div className="items-center p-8">
            <form onSubmit={handleSubmit}>
                <fieldset className="border border-green-500 p-4">
                    <legend className="p-2 font-bold">Doctor Details</legend>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange} />
                    <br />
                    <br />
                    <label htmlFor='gender'>Gender: </label>
                    <select>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <br />
                    <br />
                    <label htmlFor='specialization'>Specialization: </label>
                    <input
                        type='text'
                        id='specialization'
                        name='specialization'
                        value={formData.specialization}
                        onChange={handleChange} />
                    <br />
                    <br />
                    <label htmlFor='contactInfo'>Contact Information: </label>
                    <input
                        type='text'
                        id='contactInfo'
                        name='contactInfo'
                        value={formData.contactInfo}
                        onChange={handleChange} />
                </fieldset>
            </form>
        </div>
    </div>
  );
}

function generateUniqueDoctorId() {
  return '123456'; // Replace with your unique ID generation logic
}