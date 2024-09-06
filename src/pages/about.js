import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import splits from "../general/textsplit";

gsap.registerPlugin(ScrollTrigger);

function initabout() {
  splits();
}
export default initabout;
