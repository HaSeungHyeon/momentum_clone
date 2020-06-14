const body = document.querySelector("body");

const IMG_NUMBER = 3;

function genNumber() {
  const num = Math.floor(Math.random() * IMG_NUMBER + 1);
  return num;
}

function paintImage(n) {
  const img = new Image();
  img.src = `images/${n}.jpg`;
  img.classList.add("bgImage");
  body.prepend(img);
}

function init() {
  const num = genNumber();
  paintImage(num);
}

init();
