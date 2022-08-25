<template>
  <div class="flex flex-center column">
    <h2 class="text-h4">Detail Page:</h2>

    <p class="route">
      $route.params.section: {{ $route.params.section }}<br />
      $route.params.content: {{ $route.params.content }}<br />
      $route.params.detail: {{ $route.params.detail }}
    </p>

    <router-link to="/">
      Go to home page
    </router-link>

  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, onBeforeUpdate, onUpdated, onActivated, onDeactivated, onErrorCaptured, onRenderTracked, onRenderTriggered } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const consCol = 'color: cadetblue; font-size: 14px; font-weight 700'

onActivated(() => {
  console.log('%cDETAIL_PAGE: onActivated invoked', consCol);
})

onDeactivated(() => {
  console.log('%cDETAIL_PAGE: onDeactivated invoked', consCol);
})

onBeforeMount(() => {
  console.log('%cDETAIL_PAGE: onBeforeMount invoked', consCol);
  console.log('router =', router);
})

onMounted(() => {
  console.log('%cDETAIL_PAGE: onMounted invoked', consCol);
  console.log('router =', router);
})

onBeforeUnmount(() => {
  console.log('%cDETAIL_PAGE: onBeforeUnmount invoked', consCol);
})

onUnmounted(() => {
  console.log('%cDETAIL_PAGE: onUnmounted invoked', consCol);
})

onBeforeUpdate(() => {
  console.log('%cDETAIL_PAGE: onBeforeUpdate invoked', consCol);
})

onUpdated(() => {
  console.log('%cDETAIL_PAGE: onUpdated invoked', consCol);
})

onErrorCaptured(() => {
  console.log('%cDETAIL_PAGE: onErrorCaptured invoked', consCol);
})

onRenderTracked(() => {
  console.log('%cDETAIL_PAGE: onRenderTracked invoked', consCol);
})

onRenderTriggered(() => {
  console.log('%cDETAIL_PAGE: onRenderTriggered invoked', consCol);
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
