<template>
  <q-page padding class="flex flex-center column window-height">
    <div class="intro-container">
      <div class="word word-firstname word-big word-heavy word-brand word-slick" data-sub-set-name="wordFirstName"
        data-sub-set-chars-class="firstname" data-custom-order="1">John</div>

      <div class="word word-prof01 word-middle word-slick word-addon" data-sub-set-name="wordProf01"
        data-sub-set-chars-class="prof01" data-custom-order="3">Composer</div>

      <div class="line" data-sub-set-name="_exclude_" />

      <div class="letters-group">
        <div class="word word-lastname word-big word-heavy word-brand" data-sub-set-name="wordLastName"
          data-sub-set-chars-class="lastname" data-custom-order="2">Van der Slice</div>

        <div class="word word-prof02 word-middle word-slick word-addon" data-sub-set-name="wordProf02"
          data-sub-set-chars-class="prof02" data-custom-order="4">Theorist</div>

        <div class="word word-prof03 word-middle word-slick word-addon" data-sub-set-name="wordProf03"
          data-sub-set-chars-class="prof03" data-custom-order="5">Teacher</div>
      </div>

      <router-link to="/main" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
        Enter
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import gsap from 'gsap'
import CharWrapper from 'src/static/CharWrapper.js'
import 'src/css/charWrapper.css'

let allTexts_intro = []

const wrapCharsOfIntroText = () => {
  const intro = new CharWrapper({
    saveToObject: allTexts_intro,
    rootSetIdentifier: '.intro-container',
    datasetAttrForSubSetName: 'subSetName',
    datasetAttrForSubSetCharsClass: 'subSetCharsClass',
    datasetAttrForOrder: 'customOrder',
    enumerateRootSet: true,
    wrapSubSet: {
      includeSpaces: true,
      includeSpecialChars: true
    },
    enumerateSubSet: true,
    wrapSpecialChars: false,
    wrapSpaceChar: true,
    wrapRegularChars: false,
    rootSetClass: 'letter',
    saveAsSubSet: true,
    replaceDomSource: true,
    customOrder: true,
    saveAsCustomSet: true,
    customSetName: 'customSet',
    saveAsRootSet: true
  })

  intro.wrapEachLetter()
}

/* Life cycles hooks */

onBeforeMount(() => {
  console.log('IndexPage onBeforeMount invoked');
  // wrapCharsOfIntroText()
  // console.log('allTexts_intro =', allTexts_intro);
  // const letters = document.getElementsByClassName('letter')
  // console.log('letters =', [letters].length);

  // gsap.set(Array.from(letters)), { opacity: .5 })
})

onMounted(() => {
  console.log('IndexPage onMounted invoked')
})

onActivated(() => {
  console.log('IndexPage onActivated invoked')
})

onDeactivated(() => {
  console.log('IndexPage onDeactivated invoked')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate invoked');
})

onUpdated(() => {
  console.log('onUpdated invoked');
})

/* Router Guards */

const consColRouter = 'color: orange; font-size: 24px; padding: 6px 0;'

onBeforeRouteUpdate((to, from) => {
  // called when the route that renders this component has changed,
  // but this component is reused in the new route.
  // For example, given a route with params `/users/:id`, when we
  // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
  // will be reused, and this hook will be called when that happens.
  // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  console.log('%cIndexPage onBeforeRouteUpdate', consColRouter);
})

onBeforeRouteLeave((to, from) => {
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.
  console.log('%cIndexPage onBeforeRouteLeave', consColRouter);
})

</script>

<style lang="postcss" scoped>
.intro-container {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--k2d);
  /*
  text-align: center;
  vertical-align: middle;
  */
  /* Change via JS */
  /* opacity: 0; */
}

.letter {
  display: inline-block;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  transform: translateZ(0px);
}

.word {
  position: absolute;
  display: inline-block;
  font-weight: 400;
  transform: translateZ(0px);
}

.word-big {
  font-size: 36px;
}

.word-middle {
  font-size: 24px;
}

.word-heavy {
  font-weight: 700 !important;
  letter-spacing: .05em;
}

.word-slick {
  font-weight: 100 !important;
  letter-spacing: .06em;
}

.word-addon {
  color: grey;
}

.word-brand {
  color: orange;
}

.word-firstname {
  text-align: right;
  top: 56vh;
  right: 52%;
  /*
  left: calc(52% + 5px);
  top: 56vh;
  */
}

.word-lastname {
  /* top: calc(56vh + 52px); */
  top: 56vh;
  left: calc(52% + 5px);
  text-align: left;
}

.word-prof {
  top: calc(56vh + 100px);
  left: calc(52% + 5px);
}

.word-prof01 {
  top: calc(56vh + 100px);
  right: 52%;
  text-align: right;
}

.word-prof02 {
  top: calc(56vh + 140px);
  left: calc(52% + 5px);
  text-align: left;
}

.word-prof03 {
  top: calc(56vh + 180px);
  left: calc(52% + 5px);
  text-align: left;
}

.keep-empty-space {
  white-space: pre;
}

.is-space-char {
  width: 0.55rem;
  white-space: pre;
}


.line {
  position: absolute;
  /*
  top: calc(56vh + 4px);
  //height: 44vh;
  //height: 0vh;
  */
  top: 100vh;
  bottom: 0;
  display: inline-block;
  width: 1px;
  margin: 0;
  background-color: rgba(222, 222, 222, .15);
}
</style>
