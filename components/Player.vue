<template>
  <div class="player-board">
    <div class="title">
      {{ props.item.title }}
    </div>
    <el-icon
      v-if="!isPlaying"
      size="50px"
      class="play-icon"
      @click="play"
    >
      <VideoPlay />
    </el-icon>
    <div
      class="slider-board"
    >
      <el-slider
        v-model="sliderTime"
        :max="totalTime"
        :show-tooltip="false"
        :debounce="0"
        @change="setSliderTime"
      />
      <div
        class="time"
      >
        {{ sliderTime.toFixed(0) }} / {{ totalTime.toFixed(0) }}
      </div>
    </div>
    <div
      :id="'video'+ videoId"
      class="dplayer"
    />
  </div>
</template>

<script lang="ts" setup>
import Hls from 'hls.js'
import DPlayer from 'dplayer'
import { ElSlider, ElIcon } from 'element-plus'
import { VideoPlay } from '@element-plus/icons-vue'

import { Ref } from 'vue'
import { Arrayable } from 'element-plus/es/utils/typescript'

let playerController :any = reactive({})

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
  videoId: { type: Number, default: 0, require: true },
  item: { type: Object, default: () => {}, require: true },
  isMuted: { type: Boolean, default: true, require: true },
  isActive: { type: Boolean, default: false, require: false }
})

const isMuted = computed(() => {
  return props.isMuted
})

const isActive = computed(() => {
  return props.isActive
})

const play = () => {
  if (playerController) {
    playerController.play()
    isPlaying.value = true
  }
}

const pause = () => {
  if (playerController.video) {
    playerController.pause()
    isPlaying.value = false
  }
}

// 設置拖曳時間
const setSliderTime = (val: Arrayable<number>) => {
  playerController.seek(val)
}

watch(isMuted, (val:boolean) => {
  const volume = val ? 0 : 1
  playerController.volume(volume, true, false)
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

const initial = () => {
  // 依照瀏覽器處理 initial
  const issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  if (issafariBrowser) {
    playerController = new DPlayer({
      container: document.getElementById(`video${props.videoId}`),
      autoplay: true,
      loop: true,
      video: {
        url: props.item.play_url,
        pic: props.item.cover,
        type: 'hls'
      }
    })
  } else {
    playerController = new DPlayer({
      container: document.getElementById(`video${props.videoId}`),
      autoplay: true,
      loop: true,
      video: {
        url: props.item.play_url,
        pic: props.item.cover,
        type: 'customHls',
        customType: {
          customHls: function (video:any) {
            const hls = new Hls()
            hls.loadSource(video.src)
            hls.attachMedia(video)
          }
        }
      }
    })
  }

  playerController.on('timeupdate', function () {
    totalTime.value = playerController.video.duration
    currentTime.value = playerController.video.currentTime
  })
  playerController.on('pause', function () {
    isPlaying.value = false
  })
  playerController.on('playing', function () {
    isPlaying.value = true
  })
}

onMounted(() => {
  initial()
})

</script>

<style lang="scss" scoped>
.player-board {
  width: 100%;
  position: relative;
  .title {
    position: absolute;
    top: 200px;
    z-index: 1000;
    width: 80%;
    background-color: rgba(255,255,255,.4);
    text-align: center;
  }
  .play-icon {
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 50px;
    transform: translate(-50% , -50%);
    cursor: pointer;
  }
  .slider-board {
      z-index: 1;
      width: 80%;
      padding: 5px;
      background: rgba(0,0,0,.3);
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
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

.dplayer {
  height: 100vh !important;
}

</style>

<style>
.dplayer-controller {
  display: none !important;
}
</style>
