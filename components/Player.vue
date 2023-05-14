<template>
  <div class="player-board">
    <div
      v-if="totalTime"
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
      <button @click="play">
        123312
      </button>
      <button @click="pause">
        pause
      </button>
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
import { ElSlider } from 'element-plus'

import { Ref, nextTick } from 'vue'
import { Arrayable } from 'element-plus/es/utils/typescript'

const playerController :any = ref(null)

// 是否第一次播放
// const isFirstIn: Ref<boolean> = ref(true)
// 是否播放中
// const isPlaying: Ref<boolean> = ref(false)
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
  if (playerController.value) {
    playerController.value.play()
  }
}

const pause = () => {
  if (playerController.value) {
    playerController.value.pause()
  }
}

// 設置拖曳時間
const setSliderTime = (val: Arrayable<number>) => {
  playerController.value.seek(val)
}

watch(isMuted, (val:boolean) => {
  const volume = val ? 0 : 1
  playerController.value.volume(volume, true, false)
})

// 若是 active 則播放，反之暫停
watch(isActive, async (val:boolean) => {
  if (val) {
    // 第一次進入延遲一秒後播放
    await nextTick()
    play()
  } else {
    pause()
  }
}, {
  immediate: true
})

// 設置 slider 時間
watch(currentTime, (val:number) => {
  sliderTime.value = val
})

const initial = () => {
  const issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  if (issafariBrowser) {
    playerController.value = new DPlayer({
      container: document.getElementById(`video${props.videoId}`),
      autoplay: true,
      video: {
        url: props.item.play_url,
        pic: props.item.cover,
        type: 'hls'
      // customType: {
      //   customHls: function (video:any) {
      //     const hls = new Hls()
      //     hls.loadSource(video.src)
      //     hls.attachMedia(video)
      //   }
      // }
      }
    })
  } else {
    playerController.value = new DPlayer({
      container: document.getElementById(`video${props.videoId}`),
      autoplay: true,
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

  playerController.value.on('timeupdate', function () {
    totalTime.value = playerController.value.video.duration
    currentTime.value = playerController.value.video.currentTime
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
  .slider-board {
      z-index: 1;
      width: 80%;
      padding: 5px;
      background: rgba(0,0,0,.3);
      position: absolute;
      top: 15px;
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
  /* display: none !important; */
}
</style>
