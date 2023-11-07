import { useEffect, useState } from 'react';

export default function DisplayAppointment() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const response = await fetch('/api/get-appointments');
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
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