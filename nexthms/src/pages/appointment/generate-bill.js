import React, { useState } from 'react';

export default function GenerateBill() {
  const [patientId, setPatientId] = useState('');
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePaid = async () => {
    try {
        setLoading(true);
        setError('');

        const response = await fetch(`/api/insert-billing?id=${patientId}`, {
            method: 'POST',
        });

        if (response.ok) {
            alert('Bill generated successfully');
        }
        else {
            setError('Error updating appointment details');
        }
    }
    catch(error) {
        setError('Error generating bill details');
        console.error(error);
    }
    finally {
        setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch ward details for the provided patient ID
      const response = await fetch(`/api/get-appointments?id=${patientId}`);

      if (response.ok) {
        const data = await response.json();
        setAppointment(data);
      } else {
        setError('Patient not found');
        setAppointment([]);
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
      <h1 className="text-4xl text-center pt-2 font-bold">Bill Details</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {appointment.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Doctor ID</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Pending Fees</th>
                        <th>Status</th>
                        <th>Paid ?</th>
                    </tr>
                </thead>
                <tbody>
                    {appointment.map((appointment) => (
                        <tr key={appointment.appointment_id}>
                            <td>{appointment.appointment_id}</td>
                            <td>{appointment.patient_id}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.doctor_id}</td>
                            <td>{appointment.doctor_name}</td>
                            <td>{appointment.date_time}</td>
                            <td>₹ 500</td>
                            <td>{appointment.status}</td>
                            <td><button onClick={handlePaid}>Paid</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}
