import { ref, reactive, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageTransitionsStore = defineStore('pageTransitions', () => {

  // quasi "state"
  const pageTransitions = ref({
    parent: false,
    child: false,
    activateMenu: false,
    //
    indexLayoutAnimationDuration: null,
    indexPageAnimationDuration: null,
    indexPageMountAnimation: null,
    //
    mainLayoutAnimationDuration: null,
    mainLayoutMenuAnimationDuration: null,
    //
    mainPageMountAnimation: null,
    mainPageAnimationDuration: null
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

  const setAnimationDuration = (whichAnimation, duration) => {
    pageTransitions.value[`${whichAnimation}AnimationDuration`] = duration
  }

  const setActivateMenu = (bool) => {
    console.log('pageTransitionsStore: setActivateMenu bool =', bool);
    pageTransitions.value.activateMenu = bool
  }

  const setMountAnimation = (which, bool) => {
    console.log('setMountAnimation which =', which);
    pageTransitions.value[`${which}MountAnimation`] = bool
  }

  // Getters are "computed properties", when pinia is setup with composition API

  // Actions are regular functions

  return {
    pageTransitions,
    setPageTransitions,
    setAnimationDuration,
    setActivateMenu,
    setMountAnimation
  }

})
