<template>
  <search-bar class="mt-10 mb-20"></search-bar>
  <movies-list></movies-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from 'src/components/UI/SearchBar.vue';
import MoviesList from 'src/components/Movie/MoviesList.vue';

export default defineComponent({
  name: 'IndexPage',

  components: { SearchBar, MoviesList },
});
</script>
