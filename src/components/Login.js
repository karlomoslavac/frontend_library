import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', { // Provjerite da li je URL ispravan
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.user); // Prosljeđivanje korisnika u roditeljsku komponentu
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Greška prilikom prijave:', error);
      alert('Došlo je do greške prilikom prijave.');
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Korisničko ime" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}

export default Login;
