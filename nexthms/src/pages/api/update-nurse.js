import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = JSON.parse(req.body);

    try {
      // Create a MySQL database connection
      const connection = await mysql.createConnection({
        // host: 'your_database_host',
        user: 'root',
        password: 'Il0vemym0m?',
        database: 'Hms',
      });

      const [rows] = await connection.execute(
        'UPDATE nurse SET name = ?, gender = ?, contact = ?, ward = ? WHERE nurse_id = ?', [
            formData.name,
            formData.gender,
            formData.contact,
            formData.ward,
            formData.id,
        ]
      );

      await connection.end();

      res.status(200).json({ message: 'Nurse updated successfully' });
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end();
  }
}
