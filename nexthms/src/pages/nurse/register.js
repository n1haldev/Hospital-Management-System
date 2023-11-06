import { useState, useEffect } from 'react';

export default function NurseRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    contactInfo: '',
    ward: '',
  });

  useEffect(() => {
    // Fetch the last patient ID from the database and set it in the form
    fetchLastNurseId().then(() => {
      // Increment the last patient ID by 1 for the new patient
      setFormData({ ...formData });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server to store in the MySQL database
    const response = await fetch('/api/register-nurse', {
      method: 'POST',
      body: JSON.stringify({ nurseId, ...formData }),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      console.log('Nurse registered successfully');
    } else {
      // Handle errors
      console.error('Nurse registration failed');
    }
  };

  return (
    <div>
        <h1 className="text-4xl text-center pt-2 font-bold">Nurse Registration</h1>
        <div className="items-center p-8">
            <form onSubmit={handleSubmit}>
                <fieldset className="border border-green-500 p-4">
                    <legend className="p-2 font-bold">Nurse Details</legend>
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
                    <label htmlFor='ward'>Ward: </label>
                    <input
                        type='text'
                        id='ward'
                        name='ward'
                        value={formData.ward}
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

function generateUniqueNurseId() {
  return '123456'; // Replace with your unique ID generation logic
}