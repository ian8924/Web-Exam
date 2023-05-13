<template>
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
  />
</template>

<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'
import '@/assets/scss/video.css'

import { Ref } from 'vue'
import { PlayerRef } from '~~/types'

const playerRef: Ref<PlayerRef> = ref({ player: {} })
const isFirstIn: Ref<boolean> = ref(true)
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
  playerRef.value.player.play()
}

const pause = () => {
  playerRef.value.player.pause()
}

watch(isMuted, (val:boolean) => {
  playerRef.value.player.muted(val)
})

watch(isActive, (val:boolean) => {
  if (val) {
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

</script>
