<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>

      <div class="rect2"></div>

      <div class="flex flex-center fit window-height" v-if="isPreLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-else>
        <Transition appear @before-appear="onBeforeAppear" @appear="onAppear"
          @before-enter="onBeforeEnter" @enter="onEnter" :css="false" mode="out-in" :key="route">
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
import gsap from 'gsap'

const isPreLoading = ref(true)

let rect2 = null

/* Life cycles hooks */

onMounted(() => {
  console.log(' ');
  console.log('%cSTART_PAGE LAYOUT: mounted invoked', 'font-weight: 700; color: blue; font-size: 14px');

  rect2 =  document.querySelector('.rect2')

  setTimeout(() => {
    isPreLoading.value = false

    if (!document.body.classList.contains('app-active')) {
      document.body.classList.add('app-active')
    }

    if (document.body.classList.contains('subpage-active')) {
      document.body.classList.remove('subpage-active')
    }
  }, 250)
})

/* Transition cycles */

const onBeforeAppear = (el) => {
  gsap.set(rect2, { autoAlpha: 0 })
}

const onAppear = (el, done) => {
  gsap.to(rect2, { autoAlpha: 1, duration:.5, onComplete: () => done })
}

const onBeforeEnter = (el) => {
  gsap.set(rect2, { autoAlpha: 0 })
}

const onEnter = (el, done) => {
  gsap.to(rect2, { autoAlpha: 1, duration: .5, onComplete: () => done })
}

// const onLeave = (el, done) => {
//   gsap.to(rect2, { autoAlpha: 0, duration: 2, onComplete: () => done })
// }

/* ROUTE GUARDS */

const consColRouter = 'color: blue; font-size: 14px; font-weight: bold;'

onBeforeRouteLeave((to, from, next) => {
    console.log('%c --- StartpageLayout: onBeforeRouteLeave', consColRouter);
    gsap.to(rect2, { autoAlpha: 0, duration: .5, onComplete: () => { next() } })
})
</script>
