import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import SplitType from "split-type";
function preloader() {
  //////preloader progression animation
  var imgLoad = imagesLoaded("img");

  var progressBar = $(".preloader__progress"),
    images = document.querySelectorAll("img").length,
    loadedCount = 0,
    loadingProgress = 0,
    tlProgress = gsap.timeline();

  imgLoad.on("progress", function () {
    loadProgress();
  });

  function loadProgress() {
    loadedCount++;

    loadingProgress = loadedCount / images;
    document.querySelector(".p__preloader").textContent =
      Math.round(loadingProgress * 100) + "%";

    gsap.to(tlProgress, 1, {
      progress: loadingProgress,
      ease: "Power3.easeInOut",
    });
  }

  var tlProgress = gsap.timeline({
    paused: true,
    onComplete: () => {
      loadComplete();
    },
  });

  tlProgress.to(progressBar, 1, { width: "100%" });
  new SplitType(".intro");
  let intro = document.querySelector(".intro");
  function loadComplete() {
    var tlEnd = gsap.timeline();
    tlEnd
      .to(".preloader", 1.1, {
        yPercent: -100,
        ease: 'power2.inOut',
        onComplete: function () {
          sessionStorage.setItem("animationPlayed", "true");
        },
      })
      .fromTo(
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
          delay: -0.5
        }
      );
  }
}
export default preloader;
