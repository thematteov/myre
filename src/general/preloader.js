import gsap from "gsap";
import imagesLoaded from "imagesloaded";
function preloader() {
  gsap.to(".page__transition", {
    width: "0vw",
    left: "100vw",
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => gsap.set(".page__transition", { display: "none" }),
  });
  window.addEventListener("load", function () {
    let tl = gsap.timeline();
    let links = document.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (
          $(this).prop("hostname") === window.location.host &&
          $(this).attr("href").indexOf("#") === -1 &&
          $(this).attr("target") !== "_blank"
        ) {
          e.preventDefault();
          let destination = this.getAttribute("href");
          tl.set(".page__transition", { display: "flex" });
          tl.fromTo(
            ".page__transition",
            { width: "0vw", left: "0vw" },
            {
              width: "100vw",
              left: "0vw",
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => (window.location = destination),
            }
          );
        }
      });
    });
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  });
  //////preloader progression animation

  if (
    !sessionStorage.getItem("animationPlayed") ||
    performance.navigation.type === 1
  ) {
    // If not played, run the animation
    gsap.set(".page__transition", { display: "none" });
    gsap.set(".preloader", { display: "flex" });
  } else {
    gsap.set(".preloader", { display: "none" });
  }

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
    onComplete: loadComplete,
  });

  tlProgress.to(progressBar, 1, { width: "100%" });

  function loadComplete() {
    var tlEnd = gsap.timeline();
    tlEnd.to(".lottie__preloader", 1.3, { yPercent: 500, rotate: 20 });
    tlEnd.to(".preloader", 0.5, {
      yPercent: -100,
      onComplete: function () {
        sessionStorage.setItem("animationPlayed", "true");
      },
    });
  }

  function updateProgressBar() {
    let windowHeight = window.innerHeight;
    let pageHeight = document.documentElement.scrollHeight - windowHeight;
    let scrollPosition = window.scrollY;
    let scrollProgress = (scrollPosition / pageHeight) * 100;
    progressBar.textContent = `Your are here: ${scrollProgress.toFixed(2)}%`;
  }

  updateProgressBar();

  window.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);
}
export default preloader;
