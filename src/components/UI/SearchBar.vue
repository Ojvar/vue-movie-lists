<template>
  <div
    class="flex items-center justify-between bg-gray-100 rounded-xl py-10 px-20"
  >
    <div class="flex items-center">
      <label class="text-xl px-5"> Search by release date: </label>
      <q-input filled readonly :model-value="selectedDatesStr">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date range v-model="selectedDates" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div>
      <q-btn
        class="px-10 bg-sky-500 text-white rounded-full"
        @click="searchClickHandler"
        >Search</q-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useMovieStore } from 'src/stores/movies-store';
import { useUIStore } from 'src/stores/ui-store';
import { DateRange, MoviesService } from 'src/api';

export default defineComponent({
  name: 'SearchBar',

  setup() {
    const movieStore = useMovieStore();
    const uiStore = useUIStore();

    const selectedDates = ref<DateRange>();
    const searchClickHandler = () => {
      uiStore.setIsDataLoading(false);

      /* Load movies */
      movieStore.setPage(1);
      MoviesService.loadMovies(movieStore.page, selectedDates.value).then(
        (res) => {
          movieStore.setSelectedDate(selectedDates.value as DateRange);
          movieStore.setMovies(res);
          uiStore.setIsDataLoading(true);
        }
      );
    };

    return {
      searchClickHandler,

      selectedDates,
      selectedDatesStr: computed(() => {
        return selectedDates.value?.from === null
          ? '-'
          : (selectedDates.value?.from ?? '') +
              ' - ' +
              (selectedDates.value?.to ?? '');
      }),
    };
  },
});
</script>
