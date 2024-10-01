import { Link } from 'react-router-dom';
import { CardComp, Loader } from '../../Components';
import styles from './Home.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../Context/auth';
const Home = () => {

  const [properties,setProperties]=useState([])
  const [query, setQuery] = useState('');
  const [searchProp,setSearchProp]=useState(properties)
  const {mainUser} = useAuth()
  const proxy= import.meta.env.VITE_PROXY


  
  const handleSearch = (e) => {
    e.preventDefault();
    if(query===""){ return setSearchProp(properties)}
    
      const filterSearch= properties.filter((item)=>{
      return item?.title?.toLowerCase().includes(query.toLowerCase())
      })

     setSearchProp(filterSearch)

  };

  useEffect(()=>{
    getAllProperties()
    

  },[query])

  const getAllProperties= async ()=>{
    try{

      const allProp=fetch(`${proxy}/property/all-property`)
      .then(response=> response.json())
      .then(data=>{

          setProperties(data?.properties)
          setSearchProp(data?.properties)
        })
      

    }catch(err){
      console.log(err)
    }
  }



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
      <button type="submit" className={styles.searchButton}>
        🔍
      </button>
    </form>

    </div>
    <h1 className={styles.heading}>Available Hotels</h1>

    {
      properties.length===0?<Loader/>:
      <div className={styles.properties} style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>

    {searchProp?.map((hotel,index) => (
        <Link key={index} to={`/property/${hotel?._id}`} id={styles.link}>
          <CardComp
            image={hotel?.images[0]}
            title={hotel?.title}
            location={hotel?.location}
            price={hotel?.price}
            rating={hotel?.rating}
          />
        </Link>
      ))}
    </div>
      
    }

    </div>
  );
};

export default Home;
