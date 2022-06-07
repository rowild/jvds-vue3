<template>
  <q-page class="flex flex-center column">
    <h1>Main Page</h1>

    <router-link to="/">
      Startpage
    </router-link>
  </q-page>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const consColRouter = 'color: orange; font-size: 24px; padding: 6px 0;'

onBeforeRouteUpdate((to, from) => {
  console.log('%cMainPage onBeforeRouteUpdate', consColRouter);
})

onBeforeRouteLeave((to, from) => {
  console.log('%cMainPage onBeforeRouteLeave', consColRouter);
})
</script>

<style>
h1 {
  color: white;
}
</style>