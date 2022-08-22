<template>
  <q-page class="flex flex-center column">
    <h2 class="text-h2">Detail Page:</h2>

    <p class="route">
      $route.params.section: {{ $route.params.section }}<br />
      $route.params.detail: {{ $route.params.detail }}
    </p>

    <router-link to="/">
      Go to home page
    </router-link>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const consCol = 'color: cadetblue; font-size: 14px; font-weight 700'

onMounted(() => {
  console.log('%cDETAIL: onMounted invoked', consCol);
  console.log('router =', router);
})

</script>

<style>
.route {
  width: 400px;
  margin: 0 auto;
  border: 1px solid white;
  padding: 3px;
  border-radius: 3px;
}
</style>
