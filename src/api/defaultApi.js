import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getData = url => {
  try {
    return instance.get(`/${url}`);
  } catch (error) {
    console.log(error);
  }
};
