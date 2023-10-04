import { gsap } from "gsap/src";

function initTransition(){
    let tl = gsap.timeline({});
    tl.set(".page__transition", {height: "0vh", width: "100vw"})
    tl.set(".icon__black", {y: "-100vh"})

    tl.to(".page__transition", 1.2, {height: "100vh", width: "100vw", ease: "Power3.easeOut"})
    tl.to(".icon__black", 1.5, {y: "45vh", rotateZ: 90, ease: "Bounce.easeOut", delay: -1})
    tl.to(".page__transition", 1.2, {height: "100vh", width: "0vw", ease: "Power3.easeOut"})
}

export default initTransition;