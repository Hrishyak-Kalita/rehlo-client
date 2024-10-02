import { Link } from 'react-router-dom';
import { Loader } from '../../Components';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/auth';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [query, setQuery] = useState('');
  const [searchProp, setSearchProp] = useState(properties);
  const { mainUser } = useAuth();
  const proxy = import.meta.env.VITE_PROXY;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query === "") {
      return setSearchProp(properties);
    }

    const filterSearch = properties.filter((item) => {
      return item?.title?.toLowerCase().includes(query.toLowerCase());
    });

    setSearchProp(filterSearch);
  };

  useEffect(() => {
    getAllProperties();
  }, [query]);

  const getAllProperties = async () => {
    try {
      const allProp = fetch(`${proxy}/property/all-property`)
        .then(response => response.json())
        .then(data => {
          setProperties(data?.properties);
          setSearchProp(data?.properties);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>🔍</button>
        </form>
      </div>

      <h1 className={styles.heading}>Available Hotels</h1>

      {properties.length === 0 ? <Loader /> :
        <div className={styles.propertyGrid}>
          {searchProp?.map((hotel, index) => (
            <Link key={index} to={`/property/${hotel?._id}`} className={styles.link}>
              <div className={styles.propertyCard}>
                <div className={styles.imageWrapper}>
                  <img src={hotel?.images[0]} alt={hotel?.title} className={styles.hotelImage} />
                  <span className={styles.priceBadge}>From ₹{hotel?.price}</span>
                </div>
                <div className={styles.propertyInfo}>
                  <h2 className={styles.hotelTitle}>{hotel?.title}</h2>
                  <p className={styles.hotelDetails}>
                    {hotel?.size || "N/A"} / {hotel?.capacity || "N/A"} person
                  </p>
                  <p className={styles.hotelDescription}>
                    {hotel?.description.slice(0,100) || "This is a beautiful property with modern amenities."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
