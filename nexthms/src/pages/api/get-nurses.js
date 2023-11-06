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
      // console.log(id);

      if (id === undefined) {
        const [rows] = await connection.execute('SELECT * FROM nurse');
        res.status(200).json(rows);
        connection.end();
      }

      else {
      
      // Execute a query to retrieve patient details by ID
      const [rows] = await connection.execute('SELECT * FROM nurse WHERE nurse_id = ?', [id]);
      console.log(rows)

      connection.end(); // Close the MySQL connection

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).json({ error: 'Nurse not found' });
      }
    }
    } catch (error) {
      console.error('Error fetching Nurse details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
