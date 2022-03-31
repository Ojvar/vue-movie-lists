<template>
  <div class="column">
    <div class="row">
      <div class="col col-md-3 q-pa-md">
        <q-img
          width="330px"
          height="495px"
          class="rounded-xl"
          :src="`https://image.tmdb.org/t/p/w500${modelValue.poster_path}`"
        ></q-img>
      </div>

      <div class="col col-md-8">
        <div class="row q-pa-md">
          <div class="col col-2 q-my-md text-bold">Budget</div>
          <div class="col col-10 text-right">
            {{ toCurrency(modelValue?.budget) }}
          </div>

          <div class="col col-2 q-my-md text-bold">Revenue</div>
          <div class="col col-10 text-right">
            {{ toCurrency(modelValue?.revenue) }}
          </div>

          <div class="col col-2 q-my-md text-bold">Release Date</div>
          <div class="col col-10 text-right">
            {{ modelValue?.release_date }}
          </div>

          <div class="col col-2 q-my-md text-bold">Runtime</div>
          <div class="col col-10 text-right">
            {{ time_convert(modelValue?.runtime) }}
          </div>

          <div class="col col-2 q-my-md text-bold">Score</div>
          <div class="col col-10 text-right">
            {{ modelValue?.vote_average }} ({{ modelValue?.vote_count }} votes)
          </div>

          <div class="col col-2 q-my-md text-bold">Genres</div>
          <div class="col col-10 text-right">
            {{ modelValue?.genres.map((x) => x.name).join(', ') }}
          </div>

          <div class="col col-2 q-my-md text-bold">IMDB Link</div>
          <div class="col col-10 text-right">
            <a
              class="underline text-sky-300"
              :href="`https://www.imdb.com/title/${modelValue.imdb_id}`"
              >Link</a
            >
          </div>

          <div class="col col-2 q-my-md text-bold">Homepage Link</div>
          <div class="col col-10 text-right">
            <a class="underline text-sky-300" :href="modelValue.homepage"
              >Link</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row q-pa-md">
      <p class="break-all">{{ modelValue?.overview }}</p>
    </div>

    <div class="row q-pa-md">
      <div class="col col-md-12">
        <label class="text-bold">Credit:</label>
      </div>
      <div class="col col-md-12">
        {{ credits?.cast.map((x) => x.name).join(', ') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { MovieCredit, MovieDetail, MoviesService } from 'src/api';

export default defineComponent({
  name: 'MovieDetail',

  props: {
    modelValue: { required: true, type: Object as PropType<MovieDetail> },
  },

  setup(props) {
    const credits = ref<MovieCredit | null>(null);

    MoviesService.loadCreditOfMovie(props.modelValue.id)
      .then((res) => {
        credits.value = res;
      })
      .catch((err) => console.error);

    const toCurrency = (value: number) => {
      return (
        '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 })
      );
    };

    const time_convert = (num?: number) => {
      if (!num) {
        return '';
      }

      const hours = Math.floor(num / 60);
      const minutes = num % 60;
      return `${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''}`;
    };

    return {
      time_convert,
      toCurrency,
      props,
      credits,
    };
  },
});
</script>
