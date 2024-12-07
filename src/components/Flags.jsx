import React, { useState, useEffect } from "react";
import FlagItems from "./FlagItems";

const Flag = () => {
    const [flags, setFlags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const url = "https://restcountries.com/v3.1/all";

    useEffect(() => {
        fetchFlags();
    }, []);

    const fetchFlags = async () => {
        try {
            const response = await fetch(url);
            const actualData = await response.json();
            setFlags(actualData);
        } catch (error) {
            console.error("Error fetching data:" + error);
        }
    };

    const filteredFlags = flags.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input type="text"  placeholder="Search for a country..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
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

            
            <div style={{display: "flex",flexWrap: "wrap",gap: "10px",alignItems: "center",justifyContent: "center",}} >
                {filteredFlags.length > 0 ? (
                    filteredFlags.map((country) => (
                        <FlagItems
                            key={country.cca3}
                            img={country.flags.png}
                            name={country.name.common}
                        />
                    ))
                ) : (
                    <p style={{ fontSize: "18px", color: "#888" }}>No countries found. </p>
                )}
            </div>
        </div>
    );
};

export default Flag;
