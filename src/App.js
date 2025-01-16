import React, { useEffect, useState } from "react";
import styles from "./index.module.css"

function CountryCards({name, flag}) {
  return (
    <div 
      className={styles.countryCard}
    >
       <img src={flag} style={{height: "110px", width: "110px"}} alt={`Flag of ${name}`}/>
       <h2>{name}</h2>
    </div>
  );
}

function CountrySearch(){
     const API = `https://countries-search-data-prod-812920491762.asia-south1.run.app/countries`;
     
     const [countries, setCountries] = useState([]); 
     const [filteredData, setFilteredData] = useState([]);
     const [searchFlag, setSearchFlag] = useState('');

     
     useEffect(() => {
        const fetchCountry = async () => {
          try{
            const response = await fetch(API);
            
            if(!response.ok){
              throw new Error("Failed to Fetch Country Data");
            }
            const data = await response.json();
            // console.log(data);
            setCountries(data);
            setFilteredData(data);
          }catch(err){
             console.log("Fail to fetching the country ", err);
          }
        }
        fetchCountry();
     }, []);
    
     
     // Debouncing concept for search
     useEffect(() => {
       const handler = setTimeout(() => {
         const filtered = countries.filter((country) => 
          country.common.toLowerCase().includes(searchFlag.toLowerCase())
         );

         setFilteredData(filtered);
         
       }, 500);

       return () => clearTimeout(handler);
     }, [countries, searchFlag]);

   return (
    <div >
        <input
          type="text"
          placeholder="Search For a Country"
          className={styles.searchBar}
          value={searchFlag}
          onChange={(e) => setSearchFlag(e.target.value)}
          
        />
        <div className={styles.countryGrid}>
          {filteredData.map((country, ind) => (
            <CountryCards key={ind} name={country.common} flag={country.png}/>
          ))}
           {filteredData.length === 0 && <div>No countries found</div>}
        </div>
    </div>
   )
} 


export default CountrySearch;


