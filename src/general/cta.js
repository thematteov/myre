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
      gsap.to(cursor, 0.5, { x: X, y: Y, ease: "Power3.easeOut" });
    });
  }
  function microinteractions() {
    let links = document.querySelectorAll(".a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link.querySelector(".ctaindicatororange"), {
          scaleX: 1.5,
          duration: 0.2,
          ease: "power1.out",
        });
        gsap.to(link.querySelector(".ctaindicatororange"), {
          left: "100%",
          xPercent: -100,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(link.querySelector(".ctaindicatororange"), {
          scaleX: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power1.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link.querySelector(".ctaindicatororange"), {
          scaleX: 1.5,
          duration: 0.2,
          ease: "power1.out",
        });
        gsap.to(link.querySelector(".ctaindicatororange"), {
          left: "0%",
          xPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(link.querySelector(".ctaindicatororange"), {
          scaleX: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power1.out",
        });
      });
    });
  }
  function casestudy_open() {
    const covers = document.querySelectorAll(".case");

    covers.forEach((cover, i) => {
      cover.addEventListener("mouseenter", () => {
        gsap.to(cover.querySelector(".videoembed"), 0.5, {
          opacity: 1,
          ease: "power3.out",
        });
      });
      cover.addEventListener("mouseleave", () => {
        gsap.to(cover.querySelector(".videoembed"), 0.5, {
          opacity: 0,
          ease: "power3.out",
        });
      });
    });
  }
  function btn() {
    const buttons = document.querySelectorAll(".btninsteraction");

    buttons.forEach((btn) => {
      const text = btn.querySelector(".p"); // Select the <p> element inside the button
      let initialPosition = { x: 0, y: 0 };

      // Store the initial position of the text
      initialPosition.x = text.offsetLeft;
      initialPosition.y = text.offsetTop;
      btn.addEventListener("mouseover", () => {
        gsap.to(btn.querySelector(".btnblack"), {
          duration: 0.5,
          ease: "power3.inOut",
          filter: "blur(10px)",
        });
      });
      // When hovering over the button
      btn.addEventListener("mousemove", (e) => {
        // Calculate the position of the mouse relative to the button
        const rect = btn.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Move the text towards the mouse using GSAP
        gsap.to(text, {
          x: (mouseX - initialPosition.x)*0.05,
          y: (mouseY - initialPosition.y)*0.2,
          duration: 0.2,
          ease: "power3.out",
        });
      });

      // When the mouse leaves the button
      btn.addEventListener("mouseout", () => {
        // Move the text back to its original position
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });

        // Reset any other effects (like the borderRadius and blur)
        gsap.to(btn.querySelector(".btnblack"), {
          duration: 0.5,
          ease: "power3.inOut",
          filter: "blur(0px)",
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
