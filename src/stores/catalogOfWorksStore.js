import { defineStore } from 'pinia'
import getCatalogOfWorks from '../restapis/CatalogOfWorks'

export const useCatalogOfWorks = defineStore('catalogOfWorks', {
  state: () => ({
    opus: [],
    categories: []
  }),
  getters: {
    getOpus: (state) => {
      return state.opus
    },
    getCategories: (state) => {
      return state.categories
    }
  },
  actions: {
    initializeCatalog: (state) => {


    }
  }
})
