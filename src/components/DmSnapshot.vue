<template>
  <div
    class="dm-snapshot dm-treemap"
    :class="{ selected }"
    :style="{ ...size, ...position, ...override, ...color }"
    @click="toggle"
    @transitionend="calc"
  >
    <div class="label">{{ value.label }} 進行中: {{ d3h.value }}</div>
    <slot :value="value">{{ value.completed }}</slot>
    <div ref="child" style="position:relative;flex:1 1 100%;">
      <template v-if="d3t && d3t.children">
        <dm-snapshot
          v-for="(child, i) of d3t.children.filter(v => v.value)"
          :key="i"
          :value="child.data"
          style="position:absolute"
          :size="getSize(child)"
          :position="getPosition(child)"
          :filtered="filtered"
        >
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </dm-snapshot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import DmTreemap from 'treemap'
import { Snapshot } from '../exports'
import { HierarchyNode, hierarchy } from 'd3-hierarchy'

export default Vue.extend({
  name: 'DmSnapshot',
  extends: DmTreemap,
  props: {
    value: { type: Object as PropType<Snapshot>, required: true },
    filtered: { type: Boolean, default: false }
  },
  computed: {
    d3h(): HierarchyNode<Snapshot> {
      const { value, filtered } = this
      return filtered
        ? hierarchy(value).sum((d) => d.children || d.completed ? 0 : 1)
        : hierarchy(value).count()
    },
    color(): { 'background-color'?: string } {
      const d3h = this.d3h
      if (d3h.children) {
        const total = d3h.descendants().reduce((a, c) => (a += c.value || 0), 0)
        const h = total > 10 ? 0 : total > 5 ? 60 : 120
        return { 'background-color': `hsl(${h}, 100%, 40%)` }
      } else {
        const h = d3h.data.completed ? 120 : 0
        return { 'background-color': `hsl(${h}, 100%, 40%)` }
      }
    }
  },
  watch: {
    d3h(this: { calc: () => void }) { this.calc() }
  }
})
</script>

<style scoped>
.dm-snapshot {
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  padding: 8px;
  cursor: pointer;
  transition: 0.5s;
  color: white;
}
.label {
  background-color: rgba(0, 0, 0, 0.2);
  min-height: 1em;
  margin-left: -8px;
  margin-top: -8px;
  margin-right: -8px;
  padding: 4px 8px;
}
.selected {
  z-index: 100;
}
</style>