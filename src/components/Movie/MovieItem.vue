<template>
  <div class="row q-pa-xs bg-gray-100 border-2 rounded-lg border-gray-200">
    <div class="col col-md-5">
      <q-img
        :ratio="3 / 4"
        height="100%"
        class="fullheight"
        :src="`https://image.tmdb.org/t/p/w500/${modelValue.poster_path}`"
      ></q-img>
    </div>

    <div class="column q-pa-sm col-md-7">
      <div class="col">
        <h5 class="text-h5 font-bold">
          {{ modelValue.title }}
        </h5>
      </div>

      <div class="col col-auto text-gray-400">
        <div class="q-pb-sm">
          <q-icon name="today" size="sm" />{{ modelValue.release_date }}
        </div>
        <ul class="row q-gutter-sm">
          <li class="col-auto" v-for="genre in genresList" :key="genre">
            {{ genre }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MovieItem } from 'src/api';
import { defineComponent, PropType, computed } from 'vue';
import { useMovieStore } from 'src/stores/movies-store';

export default defineComponent({
  name: 'MovieItem',
  props: {
    modelValue: {
      type: Object as PropType<MovieItem>,
      required: true,
    },
  },

  setup(props) {
    const movieStore = useMovieStore();
    const genresList = computed(() => {
      return props.modelValue.genre_ids.map(
        (genreId) => movieStore.genres.find((x) => x.id === genreId)?.name
      );
    });

    return { props, genresList };
  },
});
</script>

<style lang="scss" scoped>
li {
  display: inline-block !important;
  list-style: none;

  &::after {
    content: ' * ';
  }

  &:last-child:after {
    content: unset;
  }
}
</style>
