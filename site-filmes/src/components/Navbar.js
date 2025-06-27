import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar({ onSelect }) {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setGeneros(data.genres))
      .catch(err => console.error(err));
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">🎬 CineFlix</h2>
      <div className="nav-buttons">
        <button onClick={() => onSelect('movie')}>Filmes</button>
        <button onClick={() => onSelect('tv')}>Séries</button>
        <select onChange={(e) => onSelect('genre', e.target.value)}>
          <option value="">Gêneros</option>
          {generos.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
