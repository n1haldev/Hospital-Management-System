// pages/api/get-patient-details.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Create a MySQL connection
      const connection = await mysql.createConnection({
        // host: 'your-mysql-host',
        user: 'root',
        password: 'Il0vemym0m?',
        database: 'Hms',
      });

      const { id } = req.query;

      if (id === undefined) {
        const [rows] = await connection.execute('SELECT * FROM appointment');
        res.status(200).json(rows);
        connection.end();
      }

      else {
      
      const [rows] = await connection.execute(
        `SELECT
            appointment.appointment_id,
            appointment.patient_id,
            patient.name AS patient_name,
            appointment.doctor_id,
            doctor.name AS doctor_name,
            appointment.date_time,
            appointment.status
         FROM
            appointment
         INNER JOIN patient ON appointment.patient_id = patient.patient_id
         INNER JOIN doctor ON appointment.doctor_id = doctor.doctor_id
         WHERE
            appointment.status = 'pending' AND
            appointment.patient_id = ?`,
        [id]
      );

      connection.end();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).json({ error: 'Appointment not found' });
      }
    }
    } catch (error) {
      console.error('Error fetching Appointment details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
