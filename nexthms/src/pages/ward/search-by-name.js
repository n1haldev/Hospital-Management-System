import React, { useState, useEffect } from 'react';

export default function WardDetails() {
  const [patientId, setPatientId] = useState('');
  const [wardData, setWardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      setWardData([]); // Clear the previous data
  
      // Fetch ward details for the provided patient ID
      const response = await fetch(`/api/get-wards?name=${patientId}}}`);
  
      if (response.ok) {
        const data = await response.json();
        setWardData(data);
      } else {
        setError('Patient not found');
      }
    } catch (error) {
      setError('Error fetching ward details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Ward Details</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="patient">Patient Name:</label>
          <input
            type="text"
            id="patient"
            name="patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {wardData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Ward ID</th>
                <th>Ward Type</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Nurse ID</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((ward) => (
                <tr key={ward.ward_id}>
                  <td>{ward.ward_id}</td>
                  <td>{ward.ward_type}</td>
                  <td>{ward.patient}</td>
                  <td>{ward.name}</td>
                  <td>{ward.nurse_id}</td>
                  <td>{ward.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
