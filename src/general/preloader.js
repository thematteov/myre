import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import SplitType from "split-type";
function preloader() {
  let intro = document.querySelector(".intro");
  new SplitType(".intro");
  var imgLoad = imagesLoaded("img");
  imgLoad.on("progress", function () {
    loadProgress();
  });
  let images = document.querySelectorAll("img").length,
    loadedCount = 0,
    loadingProgress = 0,
    tlProgress = gsap.timeline({
      paused: true,
    });

  function loadProgress() {
    let tlanimations = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          loadComplete();
        }, 500);
      },
    }); 
    tlanimations.to(".preloader__changing", 0.4, {
      yPercent: -102,
      ease: "power2.inOut",
      delay: 1,
    });
    tlanimations.to(".preloader__changing", 0.4, {
      yPercent: -198,
      ease: "power2.inOut",
      delay: 0.2,
    });
    gsap.to(tlProgress, 1, {
      progress: loadingProgress,
      ease: "Power3.easeInOut",
    });
  }
  loadedCount++;

  loadingProgress = loadedCount / images;
  document.querySelector(".p__preloader").textContent =
    Math.round(loadingProgress * 1000) + "%";

  function loadComplete() {
    var tlEnd = gsap.timeline();
    tlEnd.to(".preloader", 1.1, {
      yPercent: -100,
      ease: "power2.inOut",
      onComplete: function () {
        sessionStorage.setItem("animationPlayed", "true");
      },
    });
    if (intro) {
      tlEnd.fromTo(
        intro.querySelectorAll(".word"),
        1.2,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "Power3.easeOut",
          stagger: {
            amount: 0.8,
            from: "center",
          },
          delay: -0.5,
        }
      );
    }
  }
}
export default preloader;
