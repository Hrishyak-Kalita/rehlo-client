import React from 'react';
import styles from './RoomDetails.module.scss';
import { Amenities, BookingForm, Loader, Reviews } from '../../Components';
//  import DummyroomData from '../../assets/RoomDetail.json' 
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


const RoomDetails = () => {

  const { id } = useParams();
  const proxy= import.meta.env.VITE_PROXY
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    getProperty(id);
  }, []);

  const getProperty = async (_id) => {
    try {
      const response = await fetch(`${proxy}/property/get-specific/${_id}`);
      const data = await response.json();

      if (response.ok) {
        setRoomData(data?.room);
      } else {
        console.log('Failed to fetch room data:', data.message);
      }
    } catch (err) {
      console.log('Error fetching room data:', err);
    }
  };

  if (!roomData) {
    return <Loader/> 
  }


  return (
    <div className={styles.container}>
      <div className={styles.leftGrid}>
        <h1 className={styles.hotelName}>{roomData?.title}</h1>
        <div className={styles.roomCover}>
          <img src={roomData?.images[0]} alt={`Room at ${roomData?.title}`} />
        </div>
        <div className={styles.capsule}>
          <div className='center'>
            <h1 className={styles.hotelLocation}>{roomData?.location}</h1>
            <h3 className={styles.subHeading}>₹{roomData?.price} /day</h3>
          </div>
          <p className={styles.ratings}>
            <span className={styles.ratingSpan}>★{roomData?.rating}</span>
            <a className={styles.reviewRef} href="/reviews">{roomData?.reviews.length} reviews</a>
          </p>
        </div>


        <div className={styles.description}>
          <h1 className={styles.desHead}>Description</h1>
          <p className={styles.desPara}>{roomData?.description}</p>
        </div>

        <div className={styles.bookingForPhone}>
            <BookingForm hotelId={id} price={roomData?.price}/>
        </div>

        <div className={styles.amenities}>
          <h1 style={{ margin: "1rem 0" }}>Amenities</h1>
          <Amenities />
        </div>
        {/* Hotel Policies Section */}
        <div className={styles.hotelPolicies}>
          <h1 className={styles.policiesHead}>Hotel Policies</h1>
          <ul className={styles.policiesList}>
            {roomData?.hotelPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>

        <div className={styles.reviewsBox}>
        <h1>Reviews</h1>
        {roomData?.reviews.map((item,index)=> <Reviews key={index} name={item?.name} comment={item?.comment} rating={item?.rate} /> )}

        </div>
      </div>
      <div className={styles.rightGrid}>
        <BookingForm hotelId={id} price={roomData?.price}/>
      </div>
    </div>
  );
};

export default RoomDetails;
