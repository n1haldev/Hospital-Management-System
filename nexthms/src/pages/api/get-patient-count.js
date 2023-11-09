// pages/api/get-patient-details.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Create a MySQL connection
      const connection = await mysql.createConnection({
        user: 'root',
        password: 'Il0vemym0m?',
        database: 'Hms',
      });

      const [rows] = await connection.execute('SELECT GetAppointmentCounts()');
      connection.end();

      if (rows.length > 0) {
        let data;
        try {
          data = JSON.parse(rows[0]['GetAppointmentCounts()']); // Assuming the column name is 'GetAppointmentCounts()'
        } catch (parseError) {
          // If parsing fails, assume it's already an object
          data = rows[0]['GetAppointmentCounts()'];
        }

        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'Patient count not found' });
      }
    } catch (error) {
      console.error('Error fetching Appointment details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
