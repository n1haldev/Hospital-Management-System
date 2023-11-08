// import React from "react";
// import { useState } from "react";

// export default function GenerateBill() {

//     const [patientId, setPatientId] = useState('');
//     const [appointment, setAppointment] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSearch = async () => {
//         try {
//           setLoading(true);
//           setError('');
      
//           const response = await fetch(`/api/generate-appointments?id=${patientId}`);
      
//           if (response.ok) {
//             const data = await response.json();
//             if (data.length > 0) {
//               setAppointment(data);
//             } else {
//               setError('No appointments found');
//               alert("No appointments found");
//               setAppointment([]);
//             }
//           } else if (response.status === 404) {
//             setError('Patient not found in appointments');
//             alert('Patient not found in appointments');
//             setAppointment([]);
//           } else {
//             setError('Error fetching bill details');
//             alert('Error fetching bill details');
//           }
//         } catch (error) {
//           setError('Error fetching bill details');
//           alert(error);
//         } finally {
//           setLoading(false);
//         }
//       };      

//     return (
//         <div>
//         <h1 className="text-4xl text-center pt-2 font-bold">Generate Bill</h1>
//         <div className="items-center w-full p-8">
//             <fieldset className="border rounded-xl border-green-500 p-4">
//             <legend className="p-2 font-bold">Patient ID</legend>
//             <div className="grid grid-cols-3 space-x-5">
//                 <input
//                 type="text"
//                 id="patientId"
//                 name="patientId"
//                 value={patientId}
//                 onChange={(e) => setPatientId(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             </fieldset>
//         </div>
//         {loading && <p>Loading ...</p>}
//         {error && <p>{error}</p>}
//         {appointment.length > 0 && (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Appointment ID</th>
//                         <th>Patient ID</th>
//                         <th>Patient Name</th>
//                         <th>Doctor ID</th>
//                         <th>Doctor Name</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {appointment.map((appointment) => (
//                         <tr key={appointment.appointment_id}>
//                             <td>{appointment.appointment_id}</td>
//                             <td>{appointment.patient_id}</td>
//                             <td>{appointment.name}</td>
//                             <td>{appointment.doctor_id}</td>
//                             <td>{appointment.doctor_name}</td>
//                             <td>{appointment.date}</td>
//                             <td>{appointment.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         )}
//         </div>
// )}

import React, { useState } from 'react';

export default function GenerateBill() {
  const [patientId, setPatientId] = useState('');
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      <h1 className="text-4xl text-center pt-2 font-bold">Ward Details</h1>
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
                        <th>Status</th>
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
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}
