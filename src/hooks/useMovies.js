import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API_KEY from 'components/constants';
import { getData } from 'api/defaultApi';

const useMovies = () => {
  const [page, setPage] = useState(1);
  const [moreBtn, setMoreBtn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const MOVIES_URL = `3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false&page=${page}`;

  const handleSubmit = event => {
    event.preventDefault();
    const inputQuery = event.currentTarget.elements.input.value;

    if (!inputQuery) {
      return setSearchParams({});
    }
    setSearchParams({ query: inputQuery });
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    getData(MOVIES_URL)
      .then(response => {
        const { page, results, total_pages } = response.data;
        setMovies(prevState => [...prevState, ...results]);
        setPage(page);
        if (total_pages > page) {
          setMoreBtn(true);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [MOVIES_URL, query, page]);

  return [movies, handleSubmit, moreBtn, handleLoadMore];
};

export default useMovies;
