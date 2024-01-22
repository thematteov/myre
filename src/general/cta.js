import gsap from "gsap";
import Lottie from "lottie-web";
function cta() {
  function cursor() {
    let cursor = document.querySelector(".cursor");
    let cursorball = document.querySelector(".cursor__ball");
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
      gsap.to(cursorball, 0.5, { scale: 0, ease: "Power2.easeOut" });
    }

    // Function to stop the animation on mouseout
    function stopAnimation() {
      animationConfig.setDirection(-1);
      if (animationConfig.currentFrame === animationConfig.totalFrames - 1) {
        animationConfig.goToAndStop(animationConfig.totalFrames, true);
      } else {
        animationConfig.goToAndPlay(30, true);
      }
      gsap.to(cursorball, 0.5, { scale: 1, ease: "Power2.easeOut" });
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
      gsap.to(cursorball, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
    });
  }
  function startAProject() {
    if (window.matchMedia("(max-width: 768px)").matches) {
    } else {
      //////percentage
      //////page progresssion

      let progressBar = document.querySelector(".percentage__number");

      function updateProgressBar() {
        let windowHeight = window.innerHeight;
        let pageHeight = document.documentElement.scrollHeight - windowHeight;
        let scrollPosition = window.scrollY;
        let scrollProgress = (scrollPosition / pageHeight) * 100;
        progressBar.textContent = `Your are here: ${scrollProgress.toFixed(
          2
        )}%`;
      }

      updateProgressBar();

      window.addEventListener("scroll", updateProgressBar);
      window.addEventListener("resize", updateProgressBar);
      /////lottie CURSOR
    }
  }
  startAProject();
  cursor();
}
export default cta;
