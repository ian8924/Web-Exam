<template>
  <div class="page-index">
    <Tabs
      v-model="activeTab"
      :options="tabOptions"
    />
    <div
      v-for="(item,idx) in currentVideoList"
      :key="item.title"
      class="video-area"
    >
      <VideoPlayer
        ref="videosRef"
        class="video-player"
        :src="item.play_url"
        controls
        :loop="true"
        :volume="0.6"
        @mounted="handleMounted($event ,idx)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import { ApiItem, TabOption, TabType, VideoRef } from '~~/types'
import { getFollowListApi, getForYouListApi } from '@/api/api'

const videosRef: Ref<VideoRef[]> = ref([])

// tab
const activeTab : Ref<TabType> = ref(TabType.ForYou)
const tabOptions : Ref<TabOption[]> = ref([
  { label: 'Following', value: TabType.Following },
  { label: 'For You', value: TabType.ForYou }
])

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
      currentVideoList.value = res.items
    })
  }
},
{ immediate: true })

// initial video ref
const handleMounted = (payload:any, idx: number) => {
  videosRef.value[idx].player = payload.player
}

// const open = () => {
//   videosRef.value[1].player.play()
// }

</script>

<style lang="scss" scoped>
@import '@/assets/scss/video.css';
.page-index {
  text-align: center;
  background: #000;
  color: white;
  .video-area {
    width: 100%;
    height: 100vh;
    .video-player {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
