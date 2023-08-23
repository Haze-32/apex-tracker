//apiCall.js
import React, { useState, useEffect } from 'react';
import staticProfileData from './staticData2.json';
import StatCheckboxes from './StatCheckboxes';
import DisplayStats from './DisplayStats';
import '../assets/css/statBox.css';


const ApexProfile = () => {
  // Define a state variable to hold the data
  const [profileData, setProfileData] = useState(null);
  // State to hold the toggles for each stat - attempting to load from local storage
  const [showStats, setShowStats] = useState(() => JSON.parse(localStorage.getItem('showStats')) || {});
  const [selectedStats, setSelectedStats] = useState(() => JSON.parse(localStorage.getItem('selectedStats')) || {});

  // Temporary state variables to hold the current user input
  const [tempPlatform, setTempPlatform] = useState('psn');
  const [tempUsername, setTempUsername] = useState('haze-32-');

  // State variables to hold the selected platform and username
  const [platform, setPlatform] = useState(() => localStorage.getItem('platform') || 'psn');
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'haze-32-');

  // State variable to track whether an error occurred during the API request
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const useStaticData = true


  // useEffect hook will run the code inside once the component is mounted
  useEffect(() => {

    // if set to true, use static data. if flase use api data
    if (useStaticData) {
      // Use static data
      setProfileData(staticProfileData);
      setLoading(false); // Set loading to false
      return; // Early return to exit the effect
    }

    // Define the function that fetches data
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the beginning of the fetch
      try {
        const url = `https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${username}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'TRN-Api-Key': 'eddead8c-2bf4-407a-aa19-d1003709d2bd'
          }
        });

        if (!response.ok) {
          setError(`Invalid URL: ${url}`); // Set error directly if response is not OK
          return; // Return early to exit the function
        }

        const data = await response.json();
        setProfileData(data);
        setError(null); // Clear the error state if the request was successful
      } catch (error) {
        console.error('An error occurred:', error);
        setError(error.message); // Set the error state with the error message
      } finally {
        setLoading(false); // Set loading to false at the end of the fetch, regardless of success or failure
      }
    };

    // Call fetchData immediately to fetch the initial data
    fetchData();

    // Set up an interval to fetch data every 8 minutes (480000 milliseconds)
    const intervalId = setInterval(fetchData, 480000);

    // Clear the interval when the component is unmounted to avoid memory leaks
    return () => clearInterval(intervalId);


  }, [platform, username]);


  // Function to handle platform selection change
  const handleTempPlatformChange = (e) => {
    setTempPlatform(e.target.value);
  };

  // Function to handle username change
  const handleTempUsernameChange = (e) => {
    setTempUsername(e.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    localStorage.setItem('platform', tempPlatform);
    localStorage.setItem('username', tempUsername);
    setPlatform(tempPlatform);
    setUsername(tempUsername);
  };



  // Render loading state
  if (loading) {
    return 'Loading...!';
  }

  // Render error state
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <p>Invalid.</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div class="mb-3">
              <label class="form-label">Platform:</label>
              <select value={tempPlatform} onChange={handleTempPlatformChange}>
                <option value="origin">PC</option>
                <option value="psn">PSN</option>
                <option value="xbl">XBL</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">Disabled input</label>
              <input type="text" class="form-control" value={tempUsername} onChange={handleTempUsernameChange} />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </fieldset>
        </form>

      </div>
    );
  }


  // Destructuring platform user ID for cleaner access
  const { platformUserId } = profileData.data.platformInfo;

  // The overview segment contains the lifetime stats
  const overviewSegment = profileData.data.segments.find(segment => segment.type === 'overview');
  if (!overviewSegment) return 'Overview not found';

  // Create an array of stat keys and display names for lifetime stats
  const statKeys = Object.keys(overviewSegment.stats).map(key => ({
    key,
    displayName: overviewSegment.stats[key].displayName
  }));

  // Function to handle the toggle switch for lifetime stats
  const handleToggle = statKey => {
    setSelectedStats(prevStats => {
      const updatedStats = { ...prevStats, [statKey]: !prevStats[statKey] }; // Toggle the value
      localStorage.setItem('selectedStats', JSON.stringify(updatedStats)); // Save to local storage
      return updatedStats;
    });
  };




  // Finding the active legend from the data
  const activeLegend = profileData.data.segments.find(
    segment => segment.type === 'legend' && segment.metadata.isActive
  );

  // If no active legend is found, return a message
  if (!activeLegend) return 'Active legend not found';

  // Function to toggle the display of a stat
  const toggleStat = (stat) => {
    setShowStats(prev => {
      const updatedStats = { ...prev, [stat]: !prev[stat] };
      localStorage.setItem('showStats', JSON.stringify(updatedStats)); // Save to local storage
      return updatedStats;
    });
  };




  return (
    <div>
      <DisplayStats
        platformUserId={platformUserId}
        statKeys={statKeys}
        selectedStats={selectedStats}
        overviewSegment={overviewSegment}
        activeLegend={activeLegend}
        showStats={showStats}
      />


      <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="mb-3">
            <label class="form-label">Platform:</label>
            <select value={tempPlatform} onChange={handleTempPlatformChange}>
              <option value="origin">PC</option>
              <option value="psn">PSN</option>
              <option value="xbl">XBL</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">Disabled input</label>
            <input type="text" class="form-control" value={tempUsername} onChange={handleTempUsernameChange} />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </fieldset>
      </form>

      <StatCheckboxes
        statKeys={statKeys}
        selectedStats={selectedStats}
        handleToggle={handleToggle}
        activeLegend={activeLegend}
        showStats={showStats}
        toggleStat={toggleStat}
      />

      <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
};

export default ApexProfile;