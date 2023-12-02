function AroundCircle(circleClass, existingDivClass) {
  const circle = document.querySelector(`.${circleClass}`);
  const existingDivs = document.querySelectorAll(`.${existingDivClass}`);
  const numDivs = existingDivs.length;
  const circleRadius = circle.clientWidth / 2;

  function calculations() {
    existingDivs.forEach((div, i) => {
      const distanceFromCenter = circleRadius + div.clientHeight / 2; // Adjust based on div dimensions
      const angle = (i / numDivs) * 2 * Math.PI;

      const x =
        circle.clientWidth / 2 +
        distanceFromCenter * Math.cos(angle) -
        div.clientWidth / 2;
      const y =
        circle.clientHeight / 2 +
        distanceFromCenter * Math.sin(angle) -
        div.clientHeight;

      // Position the div
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;

      // Calculate the rotation angle to ensure the bottom is facing the circle center
      const rotationDegrees = (angle * 180) / Math.PI + 90;
      div.style.transform = `translate(0%, 50%) rotate(${rotationDegrees}deg)`;
    });
  }
  calculations();
  window.addEventListener("resize", calculations);
}

// Example usage
export default AroundCircle;
