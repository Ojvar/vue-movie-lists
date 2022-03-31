<template>
  <q-page class="column q-pa-md">
    <div class="flex items-center bg-gray-100 rounded-xl py-10 px-20">
      <q-btn
        class="mr-10 px-10 bg-sky-500 text-white rounded-full"
        @click="$router.back"
      >
        <q-icon name="arrow_back" />
        Back
      </q-btn>
      <div class="flex-col">
        <h6 class="text-h6">{{ detail?.title }}</h6>
        <p>{{ detail?.tagline }}</p>
      </div>
    </div>

    <movie-detail-card
      v-if="!!detail"
      :model-value="detail"
    ></movie-detail-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MovieDetail, MoviesService } from 'src/api';
import MovieDetailCard from 'src/components/Movie/MovieDetailCard.vue';

export default defineComponent({
  components: { MovieDetailCard },
  name: 'MovieDetailsPage',

  setup() {
    const route = useRoute();
    let detail = ref<MovieDetail | null>(null);

    onMounted(() => {
      MoviesService.loadMovieDetail(route.params.id as string)
        .then((res) => {
          detail.value = res;
        })
        .catch((err) => {
          console.error(err);
        });
    });

    return { detail };
  },
});
</script>
