import { ref, reactive, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageTransitionsStore = defineStore('pageTransitions', () => {

  // quasi "state"
  const pageTransitions = ref({
    parent: false,
    child: false,
    activateMenu: false,
    //
    startMainPageMountAnimation: false,
    //
    // mainLayoutAnimationDuration: 1.0,
    // introAnimationDuration: 1.5,
    // startpageLayoutAnimationDuration: 0.5,
    // menuAnimationDuration: 0
  })

  // quasi "action"
  const setPageTransitions = (level, bool) => {
    console.log(`set [${level}] page transition to ${bool}`);

    switch(level) {
      case 'parent': {
        console.log('  got [parent]');
        pageTransitions.value.parent = bool
        break
      }

      case 'child': {
        console.log('  got [child]');
        pageTransitions.value.child = bool
        break
      }

      default: {
        console.log('   got default... which is wrong and must never happen!');
      }
    }

  }

  const setIntroAnimationDuration = (duration) => {
    pageTransitions.value.introAnimationDuration = duration
  }

  const setActivateMenu = (bool) => {
    console.log('pageTransitionsStore: setActivateMenu bool =', bool);
    pageTransitions.value.activateMenu = bool
  }

  const setStartMainPageMountAnimation = (bool) => {
    pageTransitions.value.startMainPageMountAnimation = bool
  }

  // Getters are "computed properties", when pinia is setup with composition API

  // Actions are regular functions

  return {
    pageTransitions,
    setPageTransitions,
    setIntroAnimationDuration,
    setActivateMenu,
    setStartMainPageMountAnimation
  }

})
