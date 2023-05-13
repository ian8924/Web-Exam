<template>
  <div>
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
    <swiper
      class="swiper"
      :modules="modules"
      :direction="'vertical'"
      :slides-per-view="1"
      :mousewheel="true"
      @slide-change="setSlideIndex"
    >
      <swiper-slide
        v-for="(item,idx) in props.currentVideoList"
        :key="idx"
        class="video-area"
      >
        <Player
          ref="videosRef"
          class="video-player"
          :item="item"
          :is-active="idx === activeSwiperIndex"
          :is-muted="isMuted"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts" setup>
import { Pagination, Mousewheel, Controller } from 'swiper'
import { SwiperSlide, Swiper } from 'vue-awesome-swiper'
// icons
import { Mute, Microphone } from '@element-plus/icons-vue'

import 'swiper/css'
import 'swiper/css/pagination'
import { Ref } from 'vue'
import { ApiItem, VideoRef } from '~~/types'

const videosRef: Ref<VideoRef[]> = ref([])
const isMuted: Ref<boolean> = ref(true)

const modules = ref([Pagination, Mousewheel, Controller])
const activeSwiperIndex : Ref<number> = ref(0)

const props = defineProps({
  currentVideoList: { type: Array<ApiItem>, default: () => [], require: true },
  isMuted: { type: Boolean, default: true, require: true }
})

const toggleSound = () => {
  isMuted.value = !isMuted.value
}

const setSlideIndex = (swiper:{ activeIndex : number}) => {
  activeSwiperIndex.value = swiper.activeIndex
}

</script>

<style lang="scss" scoped>
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
    display: flex;
    align-items: center;
    .video-player {
      width: 100%;
      height: 100%;
    }
    .mask-video {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        .play-icon {
            width: 50px;
        }
    }

}

.swiper {
    height: 100vh;
}

</style>
