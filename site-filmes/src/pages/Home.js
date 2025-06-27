import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_KEY = process.env.REACT_APP_KEY;

export default function Home() {
  const [conteudos, setConteudos] = useState([]);
  const [tipoAtual, setTipoAtual] = useState('movie'); // movie ou tv

  // Carrega filmes ou séries populares
  const carregarConteudos = (tipo = 'movie') => {
    setTipoAtual(tipo);
    axios.get(`https://api.themoviedb.org/3/${tipo}/popular?api_key=${API_KEY}&language=pt-BR`)
      .then(res => setConteudos(res.data.results))
      .catch(err => console.error(err));
  };

  // Carrega por gênero (só funciona com tipo 'movie')
  const carregarPorGenero = (generoId) => {  
    axios.get(`https://api.themoviedb.org/3/discover/${tipoAtual}?api_key=${API_KEY}&language=pt-BR&with_genres=${generoId}`)
      .then(res => setConteudos(res.data.results))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarConteudos(); // Carrega filmes ao iniciar
  }, []);

  // Função chamada pela navbar
  const handleSelect = (tipo, valor = null) => {
    if (tipo === 'genre') {
      carregarPorGenero(valor);
    } else {
      carregarConteudos(tipo);
    }
  };

  return (
    <div>
      <Navbar onSelect={handleSelect} tipoAtual={tipoAtual} />
      <h1>{tipoAtual === 'movie' ? 'Filmes Populares' : 'Séries Populares'}</h1>
      <div className="container">
        {conteudos.map(item => (
          <div className="card" key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
            <Link to={`/filme/${item.id}`}>
              <button>LER MAIS</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
