<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>
      <div class="flex flex-center fit window-height" v-if="isPreLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-else>
        <Transition appear :css="false" mode="out-in" :key="route">
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
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const isPreLoading = ref(true)

/* Life cycles hooks */

onMounted(() => {
  console.log(' ');
  console.log('%cSTART_PAGE LAYOUT: mounted invoked', 'font-weight: 700; color: darkolivegreen; font-size: 24px');

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

/* ROUTE GUARDS */

const consColRouter = 'color: orange; font-size: 24px; padding: 6px 0;'

onBeforeRouteUpdate((to, from) => {
  // called when the route that renders this component has changed,
  // but this component is reused in the new route.
  // For example, given a route with params `/users/:id`, when we
  // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
  // will be reused, and this hook will be called when that happens.
  // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  // setTimeout(() => {
    console.log('%c --- StartpageLayout: onBeforeRouteUpdate', consColRouter);
  // }, 20)
})

onBeforeRouteLeave((to, from, next) => {
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.
  // setTimeout(() => {
    console.log('%c --- StartpageLayout: onBeforeRouteLeave', consColRouter);

    next()
  // }, 2000)
})
</script>
