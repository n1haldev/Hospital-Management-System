// pages/index.js
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchID, setSearchID] = useState('');
  const [patients, setPatients] = useState([]);

  const handleSearch = async () => {
    // Fetch patients with matching names from the server
    const response = await fetch(`/api/get-patients?id=${searchID}`);
    if (response.ok) {
      const data = await response.json();
      setPatients(data);
    }
  };

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
      <h1 className="text-4xl text-center pt-2 font-bold">Search and Edit Patient Details</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="id">Patient ID:</label>
          <input
            type="text"
            id="name"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} - Patient ID: {patient.id}
              <Link href={`/edit-patient?id=${patient.id}`}>Edit</Link>
            </li>
          ))}
        </ul> */}


        {patients.map((patient => (
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
                                value={patient.name}
                                onChange={handleChange} />
                            <br />
                            <br />
                            <div>
                            <label>Gender:</label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={patient.gender === 'Male'}
                                onChange={handleChange}
                            /> Male
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={patient.gender === 'Female'}
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
                                value={patient.dob}
                                onChange={handleChange} />
                            <br />
                            <br />
                            <label htmlFor='contactInfo'>Contact Information: </label>
                            <input
                                type='text'
                                id='contactInfo'
                                name='contactInfo'
                                value={patient.contact}
                                onChange={handleChange} />
                            <br />
                            <br />
                            <label htmlFor='insuranceInfo'>Insurance Information: </label>
                            <br />
                            <textarea placeholder='Enter patient insurance information' rows={4} cols={40} name="insuranceInfo" value={patient.insurance} onChange={handleChange}></textarea>
                            <br/>
                            <button type="submit">Save Changes</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        )))}


      </div>
    </div>
  );
}
