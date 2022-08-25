import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
// import configSsr from './ssr-config';

export default store((/* configSsr */) => {
  const pinia = createPinia()
  // if (process.env.MODE === 'ssr') {
  //   configSsr({ pinia, ssrContext });
  // }
  return pinia
})
