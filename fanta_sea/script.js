const video = document.querySelector(".video-container video");
const hoverText = document.querySelector(".video-container .hover-text");
const nonhoverText = document.querySelector(".nonhover-text");

video.addEventListener("mouseenter", () => {
  video.play();
  hoverText.classList.remove("active");
});

video.addEventListener("mouseleave", () => {
  video.pause();
  hoverText.classList.add("active");
});

video.addEventListener("mouseenter", () => {
    nonhoverText.classList.add("active");
  });
  
  video.addEventListener("mouseleave", () => {
    nonhoverText.classList.remove("active");
  });