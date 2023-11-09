import React, { useState } from "react";

export default function GenerateReport() {
  const [dates, setDates] = useState({ start: new Date().toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] });
  const [reportData, setReportData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/reporter?start=${dates.start}&end=${dates.end}`, {
        method: 'GET', 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Report generated successfully:', data);
        setReportData(data);
      } else {
        console.error('Error generating report:', response.status);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center pt-2 font-bold">Generate Report</h1>
      <div className="items-center p-8">
        <div>
          <label htmlFor="start">Start Date:</label>
          <input
            type="date"
            id="start"
            name="start"
            value={dates.start}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="end">End Date:  </label>
          <input
            type="date"
            id="end"
            name="end"
            value={dates.end}
            onChange={handleChange}
          />
        </div>
        <br />
        <button onClick={handleSubmit}>Generate Report</button>

        {/* Display the report data */}
        {reportData.length > 0 && (
          <div>
            <h2 className="text-2xl mt-4 mb-2">Generated Report:</h2>
            <ul>
              {reportData.map((item) => (
                <li key={item.appointment_id}>
                  Appointment ID: {item.appointment_id}, Date: {item.date_time}, Patient: {item.patient_name}, Doctor: {item.doctor_name}, Status: {item.status}, Billing Date: {item.billing_date}, Amount: {item.amount}, Payment Status: {item.payment_status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
