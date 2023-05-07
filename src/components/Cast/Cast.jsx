import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_KEY from 'components/constants';
import { getData } from 'api/defaultApi';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  const CAST_URL = `3/movie/${Number(
    movieId
  )}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    getData(CAST_URL)
      .then(response => {
        setCast([...response.data.cast]);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [CAST_URL]);

  return (
    <ul>
      {cast.map(actor => {
        const { id, profile_path, name, character } = actor;
        const imageFilm = `http://image.tmdb.org/t/p/w200/${profile_path}`;
        return (
          <li key={id}>
            <img src={imageFilm} alt={name}></img>
            <div>
              <p>Name: {name}</p>
              <p>Character: {character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
