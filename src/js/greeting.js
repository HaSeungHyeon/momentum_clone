const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

function getHours() {
  const clock = document.querySelector(".js-clock");
  const hours = clock.querySelector("h2").textContent.split(":")[0];
  return hours;
}

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  const hours = getHours();
  greeting.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
  if (hours >= 05 && hours < 12) {
    greeting.innerText = `Good morning ${text}`;
  } else if (hours >= 12 && hours < 18) {
    greeting.innerText = `Good afternoon ${text}`;
  } else if (hours >= 18 && hours < 22) {
    greeting.innerText = `Good evening ${text}`;
  } else {
    greeting.innerText = `Good night ${text}`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  setInterval(loadName, 1000);
}

init();
