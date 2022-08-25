<template>
  <q-page padding class="flex flex-center column">
    <div class="intro-container">
      <router-link to="/main" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
        Enter
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { watchEffect, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()

const indexPageTL = gsap.timeline({
  paused: true,
  onStart: () => {
    console.log('IndexPage GSAP timeline onStart invoked')
  },
  onComplete: () => {
    console.log('IndexPage GSAP timeline onComplete invoked')
  }
})

const indexPageMountAnimation = () => {
  indexPageTL.set('.intro-container', { autoAlpha: 1 })
  indexPageTL.to('.btn-ui-show', { autoAlpha: 1, duration: .5 })

  store.setAnimationDuration('indexPage', indexPageTL.duration())

  indexPageTL.play()
}

watchEffect(() => {
  if (store.pageTransitions.indexPageMountAnimation) {
    console.log('IndexPage watchEffect: store.pageTransitions.indexPageMountAnimation =', store.pageTransitions.indexPageMountAnimation);

    indexPageMountAnimation()
  }
})

// console.log styles
const consCol = 'color: darkslateblue; font-weight: 700; font-size: 14px;'

onMounted(() => {
  console.log('%cINDEX_PAGE: onMounted invoked', consCol)
})

onBeforeRouteUpdate((to, from, next) => {
  console.log('%cINDEX_PAGE: onBeforeRouteChange invoked', consCol);
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cINDEX_PAGE: onBeforeRouteLeave invoked with a GSAP animation', consCol);

  store.setPageTransitions('parent', true)

  indexPageTL.pause()
  indexPageTL.reversed()
  indexPageTL.eventCallback('onReverseComplete', () => {
    console.log('IndexPage onBeforeRouteLeave => onReverseComplete...')
    store.setMountAnimation('indexPage', false)
    next()
  })
  indexPageTL.reverse(0)
})
</script>
