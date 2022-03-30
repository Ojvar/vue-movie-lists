<template>
  <div class="row justify-center items-center">
    <div class="col col-md-2">Search by release date:</div>

    <div class="col col-md-9">
      <q-input filled readonly :model-value="selectedDatesStr">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date range v-model="selectedDates">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col col-md-1">
      <q-btn class="bg-primary text-white">Search</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'SearchBar',

  setup() {
    const selectedDates = ref({
      'from': null, 'to': null
    });

    return {
      selectedDates,
      selectedDatesStr: computed(() => {
        return selectedDates.value.from === null ? '-' :
          (selectedDates.value.from ?? '') + ' - ' + (selectedDates.value.to ?? '')
      }),
    }
  }
})
</script>
