<template>
  <q-page class="flex flex-center column">
    <h1>JVdS Main</h1>

    <router-link to="/">
      Main
    </router-link>
  </q-page>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const consColRouter = 'color: orange; font-size: 24px; padding: 6px 0;'

onBeforeRouteUpdate((to, from) => {
  // called when the route that renders this component has changed,
  // but this component is reused in the new route.
  // For example, given a route with params `/users/:id`, when we
  // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
  // will be reused, and this hook will be called when that happens.
  // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  console.log('%cMainPage onBeforeRouteUpdate', consColRouter);
})

onBeforeRouteLeave((to, from) => {
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.
  console.log('%cMainPage onBeforeRouteLeave', consColRouter);
})
</script>

<style>
h1 {
  color: white;
}
</style>