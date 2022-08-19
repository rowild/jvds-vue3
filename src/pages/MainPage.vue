<template>
  <q-page class="flex flex-center column">
    <h1>Main Page</h1>

    <router-link to="/">
      Back to Start Page (Home)
    </router-link>

    <router-view v-slot="{ Component, route }">
      <KeepAlive>
        <Transition appear
            @before-appear="onBeforeAppear"
            @appear="onAppear"
            @after-appear="onAfterAppear"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            :css="false"
            mode="out-in"
            :key="route.meta.layoutKey">
          <component :is="Component" />
        </Transition>
      </KeepAlive>
    </router-view>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
// import loadData from '../scripts/loadData'
// import getOpus from '../restapis/CatalogOfWorks'
// import getOpusCategories from '../restapis/CategoriesOfWorks'
// let catalogOfWorksData = ref([])
// let categoriesData = ref([])

const store = usePageTransitionsStore()

onMounted(async () => {
  // catalogOfWorksData.value = await loadData(getOpus,'Catalog of Works loaded successfully', 'Loading the Catalog of Works failed')
  // categoriesData.value = await loadData(getOpusCategories, 'Categories of Works loaded successfully', 'Loading the Categories of Works failed')
})

const onBeforeAppear = () => {
  console.log('MainPage onBeforeAppear invoked');
}

const onAppear = () => {
  console.log('MainPage onAppear invoked');
}

const onAfterAppear = () => {
  console.log('MainPage onAfterAppear invoked');
}

const onBeforeEnter = () => {
  console.log('MainPage onBeforeEnter invoked');
}

const onEnter = () => {
  console.log('MainPage onEnter invoked');
}
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
