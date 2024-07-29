import gsap from "gsap";
import Lottie from "lottie-web";
import SplitType from "split-type";
function cta() {
  function cursor() {
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
          width: "2em",
          ease: "power3.out",
        });
      });
    });
  }
  function casestudy_open() {
    const covers = document.querySelectorAll(".case");

    covers.forEach((cover) => {});
  }
  function menu() {
    let menu = document.querySelector(".menubutton");
    let close = document.querySelector(".closebutton");
    let open = false;

    menu.addEventListener("click", () => {
      if (open === false) {
        open = true;
        gsap.set(".menuwrapper", {
          display: "block",
        });
        gsap.fromTo(
          ".closebutton",
          0.6,
          {
            yPercent: -100,
            ease: "power2.inOut",
          },
          {
            yPercent: 0,
            ease: "power2.inOut",
          }
        );
        gsap.fromTo(
          ".menulinkscontainer",
          0.6,
          {
            xPercent: -100,
            ease: "power2.inOut",
          },
          {
            xPercent: 0,
            ease: "power2.inOut",
          }
        );

        gsap.fromTo(
          ".menu__link",
          0.6,
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            stagger: 0.1,
            delay: 0.25,
            ease: "power2.out",
          }
        );
      } else {
        open = false;
        gsap.to(".closebutton", 0.6, {
          xPercent: 100,
          ease: "power2.inOut",
        });
        gsap.to(".menulinkscontainer", 0.6, {
          yPercent: 100,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(".menuwrapper", {
              display: "none",
            });
            gsap.set(".closebutton", {
              xPercent: 0,
            });
            gsap.set(".menulinkscontainer", {
              yPercent: 0,
            });
          },
        });
        gsap.to(".menu__link", 0.5, {
          yPercent: 100,
          ease: "power2.out",
        });
      }
    });

    close.addEventListener("click", () => {
      gsap.to(".closebutton", 0.6, {
        xPercent: 100,
        ease: "power2.inOut",
      });
      gsap.to(".menulinkscontainer", 0.6, {
        yPercent: 100,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(".menuwrapper", {
            display: "none",
          });
          gsap.set(".closebutton", {
            xPercent: 0,
          });
          gsap.set(".menulinkscontainer", {
            yPercent: 0,
          });
        },
      });
      gsap.to(".menu__link", 0.5, {
        yPercent: 100,
        ease: "power2.out",
      });
      open = false
    });
  }

  menu();
  casestudy_open();
  microinteractions();
  cursor();
}
export default cta;
