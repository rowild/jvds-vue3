<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>

      <div class="rect2"></div>

      <div class="flex flex-center fit window-height js-preloader" v-if="contentIsPreLoading">
        <div class="rotationLoader"><!--Loading--></div>
      </div>

      <router-view v-slot="{ Component, route }" v-if="!contentIsPreLoading">
        <Transition appear
          @before-appear="onBeforeAppearStartpage"
          @appear="onAppearStartpage"
          :css="false"
          mode="out-in"
          :key="route.meta.layoutKey">
          <component :is="Component" />
        </Transition>
      </router-view>

      <!--
      <router-view v-else></router-view>
      -->

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()
const contentIsPreLoading = ref(true)
let rect2 = null

// console.log styles
const consCol = 'color: orange; font-weight: 700; font-size: 14px;'

/* Life cycles hooks */

onMounted(() => {
  console.log('%cSTARTPAGE LAYOUT: mounted invoked', consCol);

  rect2 =  document.querySelector('.rect2')
  gsap.set(rect2, { autoAlpha: 0 })

  // contentIsPreLoading.value = false
  gsap.to('.js-preloader', { duration: .25, autoAlpha: 0, onComplete: () => { contentIsPreLoading.value = false } })

  if (document.body.classList.contains('subpage-active')) {
    console.log('STARTPAGE_LAYOUT: set body tag subpage-active');
    document.body.classList.remove('subpage-active')
  }
})

/* Transition cycles */

const onBeforeAppearStartpage = (el) => {
  console.log('%cSTARTPAGE_LAYOUT: onBeforeAppearStartpage invoked', consCol);
  gsap.set(rect2, { autoAlpha: 0 })
}

const onAppearStartpage = (el, done) => {
  console.log('%cSTARTPAGE_LAYOUT: Appear invoked', consCol);
  gsap.to(rect2, { autoAlpha: 1, duration:.5, onComplete: () => done })
}

/* Router Guards */

onBeforeRouteLeave((to, from, next) => {
  console.log('%cSTARTPAGE_LAYOUT: onBeforeRouteLeave', consCol);

  console.log('    -> from =', from);
  console.log('    -> to =', to);

  // This needs to respect the animation duraton in IndexPage.vue's onBeforeRouterLeave.
  // GSAP does provide a tl.duration (or tl.length) option, but how can we access it here?
  // Maybe also via pinia state?
  // Add it as delay

  console.log('store.pageTransitions.introAnimationDuration =', store.pageTransitions.introAnimationDuration);

  if(store.pageTransitions.parent) {
    gsap.to(rect2, { delay: store.pageTransitions.introAnimationDuration, autoAlpha: 0, duration: .5, onComplete: () => { next() } })
  } else {
    console.log('   NOPE, do not invoke router guard onBeforeRouteUpdate');
    next()
  }
})

onBeforeRouteUpdate((to, from) => {
  console.log('%cSTARTPAGE_LAYOUT: onBeforeRouteUpdate', consCol);
  // console.log('  from =', from);
  // console.log('  to =', to);
})
</script>
