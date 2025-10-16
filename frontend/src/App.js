import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config';

function App() {
  const [status, setStatus] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Test API connection
    fetch(`${config.API_BASE_URL}/api/`)
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(err => setStatus('API connection failed'));

    // Get user info
    fetch(`${config.API_BASE_URL}/api/user-info`)
      .then(res => res.json())
      .then(data => setUserInfo(data))
      .catch(err => console.log('User info failed'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to My Web Application
        </h1>
        <p className="text-gray-600 mt-4">
          This is a React frontend with FastAPI backend
        </p>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">API Status:</h2>
          <p className="text-sm">{status || 'Loading...'}</p>
          
          {userInfo && (
            <div className="mt-4">
              <h3 className="font-semibold">Your Info:</h3>
              <p>IP: {userInfo.ip}</p>
              <p>ISP: {userInfo.isp}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

