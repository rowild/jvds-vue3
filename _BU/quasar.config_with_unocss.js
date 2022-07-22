/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers')

// const {
//   presetAttributify,
//   presetIcons,
//   presetTypography,
//   presetUno,
//   presetWebFonts
// } = require("unocss");
// const transformerDirective = require('@unocss/transformer-directives')

const path = require('path')

module.exports = configure(function (ctx) {
  return {
    eslint: {
      fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,
    boot: [
      'logger',
      'i18n',
      'axios',
      'apollo'
      // 'unocss'
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'variables.css',
      'app.css',
      './form/buttons.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      'mdi-v6',
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      extendViteConf(viteConf, {
        isServer,
        isClient
      }) {
        // Object.assign(viteConf.resolve.alias, {
        //   '@': path.join(__dirname, './src')
        // })
      },

      // viteVuePluginOptions: {},

      vitePlugins: [
        ['@intlify/vite-plugin-vue-i18n', {
          // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
          // compositionOnly: false,

          // you need to set i18n resource including paths !
          include: path.resolve(__dirname, './src/i18n/**')
        }],
        // [
        //   "@unocss/vite",
        //   {
        //     presets: [
        //       presetAttributify({}),
        //       presetIcons(),
        //       presetTypography(),
        //       presetUno(),
        //       presetWebFonts(),
        //     ],
        //     // transformers: [
        //     //   transformerDirective(),
        //     // ],
        //     theme: {
        //       colors: {

        //       },
        //       size: {
        //         xs: "4px",
        //         sm: "8px",
        //         md: "16px",
        //         lg: "24px",
        //         xl: "48px",
        //       },
        //     },
        //     rules: [
        //       // ["no-shadow", { "box-shadow": "none" }],
        //       // ["q-ma-auto", { margin: "auto" }],
        //       // ["q-pa-auto", { padding: "auto" }],
        //       // [
        //       //   /^q-m[xy]-(\d+)$/,
        //       //   ([, d]) => ({
        //       //     "margin-left": `${d / 4}rem`,
        //       //     "margin-right": `${d / 4}rem`,
        //       //   }),
        //       // ],
        //       // [/^q-ma-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
        //       // [
        //       //   /^q-p[xy]-(\d+)$/,
        //       //   ([, d]) => ({
        //       //     "padding-left": `${d / 4}rem`,
        //       //     "padding-right": `${d / 4}rem`,
        //       //   }),
        //       // ],
        //       // [/^q-pa-(\d+)$/, ([, d]) => ({ padding: `${d / 4}rem` })],
        //       // [
        //       //   /^q-p[xy]-(.*)$/,
        //       //   ([, c], { theme }) => {
        //       //     if (theme.size[c])
        //       //       return {
        //       //         "padding-left": theme.size[c],
        //       //         "padding-right": theme.size[c],
        //       //       };
        //       //   },
        //       // ],
        //       [
        //         /^tw-pa-(.*)$/,
        //         ([, c], {
        //           theme
        //         }) => {
        //           if (theme.size[c]) return {
        //             padding: theme.size[c]
        //           };
        //         },
        //       ],
        //       [
        //         /^my-border-(\d+)$/,
        //         ([, d]) => ({
        //           "border": `${d / 4}rem solid red`
        //         }),
        //       ],
        //     ],
        //   },
        // ]
      ]
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true,
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify'
      ],

    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    // animations: [
    //   "bounceInLeft",
    //   "bounceOutRight",
    //   "fadeIn",
    //   "fadeOut",
    //   "slideInDown",
    //   "slideOutUp"
    // ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    // },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    }
  }
})
