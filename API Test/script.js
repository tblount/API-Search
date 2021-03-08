//create a card when search button is clicked
let submitBtn = document.getElementById("submit_btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = document.getElementById("search-input").value;
  if (searchInput !== "") {
    document
      .getElementById("card-section")
      .appendChild(createCard(searchInput));
    document.getElementById("search-input").value = "";
  }
});

//function to create the card
function createCard(input) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "width:18rem");

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  cardBody.setAttribute("style", "text-align:center");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = input;

  let btnContainer = document.createElement("div");
  btnContainer.setAttribute("class", "button-container");

  let movieBtn = document.createElement("button");
  movieBtn.setAttribute("class", "btn btn-primary");
  movieBtn.innerText = "movies";
  movieBtn.addEventListener("click", (event) => {
    let content = document.getElementById("display-section");
    content.innerHTML = "";
    searchMovies(event.target.parentNode.parentNode.firstChild.innerText);
  });

  let gifBtn = document.createElement("button");
  gifBtn.setAttribute("class", "btn btn-primary");
  gifBtn.innerText = "gifs";
  gifBtn.addEventListener("click", (event) => {
    let content = document.getElementById("display-section");
    content.innerHTML = "";
    searchGifs(event.target.parentNode.parentNode.firstChild.innerText);
  });

  let rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("class", "btn btn-danger");
  rmvBtn.innerText = "Remove";
  rmvBtn.addEventListener("click", (event) => {
    event.target.parentNode.parentNode.parentNode.remove();
  });

  btnContainer.append(movieBtn, gifBtn, rmvBtn);
  cardBody.append(cardTitle, btnContainer);
  card.appendChild(cardBody);

  return card;
}
//function to search for movies
function searchMovies(keyword) {
  fetch(`http://www.omdbapi.com/?s=${keyword}&i=tt3896198&apikey=97dc797e`)
    .then((response) => response.json())
    .then((data) =>
      data.Search.forEach((movie) => {
        document
          .getElementById("display-section")
          .append(createMovieDisplayCard(movie));
      })
    );
}
//function to search for gifs
var apiKey = "n9yJP5MuUY6JgmGxAelML6lK36KhWtad";
function searchGifs(keyword) {
  fetch(
    `api.giphy.com/v1/gifs/search/?api_key=${apiKey}&s=${keyword}`
  )
    .then((response) => response.json())
    .then((gif) => {
      for (let i = 0; i < 12; i++) {
        document
          .getElementById("display-section")
          .append(createGifDisplayCard(gif.data[i]));
      }
    });
}
//function to create movies display cards
function createMovieDisplayCard(result) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "width:18rem");

  let img = document.createElement("img");
  img.setAttribute("src", result.Poster);
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", result.Title);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = result.Title;

  let cardText = document.createElement("p");
  cardText.setAttribute("class", "card-text");
  cardText.innerHTML = result.Type + " " + result.Year;

  cardBody.append(cardTitle, cardText);
  card.append(img, cardBody);

  return card;
}
//funciton to create gifs display cards
function createGifDisplayCard(result) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("style", "fit-content:100px;width:18rem");

  let img = document.createElement("img");
  img.setAttribute("src", result.images.fixed_height.url);
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", result.title);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = result.title;

  let cardText = document.createElement("p");
  cardText.setAttribute("class", "card-text");

  cardBody.append(cardTitle, cardText);
  card.append(img, cardBody);

  return card;
}
