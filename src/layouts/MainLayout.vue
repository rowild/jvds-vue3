<template>
  <q-layout view="lHh Lpr lFf" container class="flex column absolute-full overflow-hidden ">

    <div ref="rectMainLayout" class="rectMainLayout">MainLayout</div>

    <div class="flex flex-center fit window-height" v-if="layoutIsLoading">
      <div class="rotationLoader">Loading</div>
    </div>

    <div class="flex full-height row">

      <div class="nav-container flex column items-cenrer justify-center q-px-sm">

        <!--
        <div class="q-pt-xl q-px-md text-light-green-2 absolute-top">
          <p>store.pageTransitions.activateMenu: {{ store.pageTransitions.activateMenu }}</p>
        </div>
        -->

        <!-- NAVIGATION -->

        <div class="flex column justify-center align-center max-w-sm" ref="navMenu">

          <div v-if="store.pageTransitions.activateMenu">

            <ul class="nav-menu text-subtitle1 text-weight-medium color-primary q-ma-none q-pa-none q-mb-lg min-w-md"
              v-if="navItems">

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

      <q-page-container v-if="!layoutIsLoading" class="col-grow">
        <router-view v-slot="{ Component, route }">
          <Transition appear @appear="onAppear" :css="false" mode="out-in" :key="route.meta.layoutKey">
            <component :is="Component" />
          </Transition>
        </router-view>
      </q-page-container>

    </div>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated, watchEffect } from 'vue'
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
const rectTL = gsap.timeline({
  paused: true,
  autoAlpha: 0
})

const menuTL = gsap.timeline({
  paused: true,
  autoAlpha: 0
})

const dissolveTL = gsap.timeline({
  paused: true,
  autoAlpha: 0
})

// watchEffect is capable of watching any reactive variables that are referenced
// within the callback function.
watchEffect(() => {
  // Fade in menu, when all the parameters are met.
  if (navItems.length > 0 && store.pageTransitions.parent && store.pageTransitions.activateMenu && navMenu.value) {
    console.log('...watchEffect for navMenu...');

    menuTL.set(navMenu.value, { autoAlpha: 0 })

    menuTL.to(navMenu.value, {
      autoAlpha: 1,
      duration: 2,
      onComplete: () => {
        console.log('   MainLayout: Menu GSAP animation complete')
        store.setMountAnimation('mainPage', true)
      }
    })

    store.setAnimationDuration('mainLayoutMenu', menuTL.duration())

    menuTL.play()
  }
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
    rectTL.set(rectMainLayout.value, { autoAlpha: 0 })
  }

  layoutIsLoading.value = false
})

/* Transitions hooks */

const onAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onEnter invoked', consCol);

  rectTL.clear()
  rectTL.killTweensOf(navMenu.value)

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onEnter, do GSAP alpha to 1');

    rectTL.to(rectMainLayout.value, {
      autoAlpha: 1,
      duration: .5,
      onComplete: () => {
        store.setActivateMenu(true)
        done()
      }
    })

    store.setAnimationDuration('mainLayout', rectTL.duration())

    rectTL.play()
  }
  else {
    console.log('   NOPE, do not invoke transition onEnter');
    done()
  }
}

// const onEnter = () => {
//   console.log('%cMAIN_LAYOUT: onEnter invoked', consCol);
// }

const onLeave = () => {
  console.log('%cMAIN_LAYOUT: onLeave invoked', consCol);
}

/* Router guards */

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteLeave invoked, activate GSAP on rectMainLayout', consCol);

  // "dissolveTL" is defined outside of this method, otherwise it would be redefined every
  // time this method is called.
  dissolveTL.clear()
  dissolveTL.killTweensOf(navMenu.value)
  dissolveTL.to(navMenu.value, { autoAlpha: 0, duration: .5 })
  dissolveTL.to(rectMainLayout.value, {
    autoAlpha: 0,
    duration: .5,
    onComplete: () => {
      console.log('   Mainlayout: Dissolving animation of menu and mainLayout complete...')
      // store.setMountAnimation('mainPage', false) // done in mainPage.vue
      store.setActivateMenu(false) // do NOT unset earier!!! Would make navMenu disappear immediately!
      next()
    }
  })
  dissolveTL.play()
})
</script>
