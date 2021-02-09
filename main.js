"use strict";

const inputElement = document.querySelector(".js-input");
const buttonelement = document.querySelector(".js-search");
const imageElement = document.querySelector(".js-image");
const ulElement = document.querySelector(".js-ul");
const ulFavoriteElement = document.querySelector(".js-ul-favoritas");
let seriesArray = [];


// Aquí al momento de darle search, se llama al Api y me devuelve título y foto de la serie en un array

const handleSearchApi = () => {
  const search = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then((response) => response.json())
    .then((data) => {
      seriesArray = [];

      for (let index = 0; index < data.length; index++) {
        seriesArray[index] = {};

        if (Boolean(data[index].show.image)) {
          seriesArray[index].url = data[index].show.image.original;
        } else {
          seriesArray[index].url =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }
        seriesArray[index].title = data[index].show.name;
        seriesArray[index].id = data[index].show.id;
      }
      paintSeries(seriesArray);
    });
};
// Aquí pinto en html
function paintSeries(array) {

  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }

  for (const serie of array) {
    const newLi = document.createElement("li");
    ulElement.appendChild(newLi);
    newLi.addEventListener("click", handleFavoriteSeries);

    const newDiv = document.createElement("div");
    newLi.appendChild(newDiv);
    newDiv.classList.add("serie__conatiner");
    newDiv.classList.add("js-container");
    newLi.id = serie.id;

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

// Lista de favoritas (Busco en SeriesArray con find x id)

let favoriteSeries = [];

const handleFavoriteSeries = (ev) => {

  let favorite = seriesArray.find(element => element.id == ev.currentTarget.id);
  favoriteSeries.push(favorite);
  
  paintFavorites();

 
};


// Cómo pintar el array de favoritas en el html 

function paintFavorites() {

   while (ulFavoriteElement.firstChild) {
     ulFavoriteElement.removeChild(ulFavoriteElement.firstChild);
   }

  for (const serie of favoriteSeries) {
    const newLi = document.createElement("li");
    ulFavoriteElement.appendChild(newLi);

    const newDiv = document.createElement("div");
    newLi.appendChild(newDiv);
    newDiv.classList.add("serie__conatiner");

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
