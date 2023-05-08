import { useRef, Suspense } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import useMovieDetails from 'hooks/useMovieDetails';
import defaultImg from '../../images/default_image.jpg';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [details] = useMovieDetails([]);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const {
    original_title,
    overview,
    vote_average,
    genres,
    release_date,
    poster_path,
  } = details;

  const imageFilm = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : defaultImg;
  const yearRelease = new Date(release_date).getFullYear();
  const genresString = genres ? genres.map(genre => genre.name).join(' ') : '';

  return (
    <>
      {backLinkRef && (
        <Link to={backLinkRef.current} className={css.link}>
          <BsBoxArrowLeft />
          Go back
        </Link>
      )}
      <div className={css.wrapper}>
        <img src={imageFilm} alt={imageFilm} className={css.image} />
        <div className={css.description}>
          <h3>
            {original_title} ({yearRelease})
          </h3>
          <p>Users score {vote_average}</p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genresString}</p>
        </div>
      </div>
      <div>
        <h4>Additional information</h4>
        <ul>
          <li key={1}>
            <Link to="cast">Cast</Link>
          </li>
          <li key={2}>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
