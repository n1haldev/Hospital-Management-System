import { useEffect, useState } from 'react';

export default function DisplayWard() {
    const [wards, setWards] = useState([]);

    useEffect(() => {
        async function fetchWards() {   
            try {
                const response = await fetch('/api/get-wards');
                if (response.ok) {
                    const data = await response.json();
                    setWards(data);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchWards();
    }, []);

    return (
        <div>
            <h1>Ward List</h1>
            <ul>
                {wards.map((ward) => (
                    <li key={ward.ward_id}>
                        Ward ID: {ward.ward_id}, Ward Type: {ward.ward_type}, Patient ID: {ward.patient}, Patient Name: {ward.name}, Nurse ID: {ward.nurse_id}, Available: {ward.availability} <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}