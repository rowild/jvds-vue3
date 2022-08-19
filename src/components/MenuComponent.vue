<template>
  <div class="column justify-center full-height max-w-sm">

    <div class="q-mt-xl q-py-lg text-light-green-2">
      <p>props.toggleMenu: {{ props.toggleMenu }}</p>
    </div>

    <div v-if="props.toggleMenu">
      <ul class="text-subtitle1 text-weight-medium color-primary q-ma-none q-pa-none q-mb-lg min-w-md" v-if="navItems">
        <li class="" v-for="item in navItems" :key="item.id">
          {{ item.name }}

          <ul class="q-px-none q-mx-none" v-if="item.menu_items_o2m">
            <li v-for="child in item.menu_items_o2m" :key="child.id">

              <template v-if="child.menu_items_o2m">
                {{ child.name }}

                <ul class="q-px-none q-mx-none">
                  <li v-for="grandchild in child.menu_items_o2m" :key="grandchild.id">
                    <router-link :to="`/${item.slug}/${child.slug}/${grandchild.slug}`">{{ grandchild.title }}</router-link>
                  </li>
                </ul>
              </template>

              <router-link v-else :to="`/${item.slug}/${child.slug}`">{{ child.name }}</router-link>

            </li>
          </ul>

        </li>
      </ul>
      <div class="q-mb-lg" v-else>Building navigation...</div>

      <p>Why is the MenuComponent in MainLayout.vue reinitialized, when the route changes from `/main` to `/main/setion-one`? (Also, App.vue runs through `onBeforeAppear` and `onAppear`... why?)</p>
      <p>It is not reinitialized, when goind from `/main/section-one` to `/main/section-two` and also not, when going from `/main/section-one/item-101` to `/main/section-two/202`.</p>
      <p>The beforeEach route guard in boot/routes.js – which is supposed to handle the MainLayout reload logic – checks **only** against the very first path segment (path.split('/')[1]) in order to decide whether the animation store's pageTransition boolean should be set to true or false – consequently enabling or disabling router changes...</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onBeforeUpdate, onUpdated, computed } from 'vue'

const navItems = ref([])
let navCreated = false

const props = defineProps({
  toggleMenu: {
    type: Boolean,
    default: false
  }
})

const consColRouter = 'color: lightcoral; font-size: 14px; font-weight: bold;'

onMounted(() => {
  console.log('%cMENU_COMPONENT: onMounted invoked', consColRouter);

  if(!navCreated) {
    // navItems.value = await loadData(getNavigation, 'Nav Items loaded', 'Could not load nav items')
    navItems.value = [
      {
        "id": 10,
        "name": "START PAGE",
        "slug": "startpage",
        "menu_items_o2m": [
          {
            "id": 1,
            "title": "Home",
            "slug": "home"
          }
        ]
      },
      {
        "id": 10,
        "name": "MAIN PAGE",
        "slug": "main",
        "menu_items_o2m": [
          {
            "id":20,
            "name": "MAIN CONTENT",
            "slug": "main"
          },
          {
            "id": 6,
            "name": "SECTION ONE",
            "slug": "section-one",
            "menu_items_o2m": [
              {
                "id": 2,
                "title": "Item 101",
                "slug": "item-101"
              },
              {
                "id": 5,
                "title": "Item 102",
                "slug": "item-102"
              },
              {
                "id": 6,
                "title": "Item 103",
                "slug": "item-103"
              },
              {
                "id": 7,
                "title": "Item 104",
                "slug": "item-104"
              }
            ]
          },
          {
            "id": 26,
            "name": "SECTION TWO",
            "slug": "section-two",
            "menu_items_o2m": [
              {
                "id": 22,
                "title": "Item 201",
                "slug": "item-201"
              },
              {
                "id": 25,
                "title": "Item 202",
                "slug": "item-202"
              },
              {
                "id": 26,
                "title": "Item 203",
                "slug": "item-203"
              }
            ]
          }
        ]
      }
    ]
    // console.log('navItems.value =', JSON.stringify(navItems.value, null, 2));
    navCreated = true
  }
  else {
    console.warn('nav already created');
  }
})

onActivated(() => {
  console.log('%cMENU_COMPONENT: onActivated invoked', consColRouter);
})

onDeactivated(() => {
  console.log('%cMENU_COMPONENT: onDeactivated invoked', consColRouter);
})

onBeforeUnmount(() => {
  console.log('%cMENU_COMPONENT: onBeforeUnmount invoked', consColRouter);
})

onUnmounted(() => {
  console.log('%cMENU_COMPONENT: onUnmounted invoked', consColRouter);
})

onBeforeUpdate(() => {
  console.log('%cMENU_COMPONENT: onBeforeUpdate invoked', consColRouter);
})

onUpdated(() => {
  console.log('%cMENU_COMPONENT: onUpdated invoked', consColRouter);
})
</script>

<style lang="postcss">
p {
  margin-bottom: .5rem;
}

ul {
  list-style: none;
}
.max-w-sm {
  max-width: 200px;
}
</style>
