import { useEffect, useState } from 'react';

export default function DisplayDoctor() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await fetch('/api/get-doctors');
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDoctors();
    }, []);

    return (
        <div>
            <h1>Doctor List</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.doctor_id}>
                        Name: {doctor.name}, Gender: {doctor.gender}, Specialization: {doctor.specialization}, Contact: {doctor.contact} <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}