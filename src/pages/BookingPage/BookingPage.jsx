import React, { useState, useEffect } from 'react';
import styles from './BookingPage.module.scss';
import DatePicker from 'react-datepicker';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const BookingPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { mainUser } = useAuth();
    const proxy = import.meta.env.VITE_PROXY;

    const [roomData, setRoomData] = useState();
    const [sdate, setSDate] = useState(new Date());
    const [roomType, setRoomType] = useState(1); // 1 for single, 2 for double
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [totalDays, setTotalDays] = useState(1);
    const [pricePerRoom, setPricePerRoom] = useState(0);
    const [payingPrice, setPayingPrice] = useState(0);
    const [email, setEmail] = useState(localStorage.getItem('authEmail'));

    useEffect(() => {
        getProperty();
    }, []);

    const calculateTotalPrice = () => {
        const totalPrice = roomType === 2 ? (2 * pricePerRoom) : pricePerRoom;
        return totalPrice * numberOfRooms * totalDays; 
    };

    const bookRoom = async (e) => {
        e.preventDefault();
        const finalPayingPrice = calculateTotalPrice();

        try {
            const response = await fetch(`${proxy}/bookings/add-new-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    hotelId: id, 
                    paidAmount: finalPayingPrice,
                    roomType,
                    startDate: sdate.toLocaleDateString(),
                    totalDays,
                    numberOfRooms,
                })
            });

            const data = await response.json();

            if (!data) {
                alert('Booking failed');
            } else {
                alert('Booking successful');                
                navigate('/user/my-bookings');
            }

        } catch (err) {
            console.log(err);
        }
    };

    const getProperty = async () => {
        try {
            const response = await fetch(`${proxy}/property/get-specific/${id}`);
            const data = await response.json();

            if (response.ok) {
                setRoomData(data?.room);
                setPricePerRoom(data?.room?.price);
            } else {
                console.log('Failed to fetch room data:', data.message);
            }
        } catch (err) {
            console.log('Error fetching room data:', err);
        }
    };

    return (
        <div className={styles.bookingPageContainer}>
            <div className={styles.formSection}>
                <div className={styles.formHeader}>
                    <h3>Enter your details</h3>
                    <p>We will use these details to share your booking information</p>
                </div>
                <form className={styles.bookingForm} onSubmit={bookRoom}>
                    <label>
                        Full Name<span className={styles.req}>*</span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter first and last name" />
                    </label>
                    <label>
                        Mobile Number<span className={styles.req}>*</span>
                        <div className={styles.mobileInput}>
                            <select required>
                                <option value="+91">+91</option>
                                {/* Add more country codes if needed */}
                            </select>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="1234567890" />
                        </div>
                    </label>
                    <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                        <div>
                            From<span className={styles.req}>*</span>
                            <DatePicker
                                required
                                selected={sdate}
                                onChange={(date) => setSDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div>
                            No. of Days<span className={styles.req}>*</span>
                            <input type="number" min="1" max="10" required value={totalDays} onChange={(e) => setTotalDays(Number(e.target.value))} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1rem 0' }}>
                            <span>
                                Single Room
                                <input type="radio" name='roomSize' value="1" checked={roomType === 1} onChange={() => setRoomType(1)} required />
                            </span>
                            <span>
                                Double Room
                                <input type="radio" name='roomSize' value="2" checked={roomType === 2} onChange={() => setRoomType(2)} required />
                            </span>
                        </label>
                    </div>

                    <label>
                        No. of rooms
                        <input type="number" min="1" max="10" required value={numberOfRooms} onChange={(e) => setNumberOfRooms(Number(e.target.value))} />
                    </label>

                    <button type="submit">
                        Continue to payment
                    </button>
                </form>
            </div>

            <div className={styles.summarySection}>
                <h4>{roomData?.title}</h4>
                <p>{roomData?.location}</p>
                <p className={styles.ratings}>{roomData?.rating} (3149 Ratings) · Very Good</p>
                <div className={styles.bookingInfo}>
                    <div className={styles.bookingItem}>
                        <span>From- </span>
                        <span>{sdate.toLocaleDateString()}</span>
                    </div>
                    <div className={styles.priceInfo}>
                        <div>
                            <span>Room price for 1 Night ({roomType === 2 ? 'Double Room' : 'Single Room'})</span>
                            <span>₹ {roomType === 2 ? (2 * pricePerRoom) : pricePerRoom}</span>
                        </div>

                        <div>
                            <span>No. of rooms</span>
                            <span>x {numberOfRooms}</span>
                        </div>
                        <div>
                            <span>No. of days</span>
                            <span>x {totalDays}</span>
                        </div>
                        <div>
                            <span>Total Room Price</span>
                            <span>₹ {calculateTotalPrice()}</span>
                        </div>
                        <div>
                            <span>Coupon discount</span>
                            <span>₹0</span>
                        </div>
                        <hr />
                        <div>
                            <span>Payable Amount</span>
                            <span className={styles.totalPrice}>₹ {calculateTotalPrice()}</span>
                        </div>
                    </div>
                    <p className={styles.bookingAlert}>⚡ 23 people booked this hotel in the last 6 hours</p>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
