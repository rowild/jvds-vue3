<template>
  <q-layout view="lHh lpR lFf" container class="absolute-full overflow-hidden">
    <q-page-container>
      <div class="flex flex-center fit window-height" v-if="isLoading">
        <div class="rotationLoader">Loading</div>
      </div>

      <router-view v-slot="{ Component, route }" v-else>
        <Transition appear @before-appear="onBeforeAppear" @appear="onAppear" @after-appear="onAfterAppear"
          @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave"
          @leave="onLeave" @after-leave="onAfterLeave" :css="false" duration="250" mode="out-in" :key="route">
          <component :is="Component" />
        </Transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const isLoading = ref(false)

/* Life cycles hooks */

onMounted(() => {
  console.log('START_PAGE LAYOUT: mounted invoked\n\n');

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (!document.body.classList.contains('app-active')) {
      document.body.classList.add('app-active')
    }

    if (document.body.classList.contains('subpage-active')) {
      document.body.classList.remove('subpage-active')
    }
  }, 350)
})

onActivated(() => {
  console.log('START_PAGE LAYOUT: activated');
})

onDeactivated(() => {
  console.log('START_PAGE LAYOUT: deactivated');
})

/* Transition cycles */

// APPEAR

const onBeforeAppear = (el) => {
  console.log('START_PAGE LAYOUT: onBeforeAppear invoked');

}

const onAppear = (el, done) => {
  console.log('START_PAGE LAYOUT: onAppear invoked');
  done
}

const onAfterAppear = (el) => {
  console.log('START_PAGE LAYOUT: onAfterAppear invoked');
}

const onAfterCancelled = (el) => {
  console.log('START_PAGE LAYOUT: onAfterCancelled invoked');
}

// ENTER

const onBeforeEnter = (el) => {
  console.log('START_PAGE LAYOUT: onBeforeEnter invoked, el =', el);
}

const onEnter = (el, done) => {
  console.log('START_PAGE LAYOUT: onEnter invoked, el =', el);
  done
}

const onAfterEnter = (el) => {
  console.log('START_PAGE LAYOUT: onAfterEnter invoked, el =', el);
}

const onEnterCancelled = (el) => {
  console.log('START_PAGE LAYOUT: onEnterCancelled, el =', el);
}

// LEAVE

const onBeforeLeave = (el) => {
  console.log('START_PAGE LAYOUT: onBeforeLeave invoked, el =', el);
}

const onLeave = (el, done) => {
  console.log('START_PAGE LAYOUT: onLeave invoked, el =', el);
  done
}

const onAfterLeave = (el) => {
  console.log('START_PAGE LAYOUT: onAfterLeave invoked, el =', el);
}

const onLeaveCancelled = (el) => {
  console.log('START_PAGE LAYOUT: onLeaveCancelled, el =', el);
}

/* ROUTE GUARDS */

const consColRouter = 'color: orange; font-size: 24px; padding: 6px 0;'

onBeforeRouteUpdate((to, from) => {
  // called when the route that renders this component has changed,
  // but this component is reused in the new route.
  // For example, given a route with params `/users/:id`, when we
  // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
  // will be reused, and this hook will be called when that happens.
  // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  setTimeout(() => {
    console.log('%c --- StartpageLayout: onBeforeRouteUpdate', consColRouter);
  }, 2000)
})

onBeforeRouteLeave((to, from, next) => {
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.
  setTimeout(() => {
    console.log('%c --- StartpageLayout: onBeforeRouteLeave', consColRouter);

    next()
  }, 2000)
})
</script>
