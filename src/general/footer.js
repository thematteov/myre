import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
function footerparallax() {
  gsap.fromTo(
    ".footer",
    {
      yPercent: -30,
      filter: "brightness(60%)",
    },
    {
      yPercent: 0,
      filter: "brightness(100%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".page__wrapper",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
export default footerparallax;
