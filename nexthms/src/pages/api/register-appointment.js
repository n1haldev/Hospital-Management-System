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
        password: 'Il0vemym0m?',
        database: 'Hms',
      });

      // Check if the provided patient_id and doctor_id exist in the respective tables
      const [patientRows] = await connection.execute(
        'SELECT * FROM patient WHERE patient_id = ?',
        [formData.patient_id]
      );
      const [doctorRows] = await connection.execute(
        'SELECT * FROM doctor WHERE doctor_id = ?',
        [formData.doctor_id]
      );

      if (patientRows.length === 0) {
        res.status(400).json({ error: 'Patient does not exist in the database' });
        await connection.end();
        return;
      }

      if (doctorRows.length === 0) {
        res.status(400).json({ error: 'Doctor does not exist in the database' });
        await connection.end();
        return;
      }

      // Insert the appointment data into the database
      const [rows] = await connection.execute(
        'INSERT INTO appointment (date_time, patient_id, doctor_id) VALUES (?, ?, ?)',
        [formData.date_time, formData.patient_id, formData.doctor_id]
      );

      // Close the database connection
      await connection.end();

      res.status(200).json({ message: 'Appointment registered successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
