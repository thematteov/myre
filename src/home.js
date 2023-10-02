import Lenis from "@studio-freight/lenis";
import "./styles/style.css";
import { ScrollTrigger} from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initHome() {
  let g = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    y = window.innerWidth <= 980,
    h = window.matchMedia("(max-width: 768px)");
  if (!g || !y || !h.matches) {
  }

  ///////NAV LOGO SCRUB
  let logoTl = gsap.timeline({});
  logoTl.fromTo(
    ".logo__svg",
    1.2,
    { scale: 1 },
    {
      scale: 0.8,
      transformOrigin: "100 50",
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".logo__svg",
        start: "top top",
        pin: true,
        scrub: true,
      },
    }
  );

  const services = gsap.utils.toArray(".service");

  services.forEach((service, index) => {
    const tween = gsap.to(service, {
      scrollTrigger: {
        trigger: service,
        start: () => `top bottom-=100`,
        end: () => `bottom bottom`,
        scrub: true,
        markers: false,

      },
      ease: "none",
      opacity: () => 1 - (services.length - index) * 0.025
    });

    ScrollTrigger.create({
      trigger: service,
      start: "bottom bottom",
      pin: true,
      pinSpacing: false,
      markers: false,
      id: "pin",
      endTrigger: services.length,
      end: "max",
    });
});
ScrollTrigger.create({
  trigger: ".why__us__section",
  start: "bottom bottom",
  pin: true,
  pinSpacing: false,
  markers: false,
});
ScrollTrigger.create({
  trigger: ".services__left__inner",
  start: "top top",
  pin: true,
  pinSpacing: false,
  markers: false,
});
  ///////SPLITTEXT
  const text = new SplitType(".split");
  text.lines;

  let lines = document.querySelectorAll(".split");

  lines.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=10%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      value.querySelectorAll(".line"),
      0.8,
      { y: "50%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.1,
      }
    );
  });


  //////LINKS////

  let links = gsap.utils.toArray("a")

  links.forEach(link=>{
    link.addEventListener("mouseenter", ()=>{
        gsap.to(link.querySelector(".cta__block"), 0.5, {x: "100%", ease: "Power2.easeOut",})
    })
    link.addEventListener("mouseleave", ()=>{
        gsap.to(link.querySelector(".cta__block"), 0.5, {x: "0%", ease: "Power2.easeOut",})
    })
  })
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
