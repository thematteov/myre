import gsap from "gsap";
import Lottie from "lottie-web";

function cta() {
  function cursor() {
    Lottie.destroy();
    let cursor = document.querySelector(".cursor");
    // Define the Lottie animation configuration
    let animationConfig = Lottie.loadAnimation({
      container: cursor, // the dom element that will contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://uploads-ssl.webflow.com/62eab1c2a6c3912f62c3d66c/653c6b59c0189b84bffc0edf_Animation%20-%201698458415832.json", // the path to the animation json
    });

    // Function to play the animation on hover
    function playAnimation() {
      animationConfig.setDirection(1);
      animationConfig.goToAndPlay(0, true);
    }

    // Function to stop the animation on mouseout
    function stopAnimation() {
      animationConfig.setDirection(-1);
    }

    // Attach event listeners to the link
    const link = document.querySelectorAll("a");
    link.forEach((a) => {
      a.addEventListener("mouseover", playAnimation);
      a.addEventListener("mouseout", stopAnimation);
    });

    window.addEventListener("mousemove", (e) => {
      let X = e.clientX;
      let Y = e.clientY;
      gsap.to(cursor, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
    });
  }
  function microinteractions() {
    let links = document.querySelectorAll(".a");
    let width = document
      .querySelector(".ctaindicatorblack")
      .getBoundingClientRect().width;
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.fromTo(
          link.querySelector(".ctaindicatororange"),
          0.5,
          { yPercent: -100 },
          {
            yPercent: 100,
            ease: "power3.out",
          }
        );
        gsap.to(link.querySelector(".ctaindicatorblack"), 0.5, {
          width: "3em",
          ease: "power3.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link.querySelector(".ctaindicatororange"), 0.5, {
          yPercent: 200,
          ease: "power3.out",
        });
        gsap.to(link.querySelector(".ctaindicatorblack"), 0.5, {
          width: width,
          ease: "power3.out",
        });
      });
    });
  }
  function casestudy_open() {
    const covers = document.querySelectorAll(".case");

    covers.forEach((cover) => {
      cover.addEventListener("mouseenter", () => {
        gsap.to(cover.querySelector(".videoembed"), 0.5, {
          scale: 0.98,
          ease: "power2.out",
        });
      });
      cover.addEventListener("mouseleave", () => {
        gsap.to(cover.querySelector(".videoembed"), 0.5, {
          scale: 1,
          ease: "power2.out",
        });
      });
    });
  }
  function btn() {
    const link = document.querySelectorAll(".btn");
    link.forEach((a) => {
      const linkwidth = a.getBoundingClientRect().width;
      a.addEventListener("mouseover", () => {
        gsap.to(a, {
          duration: 0.5,
          ease: "power2.inOut",
          width: linkwidth + 50,
        });
        gsap.to(a.querySelector(".btn__orange"), {
          duration: 0.5,
          ease: "power2.inOut",
          yPercent: -100,
        });
      });
      a.addEventListener("mouseout", () => {
        gsap.to(a, {
          duration: 0.5,
          ease: "power2.inOut",
          width: "auto",
        });
        gsap.to(a.querySelector(".btn__orange"), {
          duration: 0.5,
          ease: "power2.inOut",
          yPercent: 0,
        });
      });
    });
  }
  btn();
  casestudy_open();
  microinteractions();
  cursor();
}
export default cta;
