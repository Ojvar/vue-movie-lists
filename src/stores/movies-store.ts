import { defineStore } from 'pinia';
import { LoadMovieResult, MovieGenre, MovieItem } from 'src/api';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    results: [] as MovieItem[],
    page: 1,
    total_pages: 0,
    total_results: 0,
    genres: [] as MovieGenre[],
  }),

  getters: {
    isLastPage(): boolean {
      /* TODO: COMPUTE IS-LAST-PAGE */
      return false;
    },

    isFirstPage(): boolean {
      return this.page === 1;
    },

    isGenresLoaded(): boolean {
      return undefined !== this.genres;
    },
  },

  actions: {
    setGenres(genres: MovieGenre[]) {
      this.genres = genres;
    },

    setMovies(moviesData: LoadMovieResult) {
      this.page = moviesData.page;
      this.total_pages = moviesData.total_pages;
      this.total_results = moviesData.total_results;
      this.results = moviesData.results;
    },
  },
});
