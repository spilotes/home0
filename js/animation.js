const item = document.querySelector(".cute-ghosts");

item.animate(
  [{ transform: "translateX(0)" }, { transform: "translateY(-0.3rem)" }],
  {
    duration: 2000,
    easing: "ease-in-out",
    direction: "alternate",
    iterations: Infinity,
  }
);
