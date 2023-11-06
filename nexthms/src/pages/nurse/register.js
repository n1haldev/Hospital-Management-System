import { useState, useEffect } from 'react';

export default function NurseRegistration() {
  const initialFormData = {
    name: '',
    gender: '',
    contactInfo: '',
    ward:'',
  };
  const [formData, setFormData] = useState(initialFormData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server to store in the MySQL database
    const response = await fetch('/api/register-nurse', {
      method: 'POST',
      body: JSON.stringify({...formData }),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      alert('Nurse registered successfully');
      setFormData(initialFormData)

    } else {
      // Handle errors
      alert('Nurse registration failed');
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
                    <label>Gender:</label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                      /> Male
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                      /> Female
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
                    <br/>
                    <button type="submit">SUBMIT</button>
                </fieldset>
            </form>
        </div>
    </div>
  );
}

