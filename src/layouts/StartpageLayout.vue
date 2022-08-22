<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>

      <div class="rectStartPageLayout">Startpage layout</div>

      <div class="flex flex-center fit window-height js-preloader" v-if="contentIsPreLoading">
        <div class="rotationLoader">
          <!--Loading-->
        </div>
      </div>

      <router-view v-slot="{ Component, route }" v-if="!contentIsPreLoading">
        <Transition appear @appear="onAppear" :css="false" mode="out-in" :key="route.meta.layoutKey">
          <component :is="Component" />
        </Transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script setup>

/**
 * SEQUENCE OF ANIMATION
 *
 * First page call:
 * - animate startpageLayout's onAppear (we use keepAlive, so onMount will not
 *   work when this page is re-visted.)
 * - animate router-view component
 *
 * Page call when returning from somewhere else
 * - ...
 */

import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()
const contentIsPreLoading = ref(true)
let rectStartPageLayout = null

// console.log styles
const consCol = 'color: orange; font-weight: 700; font-size: 14px;'

/* Life cycles hooks */

onMounted(() => {
  console.log('%cSTARTPAGE LAYOUT: mounted invoked', consCol);

  rectStartPageLayout = document.querySelector('.rectStartPageLayout')
  gsap.set(rectStartPageLayout, { autoAlpha: 0 })

  // contentIsPreLoading.value = false
  gsap.to('.js-preloader', { duration: .25, autoAlpha: 0, onComplete: () => { contentIsPreLoading.value = false } })

  if (document.body.classList.contains('subpage-active')) {
    console.log('STARTPAGE_LAYOUT: set body tag subpage-active');
    document.body.classList.remove('subpage-active')
  }
})

/* Transition cycles */

// const onBeforeAppearStartpage = (el) => {
//   console.log('%cSTARTPAGE_LAYOUT: onBeforeAppearStartpage invoked', consCol);
//   gsap.set(rectStartPageLayout, { autoAlpha: 0 })
// }

const onAppear = (el, done) => {
  console.log('%cSTARTPAGE_LAYOUT: onAppear invoked', consCol);
  gsap.to(rectStartPageLayout, { autoAlpha: 1, duration: .5, onComplete: () => done })
}

/* Router Guards */

onBeforeRouteLeave((to, from, next) => {
  console.log('%cSTARTPAGE_LAYOUT: onBeforeRouteLeave', consCol);

  // This router guard is valled AFTER the INDEX.vue's router guard. That means
  // the animation here

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke router guard');
    // Intention of the delay prop: wait for the end of the animation in router-view
    // component (here: index.vue). But it turns out, this is not needed, since
    // the files' router guards are called in sequence and NOT at the same time.
    // delay: store.pageTransitions.introAnimationDuration

    gsap.to(rectStartPageLayout, { autoAlpha: 0, duration: 2, onComplete: () => { next() } })
  } else {
    console.log('   NOPE, do NOT invoke router guard');
    next()
  }
})

// onBeforeRouteUpdate((to, from) => {
//   console.log('%cSTARTPAGE_LAYOUT: onBeforeRouteUpdate', consCol);
// })
</script>
