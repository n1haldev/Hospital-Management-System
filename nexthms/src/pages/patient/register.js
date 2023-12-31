import { useState } from 'react';

export default function PatientRegistration() {
  const initialFormData = {
    name: '',
    gender: '',
    dob: '',
    contactInfo: '',
    insuranceInfo: '',
  };

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server to store in the MySQL database
    const response = await fetch('/api/register-patient', {
      method: 'POST',
      body: JSON.stringify({ ...formData }),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      alert('Patient registered successfully');
      // clearing form elements
      setFormData(initialFormData)
    } else {
      // Handle errors
      alert('Patient registration failed');
    }
  };

  return (
    <div>
        <h1 className="text-4xl text-center pt-2 font-bold">Patient Registration</h1>
        <div className="items-center p-8">
            <form onSubmit={handleSubmit}>
                <fieldset className="border border-green-500 p-4">
                    <legend className="p-2 font-bold">Patient Details</legend>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange} />
                    <br />
                    <br />
                    <div>
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
                    </div>
                    <br />
                    <br />
                    <label htmlFor='dob'>Date of Birth: </label>
                    <input
                        type='date'
                        id='dob'
                        name='dob'
                        value={formData.dob}
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
                    <br />
                    <br />
                    <label htmlFor='insuranceInfo'>Insurance Information: </label>
                    <br />
                    <textarea placeholder='Enter patient insurance information' rows={4} cols={40} name="insuranceInfo" value={formData.insuranceInfo} onChange={handleChange}></textarea>
                    <br/>
                    <button type="submit">SUBMIT</button>
                </fieldset>
            </form>
        </div>
    </div>
  );
}