import { useState } from 'react';

export default function DoctorRegistration() {
  const initialFormData = {
    ward_type: '',
    patient_id: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to your server to store in the MySQL database
    const response = await fetch('/api/patient-admission', {
      method: 'POST',
      body: JSON.stringify({...formData }),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect to a thank you page
      alert('Patient Admitted successfully');
      setFormData(initialFormData)
    } else {
      // Handle errors
      // console.log()
      alert('Patient Admission failed');
    }
  };


  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Admit Patient</h1>
      <div className="items-center p-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="border border-green-500 p-4">
            <legend className="p-2 font-bold">Admission Details</legend>
            <label htmlFor='name'>Ward Type: </label>
            <input
              type='text'
              id='ward_type'
              name='ward_type'
              value={formData.ward_type}
              onChange={handleChange} />
            <br />
            <br />
            <label>Patient ID: </label>
            <input
              type="text"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
            />
          <button type="submit">SUBMIT</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

// ward_id, ward_type, patient, availability