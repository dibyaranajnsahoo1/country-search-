import React, { useState, useEffect } from "react";
import FlagItems from "./FlagItems";

const CountrySearch = () => {
  const [flags, setFlags] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [apiError, setApiError] = useState(false); 

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      setFlags(data);
    } catch (error) {
      setApiError(true);
      console.error("Error fetching countries:"+ error);
    }
  };

  const filteredFlags = flags.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "20px auto",
          display: "block",
          padding: "10px",
          width: "90%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />

      {/* Error Message */}
      {apiError && (
        <p style={{ color: "red", textAlign: "center" }}>
          Unable to fetch country data. Please try again later.
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {filteredFlags.length > 0 ? (
          filteredFlags.map((country) => (
            <FlagItems
              key={country.cca3}
              img={country.flags?.png || ""}
              name={country.name.common}
            />
          ))
        ) : (
          !apiError && (
            <p style={{ fontSize: "18px", color: "#888" }}>No countries found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default CountrySearch;
