import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './views/HomePage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
      });
      if (response.ok) {
        setLoggedInUser(null);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
      alert('Došlo je do greške prilikom odjave.');
    }
  };

  return (
    <Router>
      <div>
        <h1>my-library</h1>
        {loggedInUser ? (
          <button onClick={handleLogout}>Odjavi se</button>
        ) : (
          <p>Molimo prijavite se kako biste nastavili.</p>)}
        <Routes>
          <Route path="/" element={loggedInUser ? <HomePage user={loggedInUser} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;