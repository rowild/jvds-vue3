# JVdS Vue3 Frontend (jvds-vue3-frontend)

The Frontend of JVdS's website using Quasar 2 with Vite and Vue3

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Add prettier, unocss etc

- package.json

  "eslint-config-prettier": "^8.1.0",
  "prettier": "^2.5.1",
  "unocss": "^0.31.3"

- .eslintrc.js

  activate "prettier" in "extends: {}
