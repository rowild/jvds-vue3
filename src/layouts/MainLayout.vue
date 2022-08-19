<template>
  <q-layout view="lHh Lpr lFf" container class="absolute-full overflow-hidden">

    <div class="rect"></div>

    <div class="nav-container absolute full-height q-px-sm">

      <div class="column justify-center full-height max-w-sm">

        <div class="q-mt-xl q-py-lg text-light-green-2">
          <p>store.pageTransitions.activateMenu: {{ store.pageTransitions.activateMenu }}</p>
        </div>

        <div v-if="store.pageTransitions.activateMenu">
          <ul class="text-subtitle1 text-weight-medium color-primary q-ma-none q-pa-none q-mb-lg min-w-md"
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

          <div class="q-mb-lg" v-else>Building navigation...</div>

          <p>Why is the MenuComponent in MainLayout.vue reinitialized, when the route changes from `/main` to
            `/main/setion-one`? (Also, App.vue runs through `onBeforeAppear` and `onAppear`... why?)</p>
          <p>It is not reinitialized, when goind from `/main/section-one` to `/main/section-two` and also not, when
            going from `/main/section-one/item-101` to `/main/section-two/202`.</p>
          <p>The beforeEach route guard in boot/routes.js – which is supposed to handle the MainLayout reload logic –
            checks **only** against the very first path segment (path.split('/')[1]) in order to decide whether the
            animation store's pageTransition boolean should be set to true or false – consequently enabling or disabling
            router changes...</p>
        </div>

      </div>
    </div>

    <div class="flex flex-center fit window-height" v-if="layoutIsLoading">
      <div class="rotationLoader">Loading</div>
    </div>

    <q-page-container v-if="!layoutIsLoading">
      <router-view v-slot="{ Component, route }">
        <KeepAlive>
          <Transition appear @before-appear="onBeforeAppear" @appear="onAppear" :css="false" mode="out-in"
            :key="route.meta.layoutKey">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'

const store = usePageTransitionsStore()
console.log('store.pageTransitions.activateMenu =', store.pageTransitions.activateMenu);

const navItems = ref([
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
])

const route = useRoute()

const layoutIsLoading = ref(true)
const menuToggleVisible = ref(false)

let rect = null

const consColRouter = 'color: darkviolet; font-size: 14px; font-weight: bold;'
const consCol = 'color: darkviolet; font-weight: 700; font-size: 14px;'

/* Life cycles hooks */

onMounted(async () => {
  console.log('%cMAIN_LAYOUT: onMounted invoked', consCol);
  console.log('route.value =', route);

  if (!document.body.classList.contains('subpage-active')) {
    document.body.classList.add('subpage-active')
  }

  if (document.body.classList.contains('app-active')) {
    document.body.classList.remove('app-active')
  }

  rect = document.querySelector('.rect')
  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onMounted, do GSAP to 0');
    gsap.set(rect, { autoAlpha: 0 })
  }

  setTimeout(() => {
    store.setActivateMenu(true)
    menuToggleVisible.value = true
  }, 1000)

  layoutIsLoading.value = false
})

/* Transitions for content */

const onBeforeAppear = () => {
  console.log('%cMAIN_LAYOUT: onBeforeAppear invoked', consColRouter);

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onBeforeAppear, do GSAP alpha to 0');
    gsap.set(rect, { autoAlpha: 0 })
  } else {
    console.log('   NOPE, do not invoke transition onBeforeAppear');
  }
}

const onAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onAppear invoked', consColRouter);

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onAppear, do GSAP alpha to 1');
    gsap.to(rect, { autoAlpha: 1, duration: 1, onComplete: () => done })
  } else {
    console.log('   NOPE, do not invoke transition onAppear');
    done()
  }
}

const onAfterAppear = (el, done) => {
  console.log('%cMAIN_LAYOUT: onAfterAppear invoked', consColRouter);
}

/* ROUTE GUARDS */

onBeforeRouteUpdate((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteUpdate invoked', consColRouter);

  console.log('    -> from =', from, ', from.meta.layoutKey =', from.meta.layoutKey);
  console.log('    -> to =', to, ', to.meta.layoutKey =', to.meta.layoutKey);

  // let fromParentPath = `/${from.path.split('/')[1]}`
  // let toParentPath = `/${to.path.split('/')[1]}`

  // console.log('    -> fromParentPath =', fromParentPath);
  // console.log('    -> toParentPath =', toParentPath);

  // if(fromParentPath !== toParentPath) {
  if (from.meta.layoutKey !== to.meta.layoutKey) {
    console.warn('   YES, invoke router guard onBeforeRouteUpdate  SHOULD I DO GSAP TO 0 ???');
    // gsap.to(rect, { autoAlpha: 0, duration: 1.35, onComplete: () => { next() } })
    next()
  } else {
    console.log('   NOPE, do not invoke router guard onBeforeRouteUpdate');
    next()
  }
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_LAYOUT: onBeforeRouteLeave invoked, activate GSAP on rect', consColRouter);

  // HERE: make nav menu disappear
  gsap.to(rect, { autoAlpha: 0, duration: 1.35, onComplete: () => { next() } })
})

</script>

<style lang="postcss">
.nav-container {
  border: 3px solid red;
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
