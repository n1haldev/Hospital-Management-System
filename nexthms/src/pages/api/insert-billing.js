import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Patient ID is missing' });
    }

    try {
        const connection = await mysql.createConnection({
            // host: 'your-mysql-host',
            user: 'root',
            password: 'Il0vemym0m?',
            database: 'Hms',
          });
      // Insert billing details into the database
      const response = await connection.execute(
        'INSERT INTO billing(patient, billing_date, amount, payment_status) VALUES (?, CURDATE(), 500, 1)',
        [id]
      );

      return res.status(200).json({ message: 'Bill generated successfully' });
    } catch (error) {
      console.error('Error generating bill details:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
