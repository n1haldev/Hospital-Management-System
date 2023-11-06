import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = JSON.parse(req.body);

    try {
      // Create a MySQL database connection
      const connection = await mysql.createConnection({
        // Configure your database connection details here
        // host: 'your_database_host',
        user: 'root',
        password: 'Digvijay@2003',
        database: 'Hms',
      });

      // Insert the form data into the database
      const [rows] = await connection.execute(
        'INSERT INTO doctor (name, gender, specialization, contact) VALUES (?, ?, ?, ?)',
        [
          formData.name,
          formData.gender,
          formData.specialization,
          formData.contactInfo,
        ]
      );
        
      // Close the database connection
      await connection.end();

      res.status(200).json({ message: 'Doctor registered successfully' });
    } catch (error) {
      console.log( error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
