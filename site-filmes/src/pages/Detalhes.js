import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_KEY;

export default function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
      .then(res => setFilme(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!filme) return <p style={{ textAlign: "center" }}>Carregando...</p>;

  return (
    <div className="detail">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w780${filme.backdrop_path || filme.poster_path}`} alt={filme.title} />
      <p><strong>Resumo:</strong> {filme.overview}</p>
      <p><strong>Nota:</strong> <span style={{color:'#ffd700', fontWeight:'bold'}}>{filme.vote_average}</span></p>
      <p><strong>Data de Lançamento:</strong> {filme.release_date}</p>
    </div>
  );
}
