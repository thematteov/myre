import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import SplitType from "split-type";
function preloader() {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  let intro = document.querySelector(".intro");
  new SplitType(".intro");
  var imgLoad = imagesLoaded(document.querySelectorAll("img"));

  imgLoad.on("progress", function (instance, image) {
    let loadedCount = instance.images.filter((img) => img.isLoaded).length;
    let totalCount = instance.images.length;
    let loadingProgress = loadedCount / totalCount;
    document.querySelector(".p__preloader").innerHTML =
      loadingProgress * 100 + "%";
  });

  imgLoad.on("always", function (instance) {
    loadComplete();
  });
  function loadComplete() {
    let tlanimations = gsap.timeline();
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
    tlanimations.to(".preloader", 1.1, {
      yPercent: -100,
      ease: "power2.inOut",
    });
    if (intro) {
      tlanimations.fromTo(
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
