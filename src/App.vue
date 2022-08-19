<template>
  <div v-if="layoutIsPreloading" class="flex flex-center fit">
    <div class="rotationLoader"><!--Loading...--></div>
  </div>

  <router-view v-slot="{ Component, route }" v-else>
    <Transition
      appear
      mode="out-in"
      @before-appear="onBeforeAppearApp"
      @appear="onAppearApp"
      :css="false"
      :key="route.name">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'

// const app = getCurrentInstance()
let layoutIsPreloading = ref(true);

// console.log styles
const consCol = 'color: green; font-weight: 700; font-size: 14px;'

/* Life cycles and transition hooks */

onMounted((ctx) => {
  console.log('%cAPP: mounted invoked', consCol);

  layoutIsPreloading.value = false;

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

/* Route guards */

onBeforeRouteUpdate((to, from, next) => {
  console.log('%cAPP: onBeforeRouteUpdate invoked', consCol);

  console.log('    -> from =', from);
  console.log('    -> to =', to);

  let fromParentPath = `/${from.path.split('/')[1]}`
  let toParentPath = `/${to.path.split('/')[1]}`

  console.log('    -> fromParentPath =', fromParentPath);
  console.log('    -> toParentPath =', toParentPath);

  if(fromParentPath !== toParentPath) {
    console.warn('   YES, invoke router guard onBeforeRouteUpdate');
    next()
  } else {
    console.log('   NOPE, do not invoke router guard onBeforeRouteUpdate');
    next()
  }
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cAPP: onBeforeRouteLeave invoked', consCol);

  console.log('    -> from =', from);
  console.log('    -> to =', to);
})
</script>
