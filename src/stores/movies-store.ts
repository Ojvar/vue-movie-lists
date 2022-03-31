import { defineStore } from 'pinia';
import { DateRange, LoadMovieResult, MovieGenre, MovieItem } from 'src/api';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    results: [] as MovieItem[],
    page: 1,
    total_pages: 0,
    total_results: 0,
    genres: [] as MovieGenre[],
    selectedDate: {
      from: null,
      to: null,
    } as DateRange,
  }),

  getters: {
    isLastPage(): boolean {
      return this.page === this.total_pages;
    },

    isFirstPage(): boolean {
      return this.page === 1;
    },

    isGenresLoaded(): boolean {
      return undefined !== this.genres;
    },

    currentResult(): string {
      const start = (this.page - 1) * 20;
      return `${start + 1} - ${start + 20}`;
    },
  },

  actions: {
    setPage(newPage: number) {
      this.page = newPage;
    },

    setGenres(genres: MovieGenre[]) {
      this.genres = genres;
    },

    setSelectedDate(selectedDate: DateRange) {
      this.selectedDate = selectedDate;
    },

    setMovies(moviesData: LoadMovieResult) {
      this.page = moviesData.page;
      this.total_pages = moviesData.total_pages;
      this.total_results = moviesData.total_results;
      this.results = moviesData.results;
    },
  },
});
