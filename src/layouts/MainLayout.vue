<template>
  <q-layout view="lHh Lpr lFf" container class="absolute-full overflow-hidden">
    <q-page-container>

      <div class="rect"></div>

      <div class="nav absolute full-height q-pa-md" v-if="navItems.length > 0">
        <MenuComponent :nav-items="navItems" />
      </div>

      <div class="flex flex-center fit window-height" v-if="layoutIsLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-else>
        <Transition appear @before-enter="onBeforeEnter" @enter="onEnter"
          :css="false" duration="250" mode="out-in" :key="route">
          <component :is="Component" />
        </Transition>
      </router-view>

      <!-- @before-appear="onBeforeAppear" @appear="onAppear" -->
      <!-- @before-enter="onBeforeEnter" @enter="onEnter" -->

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import gsap from 'gsap'
import loadData from '../scripts/loadData'
import getNavigation from '../restapis/Navigation'
import MenuComponent from 'components/MenuComponent.vue'

const layoutIsLoading = ref(true)
let rect = null
const navItems = ref([])

/* Life cycles hooks */

onMounted(async () => {
  console.log('MAIN LAYOUT: mounted invoked');

  rect = document.querySelector('.rect')
  navItems.value = await loadData(getNavigation,'Nav Items loaded', 'Could not load nav items')

  layoutIsLoading.value = false

  if (!document.body.classList.contains('subpage-active')) {
    document.body.classList.add('subpage-active')
  }

  if (document.body.classList.contains('app-active')) {
    document.body.classList.remove('app-active')
  }
})

/* Transition cycles */

// const onBeforeAppear = (el) => {
//   gsap.set(rect, { autoAlpha: 0 })
// }

// const onAppear = (el, done) => {
//   gsap.to(rect, { autoAlpha: 1, duration:1, onComplete: () => done })
// }

const onBeforeEnter = (el) => {
  gsap.set(rect, { autoAlpha: 0 })
}

const onEnter = (el, done) => {
  gsap.to(rect, { autoAlpha: 1, duration:1, onComplete: () => done })
}

/* ROUTE GUARDS */

const consColRouter = 'color: red; font-size: 14px; font-weight: bold; padding-top: 4px'

// onBeforeRouteUpdate(async (to, from, next) => {
//   console.log('%cON BEFORE ROUTE UPDATE =', consColRouter);
//   console.log('to =', to);
//   console.log('from =', from);
//   console.log('next =', next);

//   gsap.to(rect, { autoAlpha: 1, duration: 1.35, onComplete: () => { next() } })
// })

onBeforeRouteLeave((to, from, next) => {
  console.log('%cON BEFORE ROUTE LEAVE =', consColRouter);
  console.log('to =', to);
  console.log('from =', from);

  gsap.to(rect, { autoAlpha: 0, duration: 1.35, onComplete: () => { next() } })
})
</script>

<style class="postcss">
.nav {
  border: 3px solid red;
  min-width: 16rem;
  color: var(--color-brand);
  z-index: 1000;

  & ul {
    list-style: none;
    line-height: 2.25rem;
  }
}

</style>