<template>
  <div class="flex flex-center column">
    <h2 class="text-h4">Section content Page:</h2>

    <p class="route">
      $route.params.section: {{ $route.params.section }}<br />
      $route.params.content: {{ $route.params.content }}<br />
      <!-- $route.params.content.detail: {{ $route.params.content.detail }}<br /> -->
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

// console.log styles
const consCol = 'color: darkolivegreen; font-size: 14px; font-weight 700'

onActivated(() => {
  console.log('%cSECTION_CONTENT_PAGE: onActivated invoked', consCol);
})

onDeactivated(() => {
  console.log('%cSECTION_CONTENT_PAGE: onDeactivated invoked', consCol);
})

onBeforeMount(() => {
  console.log('%SECTION_CONTENT_PAGE: onBeforeMount invoked', consCol);
})

onMounted(() => {
  console.log('%SECTION_CONTENT_PAGE: onMounted invoked', consCol);
})

onBeforeUnmount(() => {
  console.log('%cSECTION_CONTENT_PAGE: onBeforeUnmount invoked', consCol);
})

onUnmounted(() => {
  console.log('%cSECTION_CONTENT_PAGE: onUnmounted invoked', consCol);
})

onBeforeUpdate(() => {
  console.log('%cSECTION_CONTENT_PAGE: onBeforeUpdate invoked', consCol);
})

onUpdated(() => {
  console.log('%cSECTION_CONTENT_PAGE: onUpdated invoked', consCol);
})

onErrorCaptured(() => {
  console.log('%cSECTION_CONTENT_PAGE: onErrorCaptured invoked', consCol);
})

onRenderTracked(() => {
  console.log('%cSECTION_CONTENT_PAGE: onRenderTracked invoked', consCol);
})

onRenderTriggered(() => {
  console.log('%cSECTION_CONTENT_PAGE: onRenderTriggered invoked', consCol);
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
