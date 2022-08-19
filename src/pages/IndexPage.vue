<template>
  <q-page padding class="flex flex-center column window-height">
    <div class="intro-container">
      <router-link to="/main" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
        Enter
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()

const tl = gsap.timeline({
  paused: true,
  onComplete: () => { console.log('TL onComplete invoked')},
})

// --- HELPER
const consCol = 'color: darkslateblue; font-weight: 700; font-size: 14px;'

onMounted(() => {
  console.log('%cINDEX_PAGE: onMounted invoked', consCol)

  // @TODO
  // Should respect the length of the startpageLayout intro animation length
  // but that very length MUST NOT be incorporated into the tl.duration!

  tl.set('.intro-container', { autoAlpha: 1 })
  tl.to('.btn-ui-show', { autoAlpha: 1, duration: 0.5 })
  tl.play()

  // should be saved to store as "introTimelineDuration"
  store.setIntroAnimationDuration(tl.duration())
})

onBeforeRouteUpdate((to, from) => {
  console.log('%cINDEX_PAGE: onBeforeRouteUpdate', consCol);
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cINDEX_PAGE: onBeforeRouteLeave invoked with a GSAP animation', consCol);
  console.log('  tl.duration() =', tl.duration());

  tl.pause()
  tl.reversed()
  tl.eventCallback('onReverseComplete', () => {
    console.log('reverse complete')
    next()
  })
  tl.timeScale(.5).reverse(0)
})

</script>

<style lang="postcss" scoped>
.intro-container {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--k2d);
}

/* Change via JS */
.intro-container,
.btn-ui-show {
  opacity: 0;
}
</style>
