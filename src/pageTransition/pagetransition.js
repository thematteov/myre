import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
gsap.core.globals("ScrollTrigger", ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

export default class Init {
  constructor() {
    var tricksWord = document.getElementsByClassName("split");
    for (var i = 0; i < tricksWord.length; i++) {
      var wordWrap = tricksWord.item(i);
      wordWrap.innerHTML = wordWrap.innerHTML.replace(
        /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
        '$1<span class="split-word">$2</span>'
      );
    }

    this.splitLetter = document.getElementsByClassName("splitword");
    for (var b = 0; b < this.splitLetter.length; b++) {
      var letterWrap = this.splitLetter.item(b);
      letterWrap.innerHTML = letterWrap.textContent.replace(
        /\S/g,
        "<span class='splitletter'>$&</span>"
      );
    }

    this.splitLetterHidden = document.getElementsByClassName("splitwordhidden");
    for (var c = 0; c < this.splitLetterHidden.length; c++) {
      var letterWrapHidden = this.splitLetterHidden.item(c);
      letterWrapHidden.innerHTML = letterWrapHidden.textContent.replace(
        /\S/g,
        "<span class='splitLetterHidden'>$&</span>"
      );
    }
    // Split text end

    this.tl = new gsap.timeline();
    this.featuredProject = gsap.utils.toArray(".slide-in");
    this.horizontal = gsap.utils.toArray(".slide-in-hrz");
    this.archiveList = gsap.utils.toArray(".h-archive-line");
    // this.awardsimages = gsap.utils.toArray('.awardsimage')
    this.wrappers = document.querySelectorAll(".cta-anim");
    this.pageTransitionWrapper = document.querySelector(".pagetransition");

    this.tlHeroAbout = new gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: ".about-title--gap",
        start: "top bottom",
        end: "bottom bottom",
        pin: ".about-title-line",
        pinSpacing: false,
        scrub: true,
      },
    });

    this.tlHero = new gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: ".but-animation-gap",
        start: "top bottom",
        end: "top top",
        pin: ".uno",
        pinSpacing: false,
        scrub: true,
      },
    });
    ///functions
    this.preloader();
    this.featuredProjects();
    this.homeAnimation();
    this.horizontalAnimation();
    this.aboutAnimation();
    this.archiveAnimation();
    this.awards();
    this.menu();
    this.mockups();
  }

  preloader() {
    //////////////
    this.tl
      .fromTo(
        ".year--first-two",
        2,
        { y: "120%" },
        { y: "0%", ease: "power4.out", delay: 1.6 },
        ">-70%"
      )
      .fromTo(
        ".year-first",
        2.6,
        { y: "120%" },
        { y: "-120%", ease: "power4.out", delay: 0.5 },
        ">-100%"
      )
      .fromTo(
        ".year-first-last",
        2,
        { y: "120%" },
        { y: "0%", ease: "power4.out", stagger: 0.4, delay: 0.5 },
        ">-100%"
      )
      .fromTo(
        ".year-second",
        2.3,
        { y: "120%" },
        { y: "-120%", ease: "power4.out", stagger: 0.4 },
        ">-100%"
      )
      .fromTo(
        ".year-second-last",
        2,
        { y: "120%" },
        { y: "0%", ease: "power4.out", stagger: 0.5, delay: -2 }
      )
      .fromTo(
        ".split-word",
        1.2,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.02,
        },
        ">-40%"
      )
      .fromTo(
        ".split-word",
        1.2,
        {
          scaleX: 2,
          x: "0.3em",
        },
        {
          scaleX: 1,
          x: "0em",
          ease: "power4.out",
          stagger: 0.02,
        },
        ">-100%"
      )
      .fromTo(
        ".split-word",
        1.2,
        {
          scaleX: 2,
          x: "0.3em",
        },
        {
          scaleX: 1,
          x: "0em",
          ease: "power4.out",
          stagger: 0.02,
        },
        ">-100%"
      )
      .fromTo(
        ".homeimageswrapper",
        2,
        { y: "120%", scale: 1.2 },
        { y: "0%", ease: "power4.out", scale: 1, stagger: 0.1 },
        ">-70%"
      )
      .fromTo(
        ".nav",
        1.2,
        { y: "-120%" },
        { y: "0%", ease: "power4.out" },
        ">-50%"
      );
    ///preloader END
  }

  featuredProjects() {
    this.featuredProject.forEach((project) => {
      const p = gsap.utils.selector(project);
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          markers: false,
          start: "top+=40% bottom",
          onEnter: () => tl.play(),
        },
      });
      ScrollTrigger.create({
        trigger: project,
        end: "bottom top",
        onEnterBack: () => tl.restart(),
        onLeaveBack: () => tl.pause(0),
      });

      // add animations and labels to the timeline
      tl.fromTo(
        p(".slide-in-el"),
        { y: "120%", rotationZ: 10 },
        {
          y: "0%",
          rotationZ: 0,
          ease: "power3",
          duration: 1.3,
          transformOrigin: "center left",
        }
      );
    });
  }

  horizontalAnimation() {
    this.horizontal.forEach((element) => {
      const horizontalElement = gsap.utils.selector(element);
      let tlHrz = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          markers: false,
          start: "top+=40% bottom",
          onEnter: () => tlHrz.play(),
        },
      });
      ScrollTrigger.create({
        trigger: element,
        end: "bottom top",
        onEnterBack: () => tlHrz.restart(),
        onLeaveBack: () => tlHrz.pause(0),
      });
      tlHrz.fromTo(
        horizontalElement(".el-x"),
        { x: "-140%" },
        {
          x: "0%",
          ease: "power3",
          duration: 1.3,
          transformOrigin: "center left",
        }
      );
    });
  }

  archiveAnimation() {
    this.archiveList.forEach((archivePrj) => {
      const p = gsap.utils.selector(archivePrj);
      let tlArchive = gsap.timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: archivePrj,
          markers: false,
          start: "top+=50% bottom",
          onEnter: () => tlArchive.play(),
          // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      });
      ScrollTrigger.create({
        markers: false,
        trigger: archivePrj,
        end: "bottom top",
        onEnterBack: () => tlArchive.restart(),
        onLeaveBack: () => tlArchive.pause(0),
      });

      // add animations and labels to the timeline
      tlArchive.fromTo(
        p(".prj-blk"),
        { height: "0%" },
        {
          height: "100%",
          ease: "power3",
          duration: 1.1,
          transformOrigin: "center left",
        }
      );
    });

    this.wrappers.forEach((element) => {
      let tlwrapper = gsap.timeline({ paused: true });
      tlwrapper
        .fromTo(
          element.querySelectorAll(".splitletter"),
          0.4,
          { y: "0%", ease: "power3" },
          { y: "-100%", ease: "power3", stagger: 0.02 }
        )
        .fromTo(
          element.querySelectorAll(".splitLetterHidden"),
          0.3,
          { y: "120%", ease: "power3" },
          { y: "0%", ease: "power3", stagger: 0.02 },
          ">-90%"
        );
      $(element).hover(
        function () {
          tlwrapper.restart();
        },
        function () {
          tlwrapper.reverse();
        }
      );
    });
  }

  homeAnimation() {
    this.tlHero
      .fromTo(".image--4", { height: "100%" }, { height: "0%" })
      .fromTo(".image--3", { height: "100%" }, { height: "0%" })
      .fromTo(".image--2", { height: "100%" }, { height: "0%" });
    gsap.to(".uno", {
      ease: "none",
      scrollTrigger: {
        markers: false,
        trigger: ".second--section",
        start: "top bottom",
        end: "top top",
        pin: ".uno",
        pinSpacing: false,
        scrub: true,
      },
    });
  }

  aboutAnimation() {
    /////about title
    this.tlHeroAbout.to(".about-title-letter", { marginLeft: "-0.125em" });
    gsap.to(".second2-section", {
      ease: "none",
      scrollTrigger: {
        markers: false,
        trigger: ".second2-section",
        start: "bottom bottom",
        end: "bottom top",
        pin: ".second2-section",
        pinSpacing: false,
        scrub: true,
      },
    });
  }

  awards() {
    let tlawards = new gsap.timeline({ paused: true });
    tlawards.set(".awardsimage", { scaleY: 0, opacity: 1 });
    tlawards.fromTo(
      ".awardsimage",
      0.5,
      { scaleY: 0 },
      {
        overwrite: "auto",
        scaleY: 1,
        transformOrigin: "center bottom",
      }
    );
    let timer;
    if (document.querySelector(".behind-section")) {
      document
        .querySelector(".behind-section")
        .addEventListener("mousemove", (e) => {
          ///////
          tlawards.play();
          gsap.to(".awardsimage", 0.5, {
            left: e.clientX,
            top: e.clientY,
            stagger: 0.05,
          });
          clearTimeout(timer);
          timer = setTimeout(() => {
            tlawards.reverse();
          }, 800);
        });
    }
  }

  menu() {
    let tlHover = new gsap.timeline({ paused: true });
    let tlOpen = new gsap.timeline({ paused: true, reversed: true });
    tlOpen.set("#menu--container", {
      height: "0%",
    });
    let tlOpenContent = new gsap.timeline({ paused: true, reversed: true });
    tlOpen.to("#menu--container", 2, {
      height: "100%",
      ease: "power4.inOut",
    });
    tlOpenContent
      .fromTo(
        ".menu--prj--type",
        1.2,
        { y: "200%" },
        {
          y: "0%",
          ease: "power4.inOut",
          stagger: 0.1,
          delay: 1,
        }
      )
      .fromTo(
        ".newsletter",
        1.2,
        { y: "200%" },
        {
          y: "0%",
          ease: "power4.inOut",
          stagger: 0.1,
        },
        ">-100%"
      );
    //menuHover tl
    tlHover.to(".menu--wrp", 1.2, {
      height: "3em",
      ease: "power4.inOut",
    });
    tlHover.fromTo(
      ".menu--prj",
      0.5,
      { y: "100%" },
      {
        y: "0%",
        ease: "power4.inOut",
      },
      ">-70%"
    );
    //menuopen tl

    document.querySelectorAll("#menu--button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        tlHover.play();
      });
    });
    document.querySelectorAll("#menu--button").forEach((el) => {
      el.addEventListener("mouseleave", () => {
        tlHover.reverse();
      });
    });
    document.querySelector(".menu--button").addEventListener("click", () => {
      tlOpen.reversed() ? tlOpen.play() : tlOpen.reverse();
      console.log("ciao");
      tlOpenContent.reversed() ? tlOpenContent.play() : tlOpenContent.reverse();
    });
  }
  mockups() {
    let tlmockup = new gsap.timeline({ paused: true });
    tlmockup.fromTo(
      ".mockupsbackground",
      1.6,
      { height: "0%" },
      {
        height: "100%",
        transformOrigin: "center bottom",
        ease: "power4.inOut",
        stagger: 0.1,
      }
    );
    document.querySelectorAll(".mockupline").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        tlmockup.play();
      });
    });
    document.querySelectorAll(".mockupline").forEach((el) => {
      el.addEventListener("mouseleave", () => {
        tlmockup.reverse();
      });
    });
    // mockupsbackground
  }
}
