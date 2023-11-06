// pages/index.js
import { useState } from 'react';

export default function NurseUpdation() {
  const initialFormData = {
    id: '',
    name: '',
    gender: '',
    contact: '',
    ward: '',
  };

  const [searchID, setSearchID] = useState('');
  const [nurses, setNurses] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handleSearch = async () => {
    // Fetch patients with matching IDs from the server
    const response = await fetch(`/api/get-nurses?id=${searchID}`);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        // If patient data is found, set the ID and load the first patient or reset the form
        setNurses(data);
        setFormData({
          ...data[0],
          id: searchID,
        });
      } else {
        // No patient found, reset the form
        setNurses([]);
        setFormData(initialFormData);
      }
    } else {
      setNurses([]);
      setFormData(initialFormData);
      alert("No entries with nurse ID " + searchID + " found")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, nurse) => {
    e.preventDefault();

    // Send the updated data to your server to update the patient's information
    const response = await fetch('/api/update-nurse', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or update the UI
      alert('Nurse information updated successfully');
    } else {
      // Handle errors
      alert('Failed to update nurse information');
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Search and Edit Nurse Details</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="id">Nurse ID:</label>
          <input
            type="text"
            id="name"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {nurses.map((nurse) => (
          <div key={nurse.id}>
            <h1 className="text-4xl text-center pt-2 font-bold">Nurse Updation</h1>
            <div className="items-center p-8">
              <form onSubmit={(e) => handleSubmit(e, nurse)}>
                <fieldset className="border border-green-500 p-4">
                  <legend className="p-2 font-bold">Nurse Details</legend>
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
                  <label htmlFor='ward'>Ward: </label>
                    <input
                        type='text'
                        id='ward'
                        name='ward'
                        value={formData.ward}
                        onChange={handleChange} />
                    <br />
                    <br />
                    <label htmlFor='contact'>Contact Information: </label>
                    <input
                        type='text'
                        id='contact'
                        name='contact'
                        value={formData.contact}
                        onChange={handleChange} />
                    <br/>
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
