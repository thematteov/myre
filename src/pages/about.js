import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import splits from "../general/textsplit";
import footerparallax from "../general/footer";

gsap.registerPlugin(ScrollTrigger);

function initabout() {
  splits();
  footerparallax()
}
export default initabout;
