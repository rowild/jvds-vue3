<template>
  <q-page padding class="flex flex-center column window-height">
    <div class="intro-container">
      <div class="word word-firstname word-big word-heavy word-brand word-slick" data-sub-set-name="wordFirstName"
        data-sub-set-chars-class="firstname" data-custom-order="1">John</div>

      <div class="word word-prof-01 word-middle word-slick word-addon" data-sub-set-name="wordProf01"
        data-sub-set-chars-class="prof01" data-custom-order="3">Composer</div>

      <div class="line" data-sub-set-name="_exclude_" />

      <div class="letters-group">
        <div class="word word-lastname word-big word-heavy word-brand" data-sub-set-name="wordLastName"
          data-sub-set-chars-class="lastname" data-custom-order="2">Van der Slice</div>

        <div class="word word-prof-02 word-middle word-slick word-addon" data-sub-set-name="wordProf02"
          data-sub-set-chars-class="prof02" data-custom-order="4">Theorist</div>

        <div class="word word-prof-03 word-middle word-slick word-addon" data-sub-set-name="wordProf03"
          data-sub-set-chars-class="prof03" data-custom-order="5">Teacher</div>
      </div>

      <router-link to="/main" class="btn btn-bright btn-medium btn-ui-show" data-sub-set-name="_exclude_">
        Enter
      </router-link>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import gsap from 'gsap'
import CharWrapper from 'src/scripts/CharWrapper.js'
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

const tl = gsap.timeline({
  paused: true,
  onComplete: () => { console.log('TL onComplete invoked')},
})

// --- HELPER

const consColRouter = 'color: darkslateblue; font-size: 14px; font-weight: bold;'
// const consColCycle = 'color: darkslateblue; font-size: 14px; font-weight: bold;'
const consCol = 'color: darkslateblue; font-weight: 700; font-size: 14px;'

onMounted(() => {
  console.log('%cINDEX_PAGE: onMounted invoked', consCol)

  wrapCharsOfIntroText()

  tl.set('.letter', { opacity: 0 })
  tl.set('.line', { opacity: 0, scaleY: 0 })
  tl.set('.intro-container', { autoAlpha: 1 })
  tl.to('.firstname', { autoAlpha: 1, duration: 0.5, stagger: 0.035 }, 0)
  tl.to('.lastname', { autoAlpha: 1, duration: 0.625, stagger: 0.035 }, 0)
  tl.to('.prof01', { autoAlpha: 1, duration: 0.75, stagger: 0.035 }, 0.5)
  tl.to('.prof02', { autoAlpha: 1, duration: 0.875, stagger: 0.035 }, 0.675)
  tl.to('.prof03', { autoAlpha: 1, duration: 1, stagger: 0.035 }, 0.825)
  tl.to('.line', { opacity: .7, scaleY: 1, duration: 1.25 }, 0.25)
  tl.to('.btn-ui-show', { autoAlpha: 1, duration: 0.5 }, '>-.5')
  tl.timeScale(1)
  tl.play()

  console.log('tl.time() =', tl.time());
  console.log('tl.endTime() =', tl.endTime());
  console.log('tl.totalDuration() =', tl.totalDuration());
})

onBeforeRouteUpdate((to, from) => {
  // called when the route that renders this component has changed, but this
  // component is reused in the new route.
  // For example, given a route with params `/users/:id`, when we
  // navigate between `/users/1` and `/users/2`, the same `UserDetails` component
  // instance will be reused, and this hook will be called when that happens.
  // Because the component is mounted while this happens, the navigation guard
  // has access to `this` component instance.

  console.log('%cINDEX_PAGE: onBeforeRouteUpdate', consColRouter);
})

onBeforeRouteLeave((to, from, next) => {
  console.log('%cINDEX_PAGE: onBeforeRouteLeave invoked with a GSAP animation', consColRouter);
  // called when the route that renders this component is about to
  // be navigated away from.
  // As with `beforeRouteUpdate`, it has access to `this` component instance.

  // tl.to('.btn-ui-show', { autoAlpha: 0, duration: 0.0001, onReverseComplete: () => next() }, 3)
  tl.pause()
  tl.reversed()
  tl.eventCallback('onReverseComplete', () => {
    console.log('reverse complete')
    next()
  })
  tl.timeScale(2).reverse(0)

  // const tl = gsap.timeline({
  //   paused: true,
  //   onComplete: () => { console.log('TL onComplete invoked'); next() },
  // })

  // tl.to('.btn-ui-show', { autoAlpha: 0, duration: 0.5 })
  // tl.to('.line', { opacity: 0, scaleY: 0, duration: 1.25 }, 0)
  // tl.to('.prof03', { autoAlpha: 0, duration: 1, stagger: 0.035 }, 0.25)
  // tl.to('.prof02', { autoAlpha: 0, duration: 0.875, stagger: 0.035 }, 0.75)
  // tl.to('.prof01', { autoAlpha: 0, duration: 0.75, stagger: 0.035 }, 0.75)
  // tl.to('.lastname', { autoAlpha: 0, duration: 0.625, stagger: 0.035 }, 0.825)
  // tl.to('.firstname', { autoAlpha: 0, duration: 0.5, stagger: 0.035 }, 0.825)
  // tl.timeScale(2)
  // tl.play()
})

</script>

<style lang="postcss" scoped>
.intro-container {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--k2d);
}

.line {
  position: absolute;
  top: calc(56vh + 114px);
  bottom: 0;
  display: inline-block;
  width: 1px;
  background-color: rgba(222, 222, 222, .15);
  transform-origin: center bottom;
}

/* Change via JS */
.intro-container,
.btn-ui-show,
.letter {
  opacity: 0;
}
</style>
