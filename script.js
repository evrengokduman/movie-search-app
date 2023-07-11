const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98abd22f2a21da85522ebb7581f705ea&language=en-US&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=98abd22f2a21da85522ebb7581f705ea&l&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies, it will be called when the page loads, and it will fetch the movies from the API as an array of objects
getMovies(API_URL)
async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.results)
  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''
  movies.forEach((movie) => {
    //destructuring
    const { title, poster_path, vote_average, overview } = movie

    const movieElement = document.createElement('div')
    movieElement.classList.add('movie')

    movieElement.innerHTML = `<div class="movie">
    <img src="${IMG_PATH + poster_path}" alt="" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit a
      saepe, quisquam repellat mollitia dolor veritatis fuga. Tempora, ex
      repellat!
    </div>
  </div>`
  })
}

function getClassByRate(vote) {
  vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red'
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    vindow.location.reload()
  }
})
