const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f6c1cc48171e26a929d054f3bb889aed";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=f6c1cc48171e26a929d054f3bb889aed&query="';

const containerEl = document.querySelector(".container");
const form = document.getElementById('form')
const search = document.querySelector(".search");
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}
function showMovies(movies) {
    containerEl.innerHTML = '';
  movies.forEach((result) => {
    const movieCard = document.createElement("div");
    containerEl.appendChild(movieCard);
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
    <div class="movie__img">
        <img src="${IMG_PATH + result.poster_path}" alt="">
    </div>
    <div class="details">
        <div class="name">${result.original_title}</div>
        <div class="rating ${classifyByRating(result.vote_average)}">${result.vote_average}</div>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${result.overview}
    </div>`;
  });
}
function classifyByRating(vote){
    if(vote >= 8) return 'green'
   else if(vote >= 5) return 'orange'
   else  return 'red'
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
      getMovies(API_SEARCH + searchTerm);
      console.log(getMovies(API_SEARCH + searchTerm));

    search.value = "";
  } else {
    window.location.reload();
  }
});
