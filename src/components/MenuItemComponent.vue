<template>
  <li>
    <router-link :to="`/${item.slug}/${child.slug}`">{{ child.title }}</router-link>
  </li>
</template>

<script setup>
const props = defineProps({
  item: Object,
  child: Object
})

// const emit = defineEmits(['change', 'delete'])
</script>

