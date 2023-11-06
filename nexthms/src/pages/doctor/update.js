// pages/index.js
import { useState } from 'react';

export default function DoctorUpdation() {
  const initialFormData = {
    id: '',
    name: '',
    gender: '',
    specialization: '',
    contact: '',
  };

  const [searchID, setSearchID] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handleSearch = async () => {
    // Fetch patients with matching IDs from the server
    const response = await fetch(`/api/get-doctors?id=${searchID}`);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        // If patient data is found, set the ID and load the first patient or reset the form
        setDoctors(data);
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
      setDoctors([]);
      setFormData(initialFormData);
      alert("No doctor with patient ID " + searchID + " found")
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
    const response = await fetch('/api/update-doctor', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or update the UI
      alert('Doctor information updated successfully');
    } else {
      // Handle errors
      alert('Failed to update doctor information');
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Search and Edit Doctor Details</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="id">Doctor ID:</label>
          <input
            type="text"
            id="name"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <h1 className="text-4xl text-center pt-2 font-bold">Doctor Updation</h1>
            <div className="items-center p-8">
              <form onSubmit={(e) => handleSubmit(e, doctor)}>
                <fieldset className="border border-green-500 p-4">
                  <legend className="p-2 font-bold">Doctor Details</legend>
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
                    id='contact'
                    name='contact'
                    value={formData.contact}
                    onChange={handleChange} />
                    <br/>
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
