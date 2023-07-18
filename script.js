const header = document.querySelector(".main-header");
const slides = document.querySelectorAll(".hero-slide");
const oneSlide = document.querySelector(".hero-slide");
const headerWrp = document.querySelector(".main-header-wrp");
async function getResponseFacts() {
  const response = await fetch("https://catfact.ninja/fact ")
    .then(function (result) {
      return result.json();
    })
    .then((text) => {
      let i = 0;
      let interval = setInterval(() => {
        header.textContent += text.fact[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, 100);
    })
    .catch((error) => {
      console.log(error);
    });
}
headerWrp.addEventListener("click", () => {
  getResponseFacts();
  headerWrp.classList.add("active");
});

let i = 0;
async function getResponseImages() {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=3"
  ).then(function (result) {
    return result.json();
  });

  return response;
}

getResponseImages();

async function setImages() {
  await getResponseImages()
    .then((result) => {
      for (let i = 1; i <= 3; i++) {
        slides[i - 1].style.backgroundImage = `url(${result[i].url})`;
      }
    })
    .catch((error) => console.log(error));
}

setImages();

console.log(getResponseImages());

let sliderIndex = 0;
function sliderMove() {
  if (sliderIndex >= slides.length) {
    sliderIndex = 0;
  }
  slides.forEach((slide) => {
    slide.style.opacity = "0";
  });
  slides[sliderIndex].style.opacity = "1";
  sliderIndex++;
}

setInterval(() => {
  sliderMove();
}, 5000);
