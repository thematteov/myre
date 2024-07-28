import { gsap } from "gsap/src";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function inteirorarchive(){
    let prj = document.querySelectorAll('.ai')

    prj.forEach(image=>{
        gsap.to(image, {
            scale: 0,
            transformOrigin: 'top center',
            scrollTrigger: {
                trigger: image,
                scrub: true,
                start: 'top top',
                pin: true,
                pinSpacing: false
            }
        })
    })
}

export default inteirorarchive