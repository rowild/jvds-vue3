<template>
  <q-layout view="lHh Lpr lFf">
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

    <!--
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  -->
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'

const route = useRoute()

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]

const leftDrawerOpen = ref(false)

const isLoading = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// fetch the user information when params change
// watch(
//   () => route.params.id,
//   // async newId => {
//   //   userData.value = await fetchUser(newId)
//   // }
// )

/* Life cycles hooks */

onMounted(() => {
  console.log('MAIN LAYOUT: mounted invoked\n\n');

  console.log('route =', route);

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (!document.body.classList.contains('subpage-active')) {
      document.body.classList.add('subpage-active')
    }

    if (document.body.classList.contains('app-active')) {
      document.body.classList.remove('app-active')
    }
  }, 350)
})

onActivated(() => {
  console.log('MAIN LAYOUT: activated');
})

onDeactivated(() => {
  console.log('MAIN LAYOUT: deactivated');
})

/* Transition cycles */

// APPEAR

const onBeforeAppear = (el) => {
  console.log('MAIN LAYOUT: onBeforeAppear invoked');
}

const onAppear = (el, done) => {
  console.log('MAIN LAYOUT: onAppear invoked');
  done
}

const onAfterAppear = (el) => {
  console.log('MAIN LAYOUT: onAfterAppear invoked');
}

// ENTER

const onBeforeEnter = (el) => {
  console.log('MAIN LAYOUT: onBeforeEnter invoked, el =', el);
}

const onEnter = (el, done) => {
  console.log('MAIN LAYOUT: onEnter invoked, el =', el);
  done
}

const onAfterEnter = (el) => {
  console.log('MAIN LAYOUT: onAfterEnter invoked, el =', el);
}

// LEAVE

const onBeforeLeave = (el) => {
  console.log('MAIN LAYOUT: onBeforeLeave invoked, el =', el);
}

const onLeave = (el, done) => {
  console.log('MAIN LAYOUT: onLeave invoked, el =', el);
  done
}

const onAfterLeave = (el) => {
  console.log('MAIN LAYOUT: onAfterLeave invoked, el =', el);
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
  console.log('%cMainLayout onBeforeRouteUpdate', consColRouter);
})

onBeforeRouteLeave((to, from, next) => {
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.
  setTimeout(() => {
    console.log('%c --- MainLayout: onBeforeRouteLeave', consColRouter);

    next()
  }, 2000)
})
</script>
