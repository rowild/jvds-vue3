<template>
  <q-layout view="lHh Lpr lFf" container class="absolute-full overflow-hidden">

    <div ref="rectMainLayout" class="rectMainLayout">Main layout</div>

    <div class="nav-container absolute full-height q-px-sm">

      <div class="q-pt-xl q-px-sm text-light-green-2">
        <p>store.pageTransitions.activateMenu: {{ store.pageTransitions.activateMenu }}</p>
      </div>

      <div class="column justify-center full-height max-w-sm">

        <div v-if="store.pageTransitions.activateMenu">

          <ul class="nav-menu text-subtitle1 text-weight-medium color-primary q-ma-none q-pa-none q-mb-lg min-w-md"
            v-if="navItems" ref="navMenu">

            <li class="" v-for="item in navItems" :key="item.id">
              {{ item.name }}

              <ul class="q-px-none q-mx-none" v-if="item.menu_items_o2m">

                <li v-for="child in item.menu_items_o2m" :key="child.id">

                  <template v-if="child.menu_items_o2m">
                    {{ child.name }}

                    <ul class="q-px-none q-mx-none">
                      <li v-for="grandchild in child.menu_items_o2m" :key="grandchild.id">
                        <router-link :to="`/${item.slug}/${child.slug}/${grandchild.slug}`">{{ grandchild.title }}
                        </router-link>
                      </li>
                    </ul>
                  </template>

                  <router-link v-else :to="`/${item.slug}/${child.slug}`">{{ child.name }}</router-link>

                </li>

              </ul>

            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="flex flex-center fit window-height" v-if="layoutIsLoading">
      <div class="rotationLoader">Loading</div>
    </div>

    <q-page-container v-if="!layoutIsLoading">
      <router-view v-slot="{ Component, route }">
        <KeepAlive>
          <Transition appear @appear="onAppear" :css="false" mode="out-in" :key="route.meta.layoutKey">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()

const navItems = [
  {
    "id": 10,
    "name": "START PAGE",
    "slug": "startpage",
    "menu_items_o2m": [
      {
        "id": 1,
        "title": "Home",
        "slug": "home"
      }
    ]
  },
  {
    "id": 10,
    "name": "MAIN PAGE",
    "slug": "main",
    "menu_items_o2m": [
      {
        "id": 20,
        "name": "MAIN CONTENT",
        "slug": "main"
      },
      {
        "id": 6,
        "name": "SECTION ONE",
        "slug": "section-one",
        "menu_items_o2m": [
          {
            "id": 2,
            "title": "Item 101",
            "slug": "item-101"
          },
          {
            "id": 5,
            "title": "Item 102",
            "slug": "item-102"
          },
          {
            "id": 6,
            "title": "Item 103",
            "slug": "item-103"
          },
          {
            "id": 7,
            "title": "Item 104",
            "slug": "item-104"
          }
        ]
      },
      {
        "id": 26,
        "name": "SECTION TWO",
        "slug": "section-two",
        "menu_items_o2m": [
          {
            "id": 22,
            "title": "Item 201",
            "slug": "item-201"
          },
          {
            "id": 25,
            "title": "Item 202",
            "slug": "item-202"
          },
          {
            "id": 26,
            "title": "Item 203",
            "slug": "item-203"
          }
        ]
      }
    ]
  }
]

const layoutIsLoading = ref(true)

// DOM Elements
const rectMainLayout = ref(null)
const navMenu = ref(null)

// Timelines

// Dissolve menu and mainlayout; define here, otherwise it will be redefined every
// time the onBeforeRouteLeave gets invoked
const tl = gsap.timeline({
  paused: true,
})

// console.log styles
const consCol = 'color: darkviolet; font-weight: 700; font-size: 14px;'

/* Life cycles hooks */

onMounted(async () => {
  console.log('%cMAIN_LAYOUT: onMounted invoked', consCol);

  if (!document.body.classList.contains('subpage-active')) {
    document.body.classList.add('subpage-active')
  }

  if (document.body.classList.contains('app-active')) {
    document.body.classList.remove('app-active')
  }

  // Only animate, when the state says so
  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onMounted, do GSAP alpha to 0');
    gsap.set(rectMainLayout.value, { autoAlpha: 0 })
  }

  layoutIsLoading.value = false
})

// watchEffect is capable of watching any reactive variables that are referenced
// within the callback function.
watchEffect(() => {
  // Fade in menu, when all the parameters are met.
  if (navItems.length > 0 && store.pageTransitions.parent && store.pageTransitions.activateMenu && navMenu.value) {
    gsap.set(navMenu.value, { autoAlpha: 0 })
    gsap.to(navMenu.value, {
      autoAlpha: 1,
      duration: 1,
      onComplete: () => {
        store.setStartMainPageMountAnimation(true)
      }
    })
  }
})

/* Transitions hooks */

const onAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onAppear invoked', consCol);

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onAppear, do GSAP alpha to 1');
    gsap.to(rectMainLayout.value, {
      autoAlpha: 1, duration: 1, onComplete: () => {
        store.setActivateMenu(true)
        done
      }
    })
  }
  else {
    console.log('   NOPE, do not invoke transition onAppear');
    done()
  }
}

/* Router guards */

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteLeave invoked, activate GSAP on rectMainLayout', consCol);

  // "tl" is defined outside of this method, otherwise it would be redefined every
  // time this method is called.
  tl.to(navMenu.value, { autoAlpha: 0, duration: 2 })
  tl.to(rectMainLayout.value, { autoAlpha: 0, duration: 2 })
  tl.eventCallback('onComplete', () => {
    console.log('Dissolve menu and mainlayout complete...')
    store.setActivateMenu(false)
    next()
  })

  tl.play()
})

</script>

<style lang="postcss">
.nav-container {
  min-width: 16rem;
  color: var(--color-brand);
  z-index: 1000;
}

p {
  margin-bottom: .5rem;
}

ul {
  list-style: none;
}

.max-w-sm {
  max-width: 200px;
}
</style>
