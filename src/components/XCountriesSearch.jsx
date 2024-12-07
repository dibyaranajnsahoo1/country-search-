import React, { useEffect, useState } from 'react';
import axios from "axios";


const XCountriesSearch = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    useEffect(()=>{
        fetchCountries();
    }, [])

    const fetchCountries = async ()=>{
        const url = "https://restcountries.com/v3.1/all"
        try{
            const res = await axios.get(url);
            
            if (res.status !== 200) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            setData(res.data)
        }catch(error){
            console.error(error);
        }
    }

    const searchCountries = (str)=>{
        
        if(!str || !str.length) return setFilteredData(null);

        setFilteredData(data.filter((country) => country.name.common.toLowerCase().includes(str.toLowerCase())))
    }
    const Card = (props) => {
        const { image, name} = props;
        return (
            <div
              className="countryCard"
              style={{
                border: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "180px",
                width: "180px",
                padding: "10px",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <img
                src={image}
                alt={`Flag of ${name}`}
                style={{ width: "60px", height: "60px" }}
              />
              <h2 style={{ fontSize: "16px", margin: "10px 0" }}>{name}</h2>
            </div>
          );
    };

    const displayFLags = ()=>{
       
        let arr = filteredData ? filteredData : data;
        return arr?.map(cou=> <Card key={cou?.cca3} image={cou?.flags?.png} name={cou?.name?.common}/>);

    }

    const handleSearch = evt=>{
        setSearchText(evt.target.value)
        searchCountries(evt.target.value);
    }

    return (
        data.length &&
        <div className='XCountriesSearch'>
            <input  type='text' value={searchText} onChange={handleSearch}  style={{
          margin: "20px auto",
          display: "block",
          padding: "10px",
          width: "90%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px",
        }}/>
           
            <div  style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}>
                {displayFLags()}
            </div>
        </div>
    );
};

export default XCountriesSearch;