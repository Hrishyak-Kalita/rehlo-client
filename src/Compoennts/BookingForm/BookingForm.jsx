import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.scss';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState(1);
  const [sdate, setSDate] = useState(new Date());
  const [edate, setEDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      rooms,
      sdate: sdate.toLocaleDateString(),
      edate: edate.toLocaleDateString(),
    };
    console.log('Form Data Submitted:', formData);
    // You can process the formData as needed, such as sending it to a server
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bookingForm}>
    <div className={styles.formHeading}>
          <h1>Book Now</h1>
          <p>Available</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Enter your phone number"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rooms">Number of Rooms:</label>
        <input
          type="number"
          id="rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sdate">Starting Date:</label>
        <DatePicker
          selected={sdate}
          onChange={(date) => setSDate(date)}
          dateFormat="dd/MM/yyyy"
          className={styles.datePicker}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="edate">Ending Date:</label>
        <DatePicker
          selected={edate}
          onChange={(date) => setEDate(date)}
          dateFormat="dd/MM/yyyy"
          className={styles.datePicker}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
