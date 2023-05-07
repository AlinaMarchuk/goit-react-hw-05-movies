import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_KEY from 'components/constants';
import { getData } from 'api/defaultApi';

const useMovieDetails = () => {
  const { movieId } = useParams();

  const MOVIE_DETAILS_URL = `3/movie/${Number(
    movieId
  )}?api_key=${API_KEY}&language=en-US`;

  const [details, setDetails] = useState([]);

  useEffect(() => {
    getData(MOVIE_DETAILS_URL)
      .then(response => {
        setDetails({ ...response.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [MOVIE_DETAILS_URL]);

  return [details, setDetails];
};

export default useMovieDetails;
