import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Create a MySQL connection
      const connection = await mysql.createConnection({
        // Configure your database connection details here
        // host: 'your-mysql-host',
        user: 'root',
        password: 'Il0vemym0m?',
        database: 'Hms',
      });

      const { id, name } = req.query;
      console.log(id)
      console.log(name)

      if (id === undefined && name === undefined) {
        const [rows] = await connection.execute(
          'SELECT ward.ward_id, ward.ward_type, ward.patient, patient.name, nurse.nurse_id, ward.availability FROM ward join patient on ward.patient = patient.patient_id join nurse on ward.ward_id = nurse.ward'
        );
        res.status(200).json(rows);
        connection.end();
      } else if (id !== undefined && name === undefined) {
        // Check if the query is numeric (patient_id) and fetch by patient ID
        const [rows] = await connection.execute(
          'SELECT ward.ward_id, ward.ward_type, ward.patient, patient.name, nurse.nurse_id, ward.availability FROM ward join patient on ward.patient = patient.patient_id join nurse on ward.ward_id = nurse.ward WHERE ward.patient = ?',
          [id]
        );

        connection.end();

        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).json({ error: 'No ward details found for the patient' });
        }
      } else {
        // Search by patient name
        const [rows] = await connection.execute(
          'SELECT ward.ward_id, ward.ward_type, ward.patient, patient.name, nurse.nurse_id, ward.availability FROM ward join patient on ward.patient = patient.patient_id join nurse on ward.ward_id = nurse.ward WHERE patient.name LIKE ?',
          [`%${name}%`]
        );

        connection.end();

        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).json({ error: 'No ward details found for the patient name' });
        }
      }
    } catch (error) {
      console.error('Error fetching ward details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
