<template>
  <div v-if="isLoading" class="flex flex-center fit">
    <div class="rotationLoader">Loading...</div>
  </div>

  <!-- <router-view></router-view> -->

  <router-view v-slot="{ Component, route }" v-if="!isLoading">
    <Transition appear mode="out-in" :css="false" :key="route">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { ref, onMounted } from "vue";

let isLoading = ref(true);

/* Life cycles hooks */

onMounted(() => {
  console.log("App onMounted invoked");

  isLoading.value = false;

  if (!document.body.classList.contains("app-active")) {
    document.body.classList.add("app-active");
  }
});
</script>

<style lang="postcss">
.rotationLoader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #FFF;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.rotationLoader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid orange;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>