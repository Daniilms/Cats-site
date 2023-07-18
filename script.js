const header = document.querySelector(".main-header");
const slides = document.querySelectorAll(".hero-slide");
const oneSlide = document.querySelector(".hero-slide");
const headerWrp = document.querySelector(".main-header-wrp");
let isWritning = false;
async function getResponseFacts() {
  const response = await fetch("https://catfact.ninja/fact ")
    .then(function (result) {
      return result.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
headerWrp.addEventListener("click", () => {
  if (!isWritning) {
    header.textContent = "";
    getFact();
    isWritning = true;
  }
  headerWrp.classList.add("active");
});
async function getFact() {
  await getResponseFacts().then((result) => {
    let i = 0;
    let interval = setInterval(() => {
      header.textContent += result.fact[i];
      i++;
      if (i >= result.length) {
        clearInterval(interval);
      }
      if (result.length === header.textContent.length) {
        isWritning = false;
      }
    }, 100);
  });
}

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
