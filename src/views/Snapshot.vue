<template>
  <div class="snapshot">
    <dm-snapshot :value="sample" style="min-height:300px" />
    <input v-model="filtered" type="checkbox" />
    <dm-snapshot :value="sample" :filtered="filtered" style="min-height:300px" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DmSnapshot from '../components/DmSnapshot.vue'
import { Snapshot } from '../exports'

export default Vue.extend({
  components: { DmSnapshot },
  data(): { sample: Snapshot; filtered: boolean } {
    return {
      sample: {
        children: [
          { label: 'a', completed: true },
          {
            label: 'b', children: [
              { label: 'b1', completed: true },
              { label: 'b2' },
              { label: 'b3', completed: true },
              { label: 'b4' },
              { label: 'b5', completed: true }
            ]
          },
          {
            label: 'c', children: [
              { label: 'c1', completed: true },
              { label: 'c2', completed: true },
              { label: 'c3', completed: true }
            ]
          },
          { label: 'd', completed: true },
          { label: 'e' },
          { label: 'f', completed: true }
        ]
      },
      filtered: true
    }
  }
})
</script>