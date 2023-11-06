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

      // Insert the form data into the database
      const [rows] = await connection.execute(
        'INSERT INTO patient (name, gender, dob, contact, insurance) VALUES (?, ?, ?, ?, ?)',
        [
          formData.name,
          formData.gender,
          formData.dob,
          formData.contactInfo,
          formData.insuranceInfo,
        ]
      );

      // Close the database connection
      await connection.end();

      res.status(200).json({ message: 'Patient registered successfully' });
    } catch (error) {
      console.error('Error registering patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
