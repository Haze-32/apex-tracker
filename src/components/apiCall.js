import React, { useState, useEffect, useRef } from 'react';

const PlayerStats = ({ playerName, platform }) => {
  const [playerData, setPlayerData] = useState(null);
  const prevPlayerDataRef = useRef(); // Ref to hold the previous data
  const [error, setError] = useState(null);
  
  const API_KEY = '42c8bdb7c39411333124985c4206b61e'; // replace with your API key
  
  useEffect(() => {
    const fetchData = () => {
    //fetch(`https://api.mozambiquehe.re/bridge?auth=${API_KEY}&player=MzViciouZz&platform=X1`)
    fetch(`https://api.mozambiquehe.re/bridge?auth=${API_KEY}&player=haze-32-&platform=PS4`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Logs the data
        if (JSON.stringify(data) !== JSON.stringify(prevPlayerDataRef.current)) { // Compares new data with the previous data
          prevPlayerDataRef.current = data; // Updates the ref with the new data
          setPlayerData(data); // Sets the state with the new data
        }
      })
      .catch(error => {
        setError(error);
      });
    };
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 30000); // Fetches data every 30 seconds
    return () => clearInterval(intervalId); // Clears the interval on component unmount
  }, [playerName, platform]); // Dependencies of the useEffect hook
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (playerData) {
    const playerName = playerData.global.name;
    const legendSelected = playerData.legends.selected.LegendName;
    const toNextLevelPercent = playerData.global.toNextLevelPercent;
    const totalKills = playerData.total.kills?.value ?? playerData.total.specialEvent_kills?.value;

    return (
      <div>
        <h1>{playerName}'s Stats</h1>
        <p>{legendSelected}</p>
        <p>{toNextLevelPercent}</p>
        <p>{totalKills}</p>
      </div>
    );
}

return null;
};

export default PlayerStats;