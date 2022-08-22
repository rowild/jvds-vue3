<template>
  <q-page class="flex flex-center column">
    <div class="" ref="mainPage">
      <h1 class="text-h3">Main Page</h1>

      <router-link to="/" class="btn btn-bright btn-medium btn-no-underline">
        Back to Start Page (Home)
      </router-link>

      <router-view v-slot="{ Component, route }">
        <KeepAlive>
          <Transition appear @appear="onAppear" :css="false" mode="out-in" :key="route.meta.layoutKey">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </router-view>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
import gsap from 'gsap'
// import loadData from '../scripts/loadData'
// import getOpus from '../restapis/CatalogOfWorks'
// import getOpusCategories from '../restapis/CategoriesOfWorks'
// let catalogOfWorksData = ref([])
// let categoriesData = ref([])

const store = usePageTransitionsStore()

// Reference to DOM element 'ref="mainPage"'
const mainPage = ref(null)

// GSAP timeline (do we really need a timeline?)
const tl = gsap.timeline({
  autoAlpha: 0,
  onComplete: () => { console.log('TL onComplete invoked: mainPage visible now') },
})

// TL to be called, when layout and menu is done (see watchEffect)
const mountAnimation = () => {
  console.log('mountAnimation invoked');
  tl.to(mainPage.value, { autoAlpha: 1, duration: 1 })
}

// "store.setStartMainPageMountAnimation(true)" is set in MainKayout watchEffect()
watchEffect(() => {
  if (store.pageTransitions.startMainPageMountAnimation) {
    console.log('   > watchEffect: store.pageTransitions.startMainPageMountAnimation =', store.pageTransitions.startMainPageMountAnimation);

    mountAnimation()
  }
})

// console.log styles
const consCol = 'color: fuchsia; font-weight: 700; font-size: 14px;'

onMounted(async () => {
  console.log('%cMAIN_PAGE: onMounted invoked', consCol);
  // catalogOfWorksData.value = await loadData(getOpus,'Catalog of Works loaded successfully', 'Loading the Catalog of Works failed')
  // categoriesData.value = await loadData(getOpusCategories, 'Categories of Works loaded successfully', 'Loading the Categories of Works failed')
  tl.set(mainPage.value, { autoAlpha: 0 })
})

/* Transition Hooks */

const onAppear = (el, done) => {
  console.log('%cMAIN_PAGE: onAppear invoked', consCol);

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onAppear, do GSAP alpha to 1');
    // gsap.to(mainPage.value, { autoAlpha: 1, duration: 1, onComplete: () => done })
    done()
  } else {
    console.log('   NOPE, do not invoke transition onAppear');
    done()
  }
}

/* Router Guards */

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_PAGE: onBeforeRouteLeave invoked with a GSAP animation', consCol);

  store.setPageTransitions('parent', true)

  // tl.pause()
  // tl.reversed()
  // tl.eventCallback('onReverseComplete', () => {
  //   console.log('   > TL reverse complete...')
  //   tl.to(mainPage.value, { duration: 0, autoAlpha: 0 })
  //   store.setStartMainPageMountAnimation(false)

  //   setTimeout(() => {
  //     console.log('   ...wait 200ms secs to invoke next...');
  //     next()
  //   }, 200)
  // })
  // tl.timeScale(1).reverse(0)

  gsap.to(mainPage.value, {
    duration: 2,
    autoAlpha: 0,
    onComplete: () => {
      store.setStartMainPageMountAnimation(false)
      // store.setActivateMenu(false)
      next()
    }
  })
})
</script>

<style>
h1 {
  color: white;
}
</style>

<!--
const catalogOfWorksData = ref([
  {
    "id": 1,
    "title": "Absence Affirmed",
    "additional_title": "Additional title",
    "composers": [
      {
        "persons_id": {
          "first_name": "John",
          "last_name": "Van der Slice",
          "birthday": "1940-02-09"
        }
      }
    ],
    "categories": [
      {
        "opus_categories_id": {
          "title": "Orchestra",
          "slug": "orchestra"
        }
      }
    ]
  },
  {
    "id": 2,
    "title": "Absence Affirmed",
    "additional_title": null,
    "composers": [
      {
        "persons_id": {
          "first_name": "John",
          "last_name": "Van der Slice",
          "birthday": "1940-02-09"
        }
      }
    ],
    "categories": [
      {
        "opus_categories_id": {
          "title": "Solo Works",
          "slug": "solo-works"
        }
      },
      {
        "opus_categories_id": {
          "title": "Piano Works",
          "slug": "piano-works"
        }
      }
    ]
  }
])

const categoriesData = ref([
  {
    "id": 1,
    "title": "Orchestra",
    "slug": "orchestra"
  },
  {
    "id": 3,
    "title": "Solo Works",
    "slug": "solo-works"
  },
  {
    "id": 18,
    "title": "Works for Percussion",
    "slug": "works-for-percussion"
  }
])
-->
