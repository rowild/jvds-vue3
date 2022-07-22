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

# TODO

## 2022-06-10

- Implement a decent logger library
- Implement GraphQL with Directus
- How to create a menu based on entries in Directus9?


# Example link
http://0.0.0.0:8055/items/posts?fields=id,title,subtitle,slug,content,featured_image,post_categories.post_categories_id.id,post_categories.post_categories_id.title,post_tags.post_tags_id.id,post_tags.post_tags_id.title

http://0.0.0.0:8055/graphql?query={posts{id%20title}}