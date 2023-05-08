import { useRef, Suspense } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import useMovieDetails from 'hooks/useMovieDetails';
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

  const imageFilm = `http://image.tmdb.org/t/p/w500/${poster_path}`;
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
      <ul>
        <li key={1}>
          <Link to="cast">Cast</Link>
        </li>
        <li key={2}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
