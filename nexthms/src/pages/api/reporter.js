import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { start, end } = req.query;

  try {
    const connection = await mysql.createConnection({
        // host: 'your_database_host',
        user: 'root',
        password: 'Il0vemym0m?',
        database: 'Hms',
      });
    // Perform the necessary database query to fetch the report data
    const result = await connection.execute(`
      CALL GenerateAppointmentBillingReport(?, ?)
    `, [start, end]);

    // console.log(result);
    const reportData = result[0][0]; // Assuming the result is an array
    // console.log(reportData);

    res.status(200).json(reportData);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
