<template>
  <q-page class="flex flex-center column">
    <h1>JVdS Main</h1>

    <router-link to="/">
      Main
    </router-link>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import loadData from '../scripts/loadData'
import getOpus from '../restapis/CatalogOfWorks'
import getOpusCategories from '../restapis/CategoriesOfWorks'

const catalogOfWorksData = ref([])
const categoriesData = ref([])

onMounted(async () => {
  catalogOfWorksData.value = await loadData(getOpus,'Catalog of Works loaded successfully', 'Loading the Catalog of Works failed')
  categoriesData.value = await loadData(getOpusCategories, 'Categories of Works loaded successfully', 'Loading the Categories of Works failed')

  console.log('catalogOfWorksData =', catalogOfWorksData);
  console.log('categoriesData =', categoriesData);
})
</script>

<style>
h1 {
  color: white;
}
</style>