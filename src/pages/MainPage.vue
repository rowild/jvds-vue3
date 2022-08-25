<template>
  <q-page class="flex flex-center column">
    <div class="" ref="mainPage">
      <h1 class="text-h3">Main Page</h1>

      <router-link to="/" class="btn btn-bright btn-medium btn-no-underline">
        Back to Start Page (Home)
      </router-link>

      <router-view v-slot="{ Component, route }" class="q-mt-md">
        <Transition appear @appear="onAppear" :css="false" mode="out-in" :key="route.meta.layoutKey">
          <component :is="Component" />
        </Transition>
      </router-view>

    </div>
  </q-page>
</template>

<script setup>
import { ref, watchEffect, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, onBeforeUpdate, onUpdated, onActivated, onDeactivated, onErrorCaptured, onRenderTracked, onRenderTriggered } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
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
const mainPageTL = gsap.timeline({
  autoAlpha: 0,
  onComplete: () => {
    console.log('   MainPage GSAP teimlne onComplete invoked: mainPage visible now')
  }
})

// TL to be called, when layout and menu is done (see watchEffect)
const mountAnimation = () => {
  console.log('   MainPage mountAnimation invoked: mainPage.value =', mainPage.value);
  mainPageTL.to(mainPage.value, {
    autoAlpha: 1,
    duration: .5
  })

  store.setAnimationDuration('mainPage', mainPageTL.duration())

  mainPageTL.play()
}

// "store.setStartMainPageMountAnimation(true)" is set in MainKayout watchEffect()
watchEffect(() => {
  if (store.pageTransitions.mainPageMountAnimation) {
    console.log('   MainPage watchEffect: store.pageTransitions.mainPageMountAnimation =', store.pageTransitions.mainPageMountAnimation);

    mountAnimation()
  }
})

// console.log styles
const consCol = 'color: fuchsia; font-weight: 700; font-size: 14px;'

/* Life cycle hooks */

onBeforeMount(() => {
  console.log('%cMAIN_PAGE: onBeforeMount invoked', consCol);
})

onMounted(async () => {
  console.log('%cMAIN_PAGE: onMounted invoked', consCol);
  // catalogOfWorksData.value = await loadData(getOpus,'Catalog of Works loaded successfully', 'Loading the Catalog of Works failed')
  // categoriesData.value = await loadData(getOpusCategories, 'Categories of Works loaded successfully', 'Loading the Categories of Works failed')
  mainPageTL.set(mainPage.value, {
    autoAlpha: 0
  })
})

/* Transition Hooks */

const onAppear = () => {
  console.log('%cMAIN_PAGE: onAppear invoked', consCol);

  if (store.pageTransitions.parent) {
    console.log('   YES, invoke transition onAppear');
  }
  else {
    console.log('   NOPE, do not invoke transition onAppear');
  }
}

/* Router Guards */

onBeforeRouteUpdate(() => {
  console.log('%cMAIN_PAGE: onBeforeRouteUpdate invoked', consCol);
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cMAIN_PAGE: onBeforeRouteLeave invoked with a GSAP animation', consCol);

  store.setPageTransitions('parent', true)
  store.setMountAnimation('mainPage', false)

  gsap.to(mainPage.value, {
    duration: .5,
    autoAlpha: 0,
    onComplete: () => {
      console.log('MainPage onBeforeRouteLeave => gsap complete')
      next()
    }
  })
})


/*


onBeforeUnmount(() => {
  console.log('%cMAIN_PAGE: onBeforeUnmount invoked', consCol);
})

onUnmounted(async () => {
  console.log('%cMAIN_PAGE: onUnmounted invoked', consCol);
})

onBeforeUpdate(() => {
  console.log('%cMAIN_PAGE: onBeforeUpdate invoked', consCol);
})

onUpdated(async () => {
  console.log('%cMAIN_PAGE: onUpdated invoked', consCol);
})

onActivated(() => {
  console.log('%cMAIN_PAGE: onActivated invoked', consCol);
})

onDeactivated(async () => {
  console.log('%cMAIN_PAGE: onDeactivated invoked', consCol);
})

onErrorCaptured(() => {
  console.log('%cMAIN_PAGE: onErrorCaptured invoked', consCol);
})

onRenderTracked(() => {
  console.log('%cMAIN_PAGE: onRenderTracked invoked', consCol);
})

onRenderTriggered(() => {
  console.log('%cMAIN_PAGE: onRenderTriggered invoked', consCol);
})

*/
</script>

<style>
h1 {
  color: white;
}

.border {
  border: 2px solid red;
  border-radius: 1rem;
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
