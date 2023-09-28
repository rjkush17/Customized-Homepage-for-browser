//  Background Change On Every Page Load Function

const number = Math.floor(Math.random(10) * 30) + 1;
const image = document.querySelector("body");

function imageRefresher() {
  image.style.backgroundImage = `url('./wallpaper/${number}.jpg')`;
}

window.onload = imageRefresher();

// Quotes Of the day

async function qoutAPI() {
  let api = await fetch("https://api.quotable.io/random");

  let object = await api.json();

  document.querySelector(".random").innerText = object.content;
  document.querySelector(".author").innerText = `-${object.author}`;
}

qoutAPI();

// Date and Time Javascript

function digitalClock() {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let hour = date.getHours();
  let dayOfWeek = daysOfWeek[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  let min = date.getMinutes();

  let fullDate = `${dayOfWeek}, ${month} ${day} ${year}`;
  document.querySelector(".full-date").innerHTML = fullDate;
  document.querySelector(".clock-hours").innerHTML = hour;
  document.querySelector(".clock-minutes").innerHTML = min;
}

digitalClock();
setInterval(digitalClock, 1000);

// Search Input Js

let search = document.querySelector("#search");
let button = document.querySelector(".search-button");

search.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

function searchURL() {
  let result = search.value;
  if (result === "") {
    search.placeholder = "Input is Empty";
  } else {
    let url = "https://www.google.com/search?q=" + result;
    window.location.href = url;
    search.value = "";
  }
}

// Todo List Javascript code

let js = JSON.parse(localStorage.getItem("todo")) ?? [];
let form = document.querySelector(".todoForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let task = document.querySelector(".todoForm");
  js.push(form.task.value);
  localStorage.setItem("todo", JSON.stringify(js));
  showList();
});

function showList() {
  let storage = JSON.parse(localStorage.getItem("todo"));
  let final_data = "";
  storage.forEach((e, ind) => {
    if (e !== "") {
      final_data += `
      <div class='list-item'>
      <h3 class='item' id='edit-input${ind}'>${e}</h3>
   <button onClick=deleteElement(${ind}) >
   <i class="icon fa-solid fa-trash" style="color: #df2a2a;"></i>
   </button>
   <div class='edit-icon${ind}' onclick=editElement(${ind})>
   <i id='edit' class="icon fa-solid fa-file-pen" style="color: #0858e2;"></i></div>
      </div>
      <div class="border-buttom"></div>
      `;
      form.task.value = "";
    }
  });
  document.querySelector(".list").innerHTML = final_data;
}
showList();

function deleteElement(e) {
  let storage = JSON.parse(localStorage.getItem("todo"));
  let deleted = storage.filter((data, index) => {
    return index !== e;
  });
  localStorage.setItem("todo", JSON.stringify(deleted));
  showList();
}

function editElement(ind) {
  let storage = JSON.parse(localStorage.getItem("todo"));
  let inputVal = storage[ind];
  deleteElement(ind);
  form.task.value = inputVal;
}
