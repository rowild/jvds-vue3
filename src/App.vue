<template>
  <div v-if="layoutIsPreloading" class="flex flex-center fit">
    <div class="rotationLoader">
      <!--Loading...-->
    </div>
  </div>

  <router-view v-slot="{ Component, route }" v-else>
    <Transition appear mode="out-in" @before-appear="onBeforeAppearApp" @appear="onAppearApp" :css="false"
      :key="route.meta.layoutKey">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// console.log styles
const consCol = 'color: green; font-weight: 700; font-size: 14px;'

/* Life cycles and transition hooks */

onMounted((ctx) => {
  console.log('%cAPP: mounted invoked', consCol);

  if (!document.body.classList.contains("app-active")) {
    document.body.classList.add("app-active");
  }
});

const onBeforeAppearApp = () => {
  console.log('%cAPP: onBeforeAppearApp invoked', consCol);
}

const onAppearApp = (el, done) => {
  console.log('%cAPP: onAppearApp invoked', consCol);
  done()
}

/* Route guards - not "working" in App-vue! */
</script>
