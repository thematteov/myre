import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/all'
// import $ from 'jquery'

import Sketch from './3d/threeEffect'
import Init from './pageTransition/pagetransition'

import './styles/style.css'

if (document.querySelector('#container'))
  new Sketch({
    dom: document.getElementById('container'),
  })

new Init()

setTimeout(() => {
  const lenis = new Lenis({
    duration: 2,
  })
  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })
  window.addEventListener('resize', () => {
    ScrollTrigger.update()
  })
}, 500);

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
