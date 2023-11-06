// pages/index.js
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const initialFormData = {
    id: '',
    name: '',
    gender: '',
    dob: '',
    contact: '',
    insurance: '',
  };

  const [searchID, setSearchID] = useState('');
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handleSearch = async () => {
    // Fetch patients with matching IDs from the server
    const response = await fetch(`/api/get-patients?id=${searchID}`);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        // If patient data is found, set the ID and load the first patient or reset the form
        setPatients(data);
        setFormData({
          ...data[0],
          id: searchID,
        });
      } else {
        // No patient found, reset the form
        setPatients([]);
        setFormData(initialFormData);
      }
    } else {
      setPatients([]);
      setFormData(initialFormData);
      alert("No patient with patient ID " + searchID + " found")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, patient) => {
    e.preventDefault();

    // Send the updated data to your server to update the patient's information
    const response = await fetch('/api/update-patient', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or update the UI
      alert('Patient information updated successfully');
    } else {
      // Handle errors
      alert('Failed to update patient information');
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

        {patients.map((patient) => (
          <div key={patient.id}>
            <h1 className="text-4xl text-center pt-2 font-bold">Patient Registration</h1>
            <div className="items-center p-8">
              <form onSubmit={(e) => handleSubmit(e, patient)}>
                <fieldset className="border border-green-500 p-4">
                  <legend className="p-2 font-bold">Patient Details</legend>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label htmlFor="gender">Gender:</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                  />{' '}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                  />{' '}
                  Female
                  <br />
                  <br />
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label htmlFor="contact">Contact Information:</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <label htmlFor="insurance">Insurance Information:</label>
                  <br />
                  <textarea
                    placeholder="Enter patient insurance information"
                    rows={4}
                    cols={40}
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                  ></textarea>
                  <br />
                  <button type="submit">Save Changes</button>
                </fieldset>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
