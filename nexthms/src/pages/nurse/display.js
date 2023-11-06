import { useEffect, useState } from 'react';

export default function DisplayNurse() {
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        async function fetchNurses() {
            try {
                const response = await fetch('/api/get-nurses');
                if (response.ok) {
                    const data = await response.json();
                    setNurses(data);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchNurses();
    }, []);

    return (
        <div>
            <h1>Nurse List</h1>
            <ul>
                {nurses.map((nurse) => (
                    <li key={nurse.nurse_id}>
                        Name: {nurse.name}, Gender: {nurse.gender}, Contact: {nurse.contact}, Ward: {nurse.ward} <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}