<template>
  <div class="player-board">
    <div
      class="mask-video"
      @click="togglePlayer"
    >
      <div
        v-if="totalTime"
        class="slider-board"
      >
        <el-slider
          v-model="sliderTime"
          :max="totalTime"
          @change="setSliderTime"
        />
        <div
          class="time"
        >
          {{ sliderTime.toFixed(0) }} / {{ totalTime.toFixed(0) }}
        </div>
      </div>
      <el-icon
        v-if="!isPlaying"
        class="play-icon"
      >
        <VideoPlay v-if="!isPlaying" />
        <VideoPause v-else />
      </el-icon>
    </div>

    <VideoPlayer
      ref="playerRef"
      class="video-player"
      :poster=" props.item.cover"
      :src="props.item.play_url"
      :fluid="true"
      :loop="true"
      :volume="0.6"
      :muted="true"
      @mounted="handleMounted($event)"
      @timeupdate="onPlayerTimeupdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'
import '@/assets/scss/video.css'
import { ElSlider, ElIcon } from 'element-plus'

import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

import { Ref } from 'vue'
import { Arrayable } from 'element-plus/es/utils'
import { PlayerRef } from '~~/types'

const playerRef: Ref<PlayerRef> = ref({ player: {} })
// 是否第一次播放
const isFirstIn: Ref<boolean> = ref(true)
// 是否播放中
const isPlaying: Ref<boolean> = ref(false)
// 影片總時長
const totalTime : Ref<number> = ref(0)
// 目前時間
const currentTime : Ref<number> = ref(0)
// 滑動時間
const sliderTime: Ref<number> = ref(0)

const props = defineProps({
  item: { type: Object, default: () => {}, require: true },
  isMuted: { type: Boolean, default: true, require: true },
  isActive: { type: Boolean, default: false, require: false }
})

// initial video ref
const handleMounted = (payload:any) => {
  playerRef.value.player = payload.player
}

const isMuted = computed(() => {
  return props.isMuted
})

const isActive = computed(() => {
  return props.isActive
})

const play = () => {
  isPlaying.value = true
  playerRef.value.player.play()
}

const pause = () => {
  isPlaying.value = false
  playerRef.value.player.pause()
}

const togglePlayer = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}
// 設置拖曳時間
const setSliderTime = (val: Arrayable<number>) => {
  playerRef.value.player.currentTime(val)
}

const onPlayerTimeupdate = () => {
  currentTime.value = playerRef.value.player.currentTime()
  totalTime.value = playerRef.value.player.duration()
}

watch(isMuted, (val:boolean) => {
  playerRef.value.player.muted(val)
})

// 若是 active 則播放，反之暫停
watch(isActive, (val:boolean) => {
  if (val) {
    // 第一次進入延遲一秒後播放
    if (isFirstIn.value) {
      setTimeout(() => {
        play()
      }, 1000)
    } else {
      play()
    }
  } else {
    pause()
  }
})

// 設置 slider 時間
watch(currentTime, (val:number) => {
  sliderTime.value = val
})

</script>

<style lang="scss" scoped>
.player-board {
    .mask-video {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .play-icon {
            display: block;
            width: 50px;
        }

        .slider-board {
            width: 80%;
            padding: 5px;
            background: rgba(0,0,0,.3);
            position: absolute;
            top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            .time {
                margin-left: 16px;
                white-space: nowrap;
            }
        }
    }
}

</style>
