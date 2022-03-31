import { get } from './base.service';
import qs from 'qs';

const apiKey = process.env.API_KEY;

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieCredit = {
  id: number;
  cast: Array<{
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }>;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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
  from: Date | null;
  to: Date | null;
};

type LoadGenresResult = {
  genres: MovieGenre[];
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
    'primary_release_date.gte': releaseDate?.from,
    'primary_release_date.lte': releaseDate?.to,
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

async function loadMovieDetail(id: string): Promise<MovieDetail> {
  const config = { api_key: apiKey, language: 'en-US' };
  const url = `https://api.themoviedb.org/3/movie/${id}?${qs.stringify(
    config
  )}`;

  return new Promise((resolve, reject) => {
    get<MovieDetail>(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function loadCreditOfMovie(id: number): Promise<MovieCredit> {
  const config = { api_key: apiKey, language: 'en-US' };
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?${qs.stringify(
    config
  )}`;

  return new Promise((resolve, reject) => {
    get<MovieCredit>(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

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

export const MoviesService = {
  loadMovies,
  loadGenres,
  loadMovieDetail,
  loadCreditOfMovie,
};
