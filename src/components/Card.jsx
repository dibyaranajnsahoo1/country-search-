import React from 'react'

const Card = ({countryFlag,countryName}) => {
  return (
    <div className="countryCard"
            style={{
              border: '1px solid #ccc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '180px',
              width: '180px',
              padding: '10px',
              textAlign: 'center',
              borderRadius: '8px',
            }}>
        <img src={countryFlag} alt={countryName}  height={80}/>
        <h2>{countryName}</h2>
    </div>
  )
}

export default Card