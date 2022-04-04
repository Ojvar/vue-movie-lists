<template>
  <div v-if="!isDataLoading">
    <h3 class="text-h3 text-center">Loading...</h3>
  </div>

  <div v-else>
    <div class="row justify-between q-gutter-sm">
      <router-link
        class="col col-md-3 q-mb-md"
        :to="`/movies/${movie.id}`"
        v-for="movie in movies"
        :key="movie.id"
      >
        <movie-card :model-value="movie"></movie-card>
      </router-link>
    </div>

    <div class="grid grid-cols-2 divide-x divide-gray-300 py-5">
      <div class="text-right">
        <q-btn :disable="isFirstPage" flat @click="() => setPage(-1)"
          >Previous Page</q-btn
        >
      </div>

      <div class="text-left">
        <q-btn
          :disable="isLastPage"
          flat
          color="primary"
          @click="() => setPage(1)"
          >Next Page</q-btn
        >
      </div>
    </div>

    <div class="flex justify-center mb-10">
      Showing results {{ resultText }}
      <!-- Showing results {{ resultText }} from {{ total_results }} -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import MovieCard from './MovieCard.vue';
import { MovieItem, MoviesService } from 'src/api';
import { useMovieStore } from 'src/stores/movies-store';
import { useUIStore } from 'src/stores/ui-store';

export default defineComponent({
  name: 'MoviesList',
  components: { MovieCard },

  setup() {
    const moviesStore = useMovieStore();
    const uiStore = useUIStore();

    /* Load movies list at onMounted */
    onMounted(() => {
      uiStore.setIsDataLoading(false);

      MoviesService.loadGenres().then(({ genres }) => {
        moviesStore.setGenres(genres);

        MoviesService.loadMovies(
          moviesStore.page,
          moviesStore.selectedDate
        ).then((moviesResult) => {
          uiStore.setIsDataLoading(true);
          moviesStore.setMovies(moviesResult);
        });
      });
    });

    const setPage = (pagesCount: number) => {
      MoviesService.loadMovies(
        moviesStore.page + pagesCount,
        moviesStore.selectedDate
      ).then((moviesResult) => {
        moviesStore.setMovies(moviesResult);
      });
    };

    return {
      isDataLoading: computed(() => uiStore.isDataLoading),
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
