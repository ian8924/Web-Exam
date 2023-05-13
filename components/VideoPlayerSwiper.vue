<template>
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
      :virtual-index="idx"
    >
      <VideoPlayer
        ref="videosRef"
        class="video-player"
        :poster="item.cover"
        :src="item.play_url"
        :fluid="true"
        :loop="true"
        :volume="0.6"
        :muted="true"
        @mounted="handleMounted($event ,idx)"
      />
    </swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Pagination, Mousewheel, Controller } from 'swiper'
import { SwiperSlide, Swiper } from 'vue-awesome-swiper'

import { VideoPlayer } from '@videojs-player/vue'
import '@/assets/scss/video.css'

import 'swiper/css'
import 'swiper/css/pagination'
import { Ref } from 'vue'
import { ApiItem, VideoRef } from '~~/types'

const videosRef: Ref<VideoRef[]> = ref([])

const modules = ref([Pagination, Mousewheel, Controller])
const activeSwiperIndex : Ref<number> = ref(0)

const props = defineProps({
  currentVideoList: { type: Array<ApiItem>, default: () => [], require: true },
  isMuted: { type: Boolean, default: true, require: true }
})

// initial video ref
const handleMounted = (payload:any, idx: number) => {
  videosRef.value[idx].player = payload.player
}

const setSlideIndex = (swiper:{ activeIndex : number}) => {
  activeSwiperIndex.value = swiper.activeIndex
//   controlledSwiper.value = swiper
}

const isM = computed(() => {
  return props.isMuted
})

// change swiper
watch(activeSwiperIndex, (val) => {
  videosRef.value.forEach((video, idx) => {
    if (idx === val) {
      setTimeout(() => {
        video.player.play()
      }, 1000)
    } else {
      video.player.pause()
    }
  })
},
{ immediate: true })

watch(isM, (val:boolean) => {
  console.log(val)
  videosRef.value.forEach((video) => {
    video.player.muted(val)
  })
},
{ immediate: true })

</script>
