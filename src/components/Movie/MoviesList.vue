<template>
  <div class="row justify-between q-gutter-sm">
    <movie-item
      class="col col-md-3 q-mb-md"
      v-for="movie in movies"
      :key="movie.id"
      :model-value="movie"
    ></movie-item>
  </div>

  <div class="column text-center q-mt-md">
    <div class="col col-md-12">
      <q-btn :disable="isFirstPage" flat @click="() => setPage(-1)"
        >Previous Page</q-btn
      >
      <q-btn
        :disable="isLastPage"
        flat
        color="primary"
        @click="() => setPage(1)"
        >Next Page</q-btn
      >
    </div>
    <div class="col col-md-12">
      Showing results {{ resultText }} from {{ total_results }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import MovieItemComponent from './MovieItem.vue';
import { MovieItem, MoviesService } from 'src/api';
import { useMovieStore } from 'src/stores/movies-store';

export default defineComponent({
  name: 'MoviesList',
  components: { MovieItem: MovieItemComponent },

  setup() {
    const moviesStore = useMovieStore();

    /* Load movies list at onMounted */
    onMounted(() => {
      MoviesService.loadGenres().then(({ genres }) => {
        moviesStore.setGenres(genres);

        MoviesService.loadMovies(1).then((moviesResult) => {
          moviesStore.setMovies(moviesResult);
        });
      });
    });

    const setPage = (pagesCount: number) => {
      MoviesService.loadMovies(moviesStore.page + pagesCount).then(
        (moviesResult) => {
          moviesStore.setMovies(moviesResult);
        }
      );
    };

    return {
      movies: computed<MovieItem[]>(() => moviesStore.results),
      isFirstPage: computed(() => moviesStore.isFirstPage),
      isLastPage: computed(() => moviesStore.isLastPage),
      resultText: computed(() => moviesStore.currentResult),
      total_results: computed(() => moviesStore.total_results),
      setPage,
    };
  },
});
</script>
