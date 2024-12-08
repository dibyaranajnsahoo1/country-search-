// import React, { useEffect, useState,useMemo  } from 'react';
// import axios from 'axios';
// import Card from './Card';

// const XCountriesSearch = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [filteredData, setFilteredData] = useState(null);
  

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     const url = 'https://restcountries.com/v3.1/all';
//     try {
//       const res = await axios.get(url);
//       if (res.status !== 200) {
//         throw new Error(`${res.status} ${res.statusText}`);
//       }
//       setData(res.data);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     }
//   };


//   const searchCountries = (str) => {
//     if (!str || !str.length) return setFilteredData(null);

//     setFilteredData(
//       data.filter((country) =>
//         country.name.common.toLowerCase().includes(str.toLowerCase())
//       )
//     );
//   };


//   const Card = (props) => {
//     const { image, name } = props;
//     return (
//       <div
//         className="countryCard"
//         style={{
//           border: '1px solid #ccc',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '180px',
//           width: '180px',
//           padding: '10px',
//           textAlign: 'center',
//           borderRadius: '8px',
//         }}
//       >
//         <img
//           src={image}
//           alt={`Flag of ${name}`}
//           style={{ width: '60px', height: '60px' }}
//         />
//         <h2 style={{ fontSize: '16px', margin: '10px 0' }}>{name}</h2>
//       </div>
//     );
//   };
//   const displayFlags = () => {
//     let arr = filteredData ? filteredData : data;
//     return arr?.map((cou) => (
//       <Card key={cou?.cca3} image={cou?.flags?.png} name={cou?.name?.common} />
//     ));
//   };
//   const handleSearch = (evt) => {
//     setSearchText(evt.target.value);
//     searchCountries(evt.target.value);
//   };
//   return (
//     data.length > 0 && (
//       <div className="XCountriesSearch">
//         <input
//           type="text"
//           value={searchText}
//           onChange={handleSearch}
//           placeholder="Search for a country"
//           style={{
//             margin: '20px auto',
//             display: 'block',
//             padding: '10px',
//             width: '90%',
//             maxWidth: '400px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             fontSize: '16px',
//           }}
//         />

//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '10px',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           {displayFlags()}
//         </div>
//       </div>
//     )
//   );


import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Card from './Card';

const XCountriesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCountryList, setTotalCountryList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [success, setSuccess] = useState(false);
  

  const debounceCreator = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log('SEARCH:', value);
  };

  const debounceHandleSearchChange = useMemo(
    () => debounceCreator(handleSearchChange, 500),
    [] 
  );


  // useEffect(() => {
  
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
     
  //     const fetchResult = await axios.get('https://restcountries.com/v3.1/all');
  //     setTotalCountryList(fetchResult.data);
  //     setCountryList(fetchResult.data);
  //     setSuccess(true);
  //   } catch (err) {
  //     console.log('Error:'+ err);
  //     setSuccess(false);
  //   } finally {
    
  //   }
  // };


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setTotalCountryList(data);
            setCountryList(data);
            setSuccess(true);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setSuccess(false);
        });
}, []);


  useEffect(() => {
    try {
      if (searchQuery === '') {
        setSuccess(true);
        setCountryList(totalCountryList);
      } else {
        const filteredCountries = totalCountryList.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredCountries.length > 0) {
          setSuccess(true);
          setCountryList(filteredCountries);
        } else {
          setSuccess(false);
        }
      }
    } catch (err) {
      console.log('Error:', err);
      setSuccess(false);
    }
  }, [searchQuery, totalCountryList]);

  return (
    <div className="App">
      <header className="flex-center">
        <input
          type="text"
          placeholder="Search for countries"
          onChange={(e) => debounceHandleSearchChange(e.target.value)}
          style={{
            margin: '20px auto',
            display: 'block',
            padding: '10px',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
      </header>
      
      <div className="countryCardContainer" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        {!success ? (
          <p>No countries found</p> 
        ) : (
          countryList.map((country) => (
            <Card
              key={country.cca3} 
              countryFlag={country.flags.png}
              countryName={country.name.common}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default XCountriesSearch;
