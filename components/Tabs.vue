<template>
  <div class="tabs">
    <div
      v-for="(item,idx) in props.options"
      :key="idx"
      class="tab-item"
      :class="{'active' : activeTab === item.value}"
      @click="activeTab = item.value"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { TabOption } from '~~/types'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: { type: String, default: '', require: false },
  options: { type: Array<TabOption>, default: () => [], require: true }
})

const activeTab = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<style scoped lang="scss">
  .tabs {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
    display: none;
    .tab-item {
      flex: 1;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 900;
      font-size: 16px;
      padding: 20px;
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      &.active {
        color: white;
      }
    }
  }

</style>
