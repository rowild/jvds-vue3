<template>
  <q-page class="flex flex-center column">
    <h1>Writings</h1>

    <p>Category: {{ $route.params.category }}</p>

    <router-link to="/">
      Back to home page
    </router-link>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'

const consCol = 'color: violet; font-size: 14px; font-weight 700'

onMounted(() => {
  console.log('%cCATALOG_OF_WRITINGS: onMounted invoked', consCol);
})
</script>
