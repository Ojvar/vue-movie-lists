<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-emerald-800 text-silver">
      <q-toolbar></q-toolbar>
    </q-header>

    <q-page-container class="row justify-center">
      <div class="col col-md-9">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>
