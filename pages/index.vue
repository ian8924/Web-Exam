<template>
  <div class="page-index">
    <Tabs
      v-model="activeTab"
      :options="tabOptions"
    />
    <div
      class="sound-controller"
      @click="toggleSound"
    >
      <el-icon
        class="sound-icon"
        :size="20"
      >
        <Mute v-if="isMuted" />
        <Microphone v-else />
      </el-icon>
    </div>
    <Client-only>
      <VideoPlayerSwiper
        v-if="activeTab == TabType.Following "
        :current-video-list="currentVideoList"
        :is-muted="isMuted"
      />
      <VideoPlayerSwiper
        v-else-if="activeTab == TabType.ForYou"
        :current-video-list="currentVideoList"
        :is-muted="isMuted"
      />
    </Client-only>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'

import { Mute, Microphone } from '@element-plus/icons-vue'

import { ApiItem, TabOption, TabType } from '~~/types'
import { getFollowListApi, getForYouListApi } from '@/api/api'

const isMuted: Ref<boolean> = ref(true)
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

const toggleSound = () => {
  isMuted.value = !isMuted.value
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/swiper/variable.scss";
@import "@/assets/scss/swiper/mixins.scss";
.page-index {
  text-align: center;
  background: #000;
  color: white;
  .sound-controller {
      width: 35px;
      position: fixed;
      bottom: 70px;
      right: 20px;
      z-index: 2000;
      padding: 5px;
      border-radius: 50%;
      background: rgba(255,255,255,.3);
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: rgba(255,255,255,.5);
      }
      .sound-icon {
        width: 35px;
        height: 35px;
      }
    }
  .video-area {
    width: 100%;
    height: 100vh;

    .video-player {
      width: 100%;
      height: 100%;
    }
  }
}

.swiper {
    height: 100vh;
}
.swiper-item {
    width: 100%;
    height: 100vh;
    background: red;
}
</style>
