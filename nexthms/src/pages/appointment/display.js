import { useEffect, useState } from 'react';

export default function DisplayAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [counts, setCounts] = useState({ pending: 0, complete: 0 });

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const response = await fetch('/api/get-appointments');
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                }

                const responseCount = await fetch('/api/get-patient-count');
                if (responseCount.ok) {
                    const countData = await responseCount.json();
                    setCounts(countData);
                } else {
                    alert("Something went wrong loading patient count");
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchAppointments();
    }, []);

    return (
        <div>
            <h1>Appointment List</h1>
            <h3>Pending: {counts.pending}, Complete: {counts.complete}</h3>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.appointment_id}>
                        Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date and Time: {appointment.date_time}, Status: {appointment.status} <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}