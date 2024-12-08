import React from 'react'

const Card = ({ image, name }) => {
  return (
    <div
      className="countryCard"
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
      }}
    >
      <img
        src={image}
        alt={`Flag of ${name}`}
        style={{ width: '60px', height: '60px' }}
      />
      <h2 style={{ fontSize: '16px', margin: '10px 0' }}>{name}</h2>
    </div>
  );
};

export default Card