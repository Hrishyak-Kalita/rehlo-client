import React, { useEffect, useState } from "react";
import styles from "./MyBookings.module.scss";
import { formatDate } from "../../Utils/dateUtills";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete actions

const MyBookings = () => {
  const proxy = import.meta.env.VITE_PROXY;
  const [allBookings, setAllBookings] = useState();

  useEffect(() => {
    getMyBookings();
  }, []);

  const getMyBookings = async () => {
    try {
      const response = await fetch(`${proxy}/bookings/get-my-bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();
      if (!data) console.log("Error occurred while fetching");
      else {
        setAllBookings(data?.bookings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.bookingsContainer}>
      <h1 className={styles.heading}>My Bookings</h1>
      {!allBookings ? <div>Loading...</div> :
        <div className={styles.bookingsGrid}>
          {allBookings.map((booking) => (
            <div key={booking?._id} className={styles.bookingCard}>
              <img src={booking?.hotelId?.images[0]} alt={booking.hotelName} className={styles.hotelImage} />
              <div className={styles.bookingInfo}>
                <h2 className={styles.hotelTitle}>{booking?.hotelId?.title}</h2>
                <p><strong>Guest:</strong> {booking?.name}</p>
                <p><strong>No. of Rooms:</strong> {booking?.numberOfRooms}</p>
                <p><strong>Start Date:</strong> {formatDate(booking?.startDate)}</p>
                <p><strong>Total Price:</strong> ₹{booking?.paidAmount}</p>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.editButton}><FaEdit /></button>
                <button className={styles.cancelButton}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default MyBookings;
