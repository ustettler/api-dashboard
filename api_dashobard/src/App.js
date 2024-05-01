import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  //catFACT
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => setCatFact(data.fact))
      .catch(error => console.error('Error fetching cat fact:', error));
  }, []);

  const getNewFact = () => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => setCatFact(data.fact))
      .catch(error => console.error('Error fetching cat fact:', error));
  };

  //bitcoin
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setBitcoinPrice(response.data.bpi.USD.rate);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  //agify
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);

  const fetchAge = async () => {
    try {
      const response = await fetch(`https://api.agify.io?name=${name}`);
      const data = await response.json();
      setAge(data.age);
    } catch (error) {
      console.error('Error fetching age:', error);
    }
  };

    //IP
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIp();
  }, []);

  //zip code
  const [searchQuery, setSearchQuery] = useState('');
  const [zipcodeData, setZipcodeData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetch(`https://api.zippopotam.us/us/${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('ZIP code not found');
        }
        return response.json();
      })
      .then(data => {
        setZipcodeData(data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setZipcodeData(null);
      });
  };

  return (
    <div className="container">
      <h1>API Dashboard</h1>
      <br />
      <h2>Random Cat Fact</h2>
      <p>{catFact}</p>
      <button onClick={getNewFact} className="custom-button">Get New Fact</button>
      <hr />
      
      {/* bitcoin*/ }
      <h2>Bitcoin Price Index</h2>
        {bitcoinPrice && <p>Current Price: ${bitcoinPrice}</p>}
        <hr />
      
 {/* alterschäätzen*/ }
 <h2>Age Estimator</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}  className="custom-input"
      />
      <br/>
      <button className="custom-button" onClick={fetchAge}>Estimate Age</button>
      {age !== null && <p>{`The estimated age for the name ${name} is ${age}`}</p>}
      <hr />
{/* dein ip*/ }
      <h1>Your IP Address</h1>
      <p>{ip}</p>
      <hr />
{/* zip code*/ }
      <h2>US ZIP Code Information</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Enter ZIP Code"
        className="custom-input"
      />
      <br />
      <button className="custom-button"  onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {zipcodeData && (
        <div>
          <p>Place Name: {zipcodeData.places[0]['place name']}</p>
          <p>State: {zipcodeData.places[0].state}</p>
          <p>Country: {zipcodeData.country}</p>
          <p>Latitude: {zipcodeData.places[0].latitude}</p>
          <p>Longitude: {zipcodeData.places[0].longitude}</p>
        </div>
      )}
      <hr/>
    </div>
    
  );
  
}

export default App;
