const dateContainer = document.querySelector(".js-clock");
const dateTitle = dateContainer.querySelector("h1");
const clockTitle = dateContainer.querySelector("h2");

function getTime() {
  const date = new Date();
  const years = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  dateTitle.innerText = `${years}년 ${month}월 ${day}일`;
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
