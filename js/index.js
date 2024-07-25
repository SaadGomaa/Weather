let nameDayOne = document.getElementById("name-day-one");
let numDayOne = document.getElementById("num-day-one");
let monthDayOne = document.getElementById("month-day-one");
let city = document.getElementById("location");
let oneDegree = document.getElementById("one-degree");
let oneImage = document.getElementById("one-icon");
let howone = document.getElementById("how-one");
let humiltyOne = document.getElementById("humilty-one");
let speedOne = document.getElementById("speed-one");
let dirOne = document.getElementById("dir-one");

let nameDayTwo = document.getElementById("name-day-two");
let towImage = document.getElementById("tow-image");
let maxTow = document.getElementById("max-tow");
let minTow = document.getElementById("min-tow");
let howTwo = document.getElementById("how-two");

let nameDayThree = document.getElementById("name-day-three");
let threeImage = document.getElementById("three-image");
let maxThree = document.getElementById("max-three");
let minThree = document.getElementById("min-three");
let howThree = document.getElementById("how-three");

let search = document.getElementById("search");

async function getData(countriy) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=33ddc83ced384515b90210853240607&q=${countriy}&days=3`
  );
  let mainData = await data.json();
  return mainData;
}

function displayOne(mainData) {
  let nameData = new Date();
  nameDayOne.innerHTML = nameData.toLocaleDateString("en", { weekday: "long" });
  monthDayOne.innerHTML = nameData.toLocaleDateString("en", { month: "long" });
  numDayOne.innerHTML = nameData.getDate();
  city.innerHTML = mainData.location.name;
  oneDegree.innerHTML = mainData.current.temp_c;
  oneImage.setAttribute("src", mainData.current.condition.icon);
  howone.innerHTML = mainData.current.condition.text;
  humiltyOne.innerHTML = mainData.current.humidity + "%";
  speedOne.innerHTML = mainData.current.wind_kph + "Km/h";
  dirOne.innerHTML = mainData.current.wind_dir;
}

function displayTow(mainData) {
  let nameData = new Date(mainData.forecast.forecastday[1].date);
  nameDayTwo.innerHTML = nameData.toLocaleDateString("en", { weekday: "long" });
  towImage.setAttribute(
    "src",
    mainData.forecast.forecastday[1].day.condition.icon
  );
  maxTow.innerHTML = mainData.forecast.forecastday[1].day.maxtemp_c;
  minTow.innerHTML = mainData.forecast.forecastday[1].day.mintemp_c;
  howTwo.innerHTML = mainData.forecast.forecastday[1].day.condition.text;
}

function displayThree(mainData) {
  let nameData = new Date(mainData.forecast.forecastday[2].date);
  nameDayThree.innerHTML = nameData.toLocaleDateString("en", {
    weekday: "long",
  });
  threeImage.setAttribute(
    "src",
    mainData.forecast.forecastday[2].day.condition.icon
  );
  maxThree.innerHTML = mainData.forecast.forecastday[2].day.maxtemp_c;
  minThree.innerHTML = mainData.forecast.forecastday[2].day.mintemp_c;
  howThree.innerHTML = mainData.forecast.forecastday[2].day.condition.text;
}

async function start(nameCountriy = "paris") {
  let funMain = await getData(nameCountriy);
  displayOne(funMain);
  displayTow(funMain);
  displayThree(funMain);
};
start();

search.addEventListener("keyup", function () {
  start(search.value);
});
