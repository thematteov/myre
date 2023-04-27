import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
gsap.core.globals('ScrollTrigger', ScrollTrigger)
gsap.registerPlugin(ScrollTrigger)

export default class Init {
  constructor() {
    this.splitLetter = document.getElementsByClassName('splitword')
    for (var b = 0; b < this.splitLetter.length; b++) {
      var letterWrap = this.splitLetter.item(b)
      letterWrap.innerHTML = letterWrap.textContent.replace(
        /\S/g,
        "<span class='splitletter'>$&</span>"
      )
    }

    this.splitLetterHidden = document.getElementsByClassName('splitwordhidden')
    for (var c = 0; c < this.splitLetterHidden.length; c++) {
      var letterWrapHidden = this.splitLetterHidden.item(c)
      letterWrapHidden.innerHTML = letterWrapHidden.textContent.replace(
        /\S/g,
        "<span class='splitLetterHidden'>$&</span>"
      )
    }
    // Split text end

    this.tl = new gsap.timeline()
    this.featuredProject = gsap.utils.toArray('.slide-in')
    this.horizontal = gsap.utils.toArray('.slide-in-hrz')
    this.archiveList = gsap.utils.toArray('.h-archive-line')
    // this.awardsimages = gsap.utils.toArray('.awardsimage')
    this.wrappers = document.querySelectorAll('.cta-anim')
    this.pageTransitionWrapper = document.querySelector('.pagetransition')

    this.tlHeroAbout = new gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '.about-title--gap',
        start: 'top bottom',
        end: 'bottom bottom',
        pin: '.about-title-line',
        pinSpacing: false,
        scrub: true,
      },
    })

    this.tlHero = new gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '.but-animation-gap',
        start: 'top bottom',
        end: 'top top',
        pin: '.uno',
        pinSpacing: false,
        scrub: true,
      },
    })
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load', // notice "resize" isn't in the list
    })
    ///functions
    this.preloader()
    this.featuredProjects()
    this.homeAnimation()
    this.horizontalAnimation()
    this.aboutAnimation()
    this.archiveAnimation()
    this.awards()
    this.menu()
  }

  preloader() {
    this.tl.set('.preloader-text-line', {
      perspective: 1000,
      scaleX: 2,
      rotationX: 80,
    })
    this.tl.set('.preloader-studio-line', {
      scaleX: 4,
      rotationX: 80,
    })
    ///preloader

    this.tl
      .fromTo(
        '.preloader-text-line',
        1.2,
        { y: '120%', scaleX: 2 },
        {
          y: 0,
          scaleX: 1,
          stagger: 0.05,
          ease: 'power3.inOut',
        }
      )
      .fromTo(
        '.preloader-text-line',
        1.2,
        { rotationX: 80 },
        {
          rotationX: 0,
          stagger: 0.06,
          ease: 'power3.inOut',
        },
        '>-95%'
      )
      .fromTo(
        '.preloader-studio-line',
        1.7,
        { y: '120%', scaleX: 4 },
        {
          y: 0,
          scaleX: 1,
          stagger: 0.05,
          ease: 'power3.inOut',
        },
        '>-45%'
      )
      .fromTo(
        '.preloader-studio-line',
        1.7,
        { rotationX: 80 },
        {
          rotationX: 0,
          stagger: 0.2,
          ease: 'power3.inOut',
        },
        '>-95%'
      )
      .to(
        '.studio-preloader',
        2.5,
        {
          x: '-100%',
          ease: 'power3.inOut',
        },
        '>-75%'
      )
      .to(
        '.studio-preloader',
        1,
        {
          scale: 30,
          transformOrigin: 'right',
          ease: 'power3.inOut',
        },
        '>-20%'
      )
      .to(
        '.preloader-end',
        1.2,
        {
          width: '100vw',
          transformOrigin: 'right',
          ease: 'power3.inOut',
        },
        '>-60%'
      )
      .to(
        '.preloader',
        0.5,
        {
          opacity: 0,
        },
        '>-10%'
      )
    ///preloader END
  }

  featuredProjects() {
    this.featuredProject.forEach((project) => {
      const p = gsap.utils.selector(project)
      let tl = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: project,
          markers: false,
          start: 'top+=40% bottom',
          onEnter: () => tl.play(),
          // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      })
      ScrollTrigger.create({
        trigger: project,
        end: 'bottom top',
        onEnterBack: () => tl.restart(),
        onLeaveBack: () => tl.pause(0),
      })

      // add animations and labels to the timeline
      tl.fromTo(
        p('.slide-in-el'),
        { y: '120%', rotationZ: 10 },
        {
          y: '0%',
          rotationZ: 0,
          ease: 'power3',
          duration: 1.3,
          transformOrigin: 'center left',
        }
      )
    })
  }

  horizontalAnimation() {
    this.horizontal.forEach((element) => {
      const horizontalElement = gsap.utils.selector(element)
      let tlHrz = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          markers: false,
          start: 'top+=40% bottom',
          onEnter: () => tlHrz.play(),
        },
      })
      ScrollTrigger.create({
        trigger: element,
        end: 'bottom top',
        onEnterBack: () => tlHrz.restart(),
        onLeaveBack: () => tlHrz.pause(0),
      })
      tlHrz.fromTo(
        horizontalElement('.el-x'),
        { x: '-140%' },
        {
          x: '0%',
          ease: 'power3',
          duration: 1.3,
          transformOrigin: 'center left',
        }
      )
    })
  }

  archiveAnimation() {
    this.archiveList.forEach((archivePrj) => {
      const p = gsap.utils.selector(archivePrj)
      let tlArchive = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: archivePrj,
          markers: false,
          start: 'top+=50% bottom',
          onEnter: () => tlArchive.play(),
          // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      })
      ScrollTrigger.create({
        markers: false,
        trigger: archivePrj,
        end: 'bottom top',
        onEnterBack: () => tlArchive.restart(),
        onLeaveBack: () => tlArchive.pause(0),
      })

      // add animations and labels to the timeline
      tlArchive.fromTo(
        p('.prj-blk'),
        { height: '0%' },
        {
          height: '100%',
          ease: 'power3',
          duration: 1.1,
          transformOrigin: 'center left',
        }
      )
    })

    this.wrappers.forEach((element) => {
      let tlwrapper = gsap.timeline({ paused: true })
      tlwrapper
        .fromTo(
          element.querySelectorAll('.splitletter'),
          0.4,
          { y: '0%', ease: 'power3' },
          { y: '-100%', ease: 'power3', stagger: 0.02 }
        )
        .fromTo(
          element.querySelectorAll('.splitLetterHidden'),
          0.3,
          { y: '120%', ease: 'power3' },
          { y: '0%', ease: 'power3', stagger: 0.02 },
          '>-90%'
        )
      $(element).hover(
        function () {
          tlwrapper.restart()
        },
        function () {
          tlwrapper.reverse()
        }
      )
    })
  }

  homeAnimation() {
    this.tlHero
      .to('.image--4', { height: '0%' })
      .to('.image--3', { height: '0%' })
      .to('.image--2', { height: '0%' })
    gsap.to('.uno', {
      ease: 'none',
      scrollTrigger: {
        markers: false,
        trigger: '.second--section',
        start: 'top bottom',
        end: 'top top',
        pin: '.uno',
        pinSpacing: false,
        scrub: true,
      },
    })
  }

  aboutAnimation() {
    /////about title
    this.tlHeroAbout.to('.about-title-letter', { marginLeft: '-0.125em' })
    gsap.to('.second2-section', {
      ease: 'none',
      scrollTrigger: {
        markers: false,
        trigger: '.second2-section',
        start: 'bottom bottom',
        end: 'bottom top',
        pin: '.second2-section',
        pinSpacing: false,
        scrub: true,
      },
    })
  }

  awards() {
    let tlawards = new gsap.timeline({ paused: true })
    tlawards.set('.awardsimage', { scaleY: 0, opacity: 1 })
    tlawards.fromTo(
      '.awardsimage',
      0.5,
      { scaleY: 0 },
      {
        overwrite: 'auto',
        scaleY: 1,
        transformOrigin: 'center bottom',
      }
    )
    let timer
    if (document.querySelector('.behind-section')) {
      document
        .querySelector('.behind-section')
        .addEventListener('mousemove', (e) => {
          ///////
          tlawards.play()
          gsap.to('.awardsimage', 0.5, {
            left: e.clientX,
            top: e.clientY,
            stagger: 0.05,
          })
          clearTimeout(timer)
          timer = setTimeout(() => {
            tlawards.reverse()
          }, 800)
        })
    }
  }

  menu() {
    let tlHover = new gsap.timeline({ paused: true })
    let tlOpen = new gsap.timeline({ paused: true, reversed: true })
    let tlOpenContent = new gsap.timeline({ paused: true, reversed: true })
    tlOpen.to('#menu--container', 2, {
      height: '100vh',
      ease: 'power4.inOut',
    })
    tlOpenContent
      .fromTo(
        '.menu--prj--type',
        1.2,
        { y: '200%' },
        {
          y: '0%',
          ease: 'power4.inOut',
          stagger: 0.1,
          delay: 1,
        }
      )
      .fromTo(
        '.newsletter',
        1.2,
        { y: '200%' },
        {
          y: '0%',
          ease: 'power4.inOut',
          stagger: 0.1,
        },
        '>-100%'
      )
    //menuHover tl
    tlHover.to('.menu--wrp', 1.2, {
      height: '3em',
      ease: 'power4.inOut',
    })
    tlHover.fromTo(
      '.menu--prj',
      0.5,
      { y: '100%' },
      {
        y: '0%',
        ease: 'power4.inOut',
      },
      '>-70%'
    )
    //menuopen tl

    document
      .querySelector('#menu--button')
      .addEventListener('mouseenter', () => {
        tlHover.play()
      })
    document
      .querySelector('#menu--button')
      .addEventListener('mouseleave', () => {
        tlHover.reverse()
      })
    document.querySelector('#menu--button').addEventListener('click', () => {
      tlOpen.reversed() ? tlOpen.play() : tlOpen.reverse()
      tlOpenContent.reversed() ? tlOpenContent.play() : tlOpenContent.reverse()
    })
  }
}
