<template>
  <div class="page-index">
    <div class="tabs">
      <div
        class="tab-item"
        :class="{'active' : activeTab === TabType.Following}"
        @click="activeTab = TabType.Following"
      >
        following
      </div>
      <div
        class="tab-item"
        :class="{'active' : activeTab === TabType.ForYou}"
        @click="activeTab = TabType.ForYou"
      >
        for you
      </div>
    </div>
    {{ currentVideoList }}
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { ApiItem, TabType } from '~~/types'
import { getFollowListApi, getForYouListApi } from '@/api/api'

// active tab
const activeTab : Ref<TabType> = ref(TabType.ForYou)
// current video list
const currentVideoList : Ref<ApiItem[] | null> = ref(null)

// Toggle tab
watch(activeTab, (val) => {
  if (val === TabType.Following) {
    getFollowListApi().then((res) => {
      currentVideoList.value = res.items
    })
  } else {
    getForYouListApi().then((res) => {
      console.log(res)
    })
  }
},
{ immediate: true })

</script>

<style lang="scss" scoped>
.page-index {
  padding-top: 60px;
  text-align: center;
  background: #000;
  color: white;
  height: 100vh;
  .tabs {
    position: fixed;
    top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    .tab-item {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 900;
      font-size: 16px;
      padding: 20px;
      color: rgba(255,255,255,0.6);
      &.active {
        color: white;
      }
    }
  }
}
</style>
