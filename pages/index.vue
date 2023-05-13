<template>
  <div class="page-index">
    <Tabs
      v-model="activeTab"
      :options="tabOptions"
    />
    <Client-only>
      <VideoPlayerSwiper
        v-if="activeTab == TabType.Following "
        :current-video-list="currentVideoList"
      />
      <VideoPlayerSwiper
        v-else-if="activeTab == TabType.ForYou"
        :current-video-list="currentVideoList"
      />
    </Client-only>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { ApiItem, TabOption, TabType } from '~~/types'

// APIs
import { getFollowListApi, getForYouListApi } from '@/api/api'

// current video list
const currentVideoList : Ref<ApiItem[] | []> = ref([])

// tab
const activeTab : Ref<TabType> = ref(TabType.ForYou)
const tabOptions : Ref<TabOption[]> = ref([
  { label: 'Following', value: TabType.Following },
  { label: 'For You', value: TabType.ForYou }
])

// Toggle tab
watch(activeTab, (val) => {
  if (val === TabType.Following) {
    getFollowListApi().then((res) => {
      currentVideoList.value = res.items
    })
  } else {
    getForYouListApi().then((res) => {
      currentVideoList.value = res.items
    })
  }
},
{ immediate: true })

</script>

<style lang="scss" scoped>
@import "@/assets/scss/swiper/variable.scss";
@import "@/assets/scss/swiper/mixins.scss";
.page-index {
  text-align: center;
  background: #000;
  color: white;
}

</style>
