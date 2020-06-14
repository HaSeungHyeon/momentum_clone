const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pending = document.querySelector(".js-pending");
const finished = document.querySelector(".js-finished");

const TODOS_LS = "pendingToDos";
const FINTODOS_LS = "finishToDos";

let pendingToDos = [];
let finishToDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(pendingToDos));
}

function saveFinToDos() {
  localStorage.setItem(FINTODOS_LS, JSON.stringify(finishToDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
  if (ul === pending) {
    const cleanToDos = pendingToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    pendingToDos = cleanToDos;
    saveToDos();
  } else {
    const cleanToDos = finishToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    finishToDos = cleanToDos;
    saveFinToDos();
  }
}

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const text = btn.previousSibling.previousSibling.textContent;
  deleteToDo(event);
  if (ul === pending) {
    finishToDo(text);
  } else {
    paintToDo(text);
  }
}

function finishToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const bakBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishToDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  bakBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteToDo);
  bakBtn.addEventListener("click", moveToDo);
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(bakBtn);
  finished.appendChild(li);
  const finToDoObj = {
    text: text,
    id: newId,
  };
  finishToDos.push(finToDoObj);
  saveFinToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendingToDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  chkBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  chkBtn.addEventListener("click", moveToDo);
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  pending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  pendingToDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(evnet) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFinToDos = localStorage.getItem(FINTODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinToDos !== null) {
    const parsedFinToDos = JSON.parse(loadedFinToDos);
    parsedFinToDos.forEach(function (toDo) {
      finishToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
