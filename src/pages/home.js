import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import splits from "../general/textsplit";
import footerparallax from "../general/footer";
function initHome() {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  let benefits__trackwidth = document
    .querySelector(".benefits__flex")
    .getBoundingClientRect().width;

  function benefits() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".benefits__container",
        start: "center center",
        end: `center center-=${benefits__trackwidth + window.innerWidth * 0.5}`,
        scrub: true,
        pin: ".benefits__section",
        pinSpacing: true,
      },
      ease: "none",
    });
    tl.to(".body", { opacity: 1, duration: 0.1 });
    tl.to(".benefits__flex", {
      x: () => -(benefits__trackwidth - window.innerWidth * 0.5),
    });
    tl.to(".body", { opacity: 1, duration: 0.1 });
  }

  //////////PROJECTS//////////
  gsap.fromTo(
    ".case",
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.2,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".homearchiveprj",
        start: "top bottom-=10%",
        toggleActions: "play none none reverse",
      },
    }
  );
  gsap.to(".hero__images", {
    y: "20vh",
    ease: "none",
    scrollTrigger: {
      trigger: ".herosection",
      start: "top top",
      end: "bottom top-=20%",
      scrub: true,
    },
  });

  function availability() {
    document.querySelectorAll(".availability").forEach((el) => {
      gsap.to(el.querySelector(".availability__scale"), {
        scale: 2.5,
        duration: 2,
        opacity: 0,
        delay: 0.3,
        repeat: -1,
        ease: "power3.inOut",
      });
    });
  }
  function process() {
    ScrollTrigger.create({
      trigger: ".process__steps__right",
      pin: ".benefits__title",
      start: "top top+=5%",
      end: "bottom center",
      pinSpacing: false,
    });
  }
  function maintentancePlans() {
    let button = document.querySelectorAll(".switchpackage");
    let prices = document.querySelectorAll(".maintenance__price");
    button.forEach((b, i) => {
      let open = false;
      b.addEventListener("click", () => {
        if (open === false) {
          open = true;
          gsap.to(prices[i], {
            duration: 0.5,
            ease: "power3.inOut",
            yPercent: -100,
          });
          gsap.to(b.querySelector(".switchcube"), {
            left: "100%",
            xPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
          });
        } else if (open === true) {
          open = false;
          gsap.to(prices[i], {
            duration: 0.5,
            ease: "power3.inOut",
            yPercent: 100,
          });
          gsap.to(b.querySelector(".switchcube"), {
            left: "0%",
            xPercent: 0,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }
      });
    });
  }
  if (isMobile()) {
  } else {
    benefits();
    process();
    maintentancePlans();
  }
  availability();
  splits();
  footerparallax();
  gsap.fromTo(
    ".available__seat",
    {
      yPercent: -100,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".mpiko__available__seats",
        start: "top bottom",
        end: "top top-=50%",
        scrub: true,
      },
    }
  );
  gsap.from(".available__seat", {
    rotateZ: 0,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".mpiko__available__seats",
      start: "top bottom",
      end: "top top-=50%",
      scrub: true,
    },
  });
  gsap.from(".seats__number", {
    xPercent: -90,
    duration: 4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".mpiko__available__seats",
      start: "top bottom",
      toggleActions: "play reverse play reverse",
    },
  });
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
