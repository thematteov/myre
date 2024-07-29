import gsap from "gsap";
function menu() {
  let opened = false;
  let menu = document.querySelector(".menubutton");
  let close = document.querySelector(".closebutton");

  menu.addEventListener("click", () => {
    if (opened === false) {
      opened = true;
      console.log(opened);
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
    }
  });

  close.addEventListener("click", () => {
    opened = false;
    console.log(opened);
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
  });
}

export default menu;
