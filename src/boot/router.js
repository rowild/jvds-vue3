import { boot } from 'quasar/wrappers'
import { usePageTransitionsStore } from 'src/stores/pageTransitions.js'
const store = usePageTransitionsStore()

const consCol = 'color: crimson; font-size: 20px; font-wight: bold; padding: 4px 0;'

export default (({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log('%cROUTER: BEFORE EACH', consCol);

    let fromParentPath = `/${from.path.split('/')[1]}`
    let toParentPath = `/${to.path.split('/')[1]}`

    console.log('  fromParentPath =', fromParentPath);
    console.log('  toParentPath =', toParentPath);

    console.log('  from.meta.layoutKey =',   from.meta.layoutKey);
    console.log('  to.meta.layoutKey =',   to.meta.layoutKey);

    // Parent
    if(fromParentPath !== toParentPath) {
      console.warn("Activate animation on [parent path] in store")
      store.setPageTransitions('parent', true)
    }
    else {
      console.warn("DeActivate animation on [parent path] in store")
      store.setPageTransitions('parent', false)
    }

    next()

  })

})
