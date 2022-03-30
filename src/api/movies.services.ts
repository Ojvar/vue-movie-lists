import { get } from './base.service';
import qs from 'qs';

const apiKey = process.env.API_KEY;

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type LoadMovieResult = {
  results: MovieItem[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type DateRange = {
  from: Date;
  to: Date;
};

async function loadMovies(
  page: number,
  releaseDate?: DateRange
): Promise<LoadMovieResult> {
  const config = {
    api_key: apiKey,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page,
    with_watch_monetization_types: 'flatrate',
    'release_date.gte': releaseDate?.from,
    'release_date.lte': releaseDate?.to,
  };
  const url = `https://api.themoviedb.org/3/discover/movie?${qs.stringify(
    config
  )}`;

  return new Promise((resolve, reject) => {
    get<LoadMovieResult>(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

type LoadGenresResult = {
  genres: MovieGenre[];
};
async function loadGenres(): Promise<LoadGenresResult> {
  const config = { api_key: apiKey, language: 'en-US' };
  const url = `https://api.themoviedb.org/3/genre/movie/list?${qs.stringify(
    config
  )}`;

  return new Promise((resolve, reject) => {
    get<LoadGenresResult>(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export const MoviesService = { loadMovies, loadGenres };
