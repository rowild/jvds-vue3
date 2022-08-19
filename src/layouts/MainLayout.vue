<template>
  <q-layout view="lHh Lpr lFf" container class="absolute-full overflow-hidden">

    <div class="rect"></div>

    <div class="nav-container absolute full-height q-px-sm">
      <div class="absolute q-pt-sm">
        <button @click="activateMenu = !activateMenu" class="float-right q-pa-none ">
          <span v-if="menuToggleVisible">Toggle Menu (to test props)</span>
          <span v-else>...wait...</span>
        </button>

        <div class="q-pt-lg">store.pageTransitions.parent: {{ store.pageTransitions.parent }}</div>
        <div>activateMenu: {{ activateMenu }}</div>
      </div>

      <MenuComponent :toggleMenu="activateMenu" />
    </div>

    <div class="flex flex-center fit window-height" v-if="layoutIsLoading">
      <div class="rotationLoader">Loading</div>
    </div>

    <q-page-container v-if="!layoutIsLoading">
      <router-view v-slot="{ Component, route }">
        <KeepAlive>
          <Transition appear
              @before-appear="onBeforeAppear"
              @appear="onAppear"
              :css="false"
              mode="out-in"
              :key="route.meta.layoutKey">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'
// import loadData from '../scripts/loadData'
import MenuComponent from '../components/MenuComponent.vue'

const store = usePageTransitionsStore()
const route = useRoute()
const layoutRoute = `/${route.fullPath.split('/')[1]}`

const layoutIsLoading = ref(true)
const activateMenu = ref(false)
const menuToggleVisible = ref(false)

let rect = null

const consColRouter = 'color: darkviolet; font-size: 14px; font-weight: bold;'
const consCol = 'color: darkviolet; font-weight: 700; font-size: 14px;'

/* Life cycles hooks */

onMounted(async () => {
  console.log('%cMAIN_LAYOUT: onMounted invoked', consCol);
  console.log('route.value =', route);

  if (!document.body.classList.contains('subpage-active')) {
    document.body.classList.add('subpage-active')
  }

  if (document.body.classList.contains('app-active')) {
    document.body.classList.remove('app-active')
  }

  rect = document.querySelector('.rect')
  if(store.pageTransitions.parent) {
    console.log('   YES, invoke transition onMounted, do GSAP to 0');
    gsap.set(rect, { autoAlpha: 0 })
  }

  setTimeout(() => {
    activateMenu.value = true
    menuToggleVisible.value = true
  }, 1000)

  layoutIsLoading.value = false
})

/* Transitions for content */

const onBeforeAppear = () => {
  console.log('%cMAIN_LAYOUT: onBeforeAppear invoked', consColRouter);

  if(store.pageTransitions.parent) {
    console.log('   YES, invoke transition onBeforeAppear, do GSAP alpha to 0');
    gsap.set(rect, { autoAlpha: 0 })
  } else {
    console.log('   NOPE, do not invoke transition onBeforeAppear');
  }
}

const onAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onAppear invoked', consColRouter);

  if(store.pageTransitions.parent) {
    console.log('   YES, invoke transition onAppear, do GSAP alpha to 1');
    gsap.to(rect, { autoAlpha: 1, duration:1, onComplete: () => done })
  } else {
    console.log('   NOPE, do not invoke transition onAppear');
    done()
  }
}

const onAfterAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onAfterAppear invoked', consColRouter);
}

/* ROUTE GUARDS */

onBeforeRouteUpdate((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteUpdate invoked', consColRouter);

  console.log('    -> from =', from);
  console.log('    -> to =', to);

  let fromParentPath = `/${from.path.split('/')[1]}`
  let toParentPath = `/${to.path.split('/')[1]}`

  console.log('    -> fromParentPath =', fromParentPath);
  console.log('    -> toParentPath =', toParentPath);

  if(fromParentPath !== toParentPath) {
    console.warn('   YES, invoke router guard onBeforeRouteUpdate  SHOULD I DO GSAP TO 0 ???');
    // gsap.to(rect, { autoAlpha: 0, duration: 1.35, onComplete: () => { next() } })
    next()
  } else {
    console.log('   NOPE, do not invoke router guard onBeforeRouteUpdate');
    next()
  }
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteLeave invoked', consColRouter);

  console.log('    -> from =', from);
  console.log('    -> to =', to);

  // HERE: make nav menu disappear
  gsap.to(rect, { autoAlpha: 0, duration: 1.35, onComplete: () => { next() } })
})

</script>

<style lang="postcss">
.nav-container {
  border: 3px solid red;
  min-width: 16rem;
  color: var(--color-brand);
  z-index: 1000;
}
</style>
