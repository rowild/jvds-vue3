<script setup>
const props = defineProps({
  navItems: Object
})

</script>

<template>
  <div class="column justify-center full-height">
    <h1>Menu</h1>
    <ul class="text-subtitle1 text-weight-medium color-primary q-ma-none q-pa-none min-w-md" v-for="item in navItems" :key="item.id">
      <li class="">
        {{ item.name }} | {{ item.slug }}

        <ul v-for="child in item.menu_items_o2m" :key="child.id">
          <li>
            <router-link :to="`/${item.slug}/${child.slug}`">{{ child.title }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>