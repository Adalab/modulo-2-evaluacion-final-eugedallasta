"use strict";

const inputElement = document.querySelector(".js-input");
const buttonelement = document.querySelector(".js-search");
const imageElement = document.querySelector(".js-image");
const ulElement = document.querySelector(".js-ul");

// Aquí al momento de darle search, se llama al Api y me devuelve título y foto de la serie en un array

const handleSearchApi = () => {
  const search = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      let seriesArray = [];

      for (let index = 0; index < data.length; index++) {
        seriesArray[index] = {};

        if (Boolean(data[index].show.image)) {
          seriesArray[index].url = data[index].show.image.original;
        } else {
          seriesArray[index].url =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }
        seriesArray[index].title = data[index].show.name;
      }
      paintSeries(seriesArray);
    });
};

function paintSeries(array) {

  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }

  for (const serie of array) {
    const newLi = document.createElement("li");
    ulElement.appendChild(newLi);
    newLi.classList.add("js-li");

    const newDiv = document.createElement("div");
    newLi.appendChild(newDiv);
    newDiv.classList.add("serie__conatiner");
    newDiv.classList.add("js-container");

    const newH2 = document.createElement("h2");
    const textH2 = document.createTextNode(serie.title);
    newH2.classList.add("serie__title");
    newDiv.appendChild(newH2);
    newH2.appendChild(textH2);

    const newImage = document.createElement("img");
    newImage.src = serie.url;
    newDiv.appendChild(newImage);
    newImage.classList.add("image");
  }
}
buttonelement.addEventListener("click", handleSearchApi);

// Lista de favoritas

// const favoriteElement = document.querySelector(".js-container");

// let favoriteSeries = [];

// const handleFavoriteSeries = (ev) => {

//   const value = ev.target
//   favoriteSeries.push(value);
// };

// favoriteElement.addEventListener("click", handleFavoriteSeries);

// Cómo pintar el array de favoritas en el html 